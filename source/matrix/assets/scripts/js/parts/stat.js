//=== stat.js
const STAT_o =
{

}



void function    //!!! TEST SCAN
()
{
  console.time( `test_scan` )

  READ_o
    .read__s
    (
      '/assets/media/img/1586_de¯coster-new¯york_sothebys-1625_young¯woman/full/max/0/scan.bin',
      buffer_a =>         //: callback_f( ArrayBuffer )
      {
        ;console.log( `${Object.getPrototypeOf( buffer_a )} : ${buffer_a.byteLength}` )

        const scan_o =
          SCAN_o
            .scan__o( buffer_a )
      }
    )

  console.timeEnd( `test_scan` )    //: ~1.2 ms

  //: [object ArrayBuffer] buffer_a: 632181,4,66,11,269,299,153,143,206,636,4580,422,99117,1166,1009,3772
}()
