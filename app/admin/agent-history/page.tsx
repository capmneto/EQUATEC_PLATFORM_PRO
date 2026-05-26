"use client";

import { useEffect, useMemo, useState } from "react";

type AgentHistoryRecord = {
  id: string;
  agentKey: string;
  question: string;
  answer: string;
  retrievedContexts: number;
  createdAt: string;
};

const agentOptions = [
  { key: "all", name: "Todos os agentes" },
  { key: "proposal", name: "Proposal Copilot" },
  { key: "ssma", name: "SSMA Agent" },
  { key: "pmoc", name: "PMOC Agent" },
  { key: "rtm", name: "RTM Agent" },
  { key: "shutdown", name: "Shutdown Planner" },
  { key: "facilities", name: "Facilities Agent" },
];

export default function AgentHistoryPage() {
  const [records, setRecords] = useState<AgentHistoryRecord[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("all");

  const filteredRecords = useMemo(() => {
    if (selectedAgent === "all") {
      return records;
    }

    return records.filter((item) => item.agentKey === selectedAgent);
  }, [records, selectedAgent]);

  async function loadHistory() {
    const response = await fetch("/api/agent-history");
    const data = await response.json();

    setRecords(data.records || []);
  }

  function exportHistory() {
    const content = filteredRecords
      .map((item) => {
        return `
====================================================
AGENTE: ${item.agentKey}
DATA: ${new Date(item.createdAt).toLocaleString("pt-BR")}
CONTEXTOS: ${item.retrievedContexts}

PERGUNTA:
${item.question}

RESPOSTA:
${item.answer}
====================================================
`;
      })
      .join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "equatec-agent-history.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
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

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Histórico dos Agentes
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
                Registro das consultas realizadas pelos agentes especialistas,
                com filtro por domínio e exportação TXT.
              </p>
            </div>

            <button
              onClick={exportHistory}
              disabled={!filteredRecords.length}
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Exportar TXT
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_220px_220px]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Filtro por agente</p>

            <select
              value={selectedAgent}
              onChange={(event) => setSelectedAgent(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            >
              {agentOptions.map((agent) => (
                <option key={agent.key} value={agent.key}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total geral</p>
            <strong className="mt-2 block text-3xl font-black">
              {records.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Filtrados</p>
            <strong className="mt-2 block text-3xl font-black">
              {filteredRecords.length}
            </strong>
          </div>
        </div>

        <section className="space-y-4">
          {filteredRecords.length ? (
            filteredRecords.map((item) => (
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
              Nenhum histórico encontrado para o filtro selecionado.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
