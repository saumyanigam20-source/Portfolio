import type { Metadata } from "next";
import "./prototype.css";

const themeBoot = `(function(){try{var t=localStorage.getItem("odo-theme");var dark=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.odoAppearance=dark?"dark":"light";}catch(e){}})();`;

export const metadata: Metadata = {
  title: "odo prototype",
  description: "A phone prototype for logging fuel, parts and services.",
  icons: { icon: "/odo/odo-icon.svg" },
};

export default function VehicleRecorderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="odo-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
      />
      <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      {children}
    </div>
  );
}
