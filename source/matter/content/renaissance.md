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
    `Article`,
  ],

  script_a:
  [
  ],

  css_a:
  [
  ],


}
---
{% _doc section_a[0] %}
= {{title_s}}

{{abstract_s}}.


== Nouvelle version du site


== Références

Ref. 1: biblio entry

Ref. 2: work entry

{% end_doc %}