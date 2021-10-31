//=== SWorker.js
class SWorker
{
  constructor
  (
    worker_o    //: { url_s, id_s, handleMessage__v }
  )
  {
    this
      .url_s =
        worker_o
          .url_s

    this
      .id_s =
        worker_o
          .id_s

    this
      .handleMessage__v =
        worker_o
          .handleMessage__v

    this
      .port_o = null

    this
      .init__v()
}



  init__v
  ()
  {
    const shared_o =
      new SharedWorker ( this.url_s )

    this
      .port_o =
        shared_o
          .port

    this
      .port_o
        .onerror =
          this
            .error__v
  
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

    this
      .port_o
        .start()
  }



  error__v
  (
    error_o
  )
  {
    console
      .log`ERROR: ${error_o.message}`
  }



  message__v
  (
    payload_o    //: data: { client_s, task_s, ... }
  )
  {
    if
    (                    //: filter msg for clients
      payload_o
        .client_s
      ===
      this
        .id_s
    )
    {
      this
        .handleMessage__v( payload_o )
    }

  }



  post__v
  (
    payload_o
  )
  {
    this
      .port_o
        .postMessage( payload_o )
  }


  
}