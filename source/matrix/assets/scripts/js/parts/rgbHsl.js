const RGB_H__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const min_n =
    Math
      .min( r_n, g_n, b_n )

  if
  (
    max_n
    ===
    min_n
  )
  {
    return 0 // achromatic
  }

  const deltaSub_n =
    max_n
    -
    min_n

  const h_n =
    max_n === r_n
    ?
      ( (g_n - b_n) / deltaSub_n )
      +
      ( g_n < b_n ? 6 : 0 )
    :
      max_n === g_n
      ?
        ( (b_n - r_n) / deltaSub_n ) + 2
      :
        ( (r_n - g_n) / deltaSub_n ) + 4

  return ~~(
    h_n * 60
  )
}



const RGB_S__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const min_n =
    Math.min( r_n, g_n, b_n )

  const deltaSub_n =
    max_n
    -
    min_n

  if
  (
    ! deltaSub_n
  )
  {
    return 0 // achromatic
  }

  const deltaAdd_n =
    min_n
    +
    max_n

  return (
    deltaAdd_n > 255
    ?
      deltaSub_n / ( 510 - deltaSub_n )
    :
      deltaSub_n / deltaAdd_n
  )
}



const RGB_L__n =
(
  r_n,
  g_n,
  b_n
) =>
( Math
    .min( r_n, g_n, b_n )
  +
  Math
    .max( r_n, g_n, b_n )
)
/
510
