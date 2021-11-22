const FS_o =
  require( 'fs-extra' )

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



module
  .exports =
  {
    convert__s:
      content_s =>
      {
        let match_a

        for
        (
          match_a
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
            match_a              //;console.table( [replace_s, key_s, value_s ] )

          const
          [
            keyword_s,
            ref_s
          ] =
            key_s
              .split( C_o.PRE_KEY_DELIM_s )  //;console.table( [keyword_s, ref_s ] )

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
                    (
                    ${C_o.PRE_ARG_DELIM_s}+?
                    (
                      [^${C_o.PRE_REF_DELIM_s}]+?
                    )
                    )?
                    ${C_o.PRE_REF_DELIM_s}
                    `
                  )
              )
          )
          {
            let
            [
              occurence_s,
              arg_,
            ] =
              replace_a

              if
              (
                arg_
                &&
                arg_
                  .startsWith( C_o.PRE_ARG_DELIM_s )
              )
              {
                arg_ =
                  arg_
                    .slice( 1 )      //: skip PRE_ARG_DELIM_s
              }      
      
            switch
            (
              keyword_s
            )
            {
              case 'img':        //=== IMAGE ===

                content_s =
                  content_s
                    .replace
                    (
                      occurence_s,
                      `₍₉
                      ${arg_}
                      ${value_s}₎`
                    )
              
                break
          
              case 'link':        //=== LINK ===

                let link_s

                if
                (
                  arg_
                )
                {
                  const
                  [
                    arg1_s,
                    arg2_s,
                  ] =
                    arg_
                      .split( C_o.PRE_ARG_DELIM_s )

                  if
                  (
                    arg1_s
                      .endsWith( 'html' )
                  )
                  {
                    link_s =
                      `[[${value_s}${arg1_s}][${arg2_s || ''}]]`
                  }
                  else
                  {
                    link_s =
                    `[[${value_s}][${arg1_s}]]`
                  }
                }
                else
                {
                  link_s =
                  `[[${value_s}][LIEN]]`    //: anomaly: we should have an
                }

                content_s =
                  content_s
                    .replace
                    (
                      occurence_s,
                      link_s
                    )
              
                break
          
              case 'eval':        //=== FUNCTION CALL ===

                const result_s =
                eval ( `${value_s}( '${arg_}' )` )

                content_s =
                  content_s
                    .replace
                    (
                      occurence_s,
                      `pass:[${result_s}]`    //!!! REMOVE AsciiDoc pass:
                    )
                
                break
            
              case 'include':        //=== INCLUDE ===

                const include_s =
                  FS_o
                    .readFileSync
                    (
                      value_s,
                      {
                        encoding:'utf-8',
                        flag:'r'
                      }
                    )

                let line_s = ''

                let line_a =
                  include_s
                    .split( '\n' )

                
                if
                (
                  ! arg_
                )
                {
                  line_s =
                    include_s
                }
                else
                {
                  const arg_a =
                    arg_
                      .split( C_o.PRE_ARG_DELIM_s )

                  const range_a =
                    arg_a
                      [0]
                        .split( C_o.PRE_RANGE_DELIM_s )

                  for
                  (
                    let range_s
                    of
                    range_a
                  )
                  {
                    let
                    [
                      from_s,
                      to_s
                    ] =
                      range_s
                        .split( C_o.PRE_LINES_DELIM_s )

                      to_s =
                        to_s
                        ||
                        from_s
                    
                    line_s +=
                      line_a
                        .slice
                        (
                          +from_s - 1,
                          +to_s
                        )
                        .join( '\n' )
                      +
                      '\n\n'            //: ranges as paragraphs
                  }
                }

                content_s =
                  content_s
                    .replace
                    (
                       occurence_s,
                       line_s
                    )
                                      
                break
            
              default:
                break
            }
          }

          let replacing_s =
            keyword_s
            ===
            'anchor'
            ?
              `pass:[<a id="${ref_s}">${value_s}</a>\n]`    //!!! REMOVE AsciiDoc pass: //: keep newline
            :
              ''        //: remove org markup except for anchor
    
          content_s =
            content_s
              .replace
              (
                replace_s,
                replacing_s
              )
        }

        //=== LINKS === !!! AFTER previous link process
        for
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  GM_re
                  `
                  \[\[
                  (
                  [^\]]+?
                  )
                  \]\[
                  (
                  [^\]]+?
                  )
                  \]\]
                  `
                )
            )
        )
        {
          const
          [
            replace_s,
            link_s,
            name_s
          ] =
            match_a

          content_s =
            content_s
              .replace
              (
                replace_s,
                `pass:[<a href="${link_s}">${name_s}</a>]`    //!!! REMOVE AsciiDoc pass:
              )
        }

        //=== INLINE COMMENT ===
        for
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  GM_re
                  `
                  ${C_o.PRE_INLINE_COMMENT_s}
                  (
                  [\s\S]*
                  )
                  ${C_o.PRE_INLINE_COMMENT_s}
                  `
                )
            )
        )
        {
          const
          [
            replace_s,
            comment_s
          ] =
            match_a

          content_s =
            content_s
              .replace
              (
                replace_s,
                ''
              )
        }

        //=== LINE COMMENT ===
        for
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  GM_re
                  `
                  \n
                  ${C_o.PRE_BLOCK_START_s}
                  (
                  [^\n]*
                  )
                  `
                )
            )
        )
        {
          const
          [
            replace_s,
            comment_s
          ] =
            match_a

          if
          (
            ! comment_s
              .startsWith( C_o.PRE_BLOCK_OPEN_s )    //: exclude block comment
            &&
            ! comment_s
              .startsWith( C_o.PRE_BLOCK_CLOSE_s )    //: exclude block comment
          )
          {
            content_s =
              content_s
                .replace
                (
                  replace_s,
                  ''
                )
          }
        }

        //=== BLOCK COMMENT ===
        const open_s =
          `${C_o.PRE_BLOCK_START_s}\\${C_o.PRE_BLOCK_OPEN_s}comment`    //: escape +begin

        const close_s =
          `${C_o.PRE_BLOCK_START_s}\\${C_o.PRE_BLOCK_CLOSE_s}comment`   //: escape +end

        for
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  GM_re
                  `
                  ${open_s}
                  (
                  [\s\S]*?
                  )
                  ${close_s}
                  `
                )
            )
        )
        {
          const
          [
            replace_s,
            comment_s
          ] =
            match_a

          content_s =
            content_s
              .replace
              (
                replace_s,
                ''
              )
        }

        //=== HEADERS ===
        for
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  GM_re
                  `
                  \n
                  (
                  \*{1,6}
                  )
                  \s+?
                  (
                  [^\n]*
                  )
                  `
                )
            )
        )
        {
          const
          [
            replace_s,
            markup_s,
            header_s
          ] =
            match_a

          let level_n =
            markup_s
              .length

          content_s =
            content_s
              .replace
              (
                replace_s,
                `pass:[\n<h${level_n}>${header_s}</h${level_n}>]`    //!!! REMOVE AsciiDoc pass:
              )
        }

        //=== LINE BREAK ===
        for
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  GM_re
                  `
                  \+
                  \n
                  `
                )
            )
        )
        {
          const
          [
            replace_s,
            break_s
          ] =
            match_a

          content_s =
            content_s
              .replace
              (
                replace_s,
                `pass:[<br>]\n`    //!!! REMOVE AsciiDoc pass:
              )
        }

        return content_s
      }
  }