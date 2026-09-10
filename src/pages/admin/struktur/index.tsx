import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AdminLayout from "../_layout";
import { Toaster, toast } from "sonner";
import { ImagePlus, Loader2, Save, Users } from "lucide-react";
import { organizationFallbackImage, organizationSlots } from "@/lib/organization";

type MemberForm = {
  position: string;
  name: string;
  imageUrl: string;
};

const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export default function OrganizationStructurePage() {
  const [members, setMembers] = useState<MemberForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/struktur")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const saved = (await response.json()) as MemberForm[];
        const savedByPosition = new Map(saved.map((member) => [member.position, member]));
        setMembers(
          organizationSlots.map((slot) => {
            const member = savedByPosition.get(slot.position);
            return {
              position: slot.position,
              name: member?.name || slot.defaultName,
              imageUrl: member?.imageUrl || "",
            };
          })
        );
      })
      .catch(() => toast.error("Gagal memuat struktur organisasi"))
      .finally(() => setLoading(false));
  }, []);

  const memberByPosition = useMemo(
    () => new Map(members.map((member) => [member.position, member])),
    [members]
  );

  const updateMember = (position: string, changes: Partial<MemberForm>) => {
    setMembers((current) =>
      current.map((member) =>
        member.position === position ? { ...member, ...changes } : member
      )
    );
  };

  const uploadPhoto = async (position: string, file?: File) => {
    if (!file) return;
    if (!imageTypes.includes(file.type)) {
      toast.error("Gunakan foto berformat JPG, PNG, atau WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5MB");
      return;
    }

    setUploading(position);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error();
      updateMember(position, { imageUrl: data.url });
      toast.success("Foto berhasil diunggah");
    } catch {
      toast.error("Gagal mengunggah foto");
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    if (members.some((member) => !member.name.trim())) {
      toast.error("Nama setiap jabatan wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/struktur", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members }),
      });
      if (!response.ok) throw new Error();
      toast.success("Struktur organisasi berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan struktur organisasi");
    } finally {
      setSaving(false);
    }
  };

  const renderMemberForm = (position: string) => {
    const slot = organizationSlots.find((item) => item.position === position)!;
    const member = memberByPosition.get(position);
    const imageUrl = member?.imageUrl || organizationFallbackImage;

    return (
      <div key={position} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative h-[88px] w-[88px] overflow-hidden rounded-lg bg-gray-100">
          <Image src={imageUrl} alt={slot.role} fill sizes="88px" className="object-cover" />
        </div>
        <div className="min-w-0 space-y-3">
          <div>
            <p className="font-semibold text-gray-900">{slot.role}</p>
            <p className="text-xs text-gray-500">Jabatan tetap</p>
          </div>
          <input
            value={member?.name || ""}
            onChange={(event) => updateMember(position, { name: event.target.value })}
            aria-label={`Nama ${slot.role}`}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Nama pengurus"
          />
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800">
            {uploading === position ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            {uploading === position ? "Mengunggah..." : "Upload foto"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={uploading !== null}
              onChange={(event) => uploadPhoto(position, event.target.files?.[0])}
            />
          </label>
        </div>
      </div>
    );
  };

  const leadership = organizationSlots.filter((slot) => slot.section === "leadership");
  const executive = organizationSlots.filter((slot) => slot.section === "executive");
  const departments = Array.from(
    new Set(organizationSlots.filter((slot) => slot.section === "department").map((slot) => slot.department))
  );

  return (
    <AdminLayout>
      <Toaster richColors position="top-right" />
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><Users size={24} /></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Struktur Organisasi</h1>
                <p className="mt-1 text-gray-600">Isi nama dan foto pengurus untuk halaman Tentang Kami.</p>
              </div>
            </div>
          </div>
          <button
            onClick={save}
            disabled={loading || saving || uploading !== null}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">Pimpinan Himpunan</h2>
              <div className="grid gap-4 lg:grid-cols-2">{leadership.map((slot) => renderMemberForm(slot.position))}</div>
            </section>
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">Sekretaris dan Bendahara</h2>
              <div className="grid gap-4 lg:grid-cols-3">{executive.map((slot) => renderMemberForm(slot.position))}</div>
            </section>
            {departments.map((department) => (
              <section key={department}>
                <h2 className="mb-4 text-xl font-bold text-gray-900">{department}</h2>
                <div className="grid gap-4 lg:grid-cols-3">
                  {organizationSlots.filter((slot) => slot.department === department).map((slot) => renderMemberForm(slot.position))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
