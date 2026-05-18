import Link from "next/link";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Ecossistema", href: "/#ecossistema" },
  { label: "Módulos", href: "/modulos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          EQUA<span>TEC</span>
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="btn btn-outline">
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
