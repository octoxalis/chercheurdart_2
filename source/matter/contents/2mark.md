---js
{
  layout:   'frame.njk',
  permalink: '2mark.html',
  tags:    [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:    10241,
  title_s:   `2mark cheatsheet`,
  subtitle_s: `2mark markup used in chercheurd.art`,
  abstract_s: `2mark reference for chercheurd.art`,
  //issue_n:   -1,

  section_a:
  [
   `article`,
   //XX `galerie`,
  ],

  script_a:
  [
  ],

  css_a:
  [
   '2mark.css'
  ],

  version_a:
  [
   '2021-11-23T08:00:00Z',
  ],
  
}
---
{% _section section_a[0] %}
##1 3Mark Markdown preprocessor

##2 Exclude

\\
Escaped lines or inline parts are not processed
\\

This a //very short// inline comment (very short commented out)

##2 Formating

**Strong** inline


^^Emphasis^^ inline i.e. italic


Horizontal rule after 

--

Break after  ,,
Break before


<< Link to example  ::  https://example.app >>


[[ Arion par F. Boucher  ::  /assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif ]]


++
Primo
Secondo
  One
  Two
    1
      Uno
    2
      Ein
      Zwei
Tertio
++


(( F_o.stamp__s  ::  '2021-09-16T08:12:00Z' ))


##3 Inserted blocks

^₀  key_s ::
value_s_0
value_s_1 :: value_2
<< Chercheur d'Art  ::  index.html >>
[[ Le bel Arion  ::  /assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif ]] !!


^₁  Définition multiple (single level list) ::
Primo
Secondo !!


^₂  Claude Lorrain ::
1989-langdon
p.123
On peut ajouter un **lien**
<< Chercheur d'Art  ::  index.html >> !!


^₃  **Pretium scelerisque** sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes. ::
A. Dupin
<< Chercheur d'Art  ::  index.html >> !!


^₄  Tabula rasa ::
30_30_30 0_1_2
Primo
Secondo
Tertio

Un
Deux
Trois

One
__Two is escaped
Three

<< Chercheur d'Art  ::  index.html >>
__Empty is escaped
Last cell !!


^₉  Arion  ::
1703-boucher~princeton-university~1748-arion !!




##3 Declaration, réference, include

^+  MARK_TEST  ::  {{C_o.CONTENT_PARTS_DIR_s}}2mark_test.txt !!
¨+  MARK_TEST  §§
¨+  MARK_TEST  ::  1-3, 6, 9-40 §§


^=  DECLARE_VAL  :: A simple value to reference !!
¨=  DECLARE_VAL  §§


^=  VERSION_ID  ::
^₀  {{abstract_s}}  ::
{{F_o.versionList__s(version_a)}} !!

¨=  VERSION_ID  §§

Once more
¨=  VERSION_ID  §§

{% end_section %}
