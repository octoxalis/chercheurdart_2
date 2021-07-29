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
= {{title_s}}

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
A common alinea


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
== Links

[[article-anchor_1234]]
Reference point

xref:article-anchor_1234[Reference]

.note
Insérons une ₍₀¯précision importante¯ceci est une note₎ au milieu d'une phrase complète.

.image
Il faut analyser ₍₁¯_Arion_¯1703_boucher-princeton_university-1748_arion₎ peint par F. Boucher en 1750
{% end_doc %}