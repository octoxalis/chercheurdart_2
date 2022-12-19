---js
{
  layout:    'frame.njk',
  permalink: '1606-rembrandt~new_york-met~1632-turban--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7196,
  title_s:    `Rembrandt`,
  subtitle_s: `Rembrandt: L'honne au turban`,
  abstract_s: `L'honne au turban&mdash;1632`,
  workID_s:   '1606-rembrandt~new_york-met~1632-turban',
  widthHeight_s:  '3084_3804',
  //... link_s:  'https://artmuseum.princeton.edu/collections/objects/437385',
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
[[=  TURBAN  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1606-rembrandt~new_york-met~1632-turban ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Rembrandt›
//



##1  {{title_s}}

||  TURBAN  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Graphique de répartition chromatique à échelle logarithmique

{% end_section %}
