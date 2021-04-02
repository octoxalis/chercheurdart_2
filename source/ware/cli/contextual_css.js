const FS_o  = require( 'fs-extra' )



const CSS_o =
{
  path_s: '',

  proceed_a: [],

  //??sibling_a:
  //??[
  //??  CSS_o.ADJACENT_SIBLING_SELECTOR_s,
  //??  CSS_o.GENERAL_SIBLING_SELECTOR_s,
  //??],

  minify_b: false,    //: use context( minify ) to minify output

  //-- css_s : '',
  //-- ruleset_s: '',
  //-- lastRuleset_s: '',
  //-- line_a: [],
  //-- tagStack_a: [],
  //-- copyStack_a: [],
  //-- initStack_a: [],
  //-- lastTag_o: {},
  //-- close_b: false,    //: self-closing tag

  CHILD_SELECTOR_s: '>',
  GENERAL_SIBLING_SELECTOR_s: '~',
  ADJACENT_SIBLING_SELECTOR_s: '+',


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
          console
            .log( `-- Processing: ${CSS_o.path_s}` )

          CSS_o
            .parse__s( ccss_s )
        }
      )
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
        out_o =>    //: callback
          console
            .log( `-- Writing ${path_s}: ${out_o}` )
      )
  }
  ,





  parse__s:
  (
    ccss_s
  ) =>
  {
    //======================
    console
      .time('parse__s')
    //======================


    CSS_o
      .clean__v( ccss_s )

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
          [ `${method_s}__v` ]( line_s )
      }
    }

    if
    (
      CSS_o
        .ruleset_s    //: last ruleset not yet flushed
    )
    {
      CSS_o
        .close__v()
    }

    //=========================
    console
      .timeEnd('parse__s')
    //=========================

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
        .proceed_a
          .length
    )
    {
      const proceed_o =
        CSS_o
          .proceed_a
            .pop()

      CSS_o
        .path_s =
          proceed_o
            .path_s
  
      CSS_o
        .initStack_a =
          proceed_o
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
          .initStack_a
    
    CSS_o
      .copyStack_a = []     //: reset

    CSS_o
      .lastTag_o = {}       //: reset
    
    CSS_o
      .ruleset_s = ''       //: reset

    CSS_o
      .lastRuleset_s = ''   //: reset

    CSS_o
      .css_s = ''           //: reset
      
    CSS_o
      .close_b = false      //: reset
      
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
        .includes( 'cssComment' )  //: as context( cssComment )
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
      line_s[0]
      
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
          line_s[1]
          ===
          '/'
          ?
            'close'
          :
            'open'
        )
    
      case
        line_s
        ===
        CSS_o
          .ADJACENT_SIBLING_SELECTOR_s
      :
      case
        line_s
        ===
        CSS_o
          .GENERAL_SIBLING_SELECTOR_s
      :
        return 'sibling'
    
      case
        /context\s?\(\s?([^\)]+?)\s?\)/i
          .test( line_s )
      :
        return 'context'
    
      default
      :
        return (
          line_s
            .includes( ':' )    //: colon after ruleset property
          ?
            'ruleHead'
          :
            'ruleTail'
        )
    }
  }
  ,



  context__v:
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
        console
          .log( `Error: context() is not valid` )
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
          .proceed_a
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
        ===
        'standalone'    //: no stack context from proceeding function
      :
      {
        CSS_o
          .tagStack_a = []
 
        return
      }
 
      case
        function_s
        ===
        'minify'    //: minify output
      :
      {
        CSS_o
          .minify_b = true
 
        return
      }
 
      default:
        return
    }
 
   }
  ,
    
 
 
 
   ruleHead__v:
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
    



  ruleTail__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .ruleset_s +=
        ' '            //: space before
        +
        line_s
  }
  ,
    



  open__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .sweep__v()

    let endStack_o =
      CSS_o
        .endStack__o()

      while    //: stack popping to find opening tag
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
          CSS_o
            .CHILD_SELECTOR_s
        )
      )
      {
        CSS_o
          .flush__v()

        endStack_o =
          CSS_o
            .endStack__o()
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
      CSS_o
        .tagStack_a
          [end_n - 1]
            .sibling_s = ''    //: reset
    }

    const tag_s =
      CSS_o
        .tag__s( line_s )

    const tagStack_o =
      {
        tag_s: tag_s,
        tie_s: CSS_o
          .CHILD_SELECTOR_s
      }
      
    CSS_o
      .tagStack_a
        .push( tagStack_o )
  }
  ,
    



  close__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .takeUp__v()

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
      endStack_o
      &&
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
        CSS_o
          .CHILD_SELECTOR_s
      )
    )
    {
      CSS_o
        .flush__v()
    }
  }
  ,




  sibling__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .sweep__v()

    const tagStack_o =
      CSS_o
        .lastTag_o

    tagStack_o
      .tie_s =
        line_s

    tagStack_o
      .sibling_s =
        line_s

    CSS_o
      .tagStack_a
        .push( tagStack_o )

  }
  ,
  


  sweep__v:
  () =>
  {
    CSS_o
      .takeUp__v()    //: hanging previous tag ruleset

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

  }
  ,




  takeUp__v:
  () =>
  {
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
            ' {'      //: space before

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
          CSS_o
            .ruleset_s
          +
          '}'

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
        copy_s
        +
        ','      //: rulesset selector separator
        
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
        .slice
        (
          1,    //: strip starting '<'
          -1    //: strip ending '>'
        )

    if
    (
      tag_s
        .endsWith( '/' )    //: self-closing tag
    )
    {
      CSS_o
        .close_b = true

      tag_s =
        tag_s
          .slice
          (
            0,
            -1    //: strip ending '/'
          )
    }

    if
    (
      tag_s
        .startsWith( '/' )    //: closing tag
    )
    {
      tag_s =
        tag_s
          .slice( 1 )    //: strip starting '/'
    }

    return (
      tag_s
        .trim()    //: if space before or after tag name
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



/*XXXXXXXXXXXXXXXXXXXXXXXXXXX
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
*/



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
    .initStack_a = []

  CSS_o
    .read__s()
}()
