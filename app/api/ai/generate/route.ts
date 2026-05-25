import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = body?.prompt;
    const persona = body?.persona;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({
        success: false,
        error: "Prompt não informado.",
      });
    }

    const systemPrompt =
      SYSTEM_PROMPTS[persona as keyof typeof SYSTEM_PROMPTS] || "";

    const response = await generateGeminiCompletion({
      prompt,
      systemPrompt,
      module: "AI_PLAYGROUND",
      action: "GENERATE",
    });

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro interno da IA.",
    });
  }
}
