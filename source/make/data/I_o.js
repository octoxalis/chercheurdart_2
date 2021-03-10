/*
 * Image constants
 */
const CONF_o = require( '../../configure.js' )

const I_o =
{
  IMG_DEFAULT_a:  [ 'full', 'max', '0', 'color',   'jpeg' ],  //: region/size/rotation/quality/format
  SCAN_DEFAULT_a: [ 'full', 'max', '0', 'scan',    'bin' ],   //: idem
  IOR_DEFAULT_a:  [ 'full', 'max', '0', 'default', 'avif' ],  //: idem

  IOR_TRIPLE_a:
    [
      '/full/_128/0/gray.avif',
      '/full/_1024/0/gray.avif',
      '/full/max/0/color.avif',
    ],

  IMG_SIZE_a:
    [
      128,    //: height pixels
      1024,   //: height pixels
      1       //: height ratio
    ],


  IMG_SIZE_ALT_a:
    [
      'small size in grayscale',
      'medium size in grayscale',
      'full size in color'
    ],


}



module.exports = I_o
