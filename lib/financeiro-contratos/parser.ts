/**
 * EQUATEC — Parser de Planilhas Financeiras
 * Classifica e extrai dados de: 9.1 / 7.5 / 8.2.1 / GPS / Provisão Existente
 */

export type TipoArquivo =
  | "DETALHE_9_1"
  | "HISTORICO_7_5"
  | "FOLHA_8_2_1"
  | "HISTORICO_GPS"
  | "PROVISAO_EXISTENTE"
  | "DESCONHECIDO";

export type EstadoCelula = "OFICIAL" | "ESTIMADO" | "EDITADO";

export interface LinhaDRE {
  ccSup: string;
  conta: string;
  codigoConta: string;
  descricaoConta: string;
  valor: number | null;
  estado: EstadoCelula;
}

export interface DadosPEC {
  pec: string;
  receita: number;
  pessoal: number;
  encargos: number;
  provisoesTrabalhistas: number;
  beneficios: number;
  custoTotal: number;
  resultado: number;
  ebitda: number;
  margem: number;
  linhas: LinhaDRE[];
}

export interface ResultadoParser {
  tipo: TipoArquivo;
  competencia: string | null;
  pecs: DadosPEC[];
  mesesDisponiveis: string[];
  erros: string[];
  totalLinhas: number;
}

const MES_MAP: Record<string, number> = {
  JAN: 1, FEV: 2, MAR: 3, ABR: 4, MAI: 5, JUN: 6,
  JUL: 7, AGO: 8, SET: 9, OUT: 10, NOV: 11, DEZ: 12,
};

function isMes(valor: string): boolean {
  const parts = valor.trim().toUpperCase().split(" ");
  return parts.length === 2 && parts[0] in MES_MAP && /^\d{4}$/.test(parts[1]);
}

function extrairCodigoConta(conta: string): string {
  const m = conta.match(/^(\d+)/);
  return m ? m[1] : "";
}

function isCredito(conta: string): boolean {
  return conta.toUpperCase().includes("CR DESC") || conta.toUpperCase().includes("CREDITO DE");
}

// Detecta tipo pelo conteúdo do arquivo XLSX parseado via EXCELJS/XLSX no servidor
// Esta função recebe os dados já extraídos do backend
export function classificarPorCabecalho(cabecalhos: string[]): TipoArquivo {
  const txt = cabecalhos.join(" ").toUpperCase();

  if (txt.includes("VERBA") || (txt.includes("VERBA DE PAGAMENTO"))) return "FOLHA_8_2_1";
  if (txt.includes("% ROL") && txt.includes("VL REALIZADO")) return "HISTORICO_7_5";
  if (txt.includes("CC. SUP") || txt.includes("CC.SUP") || txt.includes("CONTA SUP")) return "DETALHE_9_1";
  if (txt.includes("DS_MES_ANO")) return "HISTORICO_GPS";
  if (txt.includes("PROVISAO") || txt.includes("PROVISÃO")) return "PROVISAO_EXISTENTE";

  return "DESCONHECIDO";
}

// Agrupa linhas por CC.SUP e extrai valor por competência
export function agruparPorCcSup(
  linhas: Array<{ ccSup: string; conta: string; valor: number | null }>
): Record<string, number> {
  const grupos: Record<string, number> = {};
  for (const linha of linhas) {
    const sup = linha.ccSup || "SEM_GRUPO";
    grupos[sup] = (grupos[sup] || 0) + (linha.valor || 0);
  }
  return grupos;
}

// Calcula PESSOAL total (41101)
export function calcularTotalPessoal(linhas: LinhaDRE[]): number {
  return linhas
    .filter(l => l.codigoConta.startsWith("41101") && !isCredito(l.conta))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);
}

