//: CLI: node source/make/cli/topics.js  (from chercheurdart_2 dir)

const FS_o = require( 'fs-extra' )

const REX_o = require( '../lib/regex.js' )

const C_o =   require( '../data/C_o.js' )
const F_o =   require( '../data/F_o.js' )
const X_o =   require( '../data/X_o.js' )



const TOC_o =
{
  //XXDOCS_TOPICS_s:  `source/make/lib/parts/docs_topics.json`,
  //XXTOPICS_DOCS_s:  `source/make/lib/parts/topics_docs.json`,
  INDEX_MD_s:  `source/matter/contents/parts/index_toc.html`,

  range_a: new Array( X_o.CAT_RANGE_n + 1 ),       //: document doc_n by ranges [0-2^10]
  
  //!!! double slash for template String
  ARRAY_s:      //: version_a front matter JS Array
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
    [       //: open char range
    \\w     //: word char
    \\W     //: non-word char
    ]       //: close char range
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

  TOC_s:      //: TOC asciidoc markup to update
    `
    \\.toc
    (         //: open capture group
    [\\w\\W]  //: everything
    +?        //: non-greedy...
    )         //: close capture group
    \\.toc
    `
  ,



  docs__o:
  (
    source_s    //: front matter + markdown (*.md file)
  ) =>
  {
    const docs_o =    //: ordered as C_o.AT_DOCN_n...
      {
        doc_n:    0,
        doc_s:    '',
        title_s:  '',
        subtitle_s:  '',
        version_a: []
      }

    const G_re =
      REX_o
        .new__re( 'g' )    //: global regex

    const SM_re =
      REX_o
      .new__re( 'sm' )    //: multiline regex
  
    //:==================== doc_s (keep 1rst as we need it for error report)
    const docS_a =
      source_s
        .match
        (
          SM_re
            `
            permalink:     //: JS front matter String
            ${TOC_o.DOCS_s}`
        )

    if
    (
      ! docS_a
    )
    {
      return void console.log( `unknow document has no permalink front matter property` )
    }
    //->
    docs_o
      .doc_s =
        docS_a[1]
  
    //:==================== doc_n
    const docN_a =
      source_s
        .match
        (
          SM_re
            `
            doc_n:     //: JS front matter number
            ${TOC_o.DOCN_s}`
        )

    if
    (
      ! docN_a
    )
    {
      return void console.log( `document ${docs_o.doc_s} has no doc_n front matter property` )
    }
    //->
    docs_o
      .doc_n =
      +docN_a[1]    //: Number cast

//:==================== tile_s
    const title_a =
      source_s
        .match
        (
          SM_re
            `
            title_s:     //: JS front matter String
            ${TOC_o.TITLE_s}`
        )

    if
    (
      ! title_a
    )
    {
      return void console.log( `document ${docs_o.doc_s} has no title_s front matter property` )
    }
    //->
    docs_o
      .title_s =
        title_a[1]
  
    //:==================== subtile_s
    const subtitle_a =
      source_s
        .match
        (
          SM_re
            `
            subtitle_s:     //: JS front matter String
            ${TOC_o.TITLE_s}`
        )

    if
    (
      ! subtitle_a
    )
    {
      return void console.log( `document ${docs_o.doc_s} has no subtitle_s front matter property` )
    }
    //->
    docs_o
      .subtitle_s =
        subtitle_a[1]

    //:==================== version_a
    let version_a =
      source_s
        .match
        (
          SM_re
            `
            version_a:     //: JS front matter Array
            ${TOC_o.ARRAY_s}
          `
        )

    if
    (
      version_a
    )
    {
      docs_o
        .version_a =
          eval( version_a[1] )
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
      TOC_o
        .range_a
          [range_n]
    )
    {
      TOC_o
        .range_a
          [range_n] =
            doc_n
    }
  }
  ,
    
    
    
    
  write__v:
  (
    doc_a
  ) =>
  {
    doc_a
      .sort
      (
        (
          doc_o,
          other_o
        ) =>
          doc_o.doc_n
          -
          other_o.doc_n
      )

    let toc_s = ''

    for
    (
      const atdoc_o
      of
      doc_a
    )
    {
      if
      (
        atdoc_o
          .doc_n
        >
        X_o
          .DOC_INDEX_n    //: skip index and structural documents (ex.404.html)
        &&
        atdoc_o
          .doc_n
        <
        X_o
          .HIDDEN_DOCS_n
      )
      {
        toc_s +=
`<p data-ins=contents>
  <a href=${atdoc_o.doc_s}.html>${atdoc_o.title_s}</a>
  <span data-ins=${C_o.INS_PRINCIP_s} data-spec=₀> </span>
  <label for=L_${atdoc_o.doc_s} tabindex=-1>${C_o.INS_ICON_o.js}</label>
  <input id=L_${atdoc_o.doc_s} type=checkbox>
  <ins>
    <span data-ins=${C_o.INS_SUBSID_s} data-spec=₀>
      <b>${atdoc_o.subtitle_s}</b>
      <b>${F_o.stamp__s(atdoc_o.version_a[0])}</b>
    </span>
  </ins>
</p>\n`
      }
    }

    toc_s =         //!!! can't put AsciiDoc pass:[] in md file
      `pass:[`
      + `</p>\n`    //: close node.getContent() enclosing paragraph (see adoc/preamble)
      + toc_s
      + `<p>`       //: open idem
      + `]`

    FS_o
      .writeFile
      (
        TOC_o
          .INDEX_MD_s,
        toc_s,
        error_o =>
          console
            .log( error_o ?? `-- Writing ${TOC_o.INDEX_MD_s}` )
      )
  }
  ,



  init__v:
  () =>
  {
    TOC_o
      .file_a =        //: prepare
        require( 'klaw-sync' )
        (
          C_o.CONTENTS_PATH_s,    //: all Mardown files,
          {
            nodir: true,
            depthLimit: 0
          }
        )

    if
    (
      TOC_o
        .file_a
    )
    {
      TOC_o
        .count_n =
          TOC_o
            .file_a
              .length

      let doc_a = []

      for
      (
        file_o
        of
        TOC_o
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

        doc_a
          .push
          (
            TOC_o
              .docs__o( source_s )    //: build document
          )
      }

      TOC_o
        .write__v( doc_a )

    }

    ;console
      .log( `*.md files processed: ${TOC_o.count_n}` )
  }
  ,
}



TOC_o
  .range_a
  .fill( 0 )

TOC_o
  .init__v()
