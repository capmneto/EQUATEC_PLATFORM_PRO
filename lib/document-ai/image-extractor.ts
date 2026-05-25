import { AI_CONFIG } from "@/lib/ai/config";

export async function extractTextFromImageWithGemini(file: File) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.gemini.model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
Extraia todo o texto visível desta imagem.
Depois organize em texto limpo, mantendo títulos, tópicos, tabelas simples e informações técnicas.
Não invente dados. Se algo estiver ilegível, informe como [ilegível].
`,
              },
              {
                inline_data: {
                  mime_type: file.type,
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: AI_CONFIG.gemini.maxOutputTokens,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro Gemini Vision HTTP ${response.status}`);
  }

  const json = await response.json();

  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("OCR da imagem retornou vazio.");
  }

  return text;
}
