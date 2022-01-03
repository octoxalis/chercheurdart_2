//=== imgsLoad.js ===

const imgsLoad__o =
url_a =>
{
  const create__o =    //: local function
  url_s =>
    new Promise
    (
      (
        resolve_f,
        reject_f
      ) =>
      {
        const img_o =
          new Image()

        img_o
          .onload =
          () =>
            resolve_f( img_o )

        img_o
          .onerror =
          () =>
            resolve_f( null )

        img_o
          .src =
            url_s
      }
    )



  return (
    new Promise
    (
      (
        resolve_f,
        reject_f
      ) =>
      {
        const worker_o =
          new Worker( 'imgsLoad_w.js' )
  
        worker_o
          .postMessage( url_a )
  
        worker_o
          .addEventListener
          (
            'message',
            async function
            (
              event_o
            )
            {
              const promise_a =
                event_o
                  .data
                    .map
                    (
                      async url_s =>
                        url_s
                        ?
                          await create__o( url_s )
                        :
                          null
                    )

              const img_a =
                await Promise
                  .all( promise_a )

              resolve_f
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
