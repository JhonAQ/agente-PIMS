"use client";

import React from "react";
import { History, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";
import type { ResultadoAuditoria } from "@/types/audit";

interface HeroHeaderProps {
  lastResult: ResultadoAuditoria | null;
  unsaContext: boolean;
}

export function HeroHeader({ lastResult, unsaContext }: HeroHeaderProps) {
  const score = lastResult ? lastResult.scoreCumplimiento : null;
  const dictamen = lastResult ? lastResult.dictamen : null;

  return (
    <div className="relative mb-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      {/* Left Column: Big Headline & Subtitle (Estilo Referencia 1) */}
      <div className="lg:col-span-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[40px] leading-[1.15]">
          Fiscaliza, audita y dictamina cumplimiento PIMS al instante.
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
          Inspección determinista bajo la{" "}
          <strong className="text-white font-semibold">
            Ley de Protección de Datos Personales (N° 29733)
          </strong>
          , cuantificación oficial de sanciones en UIT y generación automatizada de
          cédulas de papeles de trabajo periciales.
        </p>
      </div>

      {/* Right Column: Floating Status Card (Idéntico a "Estado de la sesión" en Referencia 1) */}
      <div className="lg:col-span-4">
        <div className="rounded-2xl surface-glass p-5 shadow-lg relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />

          {/* Card Header */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Estado de la auditoría</span>
            <History className="h-4 w-4 text-slate-400" />
          </div>

          {/* Main Display Metric */}
          <div className="mt-3 flex items-center gap-2.5">
            {dictamen === "CONFORME" && (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            )}
            {dictamen === "CONFORME CON SALVEDADES" && (
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
            )}
            {dictamen === "NO CONFORME" && (
              <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0" />
            )}

            <div className="text-lg font-bold text-white tracking-tight">
              {lastResult ? (
                <span>
                  Score {score}/100 • {dictamen}
                </span>
              ) : (
                "Sin evaluación activa"
              )}
            </div>
          </div>

          {/* Metadata Rows */}
          <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Controles evaluados</span>
              <span className="font-semibold text-slate-200">
                {lastResult ? `${lastResult.totalHallazgos} hallazgos` : "5 principios"}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Contexto institucional</span>
              <span
                className={`font-semibold ${
                  unsaContext ? "text-cyan-300" : "text-slate-300"
                }`}
              >
                {unsaContext ? "UNSA Habilitado" : "LPDP Nacional"}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Exposición económica</span>
              <span className="font-semibold text-rose-300">
                {lastResult
                  ? lastResult.sancionTotalEstimadaSoles
                  : "S/ 0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
