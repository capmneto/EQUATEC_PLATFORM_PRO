import { NextResponse } from "next/server";

import {
  createConstructionProject,
  listConstructionProjects,
} from "@/lib/obras/projects-db";

export async function GET() {
  try {
    const projects = await listConstructionProjects();

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao listar obras.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || typeof body.name !== "string") {
      return NextResponse.json({
        success: false,
        error: "Nome da obra não informado.",
      });
    }

    const project = await createConstructionProject({
      name: body.name,
      client: body.client,
      location: body.location,
      status: body.status,
      physicalProgress: Number(body.physicalProgress || 0),
      financialProgress: Number(body.financialProgress || 0),
      budgetEstimated: Number(body.budgetEstimated || 0),
      budgetExecuted: Number(body.budgetExecuted || 0),
      responsible: body.responsible,
      description: body.description,
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao criar obra.",
    });
  }
}
