import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = [
  "/dashboard",
  "/admin",
  "/minha-conta",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/minha-conta/:path*"],
};