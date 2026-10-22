// src/app/api/audit/route.ts
// Endpoint principal para auditar políticas de privacidad, formularios o contratos (PDF o texto)

import { NextRequest, NextResponse } from "next/server";
import { auditarTexto } from "@/lib/heuristics";
import { extractTextFromPdf } from "@/lib/pdf-parser";
import { generateText } from "@/lib/gemini";
import { loadKnowledgeContext } from "@/lib/knowledge";
import type { ResultadoAuditoria } from "@/types/audit";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";

    let textoAuditado = "";
    let nombreDocumento = "Documento analizado";
    let includeUnsa = process.env.ENABLE_UNSA_CONTEXT === "true";
    let runGemini = true;

    // Caso A: Subida de archivo (multipart/form-data)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const rawText = formData.get("text") as string | null;
      const unsaParam = formData.get("includeUnsa");
      const geminiParam = formData.get("runGemini");

      if (unsaParam !== null) includeUnsa = unsaParam === "true";
      if (geminiParam !== null) runGemini = geminiParam === "true";

      if (file && file.size > 0) {
        nombreDocumento = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (file.name.toLowerCase().endsWith(".pdf")) {
          textoAuditado = await extractTextFromPdf(buffer);
        } else {
          textoAuditado = buffer.toString("utf-8");
        }
      } else if (rawText) {
        textoAuditado = rawText;
        nombreDocumento = (formData.get("fileName") as string) || "Texto ingresado";
      } else {
        return NextResponse.json(
          { success: false, error: "No se proporcionó archivo ni texto para auditar." },
          { status: 400 }
        );
      }
    }
    // Caso B: JSON en el body
    else {
      const body = await req.json();
      textoAuditado = body.text ?? "";
      nombreDocumento = body.fileName ?? "Texto ingresado";
      if (typeof body.includeUnsaContext === "boolean") {
        includeUnsa = body.includeUnsaContext;
      }
      if (typeof body.runGeminiAnalysis === "boolean") {
        runGemini = body.runGeminiAnalysis;
      }

      if (!textoAuditado || textoAuditado.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: "El campo 'text' es obligatorio en solicitudes JSON." },
          { status: 400 }
        );
      }
    }

    // 1. Ejecución del motor determinista de heurísticas
    const modoContexto = includeUnsa ? "UNSA" : "LPDP_GENERAL";
    const resultado: ResultadoAuditoria = auditarTexto(
      textoAuditado,
      nombreDocumento,
      modoContexto
    );

    // 2. Análisis cualitativo complementario con Gemini (si hay API Key disponible)
    if (runGemini && process.env.GEMINI_API_KEY) {
      try {
        const { systemPrompt } = loadKnowledgeContext(includeUnsa);
        const promptAuditoria = `Realiza una evaluación pericial y dictamen ejecutivo de auditoría sobre el siguiente documento:
Documento: ${nombreDocumento}
Modo evaluado: ${modoContexto}

TEXTO DEL DOCUMENTO A AUDITAR:
"""
${textoAuditado.slice(0, 15000)}
"""

RESULTADOS PREVIOS DEL MOTOR DE REGLAS:
- Score: ${resultado.scoreCumplimiento}/100
- Dictamen: ${resultado.dictamen}
- Total Hallazgos preliminares: ${resultado.totalHallazgos}

INSTRUCCIONES:
1. Emite un Resumen Ejecutivo pericial (1 párrafo de opinión técnica).
2. Valida o profundiza en las no conformidades detectadas frente a la Ley N° 29733 y normativas conexas.
3. Si el modo es UNSA, evalúa si cumple con las directivas de aulas virtuales (RCU 0153-2025), retención o política cero papel.
4. Concluye con un Plan de Subsanación Priorizado con medidas técnicas inmediatas.`;

        const analisisGemini = await generateText(systemPrompt, promptAuditoria);
        resultado.analisisGemini = analisisGemini;
      } catch (geminiErr: unknown) {
        console.warn("Análisis Gemini opcional falló o no se completó:", geminiErr);
        resultado.analisisGemini =
          "Nota: El análisis cualitativo extendido de IA no estuvo disponible. Se muestran los hallazgos del motor heurístico normativo.";
      }
    }

    return NextResponse.json({
      success: true,
      data: resultado,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `Error en la auditoría: ${errorMsg}` },
      { status: 500 }
    );
  }
}
