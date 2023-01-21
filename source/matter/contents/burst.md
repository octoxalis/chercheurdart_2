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
    `galerie`,
  ],

  stat_s: `burst`,

  script_a:
  [
    'Idb.min.js',
    'dom.min.js',
    'stat.min.js',
  ],
  
  css_a:
  [
    'stat.min.css',
    'dock.min.css',
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
‹répartition chromatique›
‹colorimétrie›
//


##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]

##2  Presentation

##2  Colorimétrie

Répartition chromatique (échelle logarithmique)

{% end_section %}
