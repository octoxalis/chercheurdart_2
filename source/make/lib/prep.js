const INS_o =
  require( './pre_insert.js' )

const ORG_o =
  require( './pre_org.js' )



module
  .exports =
  {
    convert__s:
      content_s =>
      {
        let converted_s =
          ORG_o
            .convert__s( content_s )
        
        converted_s =
          INS_o
            .convert__s( converted_s )

        return converted_s
      }
          
    ,
  }
