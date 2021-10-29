// === {{C_o.STAT_a[1]}}.js ===
const AST_o =
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

    AST_o
      .offCanvas_o =
        canvas_o
          .transferControlToOffscreen()
    
    AST_o
      .worker_o =
      new Worker( `{{C_o.JS_DIR_s}}${canvas_s}_worker.min.js` )

    AST_o
      .worker_o
        .postMessage
        (
          {
            task_s:   'set_offscreen',
            canvas_o: AST_o.offCanvas_o
          },
          [ AST_o.offCanvas_o ]
        )
  }
  ,



  canvas__v:
  () =>
  {
    AST_o
      .worker_o
        .postMessage
        (
          {
            msg: 'offscreen',
            canvas: AST_o.offCanvas_o
          },
          [ AST_o.offCanvas_o ]
        )
  }
  ,
}



void function
()
{
  ;console.log( '{{C_o.STAT_a[1]}}.js' )

  AST_o
    .init__v( '{{C_o.STAT_a[1]}}' )
} ()
