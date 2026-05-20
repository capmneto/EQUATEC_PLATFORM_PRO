import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
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

        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="brand">
              EQUATEC
            </Link>

            <nav className="nav-links">
              <Link href="/">Ecossistema</Link>
              <Link href="/sobre">Sobre</Link>
              <Link href="/modulos">Módulos</Link>
              <Link href="/contato">Contato</Link>
              <Link href="/login" className="btn btn-primary">
                Acessar Plataforma
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}