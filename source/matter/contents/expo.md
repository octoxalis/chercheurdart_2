---js
{
  layout:    'frame.njk',
  permalink: 'expo.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -1,
  title_s:    `Exposition`,
  subtitle_s: `Exposition temporaire`,
  abstract_s: `Exposition temporaire`,

  section_a:
  [
    `article`,
    ``,
    `expo`,
  ],

  include_a:
  [
    `expo`
  , `dialog_alert`
  ],

  script_a:
  [
    'Idb.min.js',
    'dom.min.js',
    'dialog_alert.min.js',
    'toolset.min.js',
    'expo.min.js',
  ],
  css_a:
  [
    'range.min.css',
    'dock.min.css',
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
‹exposition temporaire›
//



##1  {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

{% _wait "Chargement des images" %}
La durée de cette opération dépend de la taille et du nombre des images
{% end_wait %}

##2  Presentation

Exposition actuelle.


##2  Expositions précédentes


{% end_section %}
