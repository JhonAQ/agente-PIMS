// src/lib/pdf-parser.ts
// Extractor de texto de PDFs para Route Handlers de Next.js (server-side)

import { PDFParse } from "pdf-parse";

/**
 * Convierte un Buffer de PDF a texto plano limpio.
 * Lanza error si el PDF está en blanco o es una imagen escaneada sin capa de texto.
 */
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const text = (result?.text ?? "").trim();
    if (!text || text.length < 50) {
      throw new Error(
        "El PDF parece ser una imagen escaneada sin capa de texto extraíble. " +
          "Por favor, proporciona el texto manualmente o usa un PDF con texto seleccionable."
      );
    }
    return text;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.startsWith("El PDF parece")) throw err;
    throw new Error(`Error al procesar el PDF: ${String(err)}`);
  }
}
