---js
{
  layout:    'frame.njk',
  permalink: 'tuto_index.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      3072,
  title_s:    `Chercheur d'art`,
  subtitle_s: `Mode d'emploi général`,
  abstract_s: `Comprendre et utiliser le site`,
  //... issue_n: -1,

  section_a:
  [
    `article`,
  ],

  script_a:
  [
  ],
  css_a:
  [
  ],

  version_a:
  [
    '2022-11-21T12:00:00Z'
  ],

}
---
{% _section section_a[0] %}
##1 {{A_o.NAME_s}}

##2 Objectif


{% end_section %}
