//-- const REX_o =
//--   require( './regex.js' )

const F_o =
  require( '../data/F_o.js' )


const PRE_o =
  require( './2mark.js' )

const header__a =
match_a =>    //: header__a
{
  let
  [
    replaced_s,
    level_s,
    header_s
  ] =
    match_a

  header_s =
    header_s
      .trim()

  let anteDiv_s = ''

  let postDiv_s = ''

  let anchor_s = ''

  if
  (
    +level_s
    ===
    2
  )
  {
    anteDiv_s =
      '</div><hr>'    //: horizontal line after h2 blocks

    postDiv_s =
      '<div>'

    const id_s =
      F_o
        .slug__s( header_s )

    anchor_s =
      `<a id="${id_s}"></a>`
  }


    return (
      [
        replaced_s,
        `${anteDiv_s}${anchor_s}<h${level_s}>${header_s}</h${level_s}>${postDiv_s}`
      ]
    )
  }


module
  .exports =
  {
    extend__v:
      () =>
      {
        token_s =
          'header'

        //!!! no change to M_o.header__re

        PRE_o
          .extend__v
          (
            {
              process_s: token_s,
              process_f: header__a
            }
          )
      }
  }
