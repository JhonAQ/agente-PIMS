#!/usr/bin/env python3
"""
Motor Analítico de Auditoría de Sistemas para Privacidad y Cumplimiento LPDP N° 29733 (PIMS / ISO 27701).
Evalúa artefactos de software, políticas de privacidad y arquitecturas de datos.
"""
import sys
import json
import argparse
from datetime import datetime

def auditar_artefacto(contenido):
    hallazgos = []
    score = 100
    texto = contenido.lower()
    
    # 1. PRINCIPIO DE CONSENTIMIENTO (Art. 12 Ley 29733 / Arts. 12-18 D.S. 003-2013-JUS)
    tiene_consentimiento = any(k in texto for k in ["consentimiento", "autorizo expresamente", "autorización libre"])
    tiene_optin_explicito = "opt-in" in texto or "casilla desmarcada" in texto or "desmarcada" in texto or "expreso" in texto
    
    if not tiene_consentimiento:
        hallazgos.append({
            "control_id": "CTRL-LPDP-01",
            "principio": "Principio de Consentimiento (Art. 5 y 12 Ley 29733)",
            "condicion": "No se identifica cláusula de consentimiento previo, informado, expreso e inequívoco.",
            "criterio": "Art. 12 de la Ley N° 29733 y Art. 12 del D.S. 003-2013-JUS.",
            "gravedad": "GRAVE",
            "tipificacion": "Infracción Grave (Art. 111 num. 1 inc. a del Reglamento)",
            "sancion_estimada": "5.1 a 50 UIT",
            "recomendacion": "Implementar mecanismo de consentimiento explícito no premarcado con registro verificable de fecha, hora y versión de la política aceptada."
        })
        score -= 30
    elif not tiene_optin_explicito:
        hallazgos.append({
            "control_id": "CTRL-LPDP-01B",
            "principio": "Consentimiento Inequívoco (Art. 12 Ley 29733)",
            "condicion": "Existe mención genérica pero no se garantiza la condición de inequívoco ni separación de finalidades.",
            "criterio": "Art. 14 del D.S. 003-2013-JUS.",
            "gravedad": "MEDIA",
            "tipificacion": "Riesgo de Infracción Grave por vicio en el consentimiento",
            "sancion_estimada": "Sujeto a requerimiento de subsanación o multa",
            "recomendacion": "Separar el consentimiento para la prestación del servicio del consentimiento para prospección comercial."
        })
        score -= 10

    # 2. GOBERNANZA DE DERECHOS ARCO (Arts. 18-22 Ley 29733 / Arts. 47-59 D.S. 003-2013-JUS)
    tiene_arco = any(k in texto for k in ["arco", "acceso", "rectificación", "cancelación", "oposición"])
    menciona_plazos = any(k in texto for k in ["10 días", "20 días", "días hábiles", "plazo legal"])
    
    if not tiene_arco:
        hallazgos.append({
            "control_id": "CTRL-LPDP-02",
            "principio": "Derechos de los Titulares (Arts. 18 al 22 Ley 29733)",
            "condicion": "La política omite la existencia y canales de atención de los derechos ARCO.",
            "criterio": "Art. 18 de la Ley N° 29733 y Arts. 47 al 59 del D.S. 003-2013-JUS.",
            "gravedad": "LEVE",
            "tipificacion": "Infracción Leve (Art. 110 num. 1 inc. b del Reglamento)",
            "sancion_estimada": "0.5 a 5 UIT",
            "recomendacion": "Habilitar canal formal (correo o mesa de partes virtual) con formato estandarizado y plazo de respuesta."
        })
        score -= 20
    elif not menciona_plazos:
        hallazgos.append({
            "control_id": "CTRL-LPDP-02B",
            "principio": "Información al Titular (Art. 18 Ley 29733)",
            "condicion": "Menciona derechos de usuario pero omite los plazos legales máximos (10 días para rectificación/cancelación/oposición y 20 días para acceso).",
            "criterio": "Arts. 54 al 58 del D.S. 003-2013-JUS.",
            "gravedad": "LEVE",
            "tipificacion": "Observación de cumplimiento formal",
            "sancion_estimada": "0.5 a 2 UIT",
            "recomendacion": "Especificar expresamente los plazos legales máximos en días hábiles dentro del texto informativo."
        })
        score -= 10

    # 3. PRINCIPIO DE FINALIDAD Y PROPORCIONALIDAD (Arts. 6 y 7 Ley 29733)
    finalidad_acotada = any(k in texto for k in ["finalidad", "propósito específico", "fines determinados"])
    conservacion_indefinida = "indefinid" in texto or "siempre" in texto or "sin límite" in texto
    
    if not finalidad_acotada or conservacion_indefinida:
        hallazgos.append({
            "control_id": "CTRL-LPDP-03",
            "principio": "Finalidad y Proporcionalidad (Arts. 6 y 7 Ley 29733)",
            "condicion": "Se detecta almacenamiento indefinido de datos o finalidades redactadas de manera excesivamente abierta/genérica.",
            "criterio": "Art. 6 y 7 de la Ley N° 29733 y Art. 19 del D.S. 003-2013-JUS.",
            "gravedad": "GRAVE",
            "tipificacion": "Infracción Grave (Art. 111 num. 1 inc. b del Reglamento)",
            "sancion_estimada": "5.1 a 50 UIT",
            "recomendacion": "Fijar políticas de retención temporal máxima y purga automática de bases de datos una vez cumplida la finalidad."
        })
        score -= 25

    # 4. DATOS SENSIBLES Y FINANCIEROS (Art. 2 num. 5 y Art. 13 Ley 29733)
    trata_sensibles = any(k in texto for k in ["tarjeta", "financier", "salud", "biométr", "huella", "ingresos"])
    if trata_sensibles and ("escrito" not in texto and "firma digital" not in texto):
        hallazgos.append({
            "control_id": "CTRL-LPDP-04",
            "principio": "Tratamiento de Datos Sensibles (Art. 13 Ley 29733)",
            "condicion": "Se capturan datos sensibles/financieros sin constancia escrita ni consentimiento cualificado.",
            "criterio": "Art. 13 numeral 13.5 de la Ley N° 29733 y Art. 34 Directiva R.D. 019-2013-JUS.",
            "gravedad": "MUY GRAVE",
            "tipificacion": "Infracción Muy Grave (Art. 112 num. 1 inc. b del Reglamento)",
            "sancion_estimada": "Más de 50 hasta 100 UIT",
            "recomendacion": "Requerir firma digital o consentimiento explícito reforzado y activar medidas de seguridad de Nivel Crítico (cifrado AES-256)."
        })
        score -= 35

    # 5. FLUJO TRANSFRONTERIZO Y ENCARGADOS (Art. 15 Ley 29733 / Arts. 65-70 Reglamento)
    menciona_terceros = any(k in texto for k in ["extranjero", "nube", "cloud", "servidores", "terceros", "publicidad"])
    garantias_adecuadas = any(k in texto for k in ["garantías de seguridad", "nivel de protección adecuado", "cláusulas tipo", "iso 27001"])
    
    if menciona_terceros and not garantias_adecuadas:
        hallazgos.append({
            "control_id": "CTRL-LPDP-05",
            "principio": "Flujo Transfronterizo de Datos (Art. 15 Ley 29733)",
            "condicion": "Se transfiere información fuera del país o a terceros en la nube sin acreditar garantías contractuales de protección adecuada.",
            "criterio": "Art. 15 de la Ley N° 29733 y Art. 66 del D.S. 003-2013-JUS.",
            "gravedad": "GRAVE",
            "tipificacion": "Infracción Grave a Muy Grave (Art. 111 num. 1 inc. f del Reglamento)",
            "sancion_estimada": "10 a 50 UIT",
            "recomendacion": "Formalizar contratos de encargo con cláusulas de protección de datos personales con los proveedores de hosting/cloud."
        })
        score -= 20

    score_final = max(0, score)
    if score_final >= 85:
        dictamen = "CONFORME (Nivel de madurez alto)"
    elif score_final >= 50:
        dictamen = "CONFORME CON SALVEDADES (Requiere plan de subsanación correctivo)"
    else:
        dictamen = "NO CONFORME (Alto riesgo de sanción administrativa ante la ANPD)"

    return {
        "metadatos_auditoria": {
            "estandar_evaluado": "Ley N° 29733, D.S. 003-2013-JUS, R.D. 019-2013-JUS y PIMS (ISO/IEC 27701)",
            "fecha_ejecucion": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "unidad_evaluadora": "Auditoría de Sistemas - UNSA"
        },
        "score_cumplimiento": score_final,
        "dictamen_global": dictamen,
        "total_hallazgos": len(hallazgos),
        "hallazgos": hallazgos
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python3 auditar_privacidad.py <archivo_o_texto>")
        sys.exit(1)
    
    arg = sys.argv[1]
    try:
        with open(arg, 'r', encoding='utf-8') as f:
            contenido = f.read()
    except Exception:
        contenido = " ".join(sys.argv[1:])

    resultado = auditar_artefacto(contenido)
    print(json.dumps(resultado, indent=2, ensure_ascii=False))
