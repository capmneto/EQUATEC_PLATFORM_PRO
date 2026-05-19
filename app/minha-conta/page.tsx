import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MinhaContaPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="simple-page">
      <div className="container">
        <span className="badge">Segurança e Conta</span>
        <h1>Minha Conta</h1>
        <p>
          Atualize seus dados cadastrais e altere sua senha com registro de auditoria.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
          <form className="card" action="/api/account/update" method="post" style={{ padding: 24 }}>
            <h2>Dados cadastrais</h2>
            <label>Nome</label>
            <input name="name" defaultValue={user.name ?? ""} />

            <label>Empresa</label>
            <input name="company" defaultValue={user.company ?? ""} />

            <label>Telefone</label>
            <input name="phone" defaultValue={user.phone ?? ""} />

            <p>E-mail: {user.email}</p>
            <p>Perfil: {user.role}</p>
            <p>Status: {user.approved ? "Aprovado" : "Pendente"}</p>

            <button className="btn btn-primary" type="submit">
              Salvar dados
            </button>
          </form>

          <form className="card" action="/api/account/change-password" method="post" style={{ padding: 24 }}>
            <h2>Trocar senha</h2>
            <label>Senha atual</label>
            <input name="currentPassword" type="password" />

            <label>Nova senha</label>
            <input name="newPassword" type="password" />

            <label>Confirmar nova senha</label>
            <input name="confirmPassword" type="password" />

            <button className="btn btn-primary" type="submit">
              Alterar senha
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
