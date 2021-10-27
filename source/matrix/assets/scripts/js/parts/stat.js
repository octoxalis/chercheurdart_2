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
  
  put_scan__v:
  (
    scan_a
  ) =>
  {
    STAT_o
      .scan_a =
        //XXeval( scan_a )      //!!! not JSON.parse !!!
        new Function            //!!! not JSON.parse !!!
        (
          `return ${scan_a}`
        )()                      //;console.log( 'STAT_o.scan_a loaded' )
                            //;console.log( STAT_o.scan_a )
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
      case 'put_scan':      //: { task_s, scan_a }
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



  init__v:
  () =>
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

    const id_s =
      document
        .getElementById( '{{C_o.SECTION_a[2]}}' )
          .dataset
            .work_s
  
    STAT_o
      .worker_o
        .postMessage
        (
          { 
            task_s: 'load_scan',
            id_s: id_s
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



  listener__v:
  () =>
  {
    for
    (
      let id_s
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
          .getElementById( `{{C_o.LABEL_ID_s}}_${id_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          STAT_o
            [ `{{C_o.LABEL_ID_s}}_${id_s}__v` ],
          {
            once: true
          }
        )
    }
  }
  ,


  LA_burst__v:        //: {{C_o.LABEL_ID_s}}_{{_stat}}
  () =>
  {
    STAT_o
      .adopt__v( 'burst' )

  }
  ,



  LA_aster__v:        //: {{C_o.LABEL_ID_s}}_{{_stat}}
  () =>
  {
    STAT_o
      .adopt__v( 'aster' )
  }
  ,




  LA_paint__v:        //: {{C_o.LABEL_ID_s}}_{{_stat}}
  () =>
  {
    STAT_o
      .adopt__v( 'paint' )
  }
  ,



  adopt__v:
  (
    id_s
  ) =>
  {
    IND_o
      .adopt__v
      (
        'stat',
        `IF_${id_s}`,
        (
          iframe_e,
          adopted_e
        ) =>
        {
          //XX adopted_e
          //XX   .querySelector( '#issue' )
          //XX     .value =
          //XX       iframe_e
          //XX         .dataset
          //XX           .issue_n
        }
      )
  }
  ,
}



void function 
()
{
  STAT_o
    .init__v()

  STAT_o
    .listener__v()
}()
