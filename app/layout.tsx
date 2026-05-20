import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "EQUATEC — Ecossistema de Tecnologia e Gestão Integrada",
  description:
    "Plataforma EQUATEC para tecnologia, engenharia, automação, inteligência artificial e gestão integrada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}