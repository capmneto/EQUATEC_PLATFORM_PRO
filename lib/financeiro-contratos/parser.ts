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
  data?: string;
  centroResultado?: string;
};

export type ParsedSheetSummary = {
  sheetName: string;
  rowCount: number;
  headerRowIndex: number;
  headers: string[];
  detectedColumns: DetectedColumnMap;
  preview: Record<string, string>[];
  normalizedPreview: Record<string, string>[];
  detectedValueTotal: number;
};

export type ParsedFinancialFile = {
  label: string;
  originalName: string;
  classification: FinancialFileClassification;
  sheetNames: string[];
  sheets: ParsedSheetSummary[];
  warnings: string[];
  detectedBases: string[];
  totalRows: number;
  detectedValueTotal: number;
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

function parseMoney(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  const raw = String(value ?? "").trim();

  if (!raw) return 0;

  const clean = raw
    .replace(/\s/g, "")
    .replace(/R\$/gi, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const parsed = Number(clean);

  return Number.isFinite(parsed) ? parsed : 0;
}

function classifyFile(
  label: string,
  fileName: string,
  mimeType?: string,
): FinancialFileClassification {
  const source = `${label} ${fileName}`;
  const normalized = normalizeText(source);
  const compact = compactText(source);

  if (mimeType?.includes("pdf") || compact.includes("PDF")) {
    return "DOCUMENTO_PDF";
  }

  if (
    normalized.includes("7.5") ||
    compact.includes("75") ||
    normalized.includes("HISTORICO 7.5") ||
    normalized.includes("HISTÓRICO 7.5")
  ) {
    return "HISTORICO_7_5";
  }

  if (normalized.includes("9.1") || compact.includes("91")) {
    return "DETALHE_9_1";
  }

  if (
    normalized.includes("8.2.1") ||
    compact.includes("821") ||
    normalized.includes("FOLHA") ||
    normalized.includes("PESSOAL") ||
    normalized.includes("VERBA DE PAGAMENTO")
  ) {
    return "FOLHA_8_2_1";
  }

  if (
    normalized.includes("PROVISAO") ||
    normalized.includes("PROVISÃO") ||
    normalized.includes("RESULTADO MENSAL")
  ) {
    return "PROVISAO_MENSAL";
  }

  if (
    normalized.includes("PEC") ||
    normalized.includes("DFP") ||
    normalized.includes("PPU") ||
    normalized.includes("PRECO UNITARIO") ||
    normalized.includes("PREÇO UNITÁRIO") ||
    normalized.includes("PRECIFICACAO") ||
    normalized.includes("PRECIFICAÇÃO")
  ) {
    return "BASE_PRECIFICACAO";
  }

  return "DESCONHECIDO";
}

function isLikelyHeaderRow(row: unknown[]) {
  const normalized = row.map(normalizeText).join(" | ");

  const keywords = [
    "PEC",
    "CONTA",
    "CONTA SUP",
    "CONTA SUPERIOR",
    "FORNECEDOR",
    "ROL",
    "VERBA",
    "VALOR",
    "TOTAL",
    "RECEITA",
    "FATURAMENTO",
    "SALARIO",
    "SALÁRIO",
    "PESSOAL",
    "DATA",
    "CR",
  ];

  const hits = keywords.filter((keyword) =>
    normalized.includes(normalizeText(keyword)),
  ).length;

  const nonEmpty = row.filter((cell) => String(cell ?? "").trim()).length;

  return hits >= 2 || (hits >= 1 && nonEmpty >= 4);
}

function detectHeaderRow(rows: unknown[][]) {
  const limit = Math.min(rows.length, 35);

  for (let index = 0; index < limit; index += 1) {
    if (isLikelyHeaderRow(rows[index] || [])) return index;
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
      (normalized.includes("CONTA SUP") ||
        normalized.includes("CONTA SUPERIOR") ||
        compact.includes("CONTASUP"))
    ) {
      map.contaSup = header;
    }

    if (
      !map.conta &&
      (normalized === "CONTA" ||
        normalized.includes("CONTA CONTABIL") ||
        normalized.includes("CONTA CONTÁBIL")) &&
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
      (normalized.includes("VERBA") || normalized.includes("PAGAMENTO"))
    ) {
      map.verbaPagamento = header;
    }

    if (
      !map.receita &&
      (normalized.includes("RECEITA") || normalized.includes("FATURAMENTO"))
    ) {
      map.receita = header;
    }

    if (
      !map.salario &&
      (normalized.includes("SALARIO") || normalized.includes("SALÁRIO"))
    ) {
      map.salario = header;
    }

    if (!map.pessoal && normalized.includes("PESSOAL")) {
      map.pessoal = header;
    }

    if (
      !map.data &&
      (normalized === "DATA" ||
        normalized.includes("COMPETENCIA") ||
        normalized.includes("COMPETÊNCIA") ||
        normalized.includes("MES") ||
        normalized.includes("MÊS"))
    ) {
      map.data = header;
    }

    if (
      !map.centroResultado &&
      (normalized === "CR" ||
        normalized.includes("CENTRO DE RESULTADO") ||
        normalized.includes("CENTRO RESULTADO"))
    ) {
      map.centroResultado = header;
    }

    if (
      !map.valor &&
      (normalized === "VALOR" ||
        normalized.includes("VALOR") ||
        normalized.includes("TOTAL") ||
        normalized.includes("MONTANTE") ||
        normalized.includes("CUSTO"))
    ) {
      map.valor = header;
    }
  }

  return map;
}

function buildPreview(rows: unknown[][], headerRowIndex: number, headers: string[]) {
  const previewRows = rows.slice(headerRowIndex + 1, headerRowIndex + 8);

  return previewRows.map((row) => {
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      const key = header || `COLUNA_${index + 1}`;
      record[key] = String(row[index] ?? "");
    });

    return record;
  });
}

