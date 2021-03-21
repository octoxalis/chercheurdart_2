const FS_o  = require( 'fs-extra' )



const CSS_o =
{
  path_s: '',

  line_a: [],

  ruleStack_a: [],

  tagStack_a: [],

  lastRuleset: '',

  css_s : '',




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

    let path_s =
      CSS_o
        .path_s      //;console.log( path_s )

    //.............. TEMPORARY
    //XXCSS_o
    //XX  .css_s =
    //XX    CSS_o
    //XX      .path__s()
    //...............

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
  }
  ,




  clean__v:
  (
    ccss_s
  ) =>
  {
    CSS_o
      .line_a =
        ccss_s
          .trim()
          .replace
          (
            /<!--[\s\S]+?-->/gm,  //: strip HTML comments
            ''
          )
          .replace
          (
            /\/\*[\s\S]+?\*\//gm,  //: strip CSS comments
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
        ':'
      :
        return 'Pseudo'
    
      case
        char_s
        ===
        '['
      :
        return 'Attribute'
    
      case
        char_s
        ===
        '+'
      :
        return 'AdjacentSibling'
    
      case
        char_s
        ===
        '~'
      :
        return 'GeneralSibling'
    
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
    //;console.log( `processRule__v: ${line_s}` )

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
    //;console.log( `processRuleTail__v: ${line_s}` )

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
    //;console.log( `processOpen__v: ${line_s}` )

    CSS_o
      .add__v()

    CSS_o
      .popPseudo__v()

    CSS_o
      .popSelfClose__v()

    CSS_o
      .tagStack_a
        .push
        (
          line_s
            .slice( 1, -1 )    //: strip '<' and '>'
            .trim()            //: strip possible space
        )

    ;console.log( CSS_o.tagStack_a )
  }
  ,
    



  processClose__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processClose__v: ${line_s}` )

    CSS_o
      .add__v()

    CSS_o
      .popPseudo__v()

    CSS_o
      .popSelfClose__v()

    const tag_s =
      CSS_o
        .tagStack_a
          .pop()

    ;console.log( CSS_o.tagStack_a )
  }
  ,
    



  processUrl__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processUrl__v: ${line_s}` )
  }
  ,
    



  processPseudo__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processPseudo__v: ${line_s}` )

    CSS_o
      .add__v()

    CSS_o
      .tagStack_a
        .push
        (
          line_s
            .trim()            //: strip possible space
        )
  }
  ,
    



  processAttribute__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processAttribute__v: ${line_s}` )
  }
  ,
    



  processGeneralSibling__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processGeneralSibling__v: ${line_s}` )
  }
  ,
    



  processAdjacentSibling__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processAdjacentSibling__v: ${line_s}` )
  }
  ,
    



  processSimilar__v:
  (
    line_s
  ) =>
  {
    //;console.log( `processSimilar__v: ${line_s}` )
  }
  ,
    



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
        let part_s
        of
        CSS_o
          .tagStack_a
      )
      {
        if
        (
          part_s
            .endsWith( '/' )    //: self-closing tag
        )
        {
          part_s =
            part_s
              .slice
              (
                0,
                -1    //: strip '/'
              )
        }

        selector_s +=
          part_s
            .charAt( 0 )
          ===
          ':'
          ?
            `${part_s}`
          :
            selector_s
            ?
            ` > ${part_s}`
            :
            `${part_s}`
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




  popPseudo__v:
  () =>
  {
    //;console.log( CSS_o.tagStack_a[CSS_o.tagStack_a.length - 1] )

   if
   (
     CSS_o
       .tagStack_a
         .length
     >
     2    //: tag + pseudo
   )
   {
      let last_s =
        CSS_o
          .lastTag__s()
  
      while
      (
        last_s
          .charAt( 0 )
        ===
        ':'
      )
      {
        CSS_o
          .tagStack_a
            .pop()         //: remove previous pseudo rule
  
        last_s =
          CSS_o
            .lastTag__s()
      }
    }
  }
  ,



  popSelfClose__v:
  () =>
  {
    if
    (
      CSS_o
        .lastTag__s()
          ?.endsWith( '/' )
    )
    {
      CSS_o
        .tagStack_a
          .pop()         //: remove previous pseudo rule
}
  }
  ,




  lastTag__s:
  () =>
    CSS_o
      .tagStack_a
        [CSS_o.tagStack_a.length - 1]
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
    .path_s =
      arg_a[0]

  CSS_o
    .read__s()
}()
