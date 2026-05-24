import type { CSSProperties } from "react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getStatusStyle(status: string): CSSProperties {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: 800,
    border: "1px solid",
    whiteSpace: "nowrap",
  };

  if (status === "GANHO") {
    return {
      ...base,
      background: "rgba(16, 185, 129, 0.12)",
      color: "#6ee7b7",
      borderColor: "rgba(16, 185, 129, 0.35)",
    };
  }

  if (status === "PERDIDO") {
    return {
      ...base,
      background: "rgba(248, 113, 113, 0.12)",
      color: "#fca5a5",
      borderColor: "rgba(248, 113, 113, 0.35)",
    };
  }

  if (status === "NOVO") {
    return {
      ...base,
      background: "rgba(34, 211, 238, 0.12)",
      color: "#67e8f9",
      borderColor: "rgba(34, 211, 238, 0.35)",
    };
  }

  return {
    ...base,
    background: "rgba(250, 204, 21, 0.12)",
    color: "#fde68a",
    borderColor: "rgba(250, 204, 21, 0.35)",
  };
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={mainStyle}>
      <section style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>CRM EQUATEC</p>
          <h1 style={titleStyle}>Leads cadastrados</h1>
          <p style={subtitleStyle}>
            Painel administrativo inicial para acompanhamento dos contatos
            capturados pelo formulário comercial da plataforma.
          </p>
        </div>
      </section>

      <section style={summaryGridStyle}>
        <div style={cardStyle}>
          <span style={cardLabelStyle}>Total de leads</span>
          <strong style={cardValueStyle}>{leads.length}</strong>
        </div>

        <div style={cardStyle}>
          <span style={cardLabelStyle}>Novos</span>
          <strong style={cardValueStyle}>
            {leads.filter((lead) => lead.status === "NOVO").length}
          </strong>
        </div>

        <div style={cardStyle}>
          <span style={cardLabelStyle}>Em acompanhamento</span>
          <strong style={cardValueStyle}>
            {
              leads.filter(
                (lead) =>
                  lead.status !== "NOVO" &&
                  lead.status !== "GANHO" &&
                  lead.status !== "PERDIDO",
              ).length
            }
          </strong>
        </div>
      </section>

      <section style={tableWrapperStyle}>
        <div style={tableHeaderStyle}>
          <h2 style={sectionTitleStyle}>Base de contatos</h2>
          <span style={tableInfoStyle}>
            Dados ordenados do mais recente para o mais antigo.
          </span>
        </div>

        <div style={scrollStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={headRowStyle}>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Empresa</th>
                <th style={thStyle}>Interesse</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>E-mail</th>
                <th style={thStyle}>Telefone</th>
                <th style={thStyle}>Criado em</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-slate-800/30"
                >
                  <td style={tdStrongStyle}>{lead.name}</td>
                  <td style={tdStyle}>{lead.company || "-"}</td>
                  <td style={tdStyle}>{lead.interest || "-"}</td>
                  <td style={tdStyle}>
                    <span style={getStatusStyle(lead.status)}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={tdStyle}>{lead.email}</td>
                  <td style={tdStyle}>{lead.phone || "-"}</td>
                  <td style={tdStyle}>
                    {new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && (
          <div style={emptyStyle}>Nenhum lead cadastrado até o momento.</div>
        )}
      </section>
    </main>
  );
}

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  background: "#020617",
  color: "#ffffff",
  padding: "40px",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "24px",
  marginBottom: "28px",
};

const eyebrowStyle: CSSProperties = {
  color: "#22d3ee",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  marginBottom: "10px",
};

const titleStyle: CSSProperties = {
  fontSize: "42px",
  lineHeight: 1.1,
  fontWeight: 900,
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  maxWidth: "760px",
  color: "#cbd5e1",
  fontSize: "16px",
  lineHeight: 1.6,
  marginTop: "14px",
};

const summaryGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const cardStyle: CSSProperties = {
  background: "#0f172a",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "20px",
  padding: "22px",
};

const cardLabelStyle: CSSProperties = {
  display: "block",
  color: "#94a3b8",
  fontSize: "13px",
  marginBottom: "10px",
};

const cardValueStyle: CSSProperties = {
  display: "block",
  color: "#ffffff",
  fontSize: "34px",
  fontWeight: 900,
};

const tableWrapperStyle: CSSProperties = {
  background: "#0f172a",
  borderRadius: "22px",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  overflow: "hidden",
};

const tableHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  padding: "22px",
  borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "20px",
  fontWeight: 800,
};

const tableInfoStyle: CSSProperties = {
  color: "#94a3b8",
  fontSize: "13px",
};

const scrollStyle: CSSProperties = {
  overflowX: "auto",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "980px",
};

const headRowStyle: CSSProperties = {
  background: "#111827",
};

const thStyle: CSSProperties = {
  padding: "16px",
  textAlign: "left",
  color: "#94a3b8",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  borderBottom: "1px solid rgba(148, 163, 184, 0.18)",
};

const tdStyle: CSSProperties = {
  padding: "16px",
  color: "#cbd5e1",
  borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
  fontSize: "14px",
};

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: "#ffffff",
  fontWeight: 700,
};

const emptyStyle: CSSProperties = {
  padding: "32px",
  color: "#94a3b8",
  textAlign: "center",
};