// Calcula ENCARGOS total (41104)
export function calcularTotalEncargos(linhas: LinhaDRE[]): number {
  return linhas
    .filter(l => l.codigoConta.startsWith("41104"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);
}

// Calcula PROVISÕES TRABALHISTAS total (41105)
export function calcularTotalProvisoesTrabalhistas(linhas: LinhaDRE[]): number {
  return linhas
    .filter(l => l.codigoConta.startsWith("41105"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);
}

// Calcula BENEFÍCIOS total (41106)
export function calcularTotalBeneficios(linhas: LinhaDRE[]): number {
  return linhas
    .filter(l => l.codigoConta.startsWith("41106"))
    .reduce((acc, l) => {
      const val = l.valor || 0;
      // Créditos (CR DESC) são positivos — reduzem custo
      return acc + (isCredito(l.conta) ? -Math.abs(val) : Math.abs(val));
    }, 0);
}

// Calcula RECEITA LÍQUIDA (31101 - 31201)
export function calcularReceitaLiquida(linhas: LinhaDRE[]): number {
  const receita = linhas
    .filter(l => l.codigoConta.startsWith("311"))
    .reduce((acc, l) => acc + (l.valor || 0), 0);
  return Math.abs(receita);
}

// Extrai código numérico da conta (ex: "41101001 - SALARIOS" → "41101001")
export function parsearLinhaConta(linha: string): { codigo: string; descricao: string } {
  const m = linha.match(/^(\d+)\s*[-–]\s*(.+)/);
  if (m) return { codigo: m[1].trim(), descricao: m[2].trim() };
  return { codigo: "", descricao: linha.trim() };
}

// Normaliza valor para número
export function normalizarValor(v: unknown): number {
  if (v === null || v === undefined || v === "") return 0;
  const n = parseFloat(String(v).replace(",", "."));
  return isNaN(n) ? 0 : n;
}

export function mesesOrdenados(meses: string[]): string[] {
  return meses.sort((a, b) => {
    const [mA, yA] = a.split(" ");
    const [mB, yB] = b.split(" ");
    const dA = new Date(parseInt(yA), (MES_MAP[mA] || 1) - 1);
    const dB = new Date(parseInt(yB), (MES_MAP[mB] || 1) - 1);
    return dB.getTime() - dA.getTime(); // mais recente primeiro
  });
}

export function mesAnterior(mes: string): string | null {
  const [m, y] = mes.split(" ");
  const mesNum = MES_MAP[m];
  if (!mesNum) return null;
  if (mesNum === 1) {
    const meses = Object.keys(MES_MAP);
    return `DEZ ${parseInt(y) - 1}`;
  }
  const mesPrev = Object.keys(MES_MAP).find(k => MES_MAP[k] === mesNum - 1);
  return mesPrev ? `${mesPrev} ${y}` : null;
}




import * as XLSX from "xlsx";

export interface ArquivoParseado {
  tipo: TipoArquivo;
  competencia: string | null;
  linhas: LinhaDRE[];
  mesesDisponiveis: string[];
  erros: string[];
}

/**
 * Detecta se uma string representa "Total" (linha de subtotal,
 * que deve ser ignorada na extraÃ§Ã£o de linhas de detalhe â€” o
 * motor de regras recalcula os totais a partir das linhas).
 */
function isLinhaTotal(valor: unknown): boolean {
  return typeof valor === "string" && valor.trim().toUpperCase() === "TOTAL";
}

/**
 * LÃª a planilha 7.5 (portal_7_5.xlsx) â€” formato hierÃ¡rquico:
 * Linha 1: cabeÃ§alho de competÃªncias (ex: "ABR 2026", "MAR 2026"...)
 * Linha 2: cabeÃ§alho de colunas (PEC, CC. SUP, CONTA, VL REALIZADO...)
 * Linha 3+: dados com forward-fill em PEC e CC.SUP
 *
 * Extrai apenas a competÃªncia mais recente (primeira coluna de mÃªs,
 * coluna D / Ã­ndice 4) por padrÃ£o, mas mantÃ©m todas disponÃ­veis.
 */
function parsearPlanilha75(
  matriz: unknown[][]
): { linhas: LinhaDRE[]; competencias: string[]; pecAtual: string | null } {
  const linhas: LinhaDRE[] = [];
  const competencias: string[] = [];
  let pecAtual: string | null = null;
  let ccSupAtual = "";

  // Linha 1 (Ã­ndice 0): cabeÃ§alho de meses, a partir da coluna D (Ã­ndice 3)
  const linhaMeses = matriz[0] || [];
  for (let c = 3; c < linhaMeses.length - 1; c += 1) {
    const mes = linhaMeses[c];
    if (typeof mes === "string" && isMes(mes)) {
      competencias.push(mes.trim().toUpperCase());
    }
  }

  // Coluna de valor a extrair: a competÃªncia mais recente = Ã­ndice 3 (coluna D)
  const colValor = 3;

  // Dados a partir da linha 3 (Ã­ndice 2)
  for (let r = 2; r < matriz.length; r += 1) {
    const row = matriz[r] || [];
    const pec = row[0];
    const ccSup = row[1];
    const conta = row[2];
    const valor = row[colValor];

    if (typeof pec === "string" && pec.trim() !== "") {
      pecAtual = pec.trim();
      continue; // linha de PEC Ã© sÃ³ cabeÃ§alho de bloco, sem valor de conta
    }

    if (typeof ccSup === "string" && ccSup.trim() !== "") {
      ccSupAtual = ccSup.trim();
      // Se a CONTA desta linha for "Total", Ã© o subtotal do grupo â€” ignorar
      if (isLinhaTotal(conta)) continue;
    }

    if (typeof conta === "string" && conta.trim() !== "" && !isLinhaTotal(conta)) {
      const codigo = extrairCodigoConta(conta);
      if (codigo) {
        linhas.push({
          ccSup: ccSupAtual,
          conta: conta.trim(),
          codigoConta: codigo,
          descricaoConta: conta.trim(),
          valor: normalizarValor(valor),
          estado: "OFICIAL",
        });
      }
    }
  }

  return { linhas, competencias, pecAtual };
}

/**
 * LÃª a planilha 9.1 (data_9_1.xlsx) â€” mesmo padrÃ£o hierÃ¡rquico da
 * 7.5, mas sem coluna de PEC (comeÃ§a direto em CONTA SUP / CONTA).
 */
function parsearPlanilha91(
  matriz: unknown[][]
): { linhas: LinhaDRE[]; competencias: string[] } {
  const linhas: LinhaDRE[] = [];
  const competencias: string[] = [];
  let ccSupAtual = "";

  const linhaMeses = matriz[0] || [];
  for (let c = 2; c < linhaMeses.length - 1; c += 1) {
    const mes = linhaMeses[c];
    if (typeof mes === "string" && isMes(mes)) {
      competencias.push(mes.trim().toUpperCase());
    }
  }

  const colValor = 2; // coluna C (Ã­ndice 2) = competÃªncia mais recente

  for (let r = 2; r < matriz.length; r += 1) {
    const row = matriz[r] || [];
    const ccSup = row[0];
    const conta = row[1];
    const valor = row[colValor];

    if (typeof ccSup === "string" && ccSup.trim() !== "") {
      ccSupAtual = ccSup.trim();
      if (isLinhaTotal(conta)) continue;
    }

    if (typeof conta === "string" && conta.trim() !== "" && !isLinhaTotal(conta)) {
      const codigo = extrairCodigoConta(conta);
      if (codigo) {
        linhas.push({
          ccSup: ccSupAtual,
          conta: conta.trim(),
          codigoConta: codigo,
          descricaoConta: conta.trim(),
          valor: normalizarValor(valor),
          estado: "OFICIAL",
        });
      }
    }
  }

  return { linhas, competencias };
}

/**
 * LÃª a planilha 8.2.1 (data_8_2_1.xlsx) â€” formato simples,
 * uma conta por linha, sem hierarquia:
 * Linha 1: "COMPETÃŠNCIA", "ABR 2026", "Total"
 * Linha 2: "CONTA CONTÃBIL", "VL CONTAS DE RESULTADO", ...
 * Linha 3+: "41101001 - SALARIOS", -428695.04, ...
 */
function parsearPlanilha821(
  matriz: unknown[][]
): { linhas: LinhaDRE[]; competencia: string | null } {
  const linhas: LinhaDRE[] = [];

  const cabecalhoCompetencia = matriz[0]?.[1];
  const competencia =
    typeof cabecalhoCompetencia === "string" ? cabecalhoCompetencia.trim() : null;

  for (let r = 2; r < matriz.length; r += 1) {
    const row = matriz[r] || [];
    const conta = row[0];
    const valor = row[1];

    if (typeof conta === "string" && conta.trim() !== "" && !isLinhaTotal(conta)) {
      const codigo = extrairCodigoConta(conta);
      if (codigo) {
        linhas.push({
          ccSup: "",
          conta: conta.trim(),
          codigoConta: codigo,
          descricaoConta: conta.trim(),
          valor: normalizarValor(valor),
          estado: "OFICIAL",
        });
      }
    }
  }

  return { linhas, competencia };
}

/**
 * FunÃ§Ã£o principal: recebe um File (do upload via formulÃ¡rio) e um
 * label informativo, lÃª o workbook com a biblioteca xlsx (SheetJS),
 * detecta o tipo de planilha pelo cabeÃ§alho e despacha para o parser
 * especÃ­fico correspondente.
 *
 * Esta Ã© a funÃ§Ã£o que estava sendo importada pelo route.ts mas nunca
 * tinha sido implementada â€” corrigida em 21/06/2026.
 */
export async function parseFinancialContractFile(
  file: File,
  label: string
): Promise<ResultadoParser> {
  const erros: string[] = [];

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    return {
      tipo: "DESCONHECIDO",
      competencia: null,
      pecs: [],
      mesesDisponiveis: [],
      erros: [`Arquivo "${label}" nÃ£o contÃ©m nenhuma aba.`],
      totalLinhas: 0,
    };
  }

  const sheet = workbook.Sheets[sheetName];
  const matriz: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: null,
    raw: true,
  });

  if (matriz.length < 2) {
    return {
      tipo: "DESCONHECIDO",
      competencia: null,
      pecs: [],
      mesesDisponiveis: [],
      erros: [`Arquivo "${label}" estÃ¡ vazio ou sem cabeÃ§alho reconhecÃ­vel.`],
      totalLinhas: 0,
    };
  }

  // CabeÃ§alho de colunas estÃ¡ sempre na linha 2 (Ã­ndice 1) nos 3 formatos,
  // exceto na 8.2.1 onde a "competÃªncia" jÃ¡ aparece na linha 1.
  const cabecalhoColunas = (matriz[1] || []).map((v) => (v == null ? "" : String(v)));
  const cabecalhoLinha1 = (matriz[0] || []).map((v) => (v == null ? "" : String(v)));

  const tipo = classificarPorCabecalho([...cabecalhoLinha1, ...cabecalhoColunas]);

  let linhas: LinhaDRE[] = [];
  let competencias: string[] = [];
  let competenciaUnica: string | null = null;

  switch (tipo) {
    case "HISTORICO_7_5": {
      const r = parsearPlanilha75(matriz);
      linhas = r.linhas;
      competencias = r.competencias;
      break;
    }
    case "DETALHE_9_1": {
      const r = parsearPlanilha91(matriz);
      linhas = r.linhas;
      competencias = r.competencias;
      break;
    }
    case "FOLHA_8_2_1": {
      const r = parsearPlanilha821(matriz);
      linhas = r.linhas;
      competenciaUnica = r.competencia;
      if (competenciaUnica) competencias = [competenciaUnica];
      break;
    }
    default: {
      erros.push(
        `NÃ£o foi possÃ­vel identificar o tipo do arquivo "${label}" automaticamente. ` +
          `Verifique se Ã© uma exportaÃ§Ã£o vÃ¡lida (7.5, 9.1 ou 8.2.1).`
      );
      // Tenta um fallback genÃ©rico: usar o formato 8.2.1 (mais simples)
      const r = parsearPlanilha821(matriz);
      linhas = r.linhas;
      competenciaUnica = r.competencia;
    }
  }

  if (linhas.length === 0) {
    erros.push(`Nenhuma linha de conta foi extraÃ­da do arquivo "${label}".`);
  }

  const mesesDisponiveis = mesesOrdenados(competencias);
  const competenciaFinal = competenciaUnica || mesesDisponiveis[0] || null;

  // Agrupa por PEC (a 7.5 pode ter mÃºltiplos PECs no mesmo arquivo;
  // 9.1 e 8.2.1 nÃ£o tÃªm coluna de PEC, entÃ£o tudo cai em "GERAL")
  const pecsMap = new Map<string, LinhaDRE[]>();
  const pecPadrao = "GERAL";
  for (const linha of linhas) {
    const lista = pecsMap.get(pecPadrao) || [];
    lista.push(linha);
    pecsMap.set(pecPadrao, lista);
  }

  const pecs: DadosPEC[] = Array.from(pecsMap.entries()).map(([pec, linhasPec]) => {
    const pessoal = calcularTotalPessoal(linhasPec);
    const encargos = calcularTotalEncargos(linhasPec);
    const provisoesTrabalhistas = calcularTotalProvisoesTrabalhistas(linhasPec);
    const beneficios = calcularTotalBeneficios(linhasPec);
    const receita = calcularReceitaLiquida(linhasPec);
    const custoTotal = pessoal + encargos + provisoesTrabalhistas + beneficios;
    const resultado = receita - custoTotal;

    return {
      pec,
      receita,
      pessoal,
      encargos,
      provisoesTrabalhistas,
      beneficios,
      custoTotal,
      resultado,
      ebitda: resultado,
      margem: receita > 0 ? resultado / receita : 0,
      linhas: linhasPec,
    };
  });

  return {
    tipo,
    competencia: competenciaFinal,
    pecs,
    mesesDisponiveis,
    erros,
    totalLinhas: linhas.length,
  };
}

