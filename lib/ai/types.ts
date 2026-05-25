export type AIProvider = "gemini" | "openai" | "claude";

export interface AICompletionRequest {
  prompt: string;
  systemPrompt?: string;
  module?: string;
  action?: string;
  userId?: string;
  temperature?: number;
}

export interface AICompletionResponse {
  success: boolean;
  content?: string;
  error?: string;
  provider?: AIProvider;
  model?: string;
}
