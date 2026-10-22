"use client";

import React, { useState, useRef } from "react";
import {
  Sliders,
  FileCheck2,
  Zap,
  FolderOpen,
  Upload,
  FileText,
  Search,
  Clock,
  Download,
  AlertTriangle,
  CheckCircle,
  FileCode2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Building,
} from "lucide-react";
import type { ResultadoAuditoria, Hallazgo } from "@/types/audit";

interface AuditWorkbenchProps {
  unsaContext: boolean;
  onAuditCompleted: (resultado: ResultadoAuditoria) => void;
}

export function AuditWorkbench({
  unsaContext,
  onAuditCompleted,
}: AuditWorkbenchProps) {
  // Estados de entrada
  const [inputMode, setInputMode] = useState<"upload" | "text">("upload");
  const [inspectionMode, setInspectionMode] = useState<"full" | "heuristic">("full");
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [fileName, setFileName] = useState("");

  // Estados de proceso
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoAuditoria | null>(null);
  const [expandedFindings, setExpandedFindings] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejador de selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setFileName(selected.name);
      setError(null);
    }
  };

  // Carga rápida de muestras
  const handleLoadSample = async (type: "insecure" | "unsa") => {
    setInputMode("text");
    setError(null);
    if (type === "insecure") {
      setFileName("politica_muestra_insegura.txt");
      setTextInput(
        `POLÍTICA DE PRIVACIDAD Y TÉRMINOS DEL SERVICIO (TIENDA DEMO)\n\n` +
          `1. Recopilación de información: Recopilamos sus nombres, teléfonos, datos de tarjetas de crédito e historial de compras para procesar sus pedidos.\n` +
          `2. Finalidad y Conservación: Su información se conservará de manera indefinida en nuestros servidores en la nube ubicados en el extranjero con fines publicitarios y de prospección comercial.\n` +
          `3. Terceros: Nos reservamos el derecho de compartir sus datos con socios estratégicos sin previo aviso.`
      );
    } else {
      setFileName("politica_privacidad_unsa.html");
      setTextInput(
        `POLÍTICA DE PRIVACIDAD - UNIVERSIDAD NACIONAL DE SAN AGUSTÍN DE AREQUIPA (UNSA)\n` +
          `Domicilio: Calle Santa Catalina N° 117, Arequipa.\n` +
          `1. Finalidades: Tratamiento de datos de Estudiantes (matrícula, bienestar social, becas), Docentes (aulas virtuales, escalafón) y Egresados.\n` +
          `2. Bancos de Datos: Estudiantes, Usuarios de Biblioteca, Grados y Títulos, Seguridad y Vigilancia.\n` +
          `3. Derechos ARCO: Se ejercen mediante el correo odp@unsa.edu.pe o en Mesa de Partes Calle San Agustín N° 115.\n` +
          `4. Plazo: La autorización permite el tratamiento de manera indefinida o hasta que revoque su consentimiento.`
      );
    }
  };

  // Ejecución de auditoría
  const handleRunAudit = async () => {
    setError(null);
    if (inputMode === "upload" && !file) {
      setError("Por favor selecciona un archivo PDF o TXT para auditar.");
      return;
    }
    if (inputMode === "text" && !textInput.trim()) {
      setError("Por favor ingresa o pega el texto de la política a auditar.");
      return;
    }

    setLoading(true);

    try {
      let res: Response;
      if (inputMode === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("includeUnsa", String(unsaContext));
        formData.append("runGemini", String(inspectionMode === "full"));

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
            fileName: fileName || "Política analizada",
            includeUnsaContext: unsaContext,
            runGeminiAnalysis: inspectionMode === "full",
          }),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al procesar la auditoría.");
      }

      setResultado(data.data);
      onAuditCompleted(data.data);

      // Expandir todos los hallazgos por defecto
      const initialExpanded: Record<string, boolean> = {};
      data.data.hallazgos.forEach((h: Hallazgo) => {
        initialExpanded[h.controlId] = true;
      });
      setExpandedFindings(initialExpanded);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // Exportar papel de trabajo en Markdown
  const handleExportReport = async () => {
    if (!resultado) return;
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultado }),
      });
      if (!res.ok) throw new Error("No se pudo generar el reporte.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Papel_de_Trabajo_Auditoria_${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert("Error al descargar reporte: " + String(err));
    }
  };

  const toggleFinding = (id: string) => {
    setExpandedFindings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
      {/* ── COLUMNA IZQUIERDA: PARÁMETROS Y MODOS (Estilo Referencia 1) ── */}
      <div className="lg:col-span-4 space-y-4">
        {/* Header de sección lateral con icono en contenedor */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0e1a35] border border-cyan-500/25 text-cyan-400">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Motor de Auditoría
            </h2>
            <p className="text-xs text-slate-400">Parámetros de inspección PIMS</p>
          </div>
        </div>

        {/* Card 1: Auditoría Integral */}
        <button
          onClick={() => setInspectionMode("full")}
          className={`w-full text-left rounded-2xl p-4 transition-all ${
            inspectionMode === "full"
              ? "surface-glass-active shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "surface-glass hover:bg-[#122144]/60"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                inspectionMode === "full"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-slate-800/80 text-slate-400"
              }`}
            >
              <FileCheck2 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Auditoría Integral
                </span>
                <span className="rounded-full bg-cyan-950/80 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/20">
                  Recomendada
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Inspección determinista de los 5 principios normativos + dictamen
                cualitativo y plan de subsanación generado por Gemini.
              </p>
            </div>
          </div>
        </button>

        {/* Card 2: Inspección Heurística Rápida */}
        <button
          onClick={() => setInspectionMode("heuristic")}
          className={`w-full text-left rounded-2xl p-4 transition-all ${
            inspectionMode === "heuristic"
              ? "surface-glass-active shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "surface-glass hover:bg-[#122144]/60"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                inspectionMode === "heuristic"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-slate-800/80 text-slate-400"
              }`}
            >
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white">
                Escaneo Heurístico Rápido
              </span>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Ejecución instantánea del motor de reglas, tipificación de infracciones
                y cuantificación de multas sin llamada al LLM.
              </p>
            </div>
          </div>
        </button>

        {/* Card 3: Inyección Rápida de Muestras */}
        <div className="rounded-2xl surface-glass p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <FolderOpen className="h-4 w-4 text-cyan-400" />
            <span>Casos de Prueba Listos</span>
          </div>
          <p className="text-xs text-slate-400 leading-normal">
            Carga en 1 clic un artefacto de prueba para validar la detección de no
            conformidades:
          </p>
          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => handleLoadSample("insecure")}
              className="flex items-center justify-between rounded-xl bg-[#091224] px-3 py-2 text-xs font-medium text-slate-200 border border-white/[0.06] hover:border-cyan-500/30 hover:bg-[#0f1d3b] transition-all"
            >
              <span className="flex items-center gap-2">
                <FileCode2 className="h-3.5 w-3.5 text-rose-400" />
                <span>Política Insegura (Muestra)</span>
              </span>
              <span className="text-[10px] text-slate-500">Demo</span>
            </button>
            <button
              onClick={() => handleLoadSample("unsa")}
              className="flex items-center justify-between rounded-xl bg-[#091224] px-3 py-2 text-xs font-medium text-slate-200 border border-white/[0.06] hover:border-cyan-500/30 hover:bg-[#0f1d3b] transition-all"
            >
              <span className="flex items-center gap-2">
                <Building className="h-3.5 w-3.5 text-cyan-400" />
                <span>Política Web UNSA (Oficial)</span>
              </span>
              <span className="text-[10px] text-slate-500">Marzo 2021</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── COLUMNA DERECHA: ENTRADA Y RESULTADOS (Estilo Referencia 1) ── */}
      <div className="lg:col-span-8 space-y-6">
        {/* BLOQUE SUPERIOR DE ENTRADA / SEARCH BAR BLOCK */}
        <div className="rounded-3xl surface-glass p-5 shadow-xl">
          {/* Tabs superiores tipo píldora (como Por CUI / Por nombre de Ref 1) */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputMode("upload")}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  inputMode === "upload"
                    ? "bg-[#182c57] text-white border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Upload className="h-3.5 w-3.5 text-cyan-400" />
                <span>Subir Archivo PDF</span>
              </button>
              <button
                onClick={() => setInputMode("text")}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  inputMode === "text"
                    ? "bg-[#182c57] text-white border border-cyan-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Pegar Texto Directo</span>
              </button>
            </div>

            {(file || textInput) && (
              <button
                onClick={() => {
                  setFile(null);
                  setTextInput("");
                  setFileName("");
                  setResultado(null);
                  setError(null);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          {/* Área de Carga / Input */}
          {inputMode === "upload" ? (
            /* Dropzone estilo "Descarga por lotes" de Referencia 1 */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border border-dashed border-white/[0.12] bg-[#091124]/70 p-8 text-center transition-all hover:border-cyan-500/40 hover:bg-[#0c1630]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#142345] border border-cyan-500/30 text-cyan-400 shadow-md">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">
                {file ? file.name : "Haz clic o arrastra un archivo PDF o TXT aquí"}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB • Archivo seleccionado listo`
                  : "Soporta documentos de políticas, reglamentos o TdRs de software (hasta 10MB)"}
              </p>
            </div>
          ) : (
            /* Área de texto directo */
            <div className="space-y-2">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Pega aquí el contenido de la política de privacidad, formulario web o cláusula de tratamiento de datos personales..."
                rows={6}
                className="w-full rounded-2xl bg-[#091124] p-4 text-xs font-mono text-slate-200 placeholder-slate-500 border border-white/[0.08] focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 leading-relaxed"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{fileName || "Entrada manual de texto"}</span>
                <span>{textInput.length} caracteres</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-xl bg-rose-950/60 p-3 text-xs text-rose-300 border border-rose-500/30 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Barra de Acción Inferior con Botón Cian Neón (Matching Ref 1) */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>
                {loading
                  ? "Ejecutando inspección pericial..."
                  : "Respuesta y tipificación en tiempo real"}
              </span>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={loading}
              className="btn-cyan-glow flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4" />
              <span>{loading ? "Auditando..." : "Iniciar Auditoría"}</span>
            </button>
          </div>
        </div>

        {/* ── MALLA DE RESULTADOS DE AUDITORÍA (Malla inferior Ref 1) ── */}
        {resultado && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* PANEL IZQUIERDO: SCORE Y HALLAZGOS */}
            <div className="rounded-3xl surface-glass p-5 shadow-xl space-y-4">
              {/* Header de Cédulas */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                    <FileCheck2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Papeles de Trabajo
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {resultado.totalHallazgos} hallazgo(s) detectados
                    </p>
                  </div>
                </div>

                {/* Score Pill */}
                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold border ${
                    resultado.scoreCumplimiento >= 85
                      ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30"
                      : resultado.scoreCumplimiento >= 50
                      ? "bg-amber-950/60 text-amber-400 border-amber-500/30"
                      : "bg-rose-950/60 text-rose-400 border-rose-500/30"
                  }`}
                >
                  Score: {resultado.scoreCumplimiento}/100
                </div>
              </div>

              {/* Lista de Hallazgos (Cédulas) */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {resultado.hallazgos.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    <CheckCircle className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
                    <span>No se encontraron no conformidades. La política cumple los controles evaluados.</span>
                  </div>
                ) : (
                  resultado.hallazgos.map((h) => {
                    const isExpanded = expandedFindings[h.controlId] ?? false;
                    return (
                      <div
                        key={h.controlId}
                        className="rounded-2xl surface-glass-subtle p-3.5 transition-all hover:border-white/[0.12]"
                      >
                        <button
                          onClick={() => toggleFinding(h.controlId)}
                          className="flex w-full items-start justify-between text-left"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-cyan-300">
                                {h.controlId}
                              </span>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                                  h.gravedad === "MUY GRAVE"
                                    ? "bg-rose-950/80 text-rose-400 border border-rose-500/30"
                                    : h.gravedad === "GRAVE"
                                    ? "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                                    : "bg-blue-950/80 text-blue-400 border border-blue-500/30"
                                }`}
                              >
                                {h.gravedad}
                              </span>
                            </div>
                            <h4 className="mt-1 text-xs font-medium text-slate-200">
                              {h.principio}
                            </h4>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2 border-t border-white/[0.05] pt-2.5 text-[11px] leading-relaxed">
                            <div>
                              <span className="font-semibold text-slate-400">
                                Condición:{" "}
                              </span>
                              <span className="text-slate-300">{h.condicion}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-slate-400">
                                Criterio Legal:{" "}
                              </span>
                              <span className="text-cyan-300 font-mono text-[10px]">
                                {h.criterio}
                              </span>
                            </div>
                            <div className="rounded-lg bg-[#070e20] p-2 text-rose-300 border border-rose-500/20">
                              <span className="font-semibold">Sanción Estimada: </span>
                              <span>
                                {h.sancionUIT} ({h.sancionSoles})
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-slate-400">
                                Recomendación Técnica:{" "}
                              </span>
                              <span className="text-emerald-300">
                                {h.recomendacion}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* PANEL DERECHO: DICTAMEN EJECUTIVO IA Y DESCARGA */}
            <div className="rounded-3xl surface-glass p-5 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Dictamen Pericial
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Análisis pericial cualitativo
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-blue-950/70 px-2.5 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-500/20">
                    Gemini 2.0 Flash
                  </span>
                </div>

                {/* Exposición total consolidada */}
                <div className="mt-4 rounded-2xl bg-[#091124] p-3.5 border border-white/[0.06] text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Exposición Económica Total:</span>
                    <span className="font-mono font-bold text-rose-300">
                      {resultado.sancionTotalEstimadaUIT}
                    </span>
                  </div>
                  <div className="mt-1 text-right font-mono text-[11px] text-slate-400">
                    {resultado.sancionTotalEstimadaSoles}
                  </div>
                </div>

                {/* Contenido del informe cualitativo */}
                <div className="mt-4 max-h-[380px] overflow-y-auto pr-1 text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                  {resultado.analisisGemini ||
                    "El análisis determinista ha concluido. No se generaron observaciones adicionales."}
                </div>
              </div>

              {/* Botón de Descarga formal de papel de trabajo */}
              <div className="pt-3 border-t border-white/[0.06]">
                <button
                  onClick={handleExportReport}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-[0_4px_15px_rgba(37,99,235,0.35)]"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar Papel de Trabajo (.md)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
