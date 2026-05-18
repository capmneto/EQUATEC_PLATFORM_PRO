import Link from "next/link";

const areas = [
  "Gestão da Manutenção Industrial",
  "Gestão de Obras",
  "HVAC, PMOC e Qualidade do Ar Interior",
  "Gestão de Ativos e Confiabilidade",
  "Segurança do Trabalho e Conformidade",
  "Indicadores, BI e Gestão de Dados",
  "IA aplicada à Gestão",
  "Treinamentos e Capacitação Técnica",
];

const creas = ["CREA-AL", "CREA-RJ", "CREA-ES", "CREA-SP", "CREA-MG", "CREA-PB", "CREA-PE", "CREA-RN"];

export default function SobrePage() {
  return (
    <main className="page">
      <section className="container simple-page about-page">
        <div className="grid grid-2 about-hero">
          <div>
            <span className="badge">Sobre Carlos Machado</span>
            <h1>Engenharia, gestão e tecnologia aplicadas à rotina real.</h1>
            <p>
              Carlos Machado é Engenheiro Mecânico, Engenheiro de Segurança do Trabalho
              e executivo técnico com mais de 12 anos de experiência na liderança de
              operações de manutenção industrial, facilities e projetos de engenharia em
              ambientes de alta criticidade operacional.
            </p>
            <p>
              Natural de Campos dos Goytacazes/RJ e atualmente radicado em Maceió/AL,
              atua na integração entre engenharia, manutenção, gestão, dados, indicadores,
              segurança, qualidade e inteligência artificial aplicada à gestão.
            </p>
            <div className="hero-actions">
              <Link href="https://wa.me/5522998578981" target="_blank" className="btn btn-primary">Falar no WhatsApp</Link>
              <Link href="https://www.linkedin.com/in/carlos-machado-95917433/" target="_blank" className="btn btn-outline">Ver LinkedIn</Link>
            </div>
          </div>

          <div className="card profile-card-center">
            <img src="/home/carlos-machado.jpg" alt="Carlos Machado" className="profile-photo profile-photo-large" />
            <h2>Carlos Machado</h2>
            <p>Gestão da Manutenção Industrial • Engenharia Especializada • Soluções com IA aplicada à Gestão</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card">
            <span className="badge">Trajetória</span>
            <h2 className="card-title-large">Atuação em ambientes críticos e operações multidisciplinares.</h2>
            <p>
              Sua trajetória profissional foi construída em segmentos como petroquímico,
              automotivo, oil & gas, instituições financeiras, infraestrutura predial,
              facilities e manutenção industrial, atuando diretamente na gestão de contratos,
              mobilização de equipes, planejamento, custos, segurança e performance operacional.
            </p>
            <p>
              Ao longo da carreira, liderou estruturas permanentes com grandes equipes e
              mobilizações em paradas de manutenção, coordenando disciplinas como mecânica,
              caldeiraria, elétrica, instrumentação, refrigeração, HVAC e planejamento.
            </p>
          </div>

          <div className="card">
            <span className="badge">Formação e Especializações</span>
            <ul className="clean-list">
              <li>Engenharia Mecânica</li>
              <li>Engenharia de Segurança do Trabalho</li>
              <li>Pós-graduação em Engenharia e Gerenciamento de Manutenção</li>
              <li>MBA em Gestão de Projetos</li>
              <li>Especialização em Engenharia do Ar-Condicionado / HVAC</li>
              <li>Especialização em Inteligência Artificial com Ênfase em Negócios</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Áreas de atuação</h2>
            <p>Integração entre conhecimento técnico, visão executiva e uso estratégico de tecnologia.</p>
          </div>
          <div className="grid grid-4">
            {areas.map((area) => (
              <div className="card mini-card" key={area}><h3>{area}</h3></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card">
            <span className="badge">CREAs vinculados</span>
            <h2 className="card-title-large">Atuação técnica em múltiplas regiões.</h2>
            <div className="pill-grid">
              {creas.map((crea) => <span className="pill" key={crea}>{crea}</span>)}
            </div>
          </div>
          <div className="card">
            <span className="badge">Equatec</span>
            <h2 className="card-title-large">Consultoria, serviços especializados e tecnologia aplicada.</h2>
            <p>
              Por meio da EQUATEC, Carlos Machado disponibiliza consultoria, treinamentos,
              produção técnica, ferramentas inteligentes, desenvolvimento de plataformas,
              automações, chatbots e soluções com IA aplicada à gestão técnica e operacional.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
