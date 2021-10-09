---js
{
  layout:    'frame.njk',
  permalink: 'index.html',
  tags:      [ 'index' ],
  eleventyExcludeFromCollections: false,
  //--expires_n: 10,


  doc_n:      0,
  title_s:    'chercheurdart',
  subtitle_s: `l'œil technologique de la peinture`,
  abstract_s: `Un autre regard sur la peinture des maîtres anciens`,

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
//LINKS
:site_tech: {{U_o.url_s}}site_tech.html#{{C_o.SECTION_a[0]}}[Technologie du site]

= En ligne

*  link:renaissance.html#{{C_o.SECTION_a[0]}}[Renaissance]
*  link:site_tech.html#{{C_o.SECTION_a[0]}}[Technologie du site]

////
*  link:1703_boucher-princeton_university-1748_arion.html#{{C_o.SECTION_a[0]}}[F. Boucher, Arion - 1748]
////

== Avertissement

Ce site étant délibéremment expérimental, tant par sa forme que par son contenu, certains de ses éléments, et en tout premier lieu les images, ne sont accessibles qu'en utilisant les navigateurs Internet Google Chrome ou Mozilla Firefox dans leurs versions les plus récentes.

La page {site_tech} donne un aperçu de l'infrastructure mise en oeuvre.

link:asciidoc.html#article__anchor_1234[Reference]


== Colophon

{{A_o.NAME_s}} est construit avec le générateur de site statique  {{U_o.E11TY_s}}

{% end_doc %}
