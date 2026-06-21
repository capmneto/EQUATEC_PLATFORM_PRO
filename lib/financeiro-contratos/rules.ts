/**
 * EQUATEC — Motor de Regras de Provisão Mensal
 * Implementa todas as regras de negócio especificadas por Carlos Machado
 *
 * REGRAS IMPLEMENTADAS:
 * 1. 32201 TOTAL = 8,75% da receita bruta por PEC
 * 2. Provisões Trabalhistas ausentes = 26,25% do PESSOAL lançado
 * 3. Prêmios (41101024) ausentes → média móvel 3 meses ou correlação salário/ROL
 * 4. Assistência Médica (41106010) ausente → média móvel 3 meses
 * 5. Assistência Odontológica (41106011) ausente → média móvel 3 meses
 * 6. Movimentação Operacional (41101102) → lançada manualmente no dia 30
 * 7. Contas CR = créditos positivos (reduzem custo)
 * 8. Juros atraso cliente (41601021) → média 3 meses
 * 9. Depreciações gerenciais (41801006) → repetir valor do mês anterior
 */

import type { LinhaDRE, EstadoCelula } from "./parser";
import {
  calcularTotalPessoal,
  calcularReceitaLiquida,
  calcularTotalProvisoesTrabalhistas,
  normalizarValor,
  mesAnterior,
} from "./parser";

export interface ContextoHistorico {
  // mes_ano → { codigo_conta → valor }
  historico: Record<string, Record<string, number>>;
  receitas: Record<string, number>; // mes_ano → receita bruta
  folha: Record<string, number>;    // mes_ano → custo pessoal total
}

export interface ResultadoRegra {
  codigo: string;
  descricao: string;
  valorCalculado: number;
  estado: EstadoCelula;
  regra: string;
}

export interface ResultadoProvisao {
  pec: string;
  competencia: string;
  receita: number;
  impostos: number;             // 32201
  pessoal: number;              // 41101
  encargos: number;             // 41104
  provisoesTrabalhistas: number; // 41105
  beneficios: number;            // 41106
  servicos: number;              // 41401
  materiais: number;             // 41501 + 41502
  despesasGerais: number;        // 41601 + 41602
  depreciacoes: number;          // 41801
  resultado: number;             // receita - todos custos
  ebitda: number;                // resultado + depreciações
  margem: number;                // resultado / receita
  margemEbitda: number;          // ebitda / receita
  linhas: LinhaDRE[];
  alertas: string[];
  estimativas: string[];
}

// Taxa de impostos s/faturamento (Regra 1)
const TAXA_32201 = 0.0875;

// Taxa de provisões trabalhistas sobre pessoal (Regra 2)
const TAXA_PROV_TRABALHISTAS = 0.2625;

// Contas especiais de crédito (sempre positivo no DRE)
const CONTAS_CREDITO = ["41106022", "41106026", "41106034", "31201006", "31201007"];
const PREFIXOS_CREDITO = ["CR DESC", "CREDITO DE"];

function isContaCredito(conta: string): boolean {
  const upper = conta.toUpperCase();
  return PREFIXOS_CREDITO.some(p => upper.includes(p)) ||
    CONTAS_CREDITO.some(c => conta.startsWith(c));
}

// Média móvel dos últimos N meses
function mediaMovel(
  historico: Record<string, number>,
  meses: string[],
  n = 3
): number | null {
  const valores = meses
    .slice(0, n)
    .map(m => historico[m])
    .filter(v => v !== undefined && v !== 0 && !isNaN(v));

  if (valores.length === 0) return null;
  return valores.reduce((a, b) => a + b, 0) / valores.length;
}

