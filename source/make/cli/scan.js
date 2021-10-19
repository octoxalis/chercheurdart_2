const FS_o  = require( 'fs-extra' )
const KS_o  = require( 'klaw-sync' )
const SHA_o = require('sharp')

const REX_o = require( '../../make/lib/regex.js' )
const IOR_o = require( '../../make/lib/ior.js' )
//|| const ICO_o = require( './icompress.js' )  //: compression gain < 8%
const C_o =   require( '../../make/data/C_o.js' )
const I_o =   require( '../../make/data/I_o.js' )
const F_o =   require( '../../make/data/F_o.js' )



const RGB_H__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const min_n =
    Math
      .min( r_n, g_n, b_n )

  const max_n =
    Math
      .max( r_n, g_n, b_n )

  if
  (
    max_n === min_n
  )
  {
    return 0 // achromatic
  }

  const max_min_n =
    max_n - min_n

  const h_n =
    max_n === r_n
    ?
      ( (g_n - b_n) / max_min_n )
      +
      ( g_n < b_n ? 6 : 0 )
    :
      max_n === g_n
      ?
        ( (b_n - r_n) / max_min_n ) + 2
      :
        ( (r_n - g_n) / max_min_n ) + 4

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
  const min_n =
    Math.min( r_n, g_n, b_n )

  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const max_min_n =
    max_n - min_n

  if
  (
    ! max_min_n
  )
  {
    return 0 // achromatic
  }

  const min_max =
    min_n
    +
    max_n

  return (
    min_max > 255
    ?
      max_min_n / ( 510 - max_n - min_n )
    :
      max_min_n / min_max
  )
}




const RGB_L__n =
(
  r_n,
  g_n,
  b_n
) =>
  ( Math.min( r_n, g_n, b_n ) + Math.max( r_n, g_n, b_n ) )  / 510




