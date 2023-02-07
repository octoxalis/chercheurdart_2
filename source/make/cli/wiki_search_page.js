//: CLI: node source/make/cli/wiki_search_page.js  (from chercheurdart_2 dir)

//--- const FS_o  = require( 'fs-extra' )
//--- const C_o = require( '../data/C_o.js' )
//--- const REX_o = require( '../lib/regex.js' )

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
async open__s
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

async page__s
(
  search_s
)
{
  const url_s
  =
    'https://fr.wikipedia.org/w/api.php?'
    +
    new URLSearchParams
    (
      {
        origin: '*'
      , action: 'parse'
      , page:   search_s
      , format: 'json'
      }
    )
  
  try
  {
      const request_o
      =
        await
        fetch(url_s)

      const json_s
      =
        await
          request_o
            .json()

      ;console.log( json_s )

      console
        .log
        (
          json_s
            .parse
              .text
                [ '*' ]
        )
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
    \t(3) [o] --o (quoted search expression - open search)
    \t(2) [p] --p (quoted search expression - page content)`

  let arg_a =
    process
      .argv
        .slice( 2 )

      ;console.log( arg_a )
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
  let argChar_s

  for
  (
    let arg_s
    of
    [
      'open'
    , 'page'
    ]
  )
  {
    argChar_s =
      arg_s[0]

    if
    (
      arg_a
        .includes( `--${argChar_s}` )
    )
    {
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
        
      break

    default
    :
      break
  }

  let method_s

  if
  (
    search_s    //... some condition
  )
  {
    switch
    (
      argChar_s
    )
    {
      case 'o'
      :
        method_s
        =
          'open'

        break

      case 'p'
      :
        method_s
        =
          'page'

        break
        
      default
      :
        break 
    }

    WIKI_o
      [ `${method_s}__s` ]
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
