const NetlifyAPI = require('netlify')



const SUB_o =
{
  deleteAll:
    async function
    (
      //-- event_o,    //: not used
      //-- context     //: not used
    )
    {
      const client_c =
        new NetlifyAPI
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
      .deleteAll
