import { prisma } from "@/lib/prisma";

export async function ensureConstructionPaymentsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS construction_payments (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      projectId VARCHAR(191) NULL,
      title VARCHAR(255) NOT NULL,
      amount DOUBLE NOT NULL DEFAULT 0,
      dueDate DATETIME NULL,
      paid BOOLEAN NOT NULL DEFAULT false,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function listConstructionPayments() {
  await ensureConstructionPaymentsTable();

  return prisma.$queryRawUnsafe(`
    SELECT *
    FROM construction_payments
    ORDER BY createdAt DESC
  `);
}

export async function createConstructionPayment(data: {
  projectId?: string | null;
  title: string;
  amount: number;
  dueDate?: string | null;
}) {
  await ensureConstructionPaymentsTable();

  const id = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `
      INSERT INTO construction_payments (
        id, projectId, title, amount, dueDate
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    id,
    data.projectId || null,
    data.title,
    data.amount || 0,
    data.dueDate ? new Date(data.dueDate) : null,
  );

  return { id, paid: false, ...data };
}

export async function toggleConstructionPayment(id: string, paid: boolean) {
  await ensureConstructionPaymentsTable();

  await prisma.$executeRawUnsafe(
    `
      UPDATE construction_payments
      SET paid = ?
      WHERE id = ?
    `,
    paid,
    id,
  );

  return { id, paid };
}
