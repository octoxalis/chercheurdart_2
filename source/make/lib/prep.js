const REX_o =
  require( './regex.js' )

const C_o =
  require( '../data/C_o.js' )



module
  .exports =
  {
    ins__s:
      content_s =>
      {
        for
        (
          const match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  REX_o
                    .new__re( 'gms' )
                      `${C_o.INS_OPEN_s}
                      (
                      [₀-₉]{1,3}               //: specifier_s: 1 to 3 subscript digits
                      )
                      (
                      <?>?                     //: escape html tags with AsciiDoc pass:
                      )
                      [^${C_o.INS_CLOSE_s}]+?  //: everything up to close
                      ${C_o.INS_CLOSE_s}`
                )
            )
        )
        {
          let
          [
            replace_s,
            specifier_s,
            escape_s
          ] =
            match_a

          let insert_s =
            replace_s
              .replace    //: replace only the 1rst \n
              (
                '\n',
                C_o.INS_PRINCIPAL_s
              )
              .replaceAll    //: replace all remaining \n
              (
                '\n',
                C_o.INS_DELIM_s
              )
              .replaceAll
              (
                C_o.INS_PASS_s,
                ''      //: remove
              )
          
          switch
          (
            specifier_s
          )
          {
            //?? case C_o.INS_DEF_s:
            case C_o.INS_REF_s:    //: auto AsciiDoc pass:
            //?? case C_o.INS_QUO_s:
            //?? case C_o.INS_TAB_s:
            case C_o.INS_IMG_s:
              insert_s =
                `pass:[${insert_s}]`
              
              break
          
            default:
              if
              (
                escape_s
                !==
                ''
              )
              {
                insert_s =
                  `pass:[${insert_s}]`
              }

              break
          }
          

          content_s =
            content_s
              .replace
              (
                replace_s,
                insert_s
              )
        }
    
        return content_s
    }
  ,
  }
