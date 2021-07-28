const ADOC_o = require( 'asciidoctor' )()
const registry_o = ADOC_o.Extensions.create()
require('../adoc/ins-inline-macro-processor.js')(registry_o)



const C_o = require( '../data/C_o.js' )
const F_o = require( '../data/F_o.js' )
//?? const IOR_o = require('../lib/ior.js')
const REX_o = require( '../lib/regex.js' )


const process_ins__s =
  content_s =>
  {
    for
    (
      const match_a
      of
      [ ...
        content_s
          .matchAll
          (
            REX_o
              .new__re( 'gms' )
                `${C_o.INS_OPEN_s}
                ([^${C_o.INS_SEPARATOR_s}]+?)   //: note caller
                ${C_o.INS_SEPARATOR_s}
                ([^${C_o.INS_CLOSE_s}]+?)       //: note callee
                ${C_o.INS_CLOSE_s}`
          )
      ]
    )
    {
      const src_s =
        match_a[1]
          .charAt( 0 )
          ===
          '_'    //: IMG caller MUST begin and end by an underscore (i.e. emphasis)
          ?
            'IMG'
          :
            'TXT'

      content_s =
        content_s
          .replace
          (
            match_a[0],
            `${match_a[1]} ins:${src_s}[ins_s="${match_a[2]}"]`
          )
    }

    // ;console.log( content_s )
    return content_s
  }



const CODES_o =
{
  adoc__s:    //=== Embed AsciiDoc
  (
    content_s,
    section_s
  ) =>
    `<section id="${F_o.slug__s( section_s )}">`
    +
    ADOC_o
      .convert
      (
        process_ins__s( content_s ),
        {
          safe: 'safe',
          backend: 'html5',
          template_dirs: [ C_o.ADOC_TEMPLATES_s ],
          extension_registry: registry_o
        }
      )
    +
    `</div>\n`        //: first close last chapter div
    + 
    `</section>\n`  //: \n is mandatory
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
        'adoc',
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
