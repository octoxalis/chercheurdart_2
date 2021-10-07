const FS_o = require( 'fs-extra' )

const REX_o = require( '../lib/regex.js' )
const C_o   = require( '../data/C_o.js' )
const X_o   = require( '../data/X_o.js' )

const IND_o =
{
  DOCS_TOPICS_s:  `source/make/index/input/docs_topics_words.json`,
  DOCS_WORDS_s :  `source/make/index/input/docs_words.txt`,
  FILE_DELIM_s:   '\n',
  WORDS_DELIM_s:  ' ',
  WORDS_CONCAT_s: '_',


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
  
  DOC_n:      //: doc_n front matter JS property
    `
    \\s*?   //: optional space, non-greedy
    (       //: open capture group
    \\d     //: digit
    +?      //: non-greedy...
    )       //: close capture group
    \\s*?   //: optional space, non-greedy
    ,       //: object properties separator
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
                  IND_o.WORDS_DELIM_s,
                  IND_o.WORDS_CONCAT_s
                )
          )
          .join( IND_o.WORDS_DELIM_s )
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
          doc_n: 0,
          doc_s: '',
          topics_s: '',
          words_s: ''
        }

      const G_re =
        REX_o
          .new__re( 'g' )    //: global regex

      const SM_re =
        REX_o
        .new__re( 'sm' )    //: multiline regex
    
      //: doc_n
      const docN_a =
        source_s
          .match
          (
            SM_re
              `
              doc_n:     //: JS front matter number
              ${IND_o.DOC_n}
          `
          )

      if ( docN_a )
      {
        docs_o.doc_n =
          +docN_a[1]    //: Number cast
      }
    
      //: doc_s
      const docS_a =
        source_s
          .match
          (
            SM_re
              `
              permalink:     //: JS front matter String
              ${IND_o.PERMALINK_s}
          `
          )

      if ( docS_a )
      {
        docs_o.doc_s =
          docS_a[1]
      }
    
      //: topics
      let topics_a =
        source_s
          .match
          (
            SM_re
              `
              topics_a:     //: JS front matter Array
              ${IND_o.ARRAY_s}
            `
          )

      if ( topics_a )
      {
        docs_o.topics_s =
          IND_o
            .concat__s( topics_a[1] )
      }
    
      //: words
      let words_s = ''

      let words_a =
        source_s
          .match
          (
            SM_re
              `
              words_a:     //: JS front matter Array
              ${IND_o.ARRAY_s}
              `
          )

      if ( words_a )
      {
        words_s +=
          IND_o
            .concat__s( words_a[1] )
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
              ${IND_o.WORD_s}
            `
          )
      )
      {
        words_s +=
          IND_o.WORDS_DELIM_s
          +
          word_a
              [1]
              .replace    //:--=> will have to .replace( /IND_o.WORDS_CONCAT_s/g, IND_o.WORDS_DELIM_s ) LATER
              (
                G_re
                  `\s+?`,    //: multi space, non-greedy
                IND_o
                  .WORDS_CONCAT_s
              )
      }

      docs_o.words_s =
        words_s
      
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
        IND_o
          .range_a
            [range_n]
      )
      {
        IND_o
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

      let text_s = ''

      let json_a = []

      let doc_a = new Set()

      for
      (
        const atdoc_o
        of
        index_a
      )
      {
        IND_o
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
        
        json_a
          .push
          (
            [
              atdoc_o
                .doc_n,
              atdoc_o
                .doc_s,
              atdoc_o
                .topics_s
                .split
                (
                  IND_o
                    .WORDS_DELIM_s
                ),
              atdoc_o
                .words_s
                .split
                (
                  IND_o
                    .WORDS_DELIM_s
                )
            ]
          )
    
        text_s +=
          `${atdoc_o.doc_s}${IND_o.WORDS_DELIM_s}${atdoc_o.words_s}${IND_o.FILE_DELIM_s}`
      }

      FS_o
        .writeFile
        (
          IND_o
            .DOCS_TOPICS_s,
          JSON
            .stringify( json_a ),
          error_o =>
            console
              .log( error_o ?? `-- Writing ${IND_o.DOCS_TOPICS_s}` )
            )

      FS_o
        .writeFile
        (
          IND_o
            .DOCS_WORDS_s,
          text_s,
          error_o =>
            console
              .log( error_o ?? `-- Writing ${IND_o.DOCS_WORDS_s}` )
        )

      console.log( '--------------------\nfrontmatter doc_n max in categories 0-7\n--------------------' )

      console
        .table
        (
          IND_o
            .range_a
        )
    }
    ,
    
    
    init__v:
    () =>
    {
      IND_o
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
        IND_o
          .file_a
      )
      {
        IND_o
          .count_n =
            IND_o
              .file_a
              .length            //;console.table(IND_o.file_a)

        let index_a = []

        for
        (
          file_o
          of
          IND_o
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
              IND_o
                .docs__o( source_s )    //: build document
            )
        }

        IND_o
          .toIndex__v( index_a )
      }

      ;console
        .log( `*.md files processed: ${IND_o.count_n}` )
    }
    ,
  }



IND_o
  .range_a
  .fill( 0 )

IND_o
  .init__v()


//: CLI: node source/make/index/indexer.js  (from chercheurdart_2 dir)