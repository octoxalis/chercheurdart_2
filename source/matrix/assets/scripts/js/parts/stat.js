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
      '/assets/media/img/1586_de¯coster-new¯york_sothebys-1625_young¯woman/full/max/0/{{C_o.SCAN_FILE_s}}',
      buffer_a =>         //: callback_f( ArrayBuffer )
      {
        const scan_o =
          eval( buffer_a )    //!!! eval not JSON.parse !!!
        
        //;console.log( scan_o )
      }
    )

  console.timeEnd( `test_scan` )    //: ~1.2 ms
}()
