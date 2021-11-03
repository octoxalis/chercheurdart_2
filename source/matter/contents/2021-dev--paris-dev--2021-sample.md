---js
{
  layout:    'frame.njk',
  permalink: '2021-dev--paris-dev--2021-sample.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1025,
  title_s:    `A color sample`,
  subtitle_s: `Dev sample`,
  abstract_s: `A sample image`,
  workID_s:   `2021-dev--paris-dev--2021-sample`,
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  stat_a:
  [
    'burst',
    'aster',
    'paint',
  ],

  script_a:
  [
    'stat.min.js',
  ],
  css_a:
  [
    'stat.min.css',
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],
  
  //=== IMAGES
  '2021_sample':
      `₍₉ An image sample
      2021-dev--paris-dev--2021-sample₎`
  ,
  
}

---
{% _doc section_a[0] %}
//LINKS
// TOPICS
////
////
//========================================
= {{title_s}}

₍₀ {{abstract_s}}
  {{F_o.versionList__s(version_a)}}₎

//---------------------------------------
== Presentation

{{2021_sample}}

{% end_doc %}
