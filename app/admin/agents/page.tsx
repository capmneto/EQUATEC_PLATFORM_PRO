"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const agents = [
  { key: "proposal", name: "Proposal Copilot" },
  { key: "ssma", name: "SSMA Agent" },
  { key: "pmoc", name: "PMOC Agent" },
  { key: "rtm", name: "RTM Agent" },
  { key: "shutdown", name: "Shutdown Planner" },
  { key: "facilities", name: "Facilities Agent" },
  { key: "juridico", name: "Jurídico Técnico" },
];

function getInitialAgent(pathname: string) {
  if (pathname.includes("/ssma")) return "ssma";
  if (pathname.includes("/pmoc")) return "pmoc";
  if (pathname.includes("/rtm")) return "rtm";
  if (pathname.includes("/shutdown")) return "shutdown";
  if (pathname.includes("/proposal")) return "proposal";

  return "proposal";
}

export default function AgentsPage() {
  const pathname = usePathname();

  const initialAgent = useMemo(() => {
    return getInitialAgent(pathname);
  }, [pathname]);

  const [agentKey, setAgentKey] = useState(initialAgent);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [retrievedContexts, setRetrievedContexts] = useState(0);
  const [loading, setLoading] = useState(false);

  async function askAgent() {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");
      setRetrievedContexts(0);

      const response = await fetch("/api/agents/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentKey,
          question,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setAnswer(data.error || "Erro ao consultar agente.");
        return;
      }

      setAnswer(data.answer || "Sem resposta gerada.");
      setRetrievedContexts(data.retrievedContexts || 0);
    } catch {
      setAnswer("Erro ao comunicar com Agents Foundation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            EQUATEC AGENTS FOUNDATION
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            Multiagent Enterprise Console
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Console para consulta de agentes especialistas com memória técnica,
            RAG e prompts dedicados por domínio operacional.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">
              Seleção do agente
            </h2>

            <select
              value={agentKey}
              onChange={(event) => setAgentKey(event.target.value)}
              className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            >
              {agents.map((agent) => (
                <option key={agent.key} value={agent.key}>
                  {agent.name}
                </option>
              ))}
            </select>

            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Digite a pergunta para o agente especialista..."
              className="mt-5 min-h-[260px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-sm outline-none transition focus:border-cyan-400"
            />

            <button
              onClick={askAgent}
              disabled={loading || !question.trim()}
              className="mt-5 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Consultando agente..." : "Executar agente"}
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
                Resposta especialista
              </h2>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                Agents v1
              </span>
            </div>

            <div className="min-h-[680px] rounded-2xl border border-slate-800 bg-slate-950 p-5">
              {answer ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {answer}
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm leading-6 text-slate-500">
                  Escolha um agente e faça uma pergunta técnica.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
