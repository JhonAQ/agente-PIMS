// src/lib/knowledge.ts
// Servicio modular de carga de documentos de conocimiento normativo
// Soporta toggle LPDP general vs contexto UNSA

import fs from "fs";
import path from "path";

/**
 * Encuentra de forma dinámica la raíz del repositorio donde viven knowledge/ y skill-lpdp-pims/
 */
function getProjectRoot(): string {
  const current = process.cwd();
  // Si estamos dentro de frontend/
  if (fs.existsSync(path.join(current, "..", "knowledge"))) {
    return path.join(current, "..");
  }
  // Si estamos en la raíz
  if (fs.existsSync(path.join(current, "knowledge"))) {
    return current;
  }
  // Fallback
  return path.join(current, "..");
}

function readMarkdownDir(dirPath: string): { name: string; content: string }[] {
  try {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    return files.map((file) => ({
      name: file,
      content: fs.readFileSync(path.join(dirPath, file), "utf-8"),
    }));
  } catch {
    return [];
  }
}

export interface KnowledgeContext {
  systemPrompt: string;
  lpdpDocuments: string[];
  unsaDocuments: string[];
  unsaContextEnabled: boolean;
}

/**
 * Carga el contexto de conocimiento normativo para inyectar al LLM.
 * @param includeUnsa - Si es true, carga también las resoluciones y directivas de la UNSA
 */
export function loadKnowledgeContext(includeUnsa: boolean = false): KnowledgeContext {
  const projectRoot = getProjectRoot();
  const lpdpPath = path.join(projectRoot, "skill-lpdp-pims", "references");
  const unsaPath = path.join(projectRoot, "knowledge", "unsa");

  // 1. Cargar documentos base de la LPDP / PIMS
  const lpdpDocs = readMarkdownDir(lpdpPath);
  const lpdpNames = lpdpDocs.map((d) => d.name);
  const lpdpContent = lpdpDocs
    .map((d) => `## ${d.name}\n\n${d.content}`)
    .join("\n\n---\n\n");

  // 2. Cargar documentos de la UNSA (opcional)
  let unsaDocs: { name: string; content: string }[] = [];
  let unsaContent = "";
  if (includeUnsa) {
    unsaDocs = readMarkdownDir(unsaPath).filter((d) => !d.name.startsWith("README"));
    unsaContent = unsaDocs
      .map((d) => `## ${d.name}\n\n${d.content}`)
      .join("\n\n---\n\n");
  }

  // 3. Construir el System Prompt del Auditor
  const unsaSection =
    includeUnsa && unsaContent
      ? `\n\n---\n\n# BASE DE CONOCIMIENTO INSTITUCIONAL - UNSA\nEres también experto en las normativas internas de la Universidad Nacional de San Agustín de Arequipa (UNSA). A continuación, tienes las resoluciones y directivas institucionales oficiales (Política de Privacidad, Directiva de Aulas Virtuales RCU N° 0153-2025, Directiva Cero Papel RCU N° 0229-2025 y CSIRT-UNSA RR N° 0503-2026):\n\n${unsaContent}`
      : "";

  const systemPrompt = `Eres el Auditor Líder de Privacidad y Seguridad TI del sistema lpdp-auditor, especializado en:
- La Ley de Protección de Datos Personales de Perú (Ley N° 29733)
- Su Reglamento (D.S. N° 003-2013-JUS)
- La Directiva de Seguridad de la Información (R.D. N° 019-2013-JUS)
- El estándar internacional ISO/IEC 27701 (PIMS) y gobierno digital

Tu tono es técnico, probatorio, objetivo e imparcial. Cada observación debe estar respaldada en un artículo del compendio normativo o directiva aplicable.
Estructuras tus respuestas usando la taxonomía estándar de papeles de trabajo de auditoría de sistemas:
- **Condición:** Hecho u omisión observado en el documento o sistema.
- **Criterio:** Artículo legal o control técnico infringido.
- **Causa:** Carencia de procedimiento, mala configuración o control preventivo ausente.
- **Efecto:** Riesgo de brecha, exposición y sanción estimada ante la ANPD (escala oficial en UIT).
- **Recomendación:** Acción técnica y priorizada de subsanación.

El valor oficial de la UIT es S/ 5,150.
Escala de multas oficial ANPD:
- Leves: 0.5 a 5 UIT (S/ 2,575 a S/ 25,750)
- Graves: Más de 5 hasta 50 UIT (S/ 25,750 a S/ 257,500)
- Muy Graves: Más de 50 hasta 100 UIT (S/ 257,500 a S/ 515,000)

# BASE DE CONOCIMIENTO NORMATIVO - LPDP / PIMS

${lpdpContent}${unsaSection}`;

  return {
    systemPrompt,
    lpdpDocuments: lpdpNames,
    unsaDocuments: unsaDocs.map((d) => d.name),
    unsaContextEnabled: includeUnsa,
  };
}
