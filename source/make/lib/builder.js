const HEAD_o = require( './header.js' )
const CSP_o  = require( './csp.js' )
const GIT_o  = require( './git.js' )
const INS_o  = require( './ins.js' )
const TOP_o =  require( './topics.js' )
const MARK_o = require( './mark.js' )
const COM_o  = require( './comment.js' )

const C_o    = require( '../data/C_o.js' )



const BUI_o =
{
  file_a:   null,
  count_n:   0,
  current_n: 0,
  
  
  
  buildStart__v:
  (
    data_o
  ) =>
  {
    console.log( `${BUI_o.count_n} Markdown files to process` )
  }
,

  
  
  buildEnd__v:
  (
    end_s,
    data_o
  ) =>
  {
    HEAD_o
      .write__v
      (
        `${CSP_o.directive__s()}\n${HEAD_o.directive__s()}\n`
      )
  }
,

  
  
  templateStart__s:
  (
    input_s,
    data_o
  ) =>
  {
    let start_s = input_s

    //... what else?

    if
    (
      data_o
        .issue_n
      ===
      -1
    )
    {
      GIT_o
        .create__n
        (
          data_o
            .permalink
        )
        .then
        (
          issue_n =>
            GIT_o
              .add__v
              (
                data_o
                  .permalink,
                issue_n
              )
        )
    }
      
    return start_s
  }
,
  
  
  templateEnd__s:
  (
    input_s,
    data_o
  ) =>
  {
    HEAD_o
      .add__v( data_o )

    let output_s =
      INS_o
        .insert__s
        (
          input_s,
          data_o
            .permalink
        )


    if
    (
      data_o
        .doc_n
      >
      0        //: skip structural docs
    )
    {
      //;console.log( output_s )
      output_s =
          output_s
            .replace
            (
              C_o.
                TOPICS_TAG_s,
              TOP_o
                .list__v
                (
                  data_o
                    .doc_n
                )
            )
      //;console.log( output_s )
    }
    
    let commentPart_s = ''

    if
    (
      data_o
        .issue_n
      >
      0
    )
    {
      commentPart_s =
        COM_o
          .comment__s
          (
            data_o
              .issue_n
          )
    }

    return (
      MARK_o
        .replace__s
        (
          output_s
            .replace
            (
              C_o.
                COMMENT_TAG_s,
              commentPart_s
            )
        )
      )
  }
,

  
  
  headEnd__s:
  (
    input_s,
    data_o
  ) =>
  {
    let end_s = input_s
    //... what else?
    return end_s
  }
,

  
  
  bodyEnd__s:
  (
    input_s,
    data_o
  ) =>
  {
    let body_s = input_s
    //... what else?
    return body_s
  }
,



}




module.exports =
{
  start__s:
  (
    input_s,
    data_o
  ) =>
  {
    if
    (
      BUI_o
        .current_n
      ===
      0
      &&
      BUI_o
        .file_a
      )
      {
        BUI_o
          .buildStart__v( data_o )
      }

    let start_s =
      BUI_o
        .templateStart__s
        (
          input_s,
          data_o
          )

    return start_s
  }
,



  end__s:
  (
    input_s,
    data_o
  ) =>
  {
    ++BUI_o
      .current_n

    let end_s =
      BUI_o
        .templateEnd__s
        (
          input_s,
          data_o
        )

    if
    (
      BUI_o
        .file_a
      &&
      BUI_o
        .current_n
       ===
       BUI_o
         .count_n
         - 1
    )
    {
      BUI_o
        .buildEnd__v
        (
          end_s,
          data_o
        )
    }

    return end_s
  }
,



  head__s:
  (
    input_s,
    data_o
  ) =>
  {
    return (
      BUI_o
        .headEnd__s
        (
          input_s,
          data_o
        )
    )
  }
,



  body__s:
  (
    input_s,
    data_o
  ) =>
  {
    return (
      BUI_o
        .bodyEnd__s
        (
          input_s,
          data_o
        )
    )
  }
,



}



void function ()
{
  const MD_DIR_s =
    C_o
      .CONTENT_DIR_s    //: all Mardown files to process

  BUI_o
    .file_a =
      require( 'klaw-sync' )
      (
        MD_DIR_s,
        {
          nodir: true,
          depthLimit: 0    //: no subdirectory
        }
      )

  if
  (
    BUI_o
      .file_a
  )
  {
    BUI_o
      .count_n =
        BUI_o
          .file_a
            .length
  }
} ()
