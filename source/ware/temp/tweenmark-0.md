---js
{
  layout:   'frame.njk',
  permalink: 'tweenmark.html',
  tags:    [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:    10241,
  title_s:   `TweenMark preprocessor`,
  subtitle_s: `TweenMark markup used in chercheurd.art`,
  abstract_s: `TweenMark reference for chercheurd.art`,
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
   'tweenmark.css'
  ],

  version_a:
  [
   '2021-11-23T08:00:00Z',
  ],
  
}
---
{% _section section_a[0] %}
// 1°. Includes //
^+  __TABULA_RASA  ::  {{C_o.CONTENT_PARTS_DIR_s}}tabula_rasa.td !!
^+  __CLI_TABLE    ::  {{C_o.CONTENT_PARTS_DIR_s}}Table_des_artistes.td !!
^+  __MARK_TEST    ::  {{C_o.CONTENT_PARTS_DIR_s}}tweenmark_test.txt !!

// 2°. Simple declarations //
^=  __SITE         ::  << Chercheur d'Art  ::  index.html >> !!
^=  __DECLARE_VAL  ::  << Chercheur d'Art  ::  index.html >> !!

// 3°. Block declarations last //
^=  __VERSION_ID   :: 
^₀  {{abstract_s}}  ::  {{F_o.versionList__s(version_a)}} !!

//=== END DECLARATIONS ===//

##1 {{title_s}}

^₀  {{abstract_s}}
::  {{F_o.versionList__s(version_a)}} !!




##2 Exclude

\\
Escaped lines or inline parts are not processed
\\

// Comment on a whole line, not inside a line //
Previous line was a comment.

##2 Formating

**Strong** inline


^^Emphasis^^ inline i.e. italic


Horizontal rule after 

--

Break after  ,,
Break before


<< Link to example  ::  https://example.app >>

¨= __SITE §§


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
++


(( F_o.stamp__s  ::  '2021-09-16T08:12:00Z' ))




##2 Inserted blocks

^₀  key_s ::
value_s_0
value_s_1
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

Included table example:
¨+  __TABULA_RASA  §§

¨+  __CLI_TABLE  §§


^₉  Arion  ::
1703-boucher~princeton-university~1748-arion !!




##2 Include, declaration, réference

Place directives at the **document top**:
++
1. Includes
2. Simple declaration
3. Block declarations
++


Include: 
¨+  __MARK_TEST  §§

Include selection: 
¨+  __MARK_TEST  ::  6, 9-40 §§

Use **double underscore** prefix for ID

¨=  __VERSION_ID  §§

// inline reference //
Once more: ¨=  __VERSION_ID  §§

¨=  __DECLARE_VAL  §§

{% end_section %}
