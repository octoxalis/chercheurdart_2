//: CLI: node source/make/cli/ccss.js  (from chercheurdart_2 dir)

const FS_o  = require( 'fs-extra' )
const C_o = require( '../data/C_o.js' )
const REX_o = require( '../lib/regex.js' )




const I_re =
  REX_o
    .new__re( 'i' )

const GM_re =
  REX_o
    .new__re( 'gm' )



const UN_o =
{
  INDENTATION_s: '  ',    //: double space




  unminify__s:
  (
    css_s
  ) =>
  {
    css_s =
      css_s
        .replace
        (
          GM_re
            `
            \{{2}
            `,       //: pattern: `{{`  //: preserve Nunjucks
          `_OPEN_NUNJUCKS_`
        )
        .replace
        (
          GM_re
            `
            \}{2}
            `,       //: pattern: `{{`  //: preserve Nunjucks
          `_CLOSE_NUNJUCKS_`
        )
        .replace
        (
          GM_re
            `
            \s*
            {
            \s*
            `,       //: pattern: ` { `
          ` {\n${UN_o.INDENTATION_s}`
        )
        .replace
        (
          GM_re
          `
          ;
          \s*
          `,         //: pattern: `; `
          `;\n${UN_o.INDENTATION_s}`
        )
        .replace
        (
          GM_re
          `
          ,
          \s*
          `,         //: pattern: `, `
          `, `
        )
        .replace
        (
          GM_re
          `
          [ ]*
          \}
          \s*
          `,       //: pattern: ` }`
          `}\n`
        )
        .replace
        (
          GM_re
          `
          ;
          \s*
          \/\*
          `,         //: pattern: ` /*`
          `;${UN_o.INDENTATION_s}/*`
        )
        .replace
        (
          GM_re
          `
          \*\/
          \}
          \n
        `,         //: pattern: `*/}`
          `*/\n}`
        )
        .replace
        (
          GM_re
          `
          \}
          \s*
          (.+)
          `,       //: pattern: `} ...`
          `}\n$1`
        )
        .replace
        (
          GM_re
          `
          \n
          \s{2}      //: double space indentation
          ([^:]+)
          :
          \s*
          `,         //: pattern: `property: `
          `\n${UN_o.INDENTATION_s}$1: `
        )
        .replace
        (
          GM_re
          `
          (
          [A-Za-z0-9\)]
          )
          \}
          `,         //: pattern: `10px)}`
          `$1;\n}`
        )
        .replace
        (
          GM_re
          `
          \n
          \s{2}      //: double space indentation
          @
          `,         //: pattern: ` @`  (at-rule)
          `\n@`      //: at line start
        )
        .replace
        (
          GM_re
            `
            _OPEN_NUNJUCKS_
            `,
          `{{`
        )
        .replace
        (
          GM_re
            `
            _CLOSE_NUNJUCKS_
            `,
          `}}`
        )
    return css_s
  }
}




