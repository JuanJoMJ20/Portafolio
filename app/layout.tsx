import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Neo-grotesca para titulares y texto; monoespaciada solo para micro-etiquetas
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Juan José Muñoz Jurado | Desarrollador Full Stack",
  description:
    "Portafolio de Juan José Muñoz Jurado, desarrollador Full Stack y fundador de MJ Digital Lab en Pasto, Colombia.",
};

// Se ejecuta antes del primer pintado para aplicar el tema guardado sin parpadeo.
// Por defecto el sitio arranca en modo claro; el oscuro se activa con el botón.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${interTight.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans text-fg">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
