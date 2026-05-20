import type { Metadata } from "next";
import Link from "next/link";
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

        <header className="topbar">
          <div className="topbar-inner">
            <Link href="/" className="logo">
              EQUA<span>TEC</span>
            </Link>

            <nav className="menu">
              <Link href="/">Início</Link>
              <Link href="/#ecossistema">Ecossistema</Link>
              <Link href="/modulos">Módulos</Link>
              <Link href="/sobre">Sobre</Link>
              <Link href="/contato">Contato</Link>
              <Link href="/login" className="login-button">
                Entrar
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}