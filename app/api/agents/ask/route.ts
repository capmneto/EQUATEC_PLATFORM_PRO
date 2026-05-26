import { NextResponse } from "next/server";

import { executeAgent } from "@/lib/agents/executor";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const agentKey = body?.agentKey || "proposal";
    const question = body?.question || "";

    if (!question.trim()) {
      return NextResponse.json({
        success: false,
        error: "Pergunta não informada.",
      });
    }

    const result = await executeAgent({
      agentKey,
      question,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro interno no agente.",
    });
  }
}
