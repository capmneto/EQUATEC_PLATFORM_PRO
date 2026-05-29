type RulePayload = {
  jobModule: string;
  title?: string;
  pec?: string;
  period?: string;
  revenue?: number;
  laborCost?: number;
  dissidioPercent?: number;
  database?: string;
  contractAdjustmentPercent?: number;
  contractAdjustmentDate?: string;
  budgetValidity?: string;
};

function money(value: number) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function generateFinancialContractResult(payload: RulePayload, files: unknown[]) {
  const revenue = Number(payload.revenue || 0);
  const laborCost = Number(payload.laborCost || 0);
  const dissidioPercent = Number(payload.dissidioPercent || 0);
  const contractAdjustmentPercent = Number(payload.contractAdjustmentPercent || 0);

  const tax32201 = revenue * 0.0875;
  const laborProvision = laborCost * 0.2625;
  const dissidioImpact = laborCost * (dissidioPercent / 100);
  const adjustedRevenue = revenue * (1 + contractAdjustmentPercent / 100);

  const baseRules = [
    "32201 TOTAL = 8,75% da receita total por PEC.",
    "Provisões Trabalhistas ausentes = 26,25% dos custos lançados em PESSOAL.",
    "PREMIOS, Assistência Médica e Assistência Odontológica podem ser estimados por média móvel, correlação com salário ou SALÁRIO/ROL.",
    "Movimentação Operacional é lançamento manual previsto para o dia 30.",
    "Contas iniciadas com CR devem ser tratadas como créditos positivos.",
    "Juros por atraso do cliente devem usar média dos últimos 3 meses ou padrão histórico.",
    "Depreciações gerenciais devem repetir o valor do mês anterior quando estiverem reduzindo ao longo do tempo.",
  ];

  if (payload.jobModule === "diagnostico") {
    return {
      title: "Diagnóstico do Contrato",
      executiveSummary: [
        "Arquivos recebidos para formação da base de diagnóstico contratual.",
        "O objetivo é cruzar a precificação original com 7.5, 9.1 e 8.2.1 para identificar limites, estouros, desvios e lançamentos suspeitos.",
        "A análise deve respeitar a visão separada por PEC ou estudo de custo.",
      ],
      checks: [
        "Identificar estrutura original: PEC, DFP Horizontal, DFP Vertical ou Planilha de Preços Unitários.",
        "Extrair limites macro por grupo de custo e limites micro por conta contábil.",
        "Cruzar 7.5 configurado como PEC / CONTA / CONTA SUP.",
        "Cruzar 9.1 configurado como PEC / CONTA / CONTA SUP / FORNECEDOR.",
        "Comparar comportamento das contas frente à receita.",
        "Localizar fornecedor com crescimento/redução relevante.",
        "Sinalizar possível conta contábil incorreta, como táxi em transporte fretado.",
      ],
      filesReceived: files,
      rules: baseRules,
    };
  }

  if (payload.jobModule === "revisao") {
    return {
      title: "Revisão de Orçamento Contratual",
      executiveSummary: [
        "Módulo preparado para transformar valores macro da precificação em orçamento micro por conta contábil.",
        "Os campos de dissídio, database, reajuste contratual e data de aplicação foram capturados para compor a revisão.",
        "Quando não houver dado preciso, deve-se utilizar histórico 7.5, 9.1 e 8.2.1, sempre por PEC ou estudo de custo separado.",
      ],
      calculatedReferences: {
        laborCostBase: money(laborCost),
        dissidioPercent,
        dissidioImpact: money(dissidioImpact),
        revenueBase: money(revenue),
        contractAdjustmentPercent,
        adjustedRevenue: money(adjustedRevenue),
        database: payload.database || "não informada",
        contractAdjustmentDate: payload.contractAdjustmentDate || "não informada",
        budgetValidity: payload.budgetValidity || "não informada",
      },
      checks: [
        "Abrir macro da PEC/DFP/PPU em contas contábeis propostas.",
        "Aplicar dissídio nos itens de folha.",
        "Aplicar reajuste contratual na receita a partir da data informada.",
        "Separar análise por PEC ou estudo de custo.",
        "Usar 7.5 para histórico mensal por conta.",
        "Usar 9.1 para fornecedor e conta contábil.",
        "Usar 8.2.1 para verba de pagamento e comportamento de folha/benefícios.",
      ],
      filesReceived: files,
      rules: baseRules,
    };
  }

  return {
    title: "Provisão de Resultado Mensal",
    executiveSummary: [
      "Módulo preparado para calcular provisão mensal de resultado e EBITDA com rastreabilidade.",
      "As planilhas mensais devem alimentar custos oficiais, estimados e editados.",
      "O fechamento mensal deve registrar desvio entre provisão e realizado para aprendizado futuro.",
    ],
    calculatedReferences: {
      revenue,
      revenueFormatted: money(revenue),
      account32201Total: money(tax32201),
      laborCost,
      laborCostFormatted: money(laborCost),
      laborProvision: money(laborProvision),
      estimatedCostBeforeOtherAccounts: money(tax32201 + laborProvision),
      preliminaryResultOnlyKnownRules: money(revenue - tax32201 - laborProvision),
    },
    traceabilityStates: [
      { state: "OFICIAL", meaning: "Dado lançado/fonte oficial", color: "neutro" },
      { state: "ESTIMADO", meaning: "Dado calculado por regra, média móvel ou IA", color: "âmbar" },
      { state: "EDITADO", meaning: "Valor fixado manualmente pelo usuário", color: "azul" },
    ],
    filesReceived: files,
    rules: baseRules,
  };
}
