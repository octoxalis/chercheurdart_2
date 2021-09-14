const NET_o = require('netlify')
const { request: REQ_o } = require( '@octokit/request' )



const SUB_o =
{
  post__v:
  async (
    submit_e
  ) =>
  {
    console.log( submit_e.body )
    
    const
    {
      issue: issue_n,
      user:  name_s,
      content: comment_s
    } =
      JSON
        .parse
        (
          submit_e.body
        )
        .payload

        ;console.table( [issue_n, name_s, comment_s ] )

    const client_c =
      new NET_o( process.env.NETLIFY_API_ACCESS_TOKEN )

    const request_f =
      REQ_o
        .defaults
        (
          {
            headers:
              {
                authorization: `token ${process.env.GITHUB_API_ACCESS_TOKEN}`,
              },
          }
        )        ;console.log( request_f )

    await request_f
      (
        `POST /repos/{owner}/{repo}/issues/{issue_number}/comments`,
        Object
          .assign
          (
            {
              issue_number: issue_n,
              body: `${name_s}₊${comment_s}`
            },
           {
              //?? accept: 'application/vnd.github.v3+json',
              owner: process.env.GITHUB_OWNER,
              repo:  process.env.GITHUB_REPO
           }
          )
      )
  }
  ,



  deleteAll__v:
  async (
    //-- event_o,    //: not used
    //-- context     //: not used
  ) =>
  {
    const client_c =
      new NET_o
      (
        process
          .env
            .NETLIFY_API_ACCESS_TOKEN
      )

    const submit_a =
      await client_c
        .listSiteSubmissions
        (
          {
            site_id: process
                       .env
                         .SITE_ID
          }
        )
        .catch
        (
          error_o =>
            console
              .log( `Error getting submission: ${error_o}` )
        )
  
    if
    (
      ! submit_a
        .length
    )
    {
      return (
        {
          statusCode: 200,
          body: 'No Submission to delete',
        }
      )
    }

    for
    (
      let submit_o
      of
      submit_a
    )
    {
      ;console.log( submit_o )
      //... await client_c
      //...   .deleteSubmission
      //...   (
      //...     {
      //...       submission_id: submit_o.id
      //...     }
      //...   )
    }

    return (
      {
        statusCode: 200,
        body: 'Submissions deleted',
      }
    )
  }
  ,

}



exports
  .handler =
    SUB_o
      .post__v
