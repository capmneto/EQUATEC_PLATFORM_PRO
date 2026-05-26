import { prisma } from "@/lib/prisma";

export type ConstructionProjectInput = {
  name: string;
  client?: string;
  location?: string;
  status?: string;
  physicalProgress?: number;
  financialProgress?: number;
  budgetEstimated?: number;
  budgetExecuted?: number;
  responsible?: string;
  description?: string;
};

export async function ensureConstructionProjectsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS construction_projects (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      client VARCHAR(255) NULL,
      location VARCHAR(255) NULL,
      status VARCHAR(100) NOT NULL DEFAULT 'PLANEJAMENTO',
      physicalProgress INT NOT NULL DEFAULT 0,
      financialProgress INT NOT NULL DEFAULT 0,
      budgetEstimated DOUBLE NOT NULL DEFAULT 0,
      budgetExecuted DOUBLE NOT NULL DEFAULT 0,
      responsible VARCHAR(255) NULL,
      description TEXT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

export async function listConstructionProjects() {
  await ensureConstructionProjectsTable();

  return prisma.$queryRawUnsafe(`
    SELECT *
    FROM construction_projects
    ORDER BY createdAt DESC
  `);
}

export async function createConstructionProject(data: ConstructionProjectInput) {
  await ensureConstructionProjectsTable();

  const id = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO construction_projects (
        id, name, client, location, status, physicalProgress, financialProgress,
        budgetEstimated, budgetExecuted, responsible, description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    id,
    data.name,
    data.client || null,
    data.location || null,
    data.status || "PLANEJAMENTO",
    data.physicalProgress || 0,
    data.financialProgress || 0,
    data.budgetEstimated || 0,
    data.budgetExecuted || 0,
    data.responsible || null,
    data.description || null,
  );

  return { id, ...data };
}
