"use client";

import { useState } from "react";

export default function DocumentAIPage() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeDocument() {
    if (!file) return;

    try {
      setLoading(true);
      setResponse("");

      const formData = new FormData();
      formData.append("file", file);

      const request = await fetch("/api/ai/document", {
        method: "POST",
        body: formData,
      });

      const data = await request.json();

      if (!data.success) {
        setResponse(data.error || "Erro documental.");
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
            EQUATEC DOCUMENT AI V3
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            OCR Image Engine
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Upload, extração e análise inteligente de TXT, PDF e imagens com OCR
            via Gemini Vision, preparando a base para memória técnica, RAG e
            biblioteca documental corporativa.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Upload documental</h2>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6">
              <input
                type="file"
                accept=".txt,.pdf,.png,.jpg,.jpeg,.webp"
                onChange={(event) => {
                  const selected = event.target.files?.[0] || null;
                  setFile(selected);
                }}
                className="w-full text-sm text-slate-300"
              />

              <p className="mt-4 text-xs text-slate-500">
                Formatos suportados: TXT, PDF, PNG, JPG, JPEG e WEBP.
              </p>

              {file && (
                <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p className="text-sm font-bold text-cyan-200">
                    Arquivo selecionado
                  </p>
                  <p className="mt-1 text-xs text-slate-300">{file.name}</p>
                </div>
              )}
            </div>

            <button
              onClick={analyzeDocument}
              disabled={!file || loading}
              className="mt-5 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Analisando documento..." : "Executar análise IA"}
            </button>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Resultado da análise</h2>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                OCR + IA
              </span>
            </div>

            <div className="min-h-[720px] rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {response ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {response}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm leading-6 text-slate-500">
                  Faça upload de TXT, PDF ou imagem para iniciar a análise.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
