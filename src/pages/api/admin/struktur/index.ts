import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { organizationSlots } from "@/lib/organization";

type MemberInput = {
  position: string;
  name: string;
  imageUrl?: string | null;
};

const allowedPositions = new Set(organizationSlots.map((slot) => slot.position));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const members = await prisma.organizationMember.findMany({
        orderBy: { position: "asc" },
      });
      return res.status(200).json(members);
    }

    if (req.method === "PUT") {
      const { members } = req.body as { members?: MemberInput[] };

      if (!Array.isArray(members)) {
        return res.status(400).json({ message: "Data struktur tidak valid" });
      }

      const uniquePositions = new Set<string>();
      for (const member of members) {
        if (
          !member ||
          !allowedPositions.has(member.position) ||
          uniquePositions.has(member.position) ||
          typeof member.name !== "string" ||
          !member.name.trim() ||
          (member.imageUrl !== undefined && member.imageUrl !== null && typeof member.imageUrl !== "string")
        ) {
          return res.status(400).json({ message: "Data anggota tidak valid" });
        }
        uniquePositions.add(member.position);
      }

      const saved = await prisma.$transaction(
        members.map((member) =>
          prisma.organizationMember.upsert({
            where: { position: member.position },
            create: {
              position: member.position,
              name: member.name.trim(),
              imageUrl: member.imageUrl?.trim() || null,
            },
            update: {
              name: member.name.trim(),
              imageUrl: member.imageUrl?.trim() || null,
            },
          })
        )
      );

      return res.status(200).json(saved);
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Organization structure API error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}
