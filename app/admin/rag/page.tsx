"use client";

import { useState } from "react";

export default function RagPlaygroundPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [retrievedContexts, setRetrievedContexts] = useState(0);
  const [loading, setLoading] = useState(false);

  async function askRag() {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");
      setRetrievedContexts(0);

      const response = await fetch("/api/rag/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setAnswer(data.error || "Erro ao consultar RAG.");
        return;
      }

      setAnswer(data.answer || "Sem resposta gerada.");
      setRetrievedContexts(data.retrievedContexts || 0);
    } catch {
      setAnswer("Erro ao comunicar com RAG.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC RAG FOUNDATION
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            RAG Playground Admin
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Ambiente para testar perguntas com recuperação contextual da memória
            vetorial local do EQUATEC, preparando a evolução para agentes
            especialistas e biblioteca técnica inteligente.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">
              Pergunta técnica
            </h2>

            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ex.: Quais riscos foram identificados em documentos similares?"
              className="mt-6 min-h-[260px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm outline-none transition focus:border-cyan-400"
            />

            <button
              onClick={askRag}
              disabled={loading || !question.trim()}
              className="mt-5 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Consultando memória..." : "Perguntar ao RAG"}
            </button>

            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-sm font-bold text-cyan-200">
                Contextos recuperados
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {retrievedContexts}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Resposta contextual
              </h2>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                RAG V1
              </span>
            </div>

            <div className="min-h-[620px] rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {answer ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {answer}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm leading-6 text-slate-500">
                  Faça uma pergunta para consultar a memória técnica.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
