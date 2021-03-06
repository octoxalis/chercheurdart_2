module.exports = make_o =>
{
  let markdown_o =
    {
      html:        true,
      linkify:     true,
      typographer: true
    }

  make_o
    .setLibrary
    (
      'md',
      require( 'markdown-it' )( markdown_o )
    )

  make_o
    .setLibrary
    (
      'njk',
      require( 'nunjucks')
        .configure
        (
          make_o
            .matrixDir_s,
          {
            autoescape: false,  //: for CSS rules
            lstripBlocks: true,
            trimBlocks:true
          } 
        )
    )

}
