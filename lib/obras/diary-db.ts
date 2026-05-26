import { prisma } from "@/lib/prisma";

export async function ensureConstructionDiaryTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS construction_diaries (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      projectId VARCHAR(191) NULL,
      title VARCHAR(255) NULL,
      description LONGTEXT NOT NULL,
      weather VARCHAR(100) NULL,
      teamSize INT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function listConstructionDiaries() {
  await ensureConstructionDiaryTable();

  return prisma.$queryRawUnsafe(`
    SELECT *
    FROM construction_diaries
    ORDER BY createdAt DESC
  `);
}

export async function createConstructionDiary(data: {
  projectId?: string | null;
  title?: string | null;
  description: string;
  weather?: string | null;
  teamSize?: number | null;
}) {
  await ensureConstructionDiaryTable();

  const id = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO construction_diaries (
        id, projectId, title, description, weather, teamSize
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    id,
    data.projectId || null,
    data.title || null,
    data.description,
    data.weather || null,
    data.teamSize || null,
  );

  return { id, ...data };
}
