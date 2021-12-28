---js
{
  layout:    'frame.njk',
  permalink: '1586-de_coster~new_york-sothebys~1625-young_woman--stack.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      7171,
  title_s:    `Adam de Coster`,
  subtitle_s: `Adam de Coster: Jeune femme tenant une quenouille`,
  abstract_s: `Jeune femme tenant une quenouille devant une chandelle&mdash;1625&nbsp;c.`,
  workID_s:   '1586-de_coster~new_york-sothebys~1625-young_woman',
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
  ],

  stat_a:
  [
    `stack`,
  ],

  script_a:
  [
    'stat.min.js',
    'drag.min.js',
  ],
  css_a:
  [
    'stat.min.css',
    'stack.min.css',
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],

  layer_a:      //: images
  [
    '1703-boucher~princeton-university~1748-arion'
  ],

  /*===------------------------
  __layer_a:
  [
    {
      id_s: '1703-boucher~princeton-university~1748-arion',
      size_n: 1.23,
      offset_a: [ 123, 321 ],    //: [ offsetX, offsetY ],
      step_n: 1234,    //: ms
    }
    ,
    //...
  ],

  __clip_a:
  [
    {
      top:   123,
      left:  123,
      width: 123,
      left:  123
    }
    ,
    //...
  ],
  ===*/

}
---
{% _section section_a[0] %}
[[=  YOUNG_WOMAN  ::
     [[₉  {{C_o.INS_DISPLAY_s}}  :: 1586-de_coster~new_york-sothebys~1625-young_woman ]]

//=== END DECLARATIONS ===//
//  TOPICS
‹Adam de Coster›
//



##1  {{title_s}}

||  YOUNG_WOMAN  ||




##2  Colorimétrie

<<  Présentation  ::  {{U_o.url_s}}{{workID_s}}.html  >>


Modification

{% end_section %}
