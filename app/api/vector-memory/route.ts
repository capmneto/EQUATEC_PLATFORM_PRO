import { NextResponse } from "next/server";

import {
  addVectorMemoryRecord,
  readVectorMemory,
  searchVectorMemory,
} from "@/lib/vector-memory/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (query) {
    const results = await searchVectorMemory(query);

    return NextResponse.json({
      success: true,
      mode: "search",
      results,
    });
  }

  const records = await readVectorMemory();

  return NextResponse.json({
    success: true,
    mode: "list",
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

    const record = await addVectorMemoryRecord({
      title: body.title || "Documento sem título",
      source: body.source || "manual",
      module: body.module || "VECTOR_MEMORY",
      content: body.content,
    });

    return NextResponse.json({
      success: true,
      record,
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro ao gravar memória vetorial.",
    });
  }
}
