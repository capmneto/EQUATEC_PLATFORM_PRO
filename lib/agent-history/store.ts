import { promises as fs } from "fs";
import path from "path";

import type { AgentHistoryRecord } from "./types";

const historyDir = path.join(process.cwd(), "data", "agent-history");
const historyFile = path.join(historyDir, "index.json");

async function ensureHistoryFile() {
  await fs.mkdir(historyDir, { recursive: true });

  try {
    await fs.access(historyFile);
  } catch {
    await fs.writeFile(historyFile, "[]", "utf-8");
  }
}

export async function readAgentHistory(): Promise<AgentHistoryRecord[]> {
  await ensureHistoryFile();

  const raw = await fs.readFile(historyFile, "utf-8");

  return JSON.parse(raw) as AgentHistoryRecord[];
}

export async function saveAgentHistoryRecord(record: AgentHistoryRecord) {
  const records = await readAgentHistory();

  records.unshift(record);

  await fs.writeFile(historyFile, JSON.stringify(records, null, 2), "utf-8");

  return record;
}
