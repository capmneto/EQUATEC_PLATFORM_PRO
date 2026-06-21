import Link from "next/link";
import type { Metadata } from "next";
import { modulos } from "@/lib/content/modulos";

export const metadata: Metadata = {
  title: "Módulos EQUATEC | Gestão de Contratos, Obras, PMOC e Confiabilidade Humana",
  description:
    "Conheça os 6 módulos do ecossistema EQUATEC: Gestão de Contratos (BID AI, DRE, Orçamento), Gestão de Obras, Mercados Autônomos, PMOC AI, Confiabilidade Humana 360 e Fabricação de Estruturas.",
};

export default function ModulosPage() {
  return (
    <main className="page">
      <section className="container simple-page">
        <span className="badge">Ecossistema EQUATEC</span>
        <h1>Módulos para Gestão de Engenharia e Manutenção Industrial</h1>
        <p>
          Seis módulos integrados que cobrem todo o ciclo de gestão técnica e
          comercial: da proposta ao contrato, da obra à operação, da
          fabricação de estruturas à confiabilidade humana em campo.
        </p>
      </section>

      {modulos.map((modulo, index) => (
        <section
          key={modulo.slug}
          id={modulo.slug}
          className="section"
          style={{
            background: index % 2 === 1 ? "rgba(15,23,42,0.4)" : "transparent",
          }}
        >
          <div className="container">
            <div className="section-title">
              <span className="badge">{modulo.badge}</span>
              <h2>{modulo.titulo}</h2>
              <p>{modulo.resumo}</p>
            </div>

            <div className="grid grid-3">
              <div className="card">
                <h3>Problema que resolve</h3>
                <p>{modulo.problema}</p>
              </div>
              <div className="card">
                <h3>Como funciona</h3>
                <p>{modulo.solucao}</p>
              </div>
              <div className="card">
                <h3>Resultado esperado</h3>
                <p>{modulo.resultado}</p>
              </div>
            </div>

            {modulo.subFuncoes && modulo.subFuncoes.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ marginBottom: 16 }}>Sub-funções do módulo</h3>
                <div className="grid grid-2">
                  {modulo.subFuncoes.map((sub) => (
                    <div className="card" key={sub.nome}>
                      <strong>{sub.nome}</strong>
                      <p>{sub.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 32 }}>
              <strong>Público-alvo: </strong>
              <span className="pill-grid">
                {modulo.publicoAlvo.map((p) => (
                  <span className="pill" key={p}>
                    {p}
                  </span>
                ))}
              </span>
            </div>

            <div className="hero-actions" style={{ marginTop: 32 }}>
              <Link href="/contato" className="btn btn-primary">
                {modulo.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Pronto para estruturar a gestão do seu contrato ou obra?</h2>
          <p>
            Fale diretamente com Carlos Machado para entender qual módulo se
            encaixa na sua operação.
          </p>
          <div className="hero-actions">
            <a
              href="https://wa.me/5522998578981"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Conversar no WhatsApp
            </a>
            <Link href="/cadastro" className="btn btn-outline">
              Solicitar Acesso
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
