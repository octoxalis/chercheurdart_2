const C_o = require( '../data/C_o.js' )
const F_o = require( '../data/F_o.js' )
//?? const IOR_o = require('../lib/ior.js')




const CODES_o =
{
  section__s:    //== only open section tag
  (
    section_s
  ) =>
  `<section id="${F_o.slug__s( section_s )}">`
  ,




  end_section__s:    //=== only close section tag
  () =>    //--HTML
    `</div>\n`        //: first close last chapter div
    + `</section>\n`  //: \n is mandatory
  ,




  chapter__s:    //=== create an chapter header
  (
    chapter_s
  ) =>
  {
    let at_n = 0

    while
    (
      chapter_s.charAt( at_n ) === '#'
      &&
      at_n++ < chapter_s.length    //: skiped if no more '#', therefore no increment
    ) ;

    const name_s =
      chapter_s
        .slice( at_n )

    const slug_s =
      F_o
        .slug__s( name_s )
    
    let close_s = ''
    
    let label_s = name_s
    
    let input_s = ''
    
    if
    (
      at_n
      ===
      +C_o                       //: number cast
        .CHAPTER_TAG_s[1]        //: 2 (from h2)
    )
    {
      label_s =
        `<label for="${slug_s}" tabindex="-1">${name_s}</label>`

      close_s =
        '</div>\n'        //: first close last chapter div

      input_s =
        `<input id="${slug_s}" type="checkbox" />`  //: chapter always closed
    }

    return (  //--HTML
      close_s
      + `<h${at_n}>`
      + label_s
      + `</h${at_n}>\n`  //: \n is mandatory
      + input_s
      + `<div class="chapter">\n`    //: open chapter content
      
    )
  }
  ,



  
  ins__s:    //=== only set up insert block to be processed at template end
  (
    content_s,
    section_s
  ) =>  //--HTML
    `<ins data--="${section_s}">${content_s}</ins>`
  ,
}




module.exports =
  make_o =>
  {  
    for        //=== simple shortcodes
    (
      const code_s
      of
      [
        'section',
        'end_section',
        'chapter',
      ]
    )
    {
      make_o
        .addNunjucksShortcode
        (
          `${code_s}`,        //: simple shortcodes have no leading underscore
          arg_ =>
            CODES_o
              [ `${code_s}__s` ]
              (
                arg_
              )
        )
    }
    
    for        //=== paired shortcodes
    (
      code_s
      of
      [ 
        'ins',
      ]
    )
    {
      make_o
        .addPairedShortcode
        (
          `_${code_s}`,        //: paired shortcodes have a leading underscore
          (
            content_s,
            arg_
          ) =>
            CODES_o
              [ `${code_s}__s` ]
              (
                content_s,
                arg_
              )
        )
    }
  
  }
