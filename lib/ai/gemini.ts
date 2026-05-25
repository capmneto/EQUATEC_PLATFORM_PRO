import { AI_CONFIG } from "./config";
import { logAIEvent } from "./logger";
import type {
  AICompletionRequest,
  AICompletionResponse,
} from "./types";

export async function generateGeminiCompletion(
  data: AICompletionRequest,
): Promise<AICompletionResponse> {
  const provider = "gemini";
  const model = AI_CONFIG.gemini.model;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const error = "GEMINI_API_KEY não configurada.";

      await logAIEvent({
        module: data.module,
        action: data.action,
        userId: data.userId,
        provider,
        model,
        success: false,
        error,
      });

      return {
        success: false,
        error,
        provider,
        model,
      };
    }

    const finalPrompt = `
${data.systemPrompt || ""}

${data.prompt}
`.trim();

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, AI_CONFIG.limits.timeoutMs);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        signal: controller.signal,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: finalPrompt,
                },
              ],
            },
          ],

          generationConfig: {
            temperature:
              data.temperature ??
              AI_CONFIG.gemini.temperature,

            maxOutputTokens:
              AI_CONFIG.gemini.maxOutputTokens,
          },
        }),
      },
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const error = `Erro Gemini HTTP ${response.status}`;

      await logAIEvent({
        module: data.module,
        action: data.action,
        userId: data.userId,
        provider,
        model,
        success: false,
        error,
      });

      return {
        success: false,
        error,
        provider,
        model,
      };
    }

    const json = await response.json();

    const content =
      json?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      const error = "Resposta vazia da IA.";

      await logAIEvent({
        module: data.module,
        action: data.action,
        userId: data.userId,
        provider,
        model,
        success: false,
        error,
      });

      return {
        success: false,
        error,
        provider,
        model,
      };
    }

    await logAIEvent({
      module: data.module,
      action: data.action,
      userId: data.userId,
      provider,
      model,
      success: true,
    });

    return {
      success: true,
      content,
      provider,
      model,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido na IA.";

    await logAIEvent({
      module: data.module,
      action: data.action,
      userId: data.userId,
      provider,
      model,
      success: false,
      error: message,
    });

    return {
      success: false,
      error: message,
      provider,
      model,
    };
  }
}
