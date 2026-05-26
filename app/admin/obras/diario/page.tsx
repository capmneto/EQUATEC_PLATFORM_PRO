"use client";

import { useEffect, useState } from "react";

type Diary = {
  id: string;
  title?: string;
  description: string;
  weather?: string;
  teamSize?: number;
  createdAt: string;
};

export default function ObrasDiarioPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    weather: "",
    teamSize: "",
  });
  const [loading, setLoading] = useState(false);

  async function loadDiaries() {
    const response = await fetch("/api/obras/diary");
    const data = await response.json();

    setDiaries(data.diaries || []);
  }

  async function createDiary() {
    if (!form.description.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/obras/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          weather: form.weather,
          teamSize: form.teamSize ? Number(form.teamSize) : null,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Erro ao registrar diário.");
        return;
      }

      setForm({
        title: "",
        description: "",
        weather: "",
        teamSize: "",
      });

      await loadDiaries();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDiaries();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Diário de Obra
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Registro diário de avanço, ocorrências, clima, equipe, pendências,
            decisões e evidências operacionais da obra.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Registros</p>
            <strong className="mt-2 block text-3xl font-black">
              {diaries.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Com equipe informada</p>
            <strong className="mt-2 block text-3xl font-black">
              {diaries.filter((item) => item.teamSize).length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Base operacional</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              MySQL
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Futuro</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              WhatsApp/n8n
            </strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Novo registro diário</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Título ou resumo do dia"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.weather}
              onChange={(event) => setForm({ ...form, weather: event.target.value })}
              placeholder="Clima"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.teamSize}
              onChange={(event) => setForm({ ...form, teamSize: event.target.value })}
              placeholder="Quantidade de pessoas na equipe"
              type="number"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              placeholder="Descreva avanço, ocorrências, pendências e decisões..."
              className="min-h-[140px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400 md:col-span-2"
            />

            <button
              onClick={createDiary}
              disabled={loading || !form.description.trim()}
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 md:col-span-2"
            >
              {loading ? "Registrando..." : "Registrar diário"}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {diaries.length ? (
            diaries.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">
                      {item.title || "Registro diário"}
                    </h2>

                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase text-cyan-300">
                    {item.weather || "Sem clima"}
                  </span>
                </div>

                <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {item.description}
                </p>

                <p className="mt-5 text-xs font-bold text-cyan-300">
                  Equipe: {item.teamSize || "não informada"}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhum registro de diário criado ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
