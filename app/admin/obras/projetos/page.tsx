"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  client?: string;
  location?: string;
  status: string;
  physicalProgress: number;
  financialProgress: number;
  budgetEstimated: number;
  budgetExecuted: number;
  responsible?: string;
};

export default function ObrasProjetosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: "",
    client: "",
    location: "",
    responsible: "",
    budgetEstimated: "",
  });

  async function loadProjects() {
    const response = await fetch("/api/obras/projects");
    const data = await response.json();

    setProjects(data.projects || []);
  }

  async function createProject() {
    if (!form.name.trim()) return;

    await fetch("/api/obras/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        budgetEstimated: Number(form.budgetEstimated || 0),
        status: "PLANEJAMENTO",
      }),
    });

    setForm({
      name: "",
      client: "",
      location: "",
      responsible: "",
      budgetEstimated: "",
    });

    await loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC OBRAS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Projetos e Obras
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            Cadastro real de obras com persistência em MySQL, preparado para
            orçamentos, pagamentos, documentos, checklist, diário de obra,
            WhatsApp, Telegram, n8n e IA.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Obras cadastradas</p>
            <strong className="mt-2 block text-3xl font-black">
              {projects.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Em planejamento</p>
            <strong className="mt-2 block text-3xl font-black">
              {projects.filter((item) => item.status === "PLANEJAMENTO").length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Em execução</p>
            <strong className="mt-2 block text-3xl font-black">
              {projects.filter((item) => item.status === "EXECUCAO").length}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Base operacional</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              MySQL
            </strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Nova Obra</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Nome da obra"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.client}
              onChange={(event) => setForm({ ...form, client: event.target.value })}
              placeholder="Cliente"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.location}
              onChange={(event) => setForm({ ...form, location: event.target.value })}
              placeholder="Local"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.responsible}
              onChange={(event) => setForm({ ...form, responsible: event.target.value })}
              placeholder="Responsável"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.budgetEstimated}
              onChange={(event) =>
                setForm({ ...form, budgetEstimated: event.target.value })
              }
              placeholder="Orçamento estimado"
              type="number"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <button
              onClick={createProject}
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              Cadastrar Obra
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {projects.length ? (
            projects.map((project) => (
              <article
                key={project.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">{project.name}</h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {project.client || "Cliente não informado"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {project.location || "Local não informado"}
                    </p>
                  </div>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase text-cyan-300">
                    {project.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">Responsável</p>
                    <strong className="mt-2 block text-lg font-black">
                      {project.responsible || "Não definido"}
                    </strong>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">Avanço físico</p>
                    <strong className="mt-2 block text-3xl font-black">
                      {project.physicalProgress}%
                    </strong>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">Orçamento estimado</p>
                    <strong className="mt-2 block text-2xl font-black">
                      R$ {Number(project.budgetEstimated || 0).toLocaleString("pt-BR")}
                    </strong>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhuma obra cadastrada ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
