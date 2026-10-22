"use client";

import React from "react";
import {
  ShieldCheck,
  ClipboardCheck,
  Scale,
  MessageSquare,
  BookOpenText,
  Building2,
  Globe2,
  Cpu,
} from "lucide-react";

export type SidebarTab =
  | "audit"
  | "copilot"
  | "library";

interface AppSidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  unsaContext: boolean;
  onToggleUnsaContext: (val: boolean) => void;
}

export function AppSidebar({
  activeTab,
  onTabChange,
  unsaContext,
  onToggleUnsaContext,
}: AppSidebarProps) {
  const navItems = [
    {
      id: "audit" as SidebarTab,
      label: "Inspección & Dictamen",
      description: "Auditoría y papeles de trabajo",
      icon: ShieldCheck,
    },
    {
      id: "copilot" as SidebarTab,
      label: "Asistente Copilot",
      description: "Consultas periciales en streaming",
      icon: MessageSquare,
    },
    {
      id: "library" as SidebarTab,
      label: "Base Normativa",
      description: "Leyes y directivas institucionales",
      icon: BookOpenText,
    },
  ];

  return (
    <aside className="w-72 shrink-0 border-r border-white/[0.07] bg-[#070d1e] flex flex-col justify-between p-4 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Cabecera / Marca Sobria (Sin isotipos cliché de IA) */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0e1a35] border border-cyan-500/30 text-cyan-400 shadow-sm">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight text-white">
                PIMS Auditor
              </span>
              <span className="rounded bg-cyan-950 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300 border border-cyan-500/20">
                LPDP
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Auditoría de Sistemas • UNSA
            </p>
          </div>
        </div>

        {/* Selector de Alcance Normativo (Workspace Selector) */}
        <div className="rounded-2xl surface-glass p-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Alcance Normativo Activo
          </span>

          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#091124] border border-white/[0.05]">
            <button
              onClick={() => onToggleUnsaContext(false)}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                !unsaContext
                  ? "bg-[#182c57] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Globe2 className="h-3 w-3 text-cyan-400" />
              <span>Nacional</span>
            </button>

            <button
              onClick={() => onToggleUnsaContext(true)}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                unsaContext
                  ? "bg-[#182c57] text-cyan-200 shadow-sm border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building2 className="h-3 w-3 text-cyan-400" />
              <span>UNSA</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-400 px-1 leading-normal">
            {unsaContext
              ? "Carga Ley 29733 + Aulas Virtuales (RCU 0153), Cero Papel (RCU 0229) y CSIRT (RR 0503)."
              : "Alineado a la Ley N° 29733, D.S. 003-2013 e ISO/IEC 27701 (PIMS)."}
          </p>
        </div>

        {/* Menú de Navegación Vertical */}
        <nav className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-3 mb-2">
            Módulos del Sistema
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                  isActive
                    ? "bg-[#122144] text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-[#091124] text-slate-400"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold truncate leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pie del Sidebar: Estado del Sistema */}
      <div className="pt-4 border-t border-white/[0.06] space-y-2.5 px-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>Motor Pericial</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Gemini 3.0 Flash
          </span>
        </div>

        <div className="text-[10px] text-slate-500 leading-tight">
          <span>RUC UNSA: 20163646499</span>
          <br />
          <span>Canal ARCO: odp@unsa.edu.pe</span>
        </div>
      </div>
    </aside>
  );
}
