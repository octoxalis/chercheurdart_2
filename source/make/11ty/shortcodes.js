const PREP_o = require( '../lib/prep.js' )
const ADOC_o = require( '../lib/adoc.js' )
const F_o    = require( '../data/F_o.js' )




const CODES_o =
{
  doc__s:
  (
    content_s,
    section_s
  ) =>
  {
    content_s =
      PREP_o
        .ins__s( content_s )

    return (
      `<section id="${section_s}">`
      +
      ADOC_o
        .convert__s( content_s )
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
