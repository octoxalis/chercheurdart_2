---js
{
  layout:    'frame.njk',
  permalink: '1594-poussin~new_york-met~1658-orion--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7175,
  title_s:    `Nicolas Poussin`,
  subtitle_s: `Nicolas Poussin: Orion`,
  abstract_s: `Orion aveugle cherchant le soleil levant&mdash;1658`,
  workID_s:   '1594-poussin~new_york-met~1658-orion',
  widthHeight_s:  '3668_2392',
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  stat_s: `burst`,

  script_a:
  [
    'Idb.min.js',
    'location.min.js',
    'dom.min.js',
    'stat.min.js',
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
[[=  ORION  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1594-poussin~new_york-met~1658-orion ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Nicolas Poussin›
//



##1  {{title_s}}

||  ORION  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Répartition chromatique (échelle logarithmique)

{% end_section %}
