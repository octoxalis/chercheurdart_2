//-- const REX_o =
//--   require( './regex.js' )

const PRE_o =
  require( './3mark.js' )

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

  let anteDiv = ''

  let postDiv = ''

  if
  (
    +level_s
    ===
    2
  )
  {
    anteDiv =
      '</div><hr>'    //: horizontal line after h2 blocks
    postDiv =
      '<div>'
  }


    return (
      [
        replaced_s,
        `${anteDiv}<h${level_s}>${header_s}</h${level_s}>${postDiv}`
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
