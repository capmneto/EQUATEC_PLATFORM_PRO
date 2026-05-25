import { promises as fs } from "fs";
import path from "path";

import type { DocumentMemoryRecord } from "./types";

const memoryDir = path.join(process.cwd(), "data", "document-memory");
const memoryFile = path.join(memoryDir, "index.json");

async function ensureMemoryFile() {
  await fs.mkdir(memoryDir, { recursive: true });

  try {
    await fs.access(memoryFile);
  } catch {
    await fs.writeFile(memoryFile, "[]", "utf-8");
  }
}

export async function readDocumentMemory(): Promise<DocumentMemoryRecord[]> {
  await ensureMemoryFile();

  const raw = await fs.readFile(memoryFile, "utf-8");

  return JSON.parse(raw) as DocumentMemoryRecord[];
}

export async function saveDocumentMemoryRecord(record: DocumentMemoryRecord) {
  const records = await readDocumentMemory();

  records.unshift(record);

  await fs.writeFile(memoryFile, JSON.stringify(records, null, 2), "utf-8");

  return record;
}
