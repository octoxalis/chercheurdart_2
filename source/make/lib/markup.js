const REX_o = require( './regex.js' )

const X_o = require( '../data/X_o.js' )




const MARK_o =
{
}



module.exports =
{
  replace__s
  (
    input_s
  )
  {
    const G_re =
      REX_o
        .new__re( 'g' )    //: global regex

    return input_s
      .replace( G_re`${X_o.WORD_OPEN_s}`, `` )    //: remove...
      .replace( G_re`${X_o.WORD_CLOSE_s}`, `` )   //: remove...
  },
  
}
