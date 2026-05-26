import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { retrieveRelevantContext } from "@/lib/rag/retriever";
import { createAgentHistoryRecord } from "@/lib/agent-history/types";
import { saveAgentHistoryRecord } from "@/lib/agent-history/store";

import { getAgent } from "./registry";

export async function executeAgent(data: {
  agentKey: string;
  question: string;
}) {
  const agent = getAgent(data.agentKey);

  const retrieval = await retrieveRelevantContext(data.question);

  const prompt = `
AGENTE:
${agent.name}

DESCRIÇÃO:
${agent.description}

PERGUNTA:
${data.question}

CONTEXTO RECUPERADO DA MEMÓRIA:
${retrieval.context || "Nenhum contexto encontrado."}

INSTRUÇÕES:
- Use prioritariamente o contexto recuperado.
- Não invente dados.
- Informe lacunas e premissas.
- Estruture em formato executivo.
- Traga riscos, recomendações e próximos passos.
`;

  const response = await generateGeminiCompletion({
    prompt,
    systemPrompt: agent.systemPrompt,
    module: "AGENTS_FOUNDATION",
    action: agent.key,
  });

  const answer = response.content || "";

  if (response.success) {
    const history = createAgentHistoryRecord({
      agentKey: agent.key,
      question: data.question,
      answer,
      retrievedContexts: retrieval.results.length,
    });

    await saveAgentHistoryRecord(history);
  }

  return {
    success: response.success,
    answer,
    error: response.error,
    agent,
    retrievedContexts: retrieval.results.length,
    retrieval,
  };
}
