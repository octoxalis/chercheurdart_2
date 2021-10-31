// === burst.js ===
const BUR_o =
{
  //??????????????
  //...receive__v:
  //...(
  //...  msg_o
  //...) =>
  //...{
  //...  const payload_o =
  //...    msg_o
  //...      .data
  //...
  //...  switch
  //...  (
  //...    payload_o
  //...      .task_s
  //...  )
  //...  {
  //...    case 'xxxx':      //: { task_s, ... }
  //...      break
  //...  
  //...    default:
  //...      break
  //...  }
  //...}
  //...,

  test__v:
  () =>
  {
    console.log( 'Comes from STAT_W_o!!!' )
  }
  ,


  async put_scan__v
  ()
  {
    let scan_a =
      STAT_o
        .scan_a
  
    let times_n = 20    //: 10s
  
                            ;console.time( 'sleep' )
    while
    (
      ! scan_a
      &&
      --times_n
      >
      0
    )
    {
      await IND_o
        .sleep__v( 500 )

      scan_a =
        STAT_o
          .scan_a

      if
      (
        scan_a
      )
      {
        times_n = 0    //: stop waiting
      }
    }
                            ;console.timeEnd( 'sleep' )
  }
  ,



  init__v:
  (
    canvas_s
  ) =>
  {
    const shared_o =
      new SharedWorker
      (
        BUR_o
          .worker_s
      )

    BUR_o
      .port_o =
        shared_o
          .port

    BUR_o
      .port_o
        .onmessage =
          BUR_o
            .receive__v

    BUR_o
      .port_o
        .onerror =
          BUR_o
            .handleError__v
    
    BUR_o
      .port_o
        .start()

























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
            -('px'.length)
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
        `${canvas_s}_canvas`
  
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
      .worker_o =
        new SharedWorker
        (
          STAT_o
            .worker_s
        )
        
    BUR_o
      .worker_o
        .port
          .postMessage
          (
            {
              client_s: '{{C_o.STAT_a[0]}}',
              task_s:   'PUT_offscreen',
              canvas_e: offCanvas_e
            },
            [ offCanvas_e ]
          )
  
  }
  ,
}



void function
()
{
  //;console.log( '{{C_o.STAT_a[0]}}.js' )

  BUR_o
    .init__v( '{{C_o.STAT_a[0]}}' )
} ()
