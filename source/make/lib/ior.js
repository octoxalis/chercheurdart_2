const DB_o =  require( './db.js' )
const I_o = require('../data/I_o.js')





const IOR_o =
{
  db_o:
    DB_o
      .db__s(),

  ior__o:
    id_s =>
  {
    let ior_o =
      new Object( null )

   ;[
      ior_o
        .region,
      ior_o
        .size,
      ior_o
        .rotation,
      ior_o
        .quality,
      ior_o
        .format
    ] =
      IOR_o
        .db_o
          .work
            [id_s]
              .default_a
      ??
      I_o
        .IOR_DEFAULT_a
  
    ior_o
      .id_s = id_s

    return ior_o
  }
  ,

}


module.exports = IOR_o
