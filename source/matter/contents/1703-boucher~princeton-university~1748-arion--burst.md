---js
{
  layout:    'frame.njk',
  permalink: '1703-boucher~princeton-university~1748-arion--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7178,
  title_s:    `François Boucher`,
  subtitle_s: `François Boucher: Arion`,
  abstract_s: `Arion sur le Dauphin&mdash;1750`,
  workID_s:   '1703-boucher~princeton-university~1748-arion',
  widthHeight_s:  '2000_1283',
  //... link_s:  'https://artmuseum.princeton.edu/collections/objects/32343',
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  stat_s: `burst`,

  script_a:
  [
    'stat.min.js',
    'dom.min.js',
  ],
  css_a:
  [
    'stat.min.css',
    'stat_burst.min.css',
  ],

  version_a:
  [
    '2022-12-19T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
[[=  ARION  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1703-boucher~princeton-university~1748-arion ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹François Boucher›
//



##1  {{title_s}}

||  ARION  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Graphique de répartition chromatique à échelle logarithmique

{% end_section %}
