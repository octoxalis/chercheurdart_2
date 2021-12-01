---js
{
  layout:    'frame.njk',
  permalink: 'comment_ack.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,

  doc_n: -1,    //: NO_TOPIC_n
  title_s:    `Commentaire expédié`,
  subtitle_s: `Commentaire en attente de modération`,

  section_a:
  [
    `article`,
  ],

}
---
{% _section section_a[0] %}
##2  Commentaire en attente

Votre commentaire a bien été expédié et nous vous en remercions.

Il est désormais en phase de **modération** avant d'être publié.


Pour revenir à l'article consulté, veuillez utiliser le bouton ```retour``` de votre navigateur.
{% end_section %}
