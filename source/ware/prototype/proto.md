---js
{
  layout:    'frame.njk',
  permalink: 'proto.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
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
}
---{% _doc section_a[0] %}
= {{title_s}}

{{abstract_s}}

{% end_doc %}