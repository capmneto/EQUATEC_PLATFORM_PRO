"use client";

import { useEffect, useState } from "react";

type MemoryRecord = {
  id: string;
  title: string;
  source: string;
  module: string;
  content: string;
  summary?: string;
  createdAt: string;
};

type SearchResult = MemoryRecord & {
  score: number;
};

export default function MemoryDashboardPage() {
  const [documents, setDocuments] = useState<MemoryRecord[]>([]);
  const [vectors, setVectors] = useState<MemoryRecord[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadMemory() {
    const [documentResponse, vectorResponse] = await Promise.all([
      fetch("/api/document-memory"),
      fetch("/api/vector-memory"),
    ]);

    const documentData = await documentResponse.json();
    const vectorData = await vectorResponse.json();

    setDocuments(documentData.records || []);
    setVectors(vectorData.records || []);
  }

  async function searchMemory() {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/vector-memory?q=${encodeURIComponent(query)}`,
      );

      const data = await response.json();

      setResults(data.results || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC MEMORY DASHBOARD
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            Memória Técnica e Vetorial
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Painel para visualizar documentos salvos, registros vetoriais e
            testar buscas semânticas da fundação RAG do EQUATEC.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Documentos salvos</p>
            <strong className="mt-2 block text-3xl font-black">
              {documents.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Registros vetoriais</p>
            <strong className="mt-2 block text-3xl font-black">
              {vectors.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Resultados da busca</p>
            <strong className="mt-2 block text-3xl font-black">
              {results.length}
            </strong>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Busca semântica</h2>

            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite uma busca técnica..."
              className="mt-6 min-h-[160px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm outline-none focus:border-cyan-400"
            />

            <button
              onClick={searchMemory}
              disabled={loading || !query.trim()}
              className="mt-5 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Buscando..." : "Buscar na memória"}
            </button>

            <div className="mt-6 space-y-3">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-black">{item.title}</h3>

                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                      {item.score.toFixed(4)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {item.module} • {item.source}
                  </p>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Últimos documentos</h2>

            <div className="mt-6 space-y-3">
              {documents.length ? (
                documents.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <h3 className="font-black">{item.title}</h3>

                    <p className="mt-2 text-xs text-slate-500">
                      {item.module} • {item.source} •{" "}
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </p>

                    <p className="mt-3 line-clamp-5 text-sm leading-6 text-slate-300">
                      {item.summary || item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center text-sm text-slate-500">
                  Nenhum documento salvo ainda.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
