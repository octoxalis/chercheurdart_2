//=== stat.js











void function    //!!! TEST SCAN DECPMPRESSION
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
    READ_o
      .read__s
      (
        '/assets/media/img/1586_de¯coster-new¯york_sothebys-1625_young¯woman/full/max/0/scan.bin-comp',
        buffer_a =>         //: callback_f
        {
          console
            .log
            (
              `${Object.getPrototypeOf( buffer_a )} buffer_a: `
              +
              IDE_o
                .decompress__a( buffer_a )
                .slice
                (
                  0,
                  64
                )
            )
        }
      )
  }

  console.timeEnd( `decompress_${REPEAT_n}` )    //: ~1.2 ms

  //: [
  //:   632181,     4,   66,    11,  269,   299,    153,  143,   206,
  //:      636,  4580,  422, 99117, 1166,  1009,   3772, 9115,  3558,
  //:     4364,  4071, 4175, 10376, 6544,  4335,   5080, 9600, 49635,
  //:     6384,  8788, 3832, 10223, 3218, 12290,   3972, 4353,  3598,
  //:     2809, 31469, 1889,   963, 9837,  2109,   1766, 1010,   563,
  //:      995,   291,   53,  2248,   71,  2315,    211,   71,    36,
  //:       34,    19,   31,    18,    8,     1, 116346,    2,     4,
  //:       12,    20,   11,    19,  131,    16,   2053,   28,     4,
  //:     1342,    18,    0,  1528,   21,    18,     14,    1,   248,
  //:        9,    24,    5,   381,  268,    38,     20,    9,     1,
  //:     7321,     5,   26,    52,   25,    21,    296,   38,    32,
  //:        3,
  //:   ... 260 more items
  //: ]
}()