function buildNormalizedPreview(
  preview: Record<string, string>[],
  columns: DetectedColumnMap,
) {
  return preview.map((row) => {
    return {
      pec: columns.pec ? row[columns.pec] || "" : "",
      conta: columns.conta ? row[columns.conta] || "" : "",
      contaSup: columns.contaSup ? row[columns.contaSup] || "" : "",
      fornecedor: columns.fornecedor ? row[columns.fornecedor] || "" : "",
      verbaPagamento: columns.verbaPagamento
        ? row[columns.verbaPagamento] || ""
        : "",
      receita: columns.receita ? row[columns.receita] || "" : "",
      valor: columns.valor ? row[columns.valor] || "" : "",
      salario: columns.salario ? row[columns.salario] || "" : "",
      pessoal: columns.pessoal ? row[columns.pessoal] || "" : "",
    };
  });
}

function calculateDetectedValueTotal(
  rows: unknown[][],
  headerRowIndex: number,
  headers: string[],
  columns: DetectedColumnMap,
) {
  if (!columns.valor) return 0;

  const valueIndex = headers.findIndex((header) => header === columns.valor);

  if (valueIndex < 0) return 0;

  return rows
    .slice(headerRowIndex + 1)
    .reduce((sum, row) => sum + parseMoney(row[valueIndex]), 0);
}

