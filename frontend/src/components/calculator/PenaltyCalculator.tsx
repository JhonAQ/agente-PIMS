"use client";

import React, { useState } from "react";
import {
  Calculator,
  AlertOctagon,
  AlertTriangle,
  Info,
  DollarSign,
  RotateCcw,
  Scale,
} from "lucide-react";

const UIT_VALUE = 5150; // Valor de la UIT oficial en Perú (Soles)

export function PenaltyCalculator() {
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
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="rounded-3xl surface-glass p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e1a35] border border-cyan-500/30 text-cyan-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Simulador Financiero de Multas ANPD
            </h2>
            <p className="text-xs text-slate-400">
              Cálculo de exposición pecuniaria bajo la escala oficial de la Ley N° 29733 (Arts. 110–112 D.S. 003)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-[#091124] px-3 py-1.5 border border-white/[0.08] text-xs font-mono text-cyan-300">
            1 UIT = S/ {UIT_VALUE.toLocaleString("es-PE")}
          </div>
          {totalInfracciones > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Restablecer</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Controles de Infracciones vs Resultados */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Columna Izquierda: Selectores de Cantidad de Infracciones */}
        <div className="lg:col-span-6 space-y-4">
          {/* Infracción Leve */}
          <div className="rounded-2xl surface-glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-950/80 text-blue-400 border border-blue-500/30">
                  <Info className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Infracciones Leves
                  </h4>
                  <p className="text-[11px] text-slate-400">0.5 a 5 UIT por infracción</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLeves(Math.max(0, leves - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-white">
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

            <p className="text-[11px] text-slate-400 border-t border-white/[0.05] pt-2 leading-relaxed">
              *Ejemplos:* No inscribir bancos de datos ante la ANPD, demora en la atención de solicitudes ARCO fuera de los plazos legales, o remitir información incompleta.
            </p>
          </div>

          {/* Infracción Grave */}
          <div className="rounded-2xl surface-glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-950/80 text-amber-400 border border-amber-500/30">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Infracciones Graves
                  </h4>
                  <p className="text-[11px] text-slate-400">Más de 5 hasta 50 UIT por infracción</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGraves(Math.max(0, graves - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-white">
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

            <p className="text-[11px] text-slate-400 border-t border-white/[0.05] pt-2 leading-relaxed">
              *Ejemplos:* Tratar datos sin consentimiento previo e informado, desviar la información para fines distintos a los informados, o no implementar medidas técnicas de seguridad básicas.
            </p>
          </div>

          {/* Infracción Muy Grave */}
          <div className="rounded-2xl surface-glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-950/80 text-rose-400 border border-rose-500/30">
                  <AlertOctagon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Infracciones Muy Graves
                  </h4>
                  <p className="text-[11px] text-slate-400">Más de 50 hasta 100 UIT por infracción</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMuyGraves(Math.max(0, muyGraves - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-white">
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

            <p className="text-[11px] text-slate-400 border-t border-white/[0.05] pt-2 leading-relaxed">
              *Ejemplos:* Recopilar datos sensibles (financieros, salud, biometría) sin consentimiento escrito o mediante engaño, o realizar flujo transfronterizo omitiendo salvaguardas legales.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Impacto Consolidado */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl surface-glass p-6 shadow-2xl relative overflow-hidden space-y-5">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Scale className="h-4 w-4 text-cyan-400" />
                <span>Exposición Financiera Consolidada</span>
              </div>
              <span className="rounded-full bg-rose-950/70 px-2.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/30">
                {totalInfracciones} infracción(es) simuladas
              </span>
            </div>

            {/* Display de Multa en Soles */}
            <div className="rounded-2xl bg-[#091124] p-5 border border-white/[0.06] space-y-2">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Rango Estimado en Moneda Nacional (PEN):
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {totalInfracciones === 0 ? (
                  "S/ 0.00"
                ) : (
                  <span>
                    S/ {minSoles.toLocaleString("es-PE", { maximumFractionDigits: 0 })}
                    {" — "}
                    S/ {maxSoles.toLocaleString("es-PE", { maximumFractionDigits: 0 })}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Calculado a razón de S/ {UIT_VALUE.toLocaleString("es-PE")} por Unidad Impositiva Tributaria.
              </p>
            </div>

            {/* Rango en UIT */}
            <div className="rounded-2xl surface-glass-subtle p-4 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Rango en UIT:</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">
                  {totalInfracciones === 0
                    ? "0.0 UIT"
                    : `${minUit.toFixed(1)} a ${maxUit.toFixed(1)} UIT`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Leves ({leves}):</span>
                <span>{(leves * 0.5).toFixed(1)} - {(leves * 5).toFixed(1)} UIT</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Graves ({graves}):</span>
                <span>{(graves * 5.1).toFixed(1)} - {(graves * 50).toFixed(1)} UIT</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Muy Graves ({muyGraves}):</span>
                <span>{(muyGraves * 50.1).toFixed(1)} - {(muyGraves * 100).toFixed(1)} UIT</span>
              </div>
            </div>

            {/* Veredicto de Riesgo */}
            <div
              className={`rounded-xl p-3.5 text-xs border ${
                muyGraves > 0
                  ? "bg-rose-950/60 text-rose-300 border-rose-500/30"
                  : graves > 0
                  ? "bg-amber-950/60 text-amber-300 border-amber-500/30"
                  : leves > 0
                  ? "bg-blue-950/60 text-blue-300 border-blue-500/30"
                  : "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <span>
                  {muyGraves > 0
                    ? "Nivel de Exposición: CRÍTICO"
                    : graves > 0
                    ? "Nivel de Exposición: ALTO"
                    : leves > 0
                    ? "Nivel de Exposición: MODERADO"
                    : "Nivel de Exposición: NULO"}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {muyGraves > 0
                  ? "Riesgo inminente de medidas cautelares y sanciones superiores a 50 UIT por parte de la Dirección de Fiscalización e Instrucción de la ANPD."
                  : graves > 0
                  ? "Amerita subsanación correctiva prioritaria mediante cláusulas de consentimiento y auditoría de medidas técnicas TI."
                  : leves > 0
                  ? "Contingencia regularizable mediante regularización registral ante la ANPD y ajuste de plazos ARCO."
                  : "No se registran contingencias punitivas en los controles evaluados."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
