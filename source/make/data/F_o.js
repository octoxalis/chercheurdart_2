const { F_OK } = require('constants')
const FS_o  = require( 'fs' )
const KS_o  = require('klaw-sync')

const REX_o = require( '../lib/regex.js' )


const SPECIAL_s = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
const NORMAL_s  = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'

const F_o =
{
  stamp__s:    //: UTC: 2021-09-14T12:44:07Z
  (
    stamp_s
  ) =>
  {
    const stamp_re =
    REX_o
      .new__re( 'i' )
       `(?<year_s>
        \d{4}
        )
        -
        (?<month_s>
          \d{2}
        )
        -
        (?<day_s>
          \d{2}
        )
        T
        (?<hour_s>
          \d{2}
        )
        :
        (?<minutes_s>
          \d{2}
        )
        :
        (?<seconds_s>
          \d{2}
        )`
    
    const match_a =
      stamp_s
        .match( stamp_re )

    let at_s = ''

    if
    (
      match_a
        ?.length
    )
    {
      const month_o =
      {
        '01': 'janvier',
        '02': 'février',
        '03': 'mars',
        '04': 'avril',
        '05': 'mai',
        '06': 'juin',
        '07': 'juillet',
        '08': 'août',
        '09': 'septembre',
        '10': 'octobre',
        '11': 'novembre',
        '12': 'décembre',
      }

      at_s =
       `<bold>`
       + `${match_a.groups.day_s} `
       + `${month_o[ match_a.groups.month_s ]} `
       + `${match_a.groups.year_s}`
       + `</bold> `
       + `à ${match_a.groups.hour_s}:`
       + `${match_a.groups.minutes_s}:`
       + `${match_a.groups.seconds_s}`
    }

    return at_s
  }
  ,
}


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
  


  stamp__s:
    stamp_s =>
      F_o
        .stamp__s( stamp_s )
  ,



  versionList__s:    //: UTC: 2021-09-14T12:44:07Z
  (
    version_a
  ) =>
  {
    let list_s = ''

    let version_n = 1

    for
    (
      version_s
      of
      version_a
    )
    {
      if
      (
        version_s
      )
      {
        list_s +=
          F_o
            .stamp__s( version_s )
          + '\n'

        ++version_n
      }
  }

    list_s =
      list_s
        .slice
        (
          0,
          -1    //: remove last \n
        )

    return `pass:[${list_s}]`
  }
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



  //XX writeFile__v:
  //XX (
  //XX   output_o
  //XX ) =>
  //XX {
  //XX   if ( output_o ) console.log( output_o )    //: null or error message
  //XX }
  //XX ,
}
