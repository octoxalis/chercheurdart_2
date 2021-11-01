// === burst.js ===
const BUR_o =
{
  scan_b: false,    //: status: not loaded

  status_o: null,    //: STAT_W_o.status_o



  offCanvas__v:
  () =>
  {
    const nav_s =      //: get nav bar height
      window
        .getComputedStyle
        (
          document
            .querySelector( `nav` )
        )
        .height
          .slice
          (
            0,
            -2     //: skip ending 'px'
          )
      
    const section_e =
      document
        .querySelector( `#{{C_o.STAT_a[0]}}` )
  
    const { width, height } =
      section_e                       //: outer section has dimensions, not div
        .getBoundingClientRect()
  
    const canvas_e =
      document
        .createElement( 'canvas' )
  
    canvas_e
      .id =
        `{{C_o.STAT_a[0]}}_canvas`
  
    canvas_e
      .width =
        width
  
    canvas_e
      .height =
        height
        -
        +nav_s        //: number cast
  
    const div_e =
      section_e
        .querySelector( `#{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}` )
  
    div_e
      .insertBefore        //: as div children[0]
      (
        canvas_e,
        div_e
          .querySelector( `script` )
      )
  
      const offCanvas_e =
        canvas_e
          .transferControlToOffscreen()

      BUR_o
        .worker_o           //! using port postMessage directly
          .port_o           //! to avoid error:
            .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
            (
              {
                client_s:   '{{C_o.STAT_a[0]}}',
                task_s:     'PUT_offCanvas',
                offCanvas_e: offCanvas_e
              },
              [ offCanvas_e ]
            )
    }
  ,



  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  draw_test__v
  ()
  {
    BUR_o
      .worker_o
        .post__v
        (
          {
            client_s: '{{C_o.STAT_a[0]}}',
            task_s:   'PUT_draw_test',
          }
        )
  }
  ,
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



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
        //................ TODO: load error page ....................
        console.log( `ERROR: ${payload_o.error_s}` )
        
        break
    
      default:
        break
    }
  }
  ,
  


  init__v:
  () =>
  {
    BUR_o
      .worker_o =
        new WorkerClient
        (
          {
            url_s: '{{C_o.WORKER_FILE_s}}',
            id_s:  '{{C_o.STAT_a[0]}}',
            handleMessage__v: BUR_o.message__v
          }
        )

    BUR_o
      .offCanvas__v()

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  BUR_o
      .draw_test__v()
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
  ,
}



void function
()
{
  //;console.log( '{{C_o.STAT_a[0]}}.js' )

  BUR_o
    .init__v()
} ()
