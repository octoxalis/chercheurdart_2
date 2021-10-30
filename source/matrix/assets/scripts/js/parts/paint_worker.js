//=== paint_worker.js
const PAI_W_o =
{
  offCanvas_o: null,

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
      case 'PUT_offscreen':      //: { task_s, id_s }

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
    PAI_W_o
      .receive__v,
    true
  )


  
  ;console.log( '{{C_o.STAT_a[2]}}_worker.js' )