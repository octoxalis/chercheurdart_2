// === match.js ===

const MATCH_o =
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
        MATCH_o
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



  listener__v
  ()
  {
    document
      .getElementById( '{{C_o.DIV_ID_s}}_stat_{{C_o.STAT_a[3]}}' )
        .addEventListener
        (
          'click',
          click_o =>
          {
            const target_e =
              click_o
                .target
                  .closest( `details` )    //;console.log( target_e  )
  
            if
            (
              target_e
              &&
              ! target_e
                  .dataset
                    .loaded
            )
            {
              for
              (
                let canvas_e
                of
                Array
                  .from
                  (
                    target_e
                      .querySelectorAll( `canvas[data-src]` )
                  )
              )
              {
                const offCanvas_e =
                  canvas_e
                    .transferControlToOffscreen()
          
                MATCH_o
                  .worker_o            //! using port postMessage directly
                    .port_o           //! to avoid error:
                      .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
                      (
                        {
                          task_s:   'GET_img',
                          pixel_n:  window.devicePixelRatio,
                          rect_s:   `${canvas_e.dataset.coord_s} ${canvas_e.width} ${canvas_e.height}`,
                          scale_n:  canvas_e.dataset.scale_n,
                          url_s:    canvas_e.dataset.src,
                          canvas_e: offCanvas_e,
                        },
                        [ offCanvas_e ]
                      )
              }
  
              target_e
                .dataset
                  .loaded =
                    true
            }
          }
        )  

    
  }
  ,


  init__v
  ()
  {
    MATCH_o
      .worker_o =
        STAT_o
          .worker__o
          (
            '{{C_o.STAT_a[3]}}',
            '',
            MATCH_o.message__v,
          )
    
    MATCH_o
      .listener__v()
  }
}



MATCH_o
  .init__v()
