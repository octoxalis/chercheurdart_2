---js
{
  layout:    'frame.njk',
  permalink: 'freemark.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:      10241,
  title_s:    `Freemark cheatsheet`,
  subtitle_s: `Freemark markup used in chercheurd.art`,
  abstract_s: `Freemark reference for chercheurd.art`,
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
    //XX 'freemark.css'
  ],

  version_a:
  [
    '2021-11-23T08:00:00Z',
  ],
  
}
---
{% _doc section_a[0] %}
= {{title_s}}

#+begin_comment


""" ESCAPE MARKUP """

^^^
enclosing
consecutive escaped
lines
^^^



""" COMMENTS """
""" COMMENT BLOCK """

"""
enclosing
consecutive comment
lines
"""



""" COMMENT INLINE """

enclosing """consecutive comment""" chars



""" DIRECT REFERENCE """
""" LINK """
""" syntax: [[[href~~~link_s]]] """


[[[https://chercheurd.art~~~Chercheur d'Art]]] --> [[[page.html~~~Chercheur d'Art]]]



""" IMAGE """
""" syntax: <<<src~~~caption_s>>> """

<<<image_src~~~Image_caption>>>



""" CALL """
""" syntax: (((function_name~~~'args', 'enclosed', 'in', 'apos'))) """

(((F_o.stamp__s~~~'2021-09-16T08:12:00Z')))



""" BLOCK MARKUP """
"""
syntax: |||(inc|ins)~~~KEY~~~VALUE|||
"""

""" INCLUDE """
type: inc

||| inc
~~~
tab_2
~~~
{{C_o.CONTENT_PARTS_DIR_s}}Table_des_artistes.{{C_o.MACRO_INSERT_s}}
|||
!!! tab_2~~~Example 2 - included table !!!



""" INSERT """
type: ins

||| ins
~~~
insert_ref
~~~
₍₀
newline
indentation (espaces)
référence (mono ou multiligne)
parenthèse fermée (caractère substring)₎
|||
!!! insert_ref~~~référence (subsid_s) !!!



""" IMAGE """
type: img

|||
~~~
arion
~~~
₍₉
Arion
1703-boucher--princeton-university--1748-arion₎
|||
!!! arion~~~Arion par F. Boucher !!!



""" TABLE """
type: tab

||| tab
~~~
tab_1
~~~
₍₄
20_50_30
2_1_0
TITLE_0
TITLE_1
TITLE_2
ROW_0_0
ROW_0_1 is a bit longer
ROW_0_2
ROW_1_0
ROW_1_1
[[[https://chercheurd.art~~~Chercheur d'Art]]]₎
|||
!!! tab_1~~~Example 1 - inline table!!!



""" INLINE MARKUP """

""" HEADERS """
§§§1 HEADER 1
§§§6 HEADER 6



""" BOLD """
before :::bold chars::: after



""" ITALIC """
before ///italic chars/// after



""" EMPHASIS """
before ___emphasis chars___ after


#+end_comment

{% end_doc %}
