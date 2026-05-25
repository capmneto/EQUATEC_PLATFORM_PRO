import { NextResponse } from "next/server";

import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { buildBidDocument } from "@/lib/bid/document-builder";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = `
Gere uma análise executiva industrial estruturada.

CLIENTE:
${body?.cliente || "Não informado"}

ESCOPO:
${body?.escopo || "Não informado"}

DISCIPLINA:
${body?.disciplina || "Não informado"}

CRITICIDADE:
${body?.criticidade || "Não informado"}

PRAZO:
${body?.prazo || "Não informado"}

PREMISSAS:
${body?.premissas || "Não informado"}

RISCOS:
${body?.riscos || "Não informado"}

GERAR:
- resumo executivo;
- entendimento técnico;
- riscos;
- SSMA;
- estratégia;
- pontos críticos;
- premissas;
- RFI;
- recomendações;
- validações humanas.
`;

    const response = await generateGeminiCompletion({
      prompt,
      systemPrompt: SYSTEM_PROMPTS.bidEngineer,
      module: "BID_AI_V2",
      action: "EXPORT_ENGINE",
    });

    if (!response.success) {
      return NextResponse.json(response);
    }

    const document = buildBidDocument({
      cliente: body?.cliente || "",
      escopo: body?.escopo || "",
      disciplina: body?.disciplina || "",
      criticidade: body?.criticidade || "",
      prazo: body?.prazo || "",
      premissas: body?.premissas || "",
      riscos: body?.riscos || "",
      analiseIA: response.content || "",
    });

    return NextResponse.json({
      success: true,
      content: response.content,
      document,
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro interno no BID AI V2.",
    });
  }
}
