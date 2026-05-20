import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AuditoriaPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true },
  });

  return (
    <main className="simple-page">
      <div className="container">
        <span className="badge">Governança e Compliance</span>
        <h1>Auditoria do Sistema</h1>
        <p>Histórico das ações realizadas na plataforma.</p>

        <div className="card" style={{ padding: 24, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Data</th>
                <th align="left">Usuário</th>
                <th align="left">Ação</th>
                <th align="left">Entidade</th>
                <th align="left">IP</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderTop: "1px solid rgba(148,163,184,.25)" }}>
                  <td style={{ padding: "10px 8px" }}>
                    {new Date(log.createdAt).toLocaleString("pt-BR")}
                  </td>
                  <td style={{ padding: "10px 8px" }}>{log.user?.email ?? "-"}</td>
                  <td style={{ padding: "10px 8px" }}>{log.action}</td>
                  <td style={{ padding: "10px 8px" }}>
                    {log.entityType ?? "-"}
                  </td>
                  <td style={{ padding: "10px 8px" }}>{log.ipAddress ?? "-"}</td>
                </tr>
              ))}

              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 16 }}>
                    Nenhum registro de auditoria encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}