const C_o = require( '../../data/C_o.js' )



module
  .exports =
  ({ node }) =>
    `<p data-adoc=${C_o.BLOCK_PARAGRAPH_s}>${node.getContent()}</p>`