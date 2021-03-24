const FS_o  = require( 'fs-extra' )



const CSS_o =
{
  selfClose_a:
    [
      'img', 'input', 'br', 'hr', 'area', 'base', 'col', 'command', 'embed', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
    ],

  path_s: '',

  path_a: [],

  //-- css_s : '',
  //-- line_a: [],
  //-- ruleset_s
  //-- lastRuleset_s
  //-- tagStack_a: [],
  //-- newStack_a: [],
  //-- lastTag_s: '',
  //-- selfClose_b

  ruleDelimiter_s: '\n',                //: '' to minify
  rulesetDelimiter_s: '}\n\n',          //: '}' to minify
  selectorRulesetDelimiter_s: ' {\n',   //: '{' to minify
  copyRulesetDelimiter_s: ',\n',        //: ',' to minify



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
          console.log( `-- Processing: ${CSS_o.path_s}` )

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

    let atMethod_s

    for
    (
      line_s
      of
      CSS_o
        .line_a
    )
    {

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
      .lastTag_s = ''    //: reset
    
    CSS_o
      .ruleset_s = ''  //: reset

    CSS_o
      .lastRuleset_s = ''  //: reset

    CSS_o
      .css_s = ''        //: reset
      
    CSS_o
      .selfClose_b = false        //: reset
      
    CSS_o
      .line_a =
        ccss_s
          .trim()
          .replace
          (
            /<!--[\s\S]*?-->/gm,  //: strip HTML comments
            ''
          )
          .replace
          (
            /\/\*[\s\S]*?\*\//gm,  //: strip CSS comments
            ''
          )
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
        /[\w-]/i
          .test( char_s )
      :
        return (
          line_s
            .indexOf( ':' )
          >
          -1
          ?
            'Rule'
          :
            line_s
              .indexOf( 'context' )
            >
            -1
            ?
              'Context'
            :
              'RuleTail'
        )
    
      case
        char_s
        ===
        '+'
      :
      case
        char_s
        ===
        '~'
      :
        return 'Sibling'
    
      case
        char_s
        ===
        '='
      :
        return 'Similar'
    
      default
      :
        return ''
    }
  }
  ,



  processRule__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .ruleset_s +=
        `${line_s}${CSS_o.ruleDelimiter_s}`
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
    let tag_s =
      line_s
        .slice( 1, -1 )    //: strip '<' and '>'
        .trim()            //: strip possible space

    if
    (
      tag_s
        .endsWith( '/' )
    )
    {
      tag_s =
        tag_s
          .slice
          (
            0,
            -1    //: strip end '/'
          )
    }

    const name_a =
      tag_s
        .match( /^([^:\[]+)/i )    //: exclude pseudo or attribute: name only

    if
    (
      name_a
      &&
      CSS_o
        .selfClose_a
          .includes( name_a[1] )  //: self closing tag missing closing '/'
    )
    {
      CSS_o
        .selfClose_b = true
    }

    CSS_o
      .add__v()

    CSS_o
      .tagStack_a
        .push( tag_s )
  }
  ,
    



  processClose__v:
  (
    line_s    //!!! not used
  ) =>
  {
    CSS_o
      .add__v()

    if
    (
      CSS_o
        .copy_b
    )
    {
      CSS_o
        .copy_b =
          false
      
      return    //: skip flushStack__v after copy
    }

    CSS_o
      .flushStack__v()
  }
  ,




  processSibling__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .tagStack_a
        .push
        (
          CSS_o
            .lastTag_s
          +
          ` ${line_s} `  //!!! endsWith space
        )
  }
  ,
    


  /*........................................
  processSimilar__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processSimilar__v: ${line_s}` )
  }
  ,
  */



 processUrl__v:
 (
   line_s
 ) =>
 {
   const url_a =
     line_s
         .match( /url\s?\(\s?([^\)]+?)\s?\)/i )

    if
    (
      ! url_a
    )
    {
      return void (
        console.log( `Error: url() is not valid` )
      )
    }

   CSS_o
     .path_a
       .push
       ( 
         {
           path_s: `${CSS_o.dir_s}${url_a[1]}`,
           stack_a: CSS_o
                      .tagStack_a
                      .slice()
         }
       )
 }
 ,
   



 processContext__v:
 (
   line_s
 ) =>
 {
    const context_a =
      line_s
          .match( /context\s?\(\s?([^\)]+?)\s?\)/i )

    if
    (
      ! context_a
    )
    {
      return void (
        console.log( `Error: context() is not valid` )
      )
    }

    const context_s =
      context_a[1]

    const param_a =
      context_s
        .split( ',' )

    switch
    (
      true
    )
    {
      case
        param_a[0]
        ===
        'url'
      :
      {
        CSS_o
        .path_a
            .push
            ( 
              {
                path_s: `${CSS_o.dir_s}${param_a[1].trim()}`,
                stack_a: CSS_o
                           .tagStack_a
                           .slice()
              }
            )

        return
      }

      case
        param_a[0]
        ===
        'copy'
      :
      {
        const lastTag_s =
          CSS_o
            .lastTag_s

        if
        (
          ! lastTag_s
        )
        {
          return ''
        }
        //>
        CSS_o
          .copy_b =
            true
        let lastTag_n =
          CSS_o
            .css_s
              .lastIndexOf( lastTag_s )

        const lastSelector_n =
          CSS_o
            .css_s
              .lastIndexOf
              (
                '}',
                lastTag_n
              )

        const lastSelector_s =
          CSS_o
            .css_s
              .slice
              (
                lastSelector_n + 1,
                lastTag_n
              )
              .trim()

        const insert_n =
          lastTag_n
          +
          lastTag_s
            .length

        const copyTag_s =
          CSS_o
            .tagStack_a
              .pop()

        const css_s =
          CSS_o
            .css_s
              .slice
              (
                0,
                insert_n
              )
          +
          `${CSS_o.copyRulesetDelimiter_s}${lastSelector_s} ${copyTag_s}`
          +
          CSS_o
            .css_s
              .slice( insert_n )

        CSS_o
          .css_s =
            css_s

        return
      }

      //...case
      //...  param_a[0]
      //...    .startsWith( 'resetStack' )
      //...:
      //...{
      //...   return
      //...}

      default:
        return
    }

  }
 ,
   



