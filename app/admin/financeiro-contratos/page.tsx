import Link from "next/link";

const modules = [
  {
    title: "Diagnóstico do Contrato",
    description:
      "Upload da base de precificação, 7.5, 9.1 e 8.2.1 para diagnosticar limites, estouros, fornecedores e lançamentos suspeitos.",
    href: "/admin/financeiro-contratos/diagnostico",
    status: "Diagnóstico",
  },
  {
    title: "Revisão de Orçamento Contratual",
    description:
      "Transforma valores macro da PEC/DFP/PPU em orçamento micro por conta contábil, com dissídio, database e reajuste contratual.",
    href: "/admin/financeiro-contratos/revisao-orcamentaria",
    status: "Orçamento",
  },
  {
    title: "Provisão de Resultado Mensal",
    description:
      "Gera provisão de Resultado e EBITDA usando planilhas mensais, regras contábeis, estimativas e rastreabilidade.",
    href: "/admin/financeiro-contratos/provisao-mensal",
    status: "Provisão",
  },
];

export default function FinanceiroContratosPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC • GESTÃO FINANCEIRA DE CONTRATOS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Gestão Financeira de Contratos
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Produto emergencial para diagnóstico contratual, revisão de orçamento,
            provisão mensal de resultado, EBITDA, rastreabilidade de dados e
            aprendizado contínuo por histórico.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Motores</p>
            <strong className="mt-2 block text-3xl font-black">3</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Bases</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              7.5 • 9.1 • 8.2.1
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Regras</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              Ativas
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">IA</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              Preparado
            </strong>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/60 hover:bg-slate-900/80"
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

              <p className="mt-5 text-sm font-black text-cyan-300">
                Abrir módulo →
              </p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
