---js
{
  layout:    'frame.njk',
  permalink: '1703_boucher-princeton_university-1748_arion.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
  title_s:    '1703_boucher-princeton_university-1748_arion',
  subtitle_s: `F. Boucher Arion 1748`,
  abstract_s: `F. Boucher Arion 1748`,

  section_a:
  [
    'Sommaire',
    'Article',
    'Références',
    //...
  ],

  script_a:
  [
    'ior.min.js',
  ],
  css_a:
  [
    //'lightbox.min.css',   //: uncomment to use lightbox
    //-'video.min.css',      //: uncomment to use video
    //-'print.min.css',      //: uncomment to use print
  ],
}
---
[comment]: # (======================== Sommaire ========================)
{% section section_a[0] %}

{% anchor "### Sommaire" %}

[Article][a]
[Références][b]

{% end_section %}




[comment]: # (======================== Article ========================)

{% section section_a[1] %}

{% anchor "### Colorimétrie" %}

+  [scan][0]
+  [burst][1]

{% anchor "### Composition" %}


{% end_section %}



[comment]: # (======================== Références ========================)

{#% section section_a[2] %}
{% end_section %#}




[comment]: # (======================== Links ========================)

[a]: #Article
[b]: #Références

[0]: 1703_boucher-princeton_university-1748_arion__scan.html
[1]: 1703_boucher-princeton_university-1748_arion__burst.html