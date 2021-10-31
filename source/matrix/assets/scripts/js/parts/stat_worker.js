//=== stat_worker.js
const STAT_W_o =
{
  port_o: null,

  scan_a: null,
  //: [
  //:   [0]: hueCapacities_a[],
  //:   [1]: hue_a[]pointer_a[],
  //:   [2]: satCapacities_a[],
  //:   [3]: sat_a[]pointer_a[],
  //:   [4]: lumCapacities_a[],
  //:   [5]: lum_a[]pointer_a[],
  //: ]

  client_o:
  {
    //-- {{C_o.STAT_a[0]}}: { client_o, canvas_e, context_o }
    //-- {{C_o.STAT_a[1]}}
    //-- {{C_o.STAT_a[2]}}
  },



  read__v:
  (
    path_s,
    callback_f,
    method_s='text'    //: default
  ) =>
  {
    fetch
    (
      path_s
    )
      .then
      (
        response_o =>
        {
          if
          (
            response_o
              .ok
          )
          {
            return (
              response_o
                [ method_s ]()
            )
          }
          
          throw new Error ( `${response_o.status}: ${response_o.statusText}` )
          
          return ''
        }
      )
      .then
      (
        buffer_a =>
        {
          callback_f( buffer_a )
        }
      )
      .catch
      (
        error_o =>
          console
            .error( error_o )
      )
  }
  ,


  
  put_offscreen:
  (
    payload_o
  ) =>
  {
    const client_s =
      payload_o
        .client_s

    STAT_W_o
      .client_o
        [ client_s ]
          .canvas_e =
      payload_o
        .canvas_e

    STAT_W_o
      .client_o
        [ client_s ]
          .context_o =
      payload_o
        .canvas_e
          .getContext( '2d' )

  }
  ,


  get_scan__v:
  (
    payload_o
  ) =>
  {
    STAT_W_o
      .read__v
      (
        `/{{C_o.IMG_DIR_s}}${payload_o.work_s}/full/max/0/{{C_o.SCAN_FILE_s}}`,
        buffer_a =>         //: text
        {
          STAT_W_o
            .scan_a =
              new Function            //!!! not JSON.parse !!!
              (
                `return ${buffer_a}`
              )()                     ;console.log( STAT_W_o.scan_a )
              
          STAT_W_o
            .port_o
              .postMessage
              (
                {
                  client_s: '{{C_o.STAT_s}}',
                  task_s: 'PUT_scan',
                  msg_s: '{{C_o.WORKER_MSG_o.ok}}'
                }
              )
        }
      )
  }
  ,


  handleError__v:
  (
    error_o
  ) =>
    console
      .log`ERROR: ${error_o.message}`
  ,



  receive__v:
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
      case 'GET_scan':      //: { task_s, work_s }
        STAT_W_o
          .get_scan__v( payload_o )

        break
    
      //=== CLIENTs    
      case 'PUT_offscreen':      //: { task_s, client_s, canvas_e }
        STAT_W_o
          .put_offscreen( payload_o )
  
        break
    
    
      default:
        break
    }
  }
  ,
}



//=== CONNECT
onconnect =
(
  connect_o
) =>
{
  STAT_W_o
    .port_o =
      connect_o
        .ports[0]

  STAT_W_o
    .port_o
      .onmessage =
        STAT_W_o
          .receive__v

  STAT_W_o
    .port_o
      .onmessageerror =
        STAT_W_o
          .handleError__v
          
  STAT_W_o
    .port_o
      .start()
}
