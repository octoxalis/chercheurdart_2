---js
{
  layout:    'frame.njk',
  permalink: '1571-merisi.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      20,
  title_s:    `Michelangelo Merisi`,
  subtitle_s: `Michelangelo Merisi`,
  abstract_s: `Michelangelo Merisi`,
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
‹Michelangelo Merisi›
//

##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1571-merisi~roma-borghese~1605-girolamo ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1571-merisi~roma-borghese~1597-giovane ]]

{% end_section %}
