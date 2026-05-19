import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Rotas públicas
  const publicRoutes = [
    "/",
    "/login",
    "/cadastro",
    "/sobre",
    "/contato",
    "/cursos",
    "/franquias",
    "/ia",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Usuário não autenticado
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Usuário autenticado, mas não aprovado
  if (req.auth?.user && !(req.auth.user as any).approved) {
    return NextResponse.redirect(
      new URL("/cadastro?status=aguardando-aprovacao", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/modulos/:path*",
    "/automacoes/:path*",
    "/hub-bonus/:path*",
    "/obras/:path*",
  ],
};