// lib/seo/schema.ts
// Fonte única de verdade para os dados de schema.org (JSON-LD) do site.
// Importado pelo layout.tsx (global) e por páginas específicas quando necessário.

const SITE_URL = "https://novo.equatec-eng.com.br";

/**
 * Organization — representa a EQUATEC como entidade.
 * Sem CNPJ por decisão do proprietário (Carlos Machado) em 21/06/2026.
 * Pode ser complementado com CNPJ, endereço e telefone quando disponível.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "EQUATEC",
  alternateName: "EQUATEC Engenharia e Tecnologia",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-equatec.png`,
  description:
    "Ecossistema SaaS de gestão para engenharia, manutenção industrial e contratos técnicos, com módulos de Gestão de Contratos, Gestão de Obras, PMOC AI, Confiabilidade Humana 360 e Mercados Autônomos.",
  founder: {
    "@type": "Person",
    name: "Carlos Machado",
  },
  sameAs: [
    "https://www.linkedin.com/in/carlos-machado-95917433/",
    "https://wa.me/5522998578981",
  ],
};

/**
 * SoftwareApplication — representa a plataforma EQUATEC Platform Pro como produto SaaS.
 */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "EQUATEC Platform Pro",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Gestão de Engenharia e Manutenção Industrial",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Plataforma SaaS modular para gestão de contratos de manutenção industrial, obras, PMOC, propostas técnicas (BID AI) e confiabilidade humana em operações críticas.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Person",
    name: "Carlos Machado",
  },
};

/**
 * Person — representa Carlos Machado como fundador/autoridade técnica.
 * Usado na home e em páginas "Sobre".
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person-carlos-machado`,
  name: "Carlos Machado",
  alternateName: "Carlos Américo Pereira Machado Neto",
  jobTitle: "Coordenador de Manutenção Multidisciplinar | Engenheiro Mecânico e de Segurança do Trabalho",
  worksFor: {
    "@type": "Organization",
    name: "In-Haus Industrial (Grupo GPS)",
  },
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/carlos-machado-95917433/"],
  knowsAbout: [
    "Manutenção Industrial",
    "Gestão de Contratos",
    "PMOC",
    "Facilities",
    "Engenharia de Segurança do Trabalho",
    "Gestão de Obras",
    "Propostas Técnicas e Comerciais",
  ],
};

/** Conjunto padrão para injeção global (layout.tsx). */
export const globalSchema = [organizationSchema, softwareApplicationSchema, personSchema];
