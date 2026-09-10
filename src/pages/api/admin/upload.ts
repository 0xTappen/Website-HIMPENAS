import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, Files, File } from "formidable";
import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";

const imageMimeTypes = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

// Next.js harus matiin bodyParser untuk form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err: any, _fields: Fields, files: Files) => {
    try {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(400).json({ error: "Failed to parse form" });
      }

      const raw = (files.file as File | File[] | undefined);
      const f: File | undefined = Array.isArray(raw) ? raw[0] : raw;
      if (!f) return res.status(400).json({ error: "No file uploaded" });

      const extension = path.extname(f.originalFilename || f.newFilename || "").toLowerCase();
      const isHeic = [".heic", ".heif"].includes(extension) || ["image/heic", "image/heif"].includes(f.mimetype || "");
      if (!imageMimeTypes.has(f.mimetype || "") && !isHeic) {
        await fs.promises.unlink(f.filepath).catch(() => undefined);
        return res.status(400).json({ error: "Format file tidak didukung" });
      }

      let filePath = f.filepath;
      let fileName = path.basename(filePath);
      let mimetype = f.mimetype || "application/octet-stream";

      if (isHeic) {
        const converted = await heicConvert({
          buffer: await fs.promises.readFile(f.filepath),
          format: "JPEG",
          quality: 0.9,
        });
        fileName = `${path.parse(fileName).name}.jpg`;
        filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, converted);
        await fs.promises.unlink(f.filepath);
        mimetype = "image/jpeg";
      }

      const relUrl = `/uploads/${fileName}`;

      const size = (() => {
        try { return fs.statSync(filePath).size; } catch { return f.size || 0; }
      })();

      const upload = await prisma.upload.create({
        data: {
          filename: fileName,
          url: relUrl,
          size: Number(size || 0),
          mimetype,
        },
      });

      return res.status(200).json(upload);
    } catch (e) {
      console.error("Upload handler error:", e);
      return res.status(500).json({ error: "Upload failed" });
    }
  });
}
