// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@700;900&display=swap"
          rel="stylesheet"
        />
        <title>Himpunan Mahasiswa Pengolahan Sawit</title>
        <meta name="description" content="Portal resmi Himpunan Pengolahan Sawit (HIMPENAS)" />
        <link rel="icon" href="/logo/logo.png" />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900">
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#046A38",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
              fontWeight: "500",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#fff",
                secondary: "#046A38",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#dc2626",
              },
            },
          }}
        />
      </main>
      <LoadingScreen visible={isLoading} />
    </SessionProvider>
  );
}

export default MyApp;
