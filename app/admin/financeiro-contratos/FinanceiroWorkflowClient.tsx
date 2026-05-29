"use client";

import { useEffect, useMemo, useState } from "react";

type WorkflowProps = {
  moduleKey: "diagnostico" | "revisao" | "provisao";
  title: string;
  subtitle: string;
  fileLabels: string[];
  showRevisionFields?: boolean;
  showProvisionFields?: boolean;
};

type Job = {
  id: string;
  title: string;
  jobModule: string;
  pec?: string;
  periodRef?: string;
  result?: string;
  createdAt: string;
};

function brl(value: number) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function FinanceiroWorkflowClient({
  moduleKey,
  title,
  subtitle,
  fileLabels,
  showRevisionFields,
  showProvisionFields,
}: WorkflowProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    pec: "",
    period: "",
    revenue: "",
    laborCost: "",
    dissidioPercent: "",
    database: "",
    contractAdjustmentPercent: "",
    contractAdjustmentDate: "",
    budgetValidity: "",
    notes: "",
  });

  const totals = useMemo(() => {
    const revenue = Number(form.revenue || 0);
    const laborCost = Number(form.laborCost || 0);

    return {
      account32201: revenue * 0.0875,
      laborProvision: laborCost * 0.2625,
      preliminaryResult: revenue - revenue * 0.0875 - laborCost * 0.2625,
    };
  }, [form.revenue, form.laborCost]);

  async function loadJobs() {
    const response = await fetch(`/api/financeiro-contratos/jobs?module=${moduleKey}`);
    const data = await response.json();

    setJobs(data.jobs || []);
  }

  async function processWorkflow() {
    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();

      formData.append("jobModule", moduleKey);
      formData.append("title", form.title || title);
      formData.append("pec", form.pec);
      formData.append("period", form.period);
      formData.append("revenue", form.revenue);
      formData.append("laborCost", form.laborCost);
      formData.append("dissidioPercent", form.dissidioPercent);
      formData.append("database", form.database);
      formData.append("contractAdjustmentPercent", form.contractAdjustmentPercent);
      formData.append("contractAdjustmentDate", form.contractAdjustmentDate);
      formData.append("budgetValidity", form.budgetValidity);
      formData.append("notes", form.notes);

      fileLabels.forEach((label) => {
        const file = files[label];

        if (file) {
          formData.append("fileLabels", label);
          formData.append("files", file);
        }
      });

      const response = await fetch("/api/financeiro-contratos/jobs", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Erro no processamento.");
        return;
      }

      setResult(data.result);
      await loadJobs();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC • GESTÃO FINANCEIRA DE CONTRATOS
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            {subtitle}
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Processamentos</p>
            <strong className="mt-2 block text-3xl font-black">{jobs.length}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">32201 estimado</p>
            <strong className="mt-2 block text-xl font-black">{brl(totals.account32201)}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Prov. trabalhista</p>
            <strong className="mt-2 block text-xl font-black">{brl(totals.laborProvision)}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Base</p>
            <strong className="mt-2 block text-xl font-black text-cyan-300">
              MySQL + Upload
            </strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Dados do processamento</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Título do processamento"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.pec}
              onChange={(event) => setForm({ ...form, pec: event.target.value })}
              placeholder="PEC / Estudo de custo"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={form.period}
              onChange={(event) => setForm({ ...form, period: event.target.value })}
              placeholder="Competência / período"
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            {(showProvisionFields || showRevisionFields) && (
              <input
                value={form.revenue}
                onChange={(event) => setForm({ ...form, revenue: event.target.value })}
                placeholder="Receita / faturamento estimado"
                type="number"
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            )}

            {(showProvisionFields || showRevisionFields) && (
              <input
                value={form.laborCost}
                onChange={(event) => setForm({ ...form, laborCost: event.target.value })}
                placeholder="Custo de pessoal / folha"
                type="number"
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            )}

            {showRevisionFields && (
              <>
                <input
                  value={form.dissidioPercent}
                  onChange={(event) =>
                    setForm({ ...form, dissidioPercent: event.target.value })
                  }
                  placeholder="Dissídio estimado sobre folha (%)"
                  type="number"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                />

                <input
                  value={form.database}
                  onChange={(event) => setForm({ ...form, database: event.target.value })}
                  placeholder="Database da categoria"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                />

                <input
                  value={form.contractAdjustmentPercent}
                  onChange={(event) =>
                    setForm({ ...form, contractAdjustmentPercent: event.target.value })
                  }
                  placeholder="Reajuste contratual estimado (%)"
                  type="number"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                />

                <input
                  value={form.contractAdjustmentDate}
                  onChange={(event) =>
                    setForm({ ...form, contractAdjustmentDate: event.target.value })
                  }
                  type="date"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                />

                <input
                  value={form.budgetValidity}
                  onChange={(event) =>
                    setForm({ ...form, budgetValidity: event.target.value })
                  }
                  placeholder="Vigência do orçamento"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400 md:col-span-2"
                />
              </>
            )}

            <textarea
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              placeholder="Observações, premissas ou pontos de atenção..."
              className="min-h-[110px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400 md:col-span-2"
            />
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Arquivos de entrada</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {fileLabels.map((label) => (
              <label
                key={label}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <span className="mb-3 block text-sm font-bold text-slate-300">
                  {label}
                </span>

                <input
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf,.txt"
                  onChange={(event) =>
                    setFiles({
                      ...files,
                      [label]: event.target.files?.[0] || null,
                    })
                  }
                  className="w-full text-sm text-slate-400"
                />
              </label>
            ))}
          </div>

          <button
            onClick={processWorkflow}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {loading ? "Processando..." : "Processar módulo"}
          </button>
        </section>

        {result && (
          <section className="mb-8 rounded-3xl border border-cyan-400/20 bg-slate-900 p-6">
            <h2 className="text-2xl font-black">Resultado preliminar</h2>

            <pre className="mt-5 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm leading-7 text-slate-300">
              {JSON.stringify(result, null, 2)}
            </pre>
          </section>
        )}

        <section className="space-y-4">
          {jobs.length ? (
            jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">{job.title}</h2>

                    <p className="mt-2 text-sm text-slate-400">
                      PEC: {job.pec || "não informada"} • Período:{" "}
                      {job.periodRef || "não informado"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(job.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase text-cyan-300">
                    {job.jobModule}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-500">
              Nenhum processamento registrado ainda.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
