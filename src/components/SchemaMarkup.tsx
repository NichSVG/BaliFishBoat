type JsonLdSchema = Record<string, unknown> | Record<string, unknown>[];

export default function SchemaMarkup({ schema }: { schema: JsonLdSchema | JsonLdSchema[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}