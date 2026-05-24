import Link from "next/link";

const pipeline = [
  "NOVO",
  "ANÁLISE",
  "RFI",
  "PRECIFICAÇÃO",
  "PROPOSTA",
  "ENVIADA",
  "GANHA",
  "PERDIDA",
];

const mockProjects = [
  {
    id: 1,
    client: "Braskem",
    project: "Contrato de Manutenção PVC AL2",
    type: "Contrato Fixo",
    status: "EM PRECIFICAÇÃO",
    risk: "MÉDIO",
    responsible: "Carlos Machado",
    deadline: "30/05/2026",
  },
  {
    id: 2,
    client: "Stellantis",
    project: "Facilities Industrial",
    type: "Facilities",
    status: "RFI",
    risk: "ALTO",
    responsible: "Equipe Comercial",
    deadline: "05/06/2026",
  },
];

export default function BidDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold">
              EQUATEC ECOSYSTEM
            </span>

            <h1 className="text-5xl font-black mt-4 tracking-tight">
              BID AI
            </h1>

            <p className="text-slate-400 mt-4 max-w-3xl leading-7">
              Plataforma inteligente para interpretação de editais,
              precificação, análise de riscos, checklist técnico-comercial,
              memória de cálculo e gestão estratégica de propostas industriais.
            </p>
          </div>

          <Link
            href="#"
            className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-4 rounded-2xl font-bold text-slate-950"
          >
            + Nova Proposta
          </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <KpiCard title="Total de Propostas" value="24" />
          <KpiCard title="Em Precificação" value="8" />
          <KpiCard title="Aguardando RFI" value="5" />
          <KpiCard title="Margem Média" value="18,4%" />
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Pipeline Comercial</h2>

            <span className="text-slate-400 text-sm">
              Fluxo operacional do BID AI
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            {pipeline.map((step) => (
              <div
                key={step}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center"
              >
                <span className="text-sm font-semibold text-slate-300">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold">
                Projetos de Propostas
              </h2>

              <p className="text-slate-400 mt-1">
                Gestão centralizada das oportunidades comerciais.
              </p>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-slate-950">
                <tr>
                  <Th>Cliente</Th>
                  <Th>Projeto</Th>
                  <Th>Tipo</Th>
                  <Th>Status</Th>
                  <Th>Risco</Th>
                  <Th>Responsável</Th>
                  <Th>Prazo</Th>
                </tr>
              </thead>

              <tbody>
                {mockProjects.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <Td>{item.client}</Td>
                    <Td>{item.project}</Td>
                    <Td>{item.type}</Td>
                    <Td>
                      <StatusBadge label={item.status} />
                    </Td>
                    <Td>
                      <RiskBadge label={item.risk} />
                    </Td>
                    <Td>{item.responsible}</Td>
                    <Td>{item.deadline}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function KpiCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
      <span className="text-slate-400 text-sm">{title}</span>

      <strong className="block mt-4 text-4xl font-black tracking-tight">
        {value}
      </strong>
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex px-3 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
      {label}
    </span>
  );
}

function RiskBadge({ label }: { label: string }) {
  const styles =
    label === "ALTO"
      ? "bg-red-500/15 border-red-500/20 text-red-300"
      : "bg-yellow-500/15 border-yellow-500/20 text-yellow-300";

  return (
    <span
      className={`inline-flex px-3 py-2 rounded-full border text-xs font-bold ${styles}`}
    >
      {label}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-6 py-5 text-slate-300 whitespace-nowrap">
      {children}
    </td>
  );
}