import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

import { buildDocumentAnalysisPrompt } from "@/lib/document-ai/prompt-builder";
import { extractTextFromFile } from "@/lib/document-ai/extractor";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({
        success: false,
        error: "Arquivo não enviado.",
      });
    }

    const content = await extractTextFromFile(file);

    const prompt =
      buildDocumentAnalysisPrompt(content);

    const response = await generateGeminiCompletion({
      prompt,
      systemPrompt: SYSTEM_PROMPTS.documentAnalyst,
      module: "DOCUMENT_AI_V2",
      action: "REAL_FILE_ANALYSIS",
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro interno documental.",
    });
  }
}
