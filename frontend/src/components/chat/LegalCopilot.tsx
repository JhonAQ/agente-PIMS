"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  User,
  Bot,
  Copy,
  Check,
  Building2,
  BookOpen,
  ShieldAlert,
  Server,
  Sparkles,
} from "lucide-react";
import type { ChatMessage } from "@/types/audit";

interface LegalCopilotProps {
  unsaContext: boolean;
}

export function LegalCopilot({ unsaContext }: LegalCopilotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Bienvenido a la consola del **Auditor Líder Copilot**. Estoy capacitado en la Ley N° 29733 (LPDP de Perú), el D.S. 003-2013-JUS, la Directiva de Seguridad R.D. 019-2013-JUS y el estándar ISO/IEC 27701. " +
        (unsaContext
          ? "El **Contexto Institucional de la UNSA** está activo (RCU N° 0153-2025 de retención en Aulas Virtuales, RCU N° 0229-2025 Cero Papel y RR N° 0503-2026 CSIRT). "
          : "") +
        "¿Qué aspecto normativo, control técnico o procedimiento deseas consultar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    {
      label: "Plazos ARCO",
      icon: BookOpen,
      text: "¿Cuáles son los plazos legales máximos para atender solicitudes ARCO según la Ley 29733?",
    },
    {
      label: "Aulas Virtuales UNSA",
      icon: Building2,
      text: "¿Qué tiempos de retención y purga exige la Directiva RCU N° 0153-2025 para aulas virtuales de la UNSA?",
    },
    {
      label: "Nivel Crítico TI",
      icon: ShieldAlert,
      text: "¿Cuáles son las medidas técnicas de Nivel Crítico según la Directiva R.D. 019-2013-JUS (cifrado, logs)?",
    },
    {
      label: "CSIRT-UNSA",
      icon: Server,
      text: "¿Quiénes integran el CSIRT-UNSA según la Resolución RR N° 0503-2026 y cuáles son sus funciones?",
    },
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: textToSend },
    ];
    setMessages(newMessages);
    if (!messageText) setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          includeUnsaContext: unsaContext,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Error del servidor (${response.status}: ${response.statusText})`
        );
      }

      if (!response.body) {
        throw new Error("El servidor no devolvió flujo de datos.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantResponse,
          };
          return updated;
        });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error al procesar consulta: ${errorMsg}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Barra de Consultas Rápidas */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Consultas de Referencia:
        </span>
        {quickPrompts.map((q, idx) => {
          const Icon = q.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl bg-[#091124] hover:bg-[#122144] px-3 py-1.5 text-xs text-slate-300 border border-white/[0.06] hover:border-cyan-500/30 transition-all disabled:opacity-50"
            >
              <Icon className="h-3 w-3 text-cyan-400" />
              <span>{q.label}</span>
            </button>
          );
        })}
      </div>

      {/* Consola de Mensajes */}
      <div className="flex-1 rounded-2xl surface-glass p-5 shadow-xl flex flex-col justify-between overflow-hidden">
        {/* Historial con scroll */}
        <div className="overflow-y-auto space-y-4 pr-2 flex-1">
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`group relative max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-[#091124] text-slate-200 border border-white/[0.06]"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-1">
                    {m.content}
                  </div>

                  {!isUser && m.content && (
                    <button
                      onClick={() => copyToClipboard(m.content, idx)}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                      title="Copiar respuesta"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300 border border-white/[0.1] mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 text-xs justify-start items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                <Bot className="h-4 w-4 animate-pulse" />
              </div>
              <div className="rounded-2xl bg-[#091124] px-4 py-2 text-slate-400 border border-white/[0.06] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Analizando jurisprudencia y compendio legal...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Barra de Entrada Inferior */}
        <div className="pt-4 border-t border-white/[0.06] mt-3 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Formula una consulta de auditoría, control técnico o artículo legal..."
            disabled={loading}
            className="flex-1 rounded-xl bg-[#091124] px-4 py-2.5 text-xs text-white placeholder-slate-500 border border-white/[0.08] focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="btn-cyan-glow flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
