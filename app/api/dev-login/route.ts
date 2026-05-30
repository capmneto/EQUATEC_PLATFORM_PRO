import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");
    const callbackUrl = String(body?.callbackUrl || "/admin");

    const localEmail = process.env.LOCAL_DEV_ADMIN_EMAIL?.trim().toLowerCase();
    const localPassword = process.env.LOCAL_DEV_ADMIN_PASSWORD;

    if (
      process.env.NODE_ENV !== "production" &&
      localEmail &&
      localPassword &&
      email === localEmail &&
      password === localPassword
    ) {
      const response = NextResponse.json({
        success: true,
        redirectTo: callbackUrl,
        user: {
          id: "local-dev-super-admin",
          name: "Carlos Machado",
          email: localEmail,
          role: "SUPER_ADMIN",
          status: "APPROVED",
        },
      });

      response.cookies.set("equatec-local-dev-session", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 12,
      });

      response.cookies.set("equatec-local-dev-email", localEmail, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 12,
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        error: "E-mail ou senha inválidos para o acesso local.",
      },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao processar login local.",
      },
      { status: 500 },
    );
  }
}
