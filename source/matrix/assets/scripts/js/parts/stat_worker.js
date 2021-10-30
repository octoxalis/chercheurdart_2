//=== stat_worker.js
const STAT_W_o =
{
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


  
  get_scan__v:
  (
    work_s
  ) =>
  {
    STAT_W_o
      .read__v
      (
        `/{{C_o.IMG_DIR_s}}${work_s}/full/max/0/{{C_o.SCAN_FILE_s}}`,
        buffer_a =>         //: text
        {
          const scan_a =
            new Function            //!!! not JSON.parse !!!
            (
              `return ${buffer_a}`
            )()

          self
            .postMessage
            (
              {
                task_s: 'PUT_scan',
                scan_a: scan_a
              },
              [ new ArrayBuffer( scan_a ) ]
            )
        },
      )
  }
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
          .get_scan__v
          (
            payload_o
              .work_s
          )
        break
    
      default:
        break
    }
  }
  ,
}




//=== INIT
self
  .addEventListener
  (
    'message',
    STAT_W_o
      .receive__v,
    true
  )
