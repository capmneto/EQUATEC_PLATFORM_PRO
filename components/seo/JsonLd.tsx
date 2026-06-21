// components/seo/JsonLd.tsx
// Componente utilitário para injetar JSON-LD (schema.org) em qualquer página.
// Server Component puro — sem "use client", sem interatividade.

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON-LD não passa por dados do usuário; é gerado pelo próprio app.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
