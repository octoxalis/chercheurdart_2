const C_o = require( '../../data/C_o.js' )



module
  .exports =
  ({ node }) =>
    `<p data-${C_o.ADOC_DATA_s}=${C_o.BLOCK_PARAGRAPH_s}>${node.getContent()}</p>`