import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(
  process.cwd(),
  "public",
  "uploads",
  "financeiro-contratos",
);

export async function saveFinancialContractFile(file: File, label?: string) {
  await fs.mkdir(uploadDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, bytes);

  return {
    label: label || "arquivo",
    originalName: file.name,
    fileName,
    fileUrl: `/uploads/financeiro-contratos/${fileName}`,
    size: bytes.length,
    type: file.type || "application/octet-stream",
  };
}
