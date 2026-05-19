type InternalCardProps = {
  title: string;
  description: string;
  status?: string;
  href?: string;
};

export function InternalCard({
  title,
  description,
  status = "Aguarde",
  href,
}: InternalCardProps) {
  const content = (
    <div
      className="card"
      style={{
        height: "100%",
        minHeight: 132,
        padding: 18,
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 21,
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: "-0.03em",
            maxWidth: "75%",
          }}
        >
          {title}
        </h3>

        <span
          className="badge"
          style={{
            flexShrink: 0,
            fontSize: 9,
            padding: "5px 8px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      </div>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.45,
          margin: 0,
          color: "rgba(226, 232, 240, 0.78)",
        }}
      >
        {description}
      </p>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} style={{ display: "block", height: "100%" }}>
      {content}
    </a>
  );
}
