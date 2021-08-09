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

//----------------------------------------
== Alinea avec un titre de 37 caractères

.paragraph
A common alinea...


[quote, Nietzsche, Aurore]
____
Sans la musique, la vie serait une erreur
____


//----------------------------------------
anchor:article__anchor_1234[]
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

.horizontal line
'''

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

.horizontal line
'''

IMAGE (IMG) specifier_s = ₁

₍₁ _Arion_
  1703_boucher-princeton_university-1748_arion₎
de F. Boucher fait partie du cycle décoratif.

// _Arion_ ins:₁[ins_s="1703_boucher-princeton_university-1748_arion"]

.horizontal line
'''

REFERENCE (REF) specifier_s = ₂

Dans le catalogue
₍₂ 2010_loire
  p.123
  f.123₎
 de la collection Mottais, ce tableau.


//----------------------------------------
== Links

link:#article__anchor_1234[Reference]

//----------------------------------------
== Lorem

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

Mi eget morbi felis cursus eros ut vestibulum ac, aliquet ligula praesent arcu orci primis velit habitant posuere, mattis erat class consequat in mus pharetra. Quis natoque auctor purus varius consequat maecenas tincidunt porttitor facilisi accumsan interdum scelerisque ullamcorper hac condimentum, torquent curabitur nullam sagittis vestibulum iaculis egestas arcu phasellus nec tristique nam fusce.

Magnis nostra rhoncus dapibus mus sociosqu nam nullam, felis laoreet lobortis suspendisse ut molestie integer cras, bibendum in habitasse porttitor sagittis purus. In justo per cubilia tellus fringilla mus integer sollicitudin at parturient, nascetur mauris volutpat eleifend enim sociis conubia proin neque. Sollicitudin erat morbi quam ridiculus tincidunt eu placerat, purus tellus malesuada dictum cum gravida facilisi dignissim, conubia interdum nibh elementum aenean habitasse. Feugiat gravida praesent phasellus condimentum sagittis, vivamus tellus dui leo montes hendrerit, pellentesque cras aliquam nec.

{% end_doc %}