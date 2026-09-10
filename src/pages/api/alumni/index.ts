import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const alumni = await prisma.alumniYear.findMany({
      include: { members: true },
      orderBy: { year: "desc" },
    });
    return res.status(200).json(alumni);
  } catch (error) {
    console.error("Public alumni API error:", error);
    return res.status(500).json({ message: "Gagal memuat data alumni" });
  }
}
