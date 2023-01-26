---js
{
  layout:    'frame.njk',
  permalink: 'reserve_nord.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -1,
  title_s:    `Réserves`,
  subtitle_s: `Peintres du Nord`,
  abstract_s: `Réserves`,

  school_s: `du Nord`,
  reserve_s:  'nord',
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
‹Réserves Nord›
//



##1  {{title_s}}


##2  Presentation

Cette page regroupe une sélection d'oeuvres des Écoles du Nord: Hollande, Flandres, Allemagne, etc.

Cette sélection compte actuellement **{{capacity_n}}** images.

##2  Procédure

Dans la section Réserve, sélectionnez le cartel de votre choix pour visualiser son image et, éventiuellement, aux outils d'analyse colorimétrique.

##2  Autres réserves

==
<< École française  ::  reserve_france.html >>
<< École du Sud  ::  reserve_sud.html >>
==

{% end_section %}
