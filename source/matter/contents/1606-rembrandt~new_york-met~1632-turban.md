---js
{
  layout:    'frame.njk',
  permalink: '1606-rembrandt~new_york-met~1632-turban.html',
  tags:      [ 'collection' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      5125,
  title_s:    `Rembrandt`,
  subtitle_s: `Rembrandt: L'honne au turban`,
  abstract_s: `L'honne au turban&mdash;1632`,
  workID_s:   '1606-rembrandt~new_york-met~1632-turban',
  widthHeight_s:  '3084_3804',
  //... link_s:  'https://artmuseum.princeton.edu/collections/objects/437385',
  //... issue_n: -1,

  section_a:
  [
    `article`,
    `galerie`,
    `panorama`,
  ],

  script_a:
  [
    'dom.min.js',
    'panorama.min.js',
  ],
  css_a:
  [
  ],

  version_a:
  [
    '2022-12-19T15:00:00Z'
  ],

}
---
{% _section section_a[0] %}
// END DECLARATIONS //
//  TOPICS
‹Rembrandt›
//



##1  {{title_s}}

[[₉  {{C_o.INS_DISPLAY_s}} ::
     1606-rembrandt~new_york-met~1632-turban ]]

##2  Presentation

Metropolitan Museum.




##2  Colorimétrie

==
<<  {{C_o.NAV_LEGEND_o.burst.legend_s}}  ::  {{U_o.url_s}}{{workID_s}}--burst.html  >>
// <<  {{C_o.NAV_LEGEND_o.paint.legend_s}}  ::  {{U_o.url_s}}{{workID_s}}--paint.html  >>  //
// <<  {{C_o.NAV_LEGEND_o.match.legend_s}}  ::  {{U_o.url_s}}{{workID_s}}--match.html  >>  //
==

##2  Analyse


{% end_section %}
