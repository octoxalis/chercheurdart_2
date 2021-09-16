const FS_o  = require( 'fs-extra' )
const KS_o  = require( 'klaw-sync' )
const { request: REQ_o } = require( '@octokit/request' )

const REX_o = require( '../../make/lib/regex.js' )
const MARK_o = require( '../../make/lib/markdown.js' )
const C_o =   require( '../../make/data/C_o.js' )
const A_o =   require( '../../make/data/A_o.js' )



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


  stamp__s:
  (
    stamp_s
  ) =>
  {
    const at_s =
      stamp_s

    return at_s
  }
  ,



  prettify__s:
  (
    raw_s
  ) =>
  {
    const pretty_s =
      MARK_o
        .parse__s
        (
          raw_s
            .replace
            (
              C_o.COMMENT_INTRO_s,
              ''
            )  
        )

    return pretty_s
  }
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
`<h3>
    ${list_o.data.length}
  </h3>
  <div role=list>
    <ul>
`

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
          ISS_o
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
            .prettify__s( comment_s )

        const id_s =
          `C${issue_n}_${at_n}`

        list_s +=
`<li>
<${C_o.ROW_TAG_s}>${name_s}</${C_o.ROW_TAG_s}>
<${C_o.ROW_TAG_s}>${at_s}</${C_o.ROW_TAG_s}>
<input id=${id_s} type="checkbox" />
<ins>
  <p>${pretty_s}</p>
  <label for=${id_s}>&#x00D7;</label>
  </ins>
  <label for=${id_s}>${intro_s}${C_o.COMMENT_ELIPSIS_s}</label>
</li>
`
        ++at_n
      }
    }

    return list_s
  }
  ,




}



/**
 * List Markdown files to process
 * Keep 2 levels depth only for content slots
 */
void async function ()
{
  const MD_DIR_s = C_o.CONTENT_PATH_s    //: all Mardown files

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
    require( 'klaw-sync' )
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
    //;console.log( file_o.path )

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
        .match( issue_re )    //;console.log( match_o )

    if
    (
      match_o
    )
    {
      const issue_n =
        match_o[1]        //;console.log( issue_n )

      const list_o =
        await ISS_o
          .list__o
          (
            issue_n
          )        //;console.log( list_o )

      const list_s =
        ISS_o
          .list__s
          (
            list_o,
            issue_n
          )        //;console.log( list_s )

      const name_s =
        `issue_${issue_n}`

      const path_s =
      `source/${C_o.LIB_PARTS_DIR_s}${name_s}.html`    //;console.log( path_s )

      ISS_o
        .write__v
        (
          path_s,
          list_s
        )
    }
  }
} ()
