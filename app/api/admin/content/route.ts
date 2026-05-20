import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Não autenticado." },
      { status: 401 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (
    !currentUser ||
    (currentUser.role !== "SUPER_ADMIN" &&
      currentUser.role !== "ADMIN")
  ) {
    return NextResponse.json(
      { error: "Acesso negado." },
      { status: 403 }
    );
  }

  const formData = await req.formData();

  const entries = Array.from(formData.entries());

  for (const [key, rawValue] of entries) {
    const value = String(rawValue ?? "");

    const existing = await prisma.siteContent.findUnique({
      where: { key },
    });

    const previousValue = existing?.value ?? null;

    await prisma.siteContent.upsert({
      where: { key },
      update: {
        value,
        updatedById: currentUser.id,
      },
      create: {
        key,
        value,
        updatedById: currentUser.id,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: currentUser.id,
        action: "SITE_CONTENT_UPDATED",
        entityType: "SiteContent",
        entityId: key,
        oldValue: previousValue
          ? JSON.parse(JSON.stringify(previousValue))
          : undefined,
        newValue: JSON.parse(JSON.stringify(value)),
        metadata: {
          key,
        },
      },
    });
  }

  return NextResponse.redirect(
    new URL("/admin/conteudo", req.url)
  );
}