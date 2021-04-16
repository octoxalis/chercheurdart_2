---js
{
  layout:    'frame.njk',
  permalink: 'proto.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
  title_s:    'proto',
  subtitle_s: `l'œil technologique de la peinture`,
  abstract_s: `Un autre regard sur la peinture des maîtres anciens`,

  section_a:
  [
    'Introduction',
    'Article',
    'Galerie',
    //...
  ],

  script_a:
  [
  ],
  css_a:
  [
    //-'slideshow.min.css',  //: uncomment to use slideshow
    //-'lightbox.min.css',   //: uncomment to use lightbox
    //-'video.min.css',      //: uncomment to use video
    //-'print.min.css',      //: uncomment to use print
  ],
}
---

[comment]: # (======================== Introduction ========================)
{% section section_a[0] %}

{% chapter "### Header title" %}

{% end_section %}




[comment]: # (======================== Article ========================)

{% section section_a[1] %}

{% end_section %}




[comment]: # (======================== Galerie ========================)

{% section section_a[2] %}

{% end_section %}




[comment]: # (======================== Links ========================)

[Go to][1]
[1]: #{{section_a[1]}}
