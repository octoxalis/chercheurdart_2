---js
{
  layout:    'frame.njk',
  permalink: '1591-ribera~madrid-prado~1615-jeronimo.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      16,
  title_s:    `Jusepe de Ribera`,
  subtitle_s: `Jusepe de Ribera`,
  abstract_s: `Jusepe de Ribera`,
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  script_a:
  [
    'Idb.min.js',
    'location.min.js',
    'dom.min.js',
    'expo_in.min.js',
  ],
  css_a:
  [
  ],

  version_a:
  [
    '2022-12-19T15:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Jusepe de Ribera›
//


##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1591-ribera~madrid-prado~1615-jeronimo ]]

{% end_section %}
