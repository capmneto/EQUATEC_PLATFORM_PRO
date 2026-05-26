"use client";

import { useEffect, useState } from "react";

type AgentHistoryRecord = {
  id: string;
  agentKey: string;
  question: string;
  answer: string;
  retrievedContexts: number;
  createdAt: string;
};

export default function AgentHistoryPage() {
  const [records, setRecords] = useState<AgentHistoryRecord[]>([]);

  async function loadHistory() {
    const response = await fetch("/api/agent-history");
    const data = await response.json();

    setRecords(data.records || []);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC AGENT HISTORY
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            Histórico dos Agentes
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Registro das consultas realizadas pelos agentes especialistas,
            respostas geradas e contextos técnicos recuperados.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Consultas registradas</p>
            <strong className="mt-2 block text-3xl font-black">
              {records.length}
            </strong>
          </div>
        </div>

        <section className="space-y-4">
          {records.length ? (
            records.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black uppercase text-cyan-300">
                    {item.agentKey}
                  </span>

                  <span className="text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>

                <h2 className="text-lg font-black">Pergunta</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                  {item.question}
                </p>

                <h2 className="mt-6 text-lg font-black">Resposta</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {item.answer}
                </p>

                <p className="mt-5 text-xs font-bold text-cyan-300">
                  Contextos recuperados: {item.retrievedContexts}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhum histórico registrado ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
