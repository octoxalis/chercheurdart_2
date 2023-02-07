//: CLI: node source/make/cli/wiki_open_search.js  (from chercheurdart_2 dir)

//--- const FS_o  = require( 'fs-extra' )
//--- const C_o = require( '../data/C_o.js' )
//--- const REX_o = require( '../lib/regex.js' )
//--- 
//--- const I_re
//--- =
//---   REX_o
//---     .new__re( 'i' )
//--- 
//--- const GM_re
//--- =
//---   REX_o
//---     .new__re( 'gm' )



const WIKI_o
=
{
async search__s
(
  search_s
)
{
const param_o
=
  {
    action:    'opensearch'
  , search:    search_s
  , limit:     '5'
  , namespace: '0'
  , format:    'json'
  }

  let url_s
  =
    'https://fr.wikipedia.org/w/api.php?'
    + "?origin=*"

    Object
      .keys
      (
        param_o
      )
        .forEach
          (
            key_s  =>
              url_s
              +=
                `&${key_s}=${param_o[key_s]}`
          )
  
  try
  {
      const request_o
      =
        await
        fetch( url_s )

      const json_s
      =
        await
          request_o
            .json()

      ;console.log( json_s )
  }
  catch
  (
    error_o
  )
  {
      console
        .error( error_o )
  }
}


,
init__v
()
{
  const help_s =
    `Valid arguments:
    \t(1) [optional] --h (help)
    \t(2) [s] --s (quoted search expression)`

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
      'search'
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
      //;console.log( 'search parameter' )
      //+++
      
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
  //--->
  let search_s

  switch
  (
    arg_a
      .length
  )
  {
    case
      1
    :
      ;console.log( arg_a[0] )

      if
      (
        arg_a
          [0]
      )
      {
        search_s
        =
          arg_a
            [0]
      }
      //--- else
      //--- {
      //---   //...
      //--- }
        
      break

    default
    :
      break
  }

  if
  (
    search_s    //... some condition
  )
  {
    ;console.log( search_s )

    WIKI_o
      .search__s
      (
        arg_a[0]
      )

    return
  }

  console
    .log( help_s )
}
}

WIKI_o
  .init__v()
