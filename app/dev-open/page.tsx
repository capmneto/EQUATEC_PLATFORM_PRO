"use client";

import { useEffect } from "react";

export default function DevOpenPage() {
  useEffect(() => {
    const maxAge = 60 * 60 * 12;

    document.cookie = `equatec-local-dev-session=1; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `equatec-local-dev-email=capmneto%40gmail.com; path=/; max-age=${maxAge}; SameSite=Lax`;

    window.location.href = "/admin/financeiro-contratos";
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="rounded-3xl border border-cyan-400/20 bg-slate-900 p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
          EQUATEC
        </p>
        <h1 className="mt-4 text-3xl font-black">Abrindo ambiente local...</h1>
        <p className="mt-3 text-slate-400">
          Criando sessão local e redirecionando para o módulo financeiro.
        </p>
      </div>
    </main>
  );
}
