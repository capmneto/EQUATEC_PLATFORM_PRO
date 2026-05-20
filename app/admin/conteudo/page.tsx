import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const CONTENT_KEYS = [
  "home_title",
  "home_subtitle",
  "home_description",
  "about_text",
  "cta_text",
  "whatsapp",
  "email",
  "linkedin",
];

export default async function ConteudoPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (
    !currentUser ||
    (currentUser.role !== "SUPER_ADMIN" &&
      currentUser.role !== "ADMIN")
  ) {
    redirect("/dashboard");
  }

  const items = await prisma.siteContent.findMany({
    where: {
      key: {
        in: CONTENT_KEYS,
      },
    },
  });

  const contentMap = Object.fromEntries(
    items.map((item) => [item.key, item.value])
  );

  return (
    <main className="simple-page">
      <div className="container">
        <span className="badge">CMS Administrativo</span>
        <h1>Gestão de Conteúdo</h1>
        <p>
          Edite textos institucionais, contatos e chamadas comerciais do site.
        </p>

        <form
          action="/api/admin/content"
          method="post"
          className="card"
          style={{ padding: 24 }}
        >
          {CONTENT_KEYS.map((key) => (
            <div key={key} style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {key}
              </label>

              <textarea
                name={key}
                defaultValue={contentMap[key] ?? ""}
                rows={3}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                }}
              />
            </div>
          ))}

          <button className="btn btn-primary" type="submit">
            Salvar Conteúdo
          </button>
        </form>
      </div>
    </main>
  );
}