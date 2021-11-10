//=== WorkerClient.js
class WorkerClient
{
  constructor
  (
    worker_o    //: { url_s, client_s, handleMessage__v }
  )
  {
    Object
      .assign
      (
        this,
        worker_o
      )

    this
      .port_o =
        new SharedWorker
        (
          this
            .url_s
        )
          .port

    this
      .port_o
        .onerror =
          error_o =>
            console
              .log`ERROR: ${error_o.message}`
  
    this
      .port_o
        .onmessage =
          msg_o =>      //: can't use this.message__v directly
            this
              .message__v
              (
                 msg_o
                   .data
              )
    }



  message__v
  (
    payload_o    //: data: { client_s, task_s, ... }
  )
  {
    if
    (                    //: filter msg for clients
      ! payload_o
        .client_s    //: CLIENT_ALL_s
      ||
      (
        payload_o
          .client_s
        ===
        this
          .client_s
      )
    )
    {
      this
        .handleMessage__v( payload_o )
    }

  }



  post__v      //!!! can't use this method for offscreenCanvas transfer
  (
    payload_o
  )
  {
    this
      .port_o
        .postMessage( payload_o )
  }
}