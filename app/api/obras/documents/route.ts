import { NextResponse } from "next/server";

import {
  createConstructionDocument,
  listConstructionDocuments,
} from "@/lib/obras/documents-db";
import { extractTextFromFile } from "@/lib/document-ai/extractor";
import { saveObraFile } from "@/lib/obras/uploads";

export async function GET() {
  try {
    const documents = await listConstructionDocuments();

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao listar documentos da obra.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const title = String(formData.get("title") || "");
    const documentType = String(formData.get("documentType") || "");
    const projectId = String(formData.get("projectId") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({
        success: false,
        error: "Arquivo não enviado.",
      });
    }

    const savedFile = await saveObraFile(file);

    let extractedText = "";

    try {
      extractedText = await extractTextFromFile(file);
    } catch {
      extractedText = "";
    }

    const document = await createConstructionDocument({
      projectId: projectId || null,
      title: title || file.name,
      documentType: documentType || file.type,
      fileUrl: savedFile.fileUrl,
      extractedText,
    });

    return NextResponse.json({
      success: true,
      document,
      extractedText,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao enviar documento da obra.",
    });
  }
}
