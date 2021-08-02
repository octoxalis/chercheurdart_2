const DB_o = require( './db.js' )
const REX_o = require( './regex.js' )
const NUM_o = require( './number.js' )
const C_o   = require( '../data/C_o.js' )
const F_o   = require( '../data/F_o.js' )
const I_o   = require( '../data/I_o.js' )




module.exports =
{
  insert__s
  (
    content_s
  )
  {
    INS_o
      .gray_a = []       //: create stack

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
              .new__re( 'gms' )    //: collect all <ins> tags
                `<ins
                \s+?
                (             //: open optional data attribute group
                data--=
                "
                ([^"]+?)      //: section_s (everything inside apos) group
                "
                )?            //: close optional data attribute group
                >
                ([\s\S]+?)    //: everything inside <ins> element group
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
        INS_o
          .parse__s
          (
            match_a[3]
              .trim()
          )
      
      content_s =
        content_s
          .replace
          (
            match_a[0],    //: <ins data--="...">...</ins>
            `<label for="${C_o.INSERT_ID_s}${INS_o.index_n}" tabindex="0">${C_o.U_IMAGE_OF_s}</label>`
            + `<input id="${C_o.INSERT_ID_s}${INS_o.index_n}" type="checkbox" />`
            + `<ins>`      //: remove ins tag data-- attribute
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
          .replace    //: add GALLERY_TITLE_s link to header
          (
            '</header>',  //: insertion before <header> end
            `<a href="#${F_o.slug__s( C_o.GALLERY_TITLE_s )}">${C_o.GALLERY_TITLE_s}</a>`
            + '</header>'
          )
          .replace    //: add gallery asides (gray and color)
          (
            `<${C_o.SEC_MEDIA_s}/>`,    //: custom tag deleted after section insertion
            `<section id="${F_o.slug__s( C_o.GALLERY_TITLE_s )}">`
            + `${INS_o.gallery_a.join( '\n' )}`
            + `</section>`
            + `<aside id="gray">${INS_o.gray_a.join( '\n' )}`
            +`</aside>`
            + `<aside id="color">${INS_o.color_a.join( '\n' )}`
            + `</aside>`
          )
      :
        content_s
          .replace    //: remove SEC_MEDIA_s custom tag after section insertion
          (
            `<${C_o.SEC_MEDIA_s}/>`,
            ''
          )
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
₀ text_s \ multiline_s    //: text
₁ ID_s ==  DB work ID     //: image: url_s = (C_o.IMG_DIR_s implied) img_id + (iiif_s || C_o.IOR_FULL_s)
₂ ref_s == DB ref ID      //: ref
*/
parse__s:
(
  insert_s
) =>
{
  INS_o
    .text_s = ''

  INS_o
    .image_s = ''

  INS_o
    .legend_s = ''

  INS_o
    .aside_n = 1    //: post increment

  const specifier_s =
    insert_s
      .charAt( 0 )    //: [₀-₉]

  for
  (
    let line_s
    of
    insert_s
      .split( C_o.LINE_DELIM_s )
    )
  {
    let method_s =
      C_o.
        INS_METHOD_o
          [ specifier_s ]

    if ( method_s )
    {
      INS_o
        [`${method_s}Line__v`]
        (
          line_s
            .slice( 1 )    //: skip specifier
            .trim()
  
        )
    }
  }

  switch
  (
    specifier_s
  )
  {
    case C_o.INS_TXT_s:
    case C_o.INS_REF_s:
      return (
        INS_o
          .text_s
      )
  
    case C_o.INS_IMG_s:
      return (
        INS_o
          .image_s
      )

  }
}
,




txtLine__v:    //: ₀
(
  line_s
) =>
{
  const text_a =
    line_s
      .split( C_o.INS_TXT_s )
      .map
      (
        text_s =>
          text_s
            .trim()
      )                      //;console.log( text_a )
      
  INS_o
    .text_s =
        //... TODO wrap
        `<span><${C_o.TABLE_TAG_s}>`
        + text_a
          .join( `</${C_o.TABLE_TAG_s}><${C_o.TABLE_TAG_s}>` )
        + `</${C_o.TABLE_TAG_s}></span>`
}
,



imgLine__v:    //: ₁
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




refLine__v:    //: ₂
(
  line_s
) =>
{
  //XXlet
  //XX[
  //XX  key_s,
  //XX  url_s
  //XX] =
  //XX  INS_o
  //XX    .keyVal__a( line_s )

  INS_o
    .text_s =
      //XX  `<a id="${C_o.ASIDE_GRAY_ID_s}${INS_o.index_n}"`
      //XX  + ` href="${url_s}">`
      //XX  + `${key_s}</a>`
      //... TODO get DB for biblio
      line_s
}
,




  legend__v:
  (
    imgId_s
  ) =>
  {
    const [ artist_s, collection_s ] =
      imgId_s
        .split( C_o.ID_DELIM_s )
    
    const artist_o =
      INS_o
        .db_o
          .artist
            [`${artist_s}`]
    
    const collection_o =
      INS_o
        .db_o
          .collection
            [`${collection_s}`]
    
    const work_o =
      INS_o
        .db_o
          .work
            [ imgId_s ]

    let year_s =
      NUM_o
        .rangeFromFloat__s
        (
          work_o
            .year_n
        )

    const height_s =
      NUM_o
        .decimalSub__s( work_o.w_height_n )

    const width_s =
      NUM_o
        .decimalSub__s( work_o.w_width_n )

    INS_o
      .legend_s =
        `<span class="cartel">`
        + `<${C_o.TABLE_TAG_s}>${work_o.subject_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${artist_o.forename_s} ${artist_o.lastname_s} ${artist_o.nickname_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${year_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}><i>${height_s}</i><i>${width_s}</i></${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${collection_o.place_s}${C_o.LEGEND_DELIM_s}${collection_o.country_s}</${C_o.TABLE_TAG_s}>`
        + `<${C_o.TABLE_TAG_s}>${collection_o.location_s}</${C_o.TABLE_TAG_s}>`
        + `</span>`
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
          
          + `<a href="#${C_o.ASIDE_COLOR_ID_s}${INS_o.index_n}">`
          + `<figcaption>`
          +   INS_o
                .legend_s
          + `</figcaption>`
          + `</a>`

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



  //XX keyVal__a:
  //XX line_s =>
  //XX   line_s
  //XX     .slice( 1 )    //: skip START_s char
  //XX     .split( C_o.KEYVAL_DELIM_s )
  //XX     .map
  //XX     (
  //XX       split_s =>
  //XX         split_s
  //XX           .trim()
  //XX     )
  //XX ,
}
