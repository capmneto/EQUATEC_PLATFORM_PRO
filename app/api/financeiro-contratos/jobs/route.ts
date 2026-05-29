import { NextResponse } from "next/server";

import {
  createFinancialContractJob,
  listFinancialContractJobs,
} from "@/lib/financeiro-contratos/jobs-db";
import { parseFinancialContractFile } from "@/lib/financeiro-contratos/parser";
import { generateFinancialContractResult } from "@/lib/financeiro-contratos/rules";
import { saveFinancialContractFile } from "@/lib/financeiro-contratos/uploads";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobModule = searchParams.get("module");

    const jobs = await listFinancialContractJobs(jobModule);

    return NextResponse.json({
      success: true,
      jobs,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao listar processamentos financeiros.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const jobModule = String(formData.get("jobModule") || "provisao");
    const title = String(formData.get("title") || "Processamento financeiro");
    const pec = String(formData.get("pec") || "");
    const period = String(formData.get("period") || "");

    const payload = {
      jobModule,
      title,
      pec,
      period,
      revenue: Number(formData.get("revenue") || 0),
      laborCost: Number(formData.get("laborCost") || 0),
      dissidioPercent: Number(formData.get("dissidioPercent") || 0),
      database: String(formData.get("database") || ""),
      contractAdjustmentPercent: Number(formData.get("contractAdjustmentPercent") || 0),
      contractAdjustmentDate: String(formData.get("contractAdjustmentDate") || ""),
      budgetValidity: String(formData.get("budgetValidity") || ""),
      notes: String(formData.get("notes") || ""),
    };

    const fileItems = formData.getAll("files");
    const labels = formData.getAll("fileLabels").map((item) => String(item || ""));

    const savedFiles = [];

    for (let index = 0; index < fileItems.length; index += 1) {
      const item = fileItems[index];

      if (item instanceof File && item.size > 0) {
        const label = labels[index] || item.name;
        const saved = await saveFinancialContractFile(item, label);

        try {
          const parsed = await parseFinancialContractFile(item, label);

          savedFiles.push({
            ...saved,
            parsed,
          });
        } catch (error) {
          savedFiles.push({
            ...saved,
            parsed: null,
            parseError:
              error instanceof Error
                ? error.message
                : "Erro desconhecido ao interpretar arquivo.",
          });
        }
      }
    }

    const result = generateFinancialContractResult(payload, savedFiles);

    const job = await createFinancialContractJob({
      jobModule,
      title,
      pec: pec || null,
      period: period || null,
      payload,
      files: savedFiles,
      result,
    });

    return NextResponse.json({
      success: true,
      job,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao processar módulo financeiro.",
    });
  }
}
