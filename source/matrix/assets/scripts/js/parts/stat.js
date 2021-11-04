//=== stat.js
const STAT_o =
{
  worker_o: null,



  message__v:    //!!! 2. from stat_w.js
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
      //-- case 'PUT_scan':      //: { task_s, msg_s }
      //-- 
      //--   break
    
      default:
        break
    }
  }
  ,
  

  
  canvas__e:    //!!! 4. from section
  (
    section_s
  ) =>
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
        .querySelector( `#${section_s}` )
  
    const { width, height } =
      section_e                       //: outer section has dimensions, not div
        .getBoundingClientRect()
  
    const canvas_e =
      document
        .createElement( 'canvas' )
  
    canvas_e
      .id =
        `${section_s}_canvas`

    const pixel_n =
      window
        .devicePixelRatio
  
    canvas_e
      .width =
        width
        *
        pixel_n
  
    canvas_e
      .height =
        (
          height
          -
          +nav_s        //: number cast
        )
        *
        pixel_n
  
    const div_e =
      section_e
        .querySelector( `#{{C_o.DIV_ID_s}}_${section_s}` )
  
    div_e
      .insertBefore        //: as div children[0]
      (
        canvas_e,
        div_e
          .querySelector( `script` )
      )
  
    return canvas_e
  }
  ,


  worker__o:    //!!! 4. from section
  (
    section_s,
    message__v,
    script_s
  ) =>
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

    const canvas_e =
      STAT_o
        .canvas__e( section_s )

    const offCanvas_e =
      canvas_e
        .transferControlToOffscreen()

    worker_o            //! using port postMessage directly
      .port_o           //! to avoid error:
        .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
        (
          {
            client_s:   section_s,
            script_s:   script_s,
            task_s:     'PUT_canvas',
            pixel_n:    window.devicePixelRatio,
            canvas_e:   offCanvas_e
          },
          [ offCanvas_e ]
        )

    return worker_o
  }
  ,



  adopt__v:    //!!! 3. from listener__v
  (
    stat_s
  ) =>
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
                .querySelector( `#${stat_s}_script` )
  
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


  scanner__v:
  () =>
  {
    const img_e =
      document
        .querySelector( `img[src$="/full/max/0/color.avif"]` )    //: TODO change to jpeg

    ;console.log( img_e )

    if
    (
      img_e
    )
    {


      return  //.........
      STAT_o
        .worker_o
          .post__v
          (
            { 
              client_s: '{{C_o.STAT_s}}',
              task_s: 'GET_scan',
              work_s: work_s
            }
          )
    }
  }
  ,



  listener__v:
  () =>
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



  init__v:    //!!! 1. from index.js
  (
    work_s
  ) =>
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
            work_s: work_s
          }
        )

    //XX STAT_o
    //XX   .scanner__v()
  }
  ,
}


STAT_o
  .listener__v()
