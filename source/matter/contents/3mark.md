---js
{
  layout:    'frame.njk',
  permalink: '3mark.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:      10241,
  title_s:    `3Mark cheatsheet`,
  subtitle_s: `3Mark markup used in chercheurd.art`,
  abstract_s: `3Mark reference for chercheurd.art`,
  //issue_n:    -1,

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
  ],

  version_a:
  [
    '2021-11-23T08:00:00Z',
  ],
  
}
---
{% _doc section_a[0] %}
§§§1 {{title_s}}

§§§2 1. ESCAPE MARKUP
\\\
this block <br>
§§§1 HEADER 1 <br>
[[[image_src...Image_caption]]]
\\\
and \\\///a few italic words///\\\ inside this line
have been escaped ||| then restored
___


§§§2 2. COMMENT BLOCK
a block comment...
###
enclosed
consecutive comment
lines
###
have been removed
___


§§§2 3. COMMENT INLINE

an inlined comment ...
### enclosed consecutive inlined comment ###
has been removed
___


§§§2 4. LINK
### syntax: <<<href...link_s>>> ###
<<<https://threemark.dev...3Mark>>>
-->
<<<page.html...Local link>>>
___


§§§2 5. IMAGE
### syntax: [[[src...caption_s]]] ###
[[[image_src...Image_caption]]]
___


§§§2 6. CALL
### syntax: (((function_name...'args', 'enclosed', 'in', 'apos'))) ###
(((F_o.stamp__s...'2021-09-16T08:12:00Z')))
___


§§§2 0. LOAD INCLUDED FILES
@@@ 3mark_test
...{{C_o.CONTENT_PARTS_DIR_s}}3mark_test.txt @@@

@@@ 3mark_test_nested
...{{C_o.CONTENT_PARTS_DIR_s}}3mark_test_nested.txt @@@
___


§§§2 8. INCLUDE
Include whole file |||
+++ 3mark_test
... +++

Include selected lines of file |||
+++ 3mark_test
...1-3, 6, 9-40 +++
___


§§§2 9. BOLD - STRONG - EMPHASIS - ITALIC - DELETE - CITE - CODE - RAW
before ***bold chars*** after      |||
before °°°strong chars°°° after    |||
before !!!emphasis chars!!! after  |||
before ///italic chars/// after    |||
before ---delete chars--- after    |||
before """cite chars""" after      |||
before ```code chars``` after      |||
===<b>some raw</b> <strong>HTML code</strong>===


§§§2 9.1 COMBINE
```///°°°italic and strong code°°°///```

---!!!"""emphasis citation deleted"""!!!---
___


§§§2 15. HORIZONTAL LINE
before
___
after

§§§2 16. BREAK LINE
before |||
after
___


§§§2 201. LIST
:::
un
deux
  primo
  secondo
trois
quatre
  one
    1
    2
    3
  two
cinq
:::

{% end_doc %}