const CCSS_o =
{
  INPUT_s:            C_o.CONTEXT_INPUT_FILE_s,    //: default input
  OUTPUT_s:           C_o.CONTEXT_PARTS_DIR_s,    //: default output directory
  CHILD_s:            '>',
  GENERAL_SIBLING_s:  '~',
  ADJACENT_SIBLING_s: '+',
  BLOCK_s:            'block',
  TAG_START_s:        '<',
  AT_RULE_s:          '@',
  AT_RULE_a:          //: at-rule keywords
  [
    'charset',        //: 0 argument
    'viewport',       //: idem
    'font-face',      //: idem

    'import',         //: 1 argument
    'namespace',      //: idem
    'counter-style',  //: idem
    'property',       //: idem
    'keyframes',      //: idem

    'media',
    'supports',
  ],
  CONTEXT_re:      //: pattern:  `context( stack, new )`
    I_re
    `
    context        //: contextual function name
    \s?            //: optional space after context function name
    \(             //: function opening parenthesis
    \s?            //: optional space after opening parenthesis
    ([^\)]+?)      //: anything before closing parenthesis
    \s?            //: optional space before closing parenthesis
    \)             //: function closing parenthesis
    `,
  
  proceedStack_a: [],    //: FIFO
  block_a: [],
  
  //-- line_a: [],
  //-- line_n: 0,         //: line_a iterator index
  //-- tagStack_a: [],    //: LIFO
  //-- copyStack_a: [],   //: LIFO
  //-- initStack_a: [],   //: LIFO
  //-- path_s: '',
  //-- outputDir_s: ''        //: output directory
  //-- css_s : '',
  //-- ruleset_s: '',
  //-- lastTag_o: {},
  //-- atRule_o: {},
  //-- stackState_s: '',    //: stack in selector
  //-- class_s: '',         //: replace selector by defined context class
  //-- close_b: false,      //: self-closing tag

  stdout_b:   false,  //: output to console, not file
  unminify_b: false,  //: minified output
  verbose_b:  false,  //: output file writing info




  proceed__v:
  () =>
  {
    if
    (
      CCSS_o
        .proceedStack_a
          .length
    )
    {
      const proceed_o =
        CCSS_o
          .proceedStack_a
            .shift()

      CCSS_o
        .path_s =
          proceed_o
            .path_s

      CCSS_o
        .initStack_a =
          proceed_o
            .stack_a
  
      CCSS_o
        .read__v()
    }
  }
  ,




  read__v:
  () =>
    FS_o
      .readFile
      (
        CCSS_o
          .path_s,
        'utf8' ,
        (            //: callback_f
          error_o,
          parse_s
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
          CCSS_o
            .parse__v( parse_s )
        }
      )
  ,




  write__v:
  (
    path_s,
    css_s
  ) =>
  {
    if
    (
      CCSS_o
        .unminify_b
    )
    {
      css_s =
        UN_o
          .unminify__s( css_s )
    }

    if
    (
      CCSS_o
        .stdout_b
    )
    {
      console
        .log( `\n----\nWriting ${path_s}\n----\n` )

      console
        .log( css_s)

      return
    }

    FS_o
      .writeFile
      (
        path_s,
        css_s,
        'utf8',
        out_o =>    //: callback_f
          {
            if
            (
              CCSS_o
                .verbose_b
            )
            {
              const out_s =
                out_o
                ?
                  'ERROR'
                :
                  'OK'

              console
                .log( `\n----\nWriting ${path_s}: (${out_s})\n----\n` )
            }
          }
      )
  }
  ,




  parse__v:
  (
    parse_s
  ) =>
  {
    //======================
    if
    (
      CCSS_o
        .verbose_b
    )
    {
      console
        .time('parse__v')
    }
    //======================


    CCSS_o
      .init__v( parse_s )

    while
    (
      CCSS_o
        .line_n
      <
      CCSS_o
        .line_a
          .length
    )
    {
      let line_s =
        CCSS_o
          .line_a
            [CCSS_o.line_n++]
              .trim()

      if
      (
        ! line_s
      )
      {
        continue
      }

      const method_s =
        CCSS_o
          .method__s( line_s )
      
      if
      (
        method_s
      )
      {
        CCSS_o
          [ `${method_s}__v` ]( line_s )
      }
    }

    if
    (
      CCSS_o
        .ruleset_s    //: last ruleset not yet flushed
    )
    {
      CCSS_o
        .close__v()
    }

    //=========================
    if
    (
      CCSS_o
        .verbose_b
    )
    {
      console
        .timeEnd('parse__v')
    }
    //=========================

    if
    (
      CCSS_o
        .css_s
    )
    {
      CCSS_o
        .write__v
        (
          CCSS_o
            .path__s(),
          CCSS_o
            .css_s
        )
    }

    CCSS_o
      .proceed__v()
  }
  ,



  init__v:
  (
    parse_s
  ) =>
  {
    parse_s =
      parse_s
        .trim()
        .replace
        (
          GM_re
            `
            <!--        //: HTML comment opening
            [\s\S]*?    //: anything inside
            -->         //: HTML comment closing
            `,          //: pattern:  `<!-- comment -->`
          ''            //: strip HTML comments (before css comments)
        )

    if
    (
      ! I_re
          `
          context        //: contextual function name
          \s?            //: optional space after context function name
          \(             //: function opening parenthesis
          \s?            //: optional space after opening parenthesis
          comment        //: comment argument
          \s?            //: optional space before closing parenthesis
          \)             //: function closing parenthesis
          `              //: pattern:  `context( comment )`
          .test( parse_s )
    )
    {
      parse_s =
        parse_s
          .replace
          (
            GM_re
              `
              \/\*        //: HTML comment opening
              [\s\S]*?    //: anything inside
              \*\/        //: HTML comment closing
              `,          //: pattern:  `/* comment */`
            ''            //: strip CSS comments
          )
    }

    CCSS_o
      .line_a =
        parse_s
          .split( '\n' )

    CCSS_o
      .line_n = 0

    CCSS_o
      .tagStack_a =      //: inherit caller stack
        CCSS_o
          .initStack_a
    
    CCSS_o
      .copyStack_a = []     //: reset

    CCSS_o
      .stackState_s = ''    //: reset


    CCSS_o
      .lastTag_o = {}       //: reset
    
    CCSS_o
      .ruleset_s = ''       //: reset

    CCSS_o
      .atRule_o = {}        //: reset

    CCSS_o
      .css_s = ''           //: reset
      
    CCSS_o
      .close_b = false      //: reset
  }
  ,




  path__s:
  () =>
  {
    const path_s =
      CCSS_o
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

    return (
      CCSS_o
        .outputDir_s
      +
      file_s
        .replace
        (
          '.context',
          ''            //: strip '.context' if present
        )
      +
      '.css'
    )
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
        CCSS_o.TAG_START_s
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
        char_s
        ===
        CCSS_o.AT_RULE_s
      :
        return 'atRule'

      case
        line_s
        ===
        CCSS_o.ADJACENT_SIBLING_s
      :
      case
        line_s
        ===
        CCSS_o.GENERAL_SIBLING_s
      :
        return 'sibling'
    
      case
        CCSS_o
          .CONTEXT_re
            .test( line_s )
      :
        return 'context'
    
      default
      :
        return 'rule'
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
        .match
        (
          CCSS_o
            .CONTEXT_re
        )

    if
    (
      ! context_s
    )
    {
      return void (
        console
          .log( `Error: invalid context function` )
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
      function_s
    )
    {
      case
        'url'
      :
      {
        CCSS_o
          .proceedStack_a
            .push
            ( 
              {
                path_s: `${CCSS_o.dir_s}${arg_s}`,
                stack_a: CCSS_o
                          .tagStack_a
                            .slice()    //: stack copy
              }
            )
 
        return
      }
 
      case
        'block'
      :
      {
        let block_s =
          CCSS_o
            .block_a
              [arg_s]

        if
        (
          ! block_s
        )
        {
          const error_s =
            `ERROR: "${arg_s}" statements block is missing`
            
          console.log( error_s )

          block_s =
          `/* ${error_s} */\n`
        }

        CCSS_o
          .ruleset_s +=
            block_s

        return
      }
 
      case
        'copy'
      :
      {
        CCSS_o
          .copyStack_a
            .push
            (
              CCSS_o
                .selector__s()
            )

        return
      }
 
      case
        'stack'
      :
      {
        CCSS_o
          .stack__v( arg_s )
 
        return
      }
    }
   }
  ,
    
 
 
 
  stack__v:
  (
    state_s
  ) =>
  {
    switch
    (
      state_s
    )
    {
      case
        'keep'
      :
      {
        CCSS_o
          .stackState_s = ''    //: default state
  
        return
      }
    
      case
        'ignore'
      :
      {
        CCSS_o
          .stackState_s = 'ignore'
  
        return
      }
    
      case
        'new'    //: reset stack
      :
      {
        CCSS_o
          .tagStack_a = []
  
        CCSS_o
          .stackState_s = ''    //: default state
  
        return
      }
    }
  }
  ,
    


  rule__v:
  (
    line_s
  ) =>
  {
    CCSS_o
      .ruleset_s +=
        line_s
  }
  ,
    



  open__v:
  (
    line_s
  ) =>
  {
    CCSS_o
      .sweep__v()

    let endStack_o =
      CCSS_o
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
          CCSS_o.CHILD_s
        )
      )
      {
        CCSS_o
          .flush__v()

        endStack_o =
          CCSS_o
            .endStack__o()
      }

    let end_n =
      CCSS_o
        .tagStack_a
          .length

    if
    (
      end_n
    )
    {
      CCSS_o
        .tagStack_a
          [end_n - 1]
            .sibling_s = ''    //: reset
    }

    const tag_s =
      CCSS_o
        .tag__s( line_s )

    if
    (
      tag_s
        .startsWith( CCSS_o.BLOCK_s )
      &&
      tag_s
      !==
      'blockquote'
    )
    {
      CCSS_o
        .block_s =
          CCSS_o
            .block__s( line_s )
    }

    const tagStack_o =
      {
        tag_s: tag_s,
        tie_s: CCSS_o.CHILD_s
      }
      
    CCSS_o
      .tagStack_a
        .push( tagStack_o )
  }
  ,
    


  close__v:
  (
    line_s
  ) =>
  {
    CCSS_o
      .takeUp__v()

    CCSS_o
      .flush__v()

    const tag_s =
      CCSS_o
        .tag__s( line_s )

    let endStack_o =
      CCSS_o
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
        CCSS_o.CHILD_s
      )
    )
    {
      CCSS_o
        .flush__v()
    }
  }
  ,




  sibling__v:
  (
    line_s
  ) =>
  {
    CCSS_o
      .sweep__v()

    const tagStack_o =
      CCSS_o
        .lastTag_o

    tagStack_o
      .tie_s =
        line_s

    tagStack_o
      .sibling_s =
        line_s

    CCSS_o
      .tagStack_a
        .push( tagStack_o )
  }
  ,
  


  block__s:
  (
    line_s
  ) =>
  {
    line_s =
      line_s
        .slice
        (
          1,    //: strip starting '<'
          -1    //: strip ending '>'
        )

    return (
      line_s
        .replace
        (
          CCSS_o.BLOCK_s,
          ''
        )
        .trim()
    )
  }
  ,




  atRule__v:
  (
    line_s
  ) =>
  {
    const keyword_s =
      line_s
        .slice( 1 )      //: skip CCSS_o.AT_RULE_s
        

    if
    (
      ! keyword_s    //: closing @media || @supports -> takeup
    )
    {
      CCSS_o
        .css_s +=
          `@${CCSS_o.atRule_o.keyword_s} `  //: space
          + `${CCSS_o.atRule_o.target_s} `    //: space
          + `{`
          + `${CCSS_o.atRule_o.css_s}`
          + `}`

      CCSS_o
        .atRule_o = {}    //: reset

      return
    }
    //>
    
    let target_s = ''    //: target, condition, name

    let target_b = false

    let statement_s = ''

    while    //: parse lines till start of statements (@media, @supports) or end (other at-rules)
    (
      CCSS_o
        .line_n
      <
      CCSS_o
        .line_a
          .length
    )
    {
      let line_s =
        CCSS_o
          .line_a
            [CCSS_o.line_n++]
              .trim()

      if
      (
        line_s
        ===
        CCSS_o.AT_RULE_s    //: closing at-rule
      )
      {
        if
        (
          CCSS_o.AT_RULE_a
            .includes( keyword_s )
          &&
          statement_s
        )
        {
          CCSS_o
            .css_s +=
              CCSS_o
                .atRule__s
                (
                  keyword_s,
                  target_s,
                  statement_s
                )
        }

        break
      }

      if
      (
        ! target_s    //: start target_s parsing
      )
      {
        target_s =
          line_s

        target_b =
          true

        continue
      }

      if
      (
        ! line_s       //: empty line to end target_s list
        && target_b    //: target_s parsing finished
      )
      {
        target_b =
          false      //: reset

        continue
      }

      if
      (
        target_b    //: still parsing target_s - test after previous one
      )
      {
        target_s +=
          ` ${line_s}`    //: space separator before

        continue
      }

      if
      (
        keyword_s
        ===
        'media'
        ||
        keyword_s
        ===
        'supports'    //: let html parse at-rule statements
      )
      {
        CCSS_o
          .atRule_o =
            {
              keyword_s: keyword_s,
              target_s: target_s,
              statement_s: statement_s,
              css_s: ''
            }

        return
      }
      //>
      statement_s +=      //: follow on parsing statements
        line_s
    }
  }
  ,


  atRule__s:
  (
    keyword_s,
    target_s,
    statement_s
  ) =>
  {
    let atRule_s

    statement_s =
      statement_s
        .replaceAll
        (
          ': ',
          ':'      //: remove space
        )
        .trim()

    switch
    (
      keyword_s
    )
    {
      case
        'import'
      :
        atRule_s =
          CCSS_o
            .checkRuleEnd__s
            (
              `@${keyword_s} ${statement_s} ${target_s}`
            )

        break
    
      case
        'charset'
      :
        atRule_s =
          CCSS_o
            .checkRuleEnd__s
            (
              `@${keyword_s} ${statement_s}`
            )

        break
    
      case
        'namespace'
      :
        atRule_s =
          CCSS_o
            .checkRuleEnd__s
            (
              `@${keyword_s} ${target_s} ${statement_s}`
            )

        break
    
      case
        'viewport'
      :
      case
        'font-face'
      :
        atRule_s =
          `@${keyword_s} {${statement_s}}`

        break
    
      //--case
      //--  'counter-style'
      //--:
      //--case
      //--  'property'
      //--:
      //--case
      //--  'keyframes'
      //--:
      default
      :
        atRule_s =
          `@${keyword_s} ${target_s} {${statement_s}}`

        break
    }

    return atRule_s
  }
  ,



  checkRuleEnd__s:
  (
    atRule_s
  ) =>
    atRule_s
      .endsWith( ';' )
    ?
      atRule_s
    :
      atRule_s
      +
      ';'
  ,




  selector__s:
  () =>
  {
    
    if
    (
      CCSS_o
        .stackState_s
      ===
      'ignore'
    )
    {
      return (
        CCSS_o
          .endStack__o()
            ?.tag_s
        ||
        ''
        )
    }
        
    let selector_s = ''

    let tie_s = ''

    for
    (
      let stack_o
      of
      CCSS_o
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
      CCSS_o
        .copyStack_a
    )
    {
      selector_s +=
        copy_s
        +
        ','      //: ruleset separator
    }

    CCSS_o
      .copyStack_a = []    //: reset

    return selector_s
  }
  ,    




  classSelector__s:
  () =>
  {
    let selector_s =
      CCSS_o
        .selector__s()

    if
    (
      CCSS_o
        .class_s
    )
    {
      selector_s =
        `/*${selector_s}*/`
        +
        CCSS_o
         .class_s

      CCSS_o
        .class_s = ''    //: reset
    }

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
      CCSS_o
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

    tag_s =
      tag_s
        .trim()    //: if space before or after tag name

    const match_a =
      tag_s
        .match
        (
          I_re
            `
            [a-z1-6]+?    //: tag name (including h1-h6)
            \s+           //: mandatory space
            class         //: 'class' attribute
            \s*           //: optional space before equal operator
            =             //: equal operator
            \s*           //: optional space after equal operator
            (?:"|')       //: opening quote or double quote
            ([^"']+?)     //: anything as quoted value
            (?:"|')       //: closing quote or double quote
            `             //: pattern:  `h1 class="header"`
        )
    
    if
    (
      match_a
        ?.length
    )
    {
      tag_s =
        `.${match_a[1]}`
    }

    return tag_s
  }
  ,    




  flush__v:
  () =>
  {
    CCSS_o
      .lastTag_o =
        CCSS_o
          .tagStack_a
            .pop()
  }
  ,



  
  takeUp__v:
  () =>
  {
    if
    (
      CCSS_o
        .ruleset_s
    )
    {
      if
      (
        CCSS_o
          .block_s
      )
      {
        CCSS_o
          .block_a
            [CCSS_o.block_s] =
              CCSS_o
                .ruleset_s

        CCSS_o
          .block_s = ''    //: reset
      }
      else
      {
        let css_s =
          CCSS_o
            .copySelector__s()
          +
          CCSS_o
            .classSelector__s()
          +
          ' {'      //: space before
  
        css_s +=
          CCSS_o
            .ruleset_s
          +
          '}'

        if
        (
          CCSS_o
            .atRule_o
              .keyword_s
        )
        {
          CCSS_o
            .atRule_o
              .css_s +=
                css_s
        }
        else
        {
          CCSS_o
            .css_s +=
              css_s
        }
      }
    
      CCSS_o
        .ruleset_s = ''    //: reset
    }
  }
  ,




  sweep__v:
  () =>
  {
    CCSS_o
      .takeUp__v()    //: previous tag has hanging ruleset

    if
    (
      CCSS_o
        .close_b    //: previous tag was self-closing
    )
    {
      CCSS_o
        .flush__v()
        
      CCSS_o
        .close_b = false    //: reset
    }

  }
  ,




  endStack__o:
  () =>
  {
    let end_n =
      CCSS_o
        .tagStack_a
          .length

    return (
      ! end_n
      ?
        null
      :
        CCSS_o
          .tagStack_a
            [end_n - 1]
    )
  }
  ,
}



