import FinanceiroWorkflowClient from "../FinanceiroWorkflowClient";

export default function ProvisaoMensalPage() {
  return (
    <FinanceiroWorkflowClient
      moduleKey="provisao"
      title="Provisão de Resultado Mensal"
      subtitle="Motor mensal para estimar Resultado e EBITDA do contrato com base em custos, folha, histórico 7.5, 9.1, 8.2.1, faturamento estimado e regras críticas de provisão."
      showProvisionFields
      fileLabels={[
        "Planilha de provisão mensal",
        "Lançamentos de custos / Portal GPS",
        "Folha e pessoal",
        "Planilha 7.5 analítica ou por PEC / CONTA / CONTA SUP",
        "Planilha 9.1 por PEC / CONTA / CONTA SUP / FORNECEDOR",
        "Planilha 8.2.1 por PEC / CONTA CONTÁBIL / VERBA DE PAGAMENTO",
      ]}
    />
  );
}
