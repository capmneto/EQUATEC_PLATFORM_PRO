export async function logAIEvent(data: {
  module?: string;
  action?: string;
  userId?: string;
  provider?: string;
  model?: string;
  success: boolean;
  error?: string;
}) {
  console.log("[EQUATEC_AI_LOG]", {
    timestamp: new Date().toISOString(),
    module: data.module || "unknown",
    action: data.action || "unknown",
    userId: data.userId || null,
    provider: data.provider || null,
    model: data.model || null,
    success: data.success,
    error: data.error || null,
  });
}
