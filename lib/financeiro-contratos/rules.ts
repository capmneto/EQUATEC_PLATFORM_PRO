import type { ParsedFinancialFile } from "@/lib/financeiro-contratos/parser";

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

type SavedFinancialFile = {
  label?: string;
  originalName?: string;
  fileUrl?: string;
  type?: string;
  parsed?: ParsedFinancialFile | null;
  parseError?: string;
};

function money(value: number) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function summarizeParsedFiles(files: SavedFinancialFile[]) {
  return files.map((file) => {
    const parsed = file.parsed;

    if (!parsed) {
      return {
        label: file.label,
        originalName: file.originalName,
        fileUrl: file.fileUrl,
        classification: "NAO_PROCESSADO",
        parseError: file.parseError || null,
      };
    }

    return {
      label: parsed.label,
      originalName: parsed.originalName,
      fileUrl: file.fileUrl,
      classification: parsed.classification,
      sheetNames: parsed.sheetNames,
      detectedBases: parsed.detectedBases,
      warnings: parsed.warnings,
      totalRows: parsed.totalRows,
      detectedValueTotal: parsed.detectedValueTotal,
      sheets: parsed.sheets.map((sheet) => ({
        sheetName: sheet.sheetName,
        rowCount: sheet.rowCount,
        headerRowIndex: sheet.headerRowIndex,
        detectedColumns: sheet.detectedColumns,
        detectedValueTotal: sheet.detectedValueTotal,
        headers: sheet.headers.slice(0, 40),
        normalizedPreview: sheet.normalizedPreview,
      })),
    };
  });
}

function getDetectedClassifications(files: SavedFinancialFile[]) {
  return [
    ...new Set(
      files.map((file) => file.parsed?.classification).filter(Boolean),
    ),
  ];
}

function getColumnCoverage(files: SavedFinancialFile[]) {
  const coverage = {
    pec: false,
    conta: false,
    contaSup: false,
    fornecedor: false,
    rol: false,
    verbaPagamento: false,
    valor: false,
    receita: false,
    salario: false,
    pessoal: false,
    data: false,
    centroResultado: false,
  };

  for (const file of files) {
    for (const sheet of file.parsed?.sheets || []) {
      Object.entries(sheet.detectedColumns).forEach(([key, value]) => {
        if (value && key in coverage) {
          coverage[key as keyof typeof coverage] = true;
        }
      });
    }
  }

  return coverage;
}

export function generateFinancialContractResult(
  payload: RulePayload,
  files: SavedFinancialFile[],
) {
  const revenue = Number(payload.revenue || 0);
  const laborCost = Number(payload.laborCost || 0);
  const dissidioPercent = Number(payload.dissidioPercent || 0);
  const contractAdjustmentPercent = Number(payload.contractAdjustmentPercent || 0);

  const tax32201 = revenue * 0.0875;
  const laborProvision = laborCost * 0.2625;
  const dissidioImpact = laborCost * (dissidioPercent / 100);
  const adjustedRevenue = revenue * (1 + contractAdjustmentPercent / 100);

  const parsedSummary = summarizeParsedFiles(files);
  const detectedClassifications = getDetectedClassifications(files);
  const columnCoverage = getColumnCoverage(files);
  const totalRowsRead = files.reduce(
    (sum, file) => sum + Number(file.parsed?.totalRows || 0),
    0,
  );
  const detectedValueTotal = files.reduce(
    (sum, file) => sum + Number(file.parsed?.detectedValueTotal || 0),
    0,
  );

  const baseRules = [
    "32201 TOTAL = 8,75% da receita total por PEC.",
    "Provisões Trabalhistas ausentes = 26,25% dos custos lançados em PESSOAL.",
    "PREMIOS, Assistência Médica e Assistência Odontológica podem ser estimados por média móvel, correlação com salário ou SALÁRIO/ROL.",
    "Movimentação Operacional é lançamento manual previsto para o dia 30.",
    "Contas iniciadas com CR devem ser tratadas como créditos positivos.",
    "Juros por atraso do cliente devem usar média dos últimos 3 meses ou padrão histórico.",
    "Depreciações gerenciais devem repetir o valor do mês anterior quando estiverem reduzindo ao longo do tempo.",
  ];

  const dataIntelligence = {
    detectedClassifications,
    columnCoverage,
    totalRowsRead,
    detectedValueTotal,
    detectedValueTotalFormatted: money(detectedValueTotal),
    parsedFiles: parsedSummary,
    nextEngineActions: [
      "Normalizar valores monetários por tipo de base.",
      "Agrupar histórico por PEC / Conta / Conta Sup.",
      "Agrupar detalhamento por PEC / Conta / Conta Sup / Fornecedor.",
      "Agrupar folha/pessoal por PEC / Conta / Verba de Pagamento.",
      "Criar tabela comparativa entre precificação original, histórico e realizado.",
      "Aplicar regras de provisão, lacunas, divergências e rastreabilidade por origem.",
      "Gerar resultado consolidado por PEC e análise executiva.",
    ],
  };

  if (payload.jobModule === "diagnostico") {
    return {
      title: "Diagnóstico do Contrato",
      executiveSummary: [
        "Arquivos recebidos, classificados e lidos estruturalmente para formação da base de diagnóstico contratual.",
        "O objetivo é cruzar precificação original, histórico, detalhamento por fornecedor e dados de folha/pessoal.",
        "A análise deve respeitar a visão separada por PEC ou estudo de custo.",
      ],
      checks: [
        "Identificar estrutura original de precificação.",
        "Extrair limites macro por grupo de custo e limites micro por conta contábil.",
        "Cruzar histórico por PEC / Conta / Conta Sup.",
        "Cruzar detalhamento por PEC / Conta / Conta Sup / Fornecedor.",
        "Comparar comportamento das contas frente à receita.",
        "Localizar fornecedor com crescimento/redução relevante.",
        "Sinalizar possível conta contábil incorreta.",
      ],
      dataIntelligence,
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
        "Quando não houver dado preciso, o sistema deve utilizar histórico, detalhamento por fornecedor e dados de folha/pessoal.",
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
        "Abrir macro da precificação em contas contábeis propostas.",
        "Aplicar dissídio nos itens de folha.",
        "Aplicar reajuste contratual na receita a partir da data informada.",
        "Separar análise por PEC ou estudo de custo.",
        "Usar histórico para comportamento mensal por conta.",
        "Usar detalhamento para fornecedor e conta contábil.",
        "Usar folha/pessoal para verba de pagamento e benefícios.",
      ],
      dataIntelligence,
      filesReceived: files,
      rules: baseRules,
    };
  }

  return {
    title: "Provisão de Resultado Mensal",
    executiveSummary: [
      "Módulo preparado para calcular provisão mensal de Resultado e EBITDA com rastreabilidade.",
      "As planilhas mensais alimentam custos oficiais, estimados e editados.",
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
    dataIntelligence,
    filesReceived: files,
    rules: baseRules,
  };
}
