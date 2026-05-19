import Link from "next/link";

const internalLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "HUB BONUS", href: "/hub-bonus" },
  { label: "Obras", href: "/obras" },
  { label: "Franquias", href: "/franquias" },
  { label: "IA Corporativa", href: "/ia" },
  { label: "Cursos", href: "/cursos" },
  { label: "Automações", href: "/automacoes" },
  { label: "Administração", href: "/admin" },
];

type InternalShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function InternalShell({ title, subtitle, children }: InternalShellProps) {
  return (
    <main className="page">
      <section className="simple-page">
        <div className="container">
          <div
            className="card"
            style={{
              marginBottom: 24,
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 24,
              alignItems: "start",
            }}
          >
            <aside>
              <span className="badge">EQUATEC Platform Pro</span>

              <h2 style={{ marginTop: 18, fontSize: 28, letterSpacing: "-0.04em" }}>
                Ambiente Interno
              </h2>

              <p style={{ marginTop: 12 }}>
                Estrutura inicial da plataforma funcional para módulos, usuários,
                aprovações, IA, automações e gestão integrada.
              </p>

              <nav style={{ display: "grid", gap: 10, marginTop: 24 }}>
                {internalLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="btn btn-outline">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <section>
              <span className="badge">Fase 2 — Fundação Funcional</span>
              <h1>{title}</h1>
              <p>{subtitle}</p>

              <div style={{ marginTop: 28 }}>
                {children}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
