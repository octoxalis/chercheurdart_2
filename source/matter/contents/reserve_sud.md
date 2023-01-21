---js
{
  layout:    'frame.njk',
  permalink: 'reserve_sud.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -1,
  title_s:    `Réserves`,
  subtitle_s: `Réserves`,
  abstract_s: `Réserves`,

  school_s: `du Sud`,
  reserve_s:  'sud',
  capacity_n: '__capacity__',

  version_a:
  [
    `2023-01-12T18:00:00Z`
  ],

  section_a:
  [
    `article`,
    `galerie`,
    `reserve`,
  ],

  include_a:
  [
    `reserve`
  , `dialog_alert`
  ],

  script_a:
  [
    'Idb.min.js',
    'dom.min.js',
    'drag.min.js',
    'dialog_alert.min.js',
    'reserve.min.js',
  ],

  css_a:
  [
    'reserve.min.css'
  , 'dialog_alert.min.css',
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Réserves Sud›
//



##1  {{title_s}}


##2  Presentation

Cette page regroupe une sélection d'oeuvres des Écoles du Sud: Italie, Espagne, etc.

Cette sélection compte actuellement **{{capacity_n}}** images.

##2  Procédure

Dans la section Réserve, sélectionnez le cartel de votre choix pour visualiser son image et, éventiuellement, aux outils d'analyse colorimétrique.

##2  Autres réserves

==
<< École française  ::  reserve_france.html >>
<< École du Nord  ::  reserve_nord.html >>
==

{% end_section %}
