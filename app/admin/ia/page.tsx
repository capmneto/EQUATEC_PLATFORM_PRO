"use client";

import { useState } from "react";

const personas = [
  { value: "bidEngineer", label: "Engenharia / BID AI" },
  { value: "executiveManagement", label: "Gestão Executiva" },
  { value: "documentAnalyst", label: "Análise Documental" },
];

export default function AdminAIPage() {
  const [prompt, setPrompt] = useState("");
  const [persona, setPersona] = useState("bidEngineer");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const request = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, persona }),
      });

      const data = await request.json();

      if (!data.success) {
        setResponse(data.error || "Erro na IA.");
        return;
      }

      setResponse(data.content);
    } catch {
      setResponse("Erro ao comunicar com IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC AI CORE
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            AI Playground Enterprise
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Ambiente de testes da camada corporativa de IA do EQUATEC,
            preparado para agentes, propostas técnicas, análises executivas,
            workflows e documentos inteligentes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Gerador IA</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Persona
                </label>

                <select
                  value={persona}
                  onChange={(event) => setPersona(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
                >
                  {personas.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Prompt
                </label>

                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Digite seu prompt..."
                  className="min-h-[260px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm outline-none transition focus:border-cyan-400"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Gerando resposta..." : "Gerar resposta IA"}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Resposta IA</h2>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                Gemini
              </span>
            </div>

            <div className="min-h-[520px] rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {response ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {response}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Aguardando geração de resposta...
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
