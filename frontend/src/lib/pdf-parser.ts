// src/lib/pdf-parser.ts
// Extractor de texto de PDFs para Route Handlers de Next.js (server-side con unpdf)

import { extractText } from "unpdf";

/**
 * Convierte un Buffer o Uint8Array de PDF a texto plano limpio.
 * Lanza error si el PDF está en blanco o es una imagen escaneada sin capa de texto.
 */
export async function extractTextFromPdf(buffer: Buffer | Uint8Array | ArrayBuffer): Promise<string> {
  try {
    let uint8Array: Uint8Array;
    if (Buffer.isBuffer(buffer)) {
      uint8Array = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else if (buffer instanceof Uint8Array) {
      uint8Array = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else {
      uint8Array = new Uint8Array(buffer);
    }

    const { text } = await extractText(uint8Array, { mergePages: true });
    const cleanText = (text ?? "").trim();

    if (!cleanText || cleanText.length < 50) {
      throw new Error(
        "El PDF parece ser una imagen escaneada sin capa de texto extraíble. " +
          "Por favor, proporciona el texto manualmente o usa un PDF con texto seleccionable."
      );
    }
    return cleanText;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.startsWith("El PDF parece")) throw err;
    throw new Error(`Error al procesar el PDF: ${String(err)}`);
  }
}
