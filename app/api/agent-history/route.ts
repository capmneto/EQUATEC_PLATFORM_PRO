import { NextResponse } from "next/server";

import { readAgentHistory } from "@/lib/agent-history/store";

export async function GET() {
  const records = await readAgentHistory();

  return NextResponse.json({
    success: true,
    records,
  });
}
