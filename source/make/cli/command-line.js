//: CLI: node source/make/cli/ccss.js  (from chercheurdart_2 dir)

const FS_o  = require( 'fs-extra' )
const C_o = require( '../data/C_o.js' )
const REX_o = require( '../lib/regex.js' )

const I_re
=
  REX_o
    .new__re( 'i' )

const GM_re
=
  REX_o
    .new__re( 'gm' )



const CLI_o
=
{
init__v
()
{
  const help_s =
    `Valid arguments:
    \t(1) [optional] --h (help)`

  let arg_a =
    process
      .argv
        .slice( 2 )

  if
  (
    arg_a
      .includes( '--h' )
  )
  {
    console
      .log( help_s )

    return
  }
  //--->
  for
  (
    let arg_s
    of
    [
      'verbose'
    ]
  )
  {
    const argChar_s =
      arg_s[0]

    if
    (
      arg_a
        .includes( `--${argChar_s}` )
    )
    {
      ;console.log( 'init param' )
      //...
  
       arg_a =
         arg_a
           .filter
           (
             slot_s => slot_s !== `--${argChar_s}`
           )
    }
  }

  const invalidArg_a
  =
    []

  for
  (
    let arg_s
    of
    arg_a
  )
  {
    if
    (
      arg_s
        .startsWith( '-' )    //: parameter start
    )
    {
      invalidArg_a
        .push( arg_s )
    }
  }

  if
  (
    invalidArg_a
      .length
  )
  {
    console
      .log( `Invalid command parameter(s): ${invalidArg_a}\n\n${help_s}` )
    
    return
  }

  switch
  (
    arg_a
      .length
  )
  {

    case
      1
    :
      if
      (
        arg_a
          [0]
        //... condition
      )
      {
      }
      else
      {
        //...
      }
        
      break

    default
    :
      break
  }

  if
  (
    true    //... some condition
  )
  {
    ;console.log( 'execute main function' )

    return
  }

  console
    .log( help_s )
}
}

CLI_o
  .init__v()
