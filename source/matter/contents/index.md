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

  script_a:
  [
    //:TEST 'idecompress.min.js',
    'Idb.min.js',
    'location.min.js',
  ],

  css_a:
  [
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],
}
---
{% _section section_a[0] %}
//  INCLUDES  //
[[+  INDEX_TOC  ::
     {{C_o.CONTENT_PARTS_DIR_s}}index_toc.html  ]]

//  LINKS  //
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
‹François Boucher›
//




##1 {{title_s}}

[[₀  {{abstract_s}}  ::
     {{F_o.versionList__s(version_a)}}  ]]




##2 Contenu en ligne
||+  INDEX_TOC  ||


##2 Exposition

||  EXPO  ||

##2 Avertissement

 **{{A_o.NAME_s}}** est délibéremment 
[[₀  expérimental  ::
     Certains de ses éléments, et **en tout premier lieu les images**, ne sont accessibles qu'en utilisant la version la plus récente d'un navigateur Internet tel que, ou compatible avec:
     - **Google Chrome** (de préférence ||  BRAVE  ||, pour des raisons de confidentialité)
     - **Mozilla Firefox**.
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
