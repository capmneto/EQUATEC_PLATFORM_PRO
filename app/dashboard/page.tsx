import { InternalCard } from "@/components/internal/InternalCard";
import { InternalShell } from "@/components/internal/InternalShell";

const modules = [
  {
    title: "HUB BONUS",
    description:
      "Biblioteca de modelos, prompts, checklists e ferramentas digitais para acelerar entregas e padronizar a gestão.",
    href: "/hub-bonus",
  },
  {
    title: "Gestão de Obras",
    description:
      "Controle de cronogramas, medições, orçamento, avanço físico-financeiro, documentos e relatórios executivos.",
    href: "/obras",
  },
  {
    title: "Franquias e Sociedades",
    description:
      "Gestão de aportes, despesas, receitas, ativos, documentos, responsabilidades e indicadores do negócio.",
    href: "/franquias",
  },
  {
    title: "IA Corporativa",
    description:
      "Agentes inteligentes para análise documental, relatórios, classificação de informações e apoio à decisão.",
    href: "/ia",
  },
  {
    title: "Cursos e Treinamentos",
    description:
      "Trilhas, materiais técnicos, avaliações, certificados e capacitações em IA aplicada à gestão.",
    href: "/cursos",
  },
  {
    title: "Automações e n8n",
    description:
      "Fluxos automatizados, webhooks, notificações, aprovações, alertas e integrações com IA.",
    href: "/automacoes",
  },
];

export default function DashboardPage() {
  return (
    <InternalShell
      title="Dashboard Principal"
      eyebrow="Ambiente de Gestão Integrada"
      subtitle="Visão executiva dos módulos do ecossistema EQUATEC para gestão, engenharia, automação, inteligência artificial, treinamentos e tomada de decisão."
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 16,
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
          marginTop: 20,
          padding: 26,
          borderRadius: 22,
          overflow: "hidden",
        }}
      >
        <span
          className="badge"
          style={{
            fontSize: 10,
            padding: "7px 12px",
          }}
        >
          Próxima geração da gestão digital
        </span>

        <h2
          className="card-title-large"
          style={{
            fontSize: "clamp(30px, 2.6vw, 46px)",
            lineHeight: 1.04,
            marginTop: 16,
            marginBottom: 14,
            letterSpacing: "-0.055em",
          }}
        >
          Uma plataforma em evolução para elevar performance, produtividade e decisão.
        </h2>

        <p
          style={{
            fontSize: "clamp(15px, 0.95vw, 18px)",
            lineHeight: 1.5,
            maxWidth: 1180,
            margin: 0,
          }}
        >
          O EQUATEC Platform Pro está sendo desenvolvido para integrar gestão,
          engenharia, automação e inteligência artificial em uma experiência única.
          A proposta é reduzir controles manuais, acelerar análises, padronizar
          processos, apoiar decisões executivas e permitir o desenvolvimento de novos
          sistemas com tecnologias modernas e orientadas a dados.
        </p>
      </div>
    </InternalShell>
  );
}
