const FS_o =
  require( 'fs-extra' )

const M_o =
  require( '../data/M_o.js' )

const F_o =
  require( '../data/F_o.js' )    //: required by CALL

const C_o =
  require( '../data/C_o.js' )    //: required by CALL

  

const BLOCK_OPEN_s    = '^'    //: see ins no escape here
const BLOCK_CLOSE_s   = '!'    //: see ins no escape here
const BLOCK_DECLARE_s = '='    //: after BLOCK_OPEN_s
const BLOCK_INCLUDE_s = '+'    //: after BLOCK_OPEN_s

  

const PRE_o =
{
  token_a:
    [
      'escape',
      'comment',

      'hrule',
      'break',
      'header',
      'strong',
      'emphasis',
      
      'link',
      'img',
      'list',
      'call',
      
      'block',
      'reference',
    ]
  ,

  escape_a: []
  ,

  inc_a: []
  ,

  dec_a: []
  ,


  escape__a:
    match_a =>
    {
      const
        [
          replaced_s,
          escaped_s
        ] =
          match_a

      const replacing_s =
        `${M_o.ESCAPE_s}${match_a.index}`

      PRE_o
        .escape_a
          .push
          (
            [
              replacing_s,    //: replaced_s when restoring
              escaped_s       //: replacing_s when restoring
            ]
          )

      return (
        [
          replaced_s,
          replacing_s
        ]
      )
    }
  ,



  comment__a:
    match_a =>
      [
        match_a
          [0],      //: replaced_s
        ''          //: replacing_s
      ]
  ,



  hrule__a:  //: blank lines before and after
  match_a =>
    PRE_o
      .tag__a
      (
        match_a,
        'hrule'
      )
  ,



  break__a:
   match_a =>
     PRE_o
       .tag__a
       (
         match_a,
         'break'
       )
  ,



  header__a:
    match_a =>
    {
      let
      [
        replaced_s,
        level_s,
        header_s
      ] =
        match_a
    
    header_s =
      header_s
        .trim()
    
      return (
        [
          replaced_s,
          `<h${level_s}>${header_s}</h${level_s}>`
        ]
      )
    }
    ,



  tag__a:
  (
    match_a,
    tag_s
   ) =>
  {
    const
      [
        replaced_s,
        match_s
      ] =
        match_a
  
    const
      [
        open_s,
        close_s
      ] =
        M_o
          [ `${tag_s}_a` ]
  
    return (
      [
        replaced_s,
        `${open_s}${match_s||''}${close_s}`    //: empty for solo tags (hr, br)
      ]
    )
  }
  ,



  strong__a:
    match_a =>
      PRE_o
        .tag__a
        (
          match_a,
          'strong'
        )
  ,



  emphasis__a:
    match_a =>
      PRE_o
        .tag__a
        (
          match_a,
          'emphasis'
        )
  ,



  source__a:
  (
    match_a,
    tag_s
  ) =>
  {
    const
    [
      replaced_s,
      legend_s,
      src_s,
    ] =
      match_a
  
    const
    [
      open_s,
      inter_s,
      close_s
    ] =
      M_o
        [ `${tag_s}_a` ]
    
  
    return (
      [
        replaced_s,
        `${open_s}${src_s.trim()}${inter_s}${legend_s.trim()}${close_s}`    //:replacing_s
      ]
    )
  }
  ,



  link__a:
    match_a =>
      PRE_o
        .source__a
        (
          match_a,
          'link'
        )
  ,



  img__a:
    match_a =>
      PRE_o
        .source__a
        (
          match_a,
          'img'
        )
  ,



  call__a:
    match_a =>
    {
      const
      [
        replaced_s,
        process_s,
        arg_s
      ] =
        match_a
    
      return (
        [
          replaced_s,
          eval( `${process_s}( ${arg_s} )` )    //: replacing_s
        ]
      )
    }
  ,



  list__a:
    match_a =>
    {
      const
        [
          replaced_s,
          type_s,
          value_s
        ] =
          match_a
    
        const indent__n =
          line_s =>
          {
            let at_n = 0
    
            while
            (
              line_s
                [ at_n ]
              ===
              ' '
            )
            {
              ++at_n
            }
    
            return at_n
          }
    
        let listType_s =
          type_s
          ?
            'ol'
          :
            'ul'
    
        let list_s = ''
    
        let indent_n = -1
    
        let ati_n = 0
    
        for
        (
          line_s
          of
          value_s
            .split( '\n' )
        )
        {
          ati_n =
            indent__n( line_s )
    
          if
          (
            ati_n
            ===
            indent_n
          )
          {
            list_s +=
              `<li>${line_s.trim()}`
    
            continue
          }
    
          if
          (
            ati_n
            <
            indent_n
          )
          {
            while
            (
              indent_n
              >
              ati_n
            )
            {
              list_s +=
                `</${listType_s}>`

              indent_n -=
                C_o
                  .LIST_INDENT_n
            }

            list_s +=
              `<li>${line_s.trim()}`
          }
          else
          {
            list_s +=
              `<${listType_s}>`
              + `<li>${line_s.trim()}`
          }

          indent_n =
            ati_n
        }
    
        list_s +=
          `</${listType_s}>`    //: close list
    
      return (
        [
          replaced_s,
          list_s          //!!! TEMPORARY remove
        ]
      )
    }
  ,



  block_inc__a:
    match_a =>
    {
      const
        [
          replaced_s,
          type_s,
          key_s,
          value_s
        ] =
          match_a

      if
      (
        type_s
      )
      {
        PRE_o
          .inc_a
            [ `${key_s.trim()}` ] =
              FS_o
                .readFileSync
                (
                  value_s.trim(),
                  {
                    encoding:'utf-8',
                    flag:'r'
                  }
                )
      }

      return (
        [
          replaced_s,
          ''          //: remove include declaration
        ]
      )
    }
  ,


  block_dec__a:
    match_a =>
    {
      let
        [
          replaced_s,
          type_s,
          key_s,
          value_s
        ] =
          match_a

      if
      (
        type_s
      )
      {
        if
        (
          value_s
            .startsWith( BLOCK_OPEN_s )    //: nested block
        )
        {
          value_s =
            PRE_o
            .process__s
            (
              `${value_s}${BLOCK_CLOSE_s}${BLOCK_CLOSE_s}`    //: add missing BLOCK_CLOSE_s
            )
        }

        PRE_o
          .dec_a
            [ `${key_s.trim()}` ] =
              value_s
        }

      return (
        [
          replaced_s,
          ''            //: remove declaration
        ]
      )
    }
  ,



  block__a:
    match_a =>
    {
      let
        [
          replaced_s,
          type_s,
        ] =
          match_a

      switch
      (
        type_s
      )
      {
        case BLOCK_DECLARE_s:
          type_s = 'dec'
          
          break
      
        case BLOCK_INCLUDE_s:
          type_s = 'inc'

          break
      
        default:
          return
      }

      return (
        PRE_o
          [ `block_${type_s}__a` ]
          ?
            PRE_o
              [ `block_${type_s}__a` ]( match_a )
          :
            null
      )
    }
    ,



  reference_inc__a:
    match_a =>
    {
      const
        [
          replaced_s,
          type_s,
          key_s,
          value_s
        ] =
          match_a

      const source_s =
        PRE_o
          .inc_a
            [ `${key_s}` ]

      let extract_s = ''

      if
      (
        value_s
        &&
        source_s
      )
      {
        const content_a =
          source_s
            ?.split( '\n' )

        for
        (
          let range_s
          of
          value_s
            .trim()
            .split( ',' )      //: comma separated list of lines to extract
        )
        {
          const
          [
            from_s,
            to_s
          ] =
            range_s
              .trim()
              .split( '-' )

          const from_n =
            +from_s        //: number cast
            -
            1              //: 0-indexed
            
          const to_n =
            to_s
            ?
              +to_s       //: number cast;  keep limit 1-indexed to include
            :
              from_n
              +
              1

          extract_s +=
            content_a
              .slice
              (
                from_n,
                to_n
              )
              .join( '\n' )
              +
              '\n'         //: keep newline between ranges
        }
      }
      else
      {
        extract_s =
          source_s
      }

      return (
        [
          replaced_s,
          extract_s        //: replacing_s
        ]
      )
    }
  ,



  reference_dec__a:
    match_a =>
    {
      const
        [
          replaced_s,
          ,           //: type_s
          key_s,
        ] =
          match_a

      let declare_s =
        PRE_o
          .dec_a
            [ `${key_s}` ]
          
          return (
        [
          replaced_s,
          declare_s
        ]
      )
    }
  ,



  reference__a:        //========== TODO
    match_a =>
    {
      let
        [
          replaced_s,
          type_s,
        ] =
          match_a

      switch
      (
        type_s
      )
      {
        case BLOCK_DECLARE_s:
          type_s = 'dec'
          
          break
      
        case BLOCK_INCLUDE_s:
          type_s = 'inc'

          break
      
        default:
          return
      }

  return (
      PRE_o
        [ `reference_${type_s}__a` ]( match_a )
      )
    }
    ,



  process__s:
    source_s =>
    {  
      let match_a
  
      for
      (
        token_s
        of
        PRE_o
          .token_a
      )
      {
        for
        (
          match_a
          of
          Array
            .from
            (
              source_s
                .matchAll
                (
                  M_o
                    [ `${token_s}_re` ]
                )
            )
        )
        {
          source_s =
            source_s
              .replace
              (
                ...PRE_o
                    [ `${token_s}__a` ]( match_a )
              )
        }              
      }
  
      for        //: restore escaped
      (
        let escape_a
        of
        PRE_o
          .escape_a
      )
      {
        source_s =
          source_s
            .replace( ...escape_a )
      }
    
      return source_s
    }
    ,
}



module
  .exports =
  {
    extend__v:
      (
        {
          process_s,
          process_f
        }
      ) =>
      {
        if
        (
          ! PRE_o
              .token_a
                .includes( process_s )
        )
        {
          PRE_o
            .token_a
              .push( process_s )
        }

        PRE_o
          [ `${process_s}__a` ] =        //: override if exists
            process_f

      }
    ,



    process__s:
      source_s =>
      {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        ;console.time( 'process__s' )
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const html_s =
          PRE_o
            .process__s( source_s )
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        ;console.timeEnd( 'process__s' )
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
        return html_s
      }
  }