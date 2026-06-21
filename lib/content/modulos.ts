// lib/content/modulos.ts
// Conteúdo estruturado dos 6 módulos iniciais do ecossistema EQUATEC.
// Usado por app/modulos/page.tsx para renderizar as seções públicas (SEO).
// Centralizar aqui evita duplicar texto e facilita futura geração de
// landing pages individuais (/modulos/[slug]) caso o projeto evolua para isso.

export type ModuloSubFuncao = {
  nome: string;
  descricao: string;
};

export type Modulo = {
  slug: string;
  badge: string;
  titulo: string;
  resumo: string;
  problema: string;
  solucao: string;
  resultado: string;
  subFuncoes?: ModuloSubFuncao[];
  publicoAlvo: string[];
  ctaLabel: string;
};

export const modulos: Modulo[] = [
  {
    slug: "gestao-de-contratos",
    badge: "Gestão de Contratos",
    titulo: "Gestão de Contratos de Manutenção Industrial",
    resumo:
      "Visibilidade financeira e técnica em tempo real sobre a saúde de cada contrato — sem esperar o fechamento mensal para descobrir desvios.",
    problema:
      "Coordenadores e gestores de contratos decidem sobre orçamento, margem e propostas comerciais usando planilhas manuais, dados atrasados e cálculos sujeitos a erro humano.",
    solucao:
      "Módulo integrado com Análise de Saúde do Contrato, Análise de DRE, Análise de Propostas Técnicas e Editais, BID AI (precificação de propostas) e Gestão Orçamentária de Contratos — todos alimentados pela mesma base de dados, com rastreabilidade de premissas e alertas automáticos de desvio.",
    resultado:
      "Redução do tempo de fechamento de provisão mensal de dias para horas, eliminação de erros de duplicidade contábil e precificação de propostas com rastreabilidade total — já validado em contratos reais com a Braskem (correção de discrepância de R$ 113K/mês identificada via auditoria).",
    subFuncoes: [
      {
        nome: "Análise de Saúde do Contrato",
        descricao:
          "Dashboard de margem realizada vs. orçada, com alertas automáticos de desvio acima de 10–15% e identificação precoce de contas que historicamente atrasam (prêmios, assistência médica, provisões trabalhistas).",
      },
      {
        nome: "Análise de DRE",
        descricao:
          "Demonstrativo de resultado mensal gerado automaticamente a partir dos relatórios-fonte do contrato, com células marcadas por origem (dado real vs. estimativa por IA).",
      },
      {
        nome: "Análise de Propostas Técnicas e Editais",
        descricao:
          "Extração automática de tipo de contrato, efetivo, infraestrutura, condições de medição e prazo de pagamento a partir do edital, com checklist de perguntas geradas automaticamente.",
      },
      {
        nome: "BID AI",
        descricao:
          "Precificação de propostas comerciais por blocos de custo completos (mão de obra, encargos, benefícios, mobilização, impostos, BDI e lucro), com checklist obrigatório de contratação e cálculo automático de custo de capital conforme prazo de pagamento.",
      },
      {
        nome: "Gestão Orçamentária de Contratos",
        descricao:
          "Abertura de custos unitários por função, com alertas automáticos quando a fonte salarial é estimativa e não está confirmada por CCT/ACT vigente.",
      },
    ],
    publicoAlvo: ["Coordenador de Contrato", "Gerência Regional", "Time Comercial / BID", "Diretoria"],
    ctaLabel: "Conhecer Gestão de Contratos",
  },
  {
    slug: "gestao-de-obras",
    badge: "Gestão de Obras",
    titulo: "Gestão de Obras Residenciais, Comerciais e Industriais",
    resumo:
      "Cronograma físico-financeiro, documentação técnica e indicadores de avanço em um só lugar — do memorial descritivo à entrega final.",
    problema:
      "Acompanhamento de obras depende de planejamento, documentação técnica e controle de cronograma dispersos entre arquiteto, engenheiro e proprietário — sem rastreabilidade unificada de avanço físico-financeiro.",
    solucao:
      "Estrutura de cronograma físico-financeiro semana a semana, documentação técnica completa antes do início da obra (memorial descritivo, especificações, projetos complementares) e indicadores objetivos de avanço (CPI, SPI, desvio de custo e prazo).",
    resultado:
      "Cronograma rastreável evita retrabalho e divergência de interpretação com a construtora; documentação correta evita multas e embargos — caso real aplicado em residência de 189,40 m² com cronograma de 50 semanas e correção formal de divergência de área no CNO junto à prefeitura.",
    publicoAlvo: ["Proprietário / Investidor", "Engenheiro Fiscal", "Arquiteto Responsável", "Diretoria (contexto industrial)"],
    ctaLabel: "Conhecer Gestão de Obras",
  },
  {
    slug: "gestao-de-mercados-autonomos",
    badge: "Mercados Autônomos",
    titulo: "Gestão de Mercados Autônomos (Self-Checkout)",
    resumo:
      "Engenharia própria para estruturas físicas e gôndolas de mercados autônomos, com padrão de qualidade documentado e custo competitivo.",
    problema:
      "Empreendedores que abrem mercados autônomos dependem de fornecedores únicos no mercado para containers e gôndolas, sem alternativa de engenharia própria, rastreabilidade normativa ou controle de custo.",
    solucao:
      "Projeto técnico-comercial completo com memória de cálculo estrutural e elétrica conforme normas ABNT, plano de corte otimizado e gôndolas dimensionadas e validadas estruturalmente — não apenas \"compradas sem critério\".",
    resultado:
      "Padrão replicável em múltiplas unidades de franquia com o mesmo nível de qualidade garantido, e redução de custo de implantação por unidade frente ao fornecedor de referência do mercado — projeto EQUATEC MARKET com 92,4% de aproveitamento de material no plano de corte.",
    publicoAlvo: ["Franqueador / Diretor de Rede", "Investidor / Franqueado", "Engenheiro de Obras da Franquia"],
    ctaLabel: "Conhecer Mercados Autônomos",
  },
  {
    slug: "pmoc-ai",
    badge: "PMOC AI",
    titulo: "PMOC AI — Planos de Manutenção, Operação e Controle",
    resumo:
      "Conformidade legal e manutenção preditiva de sistemas de climatização e refrigeração, com inteligência sobre falhas e vida útil de componentes.",
    problema:
      "Planos de Manutenção, Operação e Controle (PMOC) — exigência legal pela Lei 13.589/2018 e Portaria 3.523/1998 — são elaborados e acompanhados manualmente, sem inteligência preditiva sobre falhas ou conformidade documental automatizada.",
    solucao:
      "Geração de cronograma PMOC por equipamento a partir de cadastro técnico, alertas preditivos de manutenção com base em histórico de falhas e documentação de conformidade pronta para fiscalização.",
    resultado:
      "Conformidade legal documentada e redução de paradas não programadas por climatização — módulo em desenvolvimento, com base no know-how de HVAC e refrigeração industrial aplicado em contratos reais de manutenção multidisciplinar.",
    publicoAlvo: ["Gestor de Facilities", "Técnico de Campo (Refrigeração)", "Cliente do Contrato de Facilities"],
    ctaLabel: "Conhecer PMOC AI",
  },
  {
    slug: "confiabilidade-humana-360",
    badge: "Confiabilidade Humana 360",
    titulo: "Confiabilidade Humana 360",
    resumo:
      "Prontidão cognitiva e gestão de riscos psicossociais para reduzir acidentes que têm origem na condição humana, não apenas no ambiente.",
    problema:
      "Acidentes e desvios de segurança em operações industriais e de transporte frequentemente têm origem na condição cognitiva ou psicossocial do colaborador — fadiga, baixa prontidão mental — que não é detectada pelos sistemas de gestão tradicionais (DDS, checklist de EPI).",
    solucao:
      "Avaliação de prontidão cognitiva antes da jornada, com segmentação por Grau de Higiene Ambiental (GHE), baseline individual adaptativo e protocolos de escalonamento automatizados para supervisores e SESMA.",
    resultado:
      "Redução de incidentes associados à fadiga, conformidade com a NR-01 (gestão de riscos psicossociais) com evidência documentada, e diferencial competitivo mensurável frente a soluções de mercado que não oferecem segmentação por GHE ou explicabilidade de IA.",
    publicoAlvo: ["Colaborador Operacional / Motorista", "Supervisor / Líder de Equipe", "SESMT / Saúde Ocupacional", "Diretoria / Cliente do Contrato"],
    ctaLabel: "Conhecer Confiabilidade Humana 360",
  },
  {
    slug: "fabricacao-de-estruturas-e-gondolas",
    badge: "Fabricação de Estruturas",
    titulo: "Fabricação de Estruturas e Gôndolas para Mercados Autônomos",
    resumo:
      "Estruturas metálicas com memória de cálculo, rastreabilidade normativa e padrão replicável — não apenas fabricação empírica.",
    problema:
      "Fabricantes de estruturas metálicas para varejo e mercados autônomos frequentemente entregam produtos sem memória de cálculo, sem rastreabilidade normativa e com risco estrutural não avaliado, gerando risco para o franqueador e para o usuário final.",
    solucao:
      "Família de displays modulares (Modelos A, B, C, Totem e Painel Aéreo) em metalon e OSB, com memória de cálculo estrutural documentada, plano de corte otimizado e responsabilidade técnica registrada.",
    resultado:
      "Estruturas com capacidade de carga comprovada por cálculo, padronização replicável em múltiplas unidades e franquias, e redução de custo de fabricação por otimização de plano de corte — já aplicado no projeto EQUATEC MARKET / FacilMart.",
    publicoAlvo: ["Diretor / Franqueador (Aprovador)", "Fabricante / Oficina", "Engenheiro Responsável"],
    ctaLabel: "Conhecer Fabricação de Estruturas",
  },
];
