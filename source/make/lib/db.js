const FS_o  = require( 'fs-extra' )
const PATH_o = require( 'path' )



const DB_o =
{
  db__s
  ()
  {
    const buffer_s =
      FS_o
        .readFileSync
        (
          PATH_o
            .resolve
              (
                __dirname,
                '../data/db.json'
              ),
          { encoding:'utf-8', flag:'r' }
        )

    return (
      JSON
        .parse( buffer_s )
    )
  },

}



module.exports = DB_o
