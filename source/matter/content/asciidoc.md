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
{% set _section_0 = permalink + '#' + F_o.slug__s( section_a[0] ) %}
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


anchor:article_anchor_1234[]
Voici une référence

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

Les blocs insérés en ligne se composent de deux parties:

* appel (prinpipal_s)
* référence (subsid_s)


TEXTE (TXT) specifier_s = ₀

Le texte précédent l'
₍₀ appel (prinpipal_s)
  parenthèse ouverte (caractère substring)
  specifier_s: 0-99 (caractères substring)₎
est suivi de la
₍₀ référence (subsid_s)
  newline
  indentation (espaces)
  référence (mono ou multiligne)
  parenthèse fermée (caractère substring)₎
suite du texte.


IMAGE (IMG) specifier_s = ₁

₍₁ _Arion_
  1703_boucher-princeton_university-1748_arion₎
de F. Boucher fait partie du cycle décoratif.

// _Arion_ ins:₁[ins_s="1703_boucher-princeton_university-1748_arion"]


REFERENCE (REF) specifier_s = ₂

Dans le catalogue
₍₂ 2010_loire
  p.123
  f.123₎
 de la collection Mottais, ce tableau.


//----------------------------------------
== Links

link:#article_anchor_1234[Reference]

{% end_doc %}