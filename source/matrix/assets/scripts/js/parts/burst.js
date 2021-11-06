// === burst.js ===

const BUR_o =
{
  status_o: null,    //: STAT_W_o.status_o


  message__v:
  (
    payload_o
  ) =>
  {
    switch
    (
      payload_o
        .task_s
    )
    {
      case 'PUT_status':      //: { client_s, task_s, status_o }
        BUR_o
          .status_o =
            payload_o
              .status_o
      
        break
    
      case 'PUT_error':      //: { client_s, task_s, error_s }
        console.log( `ERROR: ${payload_o.error_s}` ) //... TODO: load error page ...
        
        break
    
      default:
        break
    }
  }
  ,
}



BUR_o
  .worker_o =
    STAT_o
      .worker__o
      (
        '{{C_o.STAT_a[0]}}',
        'LogScale Painter',
        BUR_o.message__v,
      )

