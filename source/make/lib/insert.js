const DB_o = require( './db.js' )
const REX_o = require( './regex.js' )
const NUM_o = require( './number.js' )
const C_o   = require( '../data/C_o.js' )
const I_o   = require( '../data/I_o.js' )




module.exports =
{
  insert__s
  (
    content_s
  )
  {
    INS_o
      .gray_a = []    //: create stack

    INS_o
      .color_a = []      //: create stack

    INS_o
      .gallery_a = []    //: create stack

    for
    (
      const match_a
      of
      [ ...
        content_s
          .trim()
          .matchAll
          (
            REX_o
              .new__re( 'gms' )
                `<ins
                \s+?
                (             //: open optional data attribute
                data--=
                "
                ([^"]+?)      //: section_s (everything inside apos)
                "
                )?            //: close optional data attribute
                >
                ([\s\S]+?)    //: everything inside ins element
                </ins>`
          )
      ]
    )
    {
      INS_o
        .index_n =
          match_a.index    //: index with prefix yields a unique ID, e.g. G1234

      INS_o
        .section_s =
          match_a[2]

      let insert_s =
        match_a[3]
          .trim()

      if         //: lightbox image
      (
        C_o
          .INSERT_CHAR_a
            .includes
            (
              insert_s
                .charAt( 0 )
            )
      )
      {
        insert_s =
          INS_o
            .parse__s( insert_s )
      }
      
      content_s =
        content_s
          .replace
          (
            match_a[0],    //: <ins data--="...">...</ins>
            `<label for="${C_o.INSERT_ID_s}${INS_o.index_n}" tabindex="0">${C_o.U_IMAGE_OF_s}</label>`
            + `<input id="${C_o.INSERT_ID_s}${INS_o.index_n}" type="checkbox" />`
            + `<ins>`      //: remove ins tag data-- attribute
            + `<label for="${C_o.INSERT_ID_s}${INS_o.index_n}" tabindex="0">${C_o.CLOSE_CHAR_s}</label>`
            + insert_s
            +`</ins>`
          )
    }
    
    return (
      INS_o
        .gray_a
          .length
      ?
        content_s
          .replace
          (
            '</nav>',  //: insertion before <nav> end
            `<a href="#${C_o.GALLERY_TITLE_s}">${C_o.GALLERY_TITLE_s}</a>`
            + '</nav>'
          )
          .replace
          (
            '</main>',  //: insertion after <main> end
            `<section id="${C_o.GALLERY_TITLE_s}">`
            + `<aside>${INS_o.gallery_a.join( '\n' )}</aside>`
            + `</section>`
            + `</main>`
            + `<aside id="gray">${INS_o.gray_a.join( '\n' )}`
            + `<a href="#${INS_o.section_s}"><button>${C_o['CLOSE_CHAR_s']}</button></a>`
            +`</aside>`
            + `<aside id="color">${INS_o.color_a.join( '\n' )}`
            + `<a href="#${INS_o.section_s}"><button>${C_o['CLOSE_CHAR_s']}</button></a>`
            + `</aside>`
          )
      :
        content_s
    )
  }
,

}




