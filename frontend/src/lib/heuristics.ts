// src/lib/heuristics.ts
// Motor analítico de auditoría PIMS / LPDP 29733
// Port TypeScript del script Python auditar_privacidad.py — con tipado estricto

import type { Hallazgo, ResultadoAuditoria, Gravedad, Dictamen } from "@/types/audit";

const UIT_SOLES = 5150;

function uitToSoles(rango: string): string {
  return rango.replace(/(\d+(?:\.\d+)?)\s*UIT/g, (_, n) =>
    `${(parseFloat(n) * UIT_SOLES).toLocaleString("es-PE")} soles`
  );
}

function estimarSancionTotal(hallazgos: Hallazgo[]): { uit: string; soles: string } {
  let maxUit = 0;
  for (const h of hallazgos) {
    if (h.gravedad === "MUY GRAVE") maxUit = Math.max(maxUit, 100);
    else if (h.gravedad === "GRAVE") maxUit = Math.max(maxUit, 50);
    else if (h.gravedad === "LEVE") maxUit = Math.max(maxUit, 5);
  }
  const rangos = hallazgos.reduce(
    (acc, h) => {
      if (h.gravedad === "MUY GRAVE") acc.muyGrave++;
      else if (h.gravedad === "GRAVE") acc.grave++;
      else if (h.gravedad === "LEVE") acc.leve++;
      return acc;
    },
    { leve: 0, grave: 0, muyGrave: 0 }
  );

  let rangoUit = "0 UIT";
  if (rangos.muyGrave > 0) rangoUit = "Más de 50 hasta 100 UIT por infracción";
  else if (rangos.grave > 0) rangoUit = "Más de 5 hasta 50 UIT por infracción";
  else if (rangos.leve > 0) rangoUit = "0.5 a 5 UIT por infracción";

  return {
    uit: rangoUit,
    soles: `Hasta S/ ${(maxUit * UIT_SOLES).toLocaleString("es-PE")} por infracción`,
  };
}

