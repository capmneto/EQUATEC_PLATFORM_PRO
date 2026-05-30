import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: {
      authorized: ({ token }) => {
        // Bypass de desenvolvimento — MESMA camada que protege as rotas
        if (
          process.env.NODE_ENV !== "production" &&
          process.env.LOCAL_DEV_BYPASS === "1"
        ) {
          return true;
        }
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/minha-conta/:path*"],
};
