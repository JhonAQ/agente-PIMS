= Introducción y Contexto del PIMS

En la actualidad, la gestión de la privacidad de la información no constituye únicamente una obligación legal, sino un pilar fundamental en la arquitectura de gobierno de Tecnologías de la Información (TI). Un Sistema de Gestión de Privacidad de la Información (PIMS, por sus siglas en inglés, comúnmente alineado a estándares como ISO/IEC 27701) exige que las organizaciones demuestren un control riguroso, trazable y verificable sobre el ciclo de vida de los datos personales que recopilan, procesan, transfieren y custodian.

En el contexto nacional peruano, este marco está regido obligatoriamente por la *Ley de Protección de Datos Personales (LPDP) N° 29733*, su Reglamento aprobado por *D.S. N° 003-2013-JUS* y la Directiva de Seguridad de la Información aprobada mediante *R.D. N° 019-2013-JUS*. 

El rol del auditor de sistemas consiste en examinar la conformidad de las medidas organizativas, procedimentales y técnicas implementadas por la entidad frente a los principios rectores de privacidad, los mecanismos de ejercicio de derechos ARCO (Acceso, Rectificación, Cancelación y Oposición), las condiciones de flujo transfronterizo y la correcta tipificación de riesgos con potencial sancionador ante la Autoridad Nacional de Protección de Datos Personales (ANPD / MINJUS).

El presente trabajo aborda la concepción, ingeniería y despliegue de un *Skill de Inteligencia Artificial especializado (`lpdp-auditor`)* que automatiza la inspección de artefactos digitales, transformando directivas de auditoría complejas en capacidades de asistencia inteligente para la fiscalización del PIMS.

= Marco Jurídico y Técnico del PIMS bajo la Normativa Peruana

Para garantizar que el skill y el agente inteligente operen con rigor pericial, se estructuró una base de conocimiento exhaustiva que mapea los preceptos de la Ley N° 29733 y sus normas conexas contra controles tangibles de auditoría de TI.

== Principios Rectores del Tratamiento de Datos Personales

La Ley N° 29733, en su Título I (artículos 4 al 12), establece los principios rectores que deben cumplirse de manera copulativa en cualquier base de datos o sistema de software:

#table(
  columns: (1.2fr, 1fr, 2fr, 2fr),
  fill: (col, row) => if row == 0 { rgb("1E3A8A") } else if calc.odd(row) { rgb("F1F5F9") } else { white },
  stroke: 0.5pt + gray,
  inset: 6pt,
  table.header(
    text(fill: white)[*Principio*],
    text(fill: white)[*Base Legal*],
    text(fill: white)[*Criterio de Evaluación Legal*],
    text(fill: white)[*Control Técnico / Evidencia en TI*],
  ),
  [*Legalidad*], [Art. 4 Ley 29733], [Prohíbe recopilación ilícita o fraudulenta.], [Trazabilidad de origen y prohibición de web scraping abusivo.],
  [*Consentimiento*], [Art. 5 y 12 Ley; Arts. 12-18 Regl.], [Libre, previo, expreso, informado e inequívoco. Escrito para sensibles.], [Logs de opt-in explícito, casillas no premarcadas en formularios web.],
  [*Finalidad*], [Art. 6 Ley; Art. 19 Regl.], [Fines determinados, explícitos y lícitos. Prohibido desvío de uso.], [Mapeo de esquemas de BD contra la finalidad informada en la política.],
  [*Proporcionalidad*], [Art. 7 Ley; Art. 20 Regl.], [Minimización: solo datos indispensables y pertinentes.], [Validación de campos obligatorios en UI y APIs.],
  [*Calidad*], [Art. 8 Ley; Art. 21 Regl.], [Datos exactos, actualizados y conservación temporal justificada.], [Depuración de registros obsoletos y reglas de retención en BD.],
  [*Seguridad*], [Art. 9 Ley; Arts. 32-42 Regl.], [Medidas técnicas y organizativas para evitar fuga o alteración.], [Cifrado, control de acceso RBAC, gestión de vulnerabilidades y backups.],
  [*Nivel Adecuado*], [Art. 11 Ley; Arts. 65-70 Regl.], [Garantías de protección en flujo transfronterizo.], [Cláusulas contractuales con proveedores Cloud (AWS, Azure, GCP).],
)

