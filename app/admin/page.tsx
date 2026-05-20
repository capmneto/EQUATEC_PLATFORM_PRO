import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const adminCards = [
  {
    title: "Auditoria",
    description: "Consultar histórico de alterações, ações de usuários e rastreabilidade.",
    href: "/admin/auditoria",
  },
  {
    title: "Usuários",
    description: "Gerenciar usuários, aprovações, perfis e permissões.",
    href: "/admin/usuarios",
  },
  {
    title: "Conteúdo",
    description: "Editar textos, chamadas comerciais, seções da home e páginas institucionais.",
    href: "/admin/conteudo",
  },
  {
    title: "Mídia",
    description: "Gerenciar imagens, logo, banners, favicon e arquivos visuais.",
    href: "/admin/midia",
  },
  {
    title: "Configurações",
    description: "Atualizar dados institucionais, links, contatos e identidade da plataforma.",
    href: "/admin/configuracoes",
  },
  {
    title: "Minha Conta",
    description: "Atualizar cadastro, telefone, empresa e trocar senha.",
    href: "/minha-conta",
  },
];

export default async function AdminPage() {
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

  return (
    <main className="simple-page">
      <div className="container">
        <span className="badge">Painel Administrativo</span>
        <h1>Administração EQUATEC</h1>
        <p>
          Central de governança, usuários, auditoria, conteúdo, mídia e configurações da plataforma.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginTop: 28,
          }}
        >
          {adminCards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="card"
              style={{
                padding: 24,
                textDecoration: "none",
                display: "block",
              }}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="btn btn-primary">Acessar</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}