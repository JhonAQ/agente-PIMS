"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Building2,
  FileText,
  Calendar,
  ShieldCheck,
  Server,
  Layers,
} from "lucide-react";

interface NormativeDoc {
  id: string;
  scope: "nacional" | "unsa";
  title: string;
  code: string;
  date: string;
  authority: string;
  summary: string;
  keyControls: string[];
}

export function NormativeLibrary() {
  const [filter, setFilter] = useState<"all" | "nacional" | "unsa">("all");

  const documents: NormativeDoc[] = [
    {
      id: "ley-29733",
      scope: "nacional",
      title: "Ley de Protección de Datos Personales",
      code: "Ley N° 29733",
      date: "03 de julio de 2011",
      authority: "Congreso de la República / MINJUS",
      summary:
        "Marco rector obligatorio que garantiza el derecho fundamental a la protección de datos personales, regulando los principios, derechos ARCO y régimen sancionador.",
      keyControls: [
        "Art. 4-12: Principios rectores (Legalidad, Consentimiento, Finalidad, Proporcionalidad, Seguridad)",
        "Art. 13: Consentimiento expreso por escrito para datos sensibles",
        "Art. 15: Requisitos de flujo transfronterizo de datos",
        "Art. 18-22: Catálogo de Derechos ARCO",
      ],
    },
    {
      id: "ds-003-2013",
      scope: "nacional",
      title: "Reglamento de la Ley de Protección de Datos Personales",
      code: "D.S. N° 003-2013-JUS",
      date: "22 de marzo de 2013",
      authority: "Ministerio de Justicia y Derechos Humanos (MINJUS)",
      summary:
        "Norma procedimental que detalla los requisitos del consentimiento, plazos estrictos de atención ARCO y la tipificación oficial de infracciones leves, graves y muy graves.",
      keyControls: [
        "Art. 12-18: Condiciones para la validez del consentimiento",
        "Art. 55: Plazo de 20 días hábiles para derecho de Acceso",
        "Art. 56: Plazo de 10 días hábiles para Rectificación, Cancelación y Oposición",
        "Art. 110-112: Tipificación de infracciones con multas de 0.5 hasta 100 UIT",
      ],
    },
    {
      id: "rd-019-2013",
      scope: "nacional",
      title: "Directiva de Seguridad de la Información con Datos Personales",
      code: "R.D. N° 019-2013-JUS/DNPDP",
      date: "08 de octubre de 2013",
      authority: "Dirección Nacional de Protección de Datos Personales (ANPD)",
      summary:
        "Especificación técnica pericial que gradúa las medidas de seguridad lógicas, físicas y organizativas según la criticidad de los datos personales tratados.",
      keyControls: [
        "Nivel Básico: Control de acceso RBAC, contraseñas robustas y copias de seguridad",
        "Nivel Medio: Registro de incidencias, auditorías bienales y control de accesos físicos",
        "Nivel Crítico: Cifrado en reposo (AES-256), cifrado en tránsito (TLS 1.2+) y logs WORM",
      ],
    },
    {
      id: "unsa-politica",
      scope: "unsa",
      title: "Política Oficial de Protección de Datos Personales de la UNSA",
      code: "Política Institucional",
      date: "Marzo, 2021",
      authority: "Universidad Nacional de San Agustín de Arequipa (UNSA)",
      summary:
        "Declaración formal de tratamiento de datos personales para estudiantes, docentes, egresados y administrados. Identifica bancos de datos y canales oficiales.",
      keyControls: [
        "10 bancos de datos declarados (Estudiantes, Recursos Humanos, Biblioteca, etc.)",
        "Canal formal de ejercicio ARCO: odp@unsa.edu.pe y Mesa de Partes San Agustín 115",
        "Cláusula de almacenamiento indefinido (punto de auditoría frente a proporcionalidad)",
        "Responsabilidad docente por difusión de grabaciones de aulas virtuales",
      ],
    },
    {
      id: "rcu-0153-2025",
      scope: "unsa",
      title: "Regulación del Almacenamiento de Información de Aulas Virtuales",
      code: "Directiva N° 003-2025-UM-OTI / RCU N° 0153-2025",
      date: "17 de marzo de 2025",
      authority: "Consejo Universitario / OTI UNSA",
      summary:
        "Regula los plazos de retención, respaldo (backup), archivado y purga segura de contenidos académicos en las plataformas DUTIC / Moodle.",
      keyControls: [
        "Material didáctico: Retención obligatoria de 3 años (acreditación y reuso)",
        "Evaluaciones y calificaciones: Retención de 2 años (atención de reclamos)",
        "Foros y participación estudiantil: Retención de 1 año",
        "Logs y registros de sesión: Retención de 1 año (auditorías e incidentes de seguridad)",
      ],
    },
    {
      id: "rcu-0229-2025",
      scope: "unsa",
      title: "Política Institucional Cero (0) Papel y Transformación Digital",
      code: "Directiva N° 004-2025-UM-URS / RCU N° 0229-2025",
      date: "12 de mayo de 2025",
      authority: "Consejo Universitario / Unidad de Modernización UNSA",
      summary:
        "Prohíbe el fotocopiado en el campus universitario e implementa el trámite documentario digital TRAMITED con uso de firma digital certificada.",
      keyControls: [
        "Prohibición estricta de fotocopiado con fines académicos y administrativos",
        "Uso obligatorio del sistema TRAMITED para expedientes electrónicos",
        "Despliegue de Firma Digital Certificada con plenos efectos jurídicos y no repudio",
        "Digitalización de trámites de estudiantes (matrícula, certificados, boletas)",
      ],
    },
    {
      id: "rr-0503-2026",
      scope: "unsa",
      title: "Conformación del Equipo de Respuesta ante Incidentes (CSIRT-UNSA)",
      code: "Resolución Rectoral N° 0503-2026",
      date: "25 de marzo de 2026",
      authority: "Rectorado UNSA",
      summary:
        "Crea el CSIRT-UNSA bajo los lineamientos del Centro Nacional de Seguridad Digital de la PCM y designa al Oficial de Seguridad y Confianza Digital.",
      keyControls: [
        "Designación del OSCD: Mag. Luis Renán Felipe Piccone Díaz (Jefe USIRT)",
        "Notificación obligatoria de incidentes al Centro Nacional de Seguridad Digital (PCM)",
        "Supervisión de seguridad y privacidad a proveedores cloud y software externo",
        "Gestión continua de vulnerabilidades y hardening perimetral de servidores",
      ],
    },
  ];

  const filteredDocs =
    filter === "all" ? documents : documents.filter((d) => d.scope === filter);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header y Filtro */}
      <div className="rounded-3xl surface-glass p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e1a35] border border-cyan-500/30 text-cyan-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Repositorio de Normativas y Directivas
            </h2>
            <p className="text-xs text-slate-400">
              Base de conocimiento pericial que alimenta al sistema y al motor analítico
            </p>
          </div>
        </div>

        {/* Pill Filter Tabs (Estilo Referencia 1) */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-[#091124] p-1 border border-white/[0.06]">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              filter === "all"
                ? "bg-[#182c57] text-white border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Todas ({documents.length})
          </button>
          <button
            onClick={() => setFilter("nacional")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              filter === "nacional"
                ? "bg-[#182c57] text-white border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Nacional LPDP (3)
          </button>
          <button
            onClick={() => setFilter("unsa")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              filter === "unsa"
                ? "bg-[#182c57] text-white border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Institucional UNSA (4)
          </button>
        </div>
      </div>

      {/* Grid de Fichas Normativas */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 items-start">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl surface-glass p-5 shadow-lg space-y-3 transition-all hover:border-cyan-500/30"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs font-bold text-cyan-300">
                {doc.code}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  doc.scope === "unsa"
                    ? "bg-cyan-950/80 text-cyan-400 border border-cyan-500/30"
                    : "bg-blue-950/80 text-blue-400 border border-blue-500/30"
                }`}
              >
                {doc.scope === "unsa" ? "UNSA" : "LEY NACIONAL"}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white leading-tight">
              {doc.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 border-b border-white/[0.05] pb-2.5">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-500" />
                <span>{doc.date}</span>
              </span>
              <span>•</span>
              <span className="truncate">{doc.authority}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {doc.summary}
            </p>

            <div className="rounded-2xl bg-[#091124] p-3 space-y-1.5 border border-white/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Controles Clave Auditados:
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {doc.keyControls.map((ctrl, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 shrink-0">•</span>
                    <span>{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
