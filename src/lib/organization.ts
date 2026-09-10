export type OrganizationSlot = {
  position: string;
  role: string;
  section: "leadership" | "executive" | "department";
  department?: string;
  staffCount?: number;
  defaultName: string;
};

export const organizationSlots: OrganizationSlot[] = [
  { position: "ketua-himpunan", role: "Ketua Himpunan", section: "leadership", defaultName: "Nathanael J Munthe" },
  { position: "wakil-ketua-himpunan", role: "Wakil Ketua Himpunan", section: "leadership", defaultName: "Atha F. Sitorus" },
  { position: "sekretaris-1", role: "Sekretaris 1", section: "executive", defaultName: "Nama Sekretaris 1" },
  { position: "sekretaris-2", role: "Sekretaris 2", section: "executive", defaultName: "Nama Sekretaris 2" },
  { position: "bendahara-umum-1", role: "Bendahara 1", section: "executive", defaultName: "Nama Bendahara 1" },
  { position: "bendahara-umum-2", role: "Bendahara 2", section: "executive", defaultName: "Nama Bendahara 2" },
  { position: "internal-ketua", role: "Ketua", section: "department", department: "Departemen Internal", staffCount: 18, defaultName: "Nama Ketua Internal" },
  { position: "internal-wakil", role: "Wakil", section: "department", department: "Departemen Internal", staffCount: 18, defaultName: "Nama Wakil Internal" },
  { position: "internal-sekretaris", role: "Sekretaris", section: "department", department: "Departemen Internal", staffCount: 18, defaultName: "Nama Sekretaris Internal" },
  { position: "eksternal-ketua", role: "Ketua", section: "department", department: "Departemen Eksternal", staffCount: 20, defaultName: "Nama Ketua Eksternal" },
  { position: "eksternal-wakil", role: "Wakil", section: "department", department: "Departemen Eksternal", staffCount: 20, defaultName: "Nama Wakil Eksternal" },
  { position: "eksternal-sekretaris", role: "Sekretaris", section: "department", department: "Departemen Eksternal", staffCount: 20, defaultName: "Nama Sekretaris Eksternal" },
  { position: "akademik-ketua", role: "Ketua", section: "department", department: "Departemen Akademik", staffCount: 14, defaultName: "Nama Ketua Akademik" },
  { position: "akademik-wakil", role: "Wakil", section: "department", department: "Departemen Akademik", staffCount: 14, defaultName: "Nama Wakil Akademik" },
  { position: "akademik-sekretaris", role: "Sekretaris", section: "department", department: "Departemen Akademik", staffCount: 14, defaultName: "Nama Sekretaris Akademik" },
  { position: "psdm-ketua", role: "Ketua", section: "department", department: "Departemen PSDM", staffCount: 19, defaultName: "Nama Ketua PSDM" },
  { position: "psdm-wakil", role: "Wakil", section: "department", department: "Departemen PSDM", staffCount: 19, defaultName: "Nama Wakil PSDM" },
  { position: "psdm-sekretaris", role: "Sekretaris", section: "department", department: "Departemen PSDM", staffCount: 19, defaultName: "Nama Sekretaris PSDM" },
  { position: "infokom-ketua", role: "Ketua", section: "department", department: "Departemen INFOKOM", staffCount: 9, defaultName: "Nama Ketua INFOKOM" },
  { position: "infokom-wakil", role: "Wakil", section: "department", department: "Departemen INFOKOM", staffCount: 9, defaultName: "Nama Wakil INFOKOM" },
  { position: "infokom-sekretaris", role: "Sekretaris", section: "department", department: "Departemen INFOKOM", staffCount: 9, defaultName: "Nama Sekretaris INFOKOM" },
];

export const organizationFallbackImage = "/logo/logo.png";
