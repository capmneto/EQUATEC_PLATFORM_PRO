import { generateGeminiCompletion } from "@/lib/ai/gemini";
import { retrieveRelevantContext } from "@/lib/rag/retriever";

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

  return {
    success: response.success,
    answer: response.content,
    error: response.error,
    agent,
    retrievedContexts: retrieval.results.length,
    retrieval,
  };
}
