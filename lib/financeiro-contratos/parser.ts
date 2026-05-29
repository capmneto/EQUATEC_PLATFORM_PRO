import * as XLSX from "xlsx";

export type FinancialFileClassification =
  | "BASE_PRECIFICACAO"
  | "HISTORICO_7_5"
  | "DETALHE_9_1"
  | "FOLHA_8_2_1"
  | "PROVISAO_MENSAL"
  | "DOCUMENTO_PDF"
  | "DESCONHECIDO";

export type DetectedColumnMap = {
  pec?: string;
  conta?: string;
  contaSup?: string;
  fornecedor?: string;
  rol?: string;
  verbaPagamento?: string;
  valor?: string;
  receita?: string;
  salario?: string;
  pessoal?: string;
};

export type ParsedSheetSummary = {
  sheetName: string;
  rowCount: number;
  headerRowIndex: number;
  headers: string[];
  detectedColumns: DetectedColumnMap;
  preview: Record<string, string>[];
};

export type ParsedFinancialFile = {
  label: string;
  originalName: string;
  classification: FinancialFileClassification;
  sheetNames: string[];
  sheets: ParsedSheetSummary[];
  warnings: string[];
  detectedBases: string[];
};

function normalizeText(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function compactText(value: unknown) {
  return normalizeText(value).replace(/[^A-Z0-9]/g, "");
}

function classifyFile(label: string, fileName: string, mimeType?: string): FinancialFileClassification {
  const source = `${label} ${fileName}`.toUpperCase();
  const compact = compactText(source);

  if (mimeType?.includes("pdf") || compact.includes("PDF")) {
    return "DOCUMENTO_PDF";
  }

  if (
    compact.includes("75") ||
    source.includes("7.5") ||
    source.includes("PLANILHA 7.5") ||
    source.includes("HISTÓRICO 7.5") ||
    source.includes("HISTORICO 7.5")
  ) {
    return "HISTORICO_7_5";
  }

  if (
    compact.includes("91") ||
    source.includes("9.1") ||
    source.includes("PLANILHA 9.1")
  ) {
    return "DETALHE_9_1";
  }

  if (
    compact.includes("821") ||
    source.includes("8.2.1") ||
    source.includes("FOLHA") ||
    source.includes("PESSOAL") ||
    source.includes("VERBA DE PAGAMENTO")
  ) {
    return "FOLHA_8_2_1";
  }

  if (
    source.includes("PROVISÃO") ||
    source.includes("PROVISAO") ||
    source.includes("RESULTADO MENSAL")
  ) {
    return "PROVISAO_MENSAL";
  }

  if (
    source.includes("PEC") ||
    source.includes("DFP") ||
    source.includes("PPU") ||
    source.includes("PREÇOS UNITÁRIOS") ||
    source.includes("PRECOS UNITARIOS") ||
    source.includes("PRECIFICAÇÃO") ||
    source.includes("PRECIFICACAO")
  ) {
    return "BASE_PRECIFICACAO";
  }

  return "DESCONHECIDO";
}

function isLikelyHeaderRow(row: unknown[]) {
  const normalized = row.map(normalizeText).join(" | ");
  const hits = [
    "PEC",
    "CONTA",
    "CONTA SUP",
    "FORNECEDOR",
    "ROL",
    "VERBA",
    "VALOR",
    "TOTAL",
    "RECEITA",
    "SALARIO",
    "SALÁRIO",
    "PESSOAL",
  ].filter((term) => normalized.includes(normalizeText(term)));

  const nonEmpty = row.filter((cell) => String(cell ?? "").trim()).length;

  return hits.length >= 2 || (hits.length >= 1 && nonEmpty >= 4);
}

function detectHeaderRow(rows: unknown[][]) {
  const limit = Math.min(rows.length, 25);

  for (let index = 0; index < limit; index += 1) {
    if (isLikelyHeaderRow(rows[index] || [])) {
      return index;
    }
  }

  return 0;
}

function detectColumns(headers: string[]): DetectedColumnMap {
  const map: DetectedColumnMap = {};

  for (const header of headers) {
    const normalized = normalizeText(header);
    const compact = compactText(header);

    if (!map.pec && (normalized === "PEC" || normalized.includes("PEC"))) {
      map.pec = header;
    }

    if (
      !map.contaSup &&
      (
        normalized.includes("CONTA SUP") ||
        normalized.includes("CONTA SUPERIOR") ||
        compact.includes("CONTASUP")
      )
    ) {
      map.contaSup = header;
    }

    if (
      !map.conta &&
      (
        normalized === "CONTA" ||
        normalized.includes("CONTA CONTABIL") ||
        normalized.includes("CONTA CONTÁBIL")
      ) &&
      !normalized.includes("SUP")
    ) {
      map.conta = header;
    }

    if (!map.fornecedor && normalized.includes("FORNECEDOR")) {
      map.fornecedor = header;
    }

    if (!map.rol && (normalized === "ROL" || normalized.includes("ROL"))) {
      map.rol = header;
    }

    if (
      !map.verbaPagamento &&
      (
        normalized.includes("VERBA") ||
        normalized.includes("PAGAMENTO")
      )
    ) {
      map.verbaPagamento = header;
    }

    if (
      !map.receita &&
      (
        normalized.includes("RECEITA") ||
        normalized.includes("FATURAMENTO")
      )
    ) {
      map.receita = header;
    }

    if (
      !map.salario &&
      (
        normalized.includes("SALARIO") ||
        normalized.includes("SALÁRIO")
      )
    ) {
      map.salario = header;
    }

    if (!map.pessoal && normalized.includes("PESSOAL")) {
      map.pessoal = header;
    }

    if (
      !map.valor &&
      (
        normalized === "VALOR" ||
        normalized.includes("VALOR") ||
        normalized.includes("TOTAL") ||
        normalized.includes("MONTANTE")
      )
    ) {
      map.valor = header;
    }
  }

  return map;
}

function buildPreview(
  rows: unknown[][],
  headerRowIndex: number,
  headers: string[],
) {
  const previewRows = rows.slice(headerRowIndex + 1, headerRowIndex + 6);

  return previewRows.map((row) => {
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      const cleanHeader = header || `COLUNA_${index + 1}`;
      const value = row[index];

      record[cleanHeader] = String(value ?? "");
    });

    return record;
  });
}

