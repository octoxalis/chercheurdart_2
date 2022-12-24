---js
{
  layout:    'frame.njk',
  permalink: '1599-velazquez~madrid-prado~1628-borrachos--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7204,
  title_s:    `Velázquez`,
  subtitle_s: `Velázquez: Los borrachos`,
  abstract_s: `Los borrachos, ou Le triomphe de Bacchus&mdash;1628&mdash;c.`,
  workID_s:   '1599-velazquez~madrid-prado~1628-borrachos',
  widthHeight_s:  '1920_1405',
  //... link_s:  'https://www.museodelprado.es/coleccion/obra-de-arte/los-borrachos-o-el-triunfo-de-baco/4a23d5e2-9fd4-496b-806b-0f8ba913b3d8',
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
    '2022-12-21T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
[[=  LACTEA  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1599-velazquez~madrid-prado~1628-borrachos ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Velázquez›
//



##1  {{title_s}}

||  LACTEA  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Répartition chromatique (échelle logarithmique)

{% end_section %}
