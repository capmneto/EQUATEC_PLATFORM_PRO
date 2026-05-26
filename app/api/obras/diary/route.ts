import { NextResponse } from "next/server";

import {
  createConstructionDiary,
  listConstructionDiaries,
} from "@/lib/obras/diary-db";

export async function GET() {
  try {
    const diaries = await listConstructionDiaries();

    return NextResponse.json({
      success: true,
      diaries,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao listar diário de obra.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.description || typeof body.description !== "string") {
      return NextResponse.json({
        success: false,
        error: "Descrição do diário não informada.",
      });
    }

    const diary = await createConstructionDiary({
      projectId: body.projectId || null,
      title: body.title || null,
      description: body.description,
      weather: body.weather || null,
      teamSize: body.teamSize ? Number(body.teamSize) : null,
    });

    return NextResponse.json({
      success: true,
      diary,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao criar diário de obra.",
    });
  }
}
