//=== stat.js
const STAT_o =
{
  worker_o: null,

  get_scan_a:    //: stats needing scan
  [
    '{{C_o.STAT_a[0]}}',
    '{{C_o.STAT_a[1]}}',
    '{{C_o.STAT_a[2]}}',
    //-- '{{C_o.STAT_a[3]}}',    //: no scan
  ]
  ,



  canvas__e    //!!! 4. from section
  (
    stat_s,
    part_s
  )
  {
    const canvas_e =
      document
        .querySelector( `#canvas_${stat_s}_${part_s}` )

    canvas_e
      .width *=
        window
          .devicePixelRatio
  
    canvas_e
      .height *=
        window
          .devicePixelRatio
  
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
  

  
  putCanvas__v
  (
    stat_s,
    canvas_a,
    script_s,
    worker_o,
    storeBitmap_b
  )
  {
    for
    (
      let part_s
      of
      canvas_a
    )
    {
                            //;console.log( part_s )
      const canvas_e =
        STAT_o
          .canvas__e
          (
            stat_s,
            part_s
          )
      
      const offCanvas_e =
        canvas_e
          .transferControlToOffscreen()
      
      worker_o            //! using port postMessage directly
        .port_o           //! to avoid error:
          .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
          (
            {
              task_s:     'PUT_canvas',
              stat_s:     stat_s,
              part_s:     part_s,
              canvas_e:   offCanvas_e,
              script_s:   script_s,
              pixel_n:    window
                            .devicePixelRatio,
            },
            [ offCanvas_e ]
          )

      }
  }
  ,



  worker__o    //!!! 4. from section
  (
    stat_s,
    canvas_a,
    script_s,
    message__v
  )
  {
    const worker_o =
      new WorkerClient
      (
        {
          url_s: '{{C_o.STAT_W_FILE_s}}',
          stat_s: stat_s,
          handleMessage__v: message__v
        }
      )

    switch
    (
      stat_s
    )
    {
      case '{{C_o.STAT_a[0]}}':
        STAT_o
          .putCanvas__v
          (
            stat_s,
            canvas_a,
            script_s,
            worker_o,
          )
            
        break;
    
      case '{{C_o.STAT_a[1]}}':
        STAT_o
          .putCanvas__v
          (
            stat_s,
            canvas_a,
            script_s,
            worker_o,
          )
        break

      case '{{C_o.STAT_a[2]}}':
        STAT_o
          .putCanvas__v
          (
            stat_s,
            canvas_a,
            script_s,
            worker_o,
          )
        break

      default:    //: '{{C_o.STAT_a[3]}}'
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
      [            //: C_o.STAT_a
        'burst',
        'aster',
        'paint',
        'match',
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
    stat_s,
  )
  {
    STAT_o
      .worker_o =
        new WorkerClient
        (
          {
            url_s: '{{C_o.STAT_W_FILE_s}}',
            stat_s:  '{{C_o.STAT_s}}',
            handleMessage__v: STAT_o.message__v
          }
        )

    if
    (
      STAT_o
        .get_scan_a
          .includes( stat_s )
    )
    {
      STAT_o
        .worker_o
          .post__v
          (
            { 
              task_s: 'GET_scan',
              stat_s: '{{C_o.STAT_s}}',
              work_s: work_s,
            }
          )
    }
  }
  ,
}


STAT_o
  .listener__v()
