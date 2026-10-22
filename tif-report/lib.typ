#import "components/cover-page.typ": cover-page

#let define(name, value) = {
  [#metadata((name: name, value: value)) <var_export>]
}

#let simple-report(
  title: "",
  subtitle: none,
  course: "",
  teacher: "",
  authors: (),
  group: none,
  year: none,
  city-country: "AREQUIPA - PERÚ",
  ..custom_vars,
  body
) = {
  // Export variables for UNSAReport CLI
  define("title", title)
  if subtitle != none { define("subtitle", subtitle) }
  define("course", course)
  define("teacher", teacher)
  define("authors", authors)
  if group != none { define("group", group) }

  let resolved-year = if year != none { year } else { datetime.today().year() }
  define("year", resolved-year)

  // Custom variables export
  for (name, value) in custom_vars.named() {
    define(name, value)
  }

  // Document styling
  set text(
    font: "Liberation Serif",
    size: 11pt,
    hyphenate: false,
    lang: "es",
  )

  set page(
    paper: "a4",
    margin: (x: 2cm, y: 2.2cm)
  )

  set par(
    justify: true,
    first-line-indent: 0pt,
    spacing: 0.9em,
    leading: 0.7em,
  )

  // Desactivamos la numeración automática de títulos y subtítulos
  set heading(numbering: none)
  show heading: set text(size: 11.5pt, weight: "bold")

  show figure.caption: it => [
    #strong[#it.supplement #context it.counter.display(it.numbering).] #emph(it.body)
  ]

  // Cover Page
  cover-page(
    title: title,
    subtitle: subtitle,
    logo-path: "/img/fixed/logo.png",
    course: course,
    teacher: teacher,
    authors: authors,
    group: group,
    year: resolved-year,
    city-country: city-country
  )

  pagebreak()

  // Subsequent Pages Setup
  set page(
    numbering: "1",
    number-align: center,
  )
  counter(page).update(1)
  set par(leading: 0.65em)

  // Índice General / Tabla de Contenidos
  align(center)[
    #text(size: 13pt, weight: "bold")[ÍNDICE GENERAL]
  ]
  v(1em)
  outline(
    title: none,
    indent: auto,
    depth: 3,
  )

  pagebreak()

  // Encabezado en la primera página de contenido
  align(center)[
    #set text(size: 13pt, weight: "bold")
    #block(below: 1.5em)[#title]
  ]

  body
}
