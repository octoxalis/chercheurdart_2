const PRE_o  = require( '../lib/preprocessor.js' )
const ADOC_o = require( '../lib/adoc.js' )

//XX const C_o = require( '../data/C_o.js' )
const F_o = require( '../data/F_o.js' )
//?? const IOR_o = require('../lib/ior.js')




const CODES_o =
{
  doc__s:
  (
    content_s,
    section_s
  ) =>
  {
    const doc_s =
      PRE_o
        .ins__s( content_s )        //;console.log( doc_s )

    return (
      `<section id="${F_o.slug__s( section_s )}">`
      +
      ADOC_o
        .convert__s( doc_s )
      +
      `</div>\n`        //: first close last chapter div
      + 
      `</section>\n`  //: \n is mandatory
    )
  }
  ,
}




module.exports =
  make_o =>
  {
    for        //=== paired shortcodes
    (
      const code_s
      of
      [
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
