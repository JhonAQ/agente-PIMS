"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Building2,
  FileText,
  Search,
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

export function LegalRepository() {
  const [filter, setFilter] = useState<"all" | "nacional" | "unsa">("all");
  const [search, setSearch] = useState("");

  const documents: NormativeDoc[] = [
    {
      id: "ley-29733",
      scope: "nacional",
      title: "Ley de Protección de Datos Personales",
      code: "Ley N° 29733",
      date: "03 de julio de 2011",
      authority: "Congreso de la República / MINJUS",
      summary:
        "Marco rector de orden público que garantiza el derecho fundamental a la autodeterminación informativa, principios de consentimiento, finalidad, proporcionalidad y seguridad.",
      keyControls: [
        "Art. 4-12: Principios rectores de legalidad, consentimiento previo y proporcionalidad",
        "Art. 13: Consentimiento expreso por escrito para datos sensibles o biométricos",
        "Art. 15: Requisitos de garantías de protección para flujo transfronterizo",
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
        "Desarrollo procedimental obligatorio: validez del consentimiento, plazos perentorios de atención de derechos ARCO y escala oficial de multas de hasta 100 UIT.",
      keyControls: [
        "Art. 12-18: Prohibición de consentimiento tácito o casillas premarcadas",
        "Art. 55: Plazo perentorio de 20 días hábiles para atender solicitudes de Acceso",
        "Art. 56: Plazo de 10 días hábiles para Rectificación, Cancelación y Oposición",
        "Art. 110-112: Tipificación de infracciones Leves (0.5-5 UIT), Graves (5-50 UIT) y Muy Graves (50-100 UIT)",
      ],
    },
    {
      id: "rd-019-2013",
      scope: "nacional",
      title: "Directiva de Seguridad de la Información con Datos Personales",
      code: "R.D. N° 019-2013-JUS/DNPDP",
      date: "08 de octubre de 2013",
      authority: "Autoridad Nacional de Protección de Datos Personales (ANPD)",
      summary:
        "Directriz técnica de seguridad lógica, física y organizativa requerida a sistemas automatizados y no automatizados de tratamiento de datos.",
      keyControls: [
        "Nivel Básico: Control de acceso con usuarios individuales y copias de seguridad",
        "Nivel Medio: Registro formal de incidencias de seguridad y asignación de perfiles RBAC",
        "Nivel Crítico: Cifrado en reposo (AES-256) para datos sensibles/financieros/salud",
        "Nivel Crítico: Cifrado en tránsito (TLS 1.2+) y logs de auditoría WORM (1 año)",
      ],
    },
    {
      id: "unsa-politica",
      scope: "unsa",
      title: "Política Oficial de Protección de Datos Personales de la UNSA",
      code: "Política Web Oficial",
      date: "Marzo, 2021",
      authority: "Universidad Nacional de San Agustín de Arequipa (UNSA)",
      summary:
        "Documento público institucional que regula el tratamiento de información de estudiantes, docentes y egresados en el portal web y sistemas de la universidad.",
      keyControls: [
        "10 bancos de datos declarados (Estudiantes, Recursos Humanos, Biblioteca, etc.)",
        "Canales de ejercicio ARCO: odp@unsa.edu.pe y Mesa de Partes Calle San Agustín 115",
        "Cláusula de almacenamiento indefinido (sujeta a observación por proporcionalidad)",
        "Responsabilidad sobre difusión de grabaciones de aulas virtuales",
      ],
    },
    {
      id: "rcu-0153-2025",
      scope: "unsa",
      title: "Regulación del Almacenamiento de Información en Aulas Virtuales",
      code: "Directiva N° 003-2025-UM-OTI / RCU N° 0153-2025",
      date: "17 de marzo de 2025",
      authority: "Consejo Universitario / OTI UNSA",
      summary:
        "Establece los plazos máximos de retención, respaldo y purga de información en la plataforma educativa Moodle y repositorios institucionales de la UNSA.",
      keyControls: [
        "Material didáctico y sílabos: Conservación obligatoria de 3 años",
        "Evaluaciones, exámenes y calificaciones: Conservación de 2 años",
        "Foros y actividades de interacción estudiantil: Conservación de 1 año",
        "Logs de auditoría y registros de acceso: Conservación mínima de 1 año",
      ],
    },
    {
      id: "rcu-0229-2025",
      scope: "unsa",
      title: "Política Institucional Cero Papel y Transformación Digital",
      code: "Directiva N° 004-2025-UM-URS / RCU N° 0229-2025",
      date: "12 de mayo de 2025",
      authority: "Consejo Universitario / Unidad de Modernización UNSA",
      summary:
        "Dispone la eliminación del fotocopiado en el campus universitario y establece el uso del sistema TRAMITED con expedientes electrónicos y firma digital certificada.",
      keyControls: [
        "Prohibición de fotocopiado con fines académicos y de gestión interna",
        "Obligatoriedad del sistema TRAMITED para todo trámite universitario",
        "Implementación de Firma Digital Certificada con no repudio",
        "Preservación de documentos electrónicos conforme a la Ley de Gobierno Digital",
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
        "Crea el CSIRT-UNSA, designa al Oficial de Seguridad y Confianza Digital e instruye la gestión y reporte de vulnerabilidades y ciberataques.",
      keyControls: [
        "Designación del OSCD: Mag. Luis Renán Felipe Piccone Díaz (Jefe USIRT)",
        "Notificación obligatoria de incidentes al Centro Nacional de Seguridad Digital (PCM)",
        "Auditoría técnica de seguridad perimétrica y monitoreo continuo de activos TI",
        "Evaluación de riesgos de proveedores en la nube y servicios externos",
      ],
    },
  ];

  const filteredDocs = documents.filter((d) => {
    const matchesScope = filter === "all" || d.scope === filter;
    const matchesSearch =
      search === "" ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.summary.toLowerCase().includes(search.toLowerCase());
    return matchesScope && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Barra de Filtros y Búsqueda */}
      <div className="rounded-2xl surface-glass p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Filtros de ámbito */}
        <div className="flex items-center gap-1.5 rounded-xl bg-[#091124] p-1 border border-white/[0.06]">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-[#182c57] text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Todas ({documents.length})
          </button>
          <button
            onClick={() => setFilter("nacional")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === "nacional"
                ? "bg-[#182c57] text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Nacionales LPDP (3)
          </button>
          <button
            onClick={() => setFilter("unsa")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === "unsa"
                ? "bg-[#182c57] text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Institucionales UNSA (4)
          </button>
        </div>

        {/* Input de Búsqueda */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por artículo o norma..."
            className="w-full rounded-xl bg-[#091124] pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 border border-white/[0.08] focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      {/* Grilla de Fichas Normativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="rounded-2xl surface-glass p-5 space-y-3 transition-all hover:border-cyan-500/30"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs font-bold text-cyan-300">
                {doc.code}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  doc.scope === "unsa"
                    ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/25"
                    : "bg-blue-950/80 text-blue-300 border border-blue-500/25"
                }`}
              >
                {doc.scope === "unsa" ? "UNSA" : "LEY NACIONAL"}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">
              {doc.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 border-b border-white/[0.05] pb-2">
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

            <div className="rounded-xl bg-[#091124] p-3 space-y-1.5 border border-white/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Disposiciones y Controles Clave:
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
