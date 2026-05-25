export function buildBidDocument(data: {
  cliente: string;
  escopo: string;
  disciplina: string;
  criticidade: string;
  prazo: string;
  premissas: string;
  riscos: string;
  analiseIA: string;
}) {
  return `
# PROPOSTA TÉCNICA PRELIMINAR

## CLIENTE
${data.cliente || "Não informado"}

---

## DISCIPLINA
${data.disciplina || "Não informado"}

---

## CRITICIDADE
${data.criticidade || "Não informado"}

---

## PRAZO / VIGÊNCIA
${data.prazo || "Não informado"}

---

# 1. ESCOPO DA OPORTUNIDADE

${data.escopo || "Não informado"}

---

# 2. PREMISSAS ADOTADAS

${data.premissas || "Não informado"}

---

# 3. RISCOS IDENTIFICADOS

${data.riscos || "Não informado"}

---

# 4. ANÁLISE EXECUTIVA IA

${data.analiseIA || "Sem análise"}

---

# 5. CONSIDERAÇÕES GERAIS

Este documento representa uma estrutura preliminar automatizada
gerada pelo BID AI ENGINE do EQUATEC.

Todas as informações devem passar por:
- validação técnica;
- validação comercial;
- validação SSMA;
- aprovação gerencial.

---

EQUATEC CONSULTORIA E SERVIÇOS ESPECIALIZADOS
IA aplicada à operação industrial e gestão integrada.
`;
}
