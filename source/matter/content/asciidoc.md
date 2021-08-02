---js
{
  layout:    'frame.njk',
  permalink: 'asciidoc.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      9999,
  title_s:    `AsciiDoc`,
  subtitle_s: `Subset used in chercheurd.art`,
  abstract_s: `AscciDoc cheatsheet for chercheurd.art`,

  section_a:
  [
    `Article`,
  ],

  script_a:
  [
  ],

  css_a:
  [
  ],


}
---
{% _doc section_a[0] %}
= {{title_s}} (h1)

{{abstract_s}}

//----------------------------------------
== Headers (h2)

Alinea_2

=== Header h3

Alinea_3

==== Header h4

Alinea_4

===== Header h5

Alinea_5

====== Header h6

Alinea_6

.horizontal line
'''

//----------------------------------------
== Alinea

.paragraph
A common alinea...


[quote, Nietzsche, Aurore]
____
Sans la musique, la vie serait une erreur
____

//----------------------------------------
== List

.unordered
* primo
* secondo
  - un
  - deux
* tertio

//----------------------------------------
== Insert

.note
les blocs insérés en ligne sont composés de deux parties:

* appel (prinpipal_s)
* référence (subsid_s)

TEXTE (TXT)::
ordinal_n = 0

Le texte précédent l'
₍₀  appel (prinpipal_s)
  parenthèse ouverte (caractère substring) + ordinal_n: 0-99 (caractères substring)₎
est suivi de la
₍₀  référence (subsid_s)
  newline + indentation (espaces) + référence (mono ou multiligne) + parenthèse fermée (caractère substring)₎
suite du texte.

IMAGE (IMG)::
ordinal_n = 1

₍₁  _Arion_
  1703_boucher-princeton_university-1748_arion₎
.

REFERENCE (REF)::
ordinal_n = 2

₍₂  2010_loire
  p.123 f.123₎
.


//----------------------------------------
== Links

[[article-anchor_1234]]
Reference point

xref:article-anchor_1234[Reference]

{% end_doc %}