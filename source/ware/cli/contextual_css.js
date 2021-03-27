const FS_o  = require( 'fs-extra' )



const CSS_o =
{
  //XXselfClose_a:
  //XX  [
  //XX    'img', 'input', 'br', 'hr',  //: used tags only
  //XX    //-- 'area', 'base', 'col', 'command', 'embed', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
  //XX  ],

  path_s: '',

  path_a: [],

  //-- css_s : '',
  //-- line_a: [],
  //-- ruleset_s
  //-- lastRuleset_s
  //-- tagStack_a: [],
  //-- newStack_a: [],
  //-- lastTag_s: '',
  //-- selfClose_b,
  //-- copyStack_a: [],

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

    let atMethod_s

    for
    (
      line_s
      of
      CSS_o
        .line_a
    )
    {
      ;console.log( line_s )

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
      .copyStack_a = []     //: reset

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
    const [ nouse_s, context_s ] =
      line_s
          .match( /context\s?\(\s?([^\)]+?)\s?\)/i )

    //XXif
    //XX(
    //XX  ! context_a
    //XX)
    //XX{
    //XX  return void (
    //XX    console.log( `Error: context() is not valid` )
    //XX  )
    //XX}
 
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
      CSS_o
        .selfClose_b = true

      tag_s =
        tag_s
          .slice
          (
            0,
            -1    //: strip end '/'
          )
    }

    //XXconst name_a =
    //XX  tag_s
    //XX    .match( /^([^:\[]+)/i )    //: exclude pseudo or attribute: name only

    //XXif
    //XX(
    //XX  name_a
    //XX  &&
    //XX  CSS_o
    //XX    .selfClose_a
    //XX      .includes( name_a[1] )  //: self closing tag missing closing '/'
    //XX)
    //XX{
    //XX  CSS_o
    //XX    .selfClose_b = true
    //XX}

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
      .stack_s =
      CSS_o
        .lastTag_s
      +
      ` ${line_s} `  //!!! endsWith space

    CSS_o
      .tagStack_a
        .push( CSS_o.stack_s )
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
      let selector_s =
        CSS_o
          .copySelector__s()
        +
        CSS_o
          .selector__s()
  
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
      //;console.table( CSS_o.tagStack_a )
  
      }
  }
  ,




  selector__s:
  () =>
  {
    let selector_s = ''
  
    for
    (
      let tag_s
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
          `${tag_s}`
        :
          ` > ${tag_s}`
    }

    return selector_s
  }
  ,    




  copySelector__s:
  () =>
  {
    if
    (
      ! CSS_o
        .copyStack_a
          .length
    )
    {
      return ''
    }

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
        `${copy_s}${CSS_o.copyRulesetDelimiter_s}`
    }

    CSS_o
      .copyStack_a = []    //: reset

    return selector_s
  }
  ,    




  flushStack__v:
  () =>
  {
    ;console.table( CSS_o.tagStack_a )
    CSS_o
      .lastTag_s =
        CSS_o
          .tagStack_a
            .pop()
    ;console.table( CSS_o.tagStack_a )

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
    //;console.table( CSS_o.tagStack_a )
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
