import FinanceiroWorkflowClient from "../FinanceiroWorkflowClient";

export default function RevisaoOrcamentariaPage() {
  return (
    <FinanceiroWorkflowClient
      moduleKey="revisao"
      title="Revisão de Orçamento Contratual"
      subtitle="Composição de valores micro por conta contábil a partir de PEC, DFP ou PPU, considerando dissídio, database, reajuste contratual e histórico 7.5, 9.1 e 8.2.1."
      showRevisionFields
      fileLabels={[
        "Base macro: PEC / DFP Horizontal / DFP Vertical / PPU",
        "Histórico 7.5 por PEC / CONTA / CONTA SUP",
        "Histórico 9.1 por PEC / CONTA / CONTA SUP / FORNECEDOR",
        "Histórico 8.2.1 por PEC / CONTA CONTÁBIL / VERBA DE PAGAMENTO",
      ]}
    />
  );
}
