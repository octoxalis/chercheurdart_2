const FS_o  = require( 'fs-extra' )
const KS_o  = require( 'klaw-sync' )

const C_o =   require( '../data/C_o.js' )
const T_o =   require( '../data/T_o.js' )


const TAB_o =
{
  write__v:
  (
    file_s,
    ins_s
  ) =>
  {
    const path_s =
      C_o
        .ADOC_PARTS_DIR_s
      + `${file_s}.${C_o.MACRO_INSERT_s}`

    const macro_s =
      `${C_o.MACRO_INSERT_s}:${C_o.INS_TAB_s}`
      + `[${C_o.MACRO_SUB_s}=${ins_s}]`


    FS_o
      .writeFile
      (
        path_s,
        macro_s,
        'utf8',
        out_o =>    //: callback_f
          {
            const out_s =
              out_o
              ?
                'ERROR'
              :
                'OK'

            console
              .log( `\n----\nWriting ${path_s}: (${out_s})\n----\n` )
          }
      )
  }
  ,




  sub__s:
  (
    file_s,
    json_s
  ) =>
  {
    const json_a =
      JSON
        .parse( json_s )

    const title_a = []

    let table_s = ''

    let width_s = ''
    
    let align_s = ''
  
    let row_a

    let row_n = 0

    for
    (
      let row_o
      of
      json_a
    )
    {
      row_a = []

      for
      (
        prop_s
        in
        row_o
      )
      {
        if
        (
          row_n
          ===
          0
        )
        {
          title_a
            .push( prop_s )
        }

        row_a
          .push
          (
            row_o[prop_s]
          )
      }

      table_s +=
        row_a
          .join( C_o.CELL_DELIM_s )
      
      if
      (
        row_n
        <
        json_a
          .length - 1
      )
      {
        table_s +=
          C_o
            .BREAK_DELIM_s
      }

      if
      (
        row_n
        ===
        0
      )
      {
        if
        (
          T_o
            [`${file_s}_o`]
        )
        {
          width_s =
            T_o
              [`${file_s}_o`]
                ?.width_s

          align_s =
            T_o
              [`${file_s}_o`]
                ?.align_s
        }

        if
          (
            ! width_s
          )
          {
            width_s =
              TAB_o
                .width__s( row_a )
          }

        if
          (
            ! align_s
          )
          {
            align_s =
              TAB_o
                .align__s( row_a )
          }
      }

      ++row_n
    }

    return (
      width_s
      + C_o
          .BREAK_DELIM_s
      + align_s
      + C_o
          .BREAK_DELIM_s
      + title_a
          .join( C_o.CELL_DELIM_s )
      + C_o
          .BREAK_DELIM_s
      + table_s
      )
  }
  ,




  width__s:
  (
    row_a
  ) =>
  {
    let row_n =
      row_a
        .length

    const cell_s =
      ''
      +
      Math
        .ceil
        (
          100
          /
          row_n
        )

    let width_s = ''

    while
    (
      row_n
      >
      0
    )
    {
      width_s +=
        `${cell_s}_`

      --row_n
    }

    return (
      width_s
        .slice
        (
          0,
          -1      //: skip last '_'
        )
    )
  }
  ,



  align__s:
  (
    row_a
  ) =>
  {
    let row_n =
      row_a
        .length

    const cell_s = 0      //: default is left

    let align_s = ''

    while
    (
      row_n
      >
      0
    )
    {
      align_s +=
        `${cell_s}_`

      --row_n
    }

    return (
      align_s
        .slice
        (
          0,
          -1      //: skip last '_'
        )
    )
  }
  ,



}



void function
()
{
  const file_a =
    KS_o
    (
      C_o.TABLE_INPUT_PATH_s,
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
    const file_s =
      file_o
        .path
        .slice
        (
          file_o
            .path
            .lastIndexOf( '/' ) + 1,      //: skip '/'
          -'.json'
            .length                       //: skip '.json'
        )
    FS_o
      .readFile
      (
        file_o
          .path,
        'utf8' ,
        (            //: callback_f
          error_o,
          json_s
        ) =>
        {
          if
          (
            error_o
          )
          {
            return void (
              console
                .log( error_o )
            )
          }
          //>
          TAB_o
            .write__v
            (
              file_s,
              TAB_o
                .sub__s
                (
                  file_s,
                  json_s
                )
              )
        }
      )
  }
}()
