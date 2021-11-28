---js
{
  layout:    'frame.njk',
  permalink: '3mark.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:      10241,
  title_s:    `3mark cheatsheet`,
  subtitle_s: `3mark markup used in chercheurd.art`,
  abstract_s: `3mark reference for chercheurd.art`,
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
    '3mark.css'
  ],

  version_a:
  [
    '2021-11-23T08:00:00Z',
  ],
  
}
---
{% _section section_a[0] %}
###1 3Mark Markdown preprocessor

###2 Formating

***Strong inline***,,,
\\\
***Strong inline***
\\\

---

\\\
^^^Emphasis (italic) inline^^^,,,
^^^Emphasis (italic) inline^^^
\\\

---

"""Quotation (cite) inline""",,,
\\\
"""Quotation (cite) inline"""
\\\

---

"""
Quotation paragraph,,,
uses the same,,,
enclosing chars
"""
\\\
"""<br>
Quotation paragraph,,,<br>
uses the same,,,<br>
enclosing chars<br>
"""
\\\

---

___Strikethrough (delete) inline___

\\\
___Strikethrough (delete) inline___
\\\

---

```Code inline```,,,
\\\
\```Code inline\```
\\\

---

%%%<span>Raw HTML tag(s)</span>%%%,,,
\\\
%%%<span>Raw HTML tag(s)</span>%%%
\\\

###3 Header level 3
\\\
###3 Header level 3
\\\

---

°°°
Primo
Secondo
  One
  Two
Tertio
°°°
,,,
\\\
°°°<br>
&nbsp;&nbsp;Primo<br>
&nbsp;&nbsp;Secondo<br>
&nbsp;&nbsp;&nbsp;&nbsp;One<br>
&nbsp;&nbsp;&nbsp;&nbsp;Two<br>
&nbsp;&nbsp;Tertio<br>
°°°
\\\

---

This a ///very short/// ^^^inline^^^ comment
\\\
This a ///very short/// inline comment
\\\

---

\\\
Escaped lines or inline parts ^^^are not^^^ processed
\\\

---

<<< https://chercheurdart-2.netlify.app   :::   Chercheur d'Art >>>
\\\
<<< https://chercheurdart-2.netlify.app&nbsp;&nbsp;&nbsp;:::&nbsp;&nbsp;&nbsp;Chercheur d'Art >>>
\\\

***Use 3 spaces to separate href and text.***
---

[[[ /assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif   :::   Arion par F. Boucher ]]]
\\\
[[[ /assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;Arion par F. Boucher ]]]
\\\

***Use 3 spaces to separate src and text.***

---

((( F_o.stamp__s   :::   '2021-09-16T08:12:00Z' )))
\\\
((( F_o.stamp__s&nbsp;&nbsp;&nbsp;:::&nbsp;&nbsp;&nbsp;'2021-09-16T08:12:00Z' )))
\\\

***Use 3 spaces to separate function and arguments list.***

---

###3 Inserted blocks

|||ins₀   key_s:::
value_s_0
value_s_1
<<<Chercheur d'Art   :::   index.html>>>
[[[/assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif   :::   Le bel Arion]]] |||

---

|||ins₁   Définition multiple (single level list):::
Primo
Secondo |||

---

|||ins₂   Claude Lorrain:::
1989-langdon
p.123
On peut ajouter un ***lien***
<<<Chercheur d'Art   :::   index.html>>> |||

---

|||ins₃   ***Pretium scelerisque*** sed semper cubilia aenean suspendisse arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes.:::
A. Dupin
<<<Chercheur d'Art   :::   index.html>>> |||

---

|||ins₄   Tabula rasa:::
30_30_30 0_1_2
Primo
Secondo
Tertio
Un
Deux
Trois
One
???
Three
<<<Chercheur d'Art   :::   index.html>>>
???
??? |||

---

|||ins₉   Arion:::
1703-boucher~princeton-university~1748-arion |||

---

|||dec   VERSION_ID:::
!!!ins₀   {{abstract_s}}:::
{{F_o.versionList__s(version_a)}} !!! |||


=== VERSION_ID ===



{% end_section %}
