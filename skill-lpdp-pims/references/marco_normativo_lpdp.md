# Compendio Normativo y Guía de Auditoría: LPDP N° 29733 y D.S. 003-2013-JUS

## 1. Fundamentos y Ámbito de Aplicación
- **Objeto de la Ley (Art. 1 Ley 29733):** Garantizar el derecho fundamental a la protección de datos personales consagrado en el numeral 6 del artículo 2 de la Constitución Política del Perú, a través de su adecuado tratamiento, en un marco de respeto de los demás derechos fundamentales.
- **Ámbito Territorial y Material (Art. 3 Ley 29733):** Aplica a bancos de datos personales y al tratamiento de datos personales ubicados en el territorio nacional, o cuando el tratamiento se realice por cuenta de un responsable establecido en el extranjero mediante medios situados en el Perú.
- **Definiciones Clave (Art. 2 Ley y Art. 2 Reglamento D.S. 003-2013-JUS):**
  - *Dato Personal:* Toda información sobre una persona natural que la identifica o la hace identificable.
  - *Datos Sensibles:* Datos biométricos, origen racial y étnico, ingresos económicos, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información relacionada a la salud o a la vida sexual.
  - *Banco de Datos Personales:* Conjunto organizado de datos personales, automatizado o no, independientemente del soporte.
  - *Titular del Banco de Datos:* Persona natural, persona jurídica de derecho privado o entidad pública que determina la finalidad y contenido.
  - *Encargado del Tratamiento:* Quien realiza el tratamiento por cuenta del titular del banco de datos.

## 2. Principios Rectores del Tratamiento (Arts. 4 al 12 Ley 29733)
Para considerar conforme el tratamiento de datos personales en un sistema o aplicativo, deben cumplirse de manera copulativa los siguientes principios:

| Principio | Base Legal | Requisitos para Auditoría | Control Técnico / Evidencia en TI |
| :--- | :--- | :--- | :--- |
| **Legalidad** | Art. 4 Ley 29733 | Prohibición de recopilación fraudulenta o ilícita. | Verificación de origen de datos, scraping no autorizado prohibido. |
| **Consentimiento** | Art. 5 y 12 Ley; Arts. 12-18 Regl. | Debe ser **libre, previo, expreso, informado e inequívoco**. Para datos sensibles se exige forma escrita o firma digital. | Logs de aceptación, casillas desmarcadas (opt-in explícito), checkbox obligatorio no premarcado. |
| **Finalidad** | Art. 6 Ley 29733; Art. 19 Regl. | Fines determinados, explícitos y lícitos. Prohibido desvío de uso. | Mapeo de campos de BD contra la finalidad declarada en la política web. |
| **Proporcionalidad** | Art. 7 Ley 29733; Art. 20 Regl. | Principio de minimización: solo datos indispensables y pertinentes. | Evitar formularios que solicitan DNI, teléfono o datos bancarios innecesarios. |
| **Calidad** | Art. 8 Ley 29733; Art. 21 Regl. | Veracidad, exactitud, actualización y conservación temporal necesaria. | Rutinas de depuración de registros obsoletos y validación de campos. |
| **Seguridad** | Art. 9 Ley 29733; Arts. 32-42 Regl. | Medidas técnicas y organizativas para evitar fuga o alteración. | Cifrado, control de acceso RBAC, gestión de vulnerabilidades y copias de seguridad. |
| **Disposición de Recurso**| Art. 10 Ley 29733 | Vías expeditas para tutela de derechos ante la ANPD o el PJ. | Publicación de canales de reclamación accesibles al usuario. |
| **Nivel Adecuado** | Art. 11 Ley 29733; Arts. 65-70 Regl. | Flujo transfronterizo solo a países con protección equiparable. | Cláusulas contractuales tipo con proveedores Cloud (AWS, Azure, Google Cloud). |

## 3. Catálogo y Plazos del Procedimiento de Derechos ARCO (Arts. 18 al 22 Ley; Arts. 47 al 59 Reglamento)

