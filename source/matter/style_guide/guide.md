---js
{
  layout:    'frame.njk',
  permalink: '_style_guide.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: true,
  //-- expires_n: 10,

  doc_n:      1000,
  title_s:    'body',
  subtitle_s: 'body',
  abstract_s: 'body',

  section_a:
  [
    'Étude'
  ],

  script_a:
  [
    'ior.min.js'
  ],
  css_a:
  [
    'lightbox.min.css'
  ],
}
---
[comment]: # (======================== Étude ========================)

{% section section_a[0] %}


{% anchor "### H3" %}


{% anchor "#### H4" %}


{% anchor "##### H5" %}


[Link][0]

+ List_0
  + Sublist_0

Text
{% _ins %}
text insertion
{% end_ins %}

Image
{% _ins section_a[0] %}
! 1703_boucher-princeton_university-1748_arion
{% end_ins %}

{% end_section %}


[comment]: # (======================== Links ========================)
[0]: index.html
