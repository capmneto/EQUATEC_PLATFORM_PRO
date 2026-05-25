"use client";

import { useState } from "react";

export default function BidAIPage() {
  const [form, setForm] = useState({
    cliente: "",
    escopo: "",
    disciplina: "Multidisciplinar",
    criticidade: "Alta",
    prazo: "",
    premissas: "",
    riscos: "",
  });

  const [resultado, setResultado] = useState("");
  const [documento, setDocumento] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function gerarAnalise() {
    setLoading(true);

    setResultado("");
    setDocumento("");

    try {
      const response = await fetch("/api/ai/bid", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        setResultado(data.error || "Erro ao gerar análise.");
        return;
      }

      setResultado(data.content || "");
      setDocumento(data.document || "");
    } catch {
      setResultado("Erro ao comunicar com o BID AI.");
    } finally {
      setLoading(false);
    }
  }

  function exportTxt() {
    if (!documento) return;

    const blob = new Blob([documento], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "proposta_tecnica_equatec.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC BID AI V2
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            Export Engine
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Estrutura inteligente para geração preliminar de propostas
            técnicas e comerciais industriais.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">
              Dados da oportunidade
            </h2>

            <div className="mt-6 space-y-4">
              <input
                value={form.cliente}
                onChange={(e) => updateField("cliente", e.target.value)}
                placeholder="Cliente / empresa"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <textarea
                value={form.escopo}
                onChange={(e) => updateField("escopo", e.target.value)}
                placeholder="Descrição do escopo"
                className="min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <select
                  value={form.disciplina}
                  onChange={(e) => updateField("disciplina", e.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                >
                  <option>Multidisciplinar</option>
                  <option>Mecânica</option>
                  <option>Caldeiraria</option>
                  <option>Elétrica</option>
                  <option>Instrumentação</option>
                  <option>Facilities</option>
                  <option>PMOC</option>
                  <option>Obras</option>
                </select>

                <select
                  value={form.criticidade}
                  onChange={(e) => updateField("criticidade", e.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                >
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                  <option>Crítica</option>
                </select>
              </div>

              <input
                value={form.prazo}
                onChange={(e) => updateField("prazo", e.target.value)}
                placeholder="Prazo / vigência"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <textarea
                value={form.premissas}
                onChange={(e) => updateField("premissas", e.target.value)}
                placeholder="Premissas"
                className="min-h-[90px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <textarea
                value={form.riscos}
                onChange={(e) => updateField("riscos", e.target.value)}
                placeholder="Riscos"
                className="min-h-[90px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  onClick={gerarAnalise}
                  disabled={loading}
                  className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                >
                  {loading
                    ? "Gerando..."
                    : "Gerar análise"}
                </button>

                <button
                  onClick={exportTxt}
                  disabled={!documento}
                  className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm font-black text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-40"
                >
                  Exportar TXT
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Documento executivo
              </h2>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                BID AI V2
              </span>
            </div>

            <div className="min-h-[720px] rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {resultado ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {resultado}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm leading-6 text-slate-500">
                  Gere a análise para visualizar o documento executivo.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
