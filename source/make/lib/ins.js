const FS_o  = require( 'fs-extra' )

const DB_o  = require( './db.js' )
const REX_o = require( './regex.js' )
const NUM_o = require( './number.js' )
const ASC_o = require( './asciidoc.js' )

const C_o   = require( '../data/C_o.js' )
const I_o   = require( '../data/I_o.js' )




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
₀ text_s multiline_s      //: text
₁ img_s == DB work ID     //: image: url_s = (C_o.IMG_DIR_s implied) img_id + (iiif_s || C_o.IOR_FULL_s)
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

  const specifier_n =
    insert_s
      .indexOf( C_o.SPECIF_DELIM_s )

  const specifier_s =
    insert_s
      .slice( 0, specifier_n )

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
            .slice( specifier_n )    //: skip specifier
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
    case C_o.INS_QUO_s:
    case C_o.INS_TAB_s:
    case C_o.INS_DEF_s:
      return (
        ASC_o
          .parse__s
          (
            INS_o
              .text_s
          )
      )
      break

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
  INS_o
    .text_s =
      INS_o
        .txt__s
        (
          line_s,
          C_o.INS_TXT_s
        )
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
  const ref_s =
    line_s
      .trim()

  INS_o
    .text_s =
    INS_o
      .reference__s( ref_s )


}
,



quoLine__v:    //: ₃
(
  line_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .txt__s
        (
          line_s,
          C_o.INS_QUO_s
        )
}
,




tabLine__v:    //: ₄
(
  line_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .table__s
        (
          line_s,
          C_o.INS_TAB_s
        )
}
,




defLine__v:    //: ₅
(
  line_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .txt__s
        (
          line_s,
          C_o.INS_DEF_s
        )
}
,




txt__s:
(
  line_s,
  specifier_s
) =>
  `<${C_o.TABLE_TAG_s} data-ins="${C_o.INS_SUBSID_s}" data-spec=${specifier_s}>`
  + `<${C_o.ROW_TAG_s}>`
  + line_s
      .trim()
      .replaceAll
      (
        C_o.BREAK_DELIM_s,
        `</${C_o.ROW_TAG_s}><${C_o.ROW_TAG_s}>`
      )
  + `</${C_o.ROW_TAG_s}>`
  + `</${C_o.TABLE_TAG_s}>`
,




reference__s:
(
  refId_s
) =>
{
  const  [ biblio_s, ...position_a ] =
    refId_s
      .split( C_o.ID_WORD_DELIM_s )

  const biblio_o =
    INS_o
      .db_o
        .biblio
          [`${biblio_s}`]

  let ref_s =
  `<${C_o.TABLE_TAG_s} data-ins="${C_o.INS_SUBSID_s}" data-spec=${C_o.INS_REF_s}>`
  + `<${C_o.ROW_TAG_s}>${biblio_o.author_s??'inconnu'}</${C_o.ROW_TAG_s}>`
  + `<${C_o.ROW_TAG_s}>${biblio_o.title_s}</${C_o.ROW_TAG_s}>`

  for
  (
    let field_s
    of
    [
      'year_n',
      'isbn_s',
      'publication_s',
      'issue_s',
    ]
  )
  {
    if
    (
      biblio_o
        [ field_s ]
    )
    {
      let title_s = ''

      if
      (
        field_s
        ===
        'isbn_s'
      )
      {
        title_s =
          'ISBN: '
      }

      ref_s +=
        `<${C_o.ROW_TAG_s}>${title_s}${biblio_o[field_s]}</${C_o.ROW_TAG_s}>`
    }
  }

  for
  (
    let field_s
    of
    position_a
  )
  {
    ref_s +=
      `<${C_o.ROW_TAG_s}>${field_s}</${C_o.ROW_TAG_s}>`
  }

  ref_s +=
    `</${C_o.TABLE_TAG_s}>`

  return ref_s
}
,



table__s:
(
  line_s,
  specifier_s
) =>
{
  let table_s = ''

  let css_s = ''

  let colw_s = ''

  let cola_s = ''

  let row_n = 0    //: for loop index

  for
  (
    let atline_s
    of
    line_s
      .split( C_o.BREAK_DELIM_s )
  )
  {
    switch
    (
      row_n
    )
    {
      case 0:        //: 1st line: column widths
        colw_s =
          atline_s
            .trim()

        css_s +=
          INS_o
            .tableWidth__s( atline_s )
        break

      case 1:        //: 2nd line: column align
        cola_s =
          atline_s
            .trim()

        css_s +=
          INS_o
            .tableAlign__s( atline_s )

        break

      default:
        table_s +=
          INS_o
            .tableRow__s
            (
              atline_s
                .split( C_o.CELL_DELIM_s ),
              row_n
            )
    }

    ++row_n
  }

  INS_o
    .css_s +=
      css_s

  return (
    `<${C_o.TABLE_TAG_s} data-ins="${C_o.INS_SUBSID_s}" data-spec=${specifier_s} role=table`
    + ` class="colw_${colw_s} cola_${cola_s}">`
    + table_s
    + `</${C_o.TABLE_TAG_s}>`
    )
}
,



