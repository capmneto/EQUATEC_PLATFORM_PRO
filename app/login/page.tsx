"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("capmneto@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl,
        redirectTo: callbackUrl,
      } as any);

      if ((result as any)?.error) {
        setError("E-mail ou senha inválidos, usuário pendente de aprovação ou acesso não autorizado.");
        setLoading(false);
        return;
      }

      window.location.assign(callbackUrl);
    } catch {
      setError("Não foi possível realizar o login. Verifique os dados e tente novamente.");
      setLoading(false);
    }
  }

  return (
    <main className="simple-page">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="card" style={{ padding: 34 }}>
          <span className="badge">Acesso seguro</span>

          <h1
            style={{
              marginTop: 18,
              marginBottom: 14,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-0.06em",
            }}
          >
            Login EQUATEC
          </h1>

          <p style={{ marginBottom: 28, fontSize: 18, lineHeight: 1.5 }}>
            Acesse o ecossistema de tecnologia, gestão integrada, IA e automações.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px 18px",
                borderRadius: 16,
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "#eaf2ff",
                color: "#020617",
                fontSize: 16,
              }}
            />

            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px 18px",
                borderRadius: 16,
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "#eaf2ff",
                color: "#020617",
                fontSize: 16,
              }}
            />

            {error && (
              <div style={{ color: "#fca5a5", fontSize: 14, lineHeight: 1.4 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                minHeight: 56,
                fontSize: 16,
              }}
            >
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
    <Suspense
      fallback={
        <main className="simple-page">
          <div className="container">Carregando login...</div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}