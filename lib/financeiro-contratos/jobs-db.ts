import { prisma } from "@/lib/prisma";

export type FinancialContractJobInput = {
  jobModule: string;
  title: string;
  pec?: string | null;
  period?: string | null;
  payload?: Record<string, unknown>;
  files?: unknown[];
  result?: Record<string, unknown>;
};

export async function ensureFinancialContractJobsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS financial_contract_jobs (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      jobModule VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      pec VARCHAR(100) NULL,
      periodRef VARCHAR(100) NULL,
      status VARCHAR(100) NOT NULL DEFAULT 'PROCESSADO',
      payload LONGTEXT NULL,
      files LONGTEXT NULL,
      result LONGTEXT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

export async function listFinancialContractJobs(jobModule?: string | null) {
  await ensureFinancialContractJobsTable();

  if (jobModule) {
    return prisma.$queryRawUnsafe(
      `
        SELECT *
        FROM financial_contract_jobs
        WHERE jobModule = ?
        ORDER BY createdAt DESC
      `,
      jobModule,
    );
  }

  return prisma.$queryRawUnsafe(`
    SELECT *
    FROM financial_contract_jobs
    ORDER BY createdAt DESC
  `);
}

export async function createFinancialContractJob(data: FinancialContractJobInput) {
  await ensureFinancialContractJobsTable();

  const id = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO financial_contract_jobs (
        id, jobModule, title, pec, periodRef, payload, files, result
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    id,
    data.jobModule,
    data.title,
    data.pec || null,
    data.period || null,
    JSON.stringify(data.payload || {}),
    JSON.stringify(data.files || []),
    JSON.stringify(data.result || {}),
  );

  return {
    id,
    ...data,
    status: "PROCESSADO",
    createdAt: new Date().toISOString(),
  };
}
