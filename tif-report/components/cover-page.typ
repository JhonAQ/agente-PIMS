#let cover-page(
  title: "",
  subtitle: none,
  logo-path: "/img/fixed/logo.png",
  course: "",
  teacher: "",
  authors: (),
  group: none,
  year: none,
  institution: (
    "UNIVERSIDAD NACIONAL DE SAN AGUSTÍN",
    "FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS",
    "ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS"
  ),
  city-country: "AREQUIPA - PERÚ"
) = {
  // Ajuste de página para garantizar que los elementos se distribuyan armónicamente
  set text(size: 11pt)
  align(center)[
    #for line in institution {
      strong(line)
      [\ ]
    }
    #v(1fr)

    #if logo-path != none {
      image(logo-path, width: 4.8cm)
    }
    #v(1fr)

    #strong("ACTIVIDAD PRÁCTICA") \
    #v(0.4em)
    #set text(size: 13pt)
    #strong(title)
    #if subtitle != none [
      \ #v(0.3em)
      #set text(size: 11pt)
      #subtitle
    ]
    #v(1fr)

    #set text(size: 11pt)
    #strong("ASIGNATURA") \
    #course
    #v(1fr)

    #if group != none [
      #strong("GRUPO") \
      #group
      #v(1fr)
    ]

    #strong("DOCENTE") \
    #teacher
    #v(1fr)

    #let label = if authors.len() > 1 [INTEGRANTES] else [PRESENTADO POR]
    #strong(label) \
    #v(0.3em)
    #for author in authors [
      #author \
    ]
    #v(1fr)

    #strong(city-country) \
    #strong(if year != none { str(year) } else { "2026" })
  ]
}
