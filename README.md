# Agente PIMS - Auditoría de Privacidad y LPDP N° 29733

Repositorio del Trabajo de Investigación Formativa (TIF) para el curso de **Auditoría de Sistemas** (UNSA).

Este proyecto implementa un **Agente y Skill de Inteligencia Artificial especializado (`lpdp-auditor`)** para la fiscalización y auditoría técnica de cumplimiento de un **Sistema de Gestión de Privacidad de la Información (PIMS)**, fundamentado en la **Ley de Protección de Datos Personales de Perú (Ley N° 29733)**, su Reglamento (**D.S. N° 003-2013-JUS**), la Directiva de Seguridad (**R.D. N° 019-2013-JUS**) y estándares internacionales como **ISO/IEC 27701**.

---

## Estructura del Repositorio

```text
agente-PIMS/
├── skill-lpdp-pims/                  # Código y especificación del Skill lpdp-auditor
│   ├── SKILL.md                      # Definición maestro, directivas y flujo metodológico
│   ├── references/                   # Base de conocimiento normativo y regulatorio
│   │   └── marco_normativo_lpdp.md   # Compendio de artículos, plazos ARCO y multas UIT
│   ├── scripts/                      # Herramientas analíticas computacionales
│   │   └── auditar_privacidad.py     # Script motor de auditoría cuantitativa y heurística
│   └── examples/                     # Artefactos y bancos de prueba
│       └── politica_muestra_insegura.txt # Caso de prueba no conforme para validación
├── .agents/
│   └── skills/
│       └── lpdp-auditor              # Enlace simbiótico para descubrimiento del agente
├── tif-report/                       # Código fuente del informe académico en Typst
│   ├── components/                   # Componentes visuales y maquetación
│   ├── img/                          # Diagramas arquitecturales y capturas de evidencia
│   ├── sections/                     # Secciones redactadas del informe
│   ├── lib.typ                       # Template institucional y estilos
│   └── report.typ                    # Documento principal del reporte
├── docs/                             # Entregables y documentos compilados
│   └── Grupo8_Informe_TIF_Entrega1_LPDP_PIMS.pdf
├── .gitignore
└── README.md
```

---

## Capacidades del Agente / Skill `lpdp-auditor`

1. **Delimitación del Alcance:** Identificación de bancos de datos personales generales vs. datos sensibles (biometría, salud, solvencia económica).
2. **Evaluación de Principios Rectores (Arts. 4 al 12 Ley 29733):**
   - Consentimiento previo, expreso, informado e inequívoco (formalidad escrita para datos sensibles).
   - Finalidad explícita, licitud y minimización/proporcionalidad en la recolección.
3. **Control de Procedimiento y Plazos ARCO (Arts. 18 al 22 Ley; Arts. 47 al 59 Reglamento):**
   - Verificación de canales habilitados y respeto de plazos legales (20 días hábiles para Acceso; 10 días hábiles para Rectificación, Cancelación y Oposición).
4. **Verificación Técnica de Seguridad (Directiva R.D. N° 019-2013-JUS):**
   - Niveles Básico, Medio y Crítico (cifrado AES-256 en reposo, TLS 1.2+ en tránsito, registros WORM).
5. **Generación de Papeles de Trabajo:** Estructuración de hallazgos bajo taxonomía estándar de auditoría:
   - **Condición:** Hecho u omisión observado.
   - **Criterio:** Base normativa o control técnico infringido.
   - **Causa:** Carencia de control o procedimiento preventivo.
   - **Efecto:** Riesgo de brecha y tipificación de multa oficial ante la ANPD (Leves: 0.5-5 UIT, Graves: 5-50 UIT, Muy Graves: 50-100 UIT).
   - **Recomendación:** Medida técnica correctiva priorizada.

---

## Uso Rápido

### 1. Ejecutar el Script de Evaluación Heurística

Puedes auditar cualquier política o artefacto de texto ejecutando:

```bash
python3 skill-lpdp-pims/scripts/auditar_privacidad.py skill-lpdp-pims/examples/politica_muestra_insegura.txt
```

Salida esperada: Reporte en formato JSON estructurado con el desglose de hallazgos, criterios legales, tipificación de multas en UIT y el score global de conformidad.

### 2. Uso con Antigravity / Agy CLI

Al trabajar dentro de este repositorio con la CLI o el agente de Antigravity, el skill queda automáticamente disponible en el espacio de trabajo:

```bash
# Ejemplo de invocación en chat con el agente:
"Audita la política en skill-lpdp-pims/examples/politica_muestra_insegura.txt usando el skill lpdp-auditor"
```

### 3. Compilación del Informe Académico (Typst)

Para regenerar el documento PDF del informe:

```bash
typst compile tif-report/report.typ docs/Grupo8_Informe_TIF_Entrega1_LPDP_PIMS.pdf
```

---

## Equipo de Trabajo (Grupo 8 - Ciclo B)

- **Arias Quispe, Jhonatan David**
- **Boza Portillo, Yordano Hernan**
- **Condori Anahua, Graciela**
- **Quispe Arratea, Raquel Alexandra**

**Docente:** Mg. Edward Vicente Zárate Carlos  
**Universidad Nacional de San Agustín de Arequipa (UNSA)**  
**Facultad de Ingeniería de Producción y Servicios - Escuela Profesional de Ingeniería de Sistemas**
