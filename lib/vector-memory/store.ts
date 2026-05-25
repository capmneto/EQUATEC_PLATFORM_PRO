import { promises as fs } from "fs";
import path from "path";

import { calculateSemanticScore, tokenizeText } from "./engine";
import type { VectorMemoryRecord, VectorSearchResult } from "./types";

const vectorDir = path.join(process.cwd(), "data", "vector-memory");
const vectorFile = path.join(vectorDir, "index.json");

async function ensureVectorFile() {
  await fs.mkdir(vectorDir, { recursive: true });

  try {
    await fs.access(vectorFile);
  } catch {
    await fs.writeFile(vectorFile, "[]", "utf-8");
  }
}

export async function readVectorMemory(): Promise<VectorMemoryRecord[]> {
  await ensureVectorFile();

  const raw = await fs.readFile(vectorFile, "utf-8");

  return JSON.parse(raw) as VectorMemoryRecord[];
}

export async function addVectorMemoryRecord(data: {
  title: string;
  source: string;
  module: string;
  content: string;
}) {
  const records = await readVectorMemory();

  const record: VectorMemoryRecord = {
    id: crypto.randomUUID(),
    title: data.title,
    source: data.source,
    module: data.module,
    content: data.content,
    tokens: tokenizeText(data.content),
    createdAt: new Date().toISOString(),
  };

  records.unshift(record);

  await fs.writeFile(vectorFile, JSON.stringify(records, null, 2), "utf-8");

  return record;
}

export async function searchVectorMemory(query: string, limit = 5): Promise<VectorSearchResult[]> {
  const records = await readVectorMemory();
  const queryTokens = tokenizeText(query);

  return records
    .map((record) => ({
      ...record,
      score: calculateSemanticScore(queryTokens, record.tokens),
    }))
    .filter((record) => record.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
