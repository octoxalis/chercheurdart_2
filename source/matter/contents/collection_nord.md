---js
{
  layout:    'frame.njk',
  permalink: 'collection_nord.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -10,
  title_s:    `Peintres du Nord`,
  subtitle_s: `Peintres de Hollande, Flandres, Allemagne`,
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
    'dom.min.js',
    'drag.min.js',
    'dialog_alert.min.js',
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
‹Hollande›
‹Flandres›
‹Allemagne›
//



##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Présentation

{{title_s}}

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1577-rubens~madrid-prado~1636-lactea ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1586-de_coster~new_york-sothebys~1625-young_woman ]]

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1606-rembrandt~amsterdam-rijks~1630-jeremiah ]]

{% end_section %}
