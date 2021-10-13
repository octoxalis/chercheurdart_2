const IDE_o =
{  
  //: Uncompress an array of integer from an ArrayBuffer, return the array.
  decompress__a:
  (
    abuf_a
  ) =>
  {
    const array_a = [] // The size of the output is not yet known.
  
    const int_a =
      new Int8Array( abuf_a )
  
    const end_n =
      int_a
        .length
  
    let at_n = 0
  
    while
    (
      end_n
      >
      at_n
    )
    {
      let byte_n =
        int_a[at_n++]
  
      var int_n =
        byte_n & 0x7F
  
      if ( byte_n >= 0 )
      {
        array_a
          .push( int_n )
  
        continue
      }
  
      byte_n = int_a[at_n++]
  
      int_n |= (byte_n & 0x7F) << 7
  
      if ( byte_n >= 0 ) {
        array_a
          .push( int_n )
  
        continue
      }
  
      byte_n = int_a[at_n++]
  
      int_n |= (byte_n & 0x7F) << 14
  
      if ( byte_n >= 0 )
      {
        array_a
          .push( int_n )
  
        continue
      }
  
      byte_n = int_a[at_n++]
  
      int_n |= (byte_n & 0x7F) << 21
  
      if ( byte_n >= 0 )
      {
        array_a
          .push( int_n )
  
        continue
      }
  
      byte_n = int_a[at_n++]
  
      int_n |= byte_n << 28
  
      int_n >>>= 0; // make positive
  
      array_a
        .push( int_n )
    }
  
    return array_a
  }
  ,



  read__s:
  (
    path_s
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
        buffer_s =>
        {
          ;console
            .log
            (
              IDE_o
                .decompress__a( buffer_s )
            )
        }
      )
      .catch
      (
        error_o =>
          console.error( error_o )
      )
  }
  ,
}



void function
()
{
  console.time( 'icompress' )

  IDE_o
    .read__s( '/assets/bin/icompress.bin' )

  console.timeEnd( 'icompress' )
}()

