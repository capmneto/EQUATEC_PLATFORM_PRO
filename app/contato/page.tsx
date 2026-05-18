import Link from "next/link";

const contacts = [
  {
    title: "WhatsApp Principal",
    value: "+55 22 99857-8981",
    href: "https://wa.me/5522998578981",
    icon: "☎",
    description: "Canal direto para conversas rápidas, solicitações e alinhamentos iniciais.",
  },
  {
    title: "WhatsApp EQUATEC",
    value: "+55 82 99332-1495",
    href: "https://wa.me/5582993321495",
    icon: "☏",
    description: "Contato comercial para serviços, treinamentos, plataformas e soluções digitais.",
  },
  {
    title: "E-mail",
    value: "equatec.comserv@gmail.com",
    href: "mailto:equatec.comserv@gmail.com",
    icon: "@",
    description: "Envie propostas, documentos, demandas técnicas ou solicitações comerciais.",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/carlos-machado-95917433",
    href: "https://www.linkedin.com/in/carlos-machado-95917433/",
    icon: "in",
    description: "Conheça a trajetória profissional, publicações e rede técnica de Carlos Machado.",
  },
];

export default function ContatoPage() {
  return (
    <main className="page">
      <section className="container simple-page contact-page">
        <div className="grid grid-2 about-hero">
          <div>
            <span className="badge">Contato</span>
            <h1>Fale com a EQUATEC</h1>
            <p>
              Solicite acesso, converse sobre desenvolvimento de sites e plataformas,
              automações com IA, chatbots, treinamentos, gestão de obras, franquias,
              sociedades, engenharia ou estruturação do seu próprio ecossistema digital.
            </p>
            <div className="hero-actions">
              <Link href="https://wa.me/5522998578981" target="_blank" className="btn btn-primary">Falar agora no WhatsApp</Link>
              <Link href="mailto:equatec.comserv@gmail.com" className="btn btn-outline">Enviar e-mail</Link>
            </div>
          </div>
          <div className="card profile-card-center">
            <img src="/home/carlos-machado.jpg" alt="Carlos Machado" className="profile-photo profile-photo-large" />
            <h2>Carlos Machado</h2>
            <p>Engenharia Especializada • Gestão • Tecnologia • IA aplicada</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Canais de acesso rápido</h2>
            <p>Clique no canal desejado para abrir diretamente WhatsApp, e-mail ou LinkedIn.</p>
          </div>

          <div className="grid grid-4">
            {contacts.map((contact) => (
              <Link href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} className="card contact-card" key={contact.title}>
                <div className="contact-icon">{contact.icon}</div>
                <h3>{contact.title}</h3>
                <strong>{contact.value}</strong>
                <p>{contact.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card cta-card">
          <span className="badge">Solicitação inicial</span>
          <h2>Quer transformar uma ideia, processo ou operação em uma solução digital?</h2>
          <p>
            Envie uma mensagem com o contexto da sua necessidade. A EQUATEC pode apoiar desde
            a concepção do fluxo até a criação de plataformas, automações, chatbots, treinamentos
            e dashboards executivos.
          </p>
          <div className="hero-actions">
            <Link href="/cadastro" className="btn btn-primary">Solicitar acesso</Link>
            <Link href="https://wa.me/5522998578981" target="_blank" className="btn btn-outline">Conversar no WhatsApp</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
