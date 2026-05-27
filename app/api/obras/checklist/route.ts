import { NextResponse } from "next/server";

import {
  createConstructionChecklistItem,
  listConstructionChecklist,
  toggleConstructionChecklistItem,
} from "@/lib/obras/checklist-db";

export async function GET() {
  try {
    const checklist = await listConstructionChecklist();

    return NextResponse.json({
      success: true,
      checklist,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao listar checklist da obra.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({
        success: false,
        error: "Título do checklist não informado.",
      });
    }

    const item = await createConstructionChecklistItem({
      projectId: body.projectId || null,
      phase: body.phase || null,
      title: body.title,
      notes: body.notes || null,
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao criar item do checklist.",
    });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body?.id) {
      return NextResponse.json({
        success: false,
        error: "ID do item não informado.",
      });
    }

    const result = await toggleConstructionChecklistItem(
      body.id,
      Boolean(body.completed),
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
          : "Erro ao atualizar checklist.",
    });
  }
}
