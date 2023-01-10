---js
{
  layout:    'frame.njk',
  permalink: '1703-boucher.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      11,
  title_s:    `François Boucher`,
  subtitle_s: `François Boucher`,
  abstract_s: `François Boucher&colon; oeuvres choisies`,
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
‹François Boucher›
//



##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

{{title_s}}...

##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1703-boucher~princeton-university~1748-arion ]]

{% end_section %}
