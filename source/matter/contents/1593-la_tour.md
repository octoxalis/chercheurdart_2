---js
{
  layout:    'frame.njk',
  permalink: '1593-la_tour.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      10,
  title_s:    `Georges de La Tour`,
  subtitle_s: `Georges de La Tour`,
  abstract_s: `Georges de La Tour&colon; oeuvres choisies`,
  //-- workID_s:   '1593-la_tour~new_york-met~1630-diseuse',
  //-- widthHeight_s:  '3970_3283',
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
    '2023-01-10T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Georges de La Tour›
//



##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

Georges de La Tour.




##2  Sélection d'oeuvres

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1593-la_tour~new_york-met~1630-diseuse ]]

{% end_section %}