| Derecho | Objeto del Derecho | Plazo Máximo Legal de Atención | Criterio de Auditoría TI |
| :--- | :--- | :--- | :--- |
| **Acceso** (Art. 19 Ley; Art. 54 Regl.) | Conocer qué datos se tratan, origen, finalidad y transferencias. | **20 días hábiles** desde la solicitud. | Consultas directas al perfil de usuario o emisión de reporte consolidado. |
| **Rectificación** (Art. 20 Ley; Art. 55 Regl.) | Modificar datos erróneos, inexactos, desactualizados o incompletos. | **10 días hábiles** desde la solicitud. | Interfaces de autoservicio o ticket formal de actualización con soporte documental. |
| **Cancelación** (Art. 20 Ley; Art. 56 Regl.) | Supresión o bloqueo de datos cuando venció la finalidad o no hay consentimiento. | **10 días hábiles** desde la solicitud. | Proceso de borrado lógico/físico en BD y tablas relacionadas (soft/hard delete seguro). |
| **Oposición** (Art. 22 Ley; Art. 58 Regl.) | Oponerse al tratamiento por motivos legítimos y fundados. | **10 días hábiles** desde la solicitud. | Mecanismos de exclusión en listas de correo, marketing o perfilado algorítmico. |

## 4. Matriz Técnica de Seguridad por Niveles (Directiva R.D. N° 019-2013-JUS/DNPDP)

| Categoría de Control | Nivel Básico (Datos Identificativos) | Nivel Medio (Patrimoniales, Comerciales) | Nivel Crítico (Datos Sensibles, Salud, Biometría) |
| :--- | :--- | :--- | :--- |
| **Control de Accesos** | Credenciales únicas, contraseñas robustas, bloqueo por inactividad. | Matriz RBAC, principio de mínimo privilegio, revisión semestral. | Autenticación multifactor (MFA), segregación de entornos dev/prod. |
| **Cifrado de Datos** | Recomendado en canales web (TLS/HTTPS). | Obligatorio en tránsito por redes públicas (TLS 1.2+). | **Obligatorio en reposo (AES-256)** y tránsito. Gestión formal de llaves. |
| **Trazabilidad y Logs** | Registro básico de inicios de sesión fallidos. | Registro de accesos con fecha, hora, usuario y registro impactado. | **Logs inalterables (WORM)**, monitoreo SIEM, prohibición de accesos genéricos. |
| **Respaldos y Recuperación**| Backups periódicos y pruebas de restauración anual. | Copias fuera de sitio (*off-site*) y cifradas. | Plan de Continuidad y DRP con RPO/RTO certificados, pruebas semestrales. |
| **Auditoría Externa** | Autoevaluación anual. | Auditoría técnica bienal obligatoria. | Auditoría técnica bienal con informe pericial elevado a la alta gerencia. |

## 5. Régimen Sancionador y Escala de Multas en UIT (Arts. 38 y 39 Ley 29733; Arts. 110 al 119 Reglamento)

| Calificación | Supuestos Típicos de Infracción (Hechos Verificables en TI) | Escala de Sanción |
| :--- | :--- | :--- |
| **Leve** (Art. 110 Regl.) | • No inscribir los bancos de datos ante el Registro Nacional de la ANPD.<br>• No atender las solicitudes ARCO dentro de los plazos legales máximos (10/20 días).<br>• Incumplir el deber de información previa al titular al momento de la recopilación. | **0.5 a 5 UIT** |
| **Grave** (Art. 111 Regl.) | • Tratar datos personales sin el consentimiento libre, previo, expreso e informado.<br>• Usar los datos para finalidades distintas a las autorizadas.<br>• No implementar las medidas de seguridad técnicas del nivel correspondiente.<br>• Obstruir las labores de fiscalización de la ANPD o no atender sus requerimientos. | **Más de 5 hasta 50 UIT** |
| **Muy Grave** (Art. 112 Regl.) | • Recopilar datos sensibles mediante engaño, fraude o coacción.<br>• Tratar o transferir datos sensibles sin consentimiento por escrito o expreso equivalente.<br>• Realizar flujo transfronterizo de datos a países que no brinden protección adecuada.<br>• Continuar el tratamiento no autorizado tras orden expresa de cese de la ANPD. | **Más de 50 hasta 100 UIT** |
