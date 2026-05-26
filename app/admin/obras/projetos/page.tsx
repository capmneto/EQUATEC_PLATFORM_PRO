"use client";

import { useState } from "react";

type Obra = {
  id: number;
  nome: string;
  cliente: string;
  local: string;
  status: string;
  progresso: number;
  orcamento: string;
};

const initialObras: Obra[] = [
  {
    id: 1,
    nome: "Residência Alto Padrão - Condomínio Parthenon",
    cliente: "Cliente Particular",
    local: "Campos dos Goytacazes/RJ",
    status: "Planejamento",
    progresso: 12,
    orcamento: "R$ 1.350.000",
  },
];

export default function ObrasProjetosPage() {
  const [obras] = useState(initialObras);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Projetos e Obras
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
                Gestão centralizada das obras, contemplando visão operacional,
                financeira, documental e estratégica integrada ao ecossistema IA.
              </p>
            </div>

            <button className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
              Nova Obra
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Obras ativas</p>
            <strong className="mt-2 block text-3xl font-black">1</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Em planejamento</p>
            <strong className="mt-2 block text-3xl font-black">1</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Marcos críticos</p>
            <strong className="mt-2 block text-3xl font-black">0</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Desvio financeiro</p>
            <strong className="mt-2 block text-3xl font-black">0%</strong>
          </div>
        </div>

        <section className="space-y-4">
          {obras.map((obra) => (
            <article
              key={obra.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">{obra.nome}</h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {obra.cliente}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {obra.local}
                  </p>
                </div>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase text-cyan-300">
                  {obra.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">
                    Progresso físico
                  </p>

                  <strong className="mt-2 block text-3xl font-black">
                    {obra.progresso}%
                  </strong>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">
                    Orçamento
                  </p>

                  <strong className="mt-2 block text-2xl font-black">
                    {obra.orcamento}
                  </strong>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">
                    Integrações futuras
                  </p>

                  <strong className="mt-2 block text-sm font-black text-cyan-300">
                    IA • OCR • WhatsApp • n8n
                  </strong>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-300">
                  Abrir obra
                </button>

                <button className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-300">
                  Diário
                </button>

                <button className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-300">
                  Documentos
                </button>

                <button className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-300">
                  Financeiro
                </button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