function detectBasesFromColumns(
  classification: FinancialFileClassification,
  columns: DetectedColumnMap,
) {
  const bases: string[] = [];

  if (classification === "BASE_PRECIFICACAO") {
    bases.push("Base de precificação contratual");
  }

  if (classification === "HISTORICO_7_5") {
    bases.push("Histórico gerencial por conta");
  }

  if (classification === "DETALHE_9_1") {
    bases.push("Detalhamento por fornecedor");
  }

  if (classification === "FOLHA_8_2_1") {
    bases.push("Folha, pessoal e verba de pagamento");
  }

  if (classification === "PROVISAO_MENSAL") {
    bases.push("Provisão mensal");
  }

  if (columns.pec) bases.push("Dimensão PEC detectada");
  if (columns.conta) bases.push("Dimensão Conta Contábil detectada");
  if (columns.contaSup) bases.push("Dimensão Conta Sup detectada");
  if (columns.fornecedor) bases.push("Dimensão Fornecedor detectada");
  if (columns.verbaPagamento) bases.push("Dimensão Verba de Pagamento detectada");
  if (columns.valor) bases.push("Coluna de valor detectada");

  return [...new Set(bases)];
}

function buildWarnings(
  classification: FinancialFileClassification,
  sheets: ParsedSheetSummary[],
) {
  const warnings: string[] = [];

  const mergedColumns = sheets.reduce<DetectedColumnMap>(
    (acc, sheet) => ({ ...acc, ...sheet.detectedColumns }),
    {},
  );

  if (classification === "HISTORICO_7_5") {
    if (!mergedColumns.pec) warnings.push("Histórico sem PEC detectada.");
    if (!mergedColumns.conta) warnings.push("Histórico sem Conta detectada.");
    if (!mergedColumns.contaSup)
      warnings.push("Histórico sem Conta Sup detectada.");
  }

  if (classification === "DETALHE_9_1") {
    if (!mergedColumns.pec) warnings.push("Detalhamento sem PEC detectada.");
    if (!mergedColumns.conta) warnings.push("Detalhamento sem Conta detectada.");
    if (!mergedColumns.contaSup)
      warnings.push("Detalhamento sem Conta Sup detectada.");
    if (!mergedColumns.fornecedor)
      warnings.push("Detalhamento sem Fornecedor detectado.");
  }

  if (classification === "FOLHA_8_2_1") {
    if (!mergedColumns.pec) warnings.push("Folha/Pessoal sem PEC detectada.");
    if (!mergedColumns.conta)
      warnings.push("Folha/Pessoal sem Conta Contábil detectada.");
    if (!mergedColumns.verbaPagamento)
      warnings.push("Folha/Pessoal sem Verba de Pagamento detectada.");
  }

  if (!sheets.length && classification !== "DOCUMENTO_PDF") {
    warnings.push("Nenhuma aba útil foi lida automaticamente.");
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
      warnings: [
        "PDF recebido. A leitura estruturada será tratada por OCR/Document AI em etapa posterior.",
      ],
      detectedBases: ["Documento PDF"],
      totalRows: 0,
      detectedValueTotal: 0,
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const workbook = XLSX.read(buffer, {
    type: "buffer",
    cellDates: true,
    raw: false,
  });

  const sheets = workbook.SheetNames.slice(0, 10).map((sheetName) => {
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
    const normalizedPreview = buildNormalizedPreview(preview, detectedColumns);
    const detectedValueTotal = calculateDetectedValueTotal(
      rows,
      headerRowIndex,
      headers,
      detectedColumns,
    );

    return {
      sheetName,
      rowCount: Math.max(rows.length - headerRowIndex - 1, 0),
      headerRowIndex,
      headers,
      detectedColumns,
      preview,
      normalizedPreview,
      detectedValueTotal,
    };
  });

  const detectedBases = [
    ...new Set(
      sheets.flatMap((sheet) =>
        detectBasesFromColumns(classification, sheet.detectedColumns),
      ),
    ),
  ];

  return {
    label,
    originalName: file.name,
    classification,
    sheetNames: workbook.SheetNames,
    sheets,
    warnings: buildWarnings(classification, sheets),
    detectedBases,
    totalRows: sheets.reduce((sum, sheet) => sum + sheet.rowCount, 0),
    detectedValueTotal: sheets.reduce(
      (sum, sheet) => sum + sheet.detectedValueTotal,
      0,
    ),
  };
}
