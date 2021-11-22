---js
{
  layout:    'frame.njk',
  permalink: 'style_guide.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:      10240,
  title_s:    `Style guide`,
  subtitle_s: `AsciiDoc subset used in chercheurd.art`,
  abstract_s: `Style guide for *chercheurd.art*`,
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

  //=== IMAGES
  '1748_arion':
  `₍₉
  Arion
  1703-boucher--princeton-university--1748-arion₎`
  ,

  //=== BIBLIO
  // NB: inside ins, html markup can be used if ins is enclosed in an AsciiDoc pass directive
  '1989_langdon':
`₍₂
Claude Lorrain
1989-langdon₊₊**p.123**₊₊f.123₊₊On peut ajouter une __précision__...₊₊link<index.html>"link"₊₊image<https://chercheurdart-2.netlify.app/assets/media/img/1703-boucher--princeton-university--1748-arion/full/_128/0/gray.avif>"image"₊₊etc.₎`
  ,
  
}
---
{% _doc section_a[0] %}
//========================================
= {{title_s}}

₍₀
{{abstract_s}}
{{F_o.versionList__s(version_a)}}
₎

# --------------------------------------
# MOVE TO TOP
# --------------------------------------
¯link:chercheurdart¯ {{U_o.url_s}}

¯link:chercheur_dart¯ https://chercheurdart-2.netlify.app

¯include:toc¯ {{C_o.CONTENT_PARTS_DIR_s}}index_toc.html
¯include:tab_artist¯ {{C_o.CONTENT_PARTS_DIR_s}}Table_des_artistes.{{C_o.MACRO_INSERT_s}}

# TOPICS
#+begin_comment
‹Claude Gelée›
‹Nicolas Poussin›
‹Charles Lebrun›
‹François Boucher›
#+end_comment


== Articles en ligne
₌toc₌

# ---------------------------------------
== Header h2

Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis. Tincidunt massa erat quisque augue nostra pellentesque auctor suspendisse mus orci, ultricies phasellus maecenas dapibus sem suscipit enim cras nullam molestie non, facilisi purus porta congue etiam class ornare nulla cursus. Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.

=== Header h3


==== Header h4


===== Header h5


====== Header h6


# ---------------------------------------
== Alinea avec un titre de 37 caractères

.paragraph
Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis..


# ---------------------------------------
== Référence

¯anchor:article__anchor_1234¯ Voici une référence


# ---------------------------------------
== List

NB: Dont use `*` as 1rst level (conflict with h1... headers); use `-` instead

.unordered
- primo
- secondo
  * un
  * deux
- tertio

# ---------------------------------------
== Insert

Les blocs insérés en ligne se composent de deux parties:

- appel (prinpipal_s)
- référence (subsid_s)

.horizontal line
'''

=== TEXTE (txt) specifier_s = ₀

Le texte précédent l'
₍₀
appel (prinpipal_s)
parenthèse ouverte (caractère substring)
specifier_s: 0-99 (caractères substring)
₎
est suivi de la
₍₀
référence (subsid_s)
newline
indentation (espaces)
référence (mono ou multiligne)
parenthèse fermée (caractère substring)
₎
suite du texte.

.horizontal line
'''

=== DEFINITION (def) specifier_s = ₁

₍₁
Définition multiple (single level list)
definition primo
definition secondo
₎

.horizontal line
'''

=== REFERENCE (ref) specifier_s = ₂

Dans sa monographie {{1989_langdon}}, H. Langdon a décrit ce tableau...

.horizontal line
'''

=== CITATION (quo) specifier_s = ₃

₍₃
Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis.
F. Nietzsche
Crépuscule des idoles
Maximes et pointes § 33
₎

₍₃
Pretium scelerisque sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.
A. Dupin
₌chercheur_dart₊Le site Chercheur d'Art₌
₎

.horizontal line
'''

===  TABLE (tab) specifier_s = ₄

₍₄
Example 1 - inline table
20_50_30
2_1_0
TITLE_0₊TITLE_1₊TITLE_2
ROW_0_0₊ROW_0_1 is a bit longer₊ROW_0_2
ROW_1_0₊ROW_1_1₊₌chercheur_dart₊Chercheur d'Art₌
₎

₍₀
Example 2 - AsciiDoc include table
__ generated with CLI table script__
using file name
₎ +
# !!! insert break
₌tab_artist₌


.horizontal line
'''

=== IMAGE (img) specifier_s = ₉
{{1748_arion}} de F. Boucher fait partie du cycle décoratif.




=== Insert markup

Use AsciiDoc pass:[] to insert link, images...
₍₀~
par exemple:
image<https://chercheurdart-2.netlify.app/assets/media/img/1703-boucher--princeton-university--1748-arion/full/_128/0/gray.avif>"image"
link<index.html>"link"
`code_line = 1234`
 __italic__
 **bold**
₎

# ---------------------------------------
== Link

[[#article__anchor_1234][Reference]]

# ---------------------------------------
== Org mode

Link has been declared at page top

Link with path added to href and link text: ₌chercheurdart₊style_guide.html₊Le Guide!₌

Link with only a link text: ₌chercheurdart₊Le Site!₌

Link with not even a link text (invalid): ₌chercheurdart₌

¯img:coster_woman¯ 1586-de_coster--new_york-sothebys--1625-young_woman
₌coster_woman₊Jeune femme 1625 c.₌

¯eval:stamp__s¯ F_o.stamp__s
₌stamp__s₊2021-11-21T17:00:00Z₌

¯include:file¯ {{C_o.CONTENT_PARTS_DIR_s}}include_test.adoc
₌file₊3 5-8₌

Next line is a line comment.
# This is a line comment.
Previous line is a line comment (it is concatenad with line before).

comment has been removed @@REMOVE@@ from this line.

A block comment follows:
#+begin_comment
This is a block comment.
It can span multiple line.
As well as other markup.
#+end_comment
It has been removed!

[[#article__anchor_1234][Reference]]

[[https://chercheurd.art][Chercheur d'Art]]

*** H3 Title
**** H4 Title
***** H5 Title

Line break at end of this line +
without blank line after.


# ---------------------------------------
# References

# ---------------------------------------
# Comments

{% end_doc %}
