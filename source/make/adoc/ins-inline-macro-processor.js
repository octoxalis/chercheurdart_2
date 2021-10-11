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
            this
              .process
              (
                (
                  parent_s,    //: not used
                  target_s,    //: i.e. specifier_s
                  attribute_a  //: i.e. subsid_s
                ) =>
                  `<ins data--="${C_o.SECTION_a[0]}">`    //!!! quote needed for regexp
                  + `${target_s}${C_o.SPECIF_DELIM_s}${attribute_a.sub_s}`
                  + `</ins>`
              )
          }
        )
    }