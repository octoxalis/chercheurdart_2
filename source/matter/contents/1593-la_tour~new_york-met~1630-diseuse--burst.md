---js
{
  layout:    'frame.njk',
  permalink: '1593-la_tour~new_york-met~1630-diseuse--burst.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7172,
  title_s:    `Georges de La Tour`,
  subtitle_s: `Georges de La Tour: La Diseuse de bonne aventure`,
  abstract_s: `La Diseuse de bonne aventure&mdash;1630&nbsp;c.`,
  workID_s:   '1593-la_tour~new_york-met~1630-diseuse',
  widthHeight_s:  '3970_3283',
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
    'dom.min.js',
    'stat.min.js',
  ],
  css_a:
  [
    'stat.min.css',
    'stat_burst.min.css',
  ],

  version_a:
  [
    '2022-12-19T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
[[=  DISEUSE  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1593-la_tour~new_york-met~1630-diseuse ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Georges de La Tour›
//



##1  {{title_s}}

||  DISEUSE  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>

Répartition chromatique (échelle logarithmique)

{% end_section %}
