import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">
          CRM EQUATEC <span className="text-cyan-500">- Leads</span>
        </h1>

        <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
          <table className="w-full border-collapse">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Nome</th>
                <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Empresa</th>
                <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Interesse</th>
                <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Status</th>
                <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">E-mail</th>
                <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Telefone</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/50">
              {leads.map((lead) => (
                /* Sugestão do Claude aplicada aqui: hover transition */
                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors duration-200">
                  <td className="p-5 text-sm font-medium text-white">{lead.name}</td>
                  <td className="p-5 text-sm text-slate-300">{lead.company || "-"}</td>
                  <td className="p-5 text-sm text-slate-300">{lead.interest || "-"}</td>
                  <td className="p-5 text-sm">
                    /* Sugestão do Claude aplicada aqui: Badge Pill */
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-slate-400">{lead.email}</td>
                  <td className="p-5 text-sm text-slate-400">{lead.phone || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="p-10 text-center text-slate-400">
              <p className="text-sm">Nenhum lead cadastrado no momento.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}