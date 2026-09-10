import type { NextPage } from "next";
import { Instagram, Mail, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const KontakPage: NextPage = () => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <Navbar />
    <main className="flex-1 pt-24">
      <section className="bg-emerald-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Hubungi HIMPENAS</h1>
          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">Terhubung dengan kami untuk informasi organisasi dan kegiatan.</p>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 py-14 md:grid-cols-3">
        <a href="mailto:himpenas@gmail.com" className="border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
          <Mail className="mx-auto h-7 w-7 text-emerald-700" />
          <h2 className="mt-4 font-semibold text-gray-900">Email</h2>
          <p className="mt-2 text-sm text-gray-600">himpenas@gmail.com</p>
        </a>
        <a href="https://www.instagram.com/himpenas_itsb" target="_blank" rel="noreferrer" className="border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
          <Instagram className="mx-auto h-7 w-7 text-emerald-700" />
          <h2 className="mt-4 font-semibold text-gray-900">Instagram</h2>
          <p className="mt-2 text-sm text-gray-600">@himpenas_itsb</p>
        </a>
        <div className="border border-gray-200 bg-white p-6 text-center shadow-sm">
          <MapPin className="mx-auto h-7 w-7 text-emerald-700" />
          <h2 className="mt-4 font-semibold text-gray-900">Alamat</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">Kota Deltamas Lot-A1 CBD, Cikarang Pusat, Bekasi</p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default KontakPage;
