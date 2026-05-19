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
          paddingTop: 54,
          paddingBottom: 54,
        }}
      >
        <div className="container">
          <div
            className="card"
            style={{
              padding: 28,
              display: "grid",
              gridTemplateColumns: "240px minmax(0, 1fr)",
              gap: 28,
              alignItems: "start",
            }}
          >
            <aside>
              <span className="badge">EQUATEC Platform Pro</span>

              <h2
                style={{
                  marginTop: 18,
                  marginBottom: 10,
                  fontSize: "clamp(24px, 1.8vw, 32px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.04em",
                }}
              >
                Painel Interno
              </h2>

              <p
                style={{
                  marginTop: 0,
                  fontSize: 16,
                  lineHeight: 1.55,
                }}
              >
                Central de acesso aos módulos, recursos digitais, gestão,
                automações, IA e ferramentas do ecossistema.
              </p>

              <nav style={{ display: "grid", gap: 10, marginTop: 22 }}>
                {internalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="btn btn-outline"
                    style={{
                      minHeight: 48,
                      padding: "12px 16px",
                      fontSize: 16,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <section>
              <span className="badge">{eyebrow}</span>

              <h1
                style={{
                  marginTop: 12,
                  marginBottom: 18,
                  fontSize: "clamp(42px, 5vw, 78px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.07em",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  maxWidth: 980,
                  fontSize: "clamp(17px, 1.25vw, 22px)",
                  lineHeight: 1.55,
                  marginBottom: 0,
                }}
              >
                {subtitle}
              </p>

              <div style={{ marginTop: 28 }}>{children}</div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
