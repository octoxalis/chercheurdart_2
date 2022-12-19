---js
{
  layout:    'frame.njk',
  permalink: '2022-dev~paris-dev~2022-colors_6--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      10243,        // 7172,
  title_s:    `colors_6`,
  subtitle_s: `Test`,
  abstract_s: `colors_6`,
  workID_s:   '2022-dev~paris-dev~2022-colors_6',
  widthHeight_s:  '100_360',
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
    '2021-10-14T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
[[=  COLORS_6  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 2022-dev~paris-dev~2022-colors_6 ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹colors_6›
//



##1  {{title_s}}

||  COLORS_6  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Graphique de répartition chromatique à échelle logarithmique

{% end_section %}
