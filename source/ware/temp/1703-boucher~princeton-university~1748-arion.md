---js
{
  layout:    'frame.njk',
  permalink: '1703-boucher~princeton-university~1748-arion.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      5121,
  title_s:    `Arion par François Boucher (1748-50)`,
  subtitle_s: `F. Boucher Arion (1748-50)`,
  abstract_s: `Un décor pour La Muette`,
  workID_s:   `1703-boucher~princeton-university~1748-arion`,
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  stat_a:
  [
    'burst',
    'aster',
    'paint',
  ],

  script_a:
  [
    'stat.min.js',
  ],
  css_a:
  [
    'stat.min.css',
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],
  
  //=== IMAGES
  '1748_arion':
`₍₉
Arion
1703-boucher~princeton-university~1748-arion₎`
  ,
  
}

---
{% _doc section_a[0] %}
//LINKS
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
== Presentation

{{1748_arion}} fait partie d'un cycle décoratif conçu pour le château de La Muette.

== Colorimétrie

L'analyse colorimétrique...

{% end_doc %}
