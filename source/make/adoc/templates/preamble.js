const C_o = require( '../../data/C_o.js' )



module
  .exports =
  ({ node }) =>
  {
    const title_s =
      node
        .parent
          .document
            .getTitle()

    let chapter_s =
    `<div>\n`    //: open chapter content

    const header_n =
      node
        .level
      +
      1    //: h1: level 0

    let data_s =
      C_o.
        ADOC_MARKUP_b
      ?
        ` data-${C_o.ADOC_DATA_s}=${C_o.BLOCK_PREAMBLE_s}`
      :
        ''

    return (
      `<h${header_n}${data_s}>`
      + title_s
      + `</h${header_n}>\n`  //: \n is mandatory
      + chapter_s
      + node
          .getContent()    //: chapter content
    )
  }
