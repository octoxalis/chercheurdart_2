---js
{
  layout:    'frame.njk',
  permalink: 'collection_france.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -11,
  title_s:    `Collection peintres de France`,
  subtitle_s: `Peintres de France`,
  abstract_s: `Oeuvres choisies`,
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  include_a:
  [
    `dialog_alert`
  ],
  
  script_a:
  [
    'Idb.min.js',
    'location.min.js',
    'dom.min.js',
    'drag.min.js',
    'dialog_alert.min.js',
    //-- 'expo_in.min.js',
  ],
  css_a:
  [
    'dialog_alert.min.css',
  ],

  version_a:
  [
    '2023-01-12T18:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹France›
//



##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Présentation

{{title_s}}

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1593-la_tour~new_york-met~1630-diseuse ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1594-poussin~new_york-met~1658-orion ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1604-gelée~new_york-met~1658-trojan ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1703-boucher~princeton-university~1748-arion ]]

{% end_section %}
