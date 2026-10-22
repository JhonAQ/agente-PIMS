import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PIMS Auditor | Plataforma de Auditoría de Sistemas y LPDP N° 29733",
  description:
    "Suite pericial de auditoría técnica y regulatoria bajo la Ley N° 29733, D.S. 003-2013-JUS, R.D. 019-2013-JUS y directivas de la UNSA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#070d1e] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
