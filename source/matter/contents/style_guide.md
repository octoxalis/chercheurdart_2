---js
{
  layout:    'frame.njk',
  permalink: 'style_guide.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7168,
  title_s:    `Style guide`,
  subtitle_s: `AsciiDoc subset used in chercheurd.art`,
  abstract_s: `Style guide for chercheurd.art`,
  issue_n:    3,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  script_a:
  [
  ],

  css_a:
  [
    'style_guide.css'
  ],

  version_a:
  [
    '2021-09-16T08:12:00Z',
    '2021-09-14T12:44:07Z',
  ],

}
---
{% _doc section_a[0] %}
//IMAGES
:1748_arion: ₍₉ Arion
  1703_boucher-princeton_university-1748_arion₎

//BIBLIO
// NB: inside ins, html markup can be used if ins is enclosed in an AsciiDoc pass directive
:1989_langdon: ₍₂ Claude Lorrain
  1989_langdon¯**p.123**¯f.123¯On peut ajouter une __précision__...¯link<index.html>"link"¯image<https://chercheurdart-2.netlify.app/assets/media/img/1703_boucher-princeton_university-1748_arion/full/_128/0/gray.avif>"image"¯etc.₎

//LINKS
:chercheurdart: {{U_o.url_s}}index.html[chercheurd.art]
// ins inner link has to be passed
:chercheur_dart: pass:[<a href=https://chercheurdart-2.netlify.app>chercheurd.art</a>]

//INCLUDES (path is relative to source dir)
:tab_artist: {{C_o.CONTENT_PARTS_DIR_s}}Table_des_artistes.{{C_o.MACRO_INSERT_s}}

// TOPICS
////
‹Claude Gelée›
‹Nicolas Poussin›
‹Charles Lebrun›
‹François Boucher›
////
//========================================
= {{title_s}} (h1)


₍₀ {{abstract_s}}
  {{F_o.versionList__s(version_a)}}₎

//----------------------------------------
== Header h2

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

=== Header h3

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

==== Header h4

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

===== Header h5

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

====== Header h6

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

//----------------------------------------
== Alinea avec un titre de 37 caractères

.paragraph
Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.


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

=== TEXTE (txt) specifier_s = ₀

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

=== DEFINITION (def) specifier_s = ₁

₍₁ Définition multiple (single level list)
definition primo
definition secondo₎

.horizontal line
'''

=== REFERENCE (ref) specifier_s = ₂

Dans sa monographie {1989_langdon}, H. Langdon a décrit ce tableau...

.horizontal line
'''

=== CITATION (quo) specifier_s = ₃

₍₃ Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis.
  F. Nietzsche
  Crépuscule des idoles
  Maximes et pointes § 33₎

₍₃ Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.
  A. Dupin
  {chercheurdart}₎

.horizontal line
'''

===  TABLE (tab) specifier_s = ₄

₍₄ Example 1 - simple table
  20_50_30
  2_1_0
  TITLE_0₊TITLE_1₊TITLE_2
  ROW_0_0₊ROW_0_1 is a bit longer₊ROW_0_2
  ROW_1_0₊ROW_1_1₊{chercheur_dart}₎

₍₀ Example 2 - Artist table (included)
__with multiline optional comment...__₎
include::{tab_artist}[]

.horizontal line
'''

=== IMAGE (img) specifier_s = ₉

{1748_arion} de F. Boucher fait partie du cycle décoratif.

=== Insert markup

Use AsciiDoc pass:[] to insert link, images...
₍₀<> par exemple:
  image<https://chercheurdart-2.netlify.app/assets/media/img/1703_boucher-princeton_university-1748_arion/full/_128/0/gray.avif>"image"
  link<index.html>"link"
  `code_line = 1234`
  __italic__
  **bold**₎

//----------------------------------------
== Link

link:#article__anchor_1234[Reference]

//----------------------------------------
// CommentPart

{% end_doc %}
