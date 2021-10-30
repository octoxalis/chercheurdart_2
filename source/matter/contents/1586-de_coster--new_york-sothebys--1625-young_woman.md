---js
{
  layout:    'frame.njk',
  permalink: '1586-de_coster--new_york-sothebys--1625-young_woman.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1024,
  title_s:    `Jeune femme par Adam de Coster (1625 c.)`,
  subtitle_s: `A. de Coster Jeune femme (1625 c.)`,
  abstract_s: `Un nocture flamand`,
  workID_s:   '1586-de_coster--new_york-sothebys--1625-young_woman',
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
    `stat`,
  ],

  stat_a:
  [
    `burst`,
    `aster`,
    `paint`,
  ],

  script_a:
  [
    'stat.min.js',
  ],
  css_a:
  [
    'stat.min.css',
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],

  //=== IMAGES
  'jeune_femme':
      `₍₉ Jeune femme (1625 c.) par Adam de Coster
      1586-de_coster--new_york-sothebys--1625-young_woman₎`
  ,

}
---
{% _doc section_a[0] %}
//LINKS
// TOPICS
////
Adam de Coster›
////
//========================================
= {{title_s}}

₍₀ {{abstract_s}}
  {{F_o.versionList__s(version_a)}}₎

//---------------------------------------
== Presentation

{{jeune_femme}} vendu chez Sotheby's.

== Colorimétrie

L'analyse colorimétrique...
{% end_doc %}
