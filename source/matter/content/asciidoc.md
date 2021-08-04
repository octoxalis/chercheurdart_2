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
:list-marker: &mdash;

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

TEXTE (TXT) specifier_s = ₀

Le texte précédent l'
₍₀ appel (prinpipal_s)
  parenthèse ouverte (caractère substring) + specifier_s: 0-99 (caractères substring)₎
est suivi de la
₍₀ référence (subsid_s)
  newline + indentation (espaces) + référence (mono ou multiligne) + parenthèse fermée (caractère substring)₎
suite du texte.

// Le texte précédent l'appel (prinpipal_s)
// ins:₀[ins_s="parenthèse ouverte (caractère substring) + specifier_s: 0-99 (caractères substring)"]
// est suivi de la référence (subsid_s)
// ins:₀[ins_s="newline + indentation (espaces) + référence (mono ou multiligne) + parenthèse fermée (caractère substring)"]
// suite du texte.


IMAGE (IMG) specifier_s = ₁


Avec
₍₁ _Arion_
  1703_boucher-princeton_university-1748_arion₎
, F. Boucher élabore un cycle.

{list-marker}
₍₁ _Arion_
  1703_boucher-princeton_university-1748_arion₎


// _Arion_ ins:₁[ins_s="1703_boucher-princeton_university-1748_arion"]

REFERENCE (REF) specifier_s = ₂


Dans le catalogue
₍₂ 2010_loire
  p.123 f.123₎
 de la collection Mottais, ce tableau.

// Référence bibliographique:
// 2010_loire ins:₂[ins_s="p.123 f.123"]

//----------------------------------------
== Links

[[article-anchor_1234]]
Reference point

xref:article-anchor_1234[Reference]

{% end_doc %}