// src/lib/gemini.ts
// Cliente centralizado de Google Gemini API con soporte multi-modelo y fallback automático

import { GoogleGenAI } from "@google/genai";

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Variable GEMINI_API_KEY no configurada. Por favor agrégala en .env.local"
    );
  }
  return new GoogleGenAI({ apiKey });
}

// Modelos ordenados por prioridad de disponibilidad
const MODEL_PRIORITIES = [
  process.env.GEMINI_MODEL,
  "gemini-3-flash-preview",
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash-lite",
].filter(Boolean) as string[];

/**
 * Genera texto completo con reintento automático en modelos fallback si hay saturación (503) o deprecación (404).
 */
export async function generateText(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const genai = getGenAIClient();
  let lastError: unknown;

  for (const model of MODEL_PRIORITIES) {
    try {
      const response = await genai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2, // Determinismo alto para dictámenes periciales
          maxOutputTokens: 8192,
        },
      });
      return response.text ?? "";
    } catch (err: unknown) {
      console.warn(`[Gemini generateText] Falló modelo ${model}, intentando siguiente fallback...`, err);
      lastError = err;
    }
  }

  throw new Error(
    `No se pudo generar respuesta con ninguno de los modelos disponibles: ${String(lastError)}`
  );
}

/**
 * Devuelve un stream de texto con reintento automático si el modelo inicial está sobrecargado.
 */
export async function streamText(
  systemPrompt: string,
  messages: { role: "user" | "model"; parts: { text: string }[] }[]
) {
  const genai = getGenAIClient();
  let lastError: unknown;

  for (const model of MODEL_PRIORITIES) {
    try {
      const stream = await genai.models.generateContentStream({
        model,
        contents: messages,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
          maxOutputTokens: 4096,
        },
      });
      return stream;
    } catch (err: unknown) {
      console.warn(`[Gemini streamText] Falló inicio de stream en ${model}, intentando siguiente...`, err);
      lastError = err;
    }
  }

  throw new Error(
    `No se pudo iniciar el stream con ninguno de los modelos de Gemini: ${String(lastError)}`
  );
}
