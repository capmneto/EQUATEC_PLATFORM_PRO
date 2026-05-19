type InternalCardProps = {
  title: string;
  description: string;
  status?: string;
  href?: string;
};

export function InternalCard({ title, description, status = "Em estruturação", href }: InternalCardProps) {
  const content = (
    <div className="card" style={{ minHeight: 190 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
        <h3>{title}</h3>
        <span className="badge" style={{ fontSize: 10, padding: "6px 10px" }}>
          {status}
        </span>
      </div>

      <p>{description}</p>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} style={{ display: "block" }}>
      {content}
    </a>
  );
}
