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
    `<div class="chapter">\n`    //: open chapter content

    const level_n =
      node
        .level

    const header_n =
      level_n
      +
      1    //: h1: level 0

    return (
      `<h${header_n} data-adoc=${C_o.BLOCK_PREAMBLE_s}>`
      + title_s
      + `</h${header_n}>\n`  //: \n is mandatory
      + chapter_s
      + node
          .getContent()    //: chapter content
    )
  }
