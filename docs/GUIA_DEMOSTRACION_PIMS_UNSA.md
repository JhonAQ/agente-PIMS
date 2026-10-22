# GUÍA MAESTRA DE SUSTENTACIÓN Y DEMOSTRACIÓN EN VIVO
## Auditoría de Sistemas • PIMS & LPDP N° 29733 (UNSA - Grupo 8)

---

## PARTE 1: ¿QUÉ ES PIMS? (MARCO CONCEPTUAL PARA EL ESTUDIANTE)

### 1.1 Definición Fundamental
* **PIMS** significa **Privacy Information Management System** (Sistema de Gestión de Privacidad de la Información).
* Es una extensión del **SGSI** (Sistema de Gestión de Seguridad de la Información, norma **ISO/IEC 27001**) estandarizada internacionalmente bajo la norma **ISO/IEC 27701**.
* Mientras ISO 27001 protege los activos de información bajo la tríada **CIA** (*Confidencialidad, Integridad y Disponibilidad*), ISO 27701 (PIMS) introduce los controles específicos para proteger a las **personas físicas titulares de datos** (*PII - Personally Identifiable Information*).

### 1.2 Diferencia Clave entre "Seguridad" y "Privacidad"
| Dimensión | Seguridad de la Información (ISO 27001) | Privacidad de la Información (PIMS / ISO 27701) |
| :--- | :--- | :--- |
| **Objetivo central** | Proteger los datos contra robo, alteración o pérdida. | Garantizar que el tratamiento de datos respete los derechos del titular. |
| **Pregunta clave** | *¿El servidor está cifrado y protegido contra hackers?* | *¿Tenemos consentimiento legal para recolectar ese dato sensible y para esa finalidad?* |
| **Foco de control** | Firewalls, parches, RBAC, backups, cifrado AES-256. | Consentimiento libre y previo, plazos de retención, flujos ARCO, contratos de encargo. |
| **Sanción** | Pérdida de negocio o impacto reputacional. | Multas administrativas de la ANPD (hasta 100 UIT por infracción). |

### 1.3 El Marco Legal Peruano Aplicable
En el Perú, el PIMS se aterriza directamente sobre el régimen legal vigente fiscalizado por la **Autoridad Nacional de Protección de Datos Personales (ANPD)** adscrita al MINJUS:

1. **Ley N° 29733 (Ley de Protección de Datos Personales - LPDP):**
   * Establece los **Principios Rectores**: Legalidad, Consentimiento, Finalidad, Proporcionalidad, Calidad, Seguridad, Disposición de Recurso y Nivel de Protección Adecuado.
   * Regula los **Derechos ARCO**: Acceso (Art. 19), Rectificación (Art. 20), Cancelación/Supresión (Art. 20) y Oposición (Art. 21).
2. **Decreto Supremo N° 003-2013-JUS (Reglamento de la Ley N° 29733):**
   * Tipifica las infracciones:
     * **Leves** (0.5 a 5 UIT - S/ 2,575 a S/ 25,750): Trámites formales no atendidos a tiempo, no actualizar datos.
     * **Graves** (más de 5 hasta 50 UIT - S/ 25,750 a S/ 257,500): Tratar datos sin consentimiento expreso, consentimientos tácitos, almacenar sin plazo de caducidad, obstruir derechos ARCO.
     * **Muy Graves** (más de 50 hasta 100 UIT - S/ 257,500 a S/ 515,000): Tratar datos sensibles o biométricos sin consentimiento por escrito, transferencias transfronterizas sin garantías ni autorización.
   * Plazos perentorios de respuesta ARCO:
     * **Acceso:** 20 días hábiles (Art. 54).
     * **Rectificación, Cancelación u Oposición:** 10 días hábiles (Art. 55).
3. **Directiva de Seguridad (Resolución Directoral N° 019-2013-JUS):**
   * Clasifica las medidas técnicas de seguridad de TI en tres niveles según la criticidad del banco de datos:
     * **Básico:** Datos identificativos simples (DNI, nombres, teléfono).
     * **Medio:** Hábitos de consumo, información financiera no bancaria.
     * **Crítico:** Datos biométricos (huellas, rostro), datos de salud, ingresos económicos, tarjetas bancarias completas y CVV. Exige cifrado estricto en reposo y tránsito y logs inalterables.

### 1.4 El Contexto Institucional UNSA (Universidad Nacional de San Agustín)
* **Titular del Banco de Datos:** Universidad Nacional de San Agustín de Arequipa (RUC: `20163646499`).
* **Bancos de Datos Institucionales:** Banco de Alumnos, Egresados, Docentes y Administrativos, Postulantes, Comedor Universitario (datos médicos/socioeconómicos sensibles), y Cámaras de Videovigilancia del Campus.
* **Canal ARCO Oficial:** `odp@unsa.edu.pe` o Mesa de Partes (Calle San Agustín N° 115).
* **Régimen Especial:** La UNSA maneja datos de más de 25,000 estudiantes; el uso de plataformas como Moodle en la nube (AWS/Google) o pasarelas de pago exige contratos de encargo y consentimiento explícito en cada matrícula semestral.

