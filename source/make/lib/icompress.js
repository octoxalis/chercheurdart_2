const ICO_o =
{
  compress__a:    //: Compress an Array of integers, return a compressed ArrayBuffer.
  (
    array_a
  ) =>
  {
    const end_n =
      array_a
        .length

    const abuf_a =
      new ArrayBuffer( ICO_o.size__n( array_a ) )

    const view_a =
      new Int8Array( abuf_a )

    let pos_n = 0

    for
    (
      let at_n = 0;
      at_n < end_n;
      ++at_n
    )
    {
      const int_n = array_a[at_n]

      if (int_n < (1 << 7)) {
        view_a[pos_n++] = int_n 
      } else if (int_n < (1 << 14)) {
        view_a[pos_n++] = (int_n & 0x7F) | 0x80
        view_a[pos_n++] = int_n >>> 7
      } else if (int_n < (1 << 21)) {
        view_a[pos_n++] = (int_n & 0x7F) | 0x80
        view_a[pos_n++] = ( (int_n >>> 7) & 0x7F ) | 0x80
        view_a[pos_n++] = int_n >>> 14
      } else if (int_n < (1 << 28)) {
        view_a[pos_n++] = (int_n & 0x7F ) | 0x80 
        view_a[pos_n++] = ( (int_n >>> 7) & 0x7F ) | 0x80
        view_a[pos_n++] = ( (int_n >>> 14) & 0x7F ) | 0x80
        view_a[pos_n++] = int_n >>> 21
      } else {
        view_a[pos_n++] = ( int_n & 0x7F ) | 0x80
        view_a[pos_n++] = ( (int_n >>> 7) & 0x7F ) | 0x80
        view_a[pos_n++] = ( (int_n >>> 14) & 0x7F ) | 0x80
        view_a[pos_n++] = ( (int_n >>> 21) & 0x7F ) | 0x80
        view_a[pos_n++] = int_n >>> 28
      }
    }
    
    return abuf_a
  }
  ,
    
  
  
  size__n:        //: Compute how many bytes an array of integers would use once compressed.
  (
    array_a
  ) =>
  {
    const end_n =
      array_a
        .length

    let size_n = 0

    for
    (
      let at_n = 0;
      at_n < end_n;
      ++at_n
    )
    {
      const int_n =
        array_a[at_n]

      size_n +=
        int_n < (1 << 7)
        ?
          1
        :
          int_n < (1 << 14)
          ?
            2
          :
            int_n < (1 << 21)
            ?
             3
             :
               int_n < (1 << 28)
               ?
                4
              :
               5
    }
    
    return size_n
  }
  ,
}
