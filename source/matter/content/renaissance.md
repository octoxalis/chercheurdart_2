---js
{
  layout:    'frame.njk',
  permalink: 'renaissance.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
  title_s:    `Renaissance`,
  subtitle_s: `Un nouveau modèle pour Chercheur d'Art`,
  abstract_s: `Après un an d'absence, Chercheur d'Art revient sous une nouvelle forme`,

  section_a:
  [
    'Article',
    //--'Galerie',
  ],

  script_a:
  [
    'ior.min.js',
  ],

  css_a:
  [
    'lightbox.min.css',   //: uncomment to use lightbox
    //-'video.min.css',      //: uncomment to use video
    //-'print.min.css',      //: uncomment to use print
  ],
  
  chapter_a:
  [
    'Renaissance',
    'Nouvelle version du site',
    'Références',
  ]

}
---
[comment]: # (======================== Article ========================)
{% section section_a[0] %}


{% chapter '#' + chapter_a[0] %}

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


{% chapter '##' + chapter_a[1] %}

Insérons une note
{% _ins %}
ceci est une note
{% end_ins %}
au milieu d'une phrase complète...


L'_Arion_
{% _ins section_a[0] %}
! 1703_boucher-princeton_university-1748_arion
//---------\ Commentaire de l'oeuvre \ sur une seule ligne \ mais en plusieurs parties
//---------[ Index == index.html
{% end_ins %}
peint par F. Boucher en 1750.


Et la _Jeune fille_
{% _ins section_a[0] %}
! 1586_de~coster-new~york_sothebys-1625_young~woman
//---------\ Cette peinture est passée \ chez Sothebys à New York
//---------[ Index == index.html
{% end_ins %}
 de A. de Coster


{% chapter '##' + chapter_a[2] %}

Ref. 1: biblio entry

Ref. 2: work entry

{% end_section %}


[comment]: # (======================== Links ========================)

[a]: #Article
[b]: #Références
