"use client";

import Link from "next/link";
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

type AnyResult = Record<string, any>;

function brl(value: number) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const workflowLinks = [
  { label: "Cockpit", href: "/admin/financeiro-contratos" },
  { label: "Diagnóstico", href: "/admin/financeiro-contratos/diagnostico" },
  { label: "Revisão", href: "/admin/financeiro-contratos/revisao-orcamentaria" },
  { label: "Provisão", href: "/admin/financeiro-contratos/provisao-mensal" },
];

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
  const [result, setResult] = useState<AnyResult | null>(null);
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
      adjustedRevenue:
        revenue * (1 + Number(form.contractAdjustmentPercent || 0) / 100),
      dissidioImpact: laborCost * (Number(form.dissidioPercent || 0) / 100),
    };
  }, [
    form.revenue,
    form.laborCost,
    form.contractAdjustmentPercent,
    form.dissidioPercent,
  ]);

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

  const selectedFiles = Object.values(files).filter(Boolean).length;
  const parsedFiles = result?.dataIntelligence?.parsedFiles || [];
  const columnCoverage = result?.dataIntelligence?.columnCoverage || {};

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin"
            className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            ← Admin Hub
          </Link>

          <div className="flex flex-wrap gap-2">
            {workflowLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-black uppercase text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            EQUATEC • GESTÃO FINANCEIRA DE CONTRATOS
          </p>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h1 className="max-w-5xl text-4xl font-black tracking-tight md:text-5xl">
                {title}
              </h1>

              <p className="mt-5 max-w-5xl text-base leading-7 text-slate-300">
                {subtitle}
              </p>
            </div>

            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              {moduleKey}
            </span>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Processamentos</p>
            <strong className="mt-2 block text-3xl font-black">{jobs.length}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Arquivos selecionados</p>
            <strong className="mt-2 block text-3xl font-black">{selectedFiles}</strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">32201 estimado</p>
            <strong className="mt-2 block text-xl font-black">
              {brl(totals.account32201)}
            </strong>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Prov. trabalhista</p>
            <strong className="mt-2 block text-xl font-black">
              {brl(totals.laborProvision)}
            </strong>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Dados do processamento</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Informe os dados conhecidos. Campos não preenchidos serão tratados nas
            próximas fases pelo motor de estimativa com base em histórico, média
            móvel e correlação contábil.
          </p>

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

        {(showProvisionFields || showRevisionFields) && (
          <section className="mb-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Receita ajustada</p>
              <strong className="mt-2 block text-xl font-black">
                {brl(totals.adjustedRevenue)}
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Impacto dissídio</p>
              <strong className="mt-2 block text-xl font-black">
                {brl(totals.dissidioImpact)}
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Resultado preliminar</p>
              <strong className="mt-2 block text-xl font-black">
                {brl(totals.preliminaryResult)}
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Rastreabilidade</p>
              <strong className="mt-2 block text-xl font-black text-cyan-300">
                Oficial • Estimado • Editado
              </strong>
            </div>
          </section>
        )}

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Arquivos de entrada</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Anexe as bases disponíveis. O sistema salva os arquivos e já executa
            leitura estrutural preliminar de XLSX/CSV, detectando abas,
            cabeçalhos, colunas críticas, amostras e totais monetários.
          </p>

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
          <section className="mb-8 space-y-6">
            <div className="rounded-3xl border border-cyan-400/20 bg-slate-900 p-6">
              <h2 className="text-2xl font-black">Resultado gerencial preliminar</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">Linhas lidas</p>
                  <strong className="mt-2 block text-3xl font-black">
                    {result.dataIntelligence?.totalRowsRead || 0}
                  </strong>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">Total detectado</p>
                  <strong className="mt-2 block text-xl font-black">
                    {result.dataIntelligence?.detectedValueTotalFormatted || "R$ 0,00"}
                  </strong>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">Arquivos lidos</p>
                  <strong className="mt-2 block text-3xl font-black">
                    {parsedFiles.length}
                  </strong>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">Classificações</p>
                  <strong className="mt-2 block text-sm font-black text-cyan-300">
                    {(result.dataIntelligence?.detectedClassifications || []).join(", ") ||
                      "Não detectado"}
                  </strong>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                  Cobertura de colunas críticas
                </p>

                <div className="grid gap-3 md:grid-cols-4">
                  {Object.entries(columnCoverage).map(([key, value]) => (
                    <div
                      key={key}
                      className={`rounded-2xl border p-4 text-sm font-bold ${
                        value
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-slate-800 bg-slate-950 text-slate-500"
                      }`}
                    >
                      {key}: {value ? "detectado" : "não detectado"}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-black">Resumo executivo</h2>

              <div className="mt-5 space-y-3">
                {(result.executiveSummary || []).map((item: string) => (
                  <p
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {parsedFiles.map((file: any) => (
                <article
                  key={`${file.originalName}-${file.label}`}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black">{file.originalName}</h3>
                      <p className="mt-2 text-sm text-slate-400">{file.label}</p>
                    </div>

                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase text-cyan-300">
                      {file.classification}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-sm text-slate-400">Linhas</p>
                      <strong className="mt-2 block text-2xl font-black">
                        {file.totalRows || 0}
                      </strong>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-sm text-slate-400">Total detectado</p>
                      <strong className="mt-2 block text-lg font-black">
                        {brl(file.detectedValueTotal || 0)}
                      </strong>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-sm text-slate-400">Abas</p>
                      <strong className="mt-2 block text-lg font-black">
                        {(file.sheetNames || []).length}
                      </strong>
                    </div>
                  </div>

                  {(file.detectedBases || []).length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {file.detectedBases.map((item: string) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {(file.warnings || []).length > 0 && (
                    <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4">
                      <p className="mb-2 text-xs font-black uppercase text-amber-300">
                        Alertas
                      </p>
                      <ul className="space-y-1 text-sm text-amber-100">
                        {file.warnings.map((warning: string) => (
                          <li key={warning}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(file.sheets || []).slice(0, 3).map((sheet: any) => (
                    <div
                      key={sheet.sheetName}
                      className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4"
                    >
                      <p className="text-sm font-black text-cyan-300">
                        Aba: {sheet.sheetName}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        Cabeçalho na linha {Number(sheet.headerRowIndex || 0) + 1} •{" "}
                        {sheet.rowCount || 0} linhas
                      </p>

                      <pre className="mt-4 max-h-[220px] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs leading-6 text-slate-300">
                        {JSON.stringify(
                          {
                            colunasDetectadas: sheet.detectedColumns,
                            amostraNormalizada: sheet.normalizedPreview,
                          },
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  ))}
                </article>
              ))}
            </div>

            <details className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <summary className="cursor-pointer text-xl font-black text-cyan-300">
                Ver JSON técnico completo
              </summary>

              <pre className="mt-5 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm leading-7 text-slate-300">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
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
