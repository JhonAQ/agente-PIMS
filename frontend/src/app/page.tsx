"use client";

import React, { useState } from "react";
import { AppSidebar, type SidebarTab } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AuditWorkstation } from "@/components/audit/AuditWorkstation";
import { PimsChecklist } from "@/components/checklist/PimsChecklist";
import { PenaltySimulator } from "@/components/calculator/PenaltySimulator";
import { LegalCopilot } from "@/components/chat/LegalCopilot";
import { LegalRepository } from "@/components/library/LegalRepository";
import type { ResultadoAuditoria } from "@/types/audit";

export default function Home() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("audit");
  const [unsaContext, setUnsaContext] = useState(false);
  const [lastResult, setLastResult] = useState<ResultadoAuditoria | null>(null);

  const handleExportReport = async () => {
    if (!lastResult) return;
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultado: lastResult }),
      });
      if (!res.ok) throw new Error("No se pudo generar el reporte.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Papel_de_Trabajo_Auditoria_${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert("Error al descargar: " + String(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex overflow-x-hidden">
      {/* ── Ambient Soft Glows ── */}
      <div className="glow-spot-cyan -left-48 top-16" />
      <div className="glow-spot-blue right-10 top-40" />

      {/* ── Barra Lateral Persistente (AppSidebar) ── */}
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unsaContext={unsaContext}
        onToggleUnsaContext={setUnsaContext}
      />

      {/* ── Área de Trabajo Principal ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070d1e]">
        {/* TopBar Superior de Contexto */}
        <TopBar
          activeTab={activeTab}
          unsaContext={unsaContext}
          lastResult={lastResult}
          onExportReport={handleExportReport}
        />

        {/* Contenido Dinámico de la Vista Seleccionada */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {activeTab === "audit" && (
            <AuditWorkstation
              unsaContext={unsaContext}
              resultado={lastResult}
              onAuditCompleted={setLastResult}
              onExportReport={handleExportReport}
            />
          )}

          {activeTab === "checklist" && (
            <PimsChecklist unsaContext={unsaContext} />
          )}

          {activeTab === "calculator" && <PenaltySimulator />}

          {activeTab === "copilot" && <LegalCopilot unsaContext={unsaContext} />}

          {activeTab === "library" && <LegalRepository />}
        </main>

        {/* Pie de Página Institucional */}
        <footer className="border-t border-white/[0.06] bg-[#050914]/90 py-4 px-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              <span className="font-semibold text-slate-300">
                Auditoría de Sistemas — UNSA
              </span>{" "}
              • Grupo 8 (Ciclo B)
            </div>
            <div className="font-mono text-[11px] text-cyan-300">
              Ley N° 29733 • D.S. N° 003-2013-JUS • ISO/IEC 27701
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
