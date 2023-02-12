---js
{
  layout:    'frame.njk',
  permalink: 'index.html',
  tags:      [ 'index' ],
  eleventyExcludeFromCollections: false,
  //--expires_n: 10,


  doc_n:      0,
  title_s:    `Chercheur d'art`,
  subtitle_s: `L'œil technologique de la peinture`,
  abstract_s: `Un autre regard sur la peinture des maîtres anciens`,

  section_a:
  [
    `article`,
  ],

  include_a:
  [
    //-- `dialog_alert`
  ],

  script_a:      //!!! no backtick !!! //
  [
    //:TEST 'idecompress.min.js',
    'Idb.min.js',
    'dom.min.js',
    //-- 'dialog_alert.min.js',
  ],

  css_a:
  [
    'dock.min.css',
    //-- 'dialog_alert.min.css',
  ],

  version_a:
  [
    '2023-01-12T18:00:00Z'
  ],
}
---
{% _section section_a[0] %}
//  INCLUDES  //
[[+  INDEX_TOC  ::
     {{C_o.CONTENT_PARTS_DIR_s}}index_toc.html  ]]

//  LINKS  //
[[=  NORD  ::
     <<  Peintres du Nord  ::  collection_nord.html  >>  ]]

[[=  FRANCE  ::
     <<  Peintres de France  ::  collection_france.html  >>  ]]

[[=  SUD  ::
     <<  Peintres du Sud  ::  collection_sud.html  >>  ]]

[[=  RESERVE  ::
     <<  Dans les réserves  ::  reserve.html  >>  ]]

[[=  EXPO  ::
     <<  Sur les cimaises  ::  expo.html  >>  ]]

[[=  SITE_TECH  ::
     <<  Technologie du site  ::  site_tech.html  >>  ]]

[[=  GUIDE  ::
     <<  Guide du visiteur  ::  ui_guide.html  >>  ]]

[[=  BRAVE  ::
     <<  **Brave**  ::  https://brave.com  >>  ]]

[[=  11TY  ::
     <<  **Eleventy**  ::  https://www.11ty.dev  >>  ]]

//=== END DECLARATIONS ===//

//  TOPICS
//




##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]




##2 Collection

||  FRANCE  ||

||  NORD  ||

||  SUD  ||




##2 Réserves

||  RESERVE  ||




##2 Exposition

||  EXPO  ||




##2 Écrits
||+  INDEX_TOC  ||




##2 Avertissement

 **{{A_o.NAME_s}}** est délibéremment 
[[₀  expérimental  ::
     Certains de ses éléments, et **en tout premier lieu les images**, ne sont accessibles qu'en utilisant la version la plus récente d'un navigateur Internet tel que, ou compatible avec:
     - **Google Chrome** (de préférence ||  BRAVE  ||, pour des raisons de confidentialité)
//
      - **Mozilla Firefox**.
//
     La page ||  SITE_TECH  || donne un aperçu de son infrastructure
     La page ||  GUIDE  || détaille son fonctionnement  ]]




##2 Confidentialité

 **{{A_o.NAME_s}}** respecte l'
[[₀  anonymité  ::
     aucun **cookie**,
     aucun **enregistrement** de votre adresse Internet Protocol,
     aucun **traçage** de vos interactions,
     aucune **information personelle** transmise à de tierces parties:  ,,
    votre **profil comportemental** ne fait pas l'objet d'une monétisation subreptice &hellip;  ]]
de votre visite!




##2 Colophon

 **{{A_o.NAME_s}}** est généré avec la complicité de ||  11TY  ||

{% end_section %}
