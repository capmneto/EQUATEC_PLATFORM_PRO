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
        minHeight: 150,
        padding: 24,
        borderRadius: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          alignItems: "flex-start",
          marginBottom: 18,
        }}
      >
        <h3
          style={{
            fontSize: "clamp(22px, 1.6vw, 30px)",
            lineHeight: 1.12,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h3>

        <span
          className="badge"
          style={{
            fontSize: 10,
            padding: "6px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      </div>

      <p
        style={{
          fontSize: "clamp(15px, 1vw, 18px)",
          lineHeight: 1.55,
          margin: 0,
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
    <a href={href} style={{ display: "block" }}>
      {content}
    </a>
  );
}
