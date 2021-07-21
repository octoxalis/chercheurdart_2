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

  chapter_a:
  [
    'Renaissance',
    'Nouvelle version du site',
    'Références',
  ],

  script_a:
  [
  ],

  css_a:
  [
  ],
}
---
[comment]: # (======================== Article ========================)
{% section section_a[0], 1234 %}{% _adoc %}
= Renaissance

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


== Nouvelle version du site

Insérons une note ins:text[note_s=ceci est une note] au milieu d'une phrase complète...


L'_Arion_ ins:img[url_s=1703_boucher-princeton_university-1748_arion] peint par F. Boucher en 1750.

//Et la _Jeune fille_ ins:img[url_s=1586_de~coster-new~york_sothebys-1625_young~woman] de A. de Coster


== Références

Ref. 1: biblio entry

Ref. 2: work entry

{% end_adoc %}{% end_section %}


[comment]: # (======================== Links ========================)
