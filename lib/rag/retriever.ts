import { searchVectorMemory } from "@/lib/vector-memory/store";

export async function retrieveRelevantContext(query: string) {
  const results = await searchVectorMemory(query, 5);

  if (!results.length) {
    return {
      context: "",
      results: [],
    };
  }

  const context = results
    .map((item, index) => {
      return `
[MEMÓRIA ${index + 1}]
Título: ${item.title}
Módulo: ${item.module}
Score: ${item.score.toFixed(4)}

Conteúdo:
${item.content}
`;
    })
    .join("\n\n");

  return {
    context,
    results,
  };
}
