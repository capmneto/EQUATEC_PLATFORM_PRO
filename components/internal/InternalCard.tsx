type InternalCardProps = {
  title: string;
  description: string;
  status?: string;
  href?: string;
};

export function InternalCard({
  title,
  description,
  status = "Em desenvolvimento",
  href,
}: InternalCardProps) {
  const content = (
    <div
      className="card"
      style={{
        minHeight: 168,
        padding: 22,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <span
        className="badge"
        style={{
          display: "inline-flex",
          width: "fit-content",
          maxWidth: "100%",
          fontSize: 9,
          padding: "5px 9px",
          marginBottom: 14,
          whiteSpace: "normal",
          lineHeight: 1.2,
        }}
      >
        {status}
      </span>

      <h3
        style={{
          fontSize: "clamp(20px, 1.25vw, 25px)",
          lineHeight: 1.12,
          margin: 0,
          letterSpacing: "-0.03em",
          maxWidth: "100%",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "clamp(14px, 0.9vw, 16px)",
          lineHeight: 1.48,
          marginTop: 16,
          marginBottom: 0,
          maxWidth: "100%",
        }}
      >
        {description}
      </p>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} style={{ display: "block", height: "100%" }}>
      {content}
    </a>
  );
}
