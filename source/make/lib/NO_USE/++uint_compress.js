const UVB_o =
{
//: Compress an unsigned Integer Array to Array buffer
  compress__a:
  (
    uint32_a
  ) =>
  {
    let capacity_n = 0

    for
    (
      unit_n
      of
      uint32_a
    )
    {
      capacity_n +=
        unit_n < ( 1 << 7 )
        ?
          1
        :
          unit_n < ( 1 << 14 )
          ?
            2
          :
            unit_n < ( 1 << 21 )
            ?
              3
            :
              4      //: up to 31 bits wide
    }

    ;console.log( uint32_a.length )
    ;console.log( capacity_n )

    const buffer_a =
      new ArrayBuffer( capacity_n )
  
    const view_a =
      new Int8Array( buffer_a )
  
    let pos = 0
  
    for
    (
      let int8_n
      of
      uint32_a
    )
    {
      if
      (
        int8_n < ( 1 << 7 )
      )
      {
        view_a[pos++] =
          int8_n

        continue
      }
  
      if
      (
        int8_n < ( 1 << 14 )
      )
      {
        view_a[pos++] =
          ( int8_n & 0x7F ) | 0x80
  
        view_a[pos++] =
          int8_n >>> 7

        continue
      }
  
      if
      (
        int8_n < ( 1 << 21 )
      )
      {
        view_a[pos++] =
          ( int8_n & 0x7F ) | 0x80
  
        view_a[pos++] =
          ( ( int8_n >>> 7 ) & 0x7F ) | 0x80
  
        view_a[pos++] =
          int8_n >>> 14

        continue
      }
  
      if
      (
        int8_n < ( 1 << 28 )
      )
      {
        view_a[pos++] =
          ( int8_n & 0x7F ) | 0x80
  
        view_a[pos++] =
          ( ( int8_n >>> 7 ) & 0x7F ) | 0x80
  
        view_a[pos++] =
          ( ( int8_n >>> 14 ) & 0x7F ) | 0x80
  
        view_a[pos++] =
          int8_n >>> 21

        continue
      }
  
      view_a[pos++] =
        ( int8_n & 0x7F ) | 0x80
  
      view_a[pos++] =
        ( ( int8_n >>> 7) & 0x7F ) | 0x80
  
      view_a[pos++] =
        ( ( int8_n >>> 14) & 0x7F ) | 0x80
  
      view_a[pos++] =
        ( ( int8_n >>> 21) & 0x7F ) | 0x80
  
      view_a[pos++] =
        int8_n >>> 28
    }
  
    return view_a
  }
  ,

}




module.exports = UVB_o
