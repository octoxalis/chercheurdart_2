---js
{
  layout:    `parts/body/iframe_match.njk`,
  permalink: `assets/parts/1586-de_coster~new_york-sothebys~1625-young_woman--match.html`,
  
  workID_s:   '1586-de_coster~new_york-sothebys~1625-young_woman',

  stat_s: 'match',

  node_a:
  [
    {                  //: node_a[0]
      top_n:    370,
      left_n:   550,
      width_n:  300,
      height_n: 200,

      link_a:
      [
        
        {                //: link_a[0]
          id_s:    '1703-boucher~princeton-university~1748-arion',
          coord_s: '968 468',    //: center point
          scale:   1.5,          //: stretch
        }
        ,
        //...
      ]
    }
    ,
    //...
  ],
}
---
{%  _flyer  1 %}
{{F_o.legend__s( node_a[0].link_a[0].id_s, false )}}
--
^^Commentaire^^ mis en **forme**.  ,,
<< Chercheur d'Art  ::  index.html >>
{% end_flyer %}

