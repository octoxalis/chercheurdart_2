//: CLI: node source/make/cli/topics.js  (from chercheurdart_2 dir)

const FS_o = require( 'fs-extra' )

const REX_o = require( '../lib/regex.js' )

const C_o =   require( '../data/C_o.js' )
const X_o =   require( '../data/X_o.js' )



const TOP_o =
{
  DOCS_TOPICS_s:  `source/make/lib/parts/docs_topics_words.json`,
  TOPICS_DOCS_s:  `source/make/lib/parts/topics_docs.json`,

  range_a: new Array( X_o.CAT_RANGE_n + 1 ),       //: document doc_n by ranges [0-2^10]
  
  //!!! double slash for template String
  DOCN_s:   //: doc_n front matter JS property
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
  
  DOCS_s:   //: permalink front matter JS property
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

  TOPIC_s:    //: content indexed topics
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



  docs__o:
  (
    source_s    //: front matter + markdown (*.md file)
  ) =>
  {
    const docs_o =
      {
        doc_n:    0,
        doc_s:    '',
        title_s:  '',
        subtitle_s:  '',
        topics_a: []
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
            ${TOP_o.DOCN_s}
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
            ${TOP_o.DOCS_s}
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
    for
    (
      const topic_a
      of
      source_s
        .matchAll
        (
          G_re
            `
            ${TOP_o.TOPIC_s}
          `
        )
    )
    {
      docs_o
        .topics_a
          .push
          (
            topic_a
              [1]
              .replace    //:--=> will have to .replace( /C_o.WORDS_CONCAT_s/g, C_o.WORDS_DELIM_s ) LATER
              (
                G_re
                  `\s+?`,    //: multi space, non-greedy
                C_o
                  .WORDS_CONCAT_s
              )
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
    
    
    
    
  write__v:
  (
    topic_a
  ) =>
  {
    topic_a
      .sort
      (
        (
          topic_o,
          other_o
        ) =>
          topic_o.doc_n
          -
          other_o.doc_n
      )

      
    const docsTopics_a = []
      
    const topicsDocs_a = new Map()
      
    const doc_a = new Set()
      
    let atdoc_n = -1      //: pre-incrementing

    for
    (
      const atdoc_o
      of
      topic_a
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
        ++atdoc_n      //: pre-incrementing

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
        
        for
        (
          topic_s
          of
          atdoc_o
            .topics_a
        )
        {
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
              atdoc_n    //: index in docsTopics_a
            )

          topicsDocs_a
            .set
            (
              topic_s,
              set_a
            )
        }

        docsTopics_a
          .push
          (
            Object
              .values( atdoc_o )
          )
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
          .stringify( docsTopics_a ),
        error_o =>
          console
            .log( error_o ?? `-- Writing ${TOP_o.DOCS_TOPICS_s}` )
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

      let topic_a = []

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

        topic_a
          .push
          (
            TOP_o
              .docs__o( source_s )    //: build document
          )
      }

      TOP_o
        .write__v( topic_a )

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
