---js
{
  layout:    'frame.njk',
  permalink: '1577-rubens~madrid-prado~1636-lactea--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7200,
  title_s:    `Rubens`,
  subtitle_s: `Rubens: La naissance de la Voie Lactée`,
  abstract_s: `La naissance de la Voie Lactée&mdash;1636&mdash;c.`,
  workID_s:   '1577-rubens~madrid-prado~1636-lactea',
  widthHeight_s:  '2952_2186',
  //... link_s:  'https://www.museodelprado.es/coleccion/obra-de-arte/el-nacimiento-de-la-via-lactea/c7369ad2-f0ae-4d5d-bb23-21f51bd3283c',
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
    '2022-12-21T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
[[=  LACTEA  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1577-rubens~madrid-prado~1636-lactea ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Rubens›
//



##1  {{title_s}}

||  LACTEA  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Graphique de répartition chromatique à échelle logarithmique

{% end_section %}
