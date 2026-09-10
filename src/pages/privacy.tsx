import type { NextPage } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PrivacyPage: NextPage = () => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <Navbar />
    <main className="flex-1 pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16 text-gray-700">
        <h1 className="text-4xl font-bold text-gray-900">Kebijakan Privasi</h1>
        <p className="mt-6 leading-relaxed">HIMPENAS menggunakan informasi yang Anda kirim melalui formulir atau email hanya untuk menanggapi kebutuhan komunikasi dan kegiatan organisasi.</p>
        <h2 className="mt-10 text-2xl font-semibold text-gray-900">Data yang Dikumpulkan</h2>
        <p className="mt-3 leading-relaxed">Kami dapat menerima nama, alamat email, dan informasi lain yang Anda berikan secara sukarela saat menghubungi kami.</p>
        <h2 className="mt-10 text-2xl font-semibold text-gray-900">Penggunaan Data</h2>
        <p className="mt-3 leading-relaxed">Data tidak diperjualbelikan dan hanya digunakan untuk komunikasi organisasi, administrasi kegiatan, serta peningkatan layanan situs.</p>
      </article>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage;
