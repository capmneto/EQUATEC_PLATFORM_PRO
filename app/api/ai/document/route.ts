import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { buildDocumentAnalysisPrompt } from "@/lib/document-ai/prompt-builder";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const content = body?.content || "";

    if (!content.trim()) {
      return NextResponse.json({
        success: false,
        error: "Conteúdo documental não informado.",
      });
    }

    const prompt = buildDocumentAnalysisPrompt(content);

    const response = await generateGeminiCompletion({
      prompt,
      systemPrompt: SYSTEM_PROMPTS.documentAnalyst,
      module: "DOCUMENT_AI",
      action: "DOCUMENT_ANALYSIS",
    });

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro interno no Document AI.",
    });
  }
}
