const REX_o =
  require( './regex.js' )

const P_o =
  require( '../data/P_o.js' )

const F_o =
  require( '../data/F_o.js' )



const PRE_o =
{
  escape_a: []
}



module
  .exports =
  {
    convert__s:
      content_s =>
      {
        let match_a

        
        for        //: store escape
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  P_o
                    .escape_re
                )
            )
        )
        {
                         //;console.table( [match_a[0], match_a[1], match_a.index] )
          const
            [
              replace_s,
              escape_s
            ] =
              match_a

          const index_s =
            `${P_o.ESCAPE_s}${match_a.index}`

          PRE_o
            .escape_a
              .push
              (
                {
                  index_s,
                  escape_s
                }

              )

          content_s =
            content_s
              .replace
              (
                replace_s,
                index_s
              )                //;console.log( content_s )
        }

        for
        (
          let type_s
          of
          [
            'comment_block_re',
            'comment_inline_re'
          ]
        )
        {
          for        //: remove block comments
          (
            match_a
            of
            Array
              .from
              (
                content_s
                  .matchAll
                  (
                    P_o
                      [type_s]
                  )
              )
          )
          {
            content_s =
              content_s
                .replace
                (
                  match_a[0],
                  ''
                )
          }
        }                //;console.log( content_s )


        for        //: block
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  P_o
                    .block_re
                )
            )
        )
        {
          const
            [
              replace_s,
              type_s,
              key_s,
              value_s
            ] =
              match_a

          //-- ;console.table
          //-- (
          //--   [
          //--     replace_s,
          //--     type_s,
          //--     key_s,
          //--     value_s
          //--   ]
          //-- )
          
//...

          //... content_s =
          //...   content_s
          //...     .replace
          //...     (
          //...       replace_s,
          //...       result_
          //...     )
        }                ;console.log( content_s )
        

        for
        (
          let type_s
          of
          [
            'bold',
            'italic',
            'emphasis',
          ]
        )
        {
          for        //: text markup
          (
            match_a
            of
            Array
              .from
              (
                content_s
                  .matchAll
                  (
                    P_o
                      [`${type_s}_re`]
                  )
              )
          )
          {
            const
              [
                replace_s,
                match_s
              ] =
                match_a

            const
              [
                open_s,
                close_s
              ] =
                P_o
                  [`${type_s}_a`]


            content_s =
              content_s
                .replace
                (
                  replace_s,
                  `${open_s}${match_s}${close_s}`
                )
          }
        }                //;console.log( content_s )

        for        //: headers markup
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  P_o
                    .header_re
                )
            )
        )
        {
          let
            [
              replace_s,
              level_s,
              header_s
            ] =
              match_a

          header_s =
            header_s
              .trim()

          content_s =
            content_s
              .replace
              (
                replace_s,
                `<h${level_s}>${header_s}</h${level_s}>`
              )                //;console.log( content_s )
        }

        for        //: links
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  P_o
                    .link_re
                )
            )
        )
        {
          const
            [
              replace_s,
              href_s,
              link_s
            ] =
              match_a

          content_s =
            content_s
              .replace
              (
                replace_s,
                `<a href="${href_s}">${link_s}</a>`
              )
        }                //;console.log( content_s )

        for        //: img
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  P_o
                    .img_re
                )
            )
        )
        {
          const
            [
              replace_s,
              src,
              alt_s
            ] =
              match_a

          content_s =
            content_s
              .replace
              (
                replace_s,
                `<img src="${src}" alt="${alt_s}">`
              )
        }                //;console.log( content_s )

        for        //: call
        (
          match_a
          of
          Array
            .from
            (
              content_s
                .matchAll
                (
                  P_o
                    .call_re
                )
            )
        )
        {
          const
            [
              replace_s,
              function_s,
              arg_s
            ] =
              match_a

          const result_ =
            eval( `${function_s}( ${arg_s} )` )                //;console.log( result_ )

          content_s =
            content_s
              .replace
              (
                replace_s,
                result_
              )
        }                ;console.log( content_s )










        for        //: restore escape
        (
          let escape_o
          of
          PRE_o
            .escape_a
        )
        {
          content_s =
            content_s
              .replace
              (
                escape_o
                  .index_s,
                escape_o
                  .escape_s
              )                //;console.log( content_s )
        }

        return content_s
      }
  }