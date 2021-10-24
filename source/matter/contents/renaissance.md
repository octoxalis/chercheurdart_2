---js
{
  layout:    'frame.njk',
  permalink: 'renaissance.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      4096,
  title_s:    `Renaissance`,
  subtitle_s: `Un nouveau modèle pour Chercheur d'Art`,
  abstract_s: `Après un an d'absence, Chercheur d'Art revient sous une nouvelle forme`,

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

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],
}
---
{% _doc section_a[0] %}
// TOPICS
////
‹Charles Lebrun›
‹François Boucher›
////
//========================================
= {{title_s}}

₍₀ {{abstract_s}}
  {{F_o.versionList__s(version_a)}}₎

== Nouvelle version du site

{% end_doc %}
