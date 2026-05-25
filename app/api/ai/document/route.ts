import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

import { buildDocumentAnalysisPrompt } from "@/lib/document-ai/prompt-builder";
import { extractTextFromFile } from "@/lib/document-ai/extractor";

import { createDocumentMemoryRecord } from "@/lib/document-memory/types";
import { saveDocumentMemoryRecord } from "@/lib/document-memory/store";

import { addVectorMemoryRecord } from "@/lib/vector-memory/store";

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

    const extractedContent = await extractTextFromFile(file);

    if (!extractedContent.trim()) {
      return NextResponse.json({
        success: false,
        error: "Não foi possível extrair texto do arquivo.",
      });
    }

    const prompt = buildDocumentAnalysisPrompt(extractedContent);

    const response = await generateGeminiCompletion({
      prompt,
      systemPrompt: SYSTEM_PROMPTS.documentAnalyst,
      module: "DOCUMENT_AI_V3",
      action: "DOCUMENT_ANALYSIS_WITH_MEMORY",
    });

    if (!response.success) {
      return NextResponse.json(response);
    }

    const memoryRecord = createDocumentMemoryRecord({
      title: file.name,
      source: "upload",
      module: "DOCUMENT_AI",
      content: extractedContent,
      summary: response.content || "",
    });

    await saveDocumentMemoryRecord(memoryRecord);

    const vectorRecord = await addVectorMemoryRecord({
      title: file.name,
      source: "upload",
      module: "DOCUMENT_AI",
      content: `${extractedContent}

ANÁLISE IA:
${response.content || ""}`,
    });

    return NextResponse.json({
      success: true,
      content: response.content,
      extractedContent,
      memoryRecord,
      vectorRecord,
    });
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
