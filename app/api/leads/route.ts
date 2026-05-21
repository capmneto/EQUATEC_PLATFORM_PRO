import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Nome e e-mail são obrigatórios.",
        },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: body?.phone ? String(body.phone).trim() : null,
        company: body?.company ? String(body.company).trim() : null,
        role: body?.role ? String(body.role).trim() : null,
        interest: body?.interest ? String(body.interest).trim() : null,
        message: body?.message ? String(body.message).trim() : null,
        source: body?.source ? String(body.source).trim() : "site",
        status: "NOVO",
        metadata: body?.metadata ?? undefined,
      },
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Erro ao criar lead:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno ao registrar lead.",
      },
      { status: 500 }
    );
  }
}