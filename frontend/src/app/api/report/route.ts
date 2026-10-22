// src/app/api/report/route.ts
// Genera y devuelve el Papel de Trabajo formal de auditoría en formato Markdown para descarga

import { NextRequest, NextResponse } from "next/server";
import type { ResultadoAuditoria } from "@/types/audit";

export async function POST(req: NextRequest) {
  try {
    const body: { resultado: ResultadoAuditoria } = await req.json();
    const { resultado } = body;

    if (!resultado) {
      return NextResponse.json(
        { success: false, error: "Objeto 'resultado' de auditoría es obligatorio." },
        { status: 400 }
      );
    }

    const { metadatos, scoreCumplimiento, dictamen, hallazgos, analisisGemini } = resultado;

    const fechaLimpia = metadatos.fechaEjecucion.replace(/[/ :]/g, "-");
    const filename = `Papel_de_Trabajo_Auditoria_${fechaLimpia}.md`;

    let markdown = `# PAPEL DE TRABAJO DE AUDITORÍA DE SISTEMAS — PIMS & LPDP N° 29733

**Entidad Evaluadora:** ${metadatos.unidadEvaluadora}  
**Fecha de Ejecución:** ${metadatos.fechaEjecucion}  
**Documento Auditado:** ${metadatos.documentoAuditado}  
**Estándar Normativo:** ${metadatos.estandarEvaluado}  
**Modo de Contexto Institucional:** ${metadatos.modoContexto}  

---

## 1. RESUMEN EJECUTIVO Y DICTAMEN GLOBAL

* **Score Cuantitativo de Cumplimiento:** **${scoreCumplimiento} / 100**
* **Dictamen Pericial de Auditoría:** **${dictamen}**
* **Total de No Conformidades Detectadas:** ${hallazgos.length}
* **Exposición Económica Estimada (Multas ANPD):** ${resultado.sancionTotalEstimadaUIT} (${resultado.sancionTotalEstimadaSoles})

---

## 2. MATRIZ DE RIESGOS Y DETALLE DE HALLAZGOS

`;

    if (hallazgos.length === 0) {
      markdown += `*No se detectaron no conformidades en los controles auditados. El documento cumple con los estándares evaluados.*\n\n`;
    } else {
      hallazgos.forEach((h, idx) => {
        markdown += `### Hallazgo N° ${idx + 1}: [${h.controlId}] ${h.principio}

* **Gravedad:** **${h.gravedad}**
* **Tipificación:** ${h.tipificacion}
* **Sanción Estimada:** ${h.sancionUIT} (*${h.sancionSoles}*)

#### Cédula de Papel de Trabajo:
* **Condición:** ${h.condicion}
* **Criterio:** ${h.criterio}
* **Causa:** Carencia de control o procedimiento preventivo en la gestión del banco de datos.
* **Efecto:** Riesgo de sanción administrativa por la ANPD y posible vulneración de los derechos de los titulares.
* **Recomendación Técnica:** ${h.recomendacion}

---

`;
      });
    }

    if (analisisGemini) {
      markdown += `## 3. ANÁLISIS CUALITATIVO Y RECOMENDACIONES PERICIALES (IA)

${analisisGemini}

---
`;
    }

    markdown += `\n*Informe emitido de forma automatizada por el Asistente Auditor PIMS / LPDP — Escuela Profesional de Ingeniería de Sistemas (UNSA).*`;

    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `Error al generar reporte: ${errorMsg}` },
      { status: 500 }
    );
  }
}
