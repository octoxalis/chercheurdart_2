---js
{
  layout:    'frame.njk',
  permalink: 'collection_sud.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -12,
  title_s:    `Collection peintres du Sud`,
  subtitle_s: `Peintres d'Italie, Espagne`,
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
     1560-carracci~new_york-met~1595-coronation ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1571-merisi~roma-borghese~1597-giovane ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1571-merisi~roma-borghese~1605-girolamo ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1575-reni~roma-borghese~1620-mose ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1591-ribera~madrid-prado~1615-jeronimo ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1599-velazquez~madrid-prado~1628-borrachos ]]

{% end_section %}
