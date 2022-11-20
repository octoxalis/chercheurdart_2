const FS_o  = require( 'fs-extra' )

const DB_o  = require( './db.js' )
const REX_o = require( './regex.js' )
const NUM_o = require( './number.js' )
const PRE_o =
  require( './2mark.js' )


const C_o   = require( '../data/C_o.js' )
const I_o   = require( '../data/I_o.js' )
const S_o   = require( '../data/S_o.js' )
const F_o   = require( '../data/F_o.js' )




const INS_o =
{
  //--index_n,
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
  specifier_s,
  key_s,
  value_s
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

  let method_s =
    C_o.
      INS_METHOD_o
        [ specifier_s ]

  if ( method_s )
  {
    INS_o
      [`${method_s}Line__v`]
      (
        value_s,
        key_s
      )

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
          PRE_o
            .process__s
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

  return ''    //!!! ERROR???
}
,




txtLine__v:    //: ₀
(
  value_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .txt__s
        (
          value_s,
          C_o.INS_TXT_s
        )
}
,



refLine__v:    //: ₂
(
  value_s
) =>
{
  const ref_s =
    value_s
      .trim()

  INS_o
    .text_s =
    INS_o
      .reference__s( ref_s )


}
,



quoLine__v:    //: ₃
(
  value_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .txt__s
        (
          value_s,
          C_o.INS_QUO_s
        )
}
,




tabLine__v:    //: ₄
(
  value_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .table__s
        (
          value_s,
          C_o.INS_TAB_s
        )
}
,




defLine__v:    //: ₅
(
  value_s
) =>
{
  INS_o
    .text_s =
      INS_o
        .txt__s
        (
          value_s,
          C_o.INS_DEF_s
        )
}
,




imgLine__v:    //: ₉
(
  imgId_s,    //: value_s
  key_s
) =>
{
  INS_o
    .legend_s =
      F_o
        .legend__s( imgId_s )
      
  INS_o
    .image__v( imgId_s )
}
,




txt__s:
(
  value_s,
  specifier_s
) =>
{
  let text_s = ''

  for
  (
    let line_s
    of
    value_s
      .split( C_o.INS_VAL_DELIM_s )
  )
  {
    text_s +=
      `<${C_o.ROW_TAG_s}>`
      + line_s
          .trim()
      + `</${C_o.ROW_TAG_s}>`
  }

  return (
    `<${C_o.TABLE_TAG_s} data-ins=${specifier_s}>`
    + text_s
    + `</${C_o.TABLE_TAG_s}>`
    )
}
,




reference__s:
(
  value_s
) =>
{
  const
    [
      biblio_s,
      ...position_a
    ] =
      value_s
        .split( C_o.INS_VAL_DELIM_s )

  const biblio_o =
    INS_o
      .db_o
        .biblio
          [ `${biblio_s}` ]

  let ref_s =
  `<${C_o.TABLE_TAG_s} data-ins=${C_o.INS_REF_s}>`
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
  value_s,
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
    let line_s
    of
    value_s
      .trim()
      .split
      (
        C_o
          .INS_VAL_DELIM_s
      )
  )
  {
    switch
    (
      row_n
    )
    {
      case 0:        //: 1st line: column widths
        ;    //: colw_s, cola_s already declared
        [
          colw_s,
          cola_s
        ] =
          line_s
            .split( C_o.WORDS_DELIM_s )
          
        css_s +=
          INS_o
            .tableWidth__s( colw_s )

        css_s +=
          INS_o
            .tableAlign__s( cola_s )

        break

      default:
        if
        (
          line_s
          !==
          ''      //: empty line for readibility: continue
        )
        {
          table_s +=
            INS_o
              .tableRow__s
              (
                line_s
                  .trim()
              )
        }
    }

    ++row_n
  }

  INS_o
    .css_s +=
      css_s

  return (
    `<${C_o.TABLE_TAG_s} data-ins=${specifier_s} role=table`
    + ` class="colw_${colw_s} cola_${cola_s}">`
    + table_s
    + `</${C_o.TABLE_TAG_s}>`
    )
}
,



tableWidth__s:
(
  colw_s
) =>
{
  const width_a =
    colw_s
      .split
      (
        C_o
          .WORDS_CONCAT_s
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
      `.colw_${colw_s} > ${C_o.ROW_TAG_s}:nth-child(${col_n}n+${index_n})`
      + `{width: calc((${col_s} - ${+col_s * C_o.CELL_RATIO_n}) * 1%)}\n`

    ++index_n
  }

  return (
    `.colw_${colw_s} > ${C_o.ROW_TAG_s}:nth-child(-n+${col_n}){filter:brightness(${S_o.brigtness_lo});font-weight:600}\n`
    + ruleset_s
    )
}
,



