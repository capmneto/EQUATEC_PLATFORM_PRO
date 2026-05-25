export function buildDocumentAnalysisPrompt(content: string) {
  return `
Você é um especialista em análise documental industrial.

Analise o documento abaixo e extraia:

1. Resumo executivo.
2. Objetivo do documento.
3. Escopo identificado.
4. Disciplinas envolvidas.
5. Riscos técnicos.
6. Riscos SSMA.
7. Premissas identificadas.
8. Pontos obscuros ou lacunas.
9. Perguntas para RFI.
10. Necessidades de validação humana.
11. Possíveis impactos comerciais.
12. Complexidade operacional.
13. Criticidade operacional.
14. Recomendações executivas.

DOCUMENTO:
${content}
`;
}
