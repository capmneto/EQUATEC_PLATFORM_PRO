import { InternalCard } from "@/components/internal/InternalCard";
import { InternalShell } from "@/components/internal/InternalShell";

const modules = [
  {
    title: "HUB BONUS",
    description:
      "Área especial para prompts, modelos, checklists, ferramentas rápidas, materiais técnicos e recursos digitais de apoio.",
    href: "/hub-bonus",
  },
  {
    title: "Gestão de Obras",
    description:
      "Controle de obras, cronogramas, medições, orçamento, avanço físico-financeiro, documentos e relatórios.",
    href: "/obras",
  },
  {
    title: "Gestão de Franquias e Sociedades",
    description:
      "Controle societário, aportes, despesas, receitas, ativos, responsabilidades e indicadores de resultado.",
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
      "Trilhas EAD, aulas, materiais técnicos, avaliações, certificados e treinamentos de IA aplicada à gestão.",
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
      subtitle="Visão executiva inicial da plataforma EQUATEC, reunindo os módulos estruturantes do ecossistema em uma base única, modular e escalável."
    >
      <div className="grid grid-3">
        {modules.map((module) => (
          <InternalCard
            key={module.title}
            title={module.title}
            description={module.description}
            href={module.href}
          />
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <span className="badge">Status da Plataforma</span>
        <h2 className="card-title-large">Fundação funcional em implantação</h2>
        <p>
          Esta etapa cria a primeira camada visual do ambiente interno. As próximas
          fases irão adicionar autenticação real, usuários, permissões, aprovação de
          acessos, banco de dados, auditoria e módulos operacionais.
        </p>
      </div>
    </InternalShell>
  );
}
