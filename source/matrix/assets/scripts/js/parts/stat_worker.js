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


  
  load_scan__v:
  (
    id_s
  ) =>
  {
    STAT_W_o
      .read__v
      (
        `/{{C_o.IMG_DIR_s}}${id_s}/full/max/0/{{C_o.SCAN_FILE_s}}`,
        buffer_a =>         //: text
        {
          self
            .postMessage
            (
              {
                task_s: 'put_scan',
                scan_a: buffer_a
              },
              [ new ArrayBuffer( buffer_a ) ]
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
      case 'load_scan':      //: { task_s, id_s }
        STAT_W_o
          .load_scan__v
          (
            payload_o
              .id_s
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
