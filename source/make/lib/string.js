const STR_o =
{
  UNICODE_o:       //: lookup tables to for subscript Unicode values [0-9] <--> [₀-₉]
  {
    plain_a: [ '\u0030', '\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039' ],
    sub_a:   [ '\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089' ]
  }
  ,



  quoteEsc__s:
  (
    string_s
  ) =>
    string_s.replace( /(['"])/g, '\$1' )

,



  escape__s:
  (
    string_s
  ) =>
  string_s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&')
,



  subscript__s:
  (
    code_s,
    subscript_b=true    //: target is subscript [\u0030-\u0039] --> [\u2080-\u2089]
  ) =>
  {
    let from_s =
      'plain_a'

    let to_s =
      'sub_a'

    if ( ! subscript_b )
    {
      from_s =
        'sub_a'
      to_s =
        'plain_a'
    }

    const from_a =
      STR_o
        .UNICODE_o
          [from_s]

    const to_a =
      STR_o
        .UNICODE_o
          [to_s]

    for
    ( 
      let at_n = 0;
      at_n < 10;
      ++at_n
    )
    {
      code_s =
        code_s
          .replaceAll
          (
            from_a[at_n],
            to_a[at_n],
          )
    }
    return code_s
  }
  ,


}



module.exports = STR_o
