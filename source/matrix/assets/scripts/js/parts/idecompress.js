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



  read__s:
  (
    path_s,
    callback_f
  ) =>
  {
    fetch
    (
      path_s
    )
      .then
      (
        response_o =>
        {
          if
          (
            response_o
              .ok
          )
          {
            return (
              response_o
                .arrayBuffer()
            )
          }
          
          throw new Error ( `${response_o.status}: ${response_o.statusText}` )
          
          return ''
        }
      )
      .then
      (
        buffer_a =>
        {
          callback_f
          (
            IDE_o
              .decompress__a( buffer_a )
          )
        }
      )
      .catch
      (
        error_o =>
          console
            .error( error_o )
      )
  }
  ,



}



const process__v =    //: TEST function
(
  buffer_a
) =>
{
  console
    .log
    (
      buffer_a
    )
}




void function
()
{
  const REPEAT_n = 1

  console.time( `decompress_${REPEAT_n}` )

  for
  (
    let at_n = 0;
    at_n < REPEAT_n;
    ++at_n
  )
  {
      IDE_o
        .read__s
        (
          '/assets/bin/icompress.bin',
          process__v
        )
  }

  console.timeEnd( `decompress_${REPEAT_n}` )
}()

