#set page(
  paper: "a4",
  margin: (top: 2.5cm, bottom: 2.5cm, left: 3cm, right: 3cm),
  header: context {
    if here().page() > 1 [
      #text(size: 8pt, fill: luma(120), font: "Liberation Sans")[
        *DOCUMENTO INSTITUCIONAL DE AUDITORÍA* -- POL-PRIV-EDU-2025 (VERSIÓN 2.1)
      ]
      #line(length: 100%, stroke: 0.5pt + luma(180))
    ]
  },
  footer: context [
    #align(center)[
      #text(size: 8pt, fill: luma(140), font: "Liberation Sans")[
        Página #here().page() de #counter(page).final().at(0) -- Uso exclusivo para Evaluación Pericial de Sistemas
      ]
    ]
  ]
)

#set text(
  font: "Liberation Serif",
  size: 10.5pt,
  lang: "es",
  hyphenate: false
)

#set par(
  justify: true,
  leading: 0.75em,
  first-line-indent: 0pt
)

// Encabezado Institucional
#align(center)[
  #text(size: 13pt, weight: "bold", font: "Liberation Sans")[
    UNIVERSIDAD NACIONAL DE SAN AGUSTÍN DE AREQUIPA
  ]
  
  #text(size: 10pt, weight: "medium", fill: rgb("#1E3A8A"), font: "Liberation Sans")[
    DIRECCIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIONES (OTI)
  ]
  
  #v(0.5em)
  #line(length: 100%, stroke: 1.5pt + rgb("#1E3A8A"))
  #v(0.5em)

  #text(size: 14pt, weight: "bold", font: "Liberation Sans")[
    POLÍTICA INSTITUCIONAL DE PRIVACIDAD, TRATAMIENTO DE DATOS PERSONALES Y CONDICIONES DE USO DE PLATAFORMAS EDUCATIVAS DIGITALES
  ]
]

#v(1em)

// Ficha Técnica del Documento
#rect(
  width: 100%,
  stroke: 0.5pt + luma(180),
  radius: 4pt,
  fill: luma(250),
  inset: 10pt
)[
  #grid(
    columns: (1fr, 1fr),
    row-gutter: 7pt,
    [ *Código Normativo:* POL-PRIV-OTI-2025 ],
    [ *Versión del Documento:* 2.1 (Revisión Anual) ],
    [ *Fecha de Emisión:* 15 de marzo de 2025 ],
    [ *Órgano Emisor:* Oficina de Tecnologías de la Información ],
    [ *Ámbito de Aplicación:* Campus Virtual, Moodle, Pasarelas y Control de Acceso ],
    [ *Estado Operativo:* En aplicación institucional ]
  )
]

#v(1.2em)

#text(size: 11pt, weight: "bold", font: "Liberation Sans")[
  CLÁUSULA PRIMERA: OBJETO Y ALCANCE DEL TRATAMIENTO
]

La presente Política regula los términos, alcances y condiciones bajo los cuales la institución recopila, almacena, utiliza, procesa y transfiere los datos personales de estudiantes, docentes, personal administrativo y usuarios externos que interactúan con el portal académico institucional, las aulas virtuales, los módulos de matrícula en línea, el sistema de biblioteca y los servicios digitales complementarios.

#v(0.8em)
#text(size: 11pt, weight: "bold", font: "Liberation Sans")[
  CLÁUSULA SEGUNDA: MODALIDAD DE CONSENTIMIENTO Y ACEPTACIÓN
]

El acceso, navegación o utilización de cualquiera de las plataformas informáticas, redes inalámbricas institucionales o aplicaciones móviles de la universidad constituirá la aceptación plena, tácita e incondicional de los términos de la presente política. Los usuarios reconocen y aceptan que la mera autenticación con su correo institucional o credencial de acceso suple cualquier requerimiento de consentimiento expreso, previo o por escrito, considerándose otorgada la autorización para el tratamiento de su información desde el momento del primer ingreso al sistema.

#v(0.8em)
#text(size: 11pt, weight: "bold", font: "Liberation Sans")[
  CLÁUSULA TERCERA: TRATAMIENTO DE DATOS SENSIBLES, FINANCIEROS Y BIOMÉTRICOS
]

A efectos de optimizar los mecanismos de control de asistencia a clases presenciales y virtuales, fiscalización de exámenes en línea mediante reconocimiento biométrico, y habilitación de pagos de derechos académicos y matrículas, la plataforma capturará y procesará de manera automatizada:
1. Registros biométricos faciales y patrones de huellas dactilares de los alumnos y docentes.
2. Numeración completa de tarjetas de crédito o débito, fecha de vencimiento y códigos de validación bancaria (CVV/CVC) ingresados en los formularios web de recaudación.
3. Antecedentes médicos, condiciones de salud y reportes psicopedagógicos consignados en las solicitudes de bienestar universitario y becas de comedor.

El usuario consiente expresamente dicho tratamiento por el solo hecho de remitir los formularios correspondientes a través del aplicativo web, sin que resulte exigible la suscripción de formatos físicos ni el uso de firma digital o electrónica certificada.

#v(0.8em)
#text(size: 11pt, weight: "bold", font: "Liberation Sans")[
  CLÁUSULA CUARTA: FINALIDADES Y PLAZO DE CONSERVACIÓN DE LA INFORMACIÓN
]

Las finalidades del tratamiento comprenden la gestión académica, control disciplinario, evaluación docente, prospección institucional, mercadeo de programas de posgrado y compartición con entidades aliadas para fines estadísticos y publicitarios.

En atención a la naturaleza permanente de la función formativa y a los requerimientos de preservación histórica, toda la información personal, académica, biométrica y de transacciones financieras recopilada será almacenada en nuestras bases de datos de forma *permanente e indefinida*, sin sujeción a plazos de caducidad, retención máxima ni procedimientos de purga periódica automatizada.

#v(0.8em)
#text(size: 11pt, weight: "bold", font: "Liberation Sans")[
  CLÁUSULA QUINTA: TRANSFERENCIA TRANSFRONTERIZA Y SERVICIOS EN LA NUBE
]

Los bancos de datos personales y repositorios digitales de la universidad se encuentran alojados y respaldados en infraestructuras de computación en la nube (cloud computing) administradas por proveedores tecnológicos globales cuyos servidores físicos e instalaciones de procesamiento están ubicados en el extranjero (principalmente en Estados Unidos de América y la Unión Europea).

La transferencia internacional de dichos datos se efectúa de manera continua sin que medie la formalización de contratos específicos de encargo de tratamiento ni la acreditación de estándares de protección equivalente a la normativa peruana, entendiéndose facultada la universidad para seleccionar y migrar de proveedores cloud de acuerdo a criterios de disponibilidad operativa y costo.

#v(0.8em)
#text(size: 11pt, weight: "bold", font: "Liberation Sans")[
  CLÁUSULA SEXTA: DERECHOS DE LOS TITULARES DE DATOS (ARCO)
]

Los usuarios podrán solicitar información sobre sus datos personales mediante comunicación dirigida a la mesa de partes central de la institución. Las solicitudes serán atendidas de acuerdo a la carga administrativa ordinaria de la universidad, no aplicando plazos específicos de respuesta ni procedimientos reglados de rectificación o supresión de registros de las bases de datos académicas.

#v(2em)

#align(center)[
  #line(length: 40%, stroke: 0.5pt + luma(100))
  #text(size: 9pt, font: "Liberation Sans")[
    *DIRECCIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN (OTI)*\
    Universidad Nacional de San Agustín de Arequipa\
    Arequipa, Perú
  ]
]
