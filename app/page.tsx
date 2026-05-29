import Link from "next/link";

const ecosystemModules = [
  {
    title: "Gestão Financeira de Contratos",
    description:
      "Diagnóstico contratual, revisão orçamentária e provisão mensal de Resultado/EBITDA com 7.5, 9.1, 8.2.1, PEC, DFP e regras contábeis.",
    href: "/admin/financeiro-contratos",
    status: "Novo módulo",
  },
  {
    title: "Admin Hub",
    description:
      "Painel central do ecossistema, com acesso aos módulos administrativos, IA, governança, usuários, auditoria e operações.",
    href: "/admin",
    status: "Core",
  },
  {
    title: "Gestão de Obras",
    description:
      "Controle operacional de obras com projetos, documentos, diário, checklist, pagamentos, orçamento, automações e IA.",
    href: "/admin/obras",
    status: "Produto",
  },
  {
    title: "BID AI",
    description:
      "Inteligência para propostas técnicas e comerciais, premissas, riscos, composição de escopo e estratégia de contratação.",
    href: "/admin/bid",
    status: "IA Comercial",
  },
  {
    title: "HUB IA",
    description:
      "Laboratório corporativo de agentes, RAG, memória, playground de IA e especialistas técnicos do ecossistema.",
    href: "/admin/agents",
    status: "IA",
  },
  {
    title: "Document AI",
    description:
      "Upload, OCR, análise documental, extração de texto e base para inteligência documental em todos os produtos.",
    href: "/admin/document-ai",
    status: "Documentos",
  },
  {
    title: "Cursos / EAD",
    description:
      "Base para trilhas de capacitação, treinamentos, materiais, conteúdos técnicos e expansão educacional da EQUATEC.",
    href: "/cursos",
    status: "Educação",
  },
  {
    title: "Automações",
    description:
      "Preparação para n8n, integrações, notificações, fluxos automáticos, WhatsApp, Telegram e rotinas inteligentes.",
    href: "/automacoes",
    status: "Integração",
  },
];

const valuePillars = [
  "Gestão integrada",
  "IA aplicada",
  "Engenharia",
  "Financeiro",
  "Obras",
  "Documentos",
  "Automação",
  "Governança",
];

const highlights = [
  {
    label: "Ecossistema",
    value: "SaaS + IA",
  },
  {
    label: "Módulos estratégicos",
    value: "7+",
  },
  {
    label: "Novo produto",
    value: "Financeiro",
  },
  {
    label: "Base técnica",
    value: "Next.js",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32rem),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34rem)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          <header className="mb-16 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
                EQUATEC
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Tecnologia • Gestão Integrada • Engenharia • IA Aplicada
              </p>
            </div>

            <nav className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Login
              </Link>

              <Link
                href="/admin"
                className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
              >
                Acessar Admin Hub
              </Link>
            </nav>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {valuePillars.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <h1 className="max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
                Ecossistema EQUATEC para gestão, engenharia e inteligência
                operacional.
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Plataforma modular para transformar planilhas, documentos,
                rotinas operacionais, obras, contratos financeiros e decisões
                executivas em um ambiente integrado com IA, rastreabilidade,
                padronização e automações.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/admin/financeiro-contratos"
                  className="rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Abrir Gestão Financeira de Contratos
                </Link>

                <Link
                  href="/admin/obras"
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-sm font-black text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  Abrir Gestão de Obras
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950">
                <img
                  src="/home/carlos-machado.jpg"
                  alt="Carlos Machado - idealizador do Ecossistema EQUATEC"
                  className="h-[360px] w-full object-cover object-top"
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                  Idealizador do Ecossistema
                </p>

                <h2 className="mt-3 text-3xl font-black">Carlos Machado</h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Gestão da Manutenção Industrial • Engenharia Especializada •
                  Soluções com Inteligência Artificial aplicada à gestão.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/5522998578981"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    WhatsApp
                  </a>

                  <a
                    href="mailto:capmneto@gmail.com"
                    className="rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    E-mail
                  </a>

                  <a
                    href="https://www.linkedin.com/in/carlos-machado-95917433/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 grid gap-4 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <p className="text-sm text-slate-400">{item.label}</p>
                <strong className="mt-2 block text-3xl font-black text-white">
                  {item.value}
                </strong>
              </div>
            ))}
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
            Módulos do Ecossistema
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Um hub modular para operação, gestão e tomada de decisão.
          </h2>

          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-400">
            A arquitetura permite evoluir cada produto de forma independente,
            reaproveitando autenticação, IA, documentos inteligentes, memória,
            RAG, auditoria, logs, uploads e automações.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemModules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/60 hover:bg-slate-900/80"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="text-xl font-black">{module.title}</h3>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.65rem] font-black uppercase text-cyan-300">
                  {module.status}
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {module.description}
              </p>

              <p className="mt-5 text-sm font-black text-cyan-300">
                Acessar módulo →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

