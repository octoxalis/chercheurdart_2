const C_o = require( './make/data/C_o.js' )




const MAKE_o =
{
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine:     'njk',
  dataTemplateEngine:     'njk',
  templateFormats:        [ 'njk', 'md' ],
  passthroughFileCopy:    true,
  pathPrefix:             '/',
  dir:
    {
      input:    '.',              //: build from source dir
      output:   C_o.SITE_PATH_s,
      data:     C_o.DATA_PATH_s,
      includes: C_o.INCLUDES_PATH_s,
    },

  tag_a:    //: to create collections
    [
      {
        sort_f: 'sortByDoc__a'
      },
    ],
  static_o:    //: static files
    {
      "ware/static/assets": "assets"
    },
  dirs_o:
    {
      makeDir_s:  C_o.MAKE_DIR_s,
      contentPartsDir_s: C_o.CONTENT_PARTS_PATH_s,
    }
}




module.exports =
  make_o =>
  {
    make_o.tag_a =
      MAKE_o
        .tag_a
  
    make_o.matrixDir_s =
      MAKE_o
        .dir
          .includes
  
    make_o.dirs_o =
      MAKE_o
        .dirs_o
        
    make_o.dir =
      MAKE_o
        .dir
        
    make_o
      .addPassthroughCopy
      (
        MAKE_o
          .static_o
      )
  
    for
    (
      make_s
      of
      [
        'libraries',
        'shortcodes',
        'filters',
        'collections'
      ]
    )
    {
      require
      (
        `./${MAKE_o.dirs_o.makeDir_s}${make_s}.js`
      )
      ( make_o )
    }
  
    return MAKE_o    // : return the configuration object for further customization
  }




;console.log( `Init 11ty in current dir: ${__dirname}` )
