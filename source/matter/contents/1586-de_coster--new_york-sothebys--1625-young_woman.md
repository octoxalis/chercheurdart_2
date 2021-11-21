---js
{
  layout:    'frame.njk',
  permalink: '1586-de_coster--new_york-sothebys--1625-young_woman.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      5120,
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

  //=== IMAGES
  'young_woman':
`₍₉
Jeune femme
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

₍₀
{{abstract_s}}
{{F_o.versionList__s(version_a)}}
₎

//---------------------------------------
== Presentation

Passé en vente chez Sotheby's à New York, cette {{young_woman}} constitue un jalon essentiel pour la reconstitution de l'oeuvre de l'artiste.

== Colorimétrie

* pass:[<a href={{U_o.url_s}}{{workID_s}}--burst.html>burst</a>]
* pass:[<a href={{U_o.url_s}}{{workID_s}}--paint.html>paint</a>]
// * pass:[<a href={{U_o.url_s}}{{workID_s}}--aster.html>aster</a>]

== Analyse

{% end_doc %}
