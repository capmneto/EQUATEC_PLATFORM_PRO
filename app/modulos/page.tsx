import Link from "next/link";

const modules = [
  {
    title: "Gestão de Obras",
    description: "Controle físico-financeiro, etapas, documentos, medições, fotos, cotações, pendências e evolução da obra.",
  },
  {
    title: "Gestão de Franquias e Sociedades",
    description: "Pacote para controle de sócios, financeiro, mobilização, garantias, ativos, ocorrências, rotinas operacionais e modelos como FACILMART.",
  },
  {
    title: "IA Corporativa",
    description: "Agentes e recursos de IA para documentos, decisões, diagnósticos, análise de dados, produtividade e padronização.",
  },
  {
    title: "Cursos EAD",
    description: "Capacitação com trilhas, aulas, conteúdos técnicos, treinamentos corporativos e gestão de aprendizagem.",
  },
  {
    title: "Ferramentas de Engenharia",
    description: "Checklists, modelos, cálculos, planos de ação, relatórios, templates e ferramentas técnicas para gestão e engenharia.",
  },
  {
    title: "Automação via n8n",
    description: "Fluxos automatizados para integrar sistemas, formulários, notificações, aprovações, documentos e rotinas.",
  },
  {
    title: "Dashboards Executivos",
    description: "Painéis gerenciais para acompanhamento de indicadores, obras, tarefas, financeiro, produtividade e visão executiva.",
  },
  {
    title: "HUB BONUS",
    description: "Área especial com prompts, modelos, templates, agentes de apoio, materiais técnicos, ferramentas extras e recursos complementares.",
  },
];

const solutions = [
  "Desenvolvimento de Sites e Plataformas",
  "Fluxos de Trabalho com Automação e IA",
  "Criação de Chatbots e Agentes Inteligentes",
  "Treinamentos e Cursos de IA Aplicada à Gestão",
];

export default function ModulosPage() {
  return (
    <main className="page">
      <section className="container simple-page">
        <span className="badge">Módulos e Soluções</span>
        <h1>Módulos do Ecossistema EQUATEC</h1>
        <p>
          A plataforma foi estruturada para evoluir em módulos, mantendo rastreabilidade,
          controle, governança técnica e abertura para soluções digitais com IA, automação,
          chatbots, sites, plataformas e treinamentos.
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {modules.map((module) => (
              <div key={module.title} className="card module-card">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <div style={{ marginTop: 18 }}>
                  <Link href="/cadastro" className="btn btn-outline">Solicitar acesso</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card">
            <span className="badge">Soluções Digitais</span>
            <h2 className="card-title-large">Serviços integrados ao posicionamento da EQUATEC</h2>
            <p>
              Além dos módulos do sistema, a EQUATEC também estrutura soluções digitais
              para apoiar empresas, profissionais técnicos, operações, franquias e áreas de gestão.
            </p>
          </div>
          <div className="grid grid-2 compact-grid">
            {solutions.map((solution) => (
              <div className="card mini-card" key={solution}><h3>{solution}</h3></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
