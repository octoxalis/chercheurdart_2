
//=== stat.js
const STAT_o =
{
  worker_o: null,



  //=== FUNCTIONS ===
  elementDim__n
  (
    selector_s,
    dim_s='width'    //: 'width' (default) || 'height'
  )
  {
    return (
      +( window            //: number cast
        .getComputedStyle
        (
          document
            .querySelector( selector_s )
        )
        [ dim_s ]
          .slice
          (
            0,
            -2     //: skip ending 'px'
          )
        )
      )

  }
  ,



  canvas__e    //!!! 4. from section
  (
    section_s,
    id_s
  )
  {
    const canvas_e =
      document
        .querySelector( `#canvas_${section_s}_${id_s}` )

    let dim_n =
      ~~'{{C_o.STAT_0_CANVAS_n}}'  //: number cast
      *
      window
        .devicePixelRatio
  
    canvas_e
      .width =
        dim_n
  
    canvas_e
      .height =
        dim_n
  
    return canvas_e
  }
  ,



  //=== WORK ===
  message__v    //!!! 2. from stat_w.js
  (
    payload_o
  )
  {
    switch
    (
      payload_o
        .task_s
    )
    {
      //-- case 'PUT_scan':      //: { task_s, msg_s }
      //-- 
      //--   break
    
      default:
        break
    }
  }
  ,
  

  
  worker__o    //!!! 4. from section
  (
    section_s,
    script_s,
    message__v
  )
  {
    const worker_o =
      new WorkerClient
      (
        {
          url_s: '{{C_o.WORKER_FILE_s}}',
          client_s:  section_s,
          handleMessage__v: message__v
        }
      )

    switch
    (
      section_s
    )
    {
      case '{{C_o.STAT_a[0]}}':
        for
        (
          let id_s
          of
          [
            'hue',
            'sat',
            'lum'
          ]
        )
        {
          const canvas_e =
            STAT_o
              .canvas__e
              (
                section_s,
                id_s
              )
          
          const offCanvas_e =
            canvas_e
              .transferControlToOffscreen()
          
          worker_o            //! using port postMessage directly
            .port_o           //! to avoid error:
              .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
              (
                {
                  client_s:   section_s,
                  id_s:       id_s,
                  script_s:   script_s,
                  task_s:     'PUT_canvas',
                  pixel_n:    window.devicePixelRatio,
                  canvas_e:   offCanvas_e
                },
                [ offCanvas_e ]
              )

          }
            
        break;
    
      default:
        break;
    }

    return worker_o
  }
  ,



  adopt__v    //!!! 3. from listener__v
  (
    stat_s
  )
  {
    if        //: iframe still there: not yet adopted
    (
      document
        .getElementById( `{{C_o.IFRAME_ID_s}}_${stat_s}` )
    )
    {
      IND_o
        .adopt__v
        (
          stat_s,                //!!! section id=stat_s
          `IF_${stat_s}`,
          (
            iframe_e,    //: not used
            adopted_e
          ) =>
          {
            const script_e =
              adopted_e
                .querySelector( `#script_${stat_s}` )
  
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
  ,


  listener__v
  ()
  {
    for
    (
      let stat_s
      of
      [
        'burst',
        'aster',
        'paint',
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_${stat_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          () =>
            STAT_o
              .adopt__v( stat_s ),
          {
            once: true
          }
        )
    }
  }
  ,



  init__v    //!!! 1. from index.js
  (
    work_s,
    //?? stat_s
  )
  {
    STAT_o
      .worker_o =
        new WorkerClient
        (
          {
            url_s: '{{C_o.WORKER_FILE_s}}',
            client_s:  '{{C_o.STAT_s}}',
            handleMessage__v: STAT_o.message__v
          }
        )

    STAT_o
      .worker_o
        .post__v
        (
          { 
            client_s: '{{C_o.STAT_s}}',
            task_s: 'GET_scan',
            work_s: work_s,
            //?? stat_s: stat_s
          }
        )
  }
  ,
}


STAT_o
  .listener__v()
