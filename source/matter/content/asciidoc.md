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
  abstract_s: `AsciiDoc cheatsheet for chercheurd.art`,

  section_a:
  [
    `article`,
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

Dans sa monographie sur
₍₂ Claude Lorrain
  1989_langdon₊p.123₊f.123₊On peut ajouter une _précision_...₎
, H. Langdon décrit ce tableau...


₍₃ Lorem ipsum dolor sit amet consectetur adipiscing elit mollis dignissim duis, nunc tincidunt cras ultricies felis morbi blandit ut mattis sociosqu dis, congue velit gravida fames libero eget habitasse commodo venenatis.
  F. Nietzsche
  Crépuscule des idoles
  Maximes et pointes, § 33₎

//----------------------------------------
== Links

link:#article__anchor_1234[Reference]

{% end_doc %}
