"use client";

import { useEffect, useState } from "react";

const DEV_EMAIL = "capmneto@gmail.com";
const DEV_PASSWORD = "TrocarSenha@2026";

export default function LoginPage() {
  const [email, setEmail] = useState(DEV_EMAIL);
  const [password, setPassword] = useState(DEV_PASSWORD);
  const [callbackUrl, setCallbackUrl] = useState("/admin/financeiro-contratos");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get("callbackUrl") || "/admin/financeiro-contratos");
  }, []);

  function createLocalSessionAndRedirect(target?: string) {
    try {
      const maxAge = 60 * 60 * 12;

      document.cookie = `equatec-local-dev-session=1; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `equatec-local-dev-email=${encodeURIComponent(DEV_EMAIL)}; path=/; max-age=${maxAge}; SameSite=Lax`;

      window.location.href = target || callbackUrl || "/admin/financeiro-contratos";
    } catch {
      setError("Não foi possível criar a sessão local no navegador.");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== DEV_EMAIL || password !== DEV_PASSWORD) {
      setError("Use o botão de acesso local ou confira a credencial exibida abaixo.");
      return;
    }

    createLocalSessionAndRedirect();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="w-full max-w-3xl">
          <p className="mb-8 text-base font-black text-cyan-300">
            Acesso seguro
          </p>

          <h1 className="text-6xl font-light tracking-tight md:text-7xl">
            Login EQUATEC
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">
            Acesse o ecossistema de tecnologia, gestão integrada, IA e automações.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">
                E-mail
              </span>

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="off"
                className="block w-full rounded-2xl border border-cyan-400/30 bg-white px-6 py-5 text-lg text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">
                Senha
              </span>

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="text"
                placeholder="Digite sua senha"
                autoComplete="off"
                className="block w-full rounded-2xl border border-cyan-400/30 bg-white px-6 py-5 text-lg text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
              />
            </label>

            {error && (
              <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-400 px-6 py-5 text-base font-black text-slate-950 transition hover:bg-cyan-300"
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => createLocalSessionAndRedirect("/admin/financeiro-contratos")}
              className="w-full rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-6 py-5 text-base font-black text-cyan-200 transition hover:bg-cyan-400/20"
            >
              Acessar ambiente local
            </button>

            <button
              type="button"
              onClick={() => createLocalSessionAndRedirect("/admin/financeiro-contratos/provisao-mensal")}
              className="w-full rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-6 py-5 text-base font-black text-emerald-200 transition hover:bg-emerald-400/20"
            >
              Ir direto para Provisão Mensal
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
            <p className="font-black text-cyan-300">
              Acesso local de desenvolvimento
            </p>
            <p>E-mail: {DEV_EMAIL}</p>
            <p>Senha: {DEV_PASSWORD}</p>
            <p className="mt-2 text-cyan-200">
              O botão cria uma sessão local no navegador e redireciona para o módulo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
