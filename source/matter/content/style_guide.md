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
  ],

  script_a:
  [
  ],

  css_a:
  [
    'style_guide.css'
  ],

  topics_a:
  [
    'first topic',
    'second topic'
  ]
  ,

  version_a:
  [
    '2021-09-16T08:12:00Z',
    '2021-09-14T12:44:07Z',
  ],

}
---
{% _doc section_a[0] %}
//IMAGES
:1748_arion: ins:₉[sub_s=1703_boucher-princeton_university-1748_arion]

//BIBLIO
:1989_langdon: ins:₂[sub_s=1989_langdon¯p.123¯f.123¯On peut ajouter une _précision_...]

//LINKS
:chercheurdart: https://chercheurdart-2.netlify.app[chercheurd.art]
:comments:      https://chercheurdart-2.netlify.app[commentaires]

//INCLUDE (path is relative to source dir)

:tab_artist: matter/content/parts/artist.{{C_o.MACRO_INSERT_s}}

//===========================================================================
= {{title_s}} (h1)

{{abstract_s}}
₍₀ 
  Versions
  {{F_o.versionList__s(version_a)}}₎


//----------------------------------------
== Header h2

‹Lorem› ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

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
  ‹parenthèse ouverte› (caractère substring)
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

Dans sa monographie _Claude Lorrain_ {1989_langdon}, H. Langdon a décrit ce tableau...

.horizontal line
'''

=== CITATION (quo) specifier_s = ₃

₍₃ Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis.
  F. Nietzsche
  Crépuscule des idoles
  Maximes et pointes § 33₎

₍₃ Pretium scelerisque sed semper ‹cubilia› aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.
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
  ROW_1_0₊ROW_1_1₊pass:[<a href=https://chercheurdart-2.netlify.app>chercheurd.art</a>]₎

{% _tab %}
Example 2 - Artist table (included)

__with ‹multiline› optional comment...__
{% end_tab %}

include::{tab_artist}[]

.horizontal line
'''

=== IMAGE (img) specifier_s = ₉

_‹Arion›_ {1748_arion} de F. Boucher fait partie du cycle décoratif.

//----------------------------------------
== Link

link:#article__anchor_1234[Reference]

//----------------------------------------
// TopicsPart

//----------------------------------------
// CommentPart

{% end_doc %}
