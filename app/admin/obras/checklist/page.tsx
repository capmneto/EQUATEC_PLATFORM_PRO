"use client";

import { useEffect, useState } from "react";

type ChecklistItem = {
  id: string;
  phase?: string;
  title: string;
  completed: boolean;
  notes?: string;
  createdAt: string;
};

export default function ObrasChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [form, setForm] = useState({
    phase: "",
    title: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  async function loadChecklist() {
    const response = await fetch("/api/obras/checklist");
    const data = await response.json();

    setItems(data.checklist || []);
  }

  async function createItem() {
    if (!form.title.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/obras/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phase: form.phase,
          title: form.title,
          notes: form.notes,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Erro ao criar item.");
        return;
      }

      setForm({
        phase: "",
        title: "",
        notes: "",
      });

      await loadChecklist();
    } finally {
      setLoading(false);
    }
  }

  async function toggleItem(item: ChecklistItem) {
    await fetch("/api/obras/checklist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        completed: !item.completed,
      }),
    });

    await loadChecklist();
  }

  useEffect(() => {
    loadChecklist();
  }, []);

  const completed = items.filter((item) => item.completed).length;
  const pending = items.length - completed;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Checklist e Marcos
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Controle de fases, liberações, qualidade, marcos físicos e pendências
            críticas da obra com persistência real.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Itens</p>
            <strong className="mt-2 block text-3xl font-black">{items.length}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Concluídos</p>
            <strong className="mt-2 block text-3xl font-black">{completed}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Pendentes</p>
            <strong className="mt-2 block text-3xl font-black">{pending}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Base operacional</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              MySQL
            </strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Novo item de checklist</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={form.phase}
              onChange={(event) => setForm({ ...form, phase: event.target.value })}
              placeholder="Fase: fundação, estrutura, acabamento..."
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Item de verificação"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <textarea
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              placeholder="Observações, critérios de aceite ou pendências..."
              className="min-h-[120px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400 md:col-span-2"
            />

            <button
              onClick={createItem}
              disabled={loading || !form.title.trim()}
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 md:col-span-2"
            >
              {loading ? "Salvando..." : "Cadastrar item"}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {items.length ? (
            items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">{item.title}</h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {item.phase || "Fase não informada"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleItem(item)}
                    className={`rounded-full border px-4 py-2 text-xs font-black uppercase transition ${
                      item.completed
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {item.completed ? "Concluído" : "Pendente"}
                  </button>
                </div>

                {item.notes && (
                  <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {item.notes}
                  </p>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhum item de checklist criado ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