// REGRA 1: 32201 = 8,75% da receita
export function calcular32201(receita: number): ResultadoRegra {
  const valor = -Math.abs(receita) * TAXA_32201;
  return {
    codigo: "32201",
    descricao: "IMPOSTOS S/FATURAMENTO",
    valorCalculado: valor,
    estado: "ESTIMADO",
    regra: `8,75% da receita bruta de R$ ${receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
  };
}

// REGRA 2: Provisões Trabalhistas = 26,25% do PESSOAL quando ausentes
export function calcularProvisoesTrabalhistas(
  pessoalTotal: number,
  provisoesExistentes: number
): ResultadoRegra {
  if (Math.abs(provisoesExistentes) > 0) {
    return {
      codigo: "41105",
      descricao: "PROVISOES TRABALHISTAS",
      valorCalculado: provisoesExistentes,
      estado: "OFICIAL",
      regra: "Valor oficial da planilha",
    };
  }

  const valor = -pessoalTotal * TAXA_PROV_TRABALHISTAS;
  return {
    codigo: "41105",
    descricao: "PROVISOES TRABALHISTAS",
    valorCalculado: valor,
    estado: "ESTIMADO",
    regra: `26,25% do PESSOAL de R$ ${pessoalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
  };
}

// REGRA 3: Prêmios (41101024) → média móvel 3 meses
export function calcularPremios(
  valorAtual: number | null,
  ctx: ContextoHistorico,
  mesesAnteriores: string[]
): ResultadoRegra {
  if (valorAtual !== null && Math.abs(valorAtual) > 0) {
    return {
      codigo: "41101024",
      descricao: "PREMIOS",
      valorCalculado: valorAtual,
      estado: "OFICIAL",
      regra: "Valor oficial lançado",
    };
  }

  const hist = mesesAnteriores.map(m => ctx.historico[m]?.["41101024"] || 0);
  const media = mediaMovel(
    Object.fromEntries(mesesAnteriores.map((m, i) => [m, hist[i]])),
    mesesAnteriores,
    3
  );

  if (media !== null && media !== 0) {
    return {
      codigo: "41101024",
      descricao: "PREMIOS",
      valorCalculado: -Math.abs(media),
      estado: "ESTIMADO",
      regra: `Média móvel 3 meses: R$ ${Math.abs(media).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    };
  }

  return {
    codigo: "41101024",
    descricao: "PREMIOS",
    valorCalculado: 0,
    estado: "ESTIMADO",
    regra: "Sem histórico disponível — valor zerado",
  };
}

// REGRA 4 e 5: Assistência Médica e Odontológica → média móvel 3 meses
export function calcularBeneficioSaude(
  codigo: string,
  descricao: string,
  valorAtual: number | null,
  ctx: ContextoHistorico,
  mesesAnteriores: string[]
): ResultadoRegra {
  if (valorAtual !== null && Math.abs(valorAtual) > 0) {
    return {
      codigo,
      descricao,
      valorCalculado: valorAtual,
      estado: "OFICIAL",
      regra: "Valor oficial lançado",
    };
  }

  const hist = Object.fromEntries(
    mesesAnteriores.map(m => [m, ctx.historico[m]?.[codigo] || 0])
  );
  const media = mediaMovel(hist, mesesAnteriores, 3);

  if (media !== null && media !== 0) {
    return {
      codigo,
      descricao,
      valorCalculado: -Math.abs(media),
      estado: "ESTIMADO",
      regra: `Média móvel 3 meses: R$ ${Math.abs(media).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    };
  }

  return {
    codigo,
    descricao,
    valorCalculado: 0,
    estado: "ESTIMADO",
    regra: "Sem histórico disponível",
  };
}

// REGRA 8: Juros atraso cliente → média 3 meses
export function calcularJuros(
  valorAtual: number | null,
  ctx: ContextoHistorico,
  mesesAnteriores: string[]
): ResultadoRegra {
  if (valorAtual !== null && Math.abs(valorAtual) > 0) {
    return {
      codigo: "41601021",
      descricao: "JUROS ATRASO CLIENTE",
      valorCalculado: valorAtual,
      estado: "OFICIAL",
      regra: "Valor oficial lançado",
    };
  }

  const hist = Object.fromEntries(
    mesesAnteriores.map(m => [m, ctx.historico[m]?.["41601021"] || 0])
  );
  const media = mediaMovel(hist, mesesAnteriores, 3);

  return {
    codigo: "41601021",
    descricao: "JUROS ATRASO CLIENTE",
    valorCalculado: media !== null ? -Math.abs(media) : 0,
    estado: "ESTIMADO",
    regra: media !== null
      ? `Média 3 meses: R$ ${Math.abs(media).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
      : "Sem histórico",
  };
}

// REGRA 9: Depreciações gerenciais → mesmo valor do mês anterior
export function calcularDepreciacoes(
  valorAtual: number | null,
  ctx: ContextoHistorico,
  competenciaAtual: string
): ResultadoRegra {
  if (valorAtual !== null && Math.abs(valorAtual) > 0) {
    return {
      codigo: "41801006",
      descricao: "DEPRECIACOES GERENCIAIS",
      valorCalculado: valorAtual,
      estado: "OFICIAL",
      regra: "Valor oficial lançado",
    };
  }

  const mesAnt = mesAnterior(competenciaAtual);
  const valorAnt = mesAnt ? ctx.historico[mesAnt]?.["41801006"] : null;

  if (valorAnt && Math.abs(valorAnt) > 0) {
    return {
      codigo: "41801006",
      descricao: "DEPRECIACOES GERENCIAIS",
      valorCalculado: -Math.abs(valorAnt),
      estado: "ESTIMADO",
      regra: `Repetido do mês anterior (${mesAnt}): R$ ${Math.abs(valorAnt).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    };
  }

  return {
    codigo: "41801006",
    descricao: "DEPRECIACOES GERENCIAIS",
    valorCalculado: 0,
    estado: "ESTIMADO",
    regra: "Sem mês anterior disponível",
  };
}

// Aplica todas as regras e calcula resultado final
export function aplicarRegrasPEC(
  pec: string,
  competencia: string,
  linhas: LinhaDRE[],
  ctx: ContextoHistorico,
  mesesAnteriores: string[]
): ResultadoProvisao {
  const alertas: string[] = [];
  const estimativas: string[] = [];
  const linhasFinais: LinhaDRE[] = [...linhas];

  // Receita bruta
  const receita = Math.abs(
    linhas
      .filter(l => l.codigoConta.startsWith("311"))
      .reduce((acc, l) => acc + (l.valor || 0), 0)
  );

  if (receita === 0) alertas.push("⚠️ Receita não identificada — verifique os dados de faturamento");

  // REGRA 1: 32201
  const linha32201 = linhas.find(l => l.codigoConta.startsWith("32201") || l.ccSup.includes("31201"));
  const valor32201Atual = linha32201?.valor || null;
  if (!valor32201Atual || Math.abs(valor32201Atual) === 0) {
    const r32201 = calcular32201(receita);
    estimativas.push(`32201: ${r32201.regra}`);
    // Atualiza linha existente ou cria nova
    const idx = linhasFinais.findIndex(l => l.codigoConta.startsWith("32201"));
    if (idx >= 0) {
      linhasFinais[idx] = { ...linhasFinais[idx], valor: r32201.valorCalculado, estado: "ESTIMADO" };
    } else {
      linhasFinais.push({
        ccSup: "31201 - IMPOSTOS S/FATURAMENTO",
        conta: "32201 - IMPOSTOS S/FATURAMENTO TOTAL",
        codigoConta: "32201",
        descricaoConta: "IMPOSTOS S/FATURAMENTO",
        valor: r32201.valorCalculado,
        estado: "ESTIMADO",
      });
    }
  }

  // PESSOAL total
  const pessoal = calcularTotalPessoal(linhasFinais);

  // REGRA 2: Provisões Trabalhistas
  const provisoesAtual = linhas
    .filter(l => l.codigoConta.startsWith("41105"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const rProv = calcularProvisoesTrabalhistas(pessoal, provisoesAtual);
  if (rProv.estado === "ESTIMADO") {
    estimativas.push(`41105: ${rProv.regra}`);
    linhasFinais.push({
      ccSup: "41105 - PROVISOES TRABALHISTAS",
      conta: "41105 - PROVISOES TRABALHISTAS TOTAL (ESTIMADO)",
      codigoConta: "41105",
      descricaoConta: "PROVISOES TRABALHISTAS",
      valor: rProv.valorCalculado,
      estado: "ESTIMADO",
    });
  }

  // REGRA 3: Prêmios
  const premioAtual = linhas.find(l => l.codigoConta === "41101024")?.valor || null;
  const rPremio = calcularPremios(premioAtual, ctx, mesesAnteriores);
  if (rPremio.estado === "ESTIMADO" && rPremio.valorCalculado !== 0) {
    estimativas.push(`41101024: ${rPremio.regra}`);
    const idx = linhasFinais.findIndex(l => l.codigoConta === "41101024");
    if (idx >= 0) {
      linhasFinais[idx] = { ...linhasFinais[idx], valor: rPremio.valorCalculado, estado: "ESTIMADO" };
    }
  }

  // REGRA 4: Assistência Médica
  const medAtual = linhas.find(l => l.codigoConta === "41106010")?.valor || null;
  const rMed = calcularBeneficioSaude("41106010", "ASSISTENCIA MEDICA", medAtual, ctx, mesesAnteriores);
  if (rMed.estado === "ESTIMADO") estimativas.push(`41106010: ${rMed.regra}`);

  // REGRA 5: Assistência Odontológica
  const odontoAtual = linhas.find(l => l.codigoConta === "41106011")?.valor || null;
  const rOdonto = calcularBeneficioSaude("41106011", "ASSISTENCIA ODONTOLOGICA", odontoAtual, ctx, mesesAnteriores);
  if (rOdonto.estado === "ESTIMADO") estimativas.push(`41106011: ${rOdonto.regra}`);

  // REGRA 8: Juros
  const jurosAtual = linhas.find(l => l.codigoConta === "41601021")?.valor || null;
  const rJuros = calcularJuros(jurosAtual, ctx, mesesAnteriores);
  if (rJuros.estado === "ESTIMADO") estimativas.push(`41601021: ${rJuros.regra}`);

  // REGRA 9: Depreciações
  const depAtual = linhas.find(l => l.codigoConta === "41801006")?.valor || null;
  const rDep = calcularDepreciacoes(depAtual, ctx, competencia);
  if (rDep.estado === "ESTIMADO") estimativas.push(`41801006: ${rDep.regra}`);

  // Totais finais
  const impostos = Math.abs(
    linhasFinais.filter(l => l.codigoConta.startsWith("312") || l.ccSup.includes("31201") || l.codigoConta.startsWith("32201"))
      .reduce((acc, l) => acc + (l.valor || 0), 0)
  );

  const pessoalFinal = linhasFinais
    .filter(l => l.codigoConta.startsWith("41101") && !isContaCredito(l.conta))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const encargos = linhasFinais
    .filter(l => l.codigoConta.startsWith("41104"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const provisoes = linhasFinais
    .filter(l => l.codigoConta.startsWith("41105"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const beneficios = linhasFinais
    .filter(l => l.codigoConta.startsWith("41106"))
    .reduce((acc, l) => {
      const val = Math.abs(l.valor || 0);
      return acc + (isContaCredito(l.conta) ? -val : val);
    }, 0);

  const servicos = linhasFinais
    .filter(l => l.codigoConta.startsWith("414"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const materiais = linhasFinais
    .filter(l => l.codigoConta.startsWith("415"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const despesasGerais = linhasFinais
    .filter(l => l.codigoConta.startsWith("416") || l.codigoConta.startsWith("417"))
    .reduce((acc, l) => acc + Math.abs(l.valor || 0), 0);

  const depreciacoes = Math.abs(rDep.valorCalculado);

  const custoTotal = impostos + pessoalFinal + encargos + provisoes + beneficios +
    servicos + materiais + despesasGerais + depreciacoes;

  const resultado = receita - custoTotal;
  const ebitda = resultado + depreciacoes;
  const margem = receita > 0 ? resultado / receita : 0;
  const margemEbitda = receita > 0 ? ebitda / receita : 0;

  if (estimativas.length > 0) {
    alertas.push(`🟡 ${estimativas.length} conta(s) estimadas por regras automáticas`);
  }

  return {
    pec,
    competencia,
    receita,
    impostos,
    pessoal: pessoalFinal,
    encargos,
    provisoesTrabalhistas: provisoes,
    beneficios,
    servicos,
    materiais,
    despesasGerais,
    depreciacoes,
    resultado,
    ebitda,
    margem,
    margemEbitda,
    linhas: linhasFinais,
    alertas,
    estimativas,
  };
}


/** Payload recebido do formulÃ¡rio no route.ts (POST). */
export interface PayloadFinanceiro {
  jobModule: string;
  title: string;
  pec: string;
  period: string;
  revenue: number;
  laborCost: number;
  dissidioPercent: number;
  database: string;
  contractAdjustmentPercent: number;
  contractAdjustmentDate: string;
  budgetValidity: string;
  notes: string;
}

/** Cada arquivo salvo, com seu resultado de parsing (ou erro). */
export interface ArquivoSalvoComParse {
  id?: string;
  fileName?: string;
  label?: string;
  url?: string;
  parsed: {
    tipo: string;
    competencia: string | null;
    pecs: Array<{ pec: string; linhas: LinhaDRE[] }>;
    mesesDisponiveis: string[];
    erros: string[];
    totalLinhas: number;
  } | null;
  parseError?: string;
  [key: string]: unknown;
}

export interface ResultadoFinanceiroFinal {
  pec: string;
  competencia: string;
  resultado: ResultadoProvisao;
  arquivosProcessados: number;
  arquivosComErro: number;
  avisos: string[];
}

/**
 * Funde as LinhaDRE[] de mÃºltiplos arquivos parseados (7.5, 9.1,
 * 8.2.1) em uma lista Ãºnica. Como aplicarRegrasPEC classifica tudo
 * por codigoConta, a origem do arquivo nÃ£o importa â€” o motor jÃ¡
 * sabe separar PESSOAL, ENCARGOS, BENEFICIOS etc. pelo prefixo do
 * cÃ³digo da conta.
 */
function fundirLinhasDeArquivos(arquivos: ArquivoSalvoComParse[]): LinhaDRE[] {
  const todasLinhas: LinhaDRE[] = [];

  for (const arquivo of arquivos) {
    if (!arquivo.parsed) continue;
    for (const pecData of arquivo.parsed.pecs) {
      todasLinhas.push(...pecData.linhas);
    }
  }

  return todasLinhas;
}

/**
 * Monta um histÃ³rico mÃ­nimo a partir dos meses disponÃ­veis nos
 * prÃ³prios arquivos enviados (a 7.5 normalmente jÃ¡ traz vÃ¡rias
 * competÃªncias passadas em colunas â€” aqui usamos apenas a
 * competÃªncia mais recente como "atual"; o histÃ³rico completo de
 * meses anteriores pode ser enriquecido depois, quando o mÃ³dulo de
 * persistÃªncia de histÃ³rico (jobs-db) acumular execuÃ§Ãµes passadas).
 */
function montarContextoHistoricoVazio(): ContextoHistorico {
  return {
    historico: {},
    receitas: {},
    folha: {},
  };
}

/**
 * FunÃ§Ã£o principal: recebe o payload do formulÃ¡rio e os arquivos jÃ¡
 * salvos/parseados, funde as linhas de todas as planilhas, e aplica
 * o motor de regras (aplicarRegrasPEC) para gerar o resultado final
 * da provisÃ£o/diagnÃ³stico financeiro.
 *
 * Esta Ã© a funÃ§Ã£o que estava sendo importada pelo route.ts mas nunca
 * tinha sido implementada â€” corrigida em 21/06/2026.
 */
export function generateFinancialContractResult(
  payload: PayloadFinanceiro,
  savedFiles: ArquivoSalvoComParse[]
): ResultadoFinanceiroFinal {
  const avisos: string[] = [];

  const arquivosComErro = savedFiles.filter((f) => !f.parsed || f.parseError).length;
  if (arquivosComErro > 0) {
    avisos.push(
      `${arquivosComErro} arquivo(s) nÃ£o puderam ser interpretados e foram ignorados no cÃ¡lculo.`
    );
  }

  const linhasFundidas = fundirLinhasDeArquivos(savedFiles);

  if (linhasFundidas.length === 0) {
    avisos.push(
      "Nenhuma linha de conta foi extraÃ­da dos arquivos enviados. " +
        "O resultado abaixo estÃ¡ zerado â€” verifique se os arquivos estÃ£o no formato correto (7.5, 9.1 ou 8.2.1)."
    );
  }

  // CompetÃªncia: usa a informada manualmente no formulÃ¡rio (payload.period);
  // se ausente, tenta usar a competÃªncia detectada no primeiro arquivo vÃ¡lido.
  const competenciaDetectada =
    savedFiles.find((f) => f.parsed?.competencia)?.parsed?.competencia ?? null;
  const competencia = payload.period || competenciaDetectada || "NÃƒO INFORMADA";

  const pec = payload.pec || "GERAL";

  const ctx = montarContextoHistoricoVazio();

  // Sem histÃ³rico de meses anteriores persistido ainda (mÃ³dulo de
  // jobs-db nÃ£o acumula histÃ³rico entre execuÃ§Ãµes nesta versÃ£o).
  const mesesAnteriores: string[] = [];

  const resultado = aplicarRegrasPEC(pec, competencia, linhasFundidas, ctx, mesesAnteriores);

  // Se a receita informada manualmente no formulÃ¡rio for maior que a
  // detectada nas planilhas (ex: usuÃ¡rio quer simular um cenÃ¡rio),
  // ela prevalece sobre o valor extraÃ­do dos arquivos.
  if (payload.revenue > 0 && resultado.receita === 0) {
    avisos.push(
      "Receita nÃ£o identificada nas planilhas â€” usando o valor informado manualmente no formulÃ¡rio."
    );
    resultado.receita = payload.revenue;
    resultado.resultado = resultado.receita - (resultado.resultado - resultado.receita) * -1;
  }

  return {
    pec,
    competencia,
    resultado,
    arquivosProcessados: savedFiles.length,
    arquivosComErro,
    avisos: [...avisos, ...resultado.alertas],
  };
}

