export const dynamic = "force-dynamic";

export default function AdminBidPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <span className="text-cyan-500 text-xs font-bold tracking-widest uppercase mb-1 block">
              EQUATEC Ecosystem
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white">BID AI</h1>
            <p className="text-slate-400 mt-2 text-sm max-w-2xl">
              Plataforma inteligente para interpretação de editais, precificação, análise de riscos e gestão estratégica de propostas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md">
            <h3 className="text-slate-400 text-sm font-medium mb-1">Total de Propostas</h3>
            <p className="text-3xl font-black text-white">24</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md">
            <h3 className="text-slate-400 text-sm font-medium mb-1">Em Precificação</h3>
            <p className="text-3xl font-black text-amber-400">8</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Projetos de Propostas</h2>
          <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full border-collapse">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Cliente</th>
                  <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Projeto</th>
                  <th className="p-5 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800/50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr className="hover:bg-slate-800/30 transition-colors duration-200">
                  <td className="p-5 text-sm font-medium text-white">Braskem</td>
                  <td className="p-5 text-sm text-slate-300">Contrato de Manutenção PVC AL2</td>
                  <td className="p-5 text-sm"><span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">EM PRECIFICAÇÃO</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}