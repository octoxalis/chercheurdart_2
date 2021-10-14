const KS_o  = require( 'klaw-sync' )
const SHA_o = require('sharp')

const REX_o = require( '../../make/lib/regex.js' )
const IOR_o = require( '../../make/lib/ior.js' )

const C_o =   require( '../../make/data/C_o.js' )
const I_o =   require( '../../make/data/I_o.js' )
const F_o =   require( '../../make/data/F_o.js' )








const IMG_o =
{
  inputDir_s:  `${C_o.WARE_DIR_s}${C_o.IMG_DIR_s}`,
  outputDir_s: `${C_o.WARE_DIR_s}static/${C_o.IMG_DIR_s}`,




  dimension__a:
  (
    width_n,      //: full size img width
    height_n,     //:               heigh
    size_n        //: target height size or ratio
  ) =>
  {
    let ratio_n =
      size_n > 1
      ?
        size_n / height_n
      :
        size_n

    return (
        [
          ~~( width_n  * ratio_n ),       //: integer
          ~~( height_n * ratio_n )        //: integer
        ] 
      )
  }
  ,




  image__v: async function
  (
    ior_o
  )
  {
    let src_s =
      `${IMG_o.inputDir_s}${ior_o.id_s}/`
      + I_o
          .IMG_DEFAULT_a
            .slice( 0, -1 )    // skip format
            .join( '/' )
      + '.'
      + I_o
          .IMG_DEFAULT_a
            .slice( -1 )    // add format after dot
      
    for
    (
      size_n
      of
      I_o
        .IMG_SIZE_a
    )
    {
      let sharp_o =
        SHA_o( src_s )
  
      await sharp_o
        .metadata()
        .then
        (
          meta_o =>
          {
            let size_a =
              IMG_o
                .dimension__a
                  (
                    meta_o
                      .width,
                    meta_o
                      .height,
                    size_n
                  )
  
            let size_s,
              quality_s
  
            if
            (
              size_n
              >
              1
            )
            {
              size_s =
              `_${size_a[1]}`    //: height
  
              quality_s =
                'gray'
            }
            else
            {
              size_s =
                'max'
  
              quality_s =
                'color'
            }
  
            let dest_s =
              `${IMG_o.outputDir_s}${ior_o.id_s}/${ior_o.region}/${size_s}/0/`
  
            if
            (
              F_o
                .exist__b( dest_s )
            )
            {
              console.log( `Already there:\t${dest_s}` )
            }
            else
            {
              F_o
                .mkDir__b( dest_s )
  
              dest_s +=
                `${quality_s}.${ior_o.format}`
  
              console.log( `To write:\t${dest_s}` )
  
              if
              (
                size_s
                !==
                'max'
              )
              {
                sharp_o =
                  sharp_o
                    .resize( ...size_a )
              }
  
              if
              (
                quality_s
                ===
                'gray'
              )
              {
                sharp_o =
                  sharp_o
                    .grayscale()
              }
          
              sharp_o
                .toFile
                  (
                    dest_s,
                    err_o => console.log( err_o )
                  )
            }
          }
        )
    }
  }
,  

}




void async function
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

    await IMG_o
      .image__v
      (
        IOR_o
          .ior__o( path_a[1] )    //: img id
      )
  }
}()
