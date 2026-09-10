import type { NextPage } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const TermsPage: NextPage = () => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <Navbar />
    <main className="flex-1 pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16 text-gray-700">
        <h1 className="text-4xl font-bold text-gray-900">Syarat dan Ketentuan</h1>
        <p className="mt-6 leading-relaxed">Dengan menggunakan situs HIMPENAS, Anda setuju memakai informasi yang tersedia secara bertanggung jawab dan sesuai ketentuan yang berlaku.</p>
        <h2 className="mt-10 text-2xl font-semibold text-gray-900">Konten Situs</h2>
        <p className="mt-3 leading-relaxed">Konten organisasi dapat berubah sewaktu-waktu. Penggunaan kembali foto, tulisan, atau identitas HIMPENAS harus mencantumkan sumber dan memperoleh izin bila diperlukan.</p>
        <h2 className="mt-10 text-2xl font-semibold text-gray-900">Tautan Eksternal</h2>
        <p className="mt-3 leading-relaxed">Situs dapat memuat tautan ke layanan lain. HIMPENAS tidak bertanggung jawab atas kebijakan atau konten layanan eksternal tersebut.</p>
      </article>
    </main>
    <Footer />
  </div>
);

export default TermsPage;
