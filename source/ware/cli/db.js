const KS_o  = require( 'klaw-sync' )
const FS_o  = require( 'fs-extra' )


const DB_o =
{
  json__s:
  (
    dir_s
  ) =>
  {
    const file_a =
      KS_o
      (
        `./${dir_s}`,
        {nodir: true}
      )

    const json_o = new Object()

    for
    (
      const file_o
      of
      file_a
    )
    {
      const path_s =    //: 1703_boucher-princeton_university-1748_arion.js
        file_o
          .path

      const mod_o =
        require
        (
          `${path_s}`
        )

      const id_s =    //: 1703_boucher-princeton_university-1748_arion
        path_s
          .substring  //: file name without 'js'
          (
            path_s
              .lastIndexOf( '/' ) + 1
          )
          .split( '.' )
            [0]
      
      json_o
        [ `${id_s}`] = mod_o
    }

    return json_o
  }
  ,
}




void function
()
{
  const db_o =
    new Object()

  for
  (
    dir_s
    of
    [
      'artist',
      'collection',
      'work'
    ]
  )
  {
    db_o
      [`${dir_s}`] =
      DB_o
        .json__s( `source/ware/db/${dir_s}` )
  }

  FS_o
    .writeFile
    (
      'source/make/data/db.json',
      JSON.stringify( db_o ),
      'utf8',
      out_o => console.log( `-- Writing db.json: ${out_o}` )
    )

}()
