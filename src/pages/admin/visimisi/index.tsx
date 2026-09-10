// src/pages/admin/visimisi/index.tsx

import { useEffect, useState } from "react";
import AdminLayout from "../_layout";
import { Toaster, toast } from "sonner";
import { Save, Loader2, Goal, Flag, AlertCircle, CheckCircle2, Sparkles, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminVisiMisiPage() {
  const [visi, setVisi] = useState("");
  const [misiPoints, setMisiPoints] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingVisi, setIsSavingVisi] = useState(false);
  const [isSavingMisi, setIsSavingMisi] = useState(false);
  const [visiCharCount, setVisiCharCount] = useState(0);
  const misi = misiPoints
    .map((point, index) => `${index + 1}. ${point.trim()}`)
    .filter((point) => !point.endsWith(". "))
    .join("\n");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [visiRes, misiRes] = await Promise.all([
          fetch("/api/admin/visi"),
          fetch("/api/admin/misi"),
        ]);
        const visiData = await visiRes.json();
        const misiData = await misiRes.json();
        setVisi(visiData.konten || "");
        const points = (misiData.konten || "")
          .split(/\r?\n/)
          .map((point: string) => point.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
          .filter(Boolean);
        setMisiPoints(points.length > 0 ? points : [""]);
      } catch {
        toast.error("Gagal memuat data Visi & Misi!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setVisiCharCount(visi.length);
  }, [visi]);

  const updateMisiPoint = (index: number, value: string) => {
    setMisiPoints((points) => points.map((point, pointIndex) => pointIndex === index ? value : point));
  };

  const removeMisiPoint = (index: number) => {
    setMisiPoints((points) => points.length === 1 ? [""] : points.filter((_, pointIndex) => pointIndex !== index));
  };

  const handleSave = async (type: 'visi' | 'misi') => {
    const content = type === 'visi' ? visi : misi;
    
    if (!content.trim()) {
      toast.error(`${type === 'visi' ? 'Visi' : 'Misi'} tidak boleh kosong`);
      return;
    }

    if (type === 'visi') setIsSavingVisi(true);
    if (type === 'misi') setIsSavingMisi(true);

    const endpoint = `/api/admin/${type}`;
    const payload = { konten: content };
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error(`Gagal menyimpan ${typeName}`);
      
      toast.success(`${typeName} berhasil diperbarui!`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      if (type === 'visi') setIsSavingVisi(false);
      if (type === 'misi') setIsSavingMisi(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="text-emerald-600" size={48} />
          </motion.div>
          <p className="text-gray-500 font-medium">Memuat data Visi & Misi...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Toaster position="top-right" richColors />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Visi & Misi</h1>
            <p className="mt-2 text-gray-600">Kelola pernyataan visi dan misi organisasi</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5">
                <Sparkles size={14} className="text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Identitas Organisasi</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-4"
      >
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Tips Penulisan</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• <strong>Visi:</strong> Gambaran masa depan yang ingin dicapai organisasi</li>
              <li>• <strong>Misi:</strong> Langkah-langkah konkret untuk mencapai visi</li>
              <li>• Gunakan bahasa yang jelas, inspiratif, dan mudah dipahami</li>
              <li>• Untuk misi, gunakan poin-poin terpisah dengan tanda • atau angka</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Visi Card */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-100 p-2">
                  <Flag className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visi</h3>
                  <p className="text-sm text-gray-500">Gambaran masa depan organisasi</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <textarea
                value={visi}
                onChange={(e) => setVisi(e.target.value)}
                rows={10}
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                placeholder="Tuliskan visi organisasi di sini...

Contoh:
Menjadi organisasi mahasiswa yang unggul, inovatif, dan berdaya saing dalam mengembangkan potensi akademik dan non-akademik mahasiswa."
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{visiCharCount} karakter</span>
                {visi.trim() && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 size={14} />
                    <span className="font-medium">Terisi</span>
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
              <motion.button
                onClick={() => handleSave('visi')}
                disabled={isSavingVisi || !visi.trim()}
                whileHover={{ scale: isSavingVisi || !visi.trim() ? 1 : 1.02 }}
                whileTap={{ scale: isSavingVisi || !visi.trim() ? 1 : 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingVisi ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Simpan Visi</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Preview Visi */}
          {visi.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green-100 bg-green-50 p-4"
            >
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900">Preview Visi</h4>
                  <div className="mt-3 rounded-lg bg-white p-4 border border-green-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {visi}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Misi Card */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-100 p-2">
                  <Goal className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Misi</h3>
                  <p className="text-sm text-gray-500">Langkah untuk mencapai visi</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {misiPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">{index + 1}</span>
                    <textarea
                      value={point}
                      onChange={(event) => updateMisiPoint(index, event.target.value)}
                      rows={2}
                      className="min-h-10 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      placeholder="Tuliskan satu poin misi"
                    />
                    <button type="button" onClick={() => removeMisiPoint(index)} aria-label={`Hapus poin misi ${index + 1}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-50">
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setMisiPoints((points) => [...points, ""])} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                <Plus size={16} /> Tambah poin misi
              </button>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{misiPoints.filter((point) => point.trim()).length} poin</span>
                {misi.trim() && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 size={14} />
                    <span className="font-medium">Terisi</span>
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
              <motion.button
                onClick={() => handleSave('misi')}
                disabled={isSavingMisi || !misi.trim()}
                whileHover={{ scale: isSavingMisi || !misi.trim() ? 1 : 1.02 }}
                whileTap={{ scale: isSavingMisi || !misi.trim() ? 1 : 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingMisi ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Simpan Misi</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Preview Misi */}
          {misi.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green-100 bg-green-50 p-4"
            >
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900">Preview Misi</h4>
                  <div className="mt-3 rounded-lg bg-white p-4 border border-green-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {misi}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-gray-600 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">Catatan Penting:</p>
            <ul className="mt-2 space-y-1">
              <li>• Perubahan akan langsung terlihat di halaman publik setelah disimpan</li>
              <li>• Pastikan untuk memeriksa kembali ejaan dan tata bahasa sebelum menyimpan</li>
              <li>• Visi dan Misi dapat diperbarui kapan saja sesuai kebutuhan organisasi</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
