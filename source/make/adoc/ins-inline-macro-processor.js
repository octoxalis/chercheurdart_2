const C_o = require( '../data/C_o.js' )



module
  .exports =
  registry_o =>
  {
    registry_o
      .inlineMacro
      (
        C_o.MACRO_INSERT_s,
        function ()    //: we need a function to have `this`
        {
          const this_o =
            this

          this_o
            .process
            (
              (
                parent_s,    //: not used
                target_s,
                attribute_a
              ) =>
              {
                if
                (
                  target_s
                  ===
                  'text'
                )
                {
                  return (
                    `<ins data--="${C_o.SEC_TEXT_s}">${attribute_a.note_s}</ins>`    //!!! quote needed for regexp
                    )
                }
                if
                (
                  target_s
                  ===
                  'img'
                )
                {
                  return (
                    `<ins data--="Article">! ${attribute_a.url_s}</ins>`    //!!! quote needed for regexp
                    )
                }
              }
            )
        }
      )
  }