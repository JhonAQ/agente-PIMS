"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Lock,
  Layers,
  RotateCcw,
} from "lucide-react";

interface ControlItem {
  id: string;
  domain: string;
  standard: string;
  title: string;
  description: string;
  required: boolean;
}

export function PimsChecklist({ unsaContext }: { unsaContext: boolean }) {
  const controls: ControlItem[] = [
    // Dominio 1: Gobernanza y Consentimiento
    {
      id: "PIMS-GOB-01",
      domain: "Gobernanza y Principios",
      standard: "Art. 12 Ley 29733 / ISO 27701 7.2",
      title: "Consentimiento previo, informado, expreso e inequívoco",
      description: "Mecanismo verificable de recolección de consentimiento sin casillas premarcadas.",
      required: true,
    },
    {
      id: "PIMS-GOB-02",
      domain: "Gobernanza y Principios",
      standard: "Art. 6-7 Ley 29733",
      title: "Principio de Finalidad y Proporcionalidad",
      description: "Finalidades estrictamente delimitadas, prohibiendo el almacenamiento indefinido.",
      required: true,
    },
    {
      id: "PIMS-GOB-03",
      domain: "Gobernanza y Principios",
      standard: "Art. 31 Ley 29733",
      title: "Inscripción en el Registro Nacional de Protección de Datos",
      description: "Todos los bancos de datos automatizados o físicos debidamente inscritos ante la ANPD.",
      required: true,
    },

    // Dominio 2: Procedimientos ARCO
    {
      id: "PIMS-ARC-01",
      domain: "Derechos ARCO",
      standard: "Art. 18-22 Ley 29733",
      title: "Canal formal habilitado para ejercicio de derechos ARCO",
      description: "Correo específico (ej. odp@unsa.edu.pe) o mesa de partes con formato estandarizado.",
      required: true,
    },
    {
      id: "PIMS-ARC-02",
      domain: "Derechos ARCO",
      standard: "Art. 55 D.S. 003-2013-JUS",
      title: "Procedimiento de atención de Acceso (plazo máximo 20 días hábiles)",
      description: "Flujo operativo documentado que asegura entrega de información en el plazo legal.",
      required: true,
    },
    {
      id: "PIMS-ARC-03",
      domain: "Derechos ARCO",
      standard: "Art. 56 D.S. 003-2013-JUS",
      title: "Procedimiento de Rectificación / Cancelación (plazo máximo 10 días)",
      description: "Mecanismo técnico para rectificar o suprimir datos de las bases de datos en 10 días.",
      required: true,
    },

    // Dominio 3: Seguridad de la Información (R.D. 019-2013-JUS)
    {
      id: "PIMS-SEG-01",
      domain: "Seguridad TI (R.D. 019)",
      standard: "Nivel Básico / ISO 27001 A.9",
      title: "Control de acceso con credenciales personales e intransferibles",
      description: "Autenticación robusta, no compartición de cuentas y política de contraseñas.",
      required: true,
    },
    {
      id: "PIMS-SEG-02",
      domain: "Seguridad TI (R.D. 019)",
      standard: "Nivel Medio / ISO 27001 A.12",
      title: "Registro de incidencias de seguridad y asignación de perfiles RBAC",
      description: "Procedimiento de gestión de brechas y principio de privilegio mínimo de acceso.",
      required: true,
    },
    {
      id: "PIMS-SEG-03",
      domain: "Seguridad TI (R.D. 019)",
      standard: "Nivel Crítico (Datos Sensibles)",
      title: "Cifrado en reposo (AES-256) para datos sensibles o biométricos",
      description: "Bases de datos con datos de salud, biometría o financieros cifradas en disco.",
      required: true,
    },
    {
      id: "PIMS-SEG-04",
      domain: "Seguridad TI (R.D. 019)",
      standard: "Nivel Crítico (Comunicaciones)",
      title: "Cifrado en tránsito (TLS 1.2+) en todas las conexiones",
      description: "Tráfico web y transferencias seguras mediante certificados criptográficos válidos.",
      required: true,
    },
    {
      id: "PIMS-SEG-05",
      domain: "Seguridad TI (R.D. 019)",
      standard: "Nivel Crítico (Trazabilidad)",
      title: "Trazabilidad y registros de auditoría inalterables (logs WORM)",
      description: "Logs de acceso, lectura y modificación conservados por al menos 1 año.",
      required: true,
    },

    // Dominio 4: Directivas UNSA (Condicional)
    ...(unsaContext
      ? [
          {
            id: "UNSA-DIR-01",
            domain: "Directivas UNSA",
            standard: "RCU N° 0153-2025",
            title: "Tiempos de retención en Aulas Virtuales (3 años material, 2 notas, 1 logs)",
            description: "Cumplimiento del cronograma de conservación y purga periódica en Moodle/DUTIC.",
            required: true,
          },
          {
            id: "UNSA-DIR-02",
            domain: "Directivas UNSA",
            standard: "RCU N° 0229-2025",
            title: "Uso obligatorio del sistema TRAMITED con firma digital",
            description: "Eliminación del fotocopiado en el campus y preservación de expedientes electrónicos.",
            required: true,
          },
          {
            id: "UNSA-DIR-03",
            domain: "Directivas UNSA",
            standard: "RR N° 0503-2026",
            title: "Articulación y reporte de incidentes ante el CSIRT-UNSA",
            description: "Supervisión por el Oficial de Seguridad Digital y reporte ante el Centro Nacional (PCM).",
            required: true,
          },
        ]
      : []),
  ];

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const toggleControl = (id: string) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const total = controls.length;
  const checkedCount = controls.filter((c) => checkedState[c.id]).length;
  const percentage = Math.round((checkedCount / total) * 100);

  const getMaturity = () => {
    if (percentage >= 90) return { label: "Madurez Óptima (Nivel 5)", color: "text-emerald-400" };
    if (percentage >= 70) return { label: "Gestionado y Medible (Nivel 4)", color: "text-cyan-300" };
    if (percentage >= 50) return { label: "Definido con Salvedades (Nivel 3)", color: "text-amber-400" };
    if (percentage >= 25) return { label: "Inicial / Reactivo (Nivel 2)", color: "text-orange-400" };
    return { label: "No Conforme / Inexistente (Nivel 1)", color: "text-rose-400" };
  };

  const maturity = getMaturity();

  return (
    <div className="space-y-6">
      {/* KPI de Madurez del Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Controles Verificados
          </span>
          <div className="text-2xl font-extrabold font-mono text-white">
            {checkedCount} / {total}
          </div>
          <p className="text-[10px] text-slate-400">
            {total - checkedCount} control(es) pendientes de implementar
          </p>
        </div>

        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Porcentaje de Conformidad
          </span>
          <div className="text-2xl font-extrabold font-mono text-cyan-300">
            {percentage}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Nivel de Madurez PIMS
          </span>
          <div className={`text-sm font-bold pt-1 ${maturity.color}`}>
            {maturity.label}
          </div>
          <p className="text-[10px] text-slate-400">
            Bajo marco ISO/IEC 27701 y R.D. 019-2013
          </p>
        </div>
      </div>

      {/* Lista de Controles en Matriz */}
      <div className="rounded-2xl surface-glass p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Matriz de Verificación de Controles Técnicos
            </h3>
            <p className="text-[11px] text-slate-400">
              Marca los controles implementados y verificados en la auditoría de sistemas
            </p>
          </div>

          <button
            onClick={() => setCheckedState({})}
            className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Limpiar Checklist</span>
          </button>
        </div>

        <div className="space-y-3">
          {controls.map((ctrl) => {
            const isChecked = !!checkedState[ctrl.id];
            return (
              <div
                key={ctrl.id}
                onClick={() => toggleControl(ctrl.id)}
                className={`cursor-pointer rounded-xl p-4 transition-all border flex items-start gap-3 ${
                  isChecked
                    ? "bg-[#102244]/80 border-cyan-500/30"
                    : "bg-[#091124]/60 border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleControl(ctrl.id)}
                  className="mt-1 h-4 w-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      {ctrl.id}
                    </span>
                    <span className="rounded bg-slate-800/80 px-2 py-0.2 text-[10px] font-medium text-slate-300">
                      {ctrl.standard}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      • {ctrl.domain}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">
                    {ctrl.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {ctrl.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
