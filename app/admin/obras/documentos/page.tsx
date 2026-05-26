export default function ObrasSubmoduloPage() {
  const kpis = [
    { label: "Documentos", value: "0" },
    { label: "Pendentes", value: "0" },
    { label: "Analisados IA", value: "0" },
    { label: "Críticos", value: "0" },
  ];

  const actions = [
    "Cadastrar novo registro",
    "Analisar com IA",
    "Importar documento",
    "Gerar relatório executivo",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Documentos da Obra
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Contratos, notas, ART, memoriais, projetos, fotos e arquivos técnicos.
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

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Ações rápidas</h2>

            <div className="mt-6 space-y-3">
              {actions.map((action) => (
                <button
                  key={action}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-left text-sm font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Base operacional</h2>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
              <p className="text-sm leading-7 text-slate-400">
                Estrutura inicial criada para receber banco de dados, uploads,
                OCR, IA, WhatsApp, Telegram, n8n, auditoria e permissões.
              </p>

              <p className="mt-5 text-sm font-black text-cyan-300">
                Próxima fase: persistência real com Prisma/MySQL.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
