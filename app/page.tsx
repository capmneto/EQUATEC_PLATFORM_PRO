import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EQUATEC | Gestão de Contratos, Obras, PMOC e Manutenção Industrial",
  description:
    "Ecossistema EQUATEC: plataforma para gestão de contratos de manutenção industrial, obras, PMOC, propostas técnicas (BID AI), confiabilidade humana e finanças.",
};

const topNav = [
  { label: "Início", href: "/" },
  { label: "Admin Hub", href: "/admin" },
  { label: "Financeiro Contratos", href: "/admin/financeiro-contratos" },
  { label: "Obras", href: "/admin/obras" },
  { label: "FACILMART", href: "/franquias" },
  { label: "Financeiro Pessoal", href: "/financeiro-pessoal" },
  { label: "BID AI", href: "/admin/bid" },
  { label: "HUB IA", href: "/admin/agents" },
  { label: "Document AI", href: "/admin/document-ai" },
  { label: "Cursos/EAD", href: "/cursos" },
  { label: "Automações", href: "/automacoes" },
];

const ecosystemModules = [
  {
    title: "Gestão Financeira de Contratos",
    description:
      "Controle gerencial de contratos com diagnóstico de desempenho, revisão orçamentária, provisão mensal de resultado, margem, EBITDA, análise de desvios e apoio à decisão executiva.",
    href: "/admin/financeiro-contratos",
    status: "Financeiro",
  },
  {
    title: "Gestão de Obras",
    description:
      "Planejamento, orçamento, pagamentos, documentos, diário de obra, checklist, marcos físicos, evidências e visão executiva para obras residenciais, industriais e corporativas.",
    href: "/admin/obras",
    status: "Operacional",
  },
  {
    title: "FACILMART / Gestão Societária",
    description:
      "Organização societária, operação comercial, gestão de investimentos, estrutura de franquias, ativos, expansão e acompanhamento estratégico de negócios físicos.",
    href: "/franquias",
    status: "Negócios",
  },
  {
    title: "Gestão Financeira Pessoal",
    description:
      "Planejamento financeiro, patrimônio, fluxo de caixa, metas, investimentos, compromissos, cenários e visão consolidada para decisões pessoais e familiares de alto impacto.",
    href: "/financeiro-pessoal",
    status: "Finanças",
  },
  {
    title: "BID AI",
    description:
      "Inteligência para propostas técnicas e comerciais, análise de escopo, premissas, riscos, diferenciais competitivos e estruturação de soluções para clientes estratégicos.",
    href: "/admin/bid",
    status: "Comercial",
  },
  {
    title: "HUB IA",
    description:
      "Central de agentes especialistas, memória técnica, RAG, copilotos corporativos e inteligência aplicada à rotina de engenharia, gestão, SSMA, documentos e operações.",
    href: "/admin/agents",
    status: "IA",
  },
  {
    title: "Document AI",
    description:
      "Leitura, organização e análise inteligente de documentos, contratos, memoriais, planilhas, evidências, relatórios e bases técnicas críticas para gestão rastreável.",
    href: "/admin/document-ai",
    status: "Documentos",
  },
  {
    title: "Cursos / EAD",
    description:
      "Ambiente para treinamentos, trilhas técnicas, capacitação profissional, conteúdos digitais, materiais de apoio e produtos educacionais da EQUATEC.",
    href: "/cursos",
    status: "Educação",
  },
  {
    title: "Automações e Integrações",
    description:
      "Preparação para fluxos automáticos com WhatsApp, Telegram, n8n, alertas, aprovações, relatórios executivos e integração entre sistemas.",
    href: "/automacoes",
    status: "Automação",
  },
];

const valuePillars = [
  "Gestão multidisciplinar",
  "Decisão executiva",
  "IA aplicada",
  "Engenharia",
  "Contratos",
  "Obras",
  "Finanças",
  "Governança",
];

