const FS_o  = require( 'fs-extra' )



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


  write__v:
  (
    path_s,
    abuf_a
  ) =>
  {
    FS_o
      .writeFile
      (
        path_s,
        new Buffer
              .from( abuf_a ),
        'utf8',
        error_o =>
        console
          .log( error_o ?? `-- Writing ${path_s}` )
      )
  }
  ,
}




//!!!! TEST ONLY
void function
()
{
  const big_a =
    //XX new Array( size_n )
    [
      0,    8,   12,   20,   24,   36,   44,   48,   56,   60,   68,
     72,   84,   96,  108,  112,  116,  120,  132,  140,  172,  200,
    204,  208,  216,  224,  228,  240,  248,  252,  264,  276,  280,
    284,  288,  296,  300,  312,  324,  332,  336,  340,  344,  348,
    356,  360,  372,  380,  404,  480,  492,  500,  504,  512,  516,
    532,  536,  592,  620,  680,  704,  764,  864,  868,  872,  876,
    884,  888,  892,  900,  908,  912,  916,  920,  924,  928,  932,
    936,  940,  944,  948,  952, 1048, 1052, 1172, 1228, 1340, 1392,
   1404, 1416, 1424, 1428, 1436, 1448, 1488, 1500, 1504, 1508, 1512,
   1520
   ]

  ;console.log( big_a )
  const big_s = JSON.stringify( big_a )
  const big_n = big_s.length

  const comp_a =
    ICO_o
      .compress__a( big_a )
    
  ;console.log( comp_a )
  const comp_n = comp_a.byteLength

  console.log( `\n===========\nRATIO ( ${comp_n}/${big_n} ): ${comp_n / big_n}\n===========\n` )

  ICO_o
    .write__v
    (
      'source/ware/static/assets/bin/icompress.bin',
      comp_a
    )
}()