function detectBasesFromColumns(
  classification: FinancialFileClassification,
  columns: DetectedColumnMap,
) {
  const bases: string[] = [];

  if (classification === "HISTORICO_7_5") {
    bases.push("Base histórica 7.5");
  }

  if (classification === "DETALHE_9_1") {
    bases.push("Base detalhada 9.1");
  }

  if (classification === "FOLHA_8_2_1") {
    bases.push("Base folha/pessoal 8.2.1");
  }

  if (classification === "BASE_PRECIFICACAO") {
    bases.push("Base de precificação contratual");
  }

  if (classification === "PROVISAO_MENSAL") {
    bases.push("Planilha de provisão mensal");
  }

  if (columns.pec) {
    bases.push("Dimensão PEC detectada");
  }

  if (columns.conta) {
    bases.push("Dimensão Conta Contábil detectada");
  }

  if (columns.contaSup) {
    bases.push("Dimensão Conta Sup detectada");
  }

  if (columns.fornecedor) {
    bases.push("Dimensão Fornecedor detectada");
  }

  if (columns.verbaPagamento) {
    bases.push("Dimensão Verba de Pagamento detectada");
  }

  return [...new Set(bases)];
}

function buildWarnings(
  classification: FinancialFileClassification,
  sheetSummaries: ParsedSheetSummary[],
) {
  const warnings: string[] = [];

  const allColumns = sheetSummaries.reduce<DetectedColumnMap>((acc, sheet) => {
    return { ...acc, ...sheet.detectedColumns };
  }, {});

  if (classification === "HISTORICO_7_5") {
    if (!allColumns.pec) warnings.push("7.5 sem coluna PEC detectada automaticamente.");
    if (!allColumns.conta) warnings.push("7.5 sem coluna CONTA detectada automaticamente.");
    if (!allColumns.contaSup) warnings.push("7.5 sem coluna CONTA SUP detectada automaticamente.");
  }

  if (classification === "DETALHE_9_1") {
    if (!allColumns.pec) warnings.push("9.1 sem coluna PEC detectada automaticamente.");
    if (!allColumns.conta) warnings.push("9.1 sem coluna CONTA detectada automaticamente.");
    if (!allColumns.contaSup) warnings.push("9.1 sem coluna CONTA SUP detectada automaticamente.");
    if (!allColumns.fornecedor) warnings.push("9.1 sem coluna FORNECEDOR detectada automaticamente.");
  }

  if (classification === "FOLHA_8_2_1") {
    if (!allColumns.pec) warnings.push("8.2.1 sem coluna PEC detectada automaticamente.");
    if (!allColumns.conta) warnings.push("8.2.1 sem coluna CONTA CONTÁBIL detectada automaticamente.");
    if (!allColumns.verbaPagamento) warnings.push("8.2.1 sem coluna VERBA DE PAGAMENTO detectada automaticamente.");
  }

  if (!sheetSummaries.length && classification !== "DOCUMENTO_PDF") {
    warnings.push("Nenhuma aba útil foi lida no arquivo.");
  }

  return warnings;
}

export async function parseFinancialContractFile(
  file: File,
  label: string,
): Promise<ParsedFinancialFile> {
  const classification = classifyFile(label, file.name, file.type);

  if (classification === "DOCUMENTO_PDF") {
    return {
      label,
      originalName: file.name,
      classification,
      sheetNames: [],
      sheets: [],
      warnings: ["PDF recebido. A leitura estruturada será tratada por OCR/Document AI em etapa posterior."],
      detectedBases: ["Documento PDF"],
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const workbook = XLSX.read(buffer, {
    type: "buffer",
    cellDates: true,
    raw: false,
  });

  const sheets = workbook.SheetNames.slice(0, 8).map((sheetName) => {
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    }) as unknown[][];

    const headerRowIndex = detectHeaderRow(rows);
    const headers = (rows[headerRowIndex] || []).map((cell, index) => {
      const value = String(cell ?? "").trim();

      return value || `COLUNA_${index + 1}`;
    });

    const detectedColumns = detectColumns(headers);
    const preview = buildPreview(rows, headerRowIndex, headers);

    return {
      sheetName,
      rowCount: Math.max(rows.length - headerRowIndex - 1, 0),
      headerRowIndex,
      headers,
      detectedColumns,
      preview,
    };
  });

  const allDetectedBases = sheets.flatMap((sheet) =>
    detectBasesFromColumns(classification, sheet.detectedColumns),
  );

  return {
    label,
    originalName: file.name,
    classification,
    sheetNames: workbook.SheetNames,
    sheets,
    warnings: buildWarnings(classification, sheets),
    detectedBases: [...new Set(allDetectedBases)],
  };
}
