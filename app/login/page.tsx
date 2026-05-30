"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("capmneto@gmail.com");
  const [password, setPassword] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("/admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get("callbackUrl") || "/admin");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.ok) {
      window.location.href = result.url || callbackUrl || "/admin";
      return;
    }

    setError("E-mail ou senha inválidos, usuário pendente de aprovação ou acesso não autorizado.");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="w-full max-w-2xl">
          <p className="mb-8 text-base font-bold text-white">Acesso seguro</p>

          <h1 className="text-6xl font-light tracking-tight md:text-7xl">
            Login EQUATEC
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-white">
            Acesse o ecossistema de tecnologia, gestão integrada, IA e automações.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Seu e-mail"
              className="w-full rounded-2xl border border-slate-700 bg-slate-100 px-6 py-5 text-lg text-slate-950 outline-none transition focus:border-cyan-400"
            />

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Sua senha"
              className="w-full rounded-2xl border border-slate-700 bg-slate-100 px-6 py-5 text-lg text-slate-950 outline-none transition focus:border-cyan-400"
            />

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
          </form>

          <p className="mt-8 text-sm text-slate-400">
            Acesso local de desenvolvimento: capmneto@gmail.com / TrocarSenha@2026
          </p>
        </div>
      </section>
    </main>
  );
}
