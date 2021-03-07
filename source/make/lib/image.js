const DB_o = require( './db.js' )

const C_o   = require('../data/C_o.js')
const REX_o = require( './regex.js' )
const IOR_o = require( '../lib/ior.js' )




const IMG_o =
{
  src__v:
  attribute_s =>
  {
    return attribute_s
  }
  ,

  min__v:
  attribute_s =>
  {
    return attribute_s
  }
  ,

  med__v:
  attribute_s =>
  {
    return attribute_s
  }
  ,

  max__v:
  attribute_s =>
  {
    return attribute_s
  }
  ,

}


module.exports =
{
  image__v:
  (
    input_s
  ) =>
    {
      let output_s = 
        input_s
      
      const gms_re =
        REX_o
          .new__re( 'gms' )
      const s_re =
        REX_o
          .new__re( 's' )

      for
      (
        const omatch_a
        of
        [ ...
          input_s
            .matchAll
            (
              gms_re
                `<img       //: open tag
                ([^>]+?)    //: all img attributes
                >`          //: close tag
            )
        ]
      )
      {
        let attribute_s =
          omatch_a[1]
            .trim()

        let ior_o
        let id_s

        for
        (
          const imatch_a
          of
          [ ...
            attribute_s
              .matchAll
              (
                gms_re
                  `data-      //: data attribute
                  ([a-z]+)    //: dataset name: group 0
                  =           //: attribute equal
                  "           //: open attribute value (apos)
                  ([^"]+?)    //: attribute value up to apos: group 1
                  "`          //: close atribute value (apos)
              )
          ]
        )
        {
          //.........................................
          let
          [
            match_s,
            data_s,
            value_s
          ] =
            imatch_a     //;console.log( `${match_s} -- ${data_s}  -- ${value_s}` )

          if
          (
            data_s
            ===
            'src'
          )
          {
            const path_a =
              value_s
                .match
                (
                  s_re
                    `\/img\/       //: img dir
                    ([^\\/]+?)     //: id dir
                    \/full\/`      //: full dir
                )

            id_s =
              path_a[1]
      
            continue
          }

                                           //;console.log( id_s )
          ior_o =
            IOR_o
              .ior__o( id_s )

          for
          (
            const attribute_s
            of
            value_s
              .split( '/' )
          )
          {
                                  //;console.log( attribute_s )
            let
            [
              property_s,
              val_s
            ] =
              attribute_s
                .split( ':' )

            ior_o[property_s] =
              val_s
          }
            //..........

        }
      }

      return output_s
  }
  ,
}
