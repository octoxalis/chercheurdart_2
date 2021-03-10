const UVB_o =
{
//: Uncompress ArrayBuffer to 32 bits Integer Array
//: Return the array
  uncompress__a:
  (
    buffer_a    //: ArrayBuffer
  ) =>
  {
    const int32_a = [] //: output size is not yet known
  
    const view_a =
      new Int8Array( buffer_a )
  
    const count_n =
      view_a
        .length
  
    let at_n = 0
  
    while
    (
      count_n > at_n
    )
    {
      let int8_n =
        view_a
          [at_n++]
  
      let shift8_n =
        int8_n & 0x7F
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( shift8_n )
  
        continue
      }
  
      int8_n =
        view_a
          [at_n++]
  
      shift8_n |=
        ( int8_n & 0x7F ) << 7
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( shift8_n )
  
        continue
      }
  
      int8_n =
        view_a
          [at_n++]
  
      shift8_n |=
        ( int8_n & 0x7F ) << 14
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( shift8_n )
  
        continue
      }
  
      int8_n =
        view_a
          [at_n++]
  
      shift8_n |=
        ( int8_n & 0x7F ) << 21
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( shift8_n )
  
        continue
      }
  
      int8_n =
        view_a
          [at_n++]
  
      shift8_n |=
        int8_n << 28
  
      shift8_n >>>= 0 // make positive
  
      int32_a
        .push( shift8_n )
    }
  
    return int32_a
  }
  ,

}
