import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { organizationSlots } from "@/lib/organization";

type MemberInput = {
  position: string;
  name: string;
  imageUrl?: string | null;
};

type DepartmentInput = {
  name: string;
  staffCount: number;
};

type SettingInput = {
  period: string;
  memberCount: number;
};

const allowedPositions = new Set(organizationSlots.map((slot) => slot.position));
const allowedDepartments = new Set(
  organizationSlots
    .filter((slot) => slot.section === "department")
    .map((slot) => slot.department)
    .filter((department): department is string => Boolean(department))
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [members, departments, setting] = await Promise.all([
        prisma.organizationMember.findMany({ orderBy: { position: "asc" } }),
        prisma.organizationDepartment.findMany({ orderBy: { name: "asc" } }),
        prisma.organizationSetting.findUnique({ where: { id: 1 } }),
      ]);
      return res.status(200).json({ members, departments, setting });
    }

    if (req.method === "PUT") {
      const { members, departments, setting } = req.body as {
        members?: MemberInput[];
        departments?: DepartmentInput[];
        setting?: SettingInput;
      };

      if (!Array.isArray(members) || !Array.isArray(departments) || !setting?.period?.trim() || !Number.isInteger(setting.memberCount) || setting.memberCount < 0) {
        return res.status(400).json({ message: "Data struktur tidak valid" });
      }

      if (setting.period.trim().length > 50) {
        return res.status(400).json({ message: "Periode maksimal 50 karakter" });
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

      const uniqueDepartments = new Set<string>();
      for (const department of departments) {
        if (
          !department ||
          !allowedDepartments.has(department.name) ||
          uniqueDepartments.has(department.name) ||
          !Number.isInteger(department.staffCount) ||
          department.staffCount < 0
        ) {
          return res.status(400).json({ message: "Data departemen tidak valid" });
        }
        uniqueDepartments.add(department.name);
      }

      const saved = await prisma.$transaction(
        [
          ...members.map((member) =>
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
          ),
          ...departments.map((department) =>
            prisma.organizationDepartment.upsert({
              where: { name: department.name },
              create: department,
              update: { staffCount: department.staffCount },
            })
          ),
          prisma.organizationSetting.upsert({
            where: { id: 1 },
            create: { id: 1, period: setting.period.trim(), memberCount: setting.memberCount },
            update: { period: setting.period.trim(), memberCount: setting.memberCount },
          }),
        ]
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
