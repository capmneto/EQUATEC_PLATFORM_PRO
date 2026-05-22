import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="admin-page">
      <section className="container">
        <div className="hero">
          <span className="badge">CRM EQUATEC</span>

          <h1>Pipeline Comercial</h1>

          <p>
            Gestão de leads, oportunidades, interessados e solicitações de
            acesso do Ecossistema EQUATEC.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Leads</span>
            <strong>{leads.length}</strong>
          </div>

          <div className="stat-card">
            <span>Status NOVO</span>
            <strong>
              {leads.filter((lead) => lead.status === "NOVO").length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Módulos BID AI</span>
            <strong>
              {
                leads.filter((lead) => lead.interest === "BID_AI").length
              }
            </strong>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Interesse</th>
                <th>Status</th>
                <th>Contato</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="lead-name">
                      <strong>{lead.name}</strong>
                      <span>{lead.email}</span>
                    </div>
                  </td>

                  <td>{lead.company || "-"}</td>

                  <td>
                    <span className="tag">
                      {lead.interest || "GERAL"}
                    </span>
                  </td>

                  <td>
                    <span className={`status ${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </td>

                  <td>{lead.phone || "-"}</td>

                  <td>
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="empty">
              Nenhum lead cadastrado até o momento.
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background: #020617;
          color: white;
          padding: 48px 24px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .hero {
          margin-bottom: 32px;
        }

        .badge {
          display: inline-flex;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(34, 211, 238, 0.35);
          background: rgba(8, 47, 73, 0.4);
          color: #67e8f9;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        h1 {
          margin-top: 22px;
          font-size: 58px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.05em;
        }

        .hero p {
          margin-top: 18px;
          max-width: 780px;
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 18px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .stat-card {
          border-radius: 24px;
          padding: 24px;
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .stat-card span {
          display: block;
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .stat-card strong {
          font-size: 42px;
          font-weight: 950;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 28px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: rgba(15, 23, 42, 1);
        }

        th {
          text-align: left;
          padding: 18px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          border-bottom: 1px solid rgba(148, 163, 184, 0.14);
        }

        td {
          padding: 18px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          color: #e2e8f0;
        }

        tr:hover {
          background: rgba(30, 41, 59, 0.4);
        }

        .lead-name {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lead-name span {
          color: #94a3b8;
          font-size: 13px;
        }

        .tag {
          display: inline-flex;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(34, 211, 238, 0.12);
          border: 1px solid rgba(34, 211, 238, 0.24);
          color: #67e8f9;
          font-size: 12px;
          font-weight: 800;
        }

        .status {
          display: inline-flex;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
        }

        .status.novo {
          background: rgba(59, 130, 246, 0.14);
          color: #93c5fd;
        }

        .empty {
          padding: 42px;
          text-align: center;
          color: #94a3b8;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 42px;
          }
        }
      `}</style>
    </main>
  );
}