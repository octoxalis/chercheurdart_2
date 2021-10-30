//=== stat.js
const STAT_o =
{
  worker_s: '/assets/scripts/js/stat_worker.min.js',

  worker_o: null,

  scan_a: null,
  //: [
  //:   [0]: hueCapacities_a[],
  //:   [1]: hue_a[]pointer_a[],
  //:   [2]: satCapacities_a[],
  //:   [3]: sat_a[]pointer_a[],
  //:   [4]: lumCapacities_a[],
  //:   [5]: lum_a[]pointer_a[],
  //: ]
  


  adopt__v:
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

        break
    
      default:
        break
    }
  }
  ,



  put_scan__v:
  (
    scan_a
  ) =>
  {
    STAT_o
      .scan_a =
        scan_a
      
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    ;console.timeEnd( 'scan_load' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  ,



  handleError__v:
  (
    error_o
  ) =>
    console
      .log`ERROR: ${error_o.message}`
  ,



  init__v:
  (
    work_s
  ) =>
  {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    ;console.time( 'scan_load' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!

    if
    (
      ! STAT_o
          .worker_o
    )
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
1. init__v from index.js
2. receive__v from worker
3. adopt__v from listener__v
*/