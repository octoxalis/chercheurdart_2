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
    `galerie`,

  ],

  script_a:
  [
    'dom.min.js',
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
[[+  TABULA_RASA  ::
     {{C_o.CONTENT_PARTS_DIR_s}}tabula_rasa.td ]]

[[+  CLI_TABLE  ::
     {{C_o.CONTENT_PARTS_DIR_s}}Table_des_artistes.td ]]

[[+  MARK_TEST  ::
     {{C_o.CONTENT_PARTS_DIR_s}}tweenmark_test.txt ]]


// 2°. Simple declarations //
[[=  DECLARE_VAL  ::
     << Chercheur d'Art  ::  index.html >> ]]

// 3°. Block declarations last //
[[=  VERSION_ID   ::
     [[₀  {{abstract_s}}  ::  {{F_o.versionList__s(version_a)}} ]]

// END DECLARATIONS //



##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}} ]]



##2 1. Declarations

Place directives at **document top**:
==
  1. includes
  2. simple declarations
  3. block declarations
==

use 2 lines
==
  1. identificator (uppercase)
  2. assignment
==




##2 2. Exclude

\\
Escaped lines or inline parts are not processed
\\

// Comment on a whole line, not inside a line //
Previous line was a comment.



##2 3. Formating

Break after  ;;
Break before


Horizontal rule after 

--

**Strong** inline


^^Emphasis^^ inline i.e. ^^italic^^


<< Link to example  ::
   https://example.app >>


!! Arion par F. Boucher  ::
   /assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif !!


(( F_o.stamp__s  ::
   '2021-09-16T08:12:00Z' ))


==  An indented list with a ^^formated legend^^
    Primo
    Secondo
      One
      **Two**
        1
          Uno
        2
          ^^Ein^^
          ^^Zwei^^
==


""  Pretium scelerisque sed semper cubilia aenean suspendisse arcu.

    Purus neque **ridiculus** natoque.
    Facilisis vel duis cras velit hendrerit eros nisi montes.  ""

[[₃  A. Dupin  ::
     Source
     << Chercheur d'Art  ::  index.html >>  ]]




##2 4. Insertions

[[₀  key_s ::
     value_s_0      
     value_s_1
     << Chercheur d'Art  ::  index.html >>
     !! Le bel Arion  ::
        /assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif !!  ]]


[[₁  Multiple definition (single level list) ::
     Primo
     Secondo  ]]


[[₂  Claude Lorrain ::
     1989-langdon
     p.123
     On peut ajouter un **lien**
     << Chercheur d'Art  ::  index.html >>  ]]


**Included tables**
||+  TABULA_RASA  ||

||+  CLI_TABLE  ||

**Image block**

[[₉  Arion  ::
     1703-boucher~princeton-university~1748-arion  ]]

Image sans appel
[[₉  {{C_o.INS_DISPLAY_s}} ::
     1586-de_coster~new_york-sothebys~1625-young_woman ]]




##2 5. Include & declaration references

**Include file** ||+  MARK_TEST  ||


**Include selected lines** ||+  MARK_TEST  ::  6, 9-40 ||


**Reference**    ;;
||  DECLARE_VAL  ||

||  VERSION_ID  ||

// inline reference //
Once more
||  VERSION_ID  ||


{% end_section %}
