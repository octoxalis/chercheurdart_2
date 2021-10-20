const FS_o  = require( 'fs-extra' )

const WRI_o =
{
  toFile__v:
  (
    dest_s,
    buffer_s,        //: ArrayBuffer
    format_s='utf8'
  ) =>
  {
    ;console.log( `buffer_s.length: ${buffer_s.length}` )

    FS_o
      .writeFile
      (
        dest_s,
        buffer_s,
        format_s,
        out_o => console.log( `-- Writing ${dest_s}: ${out_o}` )
      )
  }
}

module.exports = WRI_o
