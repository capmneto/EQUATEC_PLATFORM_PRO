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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erro ao enviar cadastro.");
      }

      setSuccess("Cadastro recebido com sucesso. Em breve entraremos em contato.");
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
        <div className="cadastro-hero">
          <span className="badge">Solicitar acesso</span>
          <h1>Acesse o Ecossistema EQUATEC</h1>
          <p>
            Preencha seus dados para solicitar acesso aos módulos, treinamentos,
            ferramentas digitais, automações e soluções com inteligência artificial
            aplicada à gestão.
          </p>
        </div>

        <div className="cadastro-grid">
          <aside className="info-card">
            <h2>O que você pode solicitar</h2>
            <ul>
              <li>CRM e gestão de leads</li>
              <li>Gestão de obras e medições</li>
              <li>HUB BONUS e modelos executivos</li>
              <li>IA corporativa e automações</li>
              <li>EQUATEC BID AI para propostas comerciais</li>
              <li>Treinamentos, cursos EAD e consultorias</li>
            </ul>
          </aside>

          <form onSubmit={handleSubmit} className="form-card">
            <div className="form-grid">
              <Field label="Nome completo *" name="name" required placeholder="Seu nome" />
              <Field label="E-mail *" name="email" type="email" required placeholder="voce@email.com" />
              <Field label="WhatsApp" name="phone" placeholder="(00) 00000-0000" />
              <Field label="Empresa" name="company" placeholder="Nome da empresa" />
              <Field label="Cargo/Função" name="role" placeholder="Ex.: gestor, engenheiro, diretor" />

              <label className="field">
                <span>Interesse principal</span>
                <select name="interest" defaultValue="">
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="CRM">CRM / Gestão Comercial</option>
                  <option value="OBRAS">Gestão de Obras</option>
                  <option value="BID_AI">EQUATEC BID AI</option>
                  <option value="PMOC">PMOC / Manutenção</option>
                  <option value="IA_CORPORATIVA">IA Corporativa</option>
                  <option value="TREINAMENTOS">Cursos e Treinamentos</option>
                  <option value="HUB_BONUS">HUB BONUS</option>
                  <option value="OUTROS">Outros</option>
                </select>
              </label>
            </div>

            <label className="field full">
              <span>Mensagem</span>
              <textarea name="message" rows={5} placeholder="Descreva rapidamente sua necessidade." />
            </label>

            {success && <div className="alert success">{success}</div>}
            {error && <div className="alert error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Solicitar acesso"}
            </button>
          </form>
        </div>
      </section>

      <style jsx>{`
        .cadastro-page {
          min-height: 100vh;
          background: #020617;
          color: white;
          padding: 72px 24px;
        }

        .cadastro-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        .cadastro-hero {
          margin-bottom: 42px;
        }

        .badge {
          display: inline-flex;
          padding: 10px 18px;
          border: 1px solid rgba(34, 211, 238, 0.45);
          border-radius: 999px;
          color: #67e8f9;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: rgba(8, 47, 73, 0.45);
        }

        h1 {
          margin-top: 24px;
          max-width: 850px;
          font-size: clamp(42px, 6vw, 72px);
          line-height: 0.95;
          font-weight: 950;
          letter-spacing: -0.05em;
        }

        .cadastro-hero p {
          margin-top: 22px;
          max-width: 780px;
          color: #cbd5e1;
          font-size: 18px;
          line-height: 1.7;
        }

        .cadastro-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.4fr;
          gap: 28px;
        }

        .info-card,
        .form-card {
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 28px;
          background: rgba(15, 23, 42, 0.88);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
        }

        .info-card {
          padding: 34px;
        }

        .info-card h2 {
          font-size: 28px;
          margin-bottom: 24px;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 16px;
          color: #cbd5e1;
          font-size: 16px;
          line-height: 1.5;
        }

        .info-card li::before {
          content: "• ";
          color: #22d3ee;
          font-weight: 900;
        }

        .form-card {
          padding: 34px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          font-weight: 800;
          color: #e2e8f0;
        }

        .field.full {
          margin-top: 20px;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid rgba(148, 163, 184, 0.28);
          border-radius: 14px;
          background: #020617;
          color: white;
          padding: 14px 16px;
          font-size: 15px;
          outline: none;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #22d3ee;
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.12);
        }

        textarea {
          resize: vertical;
        }

        button {
          margin-top: 24px;
          border: 0;
          border-radius: 16px;
          background: #22d3ee;
          color: #020617;
          padding: 16px 28px;
          font-size: 16px;
          font-weight: 950;
          cursor: pointer;
        }

        button:hover {
          background: #67e8f9;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .alert {
          margin-top: 20px;
          border-radius: 14px;
          padding: 14px 16px;
          font-weight: 700;
        }

        .success {
          border: 1px solid rgba(16, 185, 129, 0.35);
          background: rgba(16, 185, 129, 0.12);
          color: #6ee7b7;
        }

        .error {
          border: 1px solid rgba(239, 68, 68, 0.35);
          background: rgba(239, 68, 68, 0.12);
          color: #fca5a5;
        }

        @media (max-width: 900px) {
          .cadastro-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  );
}