const INS_o =
{
  //--index_n,
  //--section_s,
  //--gray_a,
  //--color_a,

  db_o:
    DB_o
      .db__s(),
  
  



/**
 * IOR image insert content (order = image + (links) + (text) )
/ comment_s
! ID_s == url_s           //: image: url_s = (C_o.IMG_DIR_s implied) img_id + (iiif_s || C_o.IOR_FULL_s)
[ link_s == url_s         //: link
\ text_s \ multiline_s    //: text
*/
parse__s:
(
  insert_s
) =>
{
  INS_o
    .image_s = ''
  INS_o
    .legend_s = ''

  INS_o
    .aside_n = 1    //: post increment

  for
  (
    let line_s
    of
    insert_s
      .split( C_o.LINE_DELIM_s )
    )
  {
    let method_s

    switch
    (
      line_s
        .charAt( 0 )
    )
    {
      case C_o.IMG_START_s:    //: comes 1st
        {
          method_s = 'img'
          break
        }
        
      case C_o.LINK_START_s:   //: after IMG_START_s
        {
          method_s = 'link'
          break
        }
        
      case C_o.TEXT_START_s:   //: after LINK_START_s
        {
          method_s = 'text'
          break
        }
        
      default:    //: comment or unrecognised token
        break
    }

    if ( method_s )
    {
      INS_o
        [`${method_s}Line__v`]
        (
          line_s
            .slice( 1 )    //: skip IMG_START_s
            .trim()
  
        )
    }
  }

  return (
    INS_o
      .gray_a
        .length
        ?
        INS_o
          .image_s
        :
          'parse__s: NOTHING TO INSERT'    //: should not occur!
      )
}
,




imgLine__v:
  (
    line_s
  ) =>
  {
    let imgId_s = line_s

    INS_o
      .legend__v( imgId_s )
        
    INS_o
      .image__v( imgId_s )
  }
  ,




  linkLine__v:
  (
    line_s
  ) =>
  {
    let
    [
      key_s,
      url_s
    ] =
      INS_o
        .keyVal__a( line_s )

    INS_o
      .gray_a
        .push
        (
          //... TODO wrap
          `<a id="${C_o.ASIDE_GRAY_ID_s}${INS_o.index_n}"`
          + ` href="${url_s}">`
          + `${key_s}</a>`
        )
  }
  ,





textLine__v:
  (
    line_s
  ) =>
  {
    const text_a =
      line_s
        .split( C_o.TEXT_START_s )
        .map
        (
          text_s =>
            text_s
              .trim()
        )
        
    INS_o
      .color_a
        .push
        (
          //... TODO wrap
          `<span><${C_o.TABLE_TAG_s}>`
          + text_a
            .join( `</${C_o.TABLE_TAG_s}><${C_o.TABLE_TAG_s}>` )
          + `</${C_o.TABLE_TAG_s}></span>`
        )
  }
  ,



  legend__v:
  (
    imgId_s
  ) =>
  {
    const [ artist_s, collect_s ] =
      imgId_s
        .split( C_o.ID_DELIM_s )
    
    const artist_o =
      INS_o
        .db_o
          .artist
            [`${artist_s}`]
    
    const collect_o =
      INS_o
        .db_o
          .collect
            [`${collect_s}`]
    
    const work_o =
      INS_o
        .db_o
          .work
            [ imgId_s ]

    let year_s =
      NUM_o
        .floatToRange__s
        (
          work_o.year_n,
          4
        )

    const height_s =
      NUM_o
        .decimalSub__s( work_o.w_height_n )

    const width_s =
      NUM_o
        .decimalSub__s( work_o.w_width_n )

    INS_o
      .legend_s =
        `<${C_o.TABLE_TAG_s}>${work_o.subject_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${artist_o.forename_s} ${artist_o.lastname_s} ${artist_o.nickname_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${year_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}><i>${height_s}</i><i>${width_s}</i></${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${collect_o.place_s}${C_o.LEGEND_DELIM_s}${collect_o.country_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${collect_o.location_s}</${C_o.TABLE_TAG_s}>`
  }
  ,



  image__v:
  (
    imgId_s
  ) =>
  {
    let at_n = 0      //: IMG_SIZE_ALT_a index

    const alt_s =
      INS_o
        .alt__s( imgId_s )

    const dim_a =
      INS_o
        .dimension__a( imgId_s )

    let [ width_n, height_n ] =
      dim_a[at_n]

    INS_o
      .image_s =
        `<a href="#${C_o.ASIDE_GRAY_ID_s}${INS_o.index_n}">`
        + `<img src="${C_o.IMG_DIR_s}${imgId_s}${I_o.IOR_TRIPLE_a[at_n]}"`
        + ` alt="${alt_s} (${I_o.IMG_SIZE_ALT_a[at_n++]})"`        //: increment at_n
        + ` width="${width_n}" height="${height_n}"`
        + ` loading="lazy" />`
        + `</a>`
        + INS_o.legend_s

    ;[ width_n, height_n ] =
      dim_a[at_n]

    INS_o
      .gray_a
        .push
        (
          `<figure id="${C_o.ASIDE_GRAY_ID_s}${INS_o.index_n}">`

          + `<a href="#${C_o.ASIDE_COLOR_ID_s}${INS_o.index_n}">`
          +   `<img src="${C_o.IMG_DIR_s}${imgId_s}${I_o.IOR_TRIPLE_a[at_n]}"`
          +   ` alt="${alt_s} (${I_o.IMG_SIZE_ALT_a[at_n++]})"`        //: increment at_n
          +   ` width="${width_n}" height="${height_n}"`
          +   ` loading="lazy" />`
          + `</a>`

          + `</figure>`
        )

    ;[ width_n, height_n ] =
      dim_a[at_n]

    INS_o
      .color_a
        .push
        (
          `<figure id="${C_o.ASIDE_COLOR_ID_s}${INS_o.index_n}">`

          + `<a href="#${C_o.ASIDE_GRAY_ID_s}${INS_o.index_n}">`
          +   `<img src="${C_o.IMG_DIR_s}${imgId_s}${I_o.IOR_TRIPLE_a[at_n]}"`
          +   ` alt="${alt_s} (${I_o.IMG_SIZE_ALT_a[at_n]})"`        //: no more increment
          +   ` width="${width_n}" height="${height_n}"`
          +   ` loading="lazy" />`
          + `</a>`
          
          + `</figure>`
        )

    INS_o
      .gallery_a
        .push
        (
          `<figure id="${C_o.SLIDE_ID_s}${INS_o.index_n}">`
          
          + `<img src="${C_o.IMG_DIR_s}${imgId_s}${I_o.IOR_TRIPLE_a[at_n]}"`
          + ` alt="${alt_s} (${I_o.IMG_SIZE_ALT_a[at_n]})"`        //: no more increment
          + ` width="${width_n}" height="${height_n}"`
          + ` loading="lazy" />`

          + `<figcaption>`
          +   INS_o
                .legend_s
          + `</figcaption>`

          + `</figure>`
        )
  }
  ,




  alt__s:
  (
    imgId_s
  ) =>
  {
    const artist_s =
      imgId_s
        .split
        (
          C_o.ID_DELIM_s
        )
        [0]

    const artist_o =
      INS_o
        .db_o
          .artist
            [`${artist_s}`]

    const work_o =
      INS_o
        .db_o
          .work
            [`${imgId_s}`]

    const { forename_s, lastname_s } =
      artist_o

    return (
      `${forename_s} ${lastname_s}:${work_o.subject_s}`
    )
  }
  ,




  dimension__a:
  (
    imgId_s
  ) =>
  {
    const work_o =
      INS_o
        .db_o
          .work
            [`${imgId_s}`]

    const { width_n, height_n } =
      work_o

    const dim_a = []

    let at_n = 0

    for
    (
      size_n
      of
      I_o
        .IMG_SIZE_a
    )
    {
      let ratio_n =
        size_n
        >
        1
        ?
          I_o
            .IMG_SIZE_a[at_n++]
          /
          height_n
        :
          1
      
    dim_a
      .push
      (
        [
          ~~( width_n * ratio_n ),
          ~~( height_n * ratio_n )
        ]
      )
    }

    return dim_a
  }
  ,



  keyVal__a:
  line_s =>
    line_s
      .slice( 1 )    //: skip START_s char
      .split( C_o.KEYVAL_DELIM_s )
      .map
      (
        split_s =>
          split_s
            .trim()
      )
  ,
}
