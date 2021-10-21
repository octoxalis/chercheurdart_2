//=== stat_worker.js
const SWO_o =
{
  data_o: null,      //: store receive event data



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


  
  loadScan__v:
  (
    id_s
  ) =>
  {
    SWO_o
      .read__v
      (
        `/{{C_o.IMG_DIR_s}}${id_s}/full/max/0/{{C_o.SCAN_FILE_s}}`,
        buffer_a =>         //: callback_f( ArrayBuffer )
        {
          //;console.log( buffer_a )
          self
            .postMessage
            (
              {
                task_s: 'LOAD_SCAN',
                scan_a: buffer_a
              },
              [ new ArrayBuffer( buffer_a ) ]
            )
        }
      )
  }
  ,


  receive__v:
  (
    payload_o      //: event
  ) =>
  {
    SWO_o
      .data_o =
        payload_o
          .data

    switch
    (
      SWO_o
        .data_o
          .task_s
    )
    {
      case 'LOAD_SCAN':
        SWO_o
          .loadScan__v
          (
            SWO_o
              .data_o
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
    SWO_o
      .receive__v,
    true
  )