void function
()
{
  const help_s =
    `Valid arguments:
    \t(1) [optional] input file path (default: html.context.html)
    \t(2) [optional] output directory path (default: ./)
    \t(3) [optional] --s (stdout output)
    \t(4) [optional] --u (unminify output)
    \t(5) [optional] --v (verbose)
    \t(5) [optional] --h (help)`

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
  //>

  for
  (
    let arg_s
    of
    [
      'stdout',
      'unminify',
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
      CCSS_o
        [`${arg_s}_b`] =
          true
  
       arg_a =
         arg_a
           .filter
           (
             slot_s => slot_s !== `--${argChar_s}`
           )
    }
  }

  const invalidArg_a = []

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

  let path_s

  let outputDir_s

  switch
  (
    arg_a
      .length
  )
  {
    case
      2
    :
      [ path_s, outputDir_s ] =
        arg_a
          
      break

    case
      1
    :
      if
      (
        arg_a
          [0]
            .endsWith( '/' )    //: directory
      )
      {
        outputDir_s =
          arg_a
            [0]    //: output file (*.css) directory
  
        path_s =
          CCSS_o
            .INPUT_s
      }
      else
      {
        path_s =
          arg_a
            [0]      //: input file (*.context.html)
      }
        
      break

    default
    :
      path_s =
        CCSS_o
          .INPUT_s
    
      outputDir_s =
        CCSS_o
          .OUTPUT_s
  }

  if
  (
    path_s
    &&
    outputDir_s
  )
  {
    CCSS_o
      .dir_s =
        path_s
          .slice
          (
            0,
            path_s
              .lastIndexOf( '/' ) + 1
          )
  
    CCSS_o
      .outputDir_s =
        outputDir_s

    CCSS_o
      .proceedStack_a
        .push
        ( 
          {
            path_s: path_s,
            stack_a: []
          }
        )
  
    CCSS_o
      .proceed__v()

    return
  }

  console
    .log( help_s )
}()
