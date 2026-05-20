import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      eventName = "page_view",
      path = "/",
      title,
      referrer,
      visitorId,
      source,
      metadata,
    } = body;

    // Criar ou localizar sessão do visitante
    let session = null;

    if (visitorId) {
      session = await prisma.visitorSession.findFirst({
        where: {
          visitorId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!session) {
        session = await prisma.visitorSession.create({
          data: {
            visitorId,
            referrer,
            source,
          },
        });
      }
    }

    // Registrar visualização de página
    if (eventName === "page_view") {
      await prisma.pageView.create({
        data: {
          sessionId: session?.id,
          path,
          title,
          referrer,
        },
      });
    }

    // Registrar evento
    await prisma.trackingEvent.create({
      data: {
        sessionId: session?.id,
        eventName,
        path,
        metadata,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Erro ao registrar tracking:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao registrar evento.",
      },
      {
        status: 500,
      }
    );
  }
}