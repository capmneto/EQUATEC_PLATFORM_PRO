import FinanceiroWorkflowClient from "../FinanceiroWorkflowClient";

export default function DiagnosticoContratoPage() {
  return (
    <FinanceiroWorkflowClient
      moduleKey="diagnostico"
      title="Diagnóstico do Contrato"
      subtitle="Raio-X contratual para comparar base de precificação, 7.5, 9.1 e 8.2.1, identificando limites, estouros, comportamento de contas, fornecedores e lançamentos suspeitos."
      fileLabels={[
        "Base de precificação: PEC / DFP Horizontal / DFP Vertical / PPU",
        "Planilha 7.5 configurada como PEC / CONTA / CONTA SUP",
        "Planilha 9.1 configurada como PEC / CONTA / CONTA SUP / FORNECEDOR",
        "Planilha 8.2.1 configurada como PEC / CONTA CONTÁBIL / VERBA DE PAGAMENTO",
      ]}
    />
  );
}