tableAlign__s:
(
  cola_s
) =>
{
  const align_a =
    cola_s
      .split
      (
        C_o
          .WORDS_CONCAT_s
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
      `.cola_${cola_s} > ${C_o.ROW_TAG_s}:nth-child(${col_n}n+${index_n})`
      + `{text-align: ${C_o.CELL_ALIGN_a[+col_s]}}\n`

    ++index_n
  }

  return ruleset_s
}
,



tableRow__s:
(
  cell_s
) =>
{
  let row_s = ''

    if
    (
      cell_s
        .startsWith( C_o.CELL_EMPTY_s )
    )
    {
      cell_s =
        C_o.CELL_EMPTY_ENTITY_s
    }

    row_s +=
      `<${C_o.ROW_TAG_s}>`
      + cell_s
          .trim()
      + `</${C_o.ROW_TAG_s}>`

  return row_s
}
,



css__v:
(
  permalink_s
) =>
{
  const path_s =
    C_o.CSS_SITE_DIR_s
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

          + `<label data-legend="${C_o.NAV_LEGEND_o.panorama.legend_s}"><span data-role="${C_o.NAV_LEGEND_o.panorama.legend_s}">&nbsp;</span></label>`
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

          + `<label data-legend="${C_o.NAV_LEGEND_o.panorama.legend_s}"><span data-role="${C_o.NAV_LEGEND_o.panorama.legend_s}">&nbsp;</span></label>`
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
          `<figure id="${C_o.GALERY_ID_s}${INS_o.index_n}">`
          
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
          C_o.ID_PART_DELIM_s
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
  //?? value_s =>
  //??   value_s
  //??     .slice( 1 )    //: skip START_s char
  //??     .split( C_o.KEYVAL_DELIM_s )
  //??     .map
  //??     (
  //??       split_s =>
  //??         split_s
  //??           .trim()
  //??     )
  //?? ,
}



module.exports =
{
  insert__s
  (
    processed_s,
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
      Array
        .from
        (
          processed_s
            .trim()
            .matchAll
            (
              REX_o
                .new__re( 'gms' )    //: collect all INS_OPEN_s blocks
                  `${C_o.INS_OPEN_s}
                  (
                  [₀-₉]{1,3}                //: specifier_s
                  )
                  ${C_o.INS_DELIM_s}
                  (
                  [^${C_o.INS_DELIM_s}]+?   //: key_s
                  )
                  ${C_o.INS_DELIM_s}
                  (
                  [^${C_o.INS_DELIM_s}]+?   //: value_s
                  )
                  ${C_o.INS_CLOSE_s}`
            )
        )
    )
    {
      INS_o
        .index_n =
          match_a.index    //: index with prefix yields a unique ID, e.g. G1234

      let
      [
        replace_s,
        specifier_s,
        key_s,
        value_s
      ] =
        match_a

      //;console.table(
      //;  [
      //;    replace_s,
      //;    specifier_s,
      //;    key_s,
      //;    value_s
      //;  ]
      //;  )

      switch
      (
        specifier_s
      )
      {
        //?? case C_o.INS_DEF_s:    //: auto AsciiDoc pass:
        case C_o.INS_REF_s:
        //?? case C_o.INS_QUO_s:
        //?? case C_o.INS_TAB_s:
        case C_o.INS_IMG_s:
          key_s =
            `<em>${key_s}</em>`

          break
      
        default:
          break
      }
      
      let ins_s =
        INS_o
          .parse__s
          (
            specifier_s,
            key_s,
            value_s
              .trim()
          )

      let checked_s = ''

      let hidden_s = ''

      if
      (
        key_s
          .includes( C_o.INS_DISPLAY_s )
      )
      {
        key_s = ''    //: remove INS_DISPLAY_s

        hidden_s =
          ' hidden'    //: empty label

        checked_s =
          ' checked'    //: always display insert
      }

      processed_s =
        processed_s
          .replace
          (
            replace_s,
            `<label for="${C_o.INSERT_ID_s}${INS_o.index_n}" tabindex="-1" data-ins=${specifier_s}${hidden_s}>`
            + key_s
               .trim()
            + `</label>`
            + `<input id="${C_o.INSERT_ID_s}${INS_o.index_n}" type="checkbox"${checked_s}/>`
            + `<ins>`
            + ins_s
            +`</ins>`
          )
    }
    
    INS_o
      .css_s
    &&
    INS_o
      .css__v( permalink_s )

    processed_s =
      processed_s
        .replace    //: add gallery asides (gray and color)
        (
          C_o.GALERY_REPLACE_s,    //: custom tag deleted after section insertion
          INS_o
          .gray_a
            .length
          ?
            `<section id="${C_o.SECTION_a[1]}">`
            + `${INS_o.gallery_a.join( '\n' )}`
            + `</section>`
            + `<aside>`
            + INS_o.gray_a.join( '\n' )
            + INS_o.color_a.join( '\n' )
            + `</aside>`
          :
            ''    //: remove
        )
    
    return processed_s
  }
,

}
