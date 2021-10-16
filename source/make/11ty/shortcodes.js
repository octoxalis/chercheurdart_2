const FS_o  = require( 'fs-extra' )

const PREP_o = require( '../lib/prep.js' )
const ADOC_o = require( '../lib/adoc.js' )
const F_o    = require( '../data/F_o.js' )
const C_o    = require( '../data/C_o.js' )



const CODES_o =
{
  doc__s:    //: asciidoc section
  (
    content_s,
    section_s,
    section_n
  ) =>
  {
    content_s =
      PREP_o
        .ins__s( content_s )

    let output_s =
      `<section id="${section_s}">`
      + ADOC_o
          .convert__s( content_s )

    switch
    (
      section_n
    )
    {
      case 1:                    //: section[1]
        output_s +=
          FS_o
            .readFileSync
            (
              `${C_o.INCLUDES_PATH_s}/parts/body/stats.html`,
              'utf8',
              'r'
            )

        break
    
      default:                    //: section[0]
        output_s +=
        `</div>\n`                //: first close last chapter div
          + C_o.TOPICS_TAG_s      //: to be replaced by topics to documents list
          + C_o.COMMENT_TAG_s     //: to be replaced by comment part, if issue_n is defined

        break
    }

    output_s +=
      `</section>\n`       //: \n is mandatory

    return output_s
  }
  ,



  tab__s:    //: asciidoc included table
  (
    title_s
  ) =>
    `pass:[<${C_o.TABLE_TAG_s} data-ins=${C_o.INS_PRINCIP_s} data-spec=${C_o.INS_TAB_s}>]`
    + ` ${title_s}`
    + ` pass:[</${C_o.TABLE_TAG_s}>]`
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
        'tab'
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
