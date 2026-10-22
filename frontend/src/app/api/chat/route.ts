// src/app/api/chat/route.ts
// Endpoint de chat pericial con streaming para interacción en tiempo real

import { NextRequest, NextResponse } from "next/server";
import { streamText } from "@/lib/gemini";
import { loadKnowledgeContext } from "@/lib/knowledge";
import type { ChatRequest } from "@/types/audit";

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages, includeUnsaContext = false } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: "El historial de 'messages' es obligatorio." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se ha configurado GEMINI_API_KEY en .env.local. Por favor configúrala para activar el chat de IA.",
        },
        { status: 500 }
      );
    }

    // 1. Cargar el System Prompt con las bases de conocimiento seleccionadas
    const { systemPrompt } = loadKnowledgeContext(includeUnsaContext);

    // 2. Mapear mensajes al formato que espera Gemini: { role: 'user' | 'model', parts: [{ text }] }
    const geminiMessages = messages.map((m) => ({
      role: (m.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: m.content }],
    }));

    // 3. Obtener el stream de Gemini
    const streamResult = await streamText(systemPrompt, geminiMessages);

    // 4. Crear un ReadableStream para enviar tokens al cliente mediante SSE
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult) {
            const chunkText = chunk.text ?? "";
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (streamErr) {
          controller.error(streamErr);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    console.error("[api/chat] Error procesando consulta:", err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `Error en el servicio de chat: ${errorMsg}` },
      { status: 500 }
    );
  }
}
