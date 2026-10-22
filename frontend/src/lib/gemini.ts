// src/lib/gemini.ts
// Cliente centralizado de Google Gemini API

import { GoogleGenAI } from "@google/genai";

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Variable GEMINI_API_KEY no encontrada. Por favor agrégala en .env.local"
    );
  }
  return new GoogleGenAI({ apiKey });
}

function getModelName(): string {
  return process.env.GEMINI_MODEL || "gemini-2.0-flash";
}

/**
 * Hace una llamada al LLM y devuelve la respuesta completa como string.
 * Para auditorías e informes (no streaming).
 */
export async function generateText(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const genai = getGenAIClient();
  const model = getModelName();

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
}

/**
 * Devuelve un stream de texto para el endpoint de chat interactivo.
 */
export async function streamText(
  systemPrompt: string,
  messages: { role: "user" | "model"; parts: { text: string }[] }[]
) {
  const genai = getGenAIClient();
  const model = getModelName();

  return genai.models.generateContentStream({
    model,
    contents: messages,
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.3,
      maxOutputTokens: 4096,
    },
  });
}
