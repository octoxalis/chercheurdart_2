//=== stat.js
const STAT_o =
{
  worker_o: null,

  scan_b: false,    //: status: not loaded



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
      //?? case 'PUT_scan':      //: { task_s, msg_s }
      //??   //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //??   ;console.timeEnd( 'scan_load' )
      //??   //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //??   STAT_o
      //??     .scan_b =
      //??       payload_o
      //??         .scan_b
      //?? 
      //??   break
      //?? 
      //?? case 'PUT_offscreen':      //: { task_s, client_s, canvas_e }
      //??   STAT_W_o
      //??     .put_offscreen( payload_o )
      //?? 
      //??   break
    
      default:
        break
    }
  }
  ,
  

  
  init__v:    //: from index.js
  (
    work_s
  ) =>
  {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    ;console.time( 'sworker' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    STAT_o
      .worker_o =
        new WorkerClient
        (
          {
            url_s: '{{C_o.WORKER_FILE_s}}',
            id_s:  '{{C_o.STAT_s}}',
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

    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    ;console.timeEnd( 'sworker' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  ,



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

}


void function 
()
{
  STAT_o
    .listener__v()
}()


/*//..................
1. init__v from index.js
2. message__v from worker
3. adopt__v from listener__v
*/