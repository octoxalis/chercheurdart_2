const FS_o  = require( 'fs-extra' )

const PREP_o = require( '../lib/prep.js' )
const ADOC_o = require( '../lib/adoc.js' )
const C_o    = require( '../data/C_o.js' )



const CODES_o =
{
  doc__s:    //: asciidoc section
  (
    content_s,
    section_s
  ) =>
  {
    //--let doc_s =
    //--  PREP_o
    //--    .convert__s( content_s )
    //--
    //--doc_s =
    //--  `<section id="${section_s}">`
    //--  + ADOC_o
    //--      .convert__s( doc_s )
    //--
    //--doc_s +=
    //--`</div>\n`                 //: first close last chapter div
    //--  + C_o.TOPICS_REPLACE_s      //: to be replaced by topics to documents list
    //--  + C_o.COMMENTS_REPLACE_s     //: to be replaced by comment part, if issue_n is defined
    //--  + `</section>\n`         //: \n is mandatory
    let doc_s =
      `<section id="${section_s}">`
      + `<div>`
      + PREP_o
          .convert__s( content_s )
      +
        `</div>\n`                 //: first close last chapter div
          //-- + C_o.TOPICS_REPLACE_s      //: to be replaced by topics to documents list
          //-- + C_o.COMMENTS_REPLACE_s     //: to be replaced by comment part, if issue_n is defined
          + `</section>\n`         //: \n is mandatory
  
    return doc_s
  }
  ,
  }




module.exports =
  make_o =>
  {
    for
    (
      const code_s
      of
      [        //=== paired shortcodes
        'doc',
      ]
    )
    {
      make_o
        .addPairedShortcode
        (
          `_${code_s}`,        //: paired shortcodes have a leading underscore
          (
            content_s,
            ...arg_
          ) =>
            CODES_o
              [ `${code_s}__s` ]
              (
                content_s,
                ...arg_
              )
        )
    }
  
  }
