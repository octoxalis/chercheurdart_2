const REX_o =
  require( './regex.js' )

const C_o =
  require( '../data/C_o.js' )



const PRE_o =
  {
    parse__a:
    (
      content_s
    ) =>
    {
      const match_a =
        content_s
          .matchAll
          (
            REX_o
              .new__re( 'gms' )
                `${C_o.PRE_OPEN_s}
                (                         //: open group
                [^${C_o.PRE_CLOSE_s}]+?
                )                         //: close group
                ${C_o.PRE_CLOSE_s}`
          )

      return match_a
    }

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
          const match_a  //: ₍ordinal_s principal_s\n  subsid_s₎
          of
          [ ...
            PRE_o
              .parse__a( content_s )
          ]
        )
        {
          const [ replace_s, match_s ] =
            match_a

          const ordinal_s =
            match_s
              .slice( 0, C_o.PRE_ORDINAL_n )
              .trim()    //: if ordinal_s < ₁₀

          const [ principal_s, subsid_s ] =
            match_s
              .slice( C_o.PRE_ORDINAL_n )    //: skip ordinal_s
              .split( C_o.PRE_DELIM_s )

          const type_s =
            ordinal_s
            ===
            C_o.PRE_TXT_s
            ?
              'TXT'
            :
              'IMG'
    
          content_s =
            content_s
              .replace
              (
                replace_s,
                `${principal_s} ins:${type_s}[ins_s="${subsid_s.trim()}"]`
              )
        }
    
        return content_s
    }
  ,


  
  }
