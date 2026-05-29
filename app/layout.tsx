import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EQUATEC Platform Pro",
  description:
    "Ecossistema EQUATEC de tecnologia, gestão integrada, IA, engenharia, obras, contratos financeiros e automações.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
