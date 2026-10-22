// src/types/audit.ts
// Tipos compartidos entre el backend y el frontend

export type Gravedad = "LEVE" | "GRAVE" | "MUY GRAVE" | "NINGUNA";
export type Dictamen =
  | "CONFORME"
  | "CONFORME CON SALVEDADES"
  | "NO CONFORME";

export interface Hallazgo {
  controlId: string;
  principio: string;
  condicion: string;
  criterio: string;
  gravedad: Gravedad;
  tipificacion: string;
  sancionUIT: string;
  sancionSoles: string;
  recomendacion: string;
}

export interface ResultadoAuditoria {
  metadatos: {
    estandarEvaluado: string;
    fechaEjecucion: string;
    unidadEvaluadora: string;
    documentoAuditado: string;
    modoContexto: "LPDP_GENERAL" | "UNSA";
  };
  scoreCumplimiento: number;         // 0-100
  dictamen: Dictamen;
  totalHallazgos: number;
  hallazgos: Hallazgo[];
  analisisGemini?: string;           // Análisis cualitativo adicional del LLM
  sancionTotalEstimadaUIT: string;
  sancionTotalEstimadaSoles: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  includeUnsaContext?: boolean;
}

export interface AuditRequest {
  text?: string;          // Texto de política directo
  fileName?: string;      // Nombre del archivo subido (para metadatos)
  includeUnsaContext?: boolean;
  runGeminiAnalysis?: boolean;
}

export interface KnowledgeStatus {
  lpdpDocuments: string[];
  unsaDocuments: string[];
  unsaContextEnabled: boolean;
}
