---js
{
  layout:    'frame.njk',
  permalink: 'proto.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      8191,
  title_s:    'proto',
  subtitle_s: `subtitle_s`,
  abstract_s: `abstract_s`,

  section_a:
  [
    'article',
  ],

  script_a:
  [
  ],
  
  css_a:
  [
  ],

  version_a:
  [
    '2023-01-12T18:00:00Z'
  ],
}
---
{% _doc section_a[0] %}
//LINKS

// TOPICS
////
‹topic›
////
//========================================
= {{title_s}}

pass:[{{abstract_s}}]
₍₀ 
  Versions
  pass:[{{F_o.versionList__s(version_a)}}]₎
//---------------------------------------
== Article

{% end_doc %}