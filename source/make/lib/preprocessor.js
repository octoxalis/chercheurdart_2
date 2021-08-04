const REX_o =
  require( './regex.js' )

const C_o =
  require( '../data/C_o.js' )



const PRE_o =
  {
    pre_re:
      REX_o
        .new__re( 'gms' )
          `${C_o.PRE_OPEN_s}
          (                         //: open group
          [^${C_o.PRE_CLOSE_s}]+?
          )                         //: close group
          ${C_o.PRE_CLOSE_s}`
    ,

  }
  
  
  

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
          [ ...
            content_s
              .matchAll( PRE_o.pre_re )
          ]
        )
        {
          const [ replace_s, match_s ] =
            match_a

          const specifier_n =
            match_s
              .indexOf( C_o.INS_SPECIF_DELIM_s )

          const specifier_s =
            match_s
              .slice
              (
                0,
                specifier_n
              )

          const [ principal_s, subsid_s ] =
            match_s
              .slice( specifier_n )    //: skip specifier_s
              .split( C_o.PRE_DELIM_s )

          content_s =
            content_s
              .replace
              (
                replace_s,
                `${principal_s} ins:${specifier_s}[ins_s="${subsid_s.trim()}"]`    //!!! \n is mandatory
              )
        }
    
        return content_s
    }
  ,


  
  }
