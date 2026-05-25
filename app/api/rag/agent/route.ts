import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { retrieveRelevantContext } from "@/lib/rag/retriever";
import { buildRagAgentPrompt } from "@/lib/rag-agent/prompt-builder";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const question = body?.question || "";

    if (!question.trim()) {
      return NextResponse.json({
        success: false,
        error: "Pergunta não informada.",
      });
    }

    const retrieval = await retrieveRelevantContext(question);

    const prompt = buildRagAgentPrompt({
      question,
      context: retrieval.context,
    });

    const response = await generateGeminiCompletion({
      prompt,
      module: "RAG_AGENT",
      action: "SPECIALIST_RESPONSE",
    });

    return NextResponse.json({
      success: response.success,
      answer: response.content,
      error: response.error,
      retrievedContexts: retrieval.results.length,
      retrieval,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro interno no RAG Agent.",
    });
  }
}
