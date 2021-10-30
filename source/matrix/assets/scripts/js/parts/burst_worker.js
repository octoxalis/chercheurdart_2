//=== burst_worker.js
const BUR_W_o =
{
  offCanvas_e: null,

  context_o:   null,

  scan_a:      null,



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
      case 'PUT_offscreen':      //: { task_s, id_s }
        BUR_W_o
          .offCanvas_e =
            payload_o
              .canvas_e
  
          BUR_W_o
            .context_o =
              BUR_W_o
                .offCanvas_e
                  .getContext( '2d' )      //;console.log( BUR_W_o.context_o )

        //................................ TEST

        BUR_W_o
          .context_o
            .fillRect
            (
              0, 0,
              400, 300
            )


          //................................
          break
    
        case 'PUT_scan':      //: { task_s, scan_a }
          BUR_W_o
            .scan_a =
              payload_o
                .scan_a           //;console.log( BUR_W_o.scan_a )


          break

        default:
        break
    }
  }
  ,
}




//=== INIT
self
  .addEventListener
  (
    'message',
    BUR_W_o
      .receive__v,
    true
  )



//;console.log( '{{C_o.STAT_a[0]}}_worker.js' )