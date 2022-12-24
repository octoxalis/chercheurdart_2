---js
{
  layout:    'frame.njk',
  permalink: '1591-ribera~madrid-prado~1615-jeronimo--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7208,
  title_s:    `Jusepe de Ribera`,
  subtitle_s: `Jusepe de Ribera: Saint Jérôme`,
  abstract_s: `Saint Jérôme écrivant&mdash;1615&mdash;c.`,
  workID_s:   '1591-ribera~madrid-prado~1615-jeronimo',
  widthHeight_s:  '1426_1920',
  //... link_s:  'https://www.museodelprado.es/coleccion/obra-de-arte/san-jeronimo-escribiendo/ed0b9f12-8471-4d50-88ec-b3ea87667120',
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
[[=  JERONIMO  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1591-ribera~madrid-prado~1615-jeronimo ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Jusepe de Ribera›
//



##1  {{title_s}}

||  JERONIMO  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Répartition chromatique (échelle logarithmique)

{% end_section %}
