//=== stat_w.js
const STAT_W_o =
{
  port_o: null,

  status_o:
  {
    scan_b: false,
  }
  ,

  scan_a: null,   //: [
                  //:   [0]: hueCapacities_a[],
                  //:   [1]: hue_a[]pointer_a[],
                  //:   [2]: satCapacities_a[],
                  //:   [3]: sat_a[]pointer_a[],
                  //:   [4]: lumCapacities_a[],
                  //:   [5]: lum_a[]pointer_a[],
                  //: ]

  client_o: {},   //: {{C_o.STAT_a[0]}}: { client_o, canvas_e, context_o }
                  //: {{C_o.STAT_a[1]}}
                  //: {{C_o.STAT_a[2]}}



  //=== FUNCTIONS
  sleep__v
  (
    delay_n    //: milliseconds
  )
  {
    return new Promise
      (
        resolve_f =>
          setTimeout
          (
            resolve_f,
            delay_n
          )
      )
  }
  ,



  read__v
  (
    path_s,
    callback_f,
    method_s='text'    //: default
  )
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


  

  //=== GET    
  get_scan__v
  (
    payload_o
  )
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
              )()

          if
          (
            STAT_W_o
              .scan_a
          )
          {
            STAT_W_o
              .status_o
                .scan_b = true
          }
          
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
                            ;console.timeEnd( 'scan' )
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
      )
  }
  ,



  get_status__v
  ()
  {
    STAT_W_o
      .post__v
      (
        {
          //: CLIENT_ALL_s
          task_s: 'PUT_status',
          status_o: STAT_W_o.status_o

        },
        [ STAT_W_o.status_o ]
      )
  }
  ,



  //=== PUT    
  put_offCanvas__v
  (
    payload_o
  )
  {
    const client_s =
      payload_o
        .client_s

    if
    (
      !  STAT_W_o
        .client_o
          [ client_s ]
    )
    {
      STAT_W_o
        .client_o
          [ client_s ] = {}
    }

    STAT_W_o
      .client_o
        [ client_s ]
          .offCanvas_e =
      payload_o
        .offCanvas_e

    STAT_W_o
      .client_o
        [ client_s ]
          .context_o =
            payload_o
              .offCanvas_e
                .getContext( '2d' )    //;console.log( STAT_W_o.client_o[ client_s ] )
  }
  ,



  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  async put_draw_test
  (
    payload_o
  )
  {
    let times_n = 100    //: {{C_o.AWAIT_SCAN_n}} = 5s
  
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
                            ;console.time( 'sleep' )
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
    while                   //: wait for scan
    (
      ! STAT_W_o
        .status_o
          .scan_b
    )
    {
      if
      (
        --times_n
        >
        0
      )
      {
        await STAT_W_o
          .sleep__v( 50 )    //: {{C_o.AWAIT_SCAN_SLEEP_n}}
      }
      else
      {
        STAT_W_o
          .post__v
            (
              {
                client_s: payload_o.client_s,
                task_s: 'PUT_error',
                error_s: 'scan is not available'
              }
            )
        
        break
      }
    }
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
                            ;console.timeEnd( 'sleep' )
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!

      STAT_W_o
        .client_o
          [payload_o.client_s]
            .context_o
              .fillRect
              (
                100, 200,
                400, 300
              )
  }
  ,
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



  //=== COMMUNICATION
  message__v
  (
    msg_o
  )
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
      //=== GET    
      case 'GET_scan':      //: { task_s, work_s }
        STAT_W_o
          .get_scan__v( payload_o )

        break
    
      case 'GET_status':      //: { task_s, status_o }
        STAT_W_o
          .get_status__v()

        break
    
      //=== PUT    
      case 'PUT_offCanvas':      //: { task_s, client_s, canvas_e }
        STAT_W_o
          .put_offCanvas__v( payload_o )
  
        break
    
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case 'PUT_draw_test':      //: { task_s, client_s, canvas_e }
        STAT_W_o
          .put_draw_test( payload_o )
  
        break
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    
      default:
        break
    }
  }
  ,



post__v    //: post to client
(
  payload_o
)
{
  STAT_W_o
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

}



//=== CONNECT
onconnect =
(
  connect_o
) =>
{
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
                            ;console.time( 'scan' )
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!
  STAT_W_o
    .port_o =
      connect_o
        .ports[0]

  STAT_W_o
    .port_o
      .onmessage =
        STAT_W_o
          .message__v

  STAT_W_o
    .port_o
      .onmessageerror =
        STAT_W_o
          .handleError__v
}
