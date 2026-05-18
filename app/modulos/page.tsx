const modules = [
  "Gestão de Obras",
  "FACILMART",
  "IA Corporativa",
  "Cursos EAD",
  "Ferramentas de Engenharia",
  "Automação via n8n",
  "Dashboards Executivos",
];

export default function ModulosPage() {
  return (
    <main className="page">
      <section className="container simple-page">
        <span className="badge">Módulos</span>
        <h1>Módulos do Ecossistema EQUATEC</h1>
        <p>
          A plataforma foi estruturada para evoluir em módulos, mantendo
          rastreabilidade, controle e governança técnica.
        </p>

        <div className="grid grid-3" style={{ marginTop: 34 }}>
          {modules.map((module) => (
            <div key={module} className="card">
              <h3>{module}</h3>
              <p>Módulo previsto no roadmap do ecossistema.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
