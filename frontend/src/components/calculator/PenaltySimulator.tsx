"use client";

import React, { useState } from "react";
import {
  Calculator,
  AlertOctagon,
  AlertTriangle,
  Info,
  RotateCcw,
  Scale,
  FileSpreadsheet,
} from "lucide-react";

const UIT_VALUE = 5150; // Valor oficial de la UIT en Perú

export function PenaltySimulator() {
  const [leves, setLeves] = useState(0);
  const [graves, setGraves] = useState(0);
  const [muyGraves, setMuyGraves] = useState(0);

  // Rangos oficiales según Arts. 110-112 del D.S. 003-2013-JUS
  const minUit = leves * 0.5 + graves * 5.1 + muyGraves * 50.1;
  const maxUit = leves * 5 + graves * 50 + muyGraves * 100;

  const minSoles = minUit * UIT_VALUE;
  const maxSoles = maxUit * UIT_VALUE;

  const totalInfracciones = leves + graves + muyGraves;

  const handleReset = () => {
    setLeves(0);
    setGraves(0);
    setMuyGraves(0);
  };

  return (
    <div className="space-y-6">
      {/* ── FILA SUPERIOR: PANEL DE PROYECCIÓN CONSOLIDADA ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rango Soles */}
        <div className="rounded-2xl surface-glass p-5 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Exposición Económica (PEN)
          </span>
          <div className="text-2xl font-extrabold font-mono text-white">
            {totalInfracciones === 0
              ? "S/ 0.00"
              : `S/ ${minSoles.toLocaleString("es-PE", { maximumFractionDigits: 0 })} — ${maxSoles.toLocaleString("es-PE", { maximumFractionDigits: 0 })}`}
          </div>
          <p className="text-[10px] text-slate-400">
            A razón de S/ {UIT_VALUE.toLocaleString("es-PE")} por UIT
          </p>
        </div>

        {/* Rango UIT */}
        <div className="rounded-2xl surface-glass p-5 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Rango Sancionador en UIT
          </span>
          <div className="text-2xl font-extrabold font-mono text-cyan-300">
            {totalInfracciones === 0
              ? "0.0 UIT"
              : `${minUit.toFixed(1)} a ${maxUit.toFixed(1)} UIT`}
          </div>
          <p className="text-[10px] text-slate-400">
            {totalInfracciones} infracción(es) acumuladas
          </p>
        </div>

        {/* Nivel de Gravedad */}
        <div className="rounded-2xl surface-glass p-5 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Calificación de Riesgo
          </span>
          <div
            className={`text-base font-bold pt-1 ${
              muyGraves > 0
                ? "text-rose-400"
                : graves > 0
                ? "text-amber-400"
                : leves > 0
                ? "text-blue-400"
                : "text-emerald-400"
            }`}
          >
            {muyGraves > 0
              ? "CRÍTICO — Medidas Cautelares"
              : graves > 0
              ? "ALTO — Sanción Grave"
              : leves > 0
              ? "MODERADO — Subsanable"
              : "CONFORME — Sin Contingencias"}
          </div>
          <p className="text-[10px] text-slate-400">
            Escala punitiva Dirección de Fiscalización ANPD
          </p>
        </div>
      </div>

      {/* ── CUADRÍCULA DE CONTROLADORES DE INFRACCIÓN ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leves */}
        <div className="rounded-2xl surface-glass p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-950/80 text-blue-400 border border-blue-500/30">
                <Info className="h-3.5 w-3.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Infracciones Leves
                </h4>
                <p className="text-[10px] text-slate-400">0.5 a 5 UIT</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLeves(Math.max(0, leves - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
              >
                -
              </button>
              <span className="w-6 text-center font-mono text-sm font-bold text-white">
                {leves}
              </span>
              <button
                onClick={() => setLeves(leves + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-slate-950 hover:bg-cyan-500 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-400 text-[11px]">
              Supuestos de Hecho (Art. 110 D.S. 003):
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>• No inscribir el banco de datos ante la ANPD.</li>
              <li>• Demoras no justificadas en responder solicitudes ARCO.</li>
              <li>• No proporcionar información al titular al recopilar datos.</li>
            </ul>
          </div>
        </div>

        {/* Graves */}
        <div className="rounded-2xl surface-glass p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-950/80 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="h-3.5 w-3.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Infracciones Graves
                </h4>
                <p className="text-[10px] text-slate-400">Más de 5 a 50 UIT</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGraves(Math.max(0, graves - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
              >
                -
              </button>
              <span className="w-6 text-center font-mono text-sm font-bold text-white">
                {graves}
              </span>
              <button
                onClick={() => setGraves(graves + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-slate-950 hover:bg-cyan-500 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-400 text-[11px]">
              Supuestos de Hecho (Art. 111 D.S. 003):
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>• Tratar datos personales sin consentimiento válido.</li>
              <li>• Utilizar datos para finalidades no autorizadas.</li>
              <li>• Omitir medidas de seguridad técnicas o de confidencialidad.</li>
            </ul>
          </div>
        </div>

        {/* Muy Graves */}
        <div className="rounded-2xl surface-glass p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-950/80 text-rose-400 border border-rose-500/30">
                <AlertOctagon className="h-3.5 w-3.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Infracciones Muy Graves
                </h4>
                <p className="text-[10px] text-slate-400">Más de 50 a 100 UIT</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuyGraves(Math.max(0, muyGraves - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
              >
                -
              </button>
              <span className="w-6 text-center font-mono text-sm font-bold text-white">
                {muyGraves}
              </span>
              <button
                onClick={() => setMuyGraves(muyGraves + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-slate-950 hover:bg-cyan-500 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-400 text-[11px]">
              Supuestos de Hecho (Art. 112 D.S. 003):
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>• Recopilar datos sensibles o financieros con engaño.</li>
              <li>• Realizar flujo transfronterizo sin garantías legales.</li>
              <li>• Desacatar medidas cautelares o resoluciones de la ANPD.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