---

## PARTE 2: GUÍA DE DEMOSTRACIÓN EN VIVO (GUION PASO A PASO)

### ESCENARIO A: Si el profesor pide la demostración del ASISTENTE / INTERFAZ WEB

#### Paso 1: Introducción Ejecutiva (30 a 45 segundos)
> *"Buenas tardes profesor / miembros del jurado. Nuestro proyecto de Auditoría de Sistemas implementa una Suite Pericial de PIMS orientada a la Ley N° 29733 y la Directiva de Seguridad R.D. 019-2013-JUS, con alcance específico para la Universidad Nacional de San Agustín.*
> *El sistema no es un simple formulario: combina un motor heurístico determinista para tipificar infracciones en UIT con un modelo de inteligencia artificial (Gemini 3.0 Flash) entrenado en el marco regulatorio peruano para emitir dictámenes ejecutivos y papeles de trabajo periciales."*

#### Paso 2: Ejecución del Módulo de "Inspección & Dictamen"
1. Abre el navegador en `http://localhost:3000`.
2. En la barra de carga rápida (debajo de la zona de subida), presiona el botón **`PDF Demo Typst`**.
   * *Explicación al docente:* *"Profesor, para esta demostración hemos redactado y compilado con Typst una política institucional auténtica (`POL-PRIV-OTI-2025.pdf`), simulando las cláusulas reales del Campus Virtual y Aulas Digitales de la UNSA."*
3. Presiona el botón cian **`Ejecutar Auditoría`**.
4. Espera los 2 a 3 segundos del análisis determinista + Gemini y explica los paneles que se despliegan:

   * **A. Los 4 KPIs Ejecutivos Superiores:**
     * **Nivel de Conformidad:** Muestra `55 / 100` en barra ámbar.
     * **Dictamen Técnico:** `CONFORME CON SALVEDADES` (o `NO CONFORME`). Explica: *"El documento presenta no conformidades sustanciales que impiden una certificación de cumplimiento limpio."*
     * **Exposición Económica (PEN):** `Hasta S/ 257,500 por infracción`.
     * **Régimen Sancionador UIT:** `Más de 5 hasta 50 UIT por infracción` (Infracciones Graves detectadas).
   * **B. Dictamen Ejecutivo Pericial (Panel Derecho):**
     * Muestra el dictamen redactado en formato formal de auditoría (*A: OTI-UNSA, DE: Auditor Líder, ASUNTO, FECHA*).
     * Señala cómo la IA desglosa el **Nivel de Riesgo Crítico**, la nulidad de las cláusulas y el **Plan de Subsanación Priorizado**.
   * **C. Cédulas de Papel de Trabajo (Panel Inferior):**
     * Abre cada cédula desplegable y lee la estructura estándar de auditoría:
       1. **Condición:** *"La cláusula segunda establece que la mera autenticación con correo institucional suple el consentimiento expreso."*
       2. **Criterio:** *"Art. 12 de la Ley 29733 y Art. 12 del D.S. 003-2013-JUS: el consentimiento tácito está expresamente prohibido en el Perú."*
       3. **Tipificación y Multa:** *"Infracción Grave según el Art. 111 num. 1 inc. a del Reglamento (5.1 a 50 UIT)."*
       4. **Recomendación:** *"Implementar casillas de verificación (opt-in) desmarcadas por defecto con registro inalterable de versión, fecha y hora."*
5. Haz clic en **`Exportar Informe (.md)`** para demostrar la generación de evidencias documentales auditables para el legajo de auditoría.

