export const AI_CONFIG = {
  provider: "gemini",

  gemini: {
    model: "gemini-2.5-pro",
    temperature: 0.4,
    maxOutputTokens: 4096,
  },

  limits: {
    timeoutMs: 30000,
    retries: 2,
  },
} as const;
