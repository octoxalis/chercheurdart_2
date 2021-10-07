---js
{
  layout:    'frame.njk',
  permalink: 'comment_ack.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,

  doc_n: 6145,
  title_s:    'Commentaire expédié',
  abstract_s: 'Commentaire en attente de modération',

  section_a:
  [
    `article`,
  ],

}
---
{% _doc section_a[0] %}
== Commentaire en attente

Votre commentaire a bien été expédié et nous vous en remercions.

Il est désormais en phase de **modération** avant d'être publié.


Pour revenir à l'article consulté, veuillez utiliser le bouton ```retour``` de votre navigateur.
{% end_doc %}
