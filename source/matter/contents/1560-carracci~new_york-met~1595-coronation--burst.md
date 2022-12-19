---js
{
  layout:    'frame.njk',
  permalink: '1560-carracci~new_york-met~1595-coronation--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7178,
  title_s:    `Annibale Carracci`,
  subtitle_s: `Annibale Carracci: Orion`,
  abstract_s: `Le couronnement de la Vierge&mdash;1595&nbsp;post`,
  workID_s:   '1560-carracci~new_york-met~1595-coronation',
  widthHeight_s:  '3756_3104',
  //... link_s:  'https://www.metmuseum.org/art/collection/search/435853',
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
[[=  CORONATION  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1560-carracci~new_york-met~1595-coronation ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Annibale Carracci›
//



##1  {{title_s}}

||  CORONATION  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Graphique de répartition chromatique à échelle logarithmique

{% end_section %}
