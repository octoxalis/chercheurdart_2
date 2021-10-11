//: CLI: node source/make/cli/topics.js  (from chercheurdart_2 dir)

const FS_o = require( 'fs-extra' )

const REX_o = require( '../lib/regex.js' )

const C_o =   require( '../data/C_o.js' )
const X_o =   require( '../data/X_o.js' )



const TOP_o =
{
  DOCS_TOPICS_s:  `source/make/topics/docs_topics_words.json`,
  TOPICS_DOCS_s:  `source/make/topics/topics_docs.json`,
  DOCS_WORDS_s :  `source/make/topics/docs_words.txt`,

  range_a: new Array( X_o.CAT_RANGE_n + 1 ),       //: document doc_n by ranges [0-2^10]
  
  //!!! double slash for template String
  ARRAY_s:      //: topics_a and words_a front matter JS Arrays
    `       //: JS Array declaration
    \\s*?   //: optional space, non-greedy
    (       //: open capture group
    \\[     //: opening Array bracket
    \\s*?   //: optional space, non-greedy
    [       //: open char range
    ^\\]    //: everything except close Array bracket
    ]       //: close char range
    +?      //: 1 or more chars in that range, non-greedy
    \\s*?   //: optional space, non-greedy
    \\]     //: closing Array bracket
    )       //: close capture group
    `
  ,
  
  DOC_n:    //: doc_n front matter JS property
    `
    \\s*?   //: optional space, non-greedy
    (       //: open capture group
    -*?     //: optional negative sign
    \\d     //: digit
    +?      //: non-greedy...
    )       //: close capture group
    \\s*?   //: optional space, non-greedy
    ,       //: object properties separator
    `
  ,
  
  TITLE_s:  //: title_s front matter JS property
    `
    \\s*?     //: optional space, non-greedy
    \\\`      //: backtick string delimiter
    (         //: open capture group
    [\\w\\W]  //: everything
    +?        //: non-greedy...
    )         //: close capture group
    \\\`      //: backtick string delimiter
    `
  ,

  PERMALINK_s:      //: permalink front matter JS property
    `
    \\s*?   //: optional space, non-greedy
    (?:'|") //: string delimiter
    (       //: open capture group
    \\w     //: word char
    +?      //: non-greedy...
    )       //: close capture group
    \.html  //: file extension
    (?:'|") //: string delimiter
    `
  ,
  
  WORD_s:      //: content indexed words
    `
    ${X_o.WORD_OPEN_s}    //: opening word delimiter
    (                     //: open capture group
    [                     //: open capture group
    \\s\\S                //: anything
    ]                     //: close capture group
    +?                    //: non-greedy
    )                     //: close capture group
    ${X_o.WORD_CLOSE_s}   //: closing word delimiter
    `
  ,



    concat__s:
    (
      array_s    //: front matter Array (topics or words)
    ) =>
    {
      const array_a =
        eval( array_s )

      return (
        array_a
          .map
          (
            item_s =>
              item_s
                .replaceAll
                (
                  C_o.WORDS_DELIM_s,
                  C_o.WORDS_CONCAT_s
                )
          )
          .join( C_o.WORDS_DELIM_s )
      )
    }
    ,
    
    
    
    docs__o:
    (
      source_s    //: front matter + markdown (*.md file)
    ) =>
    {
      const docs_o =
        {
          doc_n:    0,
          doc_s:    '',
          topics_s: null,
          words_s:  null
        }

      const G_re =
        REX_o
          .new__re( 'g' )    //: global regex

      const SM_re =
        REX_o
        .new__re( 'sm' )    //: multiline regex
    
      //:==================== doc_n
      const docN_a =
        source_s
          .match
          (
            SM_re
              `
              doc_n:     //: JS front matter number
              ${TOP_o.DOC_n}
          `
          )

      if
      (
        docN_a
      )
      {
        docs_o.doc_n =
          +docN_a[1]    //: Number cast
      }
    
      //:==================== tile_s
      const titleS_a =
        source_s
          .match
          (
            SM_re
              `
              title_s:     //: JS front matter String
              ${TOP_o.TITLE_s}
          `
          )

      if
      (
        titleS_a
      )
      {
        docs_o.title_s =
          titleS_a[1]
      }
    
      //:==================== subtile_s
      const subtitleS_a =
        source_s
          .match
          (
            SM_re
              `
              subtitle_s:     //: JS front matter String
              ${TOP_o.TITLE_s}
          `
          )

      if
      (
        subtitleS_a
      )
      {
        docs_o.subtitle_s =
          subtitleS_a[1]
      }
    
      //:==================== doc_s
      const docS_a =
        source_s
          .match
          (
            SM_re
              `
              permalink:     //: JS front matter String
              ${TOP_o.PERMALINK_s}
          `
          )

      if
      (
        docS_a
      )
      {
        docs_o.doc_s =
          docS_a[1]
      }
    
      //:==================== topics
      let topics_a =
        source_s
          .match
          (
            SM_re
              `
              topics_a:     //: JS front matter Array
              ${TOP_o.ARRAY_s}
            `
          )

      if
      (
        topics_a
      )
      {
        docs_o.topics_s =
          TOP_o
            .concat__s( topics_a[1] )
      }
    
      //:==================== words
      let words_a =
        source_s
          .match
          (
            SM_re
              `
              words_a:     //: JS front matter Array
              ${TOP_o.ARRAY_s}
              `
          )

      if
      (
        words_a
      )
      {
        docs_o.words_s =
          words_a[1]
      }

      for
      (
        const word_a
        of
        source_s
          .matchAll
          (
            G_re
              `
              ${TOP_o.WORD_s}
            `
          )
      )
      {
        const atwords_s =
          word_a
              [1]
              .replace    //:--=> will have to .replace( /C_o.WORDS_CONCAT_s/g, C_o.WORDS_DELIM_s ) LATER
              (
                G_re
                  `\s+?`,    //: multi space, non-greedy
                C_o
                  .WORDS_CONCAT_s
              )
          +
          C_o
            .WORDS_DELIM_s
    
        if
        (
          docs_o
            .words_s
        )
        {
          docs_o
            .words_s +=
              atwords_s
        }
        else
        {
          docs_o
            .words_s =
              atwords_s
        }
      }

      if
      (
        docs_o
          .words_s
      )
      {
        docs_o
          .words_s =
            docs_o
              .words_s
                .slice
                (
                  0,
                  -1    //: skip last WORDS_DELIM_s
                )
      }

      
      return docs_o
    }
    ,



    range__v:
    (
      doc_n
    ) =>
    {
      const range_n =
        doc_n
        >>
        X_o
          .RANGE_SHIFT_n

      if
      (
        doc_n
        >
        TOP_o
          .range_a
            [range_n]
      )
      {
        TOP_o
          .range_a
            [range_n] =
              doc_n
      }
    }
    ,
    
    
    
    
    toIndex__v:
    (
      index_a
    ) =>
    {
      index_a
        .sort
        (
          (
            item_o,
            other_o
          ) =>
            item_o.doc_n
            -
            other_o.doc_n
        )

      let words_s = ''

      let atdoc_n = -1      //: pre-incrementing

      const docsTopicsWords_a = []

      const doc_a = new Set()

      const topicsDocs_a = new Map()

      for
      (
        const atdoc_o
        of
        index_a
      )
      {
        if
        (
          atdoc_o
            .doc_n
          !==
          X_o
            .NO_TOPIC_n    //: skip structural documents (ex.404.html)
        )
        {
          ++atdoc_n

          TOP_o
            .range__v
            (
              atdoc_o
                .doc_n
            )
  
          if
          (
            doc_a
              .has
              (
                atdoc_o
                  .doc_n
              )
          )
          {
            console.log( `ERROR: duplicate doc_n: ${atdoc_o.doc_n}`)
          }
  
          doc_a
            .add
            (
              atdoc_o
                .doc_n
            )
          
          const topics_a =
            atdoc_o
              .topics_s
            ?
              atdoc_o
                .topics_s
                  .split
                  (
                    C_o
                      .WORDS_DELIM_s
                  )
            :
              []    //!!! empty array if no topics

          for
          (
            topic_s
            of
            topics_a
          )
          {
            //;console.log( atdoc_o )

            if
            (
              ! topicsDocs_a
                .has( topic_s )
            )
            {
              topicsDocs_a
                .set
                (
                  topic_s,
                  new Set()    //: topics[docs]
                )
            }

            const set_a =
              topicsDocs_a
                .get( topic_s )

            set_a
              .add
              (
                //|| atdoc_o
                //||   .doc_n
                atdoc_n    //: index in docsTopicsWords_a
              )

            topicsDocs_a
              .set
              (
                topic_s,
                set_a
              )
          }

          docsTopicsWords_a
            .push
            (
              [
                atdoc_o
                  .doc_n,
                atdoc_o
                  .doc_s,
                atdoc_o
                  .title_s,
                atdoc_o
                  .subtitle_s,
                topics_a,
                atdoc_o
                  .words_s
                  ?.split
                  (
                    C_o
                      .WORDS_DELIM_s
                  )
                ||
                []    //!!! empty array if no topics
              ]
            )
      
          words_s +=
            atdoc_o
              .doc_s
          
          if
          (
            atdoc_o
              .words_s
          )
          {
            words_s +=
              C_o
                .WORDS_DELIM_s
              +
              atdoc_o
                .words_s
          }
  
          words_s +=
            C_o
              .LINE_DELIM_s
        }
      }

      const topicsDocsArray_o = {}
      for
      (
        let at_a
        of
        Array
          .from( topicsDocs_a )
      )
      {
        topicsDocsArray_o
          [ at_a[0] ] =
            Array
              .from( at_a[1] )
      }

      FS_o
        .writeFile
        (
          TOP_o
            .TOPICS_DOCS_s,
          JSON
            .stringify( topicsDocsArray_o ),
          error_o =>
            console
              .log( error_o ?? `-- Writing ${TOP_o.TOPICS_DOCS_s}` )
            )

      FS_o
        .writeFile
        (
          TOP_o
            .DOCS_TOPICS_s,
          JSON
            .stringify( docsTopicsWords_a ),
          error_o =>
            console
              .log( error_o ?? `-- Writing ${TOP_o.DOCS_TOPICS_s}` )
            )

      FS_o
        .writeFile
        (
          TOP_o
            .DOCS_WORDS_s,
          words_s,
          error_o =>
            console
              .log( error_o ?? `-- Writing ${TOP_o.DOCS_WORDS_s}` )
        )

      console.log( '--------------------\nfrontmatter doc_n max in categories 0-7\n--------------------' )

      console
        .table
        (
          TOP_o
            .range_a
        )
    }
    ,
    
    
    init__v:
    () =>
    {
      TOP_o
        .file_a =        //: prepare
          require( 'klaw-sync' )
          (
            C_o.CONTENT_PATH_s,    //: all Mardown files,
            {
              nodir: true,
              depthLimit: 0
            }
          )

      if
      (
        TOP_o
          .file_a
      )
      {
        TOP_o
          .count_n =
            TOP_o
              .file_a
              .length            //;console.table(TOP_o.file_a)

        let index_a = []

        for
        (
          file_o
          of
          TOP_o
            .file_a
        )
        {
          const source_s =
            FS_o
              .readFileSync
              (
                file_o.path,
                {
                  encoding:'utf-8',
                  flag:'r'
                }
              )

          index_a
            .push
            (
              TOP_o
                .docs__o( source_s )    //: build document
            )
        }

        TOP_o
          .toIndex__v( index_a )

      }

      ;console
        .log( `*.md files processed: ${TOP_o.count_n}` )
    }
    ,
  }



TOP_o
  .range_a
  .fill( 0 )

TOP_o
  .init__v()
