"use client";

import { FormEvent, useEffect, useState } from "react";

const DEV_EMAIL = "capmneto@gmail.com";
const DEV_PASSWORD = "TrocarSenha@2026";

export default function LoginPage() {
  const [email, setEmail] = useState(DEV_EMAIL);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [callbackUrl, setCallbackUrl] = useState("/admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get("callbackUrl") || "/admin");
  }, []);

  async function submitLogin(loginEmail: string, loginPassword: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/dev-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          callbackUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "E-mail ou senha inválidos.");
        return;
      }

      window.location.href = data.redirectTo || callbackUrl || "/admin";
    } catch {
      setError("Falha ao conectar com o login local.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitLogin(email, password);
  }

  async function handleDevAccess() {
    setEmail(DEV_EMAIL);
    setPassword(DEV_PASSWORD);
    await submitLogin(DEV_EMAIL, DEV_PASSWORD);
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
                tabIndex={1}
                className="block w-full rounded-2xl border border-cyan-400/30 bg-white px-6 py-5 text-lg text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">
                Senha
              </span>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  autoComplete="off"
                  tabIndex={2}
                  className="block w-full rounded-2xl border border-cyan-400/30 bg-white px-6 py-5 text-lg text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-sm font-black text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-cyan-400 px-6 py-5 text-base font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <button
              type="button"
              onClick={handleDevAccess}
              disabled={loading}
              className="w-full rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-6 py-5 text-base font-black text-cyan-200 transition hover:bg-cyan-400/20 disabled:opacity-60"
            >
              Acessar ambiente local
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
            <p className="font-black text-cyan-300">
              Acesso local de desenvolvimento
            </p>
            <p>E-mail: {DEV_EMAIL}</p>
            <p>Senha: {DEV_PASSWORD}</p>
            <p className="mt-2 text-cyan-200">
              Use o botão “Acessar ambiente local” se o navegador estiver
              travando o preenchimento manual.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
