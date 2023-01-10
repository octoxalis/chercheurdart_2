---js
{
  layout:    'frame.njk',
  permalink: '1599-velazquez.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      14,
  title_s:    `Velázquez`,
  subtitle_s: `Velázquez`,
  abstract_s: `Velázquez`,
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
‹Velázquez›
//


##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1599-velazquez~madrid-prado~1628-borrachos ]]

{% end_section %}
