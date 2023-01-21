---js
{
  layout:    'frame.njk',
  permalink: 'reserve.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      -1,
  title_s:    `Réserves`,
  subtitle_s: `Réserves`,
  abstract_s: `Réserves`,

  version_a:
  [
    `2023-01-12T18:00:00Z`
  ],

  section_a:
  [
    `article`,
  ],

  include_a:
  [
  ],

  script_a:
  [
    'Idb.min.js'
  , 'dom.min.js'
  ],

  css_a:
  [
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Réserves›
//



##1  {{title_s}}


##2  Presentation

Les réserves présentent les images en libre accès provenant des grandes
[[₁  institutions muséales internationales.  ::
     << Rijks museum  ::  https://www.rijksmuseum.nl/fr/visitez >>
     << Metropolitan Museum  ::  https://www.metmuseum.org/ >>
     << Museo del Prado  ::  https://www.museodelprado.es/ >>
     etc.  ]]

Ces images sont réparties en trois régions correspondant à la classification classique d'écoles:
==
<< française  ::  reserve_france.html >>
<< du Nord  ::  reserve_nord.html >>
<< du Sud  ::  reserve_sud.html >>
==

{% end_section %}
