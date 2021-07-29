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
      //;console.log( content_s )
    
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

      // ;console.log( [...match_a] )
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
          const match_a  //: ₍ordinal_s¯principal_s¯subsid_s₎
          of
          [ ...
            PRE_o
              .parse__a( content_s )
          ]
        )
        {
          const [ replace_s, match_s ] =
            match_a

          const [ ordinal_s, principal_s, subsid_s ] =
            match_s
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
                `${principal_s} ins:${type_s}[ins_s="${subsid_s}"]`
              )
        }
    
        return content_s
    }
  ,


  
  }
