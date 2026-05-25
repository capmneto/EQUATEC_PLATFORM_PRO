import { PDFParse } from "pdf-parse";
import { extractTextFromImageWithGemini } from "./image-extractor";

export async function extractTextFromFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "text/plain") {
    return buffer.toString("utf-8");
  }

  if (file.type === "application/pdf") {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

    return result.text;
  }

  if (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/webp"
  ) {
    return extractTextFromImageWithGemini(file);
  }

  throw new Error("Formato de arquivo não suportado.");
}
