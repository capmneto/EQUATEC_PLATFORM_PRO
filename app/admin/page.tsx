import Link from "next/link";

const modules = [
  {
    title: "BID AI",
    description: "Propostas técnicas, comerciais, checklist, riscos e precificação.",
    href: "/admin/bid",
    status: "Em implantação",
  },
  {
    title: "CRM de Leads",
    description: "Base comercial inicial com contatos, interesses e status.",
    href: "/admin/leads",
    status: "Operacional",
  },
  {
    title: "Auditoria",
    description: "Rastreabilidade das ações críticas e eventos do sistema.",
    href: "/admin/auditoria",
    status: "Operacional",
  },
  {
    title: "Usuários",
    description: "Gestão de acessos, aprovações e perfis da plataforma.",
    href: "/admin/usuarios",
    status: "Estrutural",
  },
  {
    title: "Obras",
    description: "Gestão físico-financeira, etapas, documentos e medições.",
    href: "/obras",
    status: "Planejado",
  },
  {
    title: "IA Corporativa",
    description: "Agentes, análises documentais e automações inteligentes.",
    href: "/ia",
    status: "Planejado",
  },
];

const kpis = [
  { label: "Módulos mapeados", value: "12+" },
  { label: "Rotas validadas no build", value: "23" },
  { label: "Status da plataforma", value: "Core OK" },
  { label: "Fase atual", value: "SaaS Core" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC Control Hub
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Cockpit Executivo da Plataforma
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
                Núcleo central para governança dos módulos, acompanhamento da
                evolução SaaS, gestão administrativa, inteligência artificial,
                propostas comerciais, CRM, auditoria e futuras automações do
                ecossistema EQUATEC.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Ambiente atual</p>
              <strong className="mt-2 block text-2xl text-cyan-300">
                Produção preparada
              </strong>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Build validado, rotas principais reconhecidas e base pronta para
                avanço modular controlado.
              </p>
            </div>
          </div>
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

        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Módulos da Plataforma</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Acesso rápido aos blocos operacionais e administrativos.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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
                    Abrir módulo →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-black">Próximos Marcos</h2>

              <div className="mt-5 space-y-4">
                {[
                  "Criar estrutura oficial de módulos",
                  "Implantar controle de acesso modular",
                  "Criar base AI Core com Gemini",
                  "Criar documentos inteligentes",
                  "Preparar billing SaaS futuro",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-black text-cyan-300">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
              <h2 className="text-xl font-black text-cyan-200">
                Diretriz de Governança
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-200">
                Toda nova funcionalidade deve preservar o core, respeitar
                permissões, manter rastreabilidade e nascer preparada para
                operação SaaS, módulos pagos e uso futuro de IA.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}