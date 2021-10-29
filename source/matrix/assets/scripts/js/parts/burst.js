// === burst}.js ===
const BUR_o =
{
  worker_o: null,

  offCanvas_e: null,



  init__v:
  (
    canvas_s
  ) =>
  {
    const div_e =
      document
        .querySelector( `#{{C_o.STAT_a[0]}}` )

    const { width, height } =
      div_e
        .getBoundingClientRect()

    ;console.log( 'width: ' +  width )
    ;console.log( 'height: ' + height )

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

    div_e
      .appendChild( canvas_e )

    ;console.log( 'width: ' + canvas_e.width )
    ;console.log( 'height: ' + canvas_e.height )

    BUR_o
      .offCanvas_e =
        canvas_e
          .transferControlToOffscreen()
    
    BUR_o
      .worker_o =
        new Worker( `{{C_o.JS_DIR_s}}${canvas_s}_worker.min.js` )

    BUR_o
      .worker_o
        .postMessage
        (
          {
            task_s:   'set_offscreen',
            canvas_e: BUR_o.offCanvas_e
          },
          [ BUR_o.offCanvas_e ]
        )
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
      case 'xxxx':      //: { task_s, ... }
        break
    
      default:
        break
    }
  }
  ,



  canvas__v:
  () =>
  {
    BUR_o
      .worker_o
        .postMessage
        (
          {
            task_s:   'set_offscreen',
            canvas_e: BUR_o.offCanvas_e
          },
          [ BUR_o.offCanvas_e ]
        )
  }
  ,
}



void function
()
{
  ;console.log( '{{C_o.STAT_a[0]}}.js' )

  BUR_o
    .init__v( '{{C_o.STAT_a[0]}}' )
} ()