== Procedimiento y Plazos Legales de Derechos ARCO

Los artículos 18 al 22 de la Ley N° 29733 y los artículos 47 al 59 de su Reglamento norman el catálogo de derechos de los titulares. En auditoría de sistemas, es mandatorio auditar que los sistemas de información respeten escrupulosamente los plazos legales máximos de atención:

#table(
  columns: (1.2fr, 2.5fr, 1.3fr, 2fr),
  fill: (col, row) => if row == 0 { rgb("065F46") } else if calc.odd(row) { rgb("ECFDF5") } else { white },
  stroke: 0.5pt + gray,
  inset: 6pt,
  table.header(
    text(fill: white)[*Derecho ARCO*],
    text(fill: white)[*Alcance y Contenido Operativo*],
    text(fill: white)[*Plazo Legal Máximo*],
    text(fill: white)[*Verificación en Sistemas*],
  ),
  [*Acceso*], [Informar qué datos se tratan, origen, finalidad y destinatarios.], [*20 días hábiles*], [Reporte automatizado descargable por el usuario titular.],
  [*Rectificación*], [Actualizar, corregir o incluir datos inexactos o incompletos.], [*10 días hábiles*], [Portal de autoservicio o ticket de mesa de partes virtual.],
  [*Cancelación*], [Supresión o bloqueo cuando expiró la finalidad o no hay consentimiento.], [*10 días hábiles*], [Procedimiento de borrado lógico y anonimización de logs.],
  [*Oposición*], [Negarse al tratamiento por motivo legítimo fundado.], [*10 días hábiles*], [Mecanismo opt-out para campañas de marketing y perfilado.],
)

== Medidas Técnicas de Seguridad (Directiva R.D. N° 019-2013-JUS/DNPDP)

La autoridad nacional establece tres niveles de medidas de seguridad obligatorias en TI:
- *Nivel Básico (Datos Identificativos):* Exige autenticación de usuarios, contraseñas robustas, control de accesos por roles y copias de seguridad periódicas verificables.
- *Nivel Medio (Datos Patrimoniales y Comerciales):* Demanda control de acceso físico a servidores, registro de incidencias de seguridad y auditorías técnicas bienales obligatorias.
- *Nivel Crítico (Datos Sensibles, Salud, Biometría):* Exige *cifrado obligatorio en reposo (AES-256)* y en tránsito (TLS 1.2+), registros de auditoría inalterables (tecnología WORM / SIEM) y segregación estricta de entornos.

== Régimen Sancionador y Escala Oficial de Multas en UIT

El artículo 38 de la Ley y los artículos 110 al 119 de su Reglamento tipifican las infracciones administrativas con severas sanciones pecuniarias:
- *Infracciones Leves (0.5 a 5 UIT):* No inscribir bancos de datos ante el Registro Nacional de la ANPD o no atender solicitudes ARCO en los plazos legales.
- *Infracciones Graves (más de 5 hasta 50 UIT):* Tratar datos sin consentimiento previo e informado, desviar las finalidades declaradas o incumplir las directivas técnicas de seguridad.
- *Infracciones Muy Graves (más de 50 hasta 100 UIT):* Recopilar datos sensibles mediante engaño, transferir datos sensibles sin consentimiento formal por escrito o vulnerar el régimen de flujo transfronterizo.

= De Prompt a Skill: Transformación de Tarea en un Proceso Reutilizable

== Limitaciones del Enfoque Basado Únicamente en Prompts

El uso habitual de modelos de lenguaje mediante prompts directos ad-hoc presenta severas limitaciones en entornos de auditoría formal:
- *Falta de determinismo y contexto normativo:* Un prompt aislado carece del conocimiento normativo minucioso (artículos específicos, plazos legales de atención en días hábiles, o tablas oficiales de multas en UIT).
- *Respuestas genéricas:* El modelo tiende a responder con generalidades teóricas en lugar de aplicar una taxonomía estructurada de papeles de trabajo de auditoría (Condición, Criterio, Causa, Efecto y Recomendación).
- *Incapacidad de ejecutar validaciones computacionales:* Un prompt tradicional no puede parsear recursivamente archivos locales de políticas de privacidad ni contrastar listas de verificación contra código o bases de datos.

