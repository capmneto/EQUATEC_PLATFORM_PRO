import Link from "next/link";

const features = [
  "Fluxo de caixa pessoal e familiar",
  "Controle de receitas, despesas e compromissos",
  "Planejamento patrimonial e metas",
  "Visão de investimentos e cenários",
  "Organização de documentos financeiros",
  "Preparação para IA financeira consultiva",
];

export default function FinanceiroPessoalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <Link
            href="/"
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            ← Voltar ao Ecossistema
          </Link>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-8 shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC • Gestão Financeira Pessoal
          </p>

          <h1 className="mt-4 max-w-5xl text-5xl font-black tracking-tight">
            Sistema de Gestão Financeira Pessoal
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Ambiente para organizar fluxo de caixa, patrimônio, metas,
            investimentos, compromissos e decisões pessoais com visão executiva,
            rastreabilidade e preparação para inteligência financeira aplicada.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm font-bold leading-6 text-slate-300">
                {feature}
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
