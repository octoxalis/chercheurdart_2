---js
{
  layout:    'frame.njk',
  permalink: 'index.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //--expires_n: 10,


  doc_n:      0,
  title_s:    'chercheurdart',
  subtitle_s: `l'œil technologique de la peinture`,
  abstract_s: `Un autre regard sur la peinture des maîtres anciens`,

  section_a:
  [
    `Collection`,
    `Avant-propos`,
  ],

  script_a:
  [
  ],
  css_a:
  [
  ],

}
---
[comment]: # (======================== Collection ========================)

{% section section_a[0] %}


[Renaissance][0]
[F. Boucher Arion 1748][1]


<footer>

+    {{A_o.NAME_s}} est construit avec le générateur de site statique  {{U_o.E11TY_s}}

</footer>

{% end_section %}

[comment]: # (======================== Avant-propos ========================)

{% section section_a[1] %}

Ce site étant délibéremment expérimental, tant par sa forme que par son contenu, certains de ses éléments, et en tout premier lieu les images, ne sont accessibles qu'en utilisant les navigateurs Internet Google Chrome ou Mozilla Firefox dans leurs versions les plus récentes.

En effet, toutes les images du site sont au format AVIF, une technique d'encodage des images qui permet de réduire de façon très significative la taille de leurs fichiers numériques et, par voie de conséquence, le temps nécessaire à leur chargement.


{% end_section %}

[comment]: # (======================== Links ========================)

{{U_o.E11TY_R_s}}

[0]: renaissance.html#Introduction
[1]: 1703_boucher-princeton_university-1748_arion.html#Introduction