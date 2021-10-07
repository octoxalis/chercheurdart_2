const FS_o  = require( 'fs' )
const KS_o  = require('klaw-sync')

const REX_o = require( '../lib/regex.js' )


const SPECIAL_s = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
const NORMAL_s  = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'




module.exports =
{
  tagEscape__s:
    content_s =>
      content_s
        .replace
        (
          /</g,
          '&lt;'
        )
        .replace
        (
          />/g,
          '&gt;'
        )
  ,



  fileName__s:
    permalink_s =>
      permalink_s
        .slice
        (
          permalink_s
            .lastIndexOf( '/' ) + 1,  //: if ( index_n < 0 ) index_n = 0
          permalink_s
            .indexOf( '.' )      //: i.e. '.html'
        )
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



  exist__b:    //: check if file/dir exists
    url_s =>
      FS_o
        .existsSync( url_s )
  ,
  



  mkDir__b:    //: check if a dir exists, otherwise create it and its parents
    dir_s =>
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
