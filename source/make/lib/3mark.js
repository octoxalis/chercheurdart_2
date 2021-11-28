const FS_o =
  require( 'fs-extra' )

const M_o =
  require( '../data/M_o.js' )

const F_o =
  require( '../data/F_o.js' )    //: required by CALL

const C_o =
  require( '../data/C_o.js' )    //: required by CALL



const PRE_o =
{
  token_a:
    [
      'escape',
      'comment',

      'block',
      'reference',

      'link',
      'img',
      'call',

      'header',
      'strong',
      'emphasis',
      'italic',
      'code',
      'cite',
      'delete',
      'hrule',
      'break',
      'raw',

      'list',

    ]
  ,

  escape_a: []
  ,

  inc_a: []
  ,

  declare_a: []
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

      //;;console.table(
      //;  [
      //;    replaced_s,
      //;    type_s,
      //;    key_s,
      //;    value_s
      //;  ]
      //;)

      if
      (
        type_s
      )
      {
        if
        (
          value_s
            .startsWith( '!!!' )    //: nested block
        )
        {
          value_s =
            PRE_o
            .process__s
            (
              value_s
                .replaceAll    //: for nested block
                (
                  '!!!',
                  '|||'
                )
            )
        }

        PRE_o
          .declare_a
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

      type_s =
        type_s
        ||
        'dec'

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
          ,           //: type_s
          key_s,
          value_s
        ] =
          match_a

      const source_s =
        PRE_o
          .inc_a
            [ `${key_s.trim()}` ]

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
          value_s
        ] =
          match_a

          //;;console.table(
          //;  [
          //;    replaced_s,
          //;    key_s,
          //;    value_s
          //;  ]
          //;)
    
          //;console.table( PRE_o.token_a )

      let declare_s =
        PRE_o
          .declare_a
            [ `${key_s.trim()}` ]
          
          //;console.log( declare_s )

      //--if
      //--(
      //--  declare_s
      //--    .startsWith( '!!!' )    //: nested block
      //--)
      //--{
      //--  declare_s =
      //--    PRE_o
      //--      .process__s( declare_s )
      //--}

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
      PRE_o
        [ `reference_${match_a[1] || 'dec'}__a` ]( match_a )    //: match_a[1] = type_s default to declare
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
        src_s,
        descriptor_s
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
          `${open_s}${src_s}${inter_s}${descriptor_s}${close_s}`    //:replacing_s
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



  italic__a:
    match_a =>
      PRE_o
        .tag__a
        (
          match_a,
          'italic'
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



  code__a:
    match_a =>
      PRE_o
        .tag__a
        (
          match_a,
          'code'
        )
  ,



  cite__a:
    match_a =>
      PRE_o
        .tag__a
        (
          match_a,
          'cite'
        )
  ,



  delete__a:
    match_a =>
      PRE_o
        .tag__a
        (
          match_a,
          'delete'
        )
  ,



  raw__a:
    match_a =>
    {
      const
        [
          replaced_s,
          raw_s
        ] =
          match_a

      return (
        [
          replaced_s,
          raw_s
            .replaceAll
            (
              '<',
              '&lt;'
            )
            .replaceAll
            (
              '>',
              '&gt;'
            )
        ]
      )
    }
  ,



   hrule__a:  //: without blank lines before and after
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
            list_s +=
              `</${listType_s}>`
              + `<li>${line_s.trim()}`
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
            process_f              //;console.table( PRE_o[ `${process_s}__a` ].toString() )

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