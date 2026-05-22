"use client";

import { useState } from "react";

export default function CadastroPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      role: String(formData.get("role") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      source: "cadastro",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erro ao enviar cadastro.");
      }

      setSuccess(
        "Cadastro recebido com sucesso. Em breve entraremos em contato."
      );

      event.currentTarget.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro inesperado ao enviar cadastro."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className="inline-flex rounded-full border border-cyan-500/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            Solicitar acesso
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            Acesse o Ecossistema EQUATEC
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            Preencha seus dados para solicitar acesso aos módulos, treinamentos,
            ferramentas digitais, automações e soluções com inteligência
            artificial aplicada à gestão.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <aside className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-bold">O que você pode solicitar</h2>

            <div className="mt-6 space-y-4 text-slate-300">
              <p>• CRM e gestão de leads</p>
              <p>• Gestão de obras e medições</p>
              <p>• HUB BONUS e modelos executivos</p>
              <p>• IA corporativa e automações</p>
              <p>• EQUATEC BID AI para propostas comerciais</p>
              <p>• Treinamentos, cursos EAD e consultorias</p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Nome completo *</label>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">E-mail *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="voce@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">WhatsApp</label>
                <input
                  name="phone"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Empresa</label>
                <input
                  name="company"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Cargo/Função</label>
                <input
                  name="role"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Ex.: gestor, engenheiro, diretor"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Interesse principal
                </label>
                <select
                  name="interest"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="CRM">CRM / Gestão Comercial</option>
                  <option value="OBRAS">Gestão de Obras</option>
                  <option value="BID_AI">EQUATEC BID AI</option>
                  <option value="PMOC">PMOC / Manutenção</option>
                  <option value="IA_CORPORATIVA">IA Corporativa</option>
                  <option value="TREINAMENTOS">Cursos e Treinamentos</option>
                  <option value="HUB_BONUS">HUB BONUS</option>
                  <option value="OUTROS">Outros</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-semibold">Mensagem</label>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                placeholder="Descreva rapidamente sua necessidade."
              />
            </div>

            {success && (
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-xl bg-cyan-400 px-8 py-4 font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Solicitar acesso"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}