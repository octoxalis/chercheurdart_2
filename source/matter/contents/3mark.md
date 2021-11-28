---js
{
  layout:    'frame.njk',
  permalink: '3mark.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  // - expires_n: 10,

  doc_n:      10241,
  title_s:    `3mark cheatsheet`,
  subtitle_s: `3mark markup used in chercheurd.art`,
  abstract_s: `3mark reference for chercheurd.art`,
  //issue_n:    -1,

  section_a:
  [
    `article`,
    //XX `galerie`,
  ],

  script_a:
  [
  ],

  css_a:
  [
    '3mark.css'
  ],

  version_a:
  [
    '2021-11-23T08:00:00Z',
  ],
  
}
---
{% _section section_a[0] %}
###1 3Mark

|||dec   VERSION:::
!!!ins₀   {{abstract_s}} :::
{{F_o.versionList__s(version_a)}} !!! |||

=== VERSION ===



{% end_section %}
