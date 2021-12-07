// === stack.js ===

const PAI_o =
{
  status_o: null,    //: STAT_W_o.status_o

  ui:
  {
    //... pointerX_n
    //... pointerY_n
    //... radius_n
    //... stacking_n
  }
  ,

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
        PAI_o
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



  //... pointer_tracing



  listener__v
  ()
  {
    for
    (
      let sub_s
      of
      [
        //... 'hue',
        //... 'sat',
        //... 'lum',
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `canvas_{{C_o.STAT_a[2]}}_${sub_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          click_o =>
          {
            console.log( click_o )

          }
        )
    }
  }
  ,



}



PAI_o
  .worker_o =
    STAT_o
      .worker__o
      (
        '{{C_o.STAT_a[2]}}',
        'LogScale Painter',
        PAI_o.message__v,
      )


PAI_o
  .listener__v()
