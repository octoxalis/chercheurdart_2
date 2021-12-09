//=== decompress.js
const IDE_o =
{  
  //: Uncompress an array of integer from an ArrayBuffer, return the array.
  decompress__a:
  (
    abuf_a
  ) =>
  {
    const int32_a = [] // The size of the output is not yet known.
  
    const int8_a =
      new Int8Array( abuf_a )
  
    const end_n =
      int8_a
        .length
  
    let at_n = 0
  
    while
    (
      end_n
      >
      at_n
    )
    {
      let int8_n =
        int8_a[at_n++]
  
      var int32_n =
        int8_n & 0x7F
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( int32_n )
  
        continue
      }
  
      int8_n = int8_a[at_n++]
  
      int32_n |= (int8_n & 0x7F) << 7
  
      if ( int8_n >= 0 ) {
        int32_a
          .push( int32_n )
  
        continue
      }
  
      int8_n = int8_a[at_n++]
  
      int32_n |= (int8_n & 0x7F) << 14
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( int32_n )
  
        continue
      }
  
      int8_n = int8_a[at_n++]
  
      int32_n |= (int8_n & 0x7F) << 21
  
      if ( int8_n >= 0 )
      {
        int32_a
          .push( int32_n )
  
        continue
      }
  
      int8_n = int8_a[at_n++]
  
      int32_n |= int8_n << 28
  
      int32_n >>>= 0; // make positive
  
      int32_a
        .push( int32_n )
    }
  
    return int32_a
  }
  ,
}
