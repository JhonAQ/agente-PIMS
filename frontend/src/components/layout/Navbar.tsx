"use client";

import React from "react";
import {
  FileText,
  MessageSquare,
  Calculator,
  BookOpen,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

export type NavTab = "audit" | "chat" | "calculator" | "library";

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unsaContext: boolean;
  onToggleUnsaContext: () => void;
}

export function Navbar({
  activeTab,
  onTabChange,
  unsaContext,
  onToggleUnsaContext,
}: NavbarProps) {
  const tabs = [
    { id: "audit" as NavTab, label: "Auditoría de Políticas", icon: FileText },
    { id: "chat" as NavTab, label: "Asistente Pericial", icon: MessageSquare },
    { id: "calculator" as NavTab, label: "Simulador UIT", icon: Calculator },
    { id: "library" as NavTab, label: "Base Normativa", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#070d1e]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo (Sobrio, sin isotipos IA cliché) */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e1a35] border border-cyan-500/30 text-cyan-400 shadow-sm">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">
                PIMS Auditor
              </span>
              <span className="rounded-full bg-cyan-950/70 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
                LPDP N° 29733
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Auditoría de Sistemas • UNSA
            </p>
          </div>
        </div>

        {/* Pill Navigation Tabs (Estilo Referencia 1) */}
        <nav className="hidden md:flex items-center gap-1 rounded-2xl bg-[#0a1329] p-1 border border-white/[0.06]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#16274e] text-white border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.18)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${
                    isActive ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: UNSA Toggle + Status */}
        <div className="flex items-center gap-2.5">
          {/* Context Selector Pill Button */}
          <button
            onClick={onToggleUnsaContext}
            title="Activar/desactivar contexto institucional de la UNSA (RCU 0153, RCU 0229, RR 0503)"
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              unsaContext
                ? "bg-[#14294d] text-cyan-200 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.22)]"
                : "bg-[#0b1429] text-slate-400 border border-white/[0.08] hover:text-slate-200"
            }`}
          >
            <Building2
              className={`h-3.5 w-3.5 ${
                unsaContext ? "text-cyan-400" : "text-slate-500"
              }`}
            />
            <span>Modo UNSA</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                unsaContext
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {unsaContext ? "ACTIVO" : "OFF"}
            </span>
          </button>

          {/* Model Status Dot */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-xl bg-[#091124] px-2.5 py-1.5 border border-white/[0.05] text-[11px] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[10px]">Gemini 2.0 Flash</span>
          </div>
        </div>
      </div>

      {/* Mobile nav pills bar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-white/[0.04] gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex whitespace-nowrap items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                isActive
                  ? "bg-[#16274e] text-white border border-cyan-500/30"
                  : "text-slate-400"
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
