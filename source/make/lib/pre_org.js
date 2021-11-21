const REX_o =
  require( './regex.js' )

const C_o =
  require( '../data/C_o.js' )

const F_o =
  require( '../data/F_o.js' )

const I_re =
  REX_o
    .new__re( 'i' )

const GM_re =
  REX_o
    .new__re( 'gm' )

const ORG_o =
{

}



module
  .exports =
  {
    convert__s:
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
                  GM_re
                  `
                  ${C_o.PRE_DEC_DELIM_s}
                  (
                    [^${C_o.PRE_DEC_DELIM_s}]+?
                  )
                  ${C_o.PRE_DEC_DELIM_s}
                  \s+
                  (
                  [\s\S]+?
                  )
                  \n
                  `
                )
            )
        )
        {
          let
          [
            replace_s,
            key_s,
            value_s
          ] =
            match_a              ;console.table( [replace_s, key_s, value_s ] )

          const
          [
            keyword_s,
            ref_s
          ] =
            key_s
              .split( C_o.PRE_KEY_DELIM_s )  ;console.table( [keyword_s, ref_s ] )


          for
          (
            let replace_a
            of
            Array
              .from
              (
                content_s
                  .matchAll
                  (
                    GM_re
                    `
                    ${C_o.PRE_REF_DELIM_s}
                    ${ref_s}
                    ${C_o.PRE_ARG_DELIM_s}+?
                    (
                      [^${C_o.PRE_REF_DELIM_s}]+?
                    )
                    ${C_o.PRE_REF_DELIM_s}
                    `
                  )
              )
            )
            {
              //;console.table( replace_a )
              const
              [
                occurence_s,
                arg_,
              ] =
                replace_a      ;console.table( [ occurence_s, arg_ ] )

              //... const arg_a =
              //...   arg_
              //...     .split( C_o.PRE_ARG_DELIM_s )

              switch
              (
                keyword_s
              )
              {
                case 'img':
                  content_s =
                    content_s
                      .replace
                      (
                        occurence_s,
                        `₍₉
                        ${arg_}
                        ${value_s}₎`
                      
                      )                 //;console.table( [ occurence_s, `${value_s}${arg_}` ] )
                
                break;
            
                case 'link':
                  content_s =
                    content_s
                      .replace
                      (
                        occurence_s,
                        `${value_s}${arg_}`
                      )                 //;console.table( [ occurence_s, `${value_s}${arg_}` ] )
                
                break
            
                case 'func':
                  const result_s =
                  eval ( `${value_s}( '${arg_}' )` )

                  content_s =
                    content_s
                      .replace
                      (
                        occurence_s,
                        `pass:[${result_s}]`    //!!! REMOVE AsciiDoc pass:
                      )                 //;console.table( result_s )
                  
                  break
              
                  case 'include':
                    //--const response_o =
                    //--  await fetch( value_s )
                    //--
                    //--const text_o =
                    //--  await response_o
                    //--    .text()
                    //--
                    //--content_s =
                    //--  content_s
                    //--    .replace
                    //--    (
                    //--       occurence_s,
                    //--       text_o
                    //--         .data
                    //--    )                 //;console.table( [ occurence_s, `${value_s}${arg_}` ] )
                    fetch( value_s )
                      .then
                      (
                        response =>
                          response
                            .text()
                      )
                      .then
                      (
                        data =>
                        {
                          content_s =
                           content_s
                             .replace
                             (
                                occurence_s,
                                data
                             )                 ;console.table( [ occurence_s, `${value_s}${arg_}` ] )
                        }
                      )
                      .catch
                      (
                        error =>
                        {
                          console.log('There has been a problem with your fetch operation:', error)
                        }
                      )
                                          
                    break
              
                  default:
                  break
              }




            }

          content_s =
            content_s
              .replace
              (
                replace_s,
                ''
              )
        }
    
        return content_s
      }
  }