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

    type_a:
    {
      '₀': 'TXT',
      '₁': 'IMG',
      '₂': 'REF',
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

          const ordinal_s =
            match_s
              .slice( 0, C_o.PRE_ORDINAL_n )
              .trim()    //: for ordinal_s ₀-₉

          const [ principal_s, subsid_s ] =
            match_s
              .slice( C_o.PRE_ORDINAL_n )    //: skip ordinal_s
              .split( C_o.PRE_DELIM_s )

          content_s =
            content_s
              .replace
              (
                replace_s,
                `${principal_s} ins:${ordinal_s}[ins_s="${subsid_s.trim()}"]`
              )
        }
    
        return content_s
    }
  ,


  
  }
