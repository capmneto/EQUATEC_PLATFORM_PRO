import type { CSSProperties } from "react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>CRM EQUATEC - Leads</h1>

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={headRowStyle}>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Empresa</th>
              <th style={thStyle}>Interesse</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>E-mail</th>
              <th style={thStyle}>Telefone</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td style={tdStyle}>{lead.name}</td>
                <td style={tdStyle}>{lead.company || "-"}</td>
                <td style={tdStyle}>{lead.interest || "-"}</td>
                <td style={tdStyle}>{lead.status}</td>
                <td style={tdStyle}>{lead.email}</td>
                <td style={tdStyle}>{lead.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <div style={emptyStyle}>Nenhum lead cadastrado.</div>
        )}
      </div>
    </main>
  );
}

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  background: "#020617",
  color: "#fff",
  padding: "40px",
};

const titleStyle: CSSProperties = {
  fontSize: "42px",
  fontWeight: 900,
  marginBottom: "24px",
};

const tableWrapperStyle: CSSProperties = {
  overflowX: "auto",
  background: "#0f172a",
  borderRadius: "20px",
  border: "1px solid rgba(148,163,184,0.2)",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
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
  borderBottom: "1px solid rgba(148,163,184,0.2)",
};

const tdStyle: CSSProperties = {
  padding: "16px",
  borderBottom: "1px solid rgba(148,163,184,0.08)",
};

const emptyStyle: CSSProperties = {
  padding: "30px",
  color: "#94a3b8",
};