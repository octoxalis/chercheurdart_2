---js
{
  layout:    'frame.njk',
  permalink: 'freemark.html',
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

§§§2 0. LOAD INCLUDED FILES
___
+++ inc
~~~
3mark_test
~~~
{{C_o.CONTENT_PARTS_DIR_s}}3mark_test.txt
+++
+++ inc
~~~
3mark_test_nested
~~~
{{C_o.CONTENT_PARTS_DIR_s}}3mark_test_nested.txt
+++
§§§2 1. ESCAPE MARKUP
^^^
these lines have been escaped::: <br>
§§§1 HEADER 1 <br>
[[[https://threemark.dev~~~3Mark]]]
^^^
then restored

§§§2 2. COMMENT BLOCK

a block comment...
###
enclosed
consecutive comment
lines
###
have been removed

§§§2 3. COMMENT INLINE

an inlined comment ...###enclosed consecutive inlined comment### have been removed
___
§§§2 4. LINK
###
syntax: [[[href~~~link_s]]]
###

[[[https://threemark.dev~~~3Mark]]]
-->
[[[page.html~~~Local link]]]

§§§2 5. IMAGE
###
syntax: <<<src~~~caption_s>>>
###

<<<image_src~~~Image_caption>>>

§§§2 6. CALL
###
syntax: (((function_name~~~'args', 'enclosed', 'in', 'apos')))
###

(((F_o.stamp__s~~~'2021-09-16T08:12:00Z')))

§§§2 7. BLOCK INSERT (NOT YET)
###
syntax: +++(inc|ins)~~~KEY~~~VALUE+++
###
___
§§§2 8. INCLUDE
###
type: inc
###

Include whole file

=== inc
~~~
3mark_test
~~~
===

Include selected lines of file

=== inc
~~~
3mark_test
~~~
1-3, 6, 9-40
===
___
§§§2 9. BOLD
before ***bold chars*** after

§§§2 91. STRONG
before !!!strong chars!!! after

§§§2 10. ITALIC
before ///italic chars/// after

§§§2 11. EMPHASIS
before &&&emphasis chars&&& after

§§§2 12. CODE
before ```code chars``` after

§§§2 13. CITE
before """cite chars""" after

§§§2 14. DELETE
before ---delete chars--- after

§§§2 15. HORIZONTAL LINE
before
___
after

§§§2 16. BREAK LINE
before ,,,
after
___
§§§2 NOT YET
§§§2 101.INSERT
###
type: ins
###
###
+++ ins
~~~
insert_ref
~~~
+++
###

###
=== insert_ref~~~référence (subsid_s) ===
###

§§§2 102. INSERT IMAGE
###
type: img
###
###
+++
~~~
arion
~~~
+++
###

###
=== arion~~~Arion par F. Boucher ===
###

§§§2 103. INSERT TABLE
###
type: tab
###

###
+++ tab
~~~
tab_1
~~~
+++
###

###
=== tab_1~~~Example 1 - inline table===
###

___
§§§2 EXPERIMENTAL

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
