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
                // ;console.table( attribute_a )
                //XXlet specifier_s = ''    //: default is TXT
//XX
                //XXswitch ( target_s )
                //XX{
                //XX  case 'IMG':
                //XX    specifier_s =
                //XX      '₀'
                //XX    break;
                //XX
                //XX  case 'REF':
                //XX    specifier_s =
                //XX      '₁'
                //XX    break;
                //XX
                //XX  default:
                //XX    break;
                //XX}

                return (
                  `<ins data--="${C_o.SEC_TEXT_s}">${target_s} ${attribute_a.ins_s}</ins>`    //!!! quote needed for regexp
                  )
              }
            )
        }
      )
  }