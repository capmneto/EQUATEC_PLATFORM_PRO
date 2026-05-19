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
          paddingTop: 34,
          paddingBottom: 42,
        }}
      >
        <div className="container">
          <div
            className="card"
            style={{
              padding: 24,
              display: "grid",
              gridTemplateColumns: "220px minmax(0, 1fr)",
              gap: 24,
              alignItems: "start",
              overflow: "hidden",
            }}
          >
            <aside>
              <span
                className="badge"
                style={{
                  fontSize: 10,
                  padding: "7px 12px",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                  lineHeight: 1.2,
                }}
              >
                EQUATEC Platform Pro
              </span>

              <h2
                style={{
                  marginTop: 16,
                  marginBottom: 10,
                  fontSize: "clamp(22px, 1.45vw, 28px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.04em",
                }}
              >
                Painel Interno
              </h2>

              <p
                style={{
                  marginTop: 0,
                  fontSize: 14,
                  lineHeight: 1.45,
                }}
              >
                Central dos módulos, recursos digitais, automações, IA e ferramentas
                do ecossistema.
              </p>

              <nav style={{ display: "grid", gap: 8, marginTop: 18 }}>
                {internalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="btn btn-outline"
                    style={{
                      minHeight: 42,
                      padding: "10px 12px",
                      fontSize: 14,
                      borderRadius: 14,
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
                  fontSize: 10,
                  padding: "7px 12px",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                }}
              >
                {eyebrow}
              </span>

              <h1
                style={{
                  marginTop: 12,
                  marginBottom: 14,
                  fontSize: "clamp(38px, 4vw, 64px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.065em",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  maxWidth: 980,
                  fontSize: "clamp(16px, 1.05vw, 19px)",
                  lineHeight: 1.48,
                  marginBottom: 0,
                }}
              >
                {subtitle}
              </p>

              <div style={{ marginTop: 24 }}>{children}</div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
