import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { globalSchema } from "@/lib/seo/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://novo.equatec-eng.com.br"),
  title: {
    default:
      "EQUATEC | Plataforma SaaS de Gestão para Engenharia e Manutenção Industrial",
    template: "%s | EQUATEC",
  },
  description:
    "Plataforma SaaS para gestão de contratos de manutenção industrial, obras, PMOC, propostas técnicas (BID AI) e confiabilidade humana. Criada por Carlos Machado, Engenheiro Mecânico e de Segurança do Trabalho.",
  keywords: [
    "gestão de contratos de manutenção industrial",
    "gestão de obras",
    "PMOC",
    "proposta técnica para manutenção industrial",
    "facilities",
    "BID AI",
    "confiabilidade humana",
    "gestão orçamentária de contratos",
    "EQUATEC",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://novo.equatec-eng.com.br",
    siteName: "EQUATEC",
    title:
      "EQUATEC | Plataforma SaaS de Gestão para Engenharia e Manutenção Industrial",
    description:
      "Plataforma SaaS para gestão de contratos, obras, PMOC, propostas técnicas e confiabilidade humana em operações industriais.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "EQUATEC | Plataforma SaaS de Gestão para Engenharia e Manutenção Industrial",
    description:
      "Plataforma SaaS para gestão de contratos, obras, PMOC, propostas técnicas e confiabilidade humana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <JsonLd data={globalSchema} />
        {children}
      </body>
    </html>
  );
}
