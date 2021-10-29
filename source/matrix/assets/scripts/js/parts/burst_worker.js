//=== burst_worker.js
const BUR_W_o =
{
  offCanvas_e: null,

  context_o:   null,



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
      case 'set_offscreen':      //: { task_s, id_s }
        BUR_W_o
          .offCanvas_e =
            payload_o
              .canvas_e
  
          BUR_W_o
            .context_o =
              BUR_W_o
                .offCanvas_e
                  .getContext( '2d' )      ;console.log( BUR_W_o.context_o )

        //................................ TEST

        BUR_W_o
          .context_o
            .fillRect
            (
              10, 10,
              100, 50
            )


        //................................
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



;console.log( '{{C_o.STAT_a[0]}}_worker.js' )