---js
{
  layout:    'frame.njk',
  permalink: 'expo.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      5129,
  title_s:    `Exposition`,
  subtitle_s: `Exposition temporaire`,
  abstract_s: `Collection personnelle`,

  section_a:
  [
    `article`,
    `galerie`,
    `expo`,
  ],

  dialog_alert_b: true,

  script_a:
  [
    'Idb.min.js',
    'location.min.js',
    'dom.min.js',
    'dialog_alert.min.js',
    'expo.min.js',
  ],
  css_a:
  [
    'dialog_alert.min.css',
  ],

  version_a:
  [
    '2022-12-23T15:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
Exposition temporaire›
//



##1  {{title_s}}


##2  Presentation

Exposition présente.


##2  Expositions précédentes



{% end_section %}
