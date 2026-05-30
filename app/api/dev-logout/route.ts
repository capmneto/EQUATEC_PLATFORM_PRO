import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("equatec-local-dev-session", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("equatec-local-dev-email", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
