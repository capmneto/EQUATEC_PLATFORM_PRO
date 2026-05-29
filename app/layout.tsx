import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EQUATEC Platform Pro",
  description: "Ecossistema EQUATEC de tecnologia, gestão integrada, IA, engenharia, obras e gestão financeira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
