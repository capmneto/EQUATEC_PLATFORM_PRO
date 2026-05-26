import Link from "next/link";

const modules = [
  {
    title: "Proposal Copilot",
    description: "Agente para propostas técnicas, premissas, riscos, escopo e estratégia comercial.",
    href: "/admin/agents/proposal",
    status: "Agent",
  },
  {
    title: "SSMA Agent",
    description: "Agente para riscos, APR, PT, bloqueios, desvios e segurança operacional.",
    href: "/admin/agents/ssma",
    status: "Agent",
  },
  {
    title: "PMOC Agent",
    description: "Agente para PMOC, climatização, ANVISA, manutenção preventiva e facilities.",
    href: "/admin/agents/pmoc",
    status: "Agent",
  },
  {
    title: "Histórico dos Agentes",
    description: "Consulta ao histórico persistente das interações dos agentes especialistas.",
    href: "/admin/agent-history",
    status: "History",
  },
  {
    title: "Memory Dashboard",
    description: "Visualização da memória documental, registros vetoriais e busca semântica.",
    href: "/admin/memory",
    status: "Memory V1",
  },
  {
    title: "Document AI",
    description: "Upload TXT/PDF/imagens, OCR, extração documental e análise inteligente.",
    href: "/admin/document-ai",
    status: "V3 OCR",
  },
];

const kpis = [
  { label: "Agentes ativos", value: "6" },
  { label: "Histórico", value: "Ativo" },
  { label: "Base técnica", value: "OCR + RAG" },
  { label: "Fase atual", value: "Enterprise AI" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC Control Hub
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Cockpit Executivo da Plataforma
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Núcleo central para agentes especialistas, histórico inteligente,
            memória técnica, RAG, análise documental, propostas comerciais e
            evolução SaaS do ecossistema EQUATEC.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {kpis.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <strong className="mt-2 block text-2xl font-black text-white">
                {item.value}
              </strong>
            </div>
          ))}
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Agentes e Módulos da Plataforma</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-400/60 hover:bg-slate-900"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-black text-white">
                    {module.title}
                  </h3>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                    {module.status}
                  </span>
                </div>

                <p className="text-sm leading-6 text-slate-400">
                  {module.description}
                </p>

                <p className="mt-4 text-sm font-bold text-cyan-300">
                  Abrir →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
