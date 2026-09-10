import type { NextPageContext } from "next";
import StatusPage from "@/components/StatusPage";

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
  const code = statusCode ? String(statusCode) : "Error";
  const serverError = statusCode && statusCode >= 500;

  return (
    <StatusPage
      code={code}
      title={serverError ? "Terjadi gangguan pada server" : "Terjadi kesalahan"}
      description={serverError ? "Layanan sedang mengalami kendala. Silakan muat ulang halaman beberapa saat lagi." : "Halaman ini tidak dapat ditampilkan. Silakan coba lagi atau kembali ke beranda."}
      showRetry
    />
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => ({
  statusCode: res?.statusCode ?? err?.statusCode,
});

export default ErrorPage;
