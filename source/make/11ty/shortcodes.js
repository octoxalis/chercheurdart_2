const MARK_o =
  require( '../lib/2mark.js' )

const MARK_INS_o =
  require( '../lib/2mark-ins.js' )
  
const MARK_HEAD_o =
  require( '../lib/2mark-header.js' )

const FLY_o =
  require( '../lib/flyer.js' )
  


const CODES_o =
{
  section__s:    //: 2mark section
  (
    source_s,
    section_s
  ) =>
  {
    MARK_HEAD_o      //: extension at section level
      .extend__v()
      
    MARK_INS_o
      .extend__v()

    let processed_s =
      `<section id="${section_s}">`
      + MARK_o
          .process__s( source_s )
      + `</div>\n`                 //: first close last chapter div
        //... + C_o.TOPICS_REPLACE_s      //: to be replaced by topics to documents list
        //... + C_o.COMMENTS_REPLACE_s     //: to be replaced by comment part, if issue_n is defined
      + `</section>\n`         //: \n is mandatory

    return processed_s
  }
  ,


  flyer__s:
  (
    source_s,
    key_s
  ) =>
  {
    FLY_o
      .flyer__v
      (
        key_s,
        source_s
      )
  }

}




module.exports =
  make_o =>
  {
    for        //: paired shortcodes
    (
      let code_s
      of
      [
        'section',
        'flyer'
      ]
    )
    {
      make_o
        .addPairedShortcode
        (
          `_${code_s}`,        //: paired shortcodes have a leading underscore
          (
            source_s,
            ...arg_
          ) =>
            CODES_o
              [ `${code_s}__s` ]
              (
                source_s,
                ...arg_
              )
        )
    }
  
  }
