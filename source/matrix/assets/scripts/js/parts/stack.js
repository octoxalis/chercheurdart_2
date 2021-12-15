// === stack.js ===

const STACK_o =
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
        STACK_o
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
        'add_remote'
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[3]}}_${sub_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          click_o =>
          {
            console.log( click_o )

            if        //: iframe still there: not yet adopted
            (
              document
                .getElementById( `{{C_o.IFRAME_ID_s}}_{{C_o.STAT_a[3]}}_${sub_s}` )
            )
            {
              IND_o
                .adopt__v
                (
                  `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_settings`,
                  `{{C_o.IFRAME_ID_s}}_{{C_o.STAT_a[3]}}_${sub_s}`,
                  (
                    iframe_e,    //: not used
                    adopted_e
                  ) =>
                  {
                    const script_e =
                      adopted_e
                        .querySelector( `#script_stack_imgs` ) 
                    
                    ;console.log(`#script_stack_imgs`)
          
                    if
                    (
                      script_e
                    )
                    {
                      script_e
                        .src =
                        script_e
                          .dataset
                            .src  
                    }
                  }
                )
            }
                  }
        )
    }
  }
  ,



}



//...??STACK_o
//...??  .worker_o =
//...??    STAT_o
//...??      .worker__o
//...??      (
//...??        '{{C_o.STAT_a[2]}}',
//...??        'LogScale Painter',
//...??        STACK_o.message__v,
//...??      )


STACK_o
  .listener__v()
