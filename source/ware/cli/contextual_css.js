const FS_o  = require( 'fs-extra' )



const CSS_o =
{
  path_s: '',

  path_a: [],

  //XX css_s : '',
  //XX line_a: [],
  //XX ruleStack_a: [],
  //XX tagStack_a: [],
  //XX lastTag_s: '',




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
          ;console.log( `-- Processing: ${CSS_o.path_s}` )

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
      .clean__v( ccss_s )        //;console.table( CSS_o.line_a )

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
        atMethod_s
        !==
        method_s
      )
      {
        atMethod_s =
          method_s
      }

      if
      (
        atMethod_s
      )
      {
        CSS_o
          [ `process${atMethod_s}__v` ]( line_s )
      }

      ++line_n
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

    //;console.table( CSS_o.path_a )
    if
    (
      CSS_o
        .path_a
          .length
    )
    {
      CSS_o
        .path_s =
          CSS_o
            .path_a
              .pop()
  
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
      .ruleStack_a = []  //: reset

    CSS_o
      .tagStack_a = []  //: reset
    
    CSS_o
      .lastTag_s = ''    //: reset
    
    CSS_o
      .css_s = ''        //: reset
      
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
      {
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
      }
    
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
              .indexOf( 'url(' )
            >
            -1
            ?
              'Url'
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
      .ruleStack_a
        .push( line_s )
  }
  ,
    



  processRuleTail__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .ruleStack_a
        [CSS_o.ruleStack_a.length - 1] +=
          ` ${line_s}`
  }
  ,
    



  processOpen__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .add__v()

    CSS_o
      .tagStack_a
        .push
        (
          line_s
            .slice( 1, -1 )    //: strip '<' and '>'
            .trim()            //: strip possible space
        )
  }
  ,
    



  processClose__v:
  (
    line_s
  ) =>
  {
    CSS_o
      .add__v()

    CSS_o
      .lastTag_s =
        CSS_o
          .tagStack_a
            .pop()

    while
    (
      CSS_o
        .lastTag_s
          .endsWith( ' ' )    //: flush sibling on stack
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
    



  processUrl__v:
  (
    line_s
  ) =>
  {
    const url_a =
      line_s
          .match( /url\s?\(\s?([\w.]+?)\s?\)/i )

    CSS_o
      .path_a
        .push( `${CSS_o.dir_s}${url_a[1]}` )
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



  add__v:
  () =>
  {
    if
    (
      CSS_o
        .ruleStack_a
          .length
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
        //.........;console.log( `selector: --${selector_s}--` )

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
  
      const ruleset_s =
        CSS_o
          .ruleStack_a
            .join( '\n' )
  
      CSS_o
        .css_s +=
          `${selector_s} {\n${ruleset_s}\n}\n\n`
    
      CSS_o
        .ruleStack_a = []    //: reset
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
      .slice( 2 )    //;console.table( arg_a )

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
    .read__s()

}()
