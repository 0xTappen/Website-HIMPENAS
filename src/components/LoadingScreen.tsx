import { LoaderCircle } from "lucide-react";

interface LoadingScreenProps {
  visible: boolean;
}

const LoadingScreen = ({ visible }: LoadingScreenProps) => {
  if (!visible) return null;

  return (
    <div aria-label="Memuat halaman" aria-live="polite" className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm" role="status">
      <div className="flex items-center gap-3 border border-emerald-100 bg-white px-5 py-4 text-sm font-medium text-emerald-800 shadow-lg">
        <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
        <span>Memuat halaman...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