const executiveHighlights = [
  {
    label: "Visão integrada",
    value: "Operação + Finanças + IA",
    description:
      "Unifica informações que normalmente ficam dispersas em planilhas, mensagens, documentos e sistemas isolados.",
  },
  {
    label: "Gestão multidisciplinar",
    value: "Engenharia, obras e contratos",
    description:
      "Conecta disciplinas técnicas, financeiras, documentais e operacionais em uma mesma lógica de gestão.",
  },
  {
    label: "Decisão gerencial",
    value: "Indicadores e rastreabilidade",
    description:
      "Transforma dados operacionais em leitura executiva para coordenadores, gerentes, diretores e clientes.",
  },
  {
    label: "Produtividade com IA",
    value: "Análise, memória e automação",
    description:
      "Apoia diagnóstico, leitura documental, geração de relatórios, alertas e padronização de rotinas críticas.",
  },
];

const managementFlows = [
  {
    step: "01",
    title: "Centralizar",
    description:
      "Reunir dados, documentos, planilhas, rotinas e decisões em um ambiente único e organizado.",
  },
  {
    step: "02",
    title: "Analisar",
    description:
      "Interpretar comportamento financeiro, técnico e operacional com visão histórica, comparativa e gerencial.",
  },
  {
    step: "03",
    title: "Decidir",
    description:
      "Apoiar decisões de orçamento, priorização, risco, produtividade, contratos, obras e investimentos.",
  },
  {
    step: "04",
    title: "Automatizar",
    description:
      "Criar fluxos de acompanhamento, alertas, relatórios, integrações e rotinas assistidas por IA.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32rem),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34rem)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
          <header className="mb-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <a href="/" className="block">
                <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
                  EQUATEC
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Tecnologia • Gestão Integrada • Engenharia • Inteligência Aplicada
                </p>
              </a>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/login"
                  className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  Login
                </a>

                <a
                  href="/admin"
                  className="inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Acessar Admin Hub
                </a>
              </div>
            </div>

            <nav className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="flex flex-wrap gap-2">
                {topNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-300 transition hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
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
                Gestão de Contratos, Obras e Manutenção Industrial — Plataforma SaaS EQUATEC
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Gerenciamento multidisciplinar integrado para decisões de alto
                impacto: o Ecossistema EQUATEC conecta engenharia, contratos,
                finanças, obras, documentos, inteligência artificial e
                automações em uma plataforma criada para transformar
                informações dispersas em controle, produtividade,
                rastreabilidade e decisão executiva.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-400">
                Uma estrutura pensada para profissionais que precisam enxergar o
                todo: coordenadores, engenheiros, gerentes, diretores, gestores
                financeiros, empreendedores e equipes que trabalham com dados,
                performance, margem, prazo, qualidade e governança.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/admin/financeiro-contratos"
                  className="inline-flex rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Abrir Gestão Financeira de Contratos
                </a>

                <a
                  href="/admin"
                  className="inline-flex rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-sm font-black text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  Explorar Ecossistema
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-center text-sm text-slate-500">
                  Foto do idealizador
                </div>

                <img
                  src="/carlos-machado.jpg"
                  alt="Carlos Machado - idealizador do Ecossistema EQUATEC"
                  className="relative z-10 h-[360px] w-full object-cover object-top"
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
                    className="inline-flex rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    WhatsApp
                  </a>

                  <a
                    href="mailto:capmneto@gmail.com"
                    className="inline-flex rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    E-mail
                  </a>

                  <a
                    href="https://www.linkedin.com/in/carlos-machado-95917433/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {executiveHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <p className="text-sm text-cyan-300">{item.label}</p>
                <strong className="mt-2 block text-2xl font-black text-white">
                  {item.value}
                </strong>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
            Arquitetura do Ecossistema
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Um hub modular para operação, gestão, finanças e tomada de decisão.
          </h2>

          <p className="mt-4 max-w-5xl text-base leading-7 text-slate-400">
            Cada módulo foi pensado como uma frente de gestão conectada: contratos,
            obras, negócios, finanças pessoais, propostas, documentos, educação,
            IA e automações. O objetivo é criar uma plataforma prática, executiva
            e escalável para ambientes onde informação, prazo, custo, qualidade e
            decisão precisam andar juntos.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {managementFlows.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                {item.step}
              </p>
              <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ecosystemModules.map((module) => (
            <a
              key={module.title}
              href={module.href}
              className="group block rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/60 hover:bg-slate-900/80"
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
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
