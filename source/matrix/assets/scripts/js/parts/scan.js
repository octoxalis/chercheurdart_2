//=== scan.js
const SCAN_o =
{
  eval__a:
  (
    buffer_a
  ) =>
  {
    let offset_n = 0

    let length_n = 360

    let scan_o = new Objet()

    scan_o
      .hueLookup_a =
        new Int32Array
        (
          buffer_a,
          offset_n,
          length_n
        )
    
    offset_n +=
      length_n

    scan_o
      .hue_a =
        new Int32Array
        (
          buffer_a,
          360,
          length
        )

    scan_o
      .satLookup_a

    scan_o
      .sat_a
     
    scan_o
      .lumLookup_a

    scan_o
      .lum_a
  }
  ,
}





void function
()
{
}()

