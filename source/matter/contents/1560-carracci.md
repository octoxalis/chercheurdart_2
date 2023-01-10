---js
{
  layout:    'frame.njk',
  permalink: '1560-carracci.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      21,
  title_s:    `Annibale Carracci`,
  subtitle_s: `Annibale Carracci`,
  abstract_s: `Annibale Carracci`,
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
‹Annibale Carracci›
//

##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1560-carracci~new_york-met~1595-coronation ]]

{% end_section %}
