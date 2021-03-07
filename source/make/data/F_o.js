const CRYPTO_o  = require('crypto')
const FS_o  = require( 'fs' )
const KS_o  = require('klaw-sync')

const REX_o = require( '../lib/regex.js' )

const U_o = require( './U_o.js' )
const C_o = require( './C_o.js' )


const OPEN_s  = '[='   //: substitute__s function delimiter
const CLOSE_s = '=]'   //: idem

const SPECIAL_s = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
const NORMAL_s  = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'


module.exports =
{
  tagEscape__s:
  content_s => content_s.replace( /</g, '&lt;' ).replace( />/g, '&gt;' )
  ,



  substitute__s: ( hay_s, dict_o, open_s=OPEN_s, close_s=CLOSE_s ) =>
  {
    const open_n = open_s.length
    const close_n = close_s.length
    let openAt_n,
        closeAt_n,
        key_s
  
    while ( (openAt_n = hay_s.indexOf( open_s ) ) > -1 )
    {
      closeAt_n = hay_s.indexOf( close_s )
      if ( closeAt_n > -1)
      {
        closeAt_n += close_n
        key_s = hay_s.substring( openAt_n, closeAt_n )
        hay_s = hay_s.replace( key_s, dict_o[key_s.slice( open_n, -close_n )] )
      }
    }
    return hay_s
  }
  ,
  


  Boolean__b:
  value_ =>
  {
    if ( typeof value_ === 'boolean' ) return value_
    if (!value_) return false
    const value_s = value_.toString().toLowerCase()
    switch ( true )
    {
      case ( value_s in [ 'true', 'yes', '1' ] ) :
        return true
      case ( value_s in [ 'false', 'no', '0' ] ) :
      case null :
        return false
      default: return Boolean (value_ )
    }
  }
  ,



  fileName__s:
  permalink_s =>
  {
    let index_n = permalink_s.lastIndexOf( '/') + 1  //: if ( index_n < 0 ) index_n = 0
    return permalink_s.slice( index_n, permalink_s.indexOf( '.html' ) )
  }
  ,



  slug__s:
  title_s =>
  {
    const special_s =
      SPECIAL_s
        .split( '' )
        .join( '|' )

    const g_re =
      REX_o
        .new__re( 'g' )

    return (
      title_s
        .toString()
        .toLowerCase()
        .replace
        (
          g_re`\s+`,    //: space --> -
          '-'
        )
        .replace
        (
          g_re`${special_s}`,    //: SPECIAL_s altern
          char_s => (
            NORMAL_s
              .charAt
              (
                SPECIAL_s
                  .indexOf( char_s )
              )
          )
        )
        .replace
        (
          g_re`&`,    //: ampersand --> -and-
          '-and-'
        )
        .replace
        (
          g_re`[^\w\-]+`,    //: all non-word characters
          ''                 //: remove
        )
        .replace
        (
          g_re`\-\-+`,    //: multiple -
          '-'             //: remove
        )
        .replace
        (
          g_re`^-+`,    //: trim - at start
          ''            //: remove
        )
        .replace
        (
          g_re`-+$`,    //: trim - at end
          ''            //: remove
        )
    )
  }
  ,


  sha__s:
  (
    content_s,
    length_n=4
  ) =>
    CRYPTO_o
      .createHash( 'sha256' )
      .update( content_s )
      .digest( 'hex' )
      .slice( 0, length_n )        //;console.log( sha_s )
  ,
  



  till__s:
  (
    days_n=0
  ) =>
  {
    const till_s = new Date()
    till_s.setDate( till_s.getDate() + days_n )
    return till_s
  }
  ,



  writeFile__v:
  (
    output_o
  ) =>
  {
    if ( output_o ) console.log( output_o )    //: null or error message
  }
  ,



  idWork__a:
  (
    id_s,    //: artist (1703~boucher) or collector (princeton~university)
    index_n  //: index in [ 1703~boucher  -  princeton~university  -  1748~arion ]
  ) =>
  {
    let id_a = []

    const file_a =
      KS_o
      (
        './work',
        {nodir: true}
      )

    for
    (
      const file_o
      of
      file_a
    )
    {
      const path_s =    //: 1703~boucher-princeton~university-1748~arion.js
        file_o
          .path

      const at_s =    //: 1703~boucher-princeton~university-1748~arion
        path_s
          .substring  //: file name without 'js'
          (
            path_s
              .lastIndexOf( '/' ) + 1
          )
          .split('.')
            [0]

      const id_a =
        at_s
          .split( C_o.ID_DELIM_s )

      if
      (
        id_s
        ===
        `${id_a[index_n]}` )
        {
          id_a
            .push( at_s )
        }
    }

    return id_a
  },



  exist__b:    //: check if file/dir exists
  (
    url_s
  ) =>
    FS_o
      .existsSync( url_s )
  ,
  



  mkDir__b:    //: check if a dir exists, otherwise create it and its parents
  (
    dir_s
  ) =>
    FS_o
      .existsSync( dir_s )
    ?
      true
    :
      FS_o
        .mkdirSync
        (
          dir_s,
          { recursive: true }
        )
  ,

}