#### Paso 3: Demostración del Módulo de "Asistente Copilot"
1. En el menú lateral izquierdo, haz clic en **`Asistente Copilot`**.
2. Explica: *"Este asistente no es un chat generalista; es un Copilot Pericial configurado con el rol de Auditor Líder de TI y cargado con el contexto de la LPDP y las directivas internas de la UNSA."*
3. Realiza una o dos de las siguientes preguntas periciales preparadas:

   * **Pregunta 1 (Derechos ARCO y Plazos):**
     > *"¿Cuáles son los plazos perentorios y el procedimiento técnico que debe seguir la UNSA si un alumno solicita la cancelación de sus datos biométricos?"*
     * *Puntos que destacará el Copilot:* 10 días hábiles para cancelación (Art. 55 D.S. 003), bloqueo previo antes de la supresión física, excepción de conservación si existe deber legal educativo/fiscal.
   * **Pregunta 2 (Flujo Transfronterizo en la Nube):**
     > *"La UNSA hospeda aulas virtuales en servidores AWS en Virginia (EE.UU.). ¿Qué requisitos jurídicos y de seguridad exige la Directiva R.D. 019-2013-JUS?"*
     * *Puntos que destacará el Copilot:* Inscripción de la transferencia en el Registro Nacional de la ANPD, contrato de encargo de tratamiento con cláusulas de protección equivalente, y cifrado TLS 1.3 / AES-256 (Nivel Crítico).
   * **Pregunta 3 (Grabación de Clases y Datos Sensibles):**
     > *"¿Es legal que un docente grabe la sesión virtual con cámaras encendidas y suba el video a un canal público de YouTube?"*
     * *Puntos que destacará el Copilot:* Es una infracción Grave o Muy Grave por difusión no autorizada de imagen/voz (dato personal) con fines incompatibles a la sesión pedagógica cerrada.

#### Paso 4: Demostración del Módulo de "Base Normativa"
1. Haz clic en **`Base Normativa`** en el sidebar.
2. Muestra al docente la biblioteca con los principios de la Ley 29733, la escala de sanciones de la ANPD y los controles de seguridad técnica clasificados por niveles (Básico, Medio, Crítico).

---

### ESCENARIO B: Si el profesor pide la demostración del SKILL (Modo Terminal / CLI)

Si el docente dice: *"¿Dónde está el skill de Antigravity?", "¿Cómo funciona por consola?"* o *"Muéstrame la lógica del agente"*:

#### Paso 1: Mostrar la Arquitectura del Skill
1. Abre la terminal en `/home/jhonaq/UNSA/AS/TIF/agente-PIMS`.
2. Muestra el archivo del skill:
   ```bash
   cat .agents/skills/lpdp-auditor/SKILL.md
   ```
3. Explica:
   * *"Profesor, un **Skill** en la especificación de agentes de Antigravity dota al modelo de un rol especializado (`Auditor Líder de Privacidad y Seguridad TI`), metodologías de trabajo (5 fases), parámetros de tipificación de multas y herramientas de ejecución determinista."*

#### Paso 2: Ejecución del Script de Inspección por Consola
1. Ejecuta el motor analítico determinista sobre la política demo insegura:
   ```bash
   python3 .agents/skills/lpdp-auditor/scripts/auditar_privacidad.py .agents/skills/lpdp-auditor/examples/politica_muestra_insegura.txt
   ```
2. Muestra la salida JSON estructurada en la terminal:
   * Explica los campos devueltos:
     * `score_cumplimiento`: Puntuación sobre 100.
     * `dictamen_global`: Calificación formal de auditoría.
     * `hallazgos`: Array estructurado con `control_id`, `principio`, `condicion`, `criterio`, `gravedad`, `tipificacion`, `sancion_estimada` y `recomendacion`.

#### Paso 3: Probar el PDF Oficial Directamente
1. Extrae y audita el archivo PDF generado:
   ```bash
   python3 -c "
   import json
   from unpdf import extractText # o leer el texto
   "
   # O directamente ejecutar sobre la muestra de texto de la UNSA:
   python3 .agents/skills/lpdp-auditor/scripts/auditar_privacidad.py "POLÍTICA UNSA: Los datos se conservarán de manera indefinida sin procedimiento de purga."
   ```
2. Explica al profesor: *"La arquitectura es híbrida: el script Python ejecuta el control heurístico estricto para garantizar que ninguna norma sea pasada por alto de forma determinista, mientras que el agente LLM aporta el juicio pericial experto para redactar el dictamen ejecutivo final."*

---

## PARTE 3: VOCABULARIO TÉCNICO DE AUDITORÍA (CÓMO HABLAR ANTE EL JURADO)

Usa siempre estos términos técnicos para transmitir autoridad y rigor metodológico:

1. **"Cédula de Papel de Trabajo":** Es el documento formal donde el auditor registra la evidencia, el procedimiento aplicado y la conclusión obtenida.
2. **"Estructura del Hallazgo":**
   * **Condición:** *"Lo que es"* (la situación de hecho observada en el sistema o documento).
   * **Criterio:** *"Lo que debe ser"* (la norma legal o estándar ISO infringido).
   * **Causa:** *"Por qué ocurrió"* (deficiencia de diseño de software, falta de directiva interna).
   * **Efecto:** *"El impacto o consecuencia"* (exposición económica a multas de la ANPD y riesgo de fuga de datos).
   * **Recomendación:** *"La solución técnica propuesta"* (cifrado, rediseño de interfaz, cláusula de opt-in).
