const STR_o = require( './string.js' )



const NUM_o =
{
  floatToRange__s:
  (
    number_n,
    pad_n
  ) =>
  {
    return (
      Number
        .isInteger( number_n )
      ?
        number_n
      :

        Number
          .parseFloat( number_n )
          .toFixed( pad_n )
          .replace
          (
            '.',
            '\u00A0\u2014\u00A0'
          )
    )
  }
  ,



  decimalSub__s:
  (
    number_n
  ) =>
    Number
      .isInteger( number_n )
    ?
      ''+number_n    //: cast to String
    :
      Math.trunc( number_n )    //: cast to String
      +
      STR_o
        .subscript__s
        (
          number_n
            .toString()
            .split( '.' )
            [1]
        )
  ,

}



module.exports = NUM_o
