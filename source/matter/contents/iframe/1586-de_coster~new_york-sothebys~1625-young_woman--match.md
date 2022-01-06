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

Rembrandt firmly belonged to the tradition of the “universal” artist, a designation well established in the Netherlands by the Dutch theorist Karel van Mander (1548–1606) for identifying great masters, such as Raphael (1483–1520) and Lucas van Leyden (1494–1533), who worked in a variety of media and depicted a broad range of subjects.2 However, from the very earliest years of his career, when he was still active in Leiden, Rembrandt redefined the essence of this concept by emphasizing, as well, the emotional and spiritual realms of the human experience in his art. ,,

<< Chercheur d'Art  ::  index.html >>
{% end_flyer %}


