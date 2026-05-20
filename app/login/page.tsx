"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("E-mail ou senha inválidos, usuário pendente ou não autorizado.");
      return;
    }

    window.location.href = callbackUrl;
  }

  return (
    <main className="simple-page">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card" style={{ padding: 28 }}>
          <span className="badge">Acesso seguro</span>
          <h1>Login EQUATEC</h1>
          <p>Acesse o ecossistema de tecnologia, gestão integrada, IA e automações.</p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

            {error && <div style={{ color: "#fca5a5", fontSize: 14 }}>{error}</div>}

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="simple-page"><div className="container">Carregando login...</div></main>}>
      <LoginForm />
    </Suspense>
  );
}