const REX_o =
  require( './regex.js' )

const C_o =
  require( '../data/C_o.js' )



const PREP_o =
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
              .matchAll( PREP_o.pre_re )
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

          const principal_n =
            match_s
              .indexOf( C_o.LINE_DELIM_s )

          let principal_s =
            match_s
              .slice
              (
                specifier_n,    //: skip specifier_s
                principal_n
              )
              .trim()

          let subsid_s =
            match_s
              .slice( principal_n )    //: skip principal_n
              .trim()
              .replaceAll
              (
                C_o.LINE_DELIM_s,
                C_o.INS_BREAK_DELIM_s
              )

          content_s =
            content_s
              .replace
              (
                replace_s,
                `${principal_s}`
                + `&#x202F;`    //!!! NARROW NO-BREAK SPACE to force AsciiDoc paragraph
                + `ins:${specifier_s}`
                + `[ins_s="${subsid_s}"]`
              )
        }
    
        return content_s
    }
  ,


  
  }
