"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Search,
  Download,
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  RotateCcw,
  Building,
  FileCode2,
  FileCheck2,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ResultadoAuditoria, Hallazgo } from "@/types/audit";

interface AuditWorkstationProps {
  unsaContext: boolean;
  resultado: ResultadoAuditoria | null;
  onAuditCompleted: (res: ResultadoAuditoria | null) => void;
  onExportReport: () => void;
}

export function AuditWorkstation({
  unsaContext,
  resultado,
  onAuditCompleted,
  onExportReport,
}: AuditWorkstationProps) {
  const [inputTab, setInputTab] = useState<"upload" | "text">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");
  const [expandedFindings, setExpandedFindings] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setError(null);
    }
  };

  const handleLoadSample = (sample: "insecure" | "unsa") => {
    setInputTab("text");
    setError(null);
    if (sample === "insecure") {
      setTextInput(
        `POLÍTICA DE PRIVACIDAD Y CONDICIONES DEL SERVICIO (TIENDA DIGITAL DEMO)\n\n` +
          `1. Recopilación de información: Recopilamos nombres completos, teléfonos, datos de tarjetas de crédito y registros de compras para procesar sus pedidos.\n` +
          `2. Conservación y Servidores: Su información personal se conservará de manera indefinida en servidores en la nube ubicados en el extranjero con fines publicitarios y de prospección comercial.\n` +
          `3. Terceros: Nos reservamos el derecho de compartir sus datos con socios estratégicos sin previo aviso ni consentimiento adicional.`
      );
    } else {
      setTextInput(
        `POLÍTICA DE PRIVACIDAD - UNIVERSIDAD NACIONAL DE SAN AGUSTÍN DE AREQUIPA (UNSA)\n` +
          `Domicilio: Calle Santa Catalina N° 117, Arequipa, Perú.\n\n` +
          `1. Finalidades: Tratamiento directo de datos de Estudiantes (matrícula, bienestar social, notas), Docentes (aulas virtuales, escalafón) y Egresados.\n` +
          `2. Bancos de Datos: Estudiantes, Usuarios de Biblioteca, Grados y Títulos, Seguridad y Vigilancia, Recursos Humanos.\n` +
          `3. Derechos ARCO: Los derechos de Acceso, Rectificación, Cancelación y Oposición se canalizan mediante odp@unsa.edu.pe o en Mesa de Partes Calle San Agustín N° 115.\n` +
          `4. Plazo de Conservación: La autorización otorgada permite el tratamiento de datos de manera indefinida o hasta que el titular revoque expresamente su consentimiento.`
      );
    }
  };

  const handleRunAudit = async () => {
    setError(null);
    if (inputTab === "upload" && !file) {
      setError("Por favor selecciona un archivo PDF o TXT para inspeccionar.");
      return;
    }
    if (inputTab === "text" && !textInput.trim()) {
      setError("Por favor ingresa el texto de la política a inspeccionar.");
      return;
    }

    setLoading(true);

    try {
      let res: Response;
      if (inputTab === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("includeUnsa", String(unsaContext));
        formData.append("runGemini", "true");

        res = await fetch("/api/audit", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textInput,
            fileName: inputTab === "upload" && file ? file.name : "Política ingresada",
            includeUnsaContext: unsaContext,
            runGeminiAnalysis: true,
          }),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al procesar la auditoría.");
      }

      onAuditCompleted(data.data);

      const exp: Record<string, boolean> = {};
      data.data.hallazgos.forEach((h: Hallazgo) => {
        exp[h.controlId] = true;
      });
      setExpandedFindings(exp);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleFinding = (id: string) => {
    setExpandedFindings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFindings = resultado
    ? severityFilter === "ALL"
      ? resultado.hallazgos
      : resultado.hallazgos.filter((h) => h.gravedad === severityFilter)
    : [];

  return (
    <div className="space-y-6">
      {/* ── FILA SUPERIOR: KPIS EJECUTIVOS DE AUDITORÍA ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* KPI 1: Score */}
        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Nivel de Conformidad
          </span>
          <div className="text-2xl font-extrabold font-mono text-white">
            {resultado ? `${resultado.scoreCumplimiento} / 100` : "— / 100"}
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full transition-all duration-500 ${
                resultado
                  ? resultado.scoreCumplimiento >= 85
                    ? "bg-emerald-400"
                    : resultado.scoreCumplimiento >= 50
                    ? "bg-amber-400"
                    : "bg-rose-500"
                  : "bg-slate-700"
              }`}
              style={{ width: `${resultado ? resultado.scoreCumplimiento : 0}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Dictamen */}
        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Dictamen Técnico
          </span>
          <div className="flex items-center gap-2 pt-1">
            {resultado ? (
              <>
                {resultado.dictamen === "CONFORME" && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {resultado.dictamen === "CONFORME CON SALVEDADES" && (
                  <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                )}
                {resultado.dictamen === "NO CONFORME" && (
                  <AlertOctagon className="h-5 w-5 text-rose-400 shrink-0" />
                )}
                <span
                  className={`text-sm font-bold truncate ${
                    resultado.dictamen === "CONFORME"
                      ? "text-emerald-400"
                      : resultado.dictamen === "CONFORME CON SALVEDADES"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {resultado.dictamen}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-slate-500">
                Pendiente de ejecución
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {resultado
              ? resultado.dictamen === "CONFORME"
                ? "Sin observaciones críticas"
                : "Se identificaron no conformidades"
              : "Carga un documento para dictaminar"}
          </p>
        </div>

        {/* KPI 3: Exposición Económica en Soles */}
        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Exposición Económica (PEN)
          </span>
          <div className="text-lg font-bold font-mono text-rose-300">
            {resultado ? resultado.sancionTotalEstimadaSoles : "S/ 0.00"}
          </div>
          <p className="text-[10px] text-slate-400">
            Escala oficial ANPD (Arts. 110-112 D.S. 003)
          </p>
        </div>

        {/* KPI 4: Sanción en UIT */}
        <div className="rounded-2xl surface-glass p-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Régimen Sancionador UIT
          </span>
          <div className="text-lg font-bold font-mono text-cyan-300">
            {resultado ? resultado.sancionTotalEstimadaUIT : "0 UIT"}
          </div>
          <p className="text-[10px] text-slate-400">
            {resultado
              ? `${resultado.totalHallazgos} control(es) observados`
              : "5 principios auditados"}
          </p>
        </div>
      </div>

      {/* ── FILA CENTRAL: DUAL PANEL (ENTRADA DEL DOCUMENTO + DICTAMEN IA) ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Panel Izquierdo: Entrada del Documento (6 columnas) */}
        <div className="lg:col-span-6 rounded-2xl surface-glass p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputTab("upload")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  inputTab === "upload"
                    ? "bg-[#182c57] text-white border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Upload className="h-3.5 w-3.5 text-cyan-400" />
                <span>Subir Archivo PDF</span>
              </button>

              <button
                onClick={() => setInputTab("text")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  inputTab === "text"
                    ? "bg-[#182c57] text-white border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Editor de Texto</span>
              </button>
            </div>

            {(file || textInput) && (
              <button
                onClick={() => {
                  setFile(null);
                  setTextInput("");
                  setError(null);
                }}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          {inputTab === "upload" ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-xl border border-dashed border-white/[0.12] bg-[#091124]/60 p-8 text-center transition-all hover:border-cyan-500/40 hover:bg-[#0c1630]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#142345] border border-cyan-500/30 text-cyan-400 mb-2 shadow-md">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-white">
                {file ? file.name : "Haz clic o arrastra una política en PDF o TXT"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB • Archivo preparado`
                  : "Hasta 10 MB (con capa de texto seleccionable)"}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Pega aquí las cláusulas de privacidad, formularios de consentimiento o términos de servicio..."
                rows={6}
                className="w-full rounded-xl bg-[#091124] p-3 text-xs font-mono text-slate-200 placeholder-slate-500 border border-white/[0.08] focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 leading-relaxed"
              />
              <div className="flex justify-end text-[10px] text-slate-500">
                <span>{textInput.length} caracteres</span>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-rose-950/60 p-2.5 text-xs text-rose-300 border border-rose-500/30 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Acciones del panel de entrada */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/[0.05]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-[11px] text-slate-500">Cargar:</span>
              <button
                type="button"
                onClick={() => handleLoadSample("insecure")}
                className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 text-[11px]"
              >
                <FileCode2 className="h-3 w-3" />
                <span>Muestra Insegura</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleLoadSample("unsa")}
                className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 text-[11px]"
              >
                <Building className="h-3 w-3" />
                <span>Muestra UNSA</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleRunAudit}
              disabled={loading}
              className="btn-cyan-glow flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all disabled:opacity-50"
            >
              <Search className="h-4 w-4" />
              <span>{loading ? "Inspeccionando..." : "Ejecutar Auditoría"}</span>
            </button>
          </div>
        </div>

        {/* Panel Derecho: Dictamen Ejecutivo IA (6 columnas) */}
        <div className="lg:col-span-6 rounded-2xl surface-glass p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Dictamen Ejecutivo Pericial
                </h3>
              </div>
              <span className="rounded bg-[#091124] px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-white/[0.08]">
                Gemini 2.0 Flash
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-300 leading-relaxed max-h-[220px] overflow-y-auto pr-1 whitespace-pre-wrap font-sans">
              {resultado?.analisisGemini || (
                <span className="text-slate-500 italic">
                  El dictamen ejecutivo cualitativo y el plan de subsanación se
                  generarán automáticamente una vez ejecutada la auditoría pericial.
                </span>
              )}
            </div>
          </div>

          {resultado && (
            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Documento: <strong className="text-slate-200">{resultado.metadatos.documentoAuditado}</strong>
              </span>

              <button
                onClick={onExportReport}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-all shadow-[0_2px_10px_rgba(37,99,235,0.3)]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Exportar Informe (.md)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── FILA INFERIOR: MATRIZ DE CÉDULAS DE PAPELES DE TRABAJO ── */}
      <div className="rounded-2xl surface-glass p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Cédulas de Papel de Trabajo y Hallazgos
            </h3>
            <p className="text-[11px] text-slate-400">
              Desglose pericial de condición, criterio normativo, tipificación y medidas correctivas
            </p>
          </div>

          {/* Filtros de severidad */}
          {resultado && (
            <div className="flex items-center gap-1 rounded-xl bg-[#091124] p-1 border border-white/[0.06] text-[10px]">
              {["ALL", "MUY GRAVE", "GRAVE", "LEVE"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    severityFilter === sev
                      ? "bg-[#182c57] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sev === "ALL" ? `Todos (${resultado.hallazgos.length})` : sev}
                </button>
              ))}
            </div>
          )}
        </div>

        {!resultado ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <FileText className="mx-auto h-8 w-8 text-slate-600 mb-2" />
            <span>Ejecuta la auditoría para desplegar las cédulas de papeles de trabajo.</span>
          </div>
        ) : filteredFindings.length === 0 ? (
          <div className="py-8 text-center text-xs text-emerald-400">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
            <span>No se detectaron no conformidades para el filtro seleccionado.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFindings.map((h: Hallazgo) => {
              const isExpanded = expandedFindings[h.controlId] ?? true;
              return (
                <div
                  key={h.controlId}
                  className="rounded-xl bg-[#091124]/80 p-4 border border-white/[0.06] space-y-3 transition-all hover:border-white/[0.12]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => toggleFinding(h.controlId)}
                      className="flex items-start gap-3 text-left flex-1"
                    >
                      <span className="font-mono text-xs font-bold text-cyan-300 pt-0.5">
                        {h.controlId}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">
                            {h.principio}
                          </h4>
                          <span
                            className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                              h.gravedad === "MUY GRAVE"
                                ? "bg-rose-950/90 text-rose-300 border border-rose-500/30"
                                : h.gravedad === "GRAVE"
                                ? "bg-amber-950/90 text-amber-300 border border-amber-500/30"
                                : "bg-blue-950/90 text-blue-300 border border-blue-500/30"
                            }`}
                          >
                            {h.gravedad}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {h.tipificacion}
                        </p>
                      </div>
                    </button>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs font-bold text-rose-300">
                        {h.sancionUIT}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400">
                        {h.sancionSoles}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/[0.05] pt-3 text-xs leading-relaxed">
                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                            Condición (Hecho Observado):
                          </span>
                          <span className="text-slate-300">{h.condicion}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                            Criterio Legal / Normativo:
                          </span>
                          <span className="text-cyan-300 font-mono text-[11px]">
                            {h.criterio}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold text-emerald-400 block text-[10px] uppercase">
                            Recomendación Técnica de Subsanación:
                          </span>
                          <span className="text-slate-200">{h.recomendacion}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
