---js
{
  layout:    'frame.njk',
  permalink: '1586-de_coster~new_york-sothebys~1625-young_woman.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      17,
  title_s:    `Adam de Coster`,
  subtitle_s: `Adam de Coster`,
  abstract_s: `Adam de Coster`,
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
    '2021-10-14T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Adam de Coster›
//

##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1586-de_coster~new_york-sothebys~1625-young_woman ]]

{% end_section %}