#figure(
  image("../img/capturas/captura_prompt_inicial.png", width: 95%),
  caption: [Consulta inicial mediante CLI simple: respuesta puramente textual sin integración en flujo de auditoría.],
)

== Metodología de Abstracción hacia un Skill Reutilizable

Para superar estas limitaciones, se implementó el proceso de ingeniería que transforma una consulta exploratoria en un *Skill Operativo Formal*. Este proceso comprendió cuatro etapas:

- *Delimitación Operativa:* Identificar qué tareas específicas realiza el auditor de sistemas (evaluar cláusulas de consentimiento, comprobar plazos ARCO, verificar directivas de seguridad técnicas según criticidad de datos).
- *Empaquetamiento de Conocimiento Estático:* Incorporar como referencias directas (`references/`) el compendio normativo oficial de la Ley 29733, los plazos máximos reglamentarios y la tipificación de infracciones leves, graves y muy graves.
- *Integración de Lógica Ejecutable:* Diseñar scripts analíticos (`scripts/`) que permitan escanear textos y políticas de privacidad devolviendo scores cuantitativos de conformidad y detección de banderas rojas.
- *Estandarización de Salidas:* Forzar un formato estándar de dictamen que califique el nivel de riesgo y estime la exposición a sanciones administrativas.

= Creación del Skill: Activación, Estructura y Definición de Pasos

El skill fue formalizado bajo el estándar de extensibilidad de agentes *Antigravity CLI / Agy*, definiendo un módulo autónomo en la ruta de extensiones del agente.

== Estructura Física y Organización Modular

El skill se organiza en una arquitectura limpia que separa especificación, base de conocimiento, herramientas computacionales y casos de prueba:

#figure(
  image("../img/capturas/captura_estructura_skill.png", width: 80%),
  caption: [Estructura modular del skill especializado `lpdp-auditor` en el sistema.],
)

- `SKILL.md`: Documento maestro de definición del skill, instrucciones cognitivas y directivas de activación con frontmatter YAML.
- `references/marco_normativo_lpdp.md`: Base de datos de conocimiento normativo exhaustivo con artículos y tablas regulatorias.
- `scripts/auditar_privacidad.py`: Motor computacional de parsing y evaluación cuantitativa de políticas de privacidad.
- `examples/politica_muestra_insegura.txt`: Banco de pruebas con casos deliberadamente no conformes para validación de controles.

== Arquitectura e Interacción de Agentes

A fin de comprender cómo se articulan las responsabilidades operativas y de razonamiento dentro del flujo de trabajo, se modeló el siguiente diagrama de interacción sistémica:

#figure(
  image("../img/arquitectura_editorial.svg", width: 100%),
  caption: [Arquitectura de interacción entre el Auditor, el Agente Agy, el Skill especializado y la Base Normativa.],
)

Como se aprecia en el diagrama, el agente inteligente actúa como orquestador central: recibe la solicitud de inspección del auditor, activa de forma contextual el skill `lpdp-auditor`, consulta la base de conocimiento reglamentaria y ejecuta las herramientas de escaneo para consolidar un dictamen estructurado.

== Definición de Pasos del Procedimiento de Auditoría

Dentro de `SKILL.md`, se parametrizó la secuencia determinista de auditoría que el agente ejecuta de forma iterativa:

- *Identificación de Tipología de Datos:* Discriminar si el repositorio almacena datos ordinarios (contacto, DNI) o datos sensibles (salud, huellas biométricas, patrimonio), definiendo el nivel de seguridad exigido (Básico, Medio o Crítico según R.D. 019-2013-JUS).
- *Análisis de Consentimiento (Art. 12 Ley 29733):* Corroborar que la manifestación de voluntad sea previa, informada, expresa e inequívoca, sancionando casillas premarcadas o consentimientos tácitos.
- *Verificación de Gobernanza de Derechos ARCO (Arts. 18 al 22):* Controlar los plazos máximos normativos (10 días hábiles para rectificación, cancelación y oposición; 20 días hábiles para acceso).
- *Evaluación de Medidas Técnicas y Flujo Transfronterizo:* Verificar si los proveedores cloud o servidores foráneos cuentan con cláusulas de encargo y garantías de nivel de protección adecuado.
- *Generación del Dictamen Formal:* Estructurar los hallazgos identificando la gravedad y cuantificando la sanción pecuniaria potencial en Unidades Impositivas Tributarias (UIT).

