---js
{
  layout:    'frame.njk',
  permalink: 'local--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      10245,
  title_s:    `Répartition`,
  subtitle_s: `image locale`,
  abstract_s: `Répartition chromatique d'image locale`,
  workID_s:   '2022-local~paris-local~2022-burst',
  widthHeight_s:  '0_0',
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
    'location.min.js',
    'stat.min.js',
    'dom.min.js',
  ],
  css_a:
  [
    'stat.min.css',
    'stat_burst.min.css',
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}

//=== END DECLARATIONS ===//
//  TOPICS
‹image locale›
//


##1  {{title_s}}

Image locale


##2  Colorimétrie

Répartition chromatique (échelle logarithmique)

{% end_section %}
