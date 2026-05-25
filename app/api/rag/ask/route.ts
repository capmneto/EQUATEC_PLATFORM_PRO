import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

import { retrieveRelevantContext } from "@/lib/rag/retriever";

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

    const prompt = `
Você é um especialista em engenharia industrial,
gestão operacional, SSMA e contratos industriais.

PERGUNTA:
${question}

CONTEXTO RECUPERADO DA MEMÓRIA CORPORATIVA:
${retrieval.context || "Nenhum contexto encontrado."}

INSTRUÇÕES:
- Utilize prioritariamente o contexto recuperado;
- Não invente informações;
- Informe quando algo não estiver claro;
- Estruture tecnicamente;
- Seja executivo e operacional;
- Relacione riscos, SSMA, operação e gestão;
- Destaque premissas importantes.
`;

    const response = await generateGeminiCompletion({
      prompt,
      systemPrompt: SYSTEM_PROMPTS.documentAnalyst,
      module: "RAG_FOUNDATION",
      action: "CONTEXTUAL_RESPONSE",
    });

    return NextResponse.json({
      success: true,
      question,
      retrievedContexts: retrieval.results.length,
      retrieval,
      answer: response.content,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro interno RAG.",
    });
  }
}
