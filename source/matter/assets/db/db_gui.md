---js
{
  layout:    `assets/db/frame.njk`,
  permalink: `assets/db/db_gui.html`,
  tags:      [ 'db_gui' ],
  eleventyExcludeFromCollections: true,
  //--expires_n: 10,


  doc_n:      0,
  title_s:    'chercheurdart DB',
  subtitle_s: `Database`,
  abstract_s: `Database`,

  section_a:
  [
    `Artists`,
    `Collections`,
    `Works`,
  ],

  chapter_a:
  [
    `Add artist`,
    `Artists list`,
    `Add collection`,
    `Collections list`,
    `Add work`,
    `Works list`,
  ],

  script_a:
  [
  ],

  css_a:
  [
  ],

}
---
[comment]: # (======================== Avant-propos ========================)

{% section section_a[0] %}

{% chapter '##' + chapter_a[0] %}

{% chapter '##' + chapter_a[1] %}

{% end_section %}


{% section section_a[1] %}

{% chapter '##' + chapter_a[2] %}

{% chapter '##' + chapter_a[3] %}

{% end_section %}


{% section section_a[2] %}

{% chapter '##' + chapter_a[4] %}

{% chapter '##' + chapter_a[5] %}

{% end_section %}

[comment]: # (======================== Links ========================)
