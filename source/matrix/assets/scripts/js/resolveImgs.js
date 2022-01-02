const resolveImages =
url_a =>
{
  const create__o =
  url_s =>
  //XX {
    //XX return (
      new Promise
      (
        (
          resolve,
          reject
        ) =>
        {
          const img_o = new Image()

          img_o
            .onload =
            () =>
            //XX {
              resolve( img_o )
            //XX }

          img_o
            .onerror =
            () =>
            //XX{
              resolve( null )
            //XX }
          img_o
            .src =
              url_s
        }
      )
    //XX)
  //XX}



  return (
    new Promise
    (
      (
        resolve,
        reject
      ) =>
      {
        const worker_o =
          new Worker( "image-worker.js" )
  
        worker_o
          .postMessage( url_a )
  
        worker_o
          .addEventListener
          (
            "message",
            async function
            (
              event
            )
            {
              const promise_a =
                event
                  .data
                    .map
                    (
                      async url_s =>
                      {
                        if
                        (
                          url_s
                        )
                        {
                          return await create__o( url_s )
                        }
                      }
                    )

              const img_a =
                await Promise
                  .all( promise_a )

              resolve
              (
                img_a
                  .filter( Boolean )
              )
            },
            false
          )
      }
    )
  )
}