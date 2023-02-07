//: CLI: node source/make/cli/topics.js  (from chercheurdart_2 dir)

const FS_o = require( 'fs-extra' )

const REX_o = require( '../lib/regex.js' )

const C_o =   require( '../data/C_o.js' )
const F_o =   require( '../data/F_o.js' )
const X_o =   require( '../data/X_o.js' )



const RES_o =
{
  RESERVE_PARTS_DIR_s:  C_o.RESERVE_PARTS_DIR_s,

  //--- range_a: new Array( X_o.CAT_RANGE_n + 1 ),       //: document doc_n by ranges [0-2^10]
  artist_db_s: `${C_o.DB_PATH_s}artist.json`,

  artist_a:
    null
  ,
  
  img_a
  :
    []
  ,

  catalog_o
  :
    {}
  ,


  FILE_PATH_s:
    //--- `
    //--- (france||nord||sud)
    //--- \/
    //--- (\d{4}-[^\/]+?)    //: artist ID
    //--- \/
    //--- (\d{4})?   //: optional creation year
    //--- -?         //: optional tiret
    //--- ([^.]+)     //: subject
    //--- \.
    //--- `
    `(france||nord||sud)\/(\d{4}-[^\/]+?)\/(\d{4})?-?([^.]+?)\.`
  ,




  img__o
  (
    path_s
  )
  {
    //;console.log( path_s )
    let entry_o

    const short_s
    =
      path_s
        .substring
        (
          ' /home/daniel/Public/chercheurdart_2/reserve'
            .length
        //-- , path_s
        //--     .lastIndexOf( '.' )    //: strip extension
        )

    const name_s
    =
      short_s
        .substring
        (
          0
        , short_s
            .lastIndexOf( '.' )    //: strip extension
        )

    //;console.log( short_s  )

    const
      [
        school_s
      , artistId_s
      , subject_s
      ]
    =
      name_s
        .split( '/' )

    if
    (
      school_s
    )
    {
      entry_o
      =
        {
          //--  reserve/france/1594-poussin/1640-L'Adoration des Bergers.jpeg
          path_s:
            short_s
        , slug_s:
            F_o
              .slug__s( subject_s )
        , subject_s:
            subject_s
        , school_s:
            school_s
        , artistId_s:
            artistId_s
        }
    }
    else
    {
      ;console
        .log( `Error matching file: ${path_s}` )
    }

    return entry_o
  }
  ,



  copy__s
  (
    img_o
  )
  {
    const
      {
        path_s
      , slug_s
      , school_s
      , artistId_s
      , subject_s
      }
    =
      img_o

    const orig_s
    =
      `${C_o.IMG_RESERVE_SRC_PATH_s}${path_s}`

    const dest_s
    =
      `${C_o.IMG_RESERVE_SITE_PATH_s}${school_s}/${artistId_s}`

    if
    (
      F_o
        .exist__b( `${dest_s}/${slug_s}.jpg` )
    )
    {
      console.log( `Already there:\t${dest_s}/${slug_s}.jpg` )
    }
    else
    {
      if
      (
        F_o
          .mkDir__b( `./site/${dest_s}` )
      )
      {
        FS_o
          .copyFileSync
          (
            `./${orig_s}`
          , `./site/${dest_s}/${slug_s}.jpg`
          )
      }
    }

    return `${dest_s}/${slug_s}.jpg`
  }
  ,

  

  entry__s
  (
    img_o
  , dest_s
  )
  {
    const
      {
      //--  path_s
      //-- , slug_s
      //-- , school_s
        artistId_s
      , subject_s
      }
    =
      img_o

    const artist_o
    =
      RES_o
        .artist_a
          .find
          (
            item_o =>
              item_o
                .id_s
              ===
              artistId_s
          )

    let collection_s
    let location_s

  if
  (
    ! artist_o
  )
  {
    ;console.log( `No DB entry for ${artistId_s}`  )

    return ''
  }

    return (
      `<li>`
      + `<dl role=button tabindex=1 data-href_s="${dest_s}">`
      + `<dt>${artist_o.forename_s} ${artist_o.lastname_s}</dt>`
      + `<dd data-collection="${collection_s}" data-location="${location_s}">`    //!!! collection_s, location_s not yet defined
      + subject_s
      + `</dd>`
      + `</dl>`
    )
  }
  ,



  write__v
  ()
  {
    let html_o
    =
      {
        france: ''
      , nord:   ''
      , sud:    ''
      }

    for
    (
      let img_o
      of
      RES_o
        .img_a
    )
    {
      const dest_s
      =
        RES_o
          .copy__s( img_o )

      const match_a
      =
        dest_s
          .match
          (
            new RegExp
            (
              `${C_o.IMG_RESERVE_SITE_PATH_s}(?<school>france||nord||sud)?`
            )
          )

      html_o
        [
          match_a
            .groups
              .school
        ]
      +=
        RES_o
          .entry__s
          (
            img_o
          , dest_s
          )
    }

    for
    (
      const school_s
      of
      [
        'france'
      , 'nord'
      , 'sud'
      ]
    )
    {
      const dest_s
      =
        `./${C_o.RESERVE_PARTS_DIR_s}reserve_${school_s}.html`

      FS_o
        .writeFile
        (
          dest_s
        ,  html_o
            [ school_s ]
        ,  out_o =>    //: callback_f
            {
              const out_s =
                out_o
                ?
                  'ERROR'
                :
                  'OK'
  
              console
                .log( `\n----\nWriting ${dest_s}: (${out_s})\n----\n` )
            }
        )
    }
  }
  ,



  init__v
  ()
  {
    RES_o
      .file_a =        //: prepare
        require( 'klaw-sync' )
        (
          C_o
            .IMG_RESERVE_SRC_PATH_s    //: artist + collections directories
        , {
            nodir: true,
            depthLimit: 2
          }
        )

    if
    (
      RES_o
        .file_a
    )
    {
      RES_o
        .artist_a
      =
        JSON
          .parse
          (
            FS_o
              .readFileSync
              (
                RES_o
                  .artist_db_s,
                'utf8',
                'r'
              )
          )

      RES_o
        .count_n
      =
        RES_o
          .file_a
            .length

      for
      (
        file_o
        of
        RES_o
          .file_a
      )
      {
        RES_o
          .img_a
            .push
            (
              RES_o
                .img__o
                (
                  file_o
                    .path
                )
            )
      }

      RES_o
        .write__v()
    }

    ;console
      .log( `image files processed: ${RES_o.count_n}` )
  }
  ,
}



RES_o
  .init__v()