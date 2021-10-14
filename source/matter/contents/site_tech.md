---js
{
  layout:    'frame.njk',
  permalink: 'site_tech.html',
  tags:      [ 'index' ],
  eleventyExcludeFromCollections: false,
  //--expires_n: 10,


  doc_n:      5120,
  title_s:    `Technologie du site`,
  subtitle_s: `Infrastructure technologique du site`,
  abstract_s: `Les technologies du web au service de l'art`,

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

= {{title_s}}

{{abstract_s}}.


....En effet, toutes les images du site sont au format AVIF, une technique d'encodage des images permettant de réduire d'optimiser la taille de leurs fichiers numériques et, par voie de conséquence, le temps nécessaire à leur chargement.


//----------------------------------------
// TopicsPart
////
‹Nicolas Poussin›
‹Charles Lebrun›
‹François Boucher›
////

{% end_doc %}