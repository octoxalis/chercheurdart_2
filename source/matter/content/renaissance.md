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
{% _adoc section_a[0] %}
= {{title_s}}

{{abstract_s}}.


== Nouvelle version du site

Insérons une ₍précision importante==ceci est une note₎ au milieu d'une phrase complète.

₍_Arion_==1703_boucher-princeton_university-1748_arion₎ peint par F. Boucher en 1750.


Et la ₍_Jeune femme_==1586_de₊coster-new₊york_sothebys-1625_young₊woman₎ de A. de Coster


== Références

Ref. 1: biblio entry

Ref. 2: work entry

{% end_adoc %}