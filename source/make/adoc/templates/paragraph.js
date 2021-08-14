const C_o = require( '../../data/C_o.js' )



module
  .exports =
  ({ node }) =>
  {
    let data_s = ''

    if
    (
      C_o.
        ADOC_MARKUP_b
    )
    {
      data_s =
        ` data-${C_o.ADOC_DATA_s}=${C_o.BLOCK_PARAGRAPH_s}`
    }

    return (
      `<p${data_s}>`
      + node
          .getContent()
      + `</p>`
    )
  }