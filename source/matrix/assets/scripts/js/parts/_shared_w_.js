//=== _shared_worker_.js
const _SHARED_W_o =
{
  port_o: null,

  status_o:
  {
  }
  ,

  client_o:
  {
    //-- clientID_s: { ... }
  },



  get_task__v:    //: task_s name to lower case
  (
    payload_o
  ) =>
  {
  }
  ,


  message__v:    //: receive from client
  (
    msg_o
  ) =>
  {
    const payload_o =
      msg_o
        .data

    switch
    (
      payload_o
        .task_s
    )
    {
      case 'GET_task':      //: { task_s, ... }
        _SHARED_W_o
          .get_task__v( payload_o )

        break

      default:
        break
    }
  }
  ,
}



post__v:    //: post to client
(
  payload_o
) =>
{
  _SHARED_W_o
    .port_o
      .postMessage( payload_o )
}
,



handleError__v:
(
  error_o
) =>
  console
    .log`ERROR: ${error_o.message}`
,



//=== CONNECT
onconnect =
(
  connect_o
) =>
{
  _SHARED_W_o
    .port_o =
      connect_o
        .ports[0]

  _SHARED_W_o
    .port_o
      .onmessage =
        _SHARED_W_o
          .message__v

  _SHARED_W_o
    .port_o
      .onmessageerror =
        _SHARED_W_o
          .handleError__v
          
  //?? _SHARED_W_o
  //??   .port_o
  //??     .start()
}
