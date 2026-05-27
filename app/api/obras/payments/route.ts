import { NextResponse } from "next/server";

import {
  createConstructionPayment,
  listConstructionPayments,
  toggleConstructionPayment,
} from "@/lib/obras/payments-db";

export async function GET() {
  try {
    const payments = await listConstructionPayments();

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao listar pagamentos da obra.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({
        success: false,
        error: "Título do pagamento não informado.",
      });
    }

    const payment = await createConstructionPayment({
      projectId: body.projectId || null,
      title: body.title,
      amount: Number(body.amount || 0),
      dueDate: body.dueDate || null,
    });

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao criar pagamento.",
    });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body?.id) {
      return NextResponse.json({
        success: false,
        error: "ID do pagamento não informado.",
      });
    }

    const result = await toggleConstructionPayment(
      body.id,
      Boolean(body.paid),
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar pagamento.",
    });
  }
}
