// === {{C_o.STAT_a[2]}}.js ===
const PAI_o =
{
  worker_o: null,

  offCanvas_o: null,



  init__v:
  (
    canvas_s
  ) =>
  {
    const canvas_o =
      document
        .querySelector( `#${canvas_s}_canvas` )

    PAI_o
      .offCanvas_o =
        canvas_o
          .transferControlToOffscreen()
    
    PAI_o
      .worker_o =
      new Worker( `{{C_o.JS_DIR_s}}${canvas_s}_worker.min.js` )
        
    PAI_o
      .worker_o
        .postMessage
        (
          {
            task_s:   'set_offscreen',
            canvas_o: PAI_o.offCanvas_o
          },
          [ PAI_o.offCanvas_o ]
        )
  }
  ,



  canvas__v:
  () =>
  {
    PAI_o
      .worker_o
        .postMessage
        (
          {
            msg: 'offscreen',
            canvas: PAI_o.offCanvas_o
          },
          [ PAI_o.offCanvas_o ]
        )
  }
  ,
}



void function
()
{
  ;console.log( '{{C_o.STAT_a[2]}}.js' )

  PAI_o
    .init__v( '{{C_o.STAT_a[2]}}' )
} ()
