const FS_o  = require( 'fs-extra' )
const KS_o  = require( 'klaw-sync' )
const SHA_o = require('sharp')

const C_o =   require( '../../make/data/C_o.js' )
const F_o =   require( '../../make/data/F_o.js' )
const REX_o = require( '../../make/lib/regex.js' )
const IOR_o = require( '../../make/lib/ior.js' )



const RGB_H__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const min__n =
    Math
      .min( r_n, g_n, b_n )

  const max__n =
    Math
      .max( r_n, g_n, b_n )

  if
  (
    max__n === min__n
  )
  {
    return 0 // achromatic
  }

  const max_min_n =
    max__n - min__n

  const h_n =
    max__n === r_n
    ?
      ( (g_n - b_n) / max_min_n )
      +
      ( g_n < b_n ? 6 : 0 )
    :
      max__n === g_n
      ?
        ( (b_n - r_n) / max_min_n ) + 2
      :
        ( (r_n - g_n) / max_min_n ) + 4

  return ~~(
    h_n * 60
  )
}




const RGB_L__n =
(
  r_n,
  g_n,
  b_n
) =>
  ( Math.min( r_n, g_n, b_n ) + Math.max( r_n, g_n, b_n ) )  / 510





const IMG_o =
{
  inputDir_s:  `source/ware/${C_o.IMG_DIR_s}`,
  outputDir_s: `source/ware/static/${C_o.IMG_DIR_s}`,
  



  load__a: async function
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
      let capacity_n = 0;
      capacity_n < buffer_a.length;
      capacity_n += 4
    )
    {
      r_n =
        buffer_a[capacity_n]
    
      g_n =
        buffer_a[capacity_n + 1]
    
      b_n =
        buffer_a[capacity_n + 2]
    
      let hue_n =
        RGB_H__n
        (
          r_n,
          g_n,
          b_n
        )
    
      hue_a
        [hue_n]
          .push( capacity_n )              // : imageData pointer
    
      hueLookup_a
        [hue_n] += 1
    
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
          .push( capacity_n )  // : idem
    
      lumLookup_a
        [lum_n] += 1
    }
    
    return (
      IMG_o
        .concat__a
        (
          [
            hueLookup_a,
            hue_a
              .flat(),
            lumLookup_a,
            lum_a
              .flat()
          ]
        )
    )
  }
  ,




  concat__a:
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
    buffer_a
  ) =>
    FS_o
      .writeFile
      (
        dest_s,
        buffer_a,
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




  create__v: async function
  (
    ior_o
  )
  {
    const src_s =
      IMG_o
        .path__s
        (
          IMG_o
            .inputDir_s,
          ior_o
            .id_s,
          C_o
            .IMG_DEFAULT_a
        )

    const dest_s =
      IMG_o
        .path__s
        (
          IMG_o
            .outputDir_s,
          ior_o
            .id_s,
          C_o
            .SCAN_DEFAULT_a
        )

    const data_o =
      await IMG_o
        .load__a
        (
          src_s,
          dest_s
        )

    if
    (
      ! data_o
    )
    {
      return    //>
    }

    const scan_a =
      IMG_o
        .scan__a
        (
          new Uint8ClampedArray
          ( 
            data_o
              .buffer
          )
        )

    //..................................
    ;console.log( scan_a )
    return
    IMG_o
      .write__v
      (
        dest_s,
        scan_a
      )
  }
  ,

}






void function
()
{
  const s_re =
    REX_o
      .new__re( 's' )

  const file_a =
    KS_o
    (
      IMG_o.inputDir_s,
      {
        nodir: true,
        depthLimit: -1    //: unlimited
      }
    )

  for
  (
    const file_o
    of
    file_a
  )
  {
    const path_a =
      file_o
        .path
          .match
          (
            s_re
            `\/img\/       //: img dir
            ([^\\/]+?)     //: id dir
            \/full\/`      //: full dir
          )

    IMG_o
      .create__v
      (
        IOR_o
          .ior__o( path_a[1] )    //: img id
      )
  }
}()
