export type AgentHistoryRecord = {
  id: string;
  agentKey: string;
  question: string;
  answer: string;
  retrievedContexts: number;
  createdAt: string;
};

export function createAgentHistoryRecord(data: {
  agentKey: string;
  question: string;
  answer: string;
  retrievedContexts: number;
}): AgentHistoryRecord {
  return {
    id: crypto.randomUUID(),
    agentKey: data.agentKey,
    question: data.question,
    answer: data.answer,
    retrievedContexts: data.retrievedContexts,
    createdAt: new Date().toISOString(),
  };
}
