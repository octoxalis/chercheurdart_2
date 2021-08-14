const C_o = require( '../../data/C_o.js' )
const F_o = require( '../../data/F_o.js' )



module
  .exports =
  ({ node }) =>
  {
    let title_s =
      node
        .title

    const slug_s =
      F_o
        .slug__s( title_s )

    let chapter_s = ''
  
    let close_s = ''
  
    let input_s = ''

    const level_n =
      node
        .level

    const header_n =
      level_n
      +
      1    //: h1: level 0

    if
    (
      header_n
      ===
      +C_o                       //: number cast
        .CHAPTER_TAG_s[1]        //: 2 (from h2)
    )
    {
      close_s =
      '</div>\n'        //: first close previous chapter div
      + `<hr/>`

      title_s =
        `<label for="${slug_s}" tabindex="-1">${title_s}</label>`

      //XX input_s =
      //XX   `<input id="${slug_s}" type="checkbox" checked/>`  //: chapter always open

      chapter_s =
        `<div>\n`    //: open chapter content
    }

    let data_s =
      C_o.
        ADOC_MARKUP_b
      ?
        ` data-${C_o.ADOC_DATA_s}=${C_o.BLOCK_SECTION_s}_${level_n}`
      :
        ''



    return (
      close_s
      + `<h${header_n}${data_s}>`
      + title_s
      + `</h${header_n}>\n`  //: \n is mandatory
      //XX + input_s
      + chapter_s
      + node
          .getContent()    //: chapter content
    )
  }
