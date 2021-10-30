//=== stat.js
const STAT_o =
{
  worker_s: '/assets/scripts/js/stat_worker.min.js',

  worker_o: null,

  await_s: '',    //: stat_s awaiting init

  scan_a: null,
  //: [
  //:   [0]: hueCapacities_a[],
  //:   [1]: hue_a[]pointer_a[],
  //:   [2]: satCapacities_a[],
  //:   [3]: sat_a[]pointer_a[],
  //:   [4]: lumCapacities_a[],
  //:   [5]: lum_a[]pointer_a[],
  //: ]
  
  put_scan__v:
  (
    scan_a
  ) =>
  {
    STAT_o
      .scan_a =
        new Function            //!!! not JSON.parse !!!
        (
          `return ${scan_a}`
        )()
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
      case 'PUT_scan':      //: { task_s, scan_a }
        STAT_o
          .put_scan__v
          (
            payload_o
              .scan_a
          )

        if        //: now adopted script can be loaded
        (
          STAT_o
            .await_s
        )
        {
          STAT_o
            .resumeAdopt__v( STAT_o.await_s )
  
          STAT_o
            .await_s = ''    //:reset
        }

        break
    
      default:
        break
    }
  }
  ,



  init__v:
  (
    stat_s
  ) =>
  {
    STAT_o
      .worker_o =
        new Worker
        (
          STAT_o
            .worker_s
        )
  
    STAT_o
      .worker_o
        .addEventListener
        (
          'message',
          STAT_o
            .receive__v,
          true
        )
  
    STAT_o
      .worker_o
        .addEventListener
        (
          'error',
          STAT_o
            .handleError__v,
          true
        )
  
    const work_s =
      document
        .querySelector( 'body' )
          .dataset
            .work_s
    STAT_o
      .worker_o
        .postMessage
        (
          { 
            task_s: 'GET_scan',
            work_s: work_s
          }
        )

  }
  ,



  handleError__v:
  (
    error_o
  ) =>
    console
      .log`ERROR: ${error_o.message}`
  ,



  resumeAdopt__v:
  (
    stat_s
  ) =>
  {
    IND_o
      .adopt__v
      (
        stat_s,                //!!! section id=stat_s
        `IF_${stat_s}`,
        (
          iframe_e,
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
          console.timeEnd( 'stat' )

        }
      )
  }
  ,



  adopt__v:
  (
    stat_s
  ) =>
  {
    ;console.time( 'stat' )
    if        //: not yet adopted
    (
      document
        .getElementById( `{{C_o.IFRAME_ID_s}}_${stat_s}` )
    )
    {
      if        //: scan_a already loaded
      (
        STAT_o
          .scan_a
      )
      {
        STAT_o
          .resumeAdopt__v( stat_s )
  
        return
      }
      //:  load scan before adopted script
      STAT_o
        .await_s =
          stat_s
  
      STAT_o
        .init__v( stat_s )
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
}



void function 
()
{
  STAT_o
    .listener__v()
}()


/*//..................
1. setup stats nav click listeners
2. 
*/