tableWidth__s:
(
  width_s
) =>
{
  const width_a =
    width_s
      .trim()
        .split
        (
          C_o
            .PART_DELIM_s
        )

  const col_n =
    width_a
      .length

  let ruleset_s = ''
    
  let index_n = 1    //: for loop index

  for
  (
    let col_s
    of
    width_a
  )
  {
    ruleset_s +=
      `.colw_${width_s} > ${C_o.ROW_TAG_s}:nth-child(${col_n}n+${index_n})`
      + `{width: calc((${col_s} - ${+col_s * C_o.CELL_RATIO_n}) * 1%)}\n`

    ++index_n
  }

  return (
    `.colw_${width_s} > ${C_o.ROW_TAG_s}:nth-child(-n+${col_n}){filter:brightness(var(--brigtness_lo));font-weight:600}\n`
    + ruleset_s
    )
}
,



tableAlign__s:
(
  align_s
) =>
{
  align_s = 
    align_s
      .trim()

  const align_a =
    align_s
      .split
      (
        C_o
          .PART_DELIM_s
      )

  const col_n =
    align_a
      .length

  let ruleset_s = ''
    
  let index_n = 1    //: for loop index

  for
  (
    let col_s
    of
    align_a
  )
  {
    ruleset_s +=
      `.cola_${align_s} > ${C_o.ROW_TAG_s}:nth-child(${col_n}n+${index_n})`
      + `{text-align: ${C_o.CELL_ALIGN_a[+col_s]}}\n`

    ++index_n
  }

  return ruleset_s
}
,



tableRow__s:
(
  row_a,
  row_n      //!!! not used
) =>
{
  let row_s = ''

  for
  (
    let cell_s
    of
    row_a
  )
  {
    row_s +=
      `<${C_o.ROW_TAG_s}>`
      + cell_s
          .trim()
      + `</${C_o.ROW_TAG_s}>`
  }

  return row_s
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
        `<${C_o.TABLE_TAG_s} data-ins="${C_o.INS_SUBSID_s}" data-spec=${C_o.INS_IMG_s}>`
        + `<${C_o.ROW_TAG_s}>${artist_o.forename_s} ${artist_o.lastname_s} ${artist_o.nickname_s??''}</${C_o.ROW_TAG_s}>`
        + `<${C_o.ROW_TAG_s}>${work_o.subject_s}</${C_o.ROW_TAG_s}>`
        + `<${C_o.ROW_TAG_s}>${year_s}</${C_o.ROW_TAG_s}>`
        + `<${C_o.ROW_TAG_s}><i>${height_s}</i><i>${width_s}</i></${C_o.ROW_TAG_s}>`
        + `<${C_o.ROW_TAG_s}>${collection_o.place_s}${C_o.LEGEND_DELIM_s}${collection_o.country_s}</${C_o.ROW_TAG_s}>`
        + `<${C_o.ROW_TAG_s}>${collection_o.location_s}</${C_o.ROW_TAG_s}>`
        + `</${C_o.TABLE_TAG_s}>`
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



  //?? keyVal__a:
  //?? line_s =>
  //??   line_s
  //??     .slice( 1 )    //: skip START_s char
  //??     .split( C_o.KEYVAL_DELIM_s )
  //??     .map
  //??     (
  //??       split_s =>
  //??         split_s
  //??           .trim()
  //??     )
  //?? ,


  css__v:
  (
    permalink_s
  ) =>
  {
    const path_s =
      C_o.INS_CSS_s
      + permalink_s
          .replace
          (
            'html',
            'css'
          )

    const css_s =
      INS_o
        .css_s
    
    FS_o
      .writeFile
      (
        path_s,
        css_s,
        'utf8',
        out_o =>    //: callback_f
          {
            const out_s =
              out_o
              ?
                'ERROR'
              :
                'OK'
            console
              .log( `\n----\nWriting ${path_s}: (${out_s})\n----\n` )
          }
      )
  }
  ,
}




module.exports =
{
  insert__s
  (
    content_s,
    permalink_s
  )
  {
    INS_o
      .gray_a = []       //: create stack

    INS_o
      .color_a = []      //: create stack

    INS_o
      .gallery_a = []    //: create stack

    INS_o
      .css_s = ''        //: reset    

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
            `<label for="${C_o.INSERT_ID_s}${INS_o.index_n}" tabindex="-1">${C_o.INS_TRIGGER_s}</label>`
            + `<input id="${C_o.INSERT_ID_s}${INS_o.index_n}" type="checkbox" />`
            + `<ins>`      //: remove ins tag data-- attribute
            + insert_s
            +`</ins>`
          )
    }
    
    INS_o
      .css_s
    &&
    INS_o
      .css__v( permalink_s )

    content_s =
      INS_o
        .gray_a
          .length
      ?
        content_s
          .replace    //: add SECTION_a[2] link to header
          (
            C_o.SECTION_2_TAG_s,
            `<a href="#${C_o.SECTION_a[1]}">${C_o.SECTION_a[1]}</a>`
          )
          .replace    //: add gallery asides (gray and color)
          (
            C_o.SECTION_1_TAG_s,    //: custom tag deleted after section insertion
            `<section id="${C_o.SECTION_a[1]}">`
            + `${INS_o.gallery_a.join( '\n' )}`
            + `</section>`
            + `<aside id="gray">${INS_o.gray_a.join( '\n' )}`
            +`</aside>`
            + `<aside id="color">${INS_o.color_a.join( '\n' )}`
            + `</aside>`
          )
      :
        content_s
          .replace    //: remove custom tag after section insertion
          (
            C_o.SECTION_1_TAG_s,
            ''
          )

    return content_s
  }
,

}
