const C_o = require('../data/C_o.js')
const DB_o =  require( '../lib/db.js' )





const IOR_o =
{
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
      DB_o
        .db__s()
          .work
            [`${id_s}`]
              .default_a
      ??
      C_o
        .IOR_DEFAULT_a
  
    ior_o
      .id_s = id_s

    return ior_o
  }
  ,

}


module.exports = IOR_o
