import { prisma } from "@/lib/prisma";

export async function ensureConstructionChecklistTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS construction_checklists (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      projectId VARCHAR(191) NULL,
      phase VARCHAR(255) NULL,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      notes TEXT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function listConstructionChecklist() {
  await ensureConstructionChecklistTable();

  return prisma.$queryRawUnsafe(`
    SELECT *
    FROM construction_checklists
    ORDER BY createdAt DESC
  `);
}

export async function createConstructionChecklistItem(data: {
  projectId?: string | null;
  phase?: string | null;
  title: string;
  notes?: string | null;
}) {
  await ensureConstructionChecklistTable();

  const id = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO construction_checklists (
        id, projectId, phase, title, notes
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    id,
    data.projectId || null,
    data.phase || null,
    data.title,
    data.notes || null,
  );

  return { id, completed: false, ...data };
}

export async function toggleConstructionChecklistItem(id: string, completed: boolean) {
  await ensureConstructionChecklistTable();

  await prisma.$executeRawUnsafe(
    `
      UPDATE construction_checklists
      SET completed = ?
      WHERE id = ?
    `,
    completed,
    id,
  );

  return { id, completed };
}