export function auditarTexto(
  texto: string,
  nombreDocumento: string = "Documento sin nombre",
  modoContexto: "LPDP_GENERAL" | "UNSA" = "LPDP_GENERAL"
): ResultadoAuditoria {
  const t = texto.toLowerCase();
  const hallazgos: Hallazgo[] = [];
  let score = 100;

  // ── CTRL-01: Consentimiento previo, informado, expreso e inequívoco ──────────
  const tieneConsentimiento = ["consentimiento", "autorización", "acepto", "acepta"].some(
    (k) => t.includes(k)
  );
  if (!tieneConsentimiento) {
    hallazgos.push({
      controlId: "CTRL-LPDP-01",
      principio: "Principio de Consentimiento (Arts. 5 y 12 Ley N° 29733)",
      condicion: "No se identifica cláusula de consentimiento previo, informado, expreso e inequívoco.",
      criterio: "Art. 12 de la Ley N° 29733 y Art. 12 del D.S. N° 003-2013-JUS.",
      gravedad: "GRAVE" as Gravedad,
      tipificacion: "Infracción Grave (Art. 111 núm. 1 inc. a del Reglamento)",
      sancionUIT: "5.1 a 50 UIT",
      sancionSoles: `S/ ${(5.1 * UIT_SOLES).toLocaleString("es-PE")} a S/ ${(50 * UIT_SOLES).toLocaleString("es-PE")}`,
      recomendacion:
        "Implementar mecanismo de consentimiento explícito no premarcado con registro verificable de fecha, hora y versión de la política aceptada.",
    });
    score -= 25;
  }

  // ── CTRL-02: Derechos ARCO ────────────────────────────────────────────────────
  const tieneARCO = ["arco", "acceso", "rectificación", "cancelación", "oposición", "odp@"].some(
    (k) => t.includes(k)
  );
  if (!tieneARCO) {
    hallazgos.push({
      controlId: "CTRL-LPDP-02",
      principio: "Derechos de los Titulares — ARCO (Arts. 18-22 Ley N° 29733)",
      condicion: "La política omite los canales y procedimientos para el ejercicio de los derechos ARCO.",
      criterio: "Art. 18 de la Ley N° 29733 y Arts. 47-59 del D.S. N° 003-2013-JUS.",
      gravedad: "LEVE" as Gravedad,
      tipificacion: "Infracción Leve (Art. 110 núm. 1 inc. b del Reglamento)",
      sancionUIT: "0.5 a 5 UIT",
      sancionSoles: `S/ ${(0.5 * UIT_SOLES).toLocaleString("es-PE")} a S/ ${(5 * UIT_SOLES).toLocaleString("es-PE")}`,
      recomendacion:
        "Habilitar canal formal (correo o mesa de partes virtual) con formato estandarizado y plazo de respuesta de 10-20 días hábiles.",
    });
    score -= 10;
  }

  // ── CTRL-03: Finalidad determinada y proporcionalidad ────────────────────────
  const tieneIndefinido = ["indefinido", "permanente", "sin plazo"].some((k) => t.includes(k));
  const tieneFinalidad = ["finalidad", "propósito", "objetivo"].some((k) => t.includes(k));

  if (!tieneFinalidad || tieneIndefinido) {
    hallazgos.push({
      controlId: "CTRL-LPDP-03",
      principio: "Principio de Finalidad y Proporcionalidad (Arts. 6 y 7 Ley N° 29733)",
      condicion: tieneIndefinido
        ? "Se detecta almacenamiento indefinido sin justificación legal de la finalidad."
        : "Las finalidades del tratamiento no están explícitamente delimitadas en el documento.",
      criterio: "Arts. 6 y 7 de la Ley N° 29733 y Art. 19 del D.S. N° 003-2013-JUS.",
      gravedad: "GRAVE" as Gravedad,
      tipificacion: "Infracción Grave (Art. 111 núm. 1 inc. b del Reglamento)",
      sancionUIT: "5.1 a 50 UIT",
      sancionSoles: `S/ ${(5.1 * UIT_SOLES).toLocaleString("es-PE")} a S/ ${(50 * UIT_SOLES).toLocaleString("es-PE")}`,
      recomendacion:
        "Fijar políticas de retención temporal máxima y purga automática de bases de datos una vez cumplida la finalidad.",
    });
    score -= 25;
  }

  // ── CTRL-04: Datos sensibles y biométricos ───────────────────────────────────
  const trataSensibles = [
    "tarjeta", "financier", "salud", "biométr", "huella", "ingresos", "solvencia",
  ].some((k) => t.includes(k));
  const tieneConsentimientoEscrito = ["escrito", "firma digital", "firma electrónica"].some(
    (k) => t.includes(k)
  );

  if (trataSensibles && !tieneConsentimientoEscrito) {
    hallazgos.push({
      controlId: "CTRL-LPDP-04",
      principio: "Tratamiento de Datos Sensibles (Art. 13 Ley N° 29733)",
      condicion:
        "Se capturan datos sensibles o financieros sin constancia escrita ni consentimiento cualificado.",
      criterio:
        "Art. 13 núm. 13.5 de la Ley N° 29733 y Art. 34 de la Directiva R.D. N° 019-2013-JUS.",
      gravedad: "MUY GRAVE" as Gravedad,
      tipificacion: "Infracción Muy Grave (Art. 112 núm. 1 inc. b del Reglamento)",
      sancionUIT: "Más de 50 hasta 100 UIT",
      sancionSoles: `S/ ${(50 * UIT_SOLES).toLocaleString("es-PE")} a S/ ${(100 * UIT_SOLES).toLocaleString("es-PE")}`,
      recomendacion:
        "Requerir firma digital o consentimiento explícito reforzado y activar medidas de seguridad de Nivel Crítico (cifrado AES-256 en reposo, TLS 1.2+ en tránsito).",
    });
    score -= 35;
  }

  // ── CTRL-05: Flujo transfronterizo y hosting en nube ─────────────────────────
  const mencionaTerceros = [
    "extranjero", "nube", "cloud", "servidores", "terceros", "publicidad", "transfer",
  ].some((k) => t.includes(k));
  const tieneGarantias = [
    "garantías de seguridad", "nivel de protección adecuado", "cláusulas tipo", "iso 27001",
    "contratos de encargo",
  ].some((k) => t.includes(k));

  if (mencionaTerceros && !tieneGarantias) {
    hallazgos.push({
      controlId: "CTRL-LPDP-05",
      principio: "Flujo Transfronterizo de Datos (Art. 15 Ley N° 29733)",
      condicion:
        "Se transfiere información a terceros o a servidores en la nube sin acreditar garantías contractuales de protección adecuada.",
      criterio: "Art. 15 de la Ley N° 29733 y Art. 66 del D.S. N° 003-2013-JUS.",
      gravedad: "GRAVE" as Gravedad,
      tipificacion: "Infracción Grave a Muy Grave (Art. 111 núm. 1 inc. f del Reglamento)",
      sancionUIT: "10 a 50 UIT",
      sancionSoles: `S/ ${(10 * UIT_SOLES).toLocaleString("es-PE")} a S/ ${(50 * UIT_SOLES).toLocaleString("es-PE")}`,
      recomendacion:
        "Formalizar contratos de encargo con cláusulas de protección de datos con los proveedores de hosting/cloud (AWS, Azure, GCP) y acreditar nivel de protección adecuado.",
    });
    score -= 20;
  }

  // ── Dictamen final ────────────────────────────────────────────────────────────
  const scoreFinal = Math.max(0, score);
  let dictamen: Dictamen;
  if (scoreFinal >= 85) dictamen = "CONFORME";
  else if (scoreFinal >= 50) dictamen = "CONFORME CON SALVEDADES";
  else dictamen = "NO CONFORME";

  const sancion = estimarSancionTotal(hallazgos);

  return {
    metadatos: {
      estandarEvaluado: "Ley N° 29733, D.S. 003-2013-JUS, R.D. 019-2013-JUS e ISO/IEC 27701 (PIMS)",
      fechaEjecucion: new Date().toLocaleString("es-PE"),
      unidadEvaluadora: "Sistema lpdp-auditor — Auditoría de Sistemas UNSA",
      documentoAuditado: nombreDocumento,
      modoContexto,
    },
    scoreCumplimiento: scoreFinal,
    dictamen,
    totalHallazgos: hallazgos.length,
    hallazgos,
    sancionTotalEstimadaUIT: sancion.uit,
    sancionTotalEstimadaSoles: sancion.soles,
  };
}
