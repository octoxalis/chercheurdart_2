const STR_o = require( './string.js' )



const NUM_o =
{
  rangeFromFloat__s:
  (
    number_n,
    pad_n
  ) =>
  {
    if
    (
      Number
        .isInteger( number_n )
    )
    {
      return number_n
    }

    const low_n =
      Math
        .trunc( number_n )

    const fraction_n =
      number_n
      -
      low_n

    const high_n =
      Math
        .trunc
        (
          low_n
          +
          (
            fraction_n
            *
            10
          )
        )
    
    return (
      low_n//.toString()
      +
      '\u00A0\u2014\u00A0'  //non brakable space, em dash
      +
      high_n//.toString()
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
