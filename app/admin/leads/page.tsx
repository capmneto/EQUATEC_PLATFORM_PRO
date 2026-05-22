import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalNovos = leads.filter((lead) => lead.status === "NOVO").length;
  const totalBidAi = leads.filter((lead) => lead.interest === "BID_AI").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "48px 24px",
      }}
    >
      <section style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              display: "inline-flex",
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(34, 211, 238, 0.35)",
              background: "rgba(8, 47, 73, 0.4)",
              color: "#67e8f9",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            CRM EQUATEC
          </span>

          <h1
            style={{
              marginTop: "22px",
              fontSize: "58px",
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: "-0.05em",
            }}
          >
            Pipeline Comercial
          </h1>

          <p
            style={{
              marginTop: "18px",
              maxWidth: "780px",
              color: "#cbd5e1",
              lineHeight: 1.7,
              fontSize: "18px",
            }}
          >
            Gestão de leads, oportunidades, interessados e solicitações de
            acesso do Ecossistema EQUATEC.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <StatCard label="Total Leads" value={leads.length} />
          <StatCard label="Status NOVO" value={totalNovos} />
          <StatCard label="Módulos BID AI" value={totalBidAi} />
        </div>

        <div
          style={{
            overflowX: "auto",
            borderRadius: "28px",
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "rgba(15, 23, 42, 1)" }}>
              <tr>
                {["Nome", "Empresa", "Interesse", "Status", "Contato", "Data"].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: "left",
                        padding: "18px",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#94a3b8",
                        borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <strong>{lead.name}</strong>
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                        {lead.email}
                      </span>
                    </div>
                  </td>

                  <td style={tdStyle}>{lead.company || "-"}</td>

                  <td style={tdStyle}>
                    <span style={tagStyle}>{lead.interest || "GERAL"}</span>
                  </td>

                  <td style={tdStyle}>
                    <span style={statusStyle}>{lead.status}</span>
                  </td>

                  <td style={tdStyle}>{lead.phone || "-"}</td>

                  <td style={tdStyle}>
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div
              style={{
                padding: "42px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              Nenhum lead cadastrado até o momento.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        borderRadius: "24px",
        padding: "24px",
        background: "rgba(15, 23, 42, 0.88)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
      }}
    >
      <span
        style={{
          display: "block",
          color: "#94a3b8",
          fontSize: "14px",
          marginBottom: "12px",
        }}
      >
        {label}
      </span>

      <strong style={{ fontSize: "42px", fontWeight: 950 }}>{value}</strong>
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "18px",
  borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
  color: "#e2e8f0",
};

const tagStyle: React.CSSProperties = {
  display: "inline-flex",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(34, 211, 238, 0.12)",
  border: "1px solid rgba(34, 211, 238, 0.24)",
  color: "#67e8f9",
  fontSize: "12px",
  fontWeight: 800,
};

const statusStyle: React.CSSProperties = {
  display: "inline-flex",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 900,
  background: "rgba(59, 130, 246, 0.14)",
  color: "#93c5fd",
};