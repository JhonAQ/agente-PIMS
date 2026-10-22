# Base de Conocimiento UNSA: Gobernanza de Privacidad y LPDP N° 29733

Este documento condensa los antecedentes legales, organizacionales y técnicos de la **Universidad Nacional de San Agustín de Arequipa (UNSA)** relevantes para auditorías de Sistemas de Gestión de Privacidad de la Información (PIMS).

---

## 1. Ficha Institucional del Titular del Banco de Datos

* **Denominación:** Universidad Nacional de San Agustín de Arequipa (UNSA)
* **RUC:** `20163646499`
* **Naturaleza:** Entidad pública de educación superior universitaria.
* **Sede Central:** Calle Santa Catalina N° 117 / Calle San Agustín N° 115, Cercado de Arequipa, Perú.
* **Canal Oficial de Protección de Datos Personales (ARCO):** `odp@unsa.edu.pe`
* **Mesa de Partes Presencial:** Calle San Agustín N° 115 (Dirigido a Secretaría General).

---

## 2. Inventario Institucional de Bancos de Datos Personales

Conforme a la Política de Privacidad de la UNSA, la institución administra los siguientes bancos de datos principales:

| Banco de Datos | Titulares Comprendidos | Finalidad Declarada | Nivel de Seguridad Exigido (R.D. 019-2013-JUS) |
| :--- | :--- | :--- | :--- |
| **Estudiantes** | Alumnos de Pregrado, Posgrado, Segunda Especialidad | Matrícula, seguimiento académico, becas, bolsa de trabajo, registro de notas en SISUNSA/DUTIC. | **Medio** (incluye datos socioeconómicos y rendimiento académico). |
| **Usuarios de Biblioteca** | Comunidad universitaria y lectores externos | Control de préstamos bibliográficos, acceso a repositorios DSpace y bases indexadas. | **Básico** (datos de contacto e identificación). |
| **Grados y Títulos** | Egresados y graduados | Emisión y verificación de diplomas, grados de bachiller, títulos profesionales y posgrados (envío a SUNEDU). | **Medio** |
| **Seguridad y Vigilancia** | Alumnos, docentes, personal y visitantes | Control de accesos a campus universitarios (Ingenierías, Sociales, Biomédicas), videovigilancia CCTV. | **Básico / Medio** (imágenes de personas). |
| **Convenios y Pasantías** | Alumnos y docentes en intercambio | Gestión de convenios de movilidad académica nacional e internacional. | **Medio / Crítico** (implica flujo transfronterizo de datos). |
| **Recursos Humanos y Escalafón** | Docentes y personal administrativo | Legajos laborales, control de asistencia biométrica, planillas y aportes previsionales. | **Crítico** (incluye biometría de huella dactilar y datos bancarios/patrimoniales). |

---

## 3. Resoluciones y Directivas Tecnológicas Relevantes

### 3.1. Retención y Almacenamiento en Aulas Virtuales
* **Resolución:** Resolución de Consejo Universitario N° 0153-2025.
* **Directiva:** Directiva N° 003-2025-UM-OTI.
* **Regulación:** Establece plazos obligatorios para la conservación y posterior eliminación controlada de trabajos, grabaciones y evaluaciones en las plataformas institucionales de DUTIC. Previene la infracción por almacenamiento indefinido sin justificación legal.

### 3.2. Gestión de Incidentes de Seguridad Digital
* **Resolución:** Resolución Rectoral N° 0503-2026.
* **Órgano:** Equipo de Respuestas ante Incidentes de Seguridad Digital (CSIRT-UNSA).
* **Función:** Monitoreo y contención de incidentes de seguridad que afecten los activos de información, servidores y bases de datos institucionales.

### 3.3. Transformación Digital y Política Cero Papel
* **Resolución:** Resolución de Consejo Universitario N° 0229-2025.
* **Directiva:** Directiva N° 004-2025-UM-URS.
* **Regulación:** Uso de firma digital y expedientes electrónicos para trámites universitarios, asegurando validez jurídica en la manifestación de voluntad.

---

## 4. Puntos Críticos para Auditoría de Sistemas en la UNSA

1. **Consentimiento en Formularios Digitales:** Verificar si el portal de admisión, SISUNSA y mesas de partes virtuales cuentan con casillas de aceptación de política desmarcadas por defecto y enlace visible al aviso de privacidad.
2. **Flujo Transfronterizo:** La UNSA utiliza servicios en la nube (ej. Google Workspace for Education / Microsoft 365 / servidores externos de hosting). Debe verificarse la existencia de cláusulas de transferencia y garantías de seguridad contractuales bajo el Art. 15 de la Ley 29733.
3. **Plazos ARCO:** Las solicitudes canalizadas a `odp@unsa.edu.pe` deben registrarse con sello de tiempo para asegurar la respuesta dentro de los 10 días (rectificación, cancelación, oposición) o 20 días (acceso).
