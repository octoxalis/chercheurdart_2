const REX_o = require( './regex.js' )

const X_o = require( '../data/X_o.js' )




const WORD_o =
{
  //?? url__s
  //?? (
  //??   url_s
  //?? )
  //?? { return url_s.slice( url_s.indexOf( PATH_s ) + PATH_s.length ) }
  //?? ,
}



module.exports =
{
  words__s
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
