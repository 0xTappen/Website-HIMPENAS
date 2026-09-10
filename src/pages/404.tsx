import type { NextPage } from "next";
import StatusPage from "@/components/StatusPage";

const NotFoundPage: NextPage = () => (
  <StatusPage
    code="404"
    title="Halaman tidak ditemukan"
    description="Alamat yang Anda buka tidak tersedia atau mungkin telah dipindahkan."
  />
);

export default NotFoundPage;
