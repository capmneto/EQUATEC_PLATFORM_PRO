import { InternalCard } from "@/components/internal/InternalCard";
import { InternalShell } from "@/components/internal/InternalShell";

const modules = [
  {
    title: "HUB BONUS",
    description:
      "Modelos, prompts, checklists e ferramentas digitais para acelerar entregas.",
    href: "/hub-bonus",
  },
  {
    title: "Gestão de Obras",
    description:
      "Cronogramas, medições, orçamento, documentos e avanço físico-financeiro.",
    href: "/obras",
  },
  {
    title: "Franquias e Sociedades",
    description:
      "Aportes, despesas, receitas, ativos, documentos e indicadores do negócio.",
    href: "/franquias",
  },
  {
    title: "IA Corporativa",
    description:
      "Agentes inteligentes para documentos, relatórios e apoio à decisão.",
    href: "/ia",
  },
  {
    title: "Cursos e Treinamentos",
    description:
      "Trilhas, materiais técnicos, avaliações, certificados e capacitações.",
    href: "/cursos",
  },
  {
    title: "Automações e n8n",
    description:
      "Webhooks, notificações, aprovações, alertas e integrações com IA.",
    href: "/automacoes",
  },
];

export default function DashboardPage() {
  return (
    <InternalShell
      title="Dashboard Principal"
      eyebrow="Gestão, Engenharia, Automação e IA"
      subtitle="Visão executiva dos módulos do ecossistema EQUATEC para centralizar informações, acelerar análises, padronizar processos e apoiar decisões."
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(245px, 1fr))",
          gap: 14,
        }}
      >
        {modules.map((module) => (
          <InternalCard
            key={module.title}
            title={module.title}
            description={module.description}
            href={module.href}
          />
        ))}
      </div>

      <div
        className="card"
        style={{
          marginTop: 18,
          padding: 22,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <span
          className="badge"
          style={{
            fontSize: 9,
            padding: "6px 10px",
          }}
        >
          Próxima geração da gestão digital
        </span>

        <h2
          style={{
            fontSize: "clamp(26px, 2vw, 38px)",
            lineHeight: 1.08,
            marginTop: 14,
            marginBottom: 12,
            letterSpacing: "-0.05em",
          }}
        >
          Tecnologia aplicada para elevar produtividade, performance e tomada de decisão.
        </h2>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.5,
            maxWidth: 1100,
            margin: 0,
            color: "rgba(226, 232, 240, 0.78)",
          }}
        >
          O EQUATEC Platform Pro está sendo desenvolvido para integrar gestão,
          engenharia, automação e inteligência artificial em uma experiência única.
          A proposta é reduzir controles manuais, acelerar análises, estruturar
          dados, apoiar decisões executivas e permitir a criação de novos sistemas
          com tecnologias modernas, escaláveis e orientadas à experiência do usuário.
        </p>
      </div>
    </InternalShell>
  );
}
