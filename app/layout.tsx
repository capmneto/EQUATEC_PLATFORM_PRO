import Link from "next/link";
import type { ReactNode } from "react";

const navGroups = [
  {
    title: "Operação",
    items: [
      { label: "Hub Executivo", href: "/admin", badge: "Core" },
      { label: "BID AI", href: "/admin/bid", badge: "Novo" },
      { label: "CRM Leads", href: "/admin/leads", badge: "Ativo" },
    ],
  },
  {
    title: "Governança",
    items: [
      { label: "Auditoria", href: "/admin/auditoria", badge: "Log" },
      { label: "Usuários", href: "/admin/usuarios", badge: "RBAC" },
      { label: "Aprovações", href: "/admin/aprovacoes", badge: "Flow" },
    ],
  },
  {
    title: "Ecossistema",
    items: [
      { label: "IA Corporativa", href: "/ia", badge: "AI" },
      { label: "Obras", href: "/obras", badge: "Módulo" },
      { label: "Cursos", href: "/cursos", badge: "EAD" },
      { label: "Automações", href: "/automacoes", badge: "n8n" },
    ],
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950 p-6">
          <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              EQUATEC
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight">
              Control Hub
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Plataforma modular para gestão, engenharia, IA, propostas,
              documentos e governança SaaS.
            </p>
          </div>

          <nav className="space-y-7">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  {group.title}
                </p>

                <div className="space-y-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-200"
                    >
                      <span>{item.label}</span>

                      <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-400 group-hover:border-cyan-400/30 group-hover:text-cyan-300">
                        {item.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            <p className="text-sm font-black text-emerald-300">
              Core operacional
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              Build validado, rotas reconhecidas e estrutura pronta para IA
              Core, documentos inteligentes e billing SaaS.
            </p>
          </div>
        </aside>

        <section className="min-w-0 bg-slate-950">
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Plataforma Administrativa
                </p>

                <h1 className="mt-1 text-xl font-black">
                  EQUATEC Enterprise Shell
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
                  Build OK
                </span>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-300">
                  SaaS Core
                </span>

                <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300">
                  Produção preparada
                </span>
              </div>
            </div>
          </header>

          <main className="min-h-screen">{children}</main>
        </section>
      </div>
    </div>
  );
}