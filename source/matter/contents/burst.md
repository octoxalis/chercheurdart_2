---js
{
  layout:    'frame.njk',
  permalink: 'burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      10245,
  title_s:    `Analyse colorimétrique`,
  subtitle_s: `Répartition chromatique`,
  abstract_s: `Répartition chromatique`,
  //... issue_n: -1,

  section_a:
  [
    `article`,
    ``,
  ],

  stat_s: `burst`,

  include_a:
  [
    `dialog_alert`
  ],

  script_a:
  [
    'Idb.min.js',
    'dom.min.js',
    'dialog_alert.min.js',
    'stat.min.js',
  ],
  
  css_a:
  [
    'stat.min.css',
    'range.min.css',
    'dock.min.css',
    'dialog_alert.min.css',
    'stat_burst.min.css',
  ],

  version_a:
  [
    '2023-01-12T18:00:00Z'
  ],

}
---
{% _section section_a[0] %}

//=== END DECLARATIONS ===//
//  TOPICS
Spectre chromatique›
‹colorimétrie›
//


##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

{% _wait "Analyse de l'image" %}
Cette opération ne prend que quelques secondes
{% end_wait %}

##2  Presentation

##2  Colorimétrie

Spectre chromatique

==
graphique linéaire
graphique radial
==




{% end_section %}
