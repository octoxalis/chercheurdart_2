require( 'dotenv' ).config( { path: '../.env' } )    //: relative to current dir (source)
const FETCH_o = require( 'node-fetch' )
const { request: REQ_o } = require( '@octokit/request' )

const A_o     = require( '../data/A_o.js' )
const U_o     = require( '../data/U_o.js' )



const GIT_API_s    = 'https://api.github.com/'
const GIT_ISSUES_s = `${GIT_API_s}repos/${A_o.OWNER_s}/${A_o.REPO_s}/issues`
const GIT_LABEL_s  = 'comment'
const WRITE_TIMEOUT_n = 1000



GIT_o =
{

  issue_a: new Map(),
  
  body_o:    //: Template for create__n
  {
    labels: [ GIT_LABEL_s ],
    assignees: [ A_o.OWNER_s ],
  }
}


module.exports =
{
  add__v:
  (
    permalink_s,
    issue_n
  ) =>
    GIT_o
      .issue_a
        .set
        (
          permalink_s,
          issue_n
        )
  ,



  create__n:
  async (
    permalink_s
  ) =>
  {
    const page_s =
      permalink_s
        .slice
        (
          permalink_s
            .lastIndexOf( '/') + 1,
          '.html'
            .length * -1
        )

    const body_o =
      Object
        .assign
        (
          GIT_o
            .body_o,
          {
            title: `#${page_s}`,
            body: `[${page_s}](${U_o.url_s}${permalink_s}) page comments`
          }
        )

    const fetch_o =
      {
        method: 'POST',
        body: JSON.stringify( body_o ),
        headers: 
        {
          'Content-Type': 'application/json',
          'Authorization': `token ${process.env.GITHUB_API_ACCESS_TOKEN}`
        }
      }

    //> TEMPORARY ========================================
    if
    (
      U_o.url_s
      ===
      U_o.DEV_s
    )
    {
      return void console.log( 'SKIP issue creation' )
    }
    //> END TEMPORARY ========================================

    const issue_o =
      await FETCH_o
      (
        GIT_ISSUES_s,
        fetch_o
      )

    const json_o =
      await issue_o
        .json()

    const msg_s =
      `-------------
Issue created
-------------
  page: '${page_s}'
  number: ${json_o.number}
`

    console
      .log( msg_s )

    return (
      json_o
        .number
      )
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


  
}
