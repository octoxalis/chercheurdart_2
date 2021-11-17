---js
{
  layout:    'frame.njk',
  permalink: '1586-de_coster--new_york-sothebys--1625-young_woman--aster.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7169,
  title_s:    `Adam de Coster`,
  subtitle_s: `Adam de Coster: Jeune femme tenant une quenouille`,
  abstract_s: `Jeune femme tenant une quenouille devant une chandelle&mdash;1625&nbsp;c.`,
  workID_s:   '1586-de_coster--new_york-sothebys--1625-young_woman',
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  stat_a:
  [
    `aster`,
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
  'young_woman':
      `₍₉ &nbsp;
      1586-de_coster--new_york-sothebys--1625-young_woman₎`
  ,

}
---
{% _doc section_a[0] %}
//LINKS
// TOPICS
////
‹Adam de Coster›
////

//========================================
= {{title_s}}

₍₀ {{abstract_s}}
  {{F_o.versionList__s(version_a)}}₎
  {{young_woman}}

* pass:[<a href={{U_o.url_s}}{{workID_s}}.html>Présentation</a>]

//---------------------------------------
== Colorimétrie

Graphique de rayonnement (aster) à échelle logarithmique

{% end_doc %}
