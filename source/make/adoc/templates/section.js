const C_o = require( '../../data/C_o.js' )



module
  .exports =
  ({ node }) =>
  {
    let title_s =
      node
        .title

    let chapter_s = ''
  
    let close_s = ''
  
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

      //XX title_s =
      //XX   `<label>${title_s}</label>`

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
      + chapter_s
      + node
          .getContent()    //: chapter content
    )
  }
