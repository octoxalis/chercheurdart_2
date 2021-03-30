const FS_o  = require( 'fs-extra' )



const CSS_o =
{
  minify_b: false,

  path_s: '',

  path_a: [],

  sibling_a:
  [
    '+',
    '~',
  ],

  //-- close_b: false,    //: self-closing tag
  //-- css_s : '',
  //-- line_a: [],
  //-- ruleset_s: '',
  //-- lastTag_o: {},
  //-- lastRuleset_s
  //-- tagStack_a: [],
  //-- newStack_a: [],
  //-- copyStack_a: [],



  read__s:
  () =>
    FS_o
      .readFile
      (
        CSS_o
          .path_s,
        'utf8' ,
        (            //: callback_f
          error_o,
          ccss_s
        ) =>
        {
          if
          (
            error_o
          )
          {
            return void (
              console
                .log( error_o )
            )
          }
          //>
          //--console.log( `-- Processing: ${CSS_o.path_s}` )

          CSS_o
            .process__s( ccss_s )
        }
      )
  ,




  process__s:
  (
    ccss_s
  ) =>
  {
    CSS_o
      .clean__v( ccss_s )

    let line_n = 0

    for
    (
      line_s
      of
      CSS_o
        .line_a
    )
    {
      //;console.log( line_s )

      if
      (
        ! line_s
      )
      {
        continue
      }

      const method_s =
        CSS_o
          .method__s( line_s )
      
      if
      (
        method_s
      )
      {
        CSS_o
          [ `process${method_s}__v` ]( line_s )
      }

      ++line_n
    }

    if
    (
      CSS_o
        .ruleset_s    //: last ruleset has not been flushed
    )
    {
      CSS_o
        .processClose__v()
    }

    if
    (
      CSS_o
        .css_s
    )
    {
      CSS_o
        .write__v
        (
          CSS_o
            .path__s(),
          CSS_o
            .css_s
        )
    }

    CSS_o
      .proceed__v()
  }
  ,




  proceed__v:
  () =>
  {
    if
    (
      CSS_o
        .path_a
          .length
    )
    {
      const path_o =
        CSS_o
          .path_a
            .pop()

      CSS_o
        .path_s =
          path_o
            .path_s
  
      CSS_o
        .newStack_a =
          path_o
            .stack_a
  
      CSS_o
        .read__s()
    }
  }
  ,




  clean__v:
  (
    ccss_s
  ) =>
  {
    CSS_o
      .tagStack_a =      //: inherit caller stack
        CSS_o
          .newStack_a
    
    CSS_o
      .copyStack_a = []     //: reset

    CSS_o
      .lastTag_o = {}    //: reset
    
    CSS_o
      .ruleset_s = ''  //: reset

    CSS_o
      .lastRuleset_s = ''  //: reset

    CSS_o
      .css_s = ''        //: reset
      
    CSS_o
      .close_b = false        //: reset
      
    ccss_s =
      ccss_s
        .trim()
        .replace
        (
          /<!--[\s\S]*?-->/gm,  //: strip HTML comments (before css comments)
          ''
        )

    if
    (
      ccss_s
        .indexOf( 'cssComment' )  //: as context( cssComment )
      ===
      -1  //: already removed if html commented out
    )
    {
      ccss_s =
        ccss_s
          .replace
          (
            /\/\*[\s\S]*?\*\//gm,  //: strip CSS comments
            ''
          )
    }

    CSS_o
      .line_a =
        ccss_s
          .split( '\n' )

    let at_n =
      CSS_o
        .line_a
          .length

    while
    (
      --at_n
    )
    {
      CSS_o
        .line_a
          [at_n] =
            CSS_o
              .line_a
                [at_n]
                  .trim()
      }
  }
  ,



  path__s:
  () =>
  {
    const path_s =
      CSS_o
        .path_s

    const file_s =
      path_s
        .slice
        (
          path_s
            .lastIndexOf( '/' ) + 1,
          path_s
            .lastIndexOf( '.' )
        )

    return `source/matrix/assets/styles/css/parts/contextual_css/${file_s}.css`    //...TEMPORARY
  }
  ,



  
  method__s:
  (
    line_s
  ) =>
  {
    const char_s =
      line_s
        .charAt( 0 )
      
    switch
    (
      true
    )
    {
      case
        char_s
        ===
        '<'
      :
        return (
          line_s
           .charAt( 1 )
          ===
          '/'
          ?
            'Close'
          :
            'Open'
        )
    
      case
        line_s
        ===
        '+'
      :
      case
        line_s
        ===
        '~'
      :
        return 'Sibling'
    
      case
        /context\s?\(\s?([^\)]+?)\s?\)/i
          .test( line_s )
      :
        return 'Context'
    
      default
      :
        return (
          line_s
            .indexOf( ':' )
          >
          -1
          ?
            'RuleHead'
          :
            'RuleTail'
        )
    }
  }
  ,



  processContext__v:
  (
    line_s
  ) =>
  {
    const [ , context_s ] =    //: ignore match[0]
      line_s
          .match( /context\s?\(\s?([^\)]+?)\s?\)/i )

    if
    (
      ! context_s
    )
    {
      return void (
        console.log( `Error: context() is not valid` )
      )
    }
 
    let [ function_s, arg_s ] =
      context_s
        .replace
        (
          ' ',
          ''
        )
        .split( ',' )

    switch
    (
      true
    )
    {
      case
        function_s
        ===
        'url'
      :
      {
        CSS_o
          .path_a
            .push
            ( 
              {
                path_s: `${CSS_o.dir_s}${arg_s}`,
                stack_a: CSS_o
                          .tagStack_a
                            .slice()
              }
            )
 
        return
      }
 
      case
        function_s
        ===
        'copy'
      :
      {
        CSS_o
          .copyStack_a
            .push
            (
              CSS_o
                .selector__s()
            )

        return
      }
 
      case
        function_s
          .startsWith( 'resetStack' )    //: 
      :
      {
        CSS_o
          .tagStack_a = []
 
        return
      }
 
      default:
        return
    }
 
   }
  ,
    
 
 
 
   processRuleHead__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .ruleset_s +=
        line_s
    
    if
    (
      ! CSS_o
        .minify_b
    )
    {
      CSS_o
        .ruleset_s += '\n'
    }
  }
  ,
    



  processRuleTail__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .ruleset_s +=
        ` ${line_s}`
  }
  ,
    



  processOpen__v:
  (
    line_s
  ) =>
  {
    //;console.log( line_s )

    CSS_o
      .add__v()    //: hanging previous tag ruleset

    if
    (
      CSS_o
        .close_b    //: previous enclosed tag was self-closing
    )
    {
      CSS_o
        .flush__v()
        
      CSS_o
        .close_b = false    //: reset
    }

    ;console.log( line_s )
    ;console.table( CSS_o.tagStack_a )

    let endStack_o =
      CSS_o
        .endStack__o()

      while
      (
        endStack_o
        &&
        (
          ! endStack_o
            .sibling_s
        )
        &&
        (
          endStack_o
            .tie_s
          !==
          '>'
        )
      )
      {
        CSS_o
          .flush__v()

        endStack_o =
          CSS_o
            .endStack__o()
      }


    const tag_s =
      CSS_o
        .tag__s( line_s )

    const newStack_o =
      {
        tag_s: tag_s,
        tie_s: '>'
      }
      
    let end_n =
      CSS_o
        .tagStack_a
          .length

    if
    (
      end_n
    )
    {
      //............. DO SOMETHING
      CSS_o
        .tagStack_a
          [end_n - 1]
            .sibling_s = ''    //: reset
    }

    CSS_o
      .tagStack_a
        .push( newStack_o )

    //;console.table( CSS_o.tagStack_a )
  }
  ,
    



  processClose__v:
  (
    line_s    //!!! not used
  ) =>
  {
    CSS_o
      .add__v()

    CSS_o
      .flush__v()

    const tag_s =
      CSS_o
        .tag__s( line_s )

    let endStack_o =
      CSS_o
        .endStack__o()

    if
    (
      ! endStack_o
    )
    {
      return
    }
    //>
    if
    (
      (
        tag_s
        ===
        endStack_o
          .tag_s
      )
      &&
      (
        endStack_o
          .tie_s
        ===
        '>'
      )
    )
    {
      CSS_o
        .flush__v()
    }
    ;console.log( line_s )
    ;console.table( CSS_o.tagStack_a )
  }
  ,




  processSibling__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .add__v()    //: hanging previous tag ruleset

    if
    (
      CSS_o
        .close_b    //: previous enclosed tag was self-closing
    )
    {
      CSS_o
        .flush__v()
        
      CSS_o
        .close_b = false    //: reset
    }

    //;console.log( '\n\n----------------------------------' )
    //;console.table( CSS_o.tagStack_a )
    
    const lastTag_o =
      CSS_o
        .lastTag_o

    lastTag_o
      .tie_s =
        line_s

    lastTag_o
      .sibling_s =
        line_s

    CSS_o
      .tagStack_a
        .push( lastTag_o )

    //;console.table( CSS_o.tagStack_a )
    //;console.log( '++++++++++++++++++++++++++++++++++\n\n' )
  }
  ,
  


  add__v:
  () =>
  {
    //;console.log( CSS_o.stack_s )
    //;console.table( CSS_o.tagStack_a )

    if
    (
      CSS_o
        .ruleset_s
    )
    {
      CSS_o
        .css_s +=
          CSS_o
            .copySelector__s()
          +
          CSS_o
            .selector__s()
          +
            ' {'

      if
      (
        ! CSS_o
          .minify_b
      )
      {
        CSS_o
          .css_s += '\n'
      }

      CSS_o
        .css_s +=
          `${CSS_o.ruleset_s}}`

      if
      (
        ! CSS_o
          .minify_b
      )
      {
        CSS_o
          .css_s += '\n\n'
      }
    
      CSS_o
        .lastRuleset_s =
        CSS_o
          .ruleset_s

      CSS_o
        .ruleset_s = ''    //: reset
    }
  }
  ,




  selector__s:
  () =>
  {
    let selector_s = ''
  
    let tie_s = ''

    for
    (
      let stack_o
      of
      CSS_o
        .tagStack_a
    )
    {
      selector_s +=
        ! selector_s    //: root selector
        ?
          stack_o
            .tag_s
        :
          ` ${tie_s} `  //: space before and after
          +
          stack_o
            .tag_s
          
      tie_s =
        stack_o.tie_s
    }

    //;console.log( selector_s )
    return selector_s
  }
  ,    




  copySelector__s:
  () =>
  {
    let selector_s = ''

    for
    (
      copy_s
      of
      CSS_o
        .copyStack_a
    )
    {
      selector_s +=
        `${copy_s},`
        
      if
      (
        ! CSS_o
          .minify_b
      )
      {
        selector_s += '\n'
      }
    }

    CSS_o
      .copyStack_a = []    //: reset

    return selector_s
  }
  ,    




  tag__s:
  (
    line_s
  ) =>
  {
    let tag_s =
      line_s
        .slice( 1, -1 )    //: strip '<' and '>'

    if
    (
      tag_s
        .endsWith( '/' )
    )
    {
      CSS_o
        .close_b = true

      tag_s =
        tag_s
          .slice
          (
            0,
            -1    //: strip end '/'
          )
    }

    if
    (
      tag_s
        .startsWith( '/' )
    )
    {
      tag_s =
        tag_s
          .slice( 1 )    //: strip start '/'
    }

    return (
      tag_s
        .trim()
    )
  }
  ,    




  flush__v:
  () =>
  {
    CSS_o
      .lastTag_o =
        CSS_o
          .tagStack_a
            .pop()
  }
  ,




  endStack__v:
  (
    tag_s,
    tie_s
  ) =>
  {
    let end_n =
      CSS_o
        .tagStack_a
          .length

    if
    (
      end_n
    )
    {
      CSS_o
        .tagStack_a
          [end_n - 1] =
            {
              tag_s: tag_s,
              tie_s: tie_s
            }
    }
  }
  ,




  endStack__o:
  () =>
  {
    let end_n =
      CSS_o
        .tagStack_a
          .length

    return (
      ! end_n
      ?
        null
      :
        CSS_o
          .tagStack_a
            [end_n - 1]
    )
  }
  ,




  write__v:
  (
    path_s,
    css_s
  ) =>
  {
    FS_o
      .writeFile
      (
        path_s,
        css_s,
        'utf8',
        out_o => console.log( ''/*`-- Writing ${path_s}: ${out_o}`*/ )
      )
  }
  ,
}




void function
()
{
  const path_s =
    process
      .argv
        .slice( 2 )
          [0]

  if
  (
    ! path_s
  )
  {
    return void (
      console
        .log( `ERROR: CLI file path argument missing` )
    )
  }

  CSS_o
    .dir_s =
      path_s
        .slice
        (
          0,
          path_s
            .lastIndexOf( '/' ) + 1
        )

  CSS_o
    .path_s =
      path_s

  CSS_o
    .newStack_a = []

  CSS_o
    .read__s()
}()



/*

 ;console.table( CSS_o.tagStack_a )

 */