3. **"Titular del Banco de Datos" vs. "Encargado del Tratamiento":**
   * La UNSA es el **Titular** (responsable de la gobernanza y decisiones sobre los datos).
   * Un proveedor SaaS (AWS, Google Workspace, Azure) es el **Encargado** (quien procesa por cuenta de la universidad bajo contrato).
4. **"Flujo Transfronterizo":** Cualquier transferencia de datos personales fuera del territorio peruano (servidores en la nube en el extranjero).
5. **"Principio de Calidad y Proporcionalidad":** Los datos no pueden recopilarse para finalidades ambiguas ni almacenarse indefinidamente; cuando la finalidad cesa, deben suprimirse o anonimizarse.

---

## PARTE 4: BANCO DE PREGUNTAS DIFÍCILES DEL PROFESOR Y CÓMO RESPONDERLAS

### Pregunta 1: "¿Por qué usar IA si esto se podría resolver con un formulario de preguntas o un simple checklist?"
> **Respuesta recomendada:**
> *"Excelente pregunta, profesor. Un checklist tradicional solo funciona si un humano ya leyó e interpretó el documento manualmente. En el mundo real, los contratos y políticas de TI contienen decenas de páginas con cláusulas redactadas de forma ambigua para ocultar consentimientos forzados (patrones oscuros o 'dark patterns').*
> *Nuestra solución utiliza IA generativa (Gemini 3.0 Flash) combinada con heurísticas normativas para realizar **análisis semántico profundo**: detecta si una cláusula en apariencia inocente incurre en consentimiento tácito o recolección desproporcionada, calcula la exposición en UIT y redacta de forma autónoma el dictamen ejecutivo y el plan de subsanación técnico."*

### Pregunta 2: "¿La IA sustituye la responsabilidad del auditor de sistemas?"
> **Respuesta recomendada:**
> *"De ninguna manera, profesor. Bajo las normas de ISACA y el estándar ISO 19011 de auditoría, la responsabilidad legal y el criterio profesional siempre recaen en el Auditor Líder humano.*
> *Nuestra herramienta actúa como un **acelerador pericial (Copilot)**: automatiza el trabajo de levantamiento de evidencia, cruce de artículos del D.S. 003 y cálculo de la matriz de riesgos, permitiendo al auditor auditar en minutos sistemas que antes demandaban semanas de revisión manual."*

### Pregunta 3: "¿Cómo determinan el cálculo de las sanciones en Soles y UIT?"
> **Respuesta recomendada:**
> *"El cálculo sigue rigurosamente el Título V del Decreto Supremo N° 003-2013-JUS (Arts. 109 al 112). Clasificamos cada hallazgo según la falta:*
> *- Faltas Leves (Art. 110): De 0.5 a 5 UIT.*
> *- Faltas Graves (Art. 111): De más de 5 a 50 UIT (ej. no contar con consentimiento).*
> *- Faltas Muy Graves (Art. 112): De más de 50 a 100 UIT (ej. vulneración de datos sensibles o biometría).*
> *Luego se multiplica por la UIT oficial vigente fijada por el MEF (S/ 5,150) para cuantificar la contingencia económica real a la que se expone la institución."*

### Pregunta 4: "¿Por qué el documento demo tiene score de 55 y no 0 si tiene varias faltas?"
> **Respuesta recomendada:**
> *"Porque el motor de auditoría evalúa la estructura completa del documento: el documento demo sí identifica al titular de la política (OTI - UNSA), delimita el ámbito de aplicación y prevé un canal de mesa de partes para ARCO, lo cual otorga puntaje base. Sin embargo, pierde 45 puntos por vicios graves en consentimiento tácito, recolección excesiva de datos financieros (CVV) y retención indefinida, lo que arroja el dictamen de 'Conforme con Salvedades' y activa las cédulas de observación."*

---

## RESUMEN DE EJECUCIÓN RÁPIDA (CHEATSHEET PARA EL DÍA DE LA PRESENTACIÓN)

1. **Verificar que el servidor esté activo:**
   * Abre `http://localhost:3000` en el navegador.
2. **Si el profesor pide probar un documento:**
   * Clic en **`PDF Demo Typst`** -> Clic en **`Ejecutar Auditoría`**.
   * Explica el **KPI de Multa en UIT**, el **Dictamen de Gemini** y despliega **1 Cédula de Papel de Trabajo**.
3. **Si el profesor pide hacer una consulta técnica:**
   * Abre **`Asistente Copilot`** y pregúntale: *"¿Qué requisitos exige la LPDP para tratar huellas dactilares de alumnos en el comedor de la UNSA?"*.
4. **Si el profesor pide ver el código o el skill:**
   * Muestra `.agents/skills/lpdp-auditor/SKILL.md` y corre `python3 .agents/skills/lpdp-auditor/scripts/auditar_privacidad.py .agents/skills/lpdp-auditor/examples/politica_muestra_insegura.txt`.
