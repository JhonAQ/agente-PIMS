# Base de Conocimiento UNSA - Documentación para Auditoría PIMS / LPDP

Esta carpeta contiene la documentación y normativas específicas de la **Universidad Nacional de San Agustín de Arequipa (UNSA)** orientadas a la fiscalización de privacidad, protección de datos personales y seguridad de la información.

> **Modularidad y Aislamiento:**
> Los PDFs depositados en `raw_pdfs/` están ignorados en Git por `.gitignore` para no saturar el repositorio. 
> Si la sustentación requiere el caso UNSA, el asistente ingestará estos documentos. Si el docente no lo solicita, este módulo se mantiene desacoplado y el agente opera como auditor general de la Ley N° 29733 e ISO/IEC 27701.

---

## 1. Documentos Prioritarios a Descargar

Colocar los archivos descargados dentro de la carpeta:
📁 `knowledge/unsa/raw_pdfs/`

Se recomienda usar los siguientes nombres estandarizados:

### A. Política de Privacidad Web de la UNSA
* **Nombre de archivo sugerido:** `01_politica_privacidad_unsa.pdf`
* **Importancia:** Documento maestro donde la universidad declara a la comunidad (estudiantes, docentes, egresados, visitantes) las finalidades del tratamiento, los bancos de datos y el canal oficial de derechos ARCO.
* **Dónde conseguirlo:**
  1. Ingresar a [unsa.edu.pe](https://www.unsa.edu.pe/).
  2. Ir al pie de página (footer) y hacer clic en **"Política de Privacidad"** o **"Protección de Datos Personales"**.
  3. En el navegador: Presionar `Ctrl + P` -> Guardar como PDF en `knowledge/unsa/raw_pdfs/01_politica_privacidad_unsa.pdf`.

### B. Directiva de Aulas Virtuales y Retención de Datos
* **Nombre de archivo sugerido:** `02_directiva_aulas_virtuales_retencion_RCU_0153_2025.pdf`
* **Identificador formal:** Directiva N° 003-2025-UM-OTI / Resolución de Consejo Universitario N° 0153-2025.
* **Importancia:** Regula el almacenamiento, tiempos máximos de conservación y depuración periódica de la información académica en las plataformas digitales (DUTIC / Moodle). Vital para evaluar el principio de **Calidad y Temporalidad (Art. 8 Ley 29733)**.
* **Dónde conseguirlo:**
  1. Portal de Transparencia de la UNSA ([transparencia.unsa.edu.pe](https://transparencia.unsa.edu.pe/)) o Repositorio DSpace UNSA ([dspace.unsa.edu.pe](https://dspace.unsa.edu.pe/)).
  2. Buscar por número de resolución: `0153-2025` o término `"Directiva N° 003-2025-UM-OTI"`.

### C. Resolución del Equipo de Respuesta ante Incidentes de Seguridad Digital (CSIRT-UNSA)
* **Nombre de archivo sugerido:** `03_csirt_incidentes_seguridad_RR_0503_2026.pdf`
* **Identificador formal:** Resolución Rectoral N° 0503-2026.
* **Importancia:** Acredita el cumplimiento de la Directiva de Seguridad R.D. N° 019-2013-JUS respecto al registro y gestión de incidentes de seguridad digital y controles de nivel medio/crítico.
* **Dónde conseguirlo:**
  1. Buscador de Resoluciones de Rectorado en el portal de la UNSA / Transparencia.
  2. Búsqueda: `"0503-2026"` o `"Seguridad Digital"`.

### D. Directiva Cero Papel y Transformación Digital
* **Nombre de archivo sugerido:** `04_directiva_cero_papel_RCU_0229_2025.pdf`
* **Identificador formal:** Directiva N° 004-2025-UM-URS / Resolución de Consejo Universitario N° 0229-2025.
* **Importancia:** Determina los mecanismos de firma digital institucional, foliación electrónica y digitalización de trámites, verificando la validez del consentimiento por medios electrónicos.
* **Dónde conseguirlo:**
  1. Portal de Transparencia UNSA / DSpace buscando `"RCU 0229-2025"`.

### E. Ficha de Bancos de Datos Personales inscritos ante la ANPD (MINJUS)
* **Nombre de archivo sugerido:** `05_consulta_bancos_datos_anpd_unsa.pdf`
* **Importancia:** Verifica si la UNSA cumplió formalmente con inscribir sus bancos de datos (Estudiantes, Recursos Humanos, Biblioteca, etc.) ante el Registro Nacional de Protección de Datos Personales (omisión = Infracción Leve de 0.5 a 5 UIT por cada banco omitido).
* **Dónde consultarlo:**
  1. Ingresar al Portal del MINJUS - Consulta Pública del Registro de Bancos de Datos Personales ([gob.pe/minjus](https://www.gob.pe/minjus)).
  2. Buscar por RUC de la entidad: `20163646499` (Universidad Nacional de San Agustín de Arequipa).
  3. Imprimir / exportar como PDF la lista de bancos registrados.

---

## 2. Resumen Ya Integrado

Para que el agente pueda responder preguntas de la UNSA incluso antes de que descargues todos los PDFs, se ha creado el documento compilado:
📄 [`contexto_institucional_unsa.md`](file:///home/jhonaq/UNSA/AS/TIF/agente-PIMS/knowledge/unsa/contexto_institucional_unsa.md)

Este archivo sintetiza las finalidades oficiales, los canales ARCO (`odp@unsa.edu.pe`), las oficinas responsables y las resoluciones vigentes.
