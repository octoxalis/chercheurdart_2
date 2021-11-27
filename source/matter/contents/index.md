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
//LINKS
:site_tech: pass:[<a href=site_tech.html>Technologie du site</a>]
:guide: pass:[<a href=ui_guide.html>Guide du visiteur</a>]
:Brave: pass:[<a href=https://brave.com><bold>Brave</bold></a>]
:11ty: https://www.11ty.dev[Eleventy]

//INCLUDES
:index_toc: {{C_o.CONTENT_PARTS_DIR_s}}index_toc.html

// TOPICS
////
‹François Boucher›
////
//========================================
= {{title_s}}

₍₀
{{abstract_s}}
{{F_o.versionList__s(version_a)}}
₎

//---------------------------------------
== Contenu en ligne
include::{index_toc}[]

== Avertissement

 **{{A_o.NAME_s}}** est délibéremment 
₍₀
expérimental
Certains de ses éléments, et **en tout premier lieu les images**, ne sont accessibles qu'en utilisant la version la plus récente d'un navigateur Internet tel que, ou compatible avec:
- **Google Chrome** (je recommande tout particulièrement {Brave}, pour des raisons de confidentialité)
- **Mozilla Firefox**.

La page {site_tech} donne un aperçu de son infrastructure
La page {guide} détaille son fonctionnement
₎
!

== Confidentialité

 **{{A_o.NAME_s}}** respecte l'
₍₀
anonymité
nul **cookie**,
nul **enregistrement** de votre adresse Internet Protocol,
nul **traçage** de vos interactions sur chaque page,
nulle **information personelle** transmise à de tierces parties:
&nbsp;
 **nous ne moneyons pas votre profil comportemental** &hellip;
₎
de votre visite!

== Colophon

 **{{A_o.NAME_s}}** est généré avec la complicité de {11ty}

{% end_section %}
