const C_o = require( '../data/C_o.js' )
const F_o = require( '../data/F_o.js' )
const IOR_o = require('../lib/ior.js')




const CODES_o =
{
  section__s:    //== only open section tag
  (
    section_s
  ) =>
  {
    const slug_s =
      F_o
        .slug__s( section_s )

    return (    //--HTML
      `<section id="${section_s}">`
      +
      `<h2>${section_s}<a name="${slug_s}"></a></h2><hr/>\n`  //: \n is mandatory
    )
  }
  ,




  end_section__s:    //=== only close section tag
  () =>    //--HTML
    `</section>\n`  //: \n is mandatory
  ,




  anchor__s:    //=== create an anchor header
  (
    anchor_s
  ) =>
  {
    let at_n = 0

    while
    (
      anchor_s.charAt( at_n ) === '#'
      &&
      at_n++ < anchor_s.length    //: skiped if no more '#', therefore no increment
    ) ;

    const name_s =
      anchor_s
        .slice( at_n )

    const slug_s =
      F_o
        .slug__s( name_s )

    return (  //--HTML
      `<h${at_n}>${name_s}`
      +
      `<a name="${slug_s}"></a>`
      +
      `</h${at_n}>\n`  //: \n is mandatory
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
        'anchor',
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
