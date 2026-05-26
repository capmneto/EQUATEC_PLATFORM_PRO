import { prisma } from "@/lib/prisma";

export async function ensureConstructionDocumentsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS construction_documents (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      projectId VARCHAR(191) NULL,
      title VARCHAR(255) NOT NULL,
      documentType VARCHAR(100) NULL,
      fileUrl TEXT NULL,
      extractedText LONGTEXT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function listConstructionDocuments() {
  await ensureConstructionDocumentsTable();

  return prisma.$queryRawUnsafe(`
    SELECT *
    FROM construction_documents
    ORDER BY createdAt DESC
  `);
}

export async function createConstructionDocument(data: {
  projectId?: string | null;
  title: string;
  documentType?: string | null;
  fileUrl?: string | null;
  extractedText?: string | null;
}) {
  await ensureConstructionDocumentsTable();

  const id = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO construction_documents (
        id, projectId, title, documentType, fileUrl, extractedText
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    id,
    data.projectId || null,
    data.title,
    data.documentType || null,
    data.fileUrl || null,
    data.extractedText || null,
  );

  return { id, ...data };
}
