import { InternalCard } from "@/components/internal/InternalCard";
import { InternalShell } from "@/components/internal/InternalShell";

const modules = [
  {
    title: "HUB BONUS",
    description:
      "Modelos, prompts, checklists, ferramentas rápidas, materiais técnicos e recursos digitais para acelerar a rotina de gestão.",
    href: "/hub-bonus",
  },
  {
    title: "Gestão de Obras",
    description:
      "Controle de obras, cronogramas, medições, orçamento, avanço físico-financeiro, documentos e relatórios.",
    href: "/obras",
  },
  {
    title: "Franquias e Sociedades",
    description:
      "Gestão de aportes, despesas, receitas, ativos, responsabilidades, documentos e indicadores de resultado.",
    href: "/franquias",
  },
  {
    title: "IA Corporativa",
    description:
      "Agentes inteligentes, análise documental, geração de relatórios, classificação de informações e apoio à decisão.",
    href: "/ia",
  },
  {
    title: "Cursos e Treinamentos",
    description:
      "Trilhas EAD, materiais técnicos, avaliações, certificados e treinamentos de IA aplicada à gestão.",
    href: "/cursos",
  },
  {
    title: "Automações e n8n",
    description:
      "Fluxos de trabalho, webhooks, notificações, aprovações, alertas e automações integradas com IA.",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
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
          marginTop: 22,
          padding: 28,
          borderRadius: 24,
        }}
      >
        <span className="badge">Status da Plataforma</span>

        <h2
          className="card-title-large"
          style={{
            fontSize: "clamp(34px, 3.2vw, 56px)",
            lineHeight: 1,
            marginTop: 18,
            marginBottom: 18,
          }}
        >
          Ambiente interno em desenvolvimento
        </h2>

        <p
          style={{
            fontSize: "clamp(16px, 1.1vw, 20px)",
            lineHeight: 1.55,
            maxWidth: 1180,
          }}
        >
          Esta área será evoluída gradualmente com autenticação, usuários,
          permissões, aprovação de acessos, banco de dados, auditoria e módulos
          operacionais. A base visual inicial já está criada para permitir a
          expansão segura do ecossistema.
        </p>
      </div>
    </InternalShell>
  );
}
