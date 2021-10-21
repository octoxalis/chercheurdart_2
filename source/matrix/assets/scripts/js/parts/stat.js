//=== stat.js
const STAT_o =
{
  worker_s: '/assets/scripts/js/stat_worker.min.js',

  worker_o: null,



  loadScan__v:
  (
    payload_o
  ) =>
  {
    const scan_a =
      payload_o
        .scan_a

  const scan_o =
    new Function            //!!! not JSON.parse !!!
    (
      `return ${scan_a}`
    )()                      ;console.log( scan_o )
  }
  ,



  listenWorker__v:
  (
    message_o
  ) =>
  {
    const payload_o =
      message_o
        .data

    switch
    (
      payload_o
        .task_s
    )
    {
      case 'LOAD_SCAN':
        STAT_o
          .loadScan__v( payload_o )
        break
    
      default:
        break
    }
  }
  ,



  startWorker__v:
  () =>
  {
    const id_s =
    document
      .getElementById( '{{C_o.SECTION_a[2]}}' )
        .dataset
          .work_s
  
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
            .listenWorker__v,
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
            task_s: 'LOAD_SCAN',
            id_s: id_s
          }
        )
  }
  ,

  handleError__v:
  (
    event_o
  ) =>
    console
      .log`ERROR: ${event_o.message}`
  ,


  listener__v:
  () =>
  {
    for
    (
      let id_s
      of
      [
        'LA_stat',
      ]
    )
    {
      const listen_e =
        document
          .getElementById( id_s )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          STAT_o
            [ `${id_s}__v` ],
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

  STAT_o
    .startWorker__v()
}()
