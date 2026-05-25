"use client";

import { useState } from "react";

export default function DocumentAIPage() {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeDocument() {
    if (!content.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const request = await fetch("/api/ai/document", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          content,
        }),
      });

      const data = await request.json();

      if (!data.success) {
        setResponse(data.error || "Erro ao analisar documento.");
        return;
      }

      setResponse(data.content || "");
    } catch {
      setResponse("Erro ao comunicar com Document AI.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC DOCUMENT AI
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            Document Analysis Engine
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Motor inteligente para leitura, interpretação e análise
            executiva de documentos industriais e corporativos.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">
              Conteúdo documental
            </h2>

            <div className="mt-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Cole aqui o conteúdo do documento..."
                className="min-h-[520px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm outline-none transition focus:border-cyan-400"
              />
            </div>

            <button
              onClick={analyzeDocument}
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading
                ? "Analisando documento..."
                : "Executar análise documental"}
            </button>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Resultado da análise
              </h2>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                Document AI
              </span>
            </div>

            <div className="min-h-[720px] rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {response ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {response}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm leading-6 text-slate-500">
                  Cole o conteúdo documental e execute a análise IA.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
