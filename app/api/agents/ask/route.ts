import { NextResponse } from "next/server";

import { executeAgent } from "@/lib/agents/executor";
import { extractTextFromFile } from "@/lib/document-ai/extractor";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const agentKey = String(formData.get("agentKey") || "proposal");
    const question = String(formData.get("question") || "");
    const file = formData.get("file");

    if (!question.trim()) {
      return NextResponse.json({
        success: false,
        error: "Pergunta não informada.",
      });
    }

    let finalQuestion = question;

    if (file instanceof File) {
      const extractedContent = await extractTextFromFile(file);

      finalQuestion = `
PERGUNTA DO USUÁRIO:
${question}

CONTEÚDO EXTRAÍDO DO DOCUMENTO ANEXADO:
${extractedContent}
`;
    }

    const result = await executeAgent({
      agentKey,
      question: finalQuestion,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro interno no agente com upload.",
    });
  }
}
