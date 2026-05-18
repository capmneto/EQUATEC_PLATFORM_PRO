import Link from "next/link";

const modules = [
  "Gestão de Obras",
  "FACILMART",
  "IA Corporativa",
  "Cursos EAD",
  "Ferramentas de Engenharia",
  "Automação via n8n",
  "Dashboards Executivos",
];

const deliveries = [
  "Centralização de informações",
  "Controle de tarefas e prazos",
  "Organização documental",
  "Automação de processos",
  "Apoio com IA corporativa",
  "Dashboards executivos",
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge">EQUATEC — Tecnologia e Gestão Integrada</span>

            <h1>
              Ecossistema para obras, empresas, engenharia, IA e decisões executivas.
            </h1>

            <p>
              A EQUATEC integra gestão de obras, FACILMART, IA corporativa,
              cursos EAD, ferramentas de engenharia, automações via n8n e
              dashboards executivos em uma plataforma modular criada para
              transformar informações dispersas em controle, produtividade e
              tomada de decisão.
            </p>

            <div className="hero-actions">
              <Link href="/login" className="btn btn-primary">
                Acessar Plataforma
              </Link>
              <Link href="/cadastro" className="btn btn-outline">
                Solicitar Acesso
              </Link>
              <Link href="/modulos" className="btn btn-outline">
                Conhecer Módulos
              </Link>
              <Link
                href="https://wa.me/5522998578981"
                target="_blank"
                className="btn btn-outline"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </div>

          <aside className="card hero-panel">
            <div>
              <span className="badge">Control Hub</span>
              <h2>
                Uma base digital para organizar tarefas, documentos, módulos,
                dados e decisões.
              </h2>
            </div>

            <div className="kpi-grid">
              <div className="kpi">
                <strong>7</strong>
                <span>Módulos estratégicos</span>
              </div>
              <div className="kpi">
                <strong>IA</strong>
                <span>Apoio à gestão</span>
              </div>
              <div className="kpi">
                <strong>n8n</strong>
                <span>Automação operacional</span>
              </div>
              <div className="kpi">
                <strong>BI</strong>
                <span>Visão executiva</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="ecossistema" className="section">
        <div className="container">
          <div className="section-title">
            <h2>O que o Ecossistema EQUATEC entrega</h2>
            <p>
              Um ambiente digital estruturado para apoiar profissionais e empresas
              que precisam sair da gestão fragmentada por planilhas, mensagens,
              arquivos soltos e controles manuais.
            </p>
          </div>

          <div className="grid grid-3">
            {deliveries.map((item) => (
              <div key={item} className="card">
                <h3>{item}</h3>
                <p>
                  Organização, rastreabilidade e padronização para melhorar a
                  rotina operacional e a tomada de decisão.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="modulos">
        <div className="container">
          <div className="section-title">
            <h2>Módulos do Ecossistema</h2>
            <p>
              Estrutura modular preparada para evoluir de forma segura, sem
              quebrar a base funcional do sistema.
            </p>
          </div>

          <div className="grid grid-3">
            {modules.map((module) => (
              <div key={module} className="card">
                <h3>{module}</h3>
                <p>
                  Módulo integrado ao ecossistema EQUATEC para apoiar controle,
                  produtividade, rastreabilidade e gestão orientada a dados.
                </p>
                <div style={{ marginTop: 18 }}>
                  <Link href="/cadastro" className="btn btn-outline">
                    Solicitar acesso
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card">
            <span className="badge">Tarefas e Rotinas</span>
            <h2 style={{ marginTop: 18, fontSize: 38, letterSpacing: "-0.04em" }}>
              Transforme processos soltos em fluxos rastreáveis.
            </h2>
            <p>
              O Ecossistema EQUATEC apoia a rotina real do usuário: registrar
              demandas, controlar prazos, acompanhar pendências, anexar
              evidências, consultar histórico e organizar decisões.
            </p>
          </div>

          <div className="card">
            <span className="badge">Carlos Machado</span>
            <h2 style={{ marginTop: 18, fontSize: 38, letterSpacing: "-0.04em" }}>
              Desenvolvido por quem vive a gestão técnica na prática.
            </h2>
            <p>
              Carlos Machado é Engenheiro Mecânico, Engenheiro de Segurança do
              Trabalho e executivo técnico com atuação em manutenção industrial,
              facilities, HVAC, PMOC, gestão de ativos, indicadores, BI e IA
              aplicada à gestão.
            </p>
            <div className="hero-actions">
              <Link
                href="https://www.linkedin.com/in/carlos-machado-95917433/"
                target="_blank"
                className="btn btn-primary"
              >
                Ver LinkedIn
              </Link>
              <Link href="/sobre" className="btn btn-outline">
                Conhecer Biografia
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