= Construcción del Asistente: Identidad, Instrucciones y Conocimiento

== Definición de Identidad y Rol del Asistente

El asistente no opera como un chatbot genérico; adopta el rol de *Auditor Líder de Cumplimiento PIMS y LPDP N° 29733*. Su tono es técnico, probatorio, objetivo e imparcial, orientado a salvaguardar los derechos de los titulares y blindar a la organización ante contingencias legales y regulatorias.

== Instrucciones y Reglas de Integridad

El asistente sigue instrucciones de comportamiento rigurosas:
- Toda observación debe estar respaldada en un artículo del compendio normativo peruano o en un control de seguridad estándar.
- No emite juicios de valor abstractos; documenta la *Condición* observada y la contrasta contra el *Criterio* normativo.
- Si identifica recolección de datos sensibles sin consentimiento por escrito o mecanismos biométricos no justificados, clasifica el hallazgo de inmediato como *Infracción Muy Grave*.

= Resultados: Validación del Skill Funcional Especializado

Para comprobar la operatividad del skill, se sometió al asistente y a su motor de evaluación a un caso de prueba consistente en una política de privacidad con múltiples vulnerabilidades regulatorias comunes en portales de comercio electrónico locales: recolección de datos financieros sin consentimiento expreso, almacenamiento indefinido sin justificación temporal y transferencia internacional a terceros con fines publicitarios no informados.

== Ejecución del Motor Analítico de Auditoría

El script integrado del skill procesó el artefacto de prueba, arrojando un reporte estructurado en formato JSON con la matriz de hallazgos y el score global de cumplimiento:

#figure(
  image("../img/capturas/captura_ejecucion_auditoria.png", width: 95%),
  caption: [Ejecución del script analítico del skill: detección automática de no conformidades con articulado legal y estimación de multas.],
)

El análisis computacional determinó un score de *0/100 (Dictamen NO CONFORME)*, detectando la ausencia total de mecanismos ARCO (infracción leve), falta de consentimiento informado (infracción grave), captura no autorizada de datos financieros/sensibles (infracción muy grave) y flujo transfronterizo irregular.

== Activación del Asistente Invocando Explícitamente el Skill Especializado

A diferencia de una consulta estándar sin contexto, se invocó al agente mediante el CLI ordenándole de manera explícita la activación del skill `lpdp-auditor` para auditar la política de prueba almacenada en el repositorio:

#figure(
  image("../img/capturas/captura_llamada_skill.png", width: 95%),
  caption: [Invocación explícita del Skill `lpdp-auditor`: carga de referencias normativas, ejecución de herramientas y emisión del informe técnico formal.],
)

Como se evidencia en la captura, el agente reconoce e inicializa el skill `lpdp-auditor`, consulta `marco_normativo_lpdp.md` y ejecuta `auditar_privacidad.py`, generando un dictamen formal con estructura de papeles de trabajo de auditoría (Condición, Criterio y Tipificación de Multa en UIT).

Asimismo, el asistente cuenta con capacidades de consultoría avanzada para evaluar flujos institucionales complejos, tal como se comprobó al solicitar la auditoría de un procedimiento de atención de derechos ARCO:

#figure(
  image("../img/capturas/captura_asistente_audit.png", width: 95%),
  caption: [Asistente especializado en acción: dictamen y plazos de atención ARCO conforme a la normativa peruana.],
)

El resultado confirma que el skill transforma exitosamente las capacidades de la IA generativa en una herramienta de auditoría de sistemas práctica, verificable y directamente aplicable a la gestión de privacidad corporativa e institucional.
