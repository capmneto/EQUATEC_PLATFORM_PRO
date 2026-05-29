import Link from "next/link";

const modules = [
  {
    title: "Diagnóstico do Contrato",
    description:
      "Raio-X contratual para comparar base de precificação, 7.5, 9.1 e 8.2.1, identificando limites de verba, contas estouradas, fornecedores críticos e lançamentos suspeitos.",
    href: "/admin/financeiro-contratos/diagnostico",
    status: "Diagnóstico",
    highlight: "PEC • DFP • PPU • 7.5 • 9.1 • 8.2.1",
  },
  {
    title: "Revisão de Orçamento Contratual",
    description:
      "Transforma valores macro da PEC, DFP ou PPU em orçamento micro por conta contábil, considerando dissídio, database, reajuste contratual e histórico real.",
    href: "/admin/financeiro-contratos/revisao-orcamentaria",
    status: "Orçamento",
    highlight: "Dissídio • Database • Reajuste • Vigência",
  },
  {
    title: "Provisão de Resultado Mensal",
    description:
      "Gera provisão mensal de Resultado e EBITDA a partir de planilhas operacionais, regras contábeis, estimativas controladas e rastreabilidade oficial/estimado/editado.",
    href: "/admin/financeiro-contratos/provisao-mensal",
    status: "Provisão",
    highlight: "Resultado • EBITDA • 32201 • Provisões",
  },
];

const rules = [
  "32201 TOTAL = 8,75% da receita total por PEC.",
  "Provisões Trabalhistas ausentes = 26,25% dos custos de PESSOAL.",
  "Prêmios, assistência médica e odontológica podem ser estimados por média móvel ou correlação.",
  "Contas iniciadas com CR devem ser tratadas como créditos positivos.",
  "Juros por atraso do cliente devem considerar média dos últimos 3 meses ou padrão histórico.",
  "Depreciações gerenciais devem repetir o valor do mês anterior quando estiverem reduzindo.",
];

const inputs = [
  "PEC",
  "DFP Horizontal",
  "DFP Vertical",
  "Planilha de Preços Unitários",
  "7.5 por PEC / Conta / Conta Sup",
  "9.1 por PEC / Conta / Conta Sup / Fornecedor",
  "8.2.1 por PEC / Conta / Verba de Pagamento",
  "Planilha de provisão mensal",
];

export default function FinanceiroContratosPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin"
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            ← Voltar ao Admin Hub
          </Link>

          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
            Produto oficial do Ecossistema EQUATEC
          </span>
        </div>

        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC • GESTÃO FINANCEIRA DE CONTRATOS
          </p>

          <h1 className="max-w-5xl text-4xl font-black tracking-tight md:text-5xl">
            Gestão Financeira de Contratos
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-7 text-slate-300">
            Cockpit financeiro para diagnóstico contratual, revisão orçamentária
            e provisão mensal de Resultado/EBITDA, integrado ao ecossistema
            EQUATEC com upload de bases, regras contábeis, rastreabilidade e
            preparação para IA aplicada.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Motores</p>
              <strong className="mt-2 block text-3xl font-black">3</strong>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Bases críticas</p>
              <strong className="mt-2 block text-xl font-black text-cyan-300">
                7.5 • 9.1 • 8.2.1
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Status</p>
              <strong className="mt-2 block text-xl font-black text-emerald-300">
                Integrado
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Próxima fase</p>
              <strong className="mt-2 block text-xl font-black text-cyan-300">
                Parser Excel
              </strong>
            </div>
          </div>
        </div>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/60 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-2xl font-black">{module.title}</h2>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                  {module.status}
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {module.description}
              </p>

              <p className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-bold text-slate-300">
                {module.highlight}
              </p>

              <p className="mt-5 text-sm font-black text-cyan-300">
                Abrir módulo →
              </p>
            </Link>
          ))}
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Bases de entrada previstas</h2>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {inputs.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm font-bold text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Regras críticas já embarcadas</h2>

            <div className="mt-6 space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-400/20 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Fluxo operacional do módulo</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-xs font-black uppercase text-cyan-300">01</p>
              <h3 className="mt-3 text-lg font-black">Upload das bases</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                PEC, DFP, PPU, 7.5, 9.1, 8.2.1 e planilhas mensais.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-xs font-black uppercase text-cyan-300">02</p>
              <h3 className="mt-3 text-lg font-black">Normalização</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Estrutura por PEC, conta contábil, conta sup, fornecedor e verba.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-xs font-black uppercase text-cyan-300">03</p>
              <h3 className="mt-3 text-lg font-black">Motor de regras</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Cálculo de provisões, estimativas, créditos e exceções críticas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-xs font-black uppercase text-cyan-300">04</p>
              <h3 className="mt-3 text-lg font-black">Resultado executivo</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Diagnóstico, revisão orçamentária, provisão, EBITDA e alertas.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
