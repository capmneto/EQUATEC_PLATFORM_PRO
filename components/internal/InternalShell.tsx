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
  eyebrow?: string;
  children: React.ReactNode;
};

export function InternalShell({
  title,
  subtitle,
  eyebrow = "Ambiente de Gestão Integrada",
  children,
}: InternalShellProps) {
  return (
    <main className="page">
      <section
        className="simple-page"
        style={{
          paddingTop: 28,
          paddingBottom: 36,
        }}
      >
        <div className="container">
          <div
            className="card"
            style={{
              padding: 20,
              display: "grid",
              gridTemplateColumns: "190px minmax(0, 1fr)",
              gap: 22,
              alignItems: "start",
              overflow: "hidden",
            }}
          >
            <aside>
              <span
                className="badge"
                style={{
                  fontSize: 9,
                  padding: "6px 10px",
                  lineHeight: 1.2,
                }}
              >
                EQUATEC Platform Pro
              </span>

              <h2
                style={{
                  marginTop: 14,
                  marginBottom: 8,
                  fontSize: 23,
                  lineHeight: 1.08,
                  letterSpacing: "-0.04em",
                }}
              >
                Painel Interno
              </h2>

              <p
                style={{
                  marginTop: 0,
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: "rgba(226, 232, 240, 0.72)",
                }}
              >
                Central dos módulos, automações, IA e ferramentas digitais.
              </p>

              <nav style={{ display: "grid", gap: 7, marginTop: 16 }}>
                {internalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="btn btn-outline"
                    style={{
                      minHeight: 38,
                      padding: "9px 10px",
                      fontSize: 13,
                      borderRadius: 12,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <section style={{ minWidth: 0 }}>
              <span
                className="badge"
                style={{
                  fontSize: 9,
                  padding: "6px 10px",
                }}
              >
                {eyebrow}
              </span>

              <h1
                style={{
                  marginTop: 10,
                  marginBottom: 12,
                  fontSize: "clamp(34px, 3.1vw, 52px)",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  maxWidth: 980,
                  fontSize: 16,
                  lineHeight: 1.48,
                  marginBottom: 0,
                  color: "rgba(226, 232, 240, 0.78)",
                }}
              >
                {subtitle}
              </p>

              <div style={{ marginTop: 20 }}>{children}</div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}