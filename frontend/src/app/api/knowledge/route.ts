// src/app/api/knowledge/route.ts
// Devuelve el estado de las bases de conocimiento normativo disponibles

import { NextResponse } from "next/server";
import { loadKnowledgeContext } from "@/lib/knowledge";

export async function GET() {
  try {
    const unsaContextEnv = process.env.ENABLE_UNSA_CONTEXT === "true";
    const context = loadKnowledgeContext(true); // Carga la lista completa para consulta

    return NextResponse.json({
      success: true,
      data: {
        lpdpDocuments: context.lpdpDocuments,
        unsaDocuments: context.unsaDocuments,
        unsaContextEnabledByDefault: unsaContextEnv,
        totalLpdpDocs: context.lpdpDocuments.length,
        totalUnsaDocs: context.unsaDocuments.length,
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: `Error al cargar estado de conocimiento: ${String(err)}`,
      },
      { status: 500 }
    );
  }
}
