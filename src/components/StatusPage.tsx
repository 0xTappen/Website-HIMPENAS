import Link from "next/link";
import { House, RefreshCw, TriangleAlert } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface StatusPageProps {
  code: string;
  title: string;
  description: string;
  showRetry?: boolean;
}

const StatusPage = ({ code, title, description, showRetry = false }: StatusPageProps) => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <Navbar />
    <main className="flex flex-1 items-center pt-24">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 text-center md:py-24">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-emerald-200 bg-emerald-50 text-emerald-800">
          <TriangleAlert aria-hidden="true" className="h-7 w-7" />
        </div>
        <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-emerald-700">{code}</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-emerald-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-900">
            <House aria-hidden="true" className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          {showRetry && (
            <button type="button" onClick={() => window.location.reload()} className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100">
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              Coba Lagi
            </button>
          )}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default StatusPage;
