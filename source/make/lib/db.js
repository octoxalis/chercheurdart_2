const FS_o  = require( 'fs-extra' )
const PATH_o = require( 'path' )

const C_o = require( '../data/C_o.js' )



const DB_o =
{
  db__s
  ()
  {
    const db_o = {}

    for
    (
      let table_s
      of
      C_o
        .DB_a
    )
    {
      db_o
        [ table_s ] = {}

      for
      (
        let row_o
        of
        JSON
          .parse
          (
            FS_o
              .readFileSync
              (
                PATH_o
                  .resolve
                    (
                      __dirname,
                      `../db/${table_s}.json`
                    ),
                { encoding:'utf-8', flag:'r' }
              )
          )
      )
      {
        db_o
          [ table_s ]
            [ row_o.id_s ] =
              row_o
      }
    }

    return db_o
  },

}



module.exports = DB_o