add__v:
  () =>
  {
    if
    (
      CSS_o
        .ruleset_s
    )
    {
      let selector_s = ''
  
      for
      (
        let at_s
        of
        CSS_o
          .tagStack_a
      )
      {
        selector_s +=
          ! selector_s    //: root selector
          ||
          selector_s
            .endsWith( ' ' )  //: sibling selector (endsWith space)
          ?
            `${at_s}`
          :
            ` > ${at_s}`
      }
  
      CSS_o
        .css_s +=
          `${selector_s}${CSS_o.selectorRulesetDelimiter_s}${CSS_o.ruleset_s}${CSS_o.rulesetDelimiter_s}`
    
      CSS_o
        .lastRuleset_s =
        CSS_o
          .ruleset_s

      CSS_o
        .ruleset_s = ''    //: reset

      if
      (
        CSS_o
          .selfClose_b
      )
      {
        CSS_o
          .flushStack__v()    //: line_s arg not needed

        CSS_o
          .selfClose_b =
            false    //: reset
      }
    }
  }
  ,




  flushStack__v:
  () =>
  {
    CSS_o
      .lastTag_s =
        CSS_o
          .tagStack_a
            .pop()

    while
    (
      CSS_o
        .lastTag_s
          ?.endsWith( ' ' )    //: flush sibling on stack
    )
    {
      CSS_o
        .lastTag_s =
          CSS_o
            .tagStack_a
              .pop()
    }
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
        out_o => console.log( `-- Writing ${path_s}: ${out_o}` )
      )
  }
  ,
}




void function
()
{
  const arg_a =
    process
      .argv
      .slice( 2 )

  if
  (
    ! arg_a[0]
  )
  {
    return void (
      console
        .log( `ERROR: CLI file path argument missing` )
    )
  }

  CSS_o
    .dir_s =
      arg_a[0]
        .slice
        (
          0,
          arg_a[0]
            .lastIndexOf( '/' ) + 1
        )

  CSS_o
    .path_s =
      arg_a[0]

  CSS_o
    .newStack_a = []

  CSS_o
    .read__s()
}()
