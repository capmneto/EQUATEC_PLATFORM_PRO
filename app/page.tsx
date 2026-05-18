import Link from "next/link";

const modules = [
  {
    title: "Gestão de Obras",
    description:
      "Controle físico-financeiro, etapas, documentos, medições, fotos, pendências, evolução da obra e histórico das decisões.",
  },
  {
    title: "Gestão de Franquias e Sociedades",
    description:
      "Pacote para controle societário, financeiro, mobilização, ativos, garantias, ocorrências e rotinas operacionais, incluindo FACILMART como aplicação prática.",
  },
  {
    title: "IA Corporativa",
    description:
      "Agentes e recursos de inteligência artificial para documentos, decisões, diagnósticos, dados, produtividade e padronização de processos.",
  },
  {
    title: "Cursos EAD",
    description:
      "Trilhas, aulas, conteúdos técnicos, treinamentos corporativos e gestão de aprendizagem aplicada à rotina operacional.",
  },
  {
    title: "Ferramentas de Engenharia",
    description:
      "Checklists, modelos, cálculos, planos de ação, relatórios e templates para engenharia, manutenção, obras e gestão.",
  },
  {
    title: "Automação via n8n",
    description:
      "Fluxos automatizados para integrar sistemas, formulários, notificações, aprovações, alertas, documentos e rotinas.",
  },
  {
    title: "Dashboards Executivos",
    description:
      "Painéis gerenciais para indicadores, obras, tarefas, financeiro, treinamentos, produtividade e visão executiva da operação.",
  },
  {
    title: "HUB BONUS",
    description:
      "Área especial com ferramentas extras, prompts, modelos, agentes de apoio, materiais técnicos, templates e recursos digitais complementares.",
  },
];

const deliveries = [
  "Centralização de informações",
  "Controle de tarefas e prazos",
  "Organização documental",
  "Automação de processos",
  "Apoio com IA corporativa",
  "Dashboards executivos",
  "Rastreabilidade e histórico",
  "Padronização da gestão",
];

const digitalSolutions = [
  {
    title: "Sites e Plataformas Digitais",
    description:
      "Desenvolvimento de páginas institucionais, portais, áreas de acesso, sistemas internos e plataformas digitais sob medida.",
  },
  {
    title: "Fluxos de Trabalho com Automação e IA",
    description:
      "Modelagem de processos, integração com n8n, formulários inteligentes, alertas, aprovações e rotinas automatizadas.",
  },
  {
    title: "Chatbots e Agentes Inteligentes",
    description:
      "Criação de chatbots para atendimento, consulta documental, suporte técnico, treinamento, gestão e rotinas administrativas.",
  },
  {
    title: "Treinamentos de IA Aplicada à Gestão",
    description:
      "Capacitações práticas para aplicar IA em manutenção, engenharia, contratos, documentos, indicadores e tomada de decisão.",
  },
];

function ContactIconLinks() {
  return (
    <div className="quick-links" aria-label="Canais rápidos de contato">
      <Link href="https://wa.me/5522998578981" target="_blank" className="quick-link whatsapp">
        <span className="quick-icon">☎</span>
        <span>WhatsApp</span>
      </Link>
      <Link href="mailto:equatec.comserv@gmail.com" className="quick-link email">
        <span className="quick-icon">@</span>
        <span>E-mail</span>
      </Link>
      <Link href="https://www.linkedin.com/in/carlos-machado-95917433/" target="_blank" className="quick-link linkedin">
        <span className="quick-icon">in</span>
        <span>LinkedIn</span>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge">EQUATEC — Tecnologia, Gestão e IA aplicada</span>

            <h1>
              Ecossistema para obras, empresas, engenharia, franquias, IA e decisões executivas.
            </h1>

            <p>
              A EQUATEC integra gestão de obras, gestão de franquias e sociedades,
              IA corporativa, cursos EAD, ferramentas de engenharia, automações via
              n8n, chatbots, desenvolvimento de plataformas digitais, dashboards
              executivos e HUB BONUS em uma base modular para transformar
              informações dispersas em controle, produtividade e tomada de decisão.
            </p>

            <div className="hero-actions">
              <Link href="/login" className="btn btn-primary">Acessar Plataforma</Link>
              <Link href="/cadastro" className="btn btn-outline">Solicitar Acesso</Link>
              <Link href="/modulos" className="btn btn-outline">Conhecer Módulos</Link>
              <Link href="https://wa.me/5522998578981" target="_blank" className="btn btn-outline">Falar no WhatsApp</Link>
            </div>

            <ContactIconLinks />
          </div>

          <aside className="profile-hero card">
            <img src="/home/carlos-machado.jpg" alt="Carlos Machado" className="profile-photo" />
            <div>
              <span className="badge">Idealizador do Ecossistema</span>
              <h2>Carlos Machado</h2>
              <p>
                Gestão da Manutenção Industrial • Engenharia Especializada • Soluções com Inteligência Artificial.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="ecossistema" className="section">
        <div className="container">
          <div className="section-title">
            <h2>O que o Ecossistema EQUATEC entrega</h2>
            <p>
              Um ambiente digital estruturado para apoiar profissionais e empresas que
              precisam sair da gestão fragmentada por planilhas, mensagens, arquivos
              soltos e controles manuais.
            </p>
          </div>

          <div className="grid grid-4">
            {deliveries.map((item) => (
              <div key={item} className="card mini-card">
                <h3>{item}</h3>
                <p>Organização, rastreabilidade e padronização para melhorar a rotina operacional.</p>
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
              Estrutura modular preparada para evoluir com segurança, sem quebrar a base funcional do sistema.
            </p>
          </div>

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

      <section className="section highlight-section">
        <div className="container grid grid-2">
          <div className="card">
            <span className="badge">Soluções Digitais EQUATEC</span>
            <h2 className="card-title-large">Serviços para transformar processos técnicos em plataformas digitais.</h2>
            <p>
              Além dos módulos internos, a EQUATEC estrutura soluções digitais para empresas,
              profissionais técnicos, operações, franquias, sociedades e áreas de gestão que
              precisam de automação, IA, dados e controle.
            </p>
          </div>

          <div className="grid grid-2 compact-grid">
            {digitalSolutions.map((solution) => (
              <div key={solution.title} className="card service-card">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card">
            <span className="badge">HUB BONUS</span>
            <h2 className="card-title-large">Uma área especial para acelerar a gestão com recursos extras.</h2>
            <p>
              O HUB BONUS será a área de valor agregado do ecossistema, reunindo modelos,
              prompts, agentes de apoio, templates, checklists, materiais técnicos,
              ferramentas digitais e conteúdos complementares para produtividade e tomada de decisão.
            </p>
          </div>

          <div className="card">
            <span className="badge">IA, Automação e Decisão</span>
            <h2 className="card-title-large">A IA como camada de apoio à rotina real.</h2>
            <p>
              A inteligência artificial entra como suporte para análise de documentos,
              geração de relatórios, classificação de demandas, chatbots especializados,
              automações, treinamentos e painéis inteligentes — sempre com governança,
              rastreabilidade e validação humana.
            </p>
            <div className="hero-actions">
              <Link href="/sobre" className="btn btn-primary">Conhecer a visão técnica</Link>
              <Link href="/contato" className="btn btn-outline">Falar com a EQUATEC</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
