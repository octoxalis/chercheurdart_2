---js
{
  layout:    `parts/body/match_canvas.njk`,
  permalink: `assets/parts/1586-de_coster~new_york-sothebys~1625-young_woman--match.html`,

  stat_s: 'match',

  node_a:
  [
    {                 //: node_o  //: id_s = `${top_n}_${left_n}_${width_n}_${height_n}`
      top_n:    370,
      left_n:   550,
      width_n:  300,  //: right --> var(--width_n)
      height_n: 200,  //: bottom
                      //: inset( var(--top) var(--right) var(--bottom) var(--left) )
      link_a:
      [
        {             //: link_o
          id_s: '1703-boucher~princeton-university~1748-arion',
          x_n:   0,
          y_n:   0,
          scale: 1,
        },
        //...
      ]
    }
    ,
  ],

}
---