const SCAN_o =
{
  inputDir_s:  `${C_o.WARE_DIR_s}${C_o.IMG_DIR_s}`,
  outputDir_s: `${C_o.WARE_DIR_s}static/${C_o.IMG_DIR_s}`,
  


  create__v: async function
  (
    ior_o
  )
  {
    const src_s =
      SCAN_o
        .path__s
        (
          SCAN_o
            .inputDir_s,
          ior_o
            .id_s,
          I_o
            .IMG_DEFAULT_a
        )

    const dest_s =
      SCAN_o
        .path__s
        (
          SCAN_o
            .outputDir_s,
          ior_o
            .id_s,
          I_o
            .SCAN_DEFAULT_a
        )

    const data_o =
      await SCAN_o
        .data__a
        (
          src_s,
          dest_s
        )

    if
    (
      data_o
    )
    {
      const scan_a =
        SCAN_o
          .scan__a
          (
            new Uint8ClampedArray
            ( 
              data_o
                .buffer
            )
          )

      SCAN_o
        .write__v
        (
          dest_s,
          //|| scan_a
          ICO_o
            .compress__a( scan_a )
    
        )
    }
  }
  ,



  data__a: async function
  (
    src_s,
    dest_s
  )
  {
    return (
      F_o
        .exist__b( dest_s )
      ?
        void console.log( `Already there:\t${dest_s}` )
      :
        await SHA_o( src_s )
          .raw()
          .toBuffer()
    )
  }
  ,



  /*
  Uint32Array view:
    [
      hueLookup_a[360], hue_a[360][...]
      satLookup_a[101], sat_a[101][...]
      lumLookup_a[101], lum_a[101][...]
    ]
  */
  scan__a:
  (
    buffer_a
  ) =>
  {
    let capacity_n = 360  //: 0-359
    
    const hue_a =
      new Array( capacity_n )
    
    const hueLookup_a =
      new Array( capacity_n )
    
    while
    (
      --capacity_n >= 0
    )
    {
      hue_a
        [capacity_n] = []
      hueLookup_a
        [capacity_n] = 0
    }
    
    capacity_n = 101  //: 0-100
    
    const sat_a =
      new Array( capacity_n )
    
    const satLookup_a =
      new Array( capacity_n )
    
    while
    (
      --capacity_n >= 0
    )
    {
      sat_a
        [capacity_n] = []
      satLookup_a
        [capacity_n] = 0
    }
    
    capacity_n = 101  //: 0-100
    
    const lum_a =
      new Array( capacity_n )
    
    const lumLookup_a =
      new Array( capacity_n )
    
    while
    (
      --capacity_n >= 0
    )
    {
      lum_a
        [capacity_n] = []
      lumLookup_a
        [capacity_n] = 0
    }
    
    let r_n,
        g_n,
        b_n
    
    for
    (
      let at_n = 0;              // : imageData pointer
      at_n < buffer_a.length;
      at_n += 4
    )
    {
      r_n =
        buffer_a
          [at_n]
    
      g_n =
        buffer_a
          [at_n + 1]
    
      b_n =
        buffer_a
          [at_n + 2]
    
      let hue_n =
        RGB_H__n
        (
          r_n,
          g_n,
          b_n
        )
    
      hue_a
        [hue_n]
          .push( at_n )
    
      hueLookup_a
        [hue_n] += 1
    
      let sat_n =
        ~~( RGB_S__n
        (
          r_n,
          g_n,
          b_n
        )
        *
        100 )
    
      sat_a
        [sat_n]
          .push( at_n )
    
      satLookup_a
        [sat_n] += 1

      let lum_n =
        ~~( RGB_L__n
        (
          r_n,
          g_n,
          b_n
        )
        *
        100 )
    
      lum_a
        [lum_n]
          .push( at_n )
    
      lumLookup_a
        [lum_n] += 1
    }
    
    //;console.log( hueLookup_a )

    return (
      SCAN_o
        .view__a
        (
          [
            hueLookup_a,
            hue_a
              .flat(),
            satLookup_a,
            sat_a
              .flat(),
            lumLookup_a,
            lum_a
              .flat()
          ]
        )
    )
  }
  ,



  view__a:
  (
    arg_a
  ) =>
  {
    let size_n = 0

    for
    (
      const array_a
      of
      arg_a
    )
    {
      size_n +=
        array_a
          .length
    }

    //;console.log( size_n )

    const buffer_a =
      new ArrayBuffer
      (
        size_n
        *
        Uint32Array
          .BYTES_PER_ELEMENT
      )
  
    const view_a =
      new Uint32Array( buffer_a )

    let at_n = 0

    for
    (
      const array_a
      of
      arg_a
    )
    {
      for
      (
        const unit_n
        of
        array_a
      )
      {
        view_a
          [at_n++] =
            unit_n
      }
    }

    return view_a
  }
  ,



  write__v:
  (
    dest_s,
    view_a
  ) =>
    FS_o
      .writeFile
      (
        dest_s,
        view_a,
        'utf8',
        out_o => console.log( `-- Writing ${dest_s}: ${out_o}` )
      )
  ,



  path__s:
  (
    dir_s,
    id_s,
    default_a
  ) =>
    `${dir_s}${id_s}/`
    + default_a
        .slice( 0, -1 )    // skip format
        .join( '/' )
    + '.'
    + default_a
        .slice( -1 )    // add format after dot
  ,




}






void function
()
{
  for
  (
    const file_o
    of
    KS_o
    (
      SCAN_o
        .inputDir_s,
      {
        nodir: true,
        depthLimit: -1    //: unlimited
      }
    )
  )
  {
    const path_a =
      file_o
        .path
          .match
          (
            REX_o
              .new__re( 's' )
                `\/img\/       //: img dir
                ([^\\/]+?)     //: id dir
                \/full\/`      //: full dir
          )

    path_a
    &&
    SCAN_o
      .create__v
      (
        IOR_o
          .ior__o
          (
            path_a[1]    //: img id
          )
      )
  }
}()
