# Directiva N° 003-2025-UM-OTI: Regulación del Almacenamiento de Información de Aulas Virtuales

* **Norma Aprobatoria:** Resolución de Consejo Universitario N° 0153-2025
* **Fecha de Emisión:** 17 de marzo de 2025
* **Entidad Emisora:** Universidad Nacional de San Agustín de Arequipa (UNSA)
* **Órgano Proponente:** Oficina de Tecnologías de la Información (OTI) y Unidad de Modernización (UM)
* **Autoridad que Aprueba:** Dr. Hugo José Rojas Flores (Rector) y Consejo Universitario

---

## 1. Objeto y Finalidad

* **Objeto:** Establecer lineamientos técnicos, administrativos y de seguridad para regular el almacenamiento, conservación temporal, respaldo (backup), archivado y eliminación segura de la información generada en las aulas virtuales y entornos digitales de aprendizaje de la UNSA.
* **Finalidad:** Garantizar la disponibilidad, integridad, confidencialidad y trazabilidad de los datos académicos y registros del sistema, optimizando el uso de la infraestructura tecnológica y asegurando el estricto cumplimiento de la Ley de Protección de Datos Personales (Ley N° 29733) y las directivas del Archivo General de la Nación (AGN).

---

## 2. Alcance y Responsabilidades

* **Alcance:** Aplicación obligatoria para la Oficina de Tecnologías de la Información (OTI), Secretaría General (SG), decanatos, direcciones de escuela, docentes, estudiantes y personal administrativo de la UNSA.

### Roles y Responsabilidades Técnicas
1. **Oficina de Tecnologías de la Información (OTI):**
   * Diseñar, operar y custodiar la infraestructura tecnológica de almacenamiento local (on-premise) y en nube.
   * Ejecutar la política de copias de seguridad (backups), archivado y purga de información.
   * Gestionar permisos de acceso según el principio de privilegio mínimo y la política de protección de datos personales.
2. **Unidad de Sistemas de Información, Redes y Telecomunicaciones (USIRT):**
   * Configuración, monitoreo y soporte operativo de las plataformas de aulas virtuales (DUTIC / Moodle).
   * Asistir técnicamente en los procedimientos de depuración y eliminación de datos académicos bajo estándares de seguridad.
3. **Oficina de Asesoría Jurídica (OAJ):**
   * Fiscalizar el cumplimiento de la Ley N° 29733 (LPDP) y normativa conexa en las políticas de almacenamiento y borrado.
   * Asesorar legalmente ante auditorías, controversias o requerimientos de autoridades competentes.
4. **Decanatos y Direcciones Académicas:**
   * Definir criterios específicos de retención según la naturaleza disciplinaria de las asignaturas.
   * Gestionar solicitudes de consulta de registros históricos para fines de acreditación o control de calidad.
5. **Docentes:**
   * Custodiar sus credenciales de acceso institucional (responsabilidad intransferible).
   * Mantener actualizados los repositorios de aula durante el semestre activo y solicitar la depuración de materiales obsoletos.

---

## 3. Clasificación de la Información de Aulas Virtuales

La directiva categoriza los activos de información de los entornos virtuales en cuatro niveles:

1. **Material Didáctico:** Presentaciones de clase, guías de práctica, lecturas seleccionadas, enlaces multimedia y sílabos.
2. **Datos Académicos de Estudiantes:** Calificaciones, exámenes rendidos, tareas entregadas, historial de retroalimentación y actas de evaluación (información con valor académico y efectos legales).
3. **Datos Administrativos y Registros de Auditoría (Logs):** Reportes de asistencia, registros de sesión (timestamp, IP de conexión, usuario, acciones en plataforma) y trazas de auditoría de TI.
4. **Otras Evidencias de Interacción:** Comunicaciones privadas, foros de debate, chats grupales y repositorios de proyectos colaborativos.

---

## 4. Tabla Oficial de Tiempos de Retención de la Información

| Tipo de Información | Periodo de Retención Obligatorio | Justificación Técnica y Legal |
| :--- | :--- | :--- |
| **Material Didáctico** | **3 años** | Reutilización pedagógica en ciclos posteriores y evidencia documental para procesos de acreditación universitaria (SINEACE/ICACIT/SUNEDU). |
| **Evaluaciones y Calificaciones** | **2 años** | Atención de posibles reclamos de notas, rectificación de actas y fiscalización de control de calidad académica. |
| **Foros y Participación Estudiantil** | **1 año** | Análisis pedagógico y resolución de reclamos e incidencias a corto plazo. |
| **Registros del Sistema (Logs y Trazas)** | **1 año** | Auditorías internas de sistemas, trazabilidad forense e investigación de incidentes de seguridad digital (Art. 9 Ley 29733 / Directiva R.D. 019-2013-JUS). |

---

## 5. Ciclo de Vida y Transición del Almacenamiento

1. **Fase Activa y Post-Cierre (Hasta 1 semestre posterior):**
   * La información del curso se mantiene en los servidores de producción de alta disponibilidad para permitir consultas inmediatas, apelaciones o rectificaciones de calificación.
2. **Fase de Archivado:**
   * Cumplido el semestre posterior a la culminación de la cátedra, el aula virtual pasa al estado de **archivo pasivo** en sistemas de almacenamiento secundario (local o nube), restringiendo el acceso únicamente a personal autorizado por OTI mediante solicitud motivada.
3. **Fase de Eliminación Segura:**
   * Vencido el periodo de retención máximo de la tabla oficial, se procede a la purga definitiva.

---

## 6. Procedimiento de Eliminación y Destrucción Segura de Datos

El protocolo de purga garantiza que no ocurra exposición indebida ni recuperación no autorizada:

1. **Elaboración de Informe Técnico:** OTI elabora un informe técnico de descarte evaluando que la información sujeta a baja carece de valor administrativo, legal o fiscal remanente, conforme a los lineamientos del Archivo General de la Nación (AGN).
2. **Aprobación de Secretaría General:** El informe se eleva a Secretaría General para su validación de conformidad legal.
3. **Destrucción Definitiva:**
   * La ejecución técnica se realiza mediante métodos que impidan la reconstrucción de los datos (borrado seguro criptográfico de repositorios).
   * Levantamiento obligatorio de **Acta de Verificación y Purga** firmada por los responsables de OTI.
   * Preferencia por la automatización de procesos de eliminación segura mediante scripts validados.

---

## 7. Continuidad Operativa: Copias de Seguridad (Backups) y Disaster Recovery

* **Copias Periódicas:** Todo el contenido de las aulas virtuales debe contar con backups periódicos programados y verificados.
* **Plan de Recuperación ante Desastres (Disaster Recovery):** OTI mantendrá procedimientos formales de contingencia para restaurar las plataformas de aulas virtuales ante fallas catastróficas de hardware, ransomware o indisponibilidad de centros de datos.
