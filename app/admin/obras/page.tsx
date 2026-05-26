import Link from "next/link";

const kpis = [
  { label: "Obras ativas", value: "0" },
  { label: "Orçamentos", value: "0" },
  { label: "Pagamentos pendentes", value: "0" },
  { label: "Marcos críticos", value: "0" },
];

const modules = [
  {
    title: "Projetos / Obras",
    description: "Cadastro das obras, cliente, local, responsáveis, status, datas e visão executiva.",
    href: "/admin/obras/projetos",
    status: "Base",
  },
  {
    title: "Orçamentos",
    description: "Gestão e análise de orçamentos, propostas, previsto x contratado x realizado.",
    href: "/admin/obras/orcamentos",
    status: "Planejado",
  },
  {
    title: "Pagamentos",
    description: "Controle de parcelas, vencimentos, pagamentos realizados, pendências e fluxo financeiro.",
    href: "/admin/obras/pagamentos",
    status: "Planejado",
  },
  {
    title: "Documentos da Obra",
    description: "Contratos, notas fiscais, ART, memoriais, projetos, imagens, PDFs e arquivos técnicos.",
    href: "/admin/obras/documentos",
    status: "Planejado",
  },
  {
    title: "Checklist e Marcos",
    description: "Checklist por fase, qualidade, liberações, marcos físicos e pontos de controle.",
    href: "/admin/obras/checklist",
    status: "Planejado",
  },
  {
    title: "Diário de Obra",
    description: "Registro diário de avanço, ocorrências, clima, equipe, fotos, pendências e decisões.",
    href: "/admin/obras/diario",
    status: "Planejado",
  },
  {
    title: "Fotos e Evidências",
    description: "Registro visual da evolução da obra com evidências por etapa e data.",
    href: "/admin/obras/fotos",
    status: "Planejado",
  },
  {
    title: "Fornecedores",
    description: "Cadastro de fornecedores, prestadores, contratos, contatos e histórico de fornecimento.",
    href: "/admin/obras/fornecedores",
    status: "Planejado",
  },
  {
    title: "Automações n8n",
    description: "Alertas, lembretes, aprovações, relatórios automáticos e rotinas programadas.",
    href: "/admin/obras/automacoes",
    status: "Futuro",
  },
  {
    title: "WhatsApp / Telegram",
    description: "Entrada operacional por mensagens, fotos, ocorrências, documentos e comandos autorizados.",
    href: "/admin/obras/canais",
    status: "Futuro",
  },
  {
    title: "IA da Obra",
    description: "Análise de orçamento, documentos, riscos, desvios, memorial e resumo executivo.",
    href: "/admin/obras/ia",
    status: "IA",
  },
];

export default function ObrasAdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Cockpit Operacional de Obras
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Módulo estratégico para gestão integrada de obras, contemplando
            orçamentos, pagamentos, documentos, checklist, marcos, diário de obra,
            fornecedores, automações, canais operacionais e inteligência artificial.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {kpis.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <strong className="mt-2 block text-3xl font-black text-white">
                {item.value}
              </strong>
            </div>
          ))}
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Submódulos da Obra</h2>

          <p className="mt-2 text-sm text-slate-400">
            Estrutura operacional preparada para controle físico, financeiro,
            documental, comunicação por canais externos e automações.
          </p>

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
