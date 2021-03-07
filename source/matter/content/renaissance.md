---js
{
  layout:    'frame.njk',
  permalink: 'renaissance.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
  title_s:    'Renaissance',
  subtitle_s: `Un nouveau modèle pour Chercheur d'Art`,
  abstract_s: `Après un an d'absence, Chercheur d'Art revient sous une nouvelle forme`,

  section_a:
  [
    'Introduction',
    'Étude',
    //--'Références',
    //...
  ],

  script_a:
  [
    'ior.min.js',
  ],
  css_a:
  [
    'ior.min.css',

    //-'slideshow.min.css',  //: uncomment to use slideshow
    'lightbox.min.css',   //: uncomment to use lightbox
    //-'video.min.css',      //: uncomment to use video
    //-'print.min.css',      //: uncomment to use print
  ],
}
---
[comment]: # (======================== Introduction ========================)
{% section section_a[0] %}

{% anchor "### TITLE" %}

ANCHOR paragraphe with a link to [index page](index.html)

{% end_section %}




[comment]: # (======================== Étude ========================)

{% section section_a[1] %}

Insérons une note
{% _ins %}
le contenu de l'insertion
{% end_ins %}
au milieu d'une phrase complète dont la suite se poursuit...


L'_Arion_
{% _ins section_a[1] %}
! 1703_boucher-princeton_university-1748_arion
//---------\ Commentaire de l'oeuvre \ sur une seule ligne \ mais en plusieurs parties
//---------[ Index == index.html
{% end_ins %}
peint par F. Boucher en 1750.


Et la _Jeune fille_
{% _ins section_a[1] %}
! 1586_de~coster-new~york_sothebys-1625_young~woman
//---------\ Cette peinture est passée \ chez Sothebys à New York
//---------[ Index == index.html
{% end_ins %}
 de A. de Coster

{% end_section %}



[comment]: # (======================== Références ========================)

{#% section section_a[2] %}
{% end_section %#}




[comment]: # (======================== Links ========================)
