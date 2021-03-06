const REX_o =
  require( './regex.js' )

const PRE_o =
  require( './2mark.js' )

const M_o =
  require( '../data/M_o.js' )

  const C_o =
  require( '../data/C_o.js' )

const BLOCK_OPEN_s =  '\\['
const BLOCK_CLOSE_s = '\\]'
const BLOCK_SEPAR_s = ':'



const block_ins__a =
match_a =>    //: block_ins__a
{
  const
    [
      replaced_s,
      type_s,
      key_s,
      value_s
    ] =
      match_a

  const val_s =
    PRE_o
      .process__s
        (
          value_s
            .replaceAll
            (
              '\n',
              C_o
                .INS_VAL_DELIM_s
            )
        )

  return (
    [
      replaced_s,
      `${C_o.INS_OPEN_s}${type_s}${C_o.INS_DELIM_s}${key_s}${C_o.INS_DELIM_s}${val_s}${C_o.INS_CLOSE_s}`
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
          'block_ins'

        M_o
          .extend__v
          (
            {
              regex_s: token_s,
              regex_f: 
                REX_o
                  .new__re( 'gm' )    //: block_ins__re
`
^
${BLOCK_OPEN_s}{2}
(
[₀-₉]{1,3}    //: specifier_s
)
\s+?
(
[^${BLOCK_SEPAR_s}]+?
)
${BLOCK_SEPAR_s}{2}
\s+?
(
[^${BLOCK_CLOSE_s}]+?     //: value_s
)
\s*?
${BLOCK_CLOSE_s}{2}                  //!!! MUST NOT end on a new line
$`
            }
          )

        PRE_o
          .extend__v
          (
            {
              process_s: token_s,
              process_f: block_ins__a
            }
          )
      }
  }
