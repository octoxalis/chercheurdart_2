//: CLI: node source/make/cli/issue.js  (from chercheurdart_2 dir)

const FS_o  = require( 'fs-extra' )
const KS_o  = require( 'klaw-sync' )
const { request: REQ_o } = require( '@octokit/request' )
const marked = require("marked")
const insane = require("insane")

const REX_o = require( '../../make/lib/regex.js' )

const A_o =   require( '../../make/data/A_o.js' )
const C_o =   require( '../../make/data/C_o.js' )
const F_o =   require( '../../make/data/F_o.js' )



const ISS_o =
{
  write__v:
  (
    path_s,
    content_s
  ) =>
  {
    FS_o
      .writeFile
      (
        path_s,
        content_s,
        'utf8',
        out_o =>    //: callback_f
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
      )
  }
  ,



  prettify__s:
  (
    raw_s
  ) =>
    insane
    (
      marked
      (
        raw_s
          .replace
          (
            C_o.COMMENT_INTRO_s,
            ''
          )
      )
    )
  ,



  list__o:      //: display to console a list of new issues
  async (
    issue_n
  ) =>
  {
    const request__v =
      REQ_o
        .defaults
        (
          {
            headers:
              {
                authorization: `token ${A_o.GITHUB_API_ACCESS_TOKEN}`,
              },
          }
        )

    const list_o =
      await request__v
        (
          `GET /repos/{owner}/{repo}/issues/{issue_number}/comments`,
             {
                //?? accept: 'application/vnd.github.v3+json',
                owner: A_o.OWNER_s,
                repo:  A_o.REPO_s,
                issue_number: issue_n
             }
        )

    return list_o
  }
  ,



  list__s:
  (
    list_o,
    issue_n
  ) =>
  {
    let list_s = ''

    if
    (
      list_o
        .data
          ?.length
    )
    {
      list_s +=
`<label>${list_o.data.length}</label>
<div data-role=list>
<ul>`

      let at_n = 0

      for
      (
        comment_o
        of
        list_o
          .data
      )
      {
        const [ stamp_s, name_s, comment_s ] =
          comment_o
            .body
            .split( C_o.COMMENT_DELIM_s )

        const at_s =
          F_o
            .stamp__s( stamp_s )

        const upto_n =
          comment_s
            .indexOf( C_o.COMMENT_INTRO_s )
  
        if
        (
          upto_n
          ===
          -1
        )
        {
          console.log( 'CHECK COMMENT_INTRO_s delimiter' )
          upto_n = 32
        }

        const intro_s =
          comment_s
            .substr
            (
              0,
              upto_n
            )

        const pretty_s =
          ISS_o
            .prettify__s( comment_s )    //;console.log( pretty_s )

        const id_s =
          `C${issue_n}_${at_n}`

        list_s +=          //: keep \n for lisibility
`\n
<li>
<${C_o.ROW_TAG_s}>${name_s}</${C_o.ROW_TAG_s}>
<${C_o.ROW_TAG_s}>${at_s}</${C_o.ROW_TAG_s}>
<input id=${id_s} type="checkbox" />
<ins>
${pretty_s}
<label for=${id_s}>&#x00D7;</label>
</ins>
<label for=${id_s}>${intro_s}${C_o.COMMENT_ELIPSIS_s}</label>
</li>`

        ++at_n
      }
    }

    return `${list_s}\n\n</ul>`      //: keep double\n for lisibility
  }
  ,


}



/**
 * List Markdown files to process
 * Keep 2 levels depth only for content slots
 */
void async function ()
{
  const MD_DIR_s = C_o.CONTENTS_PATH_s    //: all Mardown files

  const DEPTH_n  = 2

  const issue_re =
    REX_o
      .new__re( 'ms' )
       `issue_n  //: frontmatter property
        :\s+
        (?<number>       //: open group
          \d+            //: only positive number
        )                //: close group
        `

  file_a =
    KS_o
    (
      MD_DIR_s,
      {
        nodir: true,
        depthLimit: DEPTH_n
      }
    )

  for
  (
    file_o
    of
    file_a
  )
  {
    const content_s =
      FS_o
      .readFileSync
      (
        file_o
          .path,
        {
          encoding:'utf-8',
          flag:'r'
        }
      )

    const match_o =
      content_s
        .match( issue_re )

    if
    (
      match_o
    )
    {
      const issue_n =
        match_o[1]

      const list_o =
        await ISS_o
          .list__o
          (
            issue_n
          )

      const list_s =
        ISS_o
          .list__s
          (
            list_o,
            issue_n
          )

      ISS_o
        .write__v
        (
          `source/${C_o.LIB_PARTS_DIR_s}issue_${issue_n}.html`,
          list_s
        )
    }
  }
} ()
