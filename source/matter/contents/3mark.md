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
^^^1 {{title_s}}

§§§ins₀   {{abstract_s}}...
{{F_o.versionList__s(version_a)}} §§§

^^^2 Inserted blocks

§§§ins₀   key_s...
value_s_0
value_s_1
<<<Chercheur d'Art...index.html>>>
[[[/assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif...Le bel Arion]]] §§§

§§§ins₁   Définition multiple (single level list)...
<<<Chercheur d'Art...index.html>>>
[[[/assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif...Le bel Arion]]] §§§

§§§ins₃   °°°Pretium scelerisque°°° sed semper +++cubilia aenean suspendisse+++ arcu purus neque ridiculus natoque, facilisis vel duis cras velit hendrerit eros nisi montes...
A. Dupin
<<<Chercheur d'Art...index.html>>>
[[[/assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif...Le bel Arion]]] §§§

§§§ins₄   Tabula rasa...
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
<<<Chercheur d'Art...index.html>>>
[[[/assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif...Le bel Arion]]]
??? §§§

§§§ins₉   Arion...
1703-boucher~princeton-university~1748-arion §§§

§§§ins₂   Claude Lorrain...
1989-langdon
°°°p.123°°°
On peut ajouter une ///précision///...
///lien///: <<<Chercheur d'Art...index.html>>>
///image///: [[[/assets/media/img/1703-boucher~princeton-university~1748-arion/full/_128/0/gray.avif...Le bel Arion]]] §§§

{% end_section %}
