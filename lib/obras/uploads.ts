import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads", "obras");

export async function saveObraFile(file: File) {
  await fs.mkdir(uploadDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, bytes);

  return {
    fileName,
    fileUrl: `/uploads/obras/${fileName}`,
    size: bytes.length,
    type: file.type,
  };
}
