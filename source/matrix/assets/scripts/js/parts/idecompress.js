module.exports =
//: Uncompress an array of integer from an ArrayBuffer, return the array.
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
