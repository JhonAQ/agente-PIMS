"use client";

import React, { useState } from "react";
import { Navbar, type NavTab } from "@/components/layout/Navbar";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { AuditWorkbench } from "@/components/audit/AuditWorkbench";
import { AssistantChat } from "@/components/chat/AssistantChat";
import { PenaltyCalculator } from "@/components/calculator/PenaltyCalculator";
import { NormativeLibrary } from "@/components/library/NormativeLibrary";
import type { ResultadoAuditoria } from "@/types/audit";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("audit");
  const [unsaContext, setUnsaContext] = useState(false);
  const [lastResult, setLastResult] = useState<ResultadoAuditoria | null>(null);

  const handleToggleUnsaContext = () => {
    setUnsaContext((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#070d1e] text-slate-100 overflow-hidden flex flex-col justify-between">
      {/* ── Ambient Soft Glows (Idéntico a Referencias 1 y 2) ── */}
      <div className="glow-spot-cyan -left-48 top-16" />
      <div className="glow-spot-blue -right-48 top-40" />
      <div className="glow-spot-cyan left-1/3 top-[650px] opacity-40" />

      {/* ── Navbar Superior ── */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unsaContext={unsaContext}
        onToggleUnsaContext={handleToggleUnsaContext}
      />

      {/* ── Contenido Principal ── */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 flex-1">
        {/* Hero Header superior (muestra titular + estado de auditoría) */}
        <HeroHeader lastResult={lastResult} unsaContext={unsaContext} />

        {/* Vistas Dinámicas */}
        {activeTab === "audit" && (
          <AuditWorkbench
            unsaContext={unsaContext}
            onAuditCompleted={setLastResult}
          />
        )}

        {activeTab === "chat" && (
          <AssistantChat unsaContext={unsaContext} />
        )}

        {activeTab === "calculator" && <PenaltyCalculator />}

        {activeTab === "library" && <NormativeLibrary />}
      </main>

      {/* ── Footer Institucional y Créditos Académicos ── */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#050914]/80 py-6 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-slate-300">
              Trabajo de Investigación Formativa (TIF) — Auditoría de Sistemas
            </p>
            <p className="text-[11px] text-slate-400">
              Universidad Nacional de San Agustín de Arequipa (UNSA) • Grupo 8 (Ciclo B)
            </p>
            <p className="text-[11px] text-slate-400">
              Integrantes: Jhonatan David Arias Quispe • Yordano Hernan Boza Portillo • Graciela Condori Anahua • Raquel Alexandra Quispe Arratea
            </p>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400 space-y-0.5">
            <p>Docente: Mg. Edward Vicente Zárate Carlos</p>
            <p className="font-mono text-cyan-300">ISO/IEC 27701 (PIMS) • Ley N° 29733</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
