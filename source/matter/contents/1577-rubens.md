---js
{
  layout:    'frame.njk',
  permalink: '1577-rubens.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      18,
  title_s:    `Rubens`,
  subtitle_s: `Rubens`,
  abstract_s: `Rubens`,
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
    '2022-12-21T15:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Rubens›
//

##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1577-rubens~madrid-prado~1636-lactea ]]

{% end_section %}
