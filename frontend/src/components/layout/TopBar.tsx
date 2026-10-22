"use client";

import React from "react";
import { Download, Layers, Shield, Menu } from "lucide-react";
import type { SidebarTab } from "./AppSidebar";
import type { ResultadoAuditoria } from "@/types/audit";

interface TopBarProps {
  activeTab: SidebarTab;
  unsaContext: boolean;
  lastResult: ResultadoAuditoria | null;
  onExportReport?: () => void;
  onOpenMobileMenu?: () => void;
}

export function TopBar({
  activeTab,
  unsaContext,
  lastResult,
  onExportReport,
  onOpenMobileMenu,
}: TopBarProps) {
  const titles: Record<SidebarTab, { title: string; subtitle: string }> = {
    audit: {
      title: "Mesa de Trabajo de Inspección",
      subtitle: "Auditoría determinista, papeles de trabajo y cálculo de multas",
    },
    checklist: {
      title: "Checklist de Controles PIMS",
      subtitle: "Evaluación de madurez bajo ISO/IEC 27701 y R.D. N° 019-2013-JUS",
    },
    calculator: {
      title: "Simulador Financiero de Multas UIT",
      subtitle: "Cuantificación de contingencias pecuniarias ante la ANPD",
    },
    copilot: {
      title: "Asistente Copilot Pericial",
      subtitle: "Consultas técnicas y jurisprudenciales con IA en tiempo real",
    },
    library: {
      title: "Base Normativa Institucional",
      subtitle: "Compendio legal de la Ley N° 29733 y resoluciones de la UNSA",
    },
  };

  const current = titles[activeTab];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/[0.07] bg-[#070d1e]/80 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Lado Izquierdo: Breadcrumbs y Título de Módulo */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div>
          <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>{current.title}</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-500" />
            <span className="hidden sm:inline text-[11px] font-normal text-slate-400">
              {current.subtitle}
            </span>
          </h1>
        </div>
      </div>

      {/* Lado Derecho: Metadatos y Acciones */}
      <div className="flex items-center gap-3">
        {/* UIT Pill */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-xl bg-[#091124] px-2.5 py-1 text-[11px] font-mono text-slate-300 border border-white/[0.06]">
          <span className="text-slate-500">UIT Vigente:</span>
          <span className="font-bold text-cyan-300">S/ 5,150</span>
        </div>

        {/* Scope Pill */}
        <div className="flex items-center gap-1.5 rounded-xl bg-[#091124] px-2.5 py-1 text-[11px] text-slate-300 border border-white/[0.06]">
          <span
            className={`h-2 w-2 rounded-full ${
              unsaContext ? "bg-cyan-400" : "bg-blue-400"
            }`}
          />
          <span className="font-semibold text-slate-200">
            {unsaContext ? "Ámbito UNSA" : "Ámbito Nacional"}
          </span>
        </div>

        {/* Botón de Exportación si hay resultado activo */}
        {lastResult && onExportReport && (
          <button
            onClick={onExportReport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-all shadow-[0_2px_10px_rgba(37,99,235,0.3)]"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exportar Papel de Trabajo (.md)</span>
          </button>
        )}
      </div>
    </header>
  );
}
