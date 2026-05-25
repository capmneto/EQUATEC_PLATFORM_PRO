export type DocumentMemoryRecord = {
  id: string;
  title: string;
  source: string;
  module: string;
  content: string;
  summary?: string;
  createdAt: string;
};

export function createDocumentMemoryRecord(data: {
  title: string;
  source: string;
  module: string;
  content: string;
  summary?: string;
}): DocumentMemoryRecord {
  return {
    id: crypto.randomUUID(),
    title: data.title,
    source: data.source,
    module: data.module,
    content: data.content,
    summary: data.summary,
    createdAt: new Date().toISOString(),
  };
}
