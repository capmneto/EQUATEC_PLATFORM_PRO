import { NextResponse } from "next/server";

import { createDocumentMemoryRecord } from "@/lib/document-memory/types";
import {
  readDocumentMemory,
  saveDocumentMemoryRecord,
} from "@/lib/document-memory/store";

export async function GET() {
  const records = await readDocumentMemory();

  return NextResponse.json({
    success: true,
    records,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.content || typeof body.content !== "string") {
      return NextResponse.json({
        success: false,
        error: "Conteúdo não informado.",
      });
    }

    const record = createDocumentMemoryRecord({
      title: body.title || "Documento sem título",
      source: body.source || "manual",
      module: body.module || "DOCUMENT_AI",
      content: body.content,
      summary: body.summary || "",
    });

    await saveDocumentMemoryRecord(record);

    return NextResponse.json({
      success: true,
      record,
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro ao salvar memória documental.",
    });
  }
}
