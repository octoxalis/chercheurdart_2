//=== drag.js ===

class DragElement
{
  gapX_n    = 0
  gapY_n    = 0
  offsetX_n = 0
  offsetY_n = 0
  atX_n     = 0
  atY_n     = 0

  skip_b    = false



  constructor
  (
    drag_e,
    keep_b=false
  )
  {
    this
      .drag_e =
        drag_e

    this
      .keep_b =
        keep_b

    this
      .start__v()
  }



  start__v
  ()
  {
    const this_o =
      this

    this
      .drag_e
        .addEventListener
        (
          'mousedown',
          mouse_e =>
          {
            mouse_e
              .preventDefault()

            if
            (
              ! this_o
                .skip_b
            )
            {
              this_o
                .gapX_n =
                  mouse_e
                    .clientX
                  -
                  this_o
                    .offsetX_n
  
              this_o
                .gapY_n =
                  mouse_e
                    .clientY
                  -
                  this_o
                    .offsetY_n
  
              this_o
                .listen__v
                (
                  [
                    'mousemove',
                    'mouseup'
                  ],
                  'add'
                )
            }

            return false
          }
        )
  }



  handleEvent
  (
    mouse_e
  )
  {
    mouse_e
      .preventDefault()

    if
    (
      ! this
        .skip_b
    )
    {
      if
      (
        mouse_e
          .type
        ===
        'mousemove'
      )
      {
        this
          .atX_n =
            mouse_e
              .clientX
        -
        this
          .gapX_n
  
        this
          .atY_n =
            mouse_e
              .clientY
            -
            this
              .gapY_n
  
        this
          .offsetX_n =
            this
              .atX_n
  
        this
          .offsetY_n =
            this
              .atY_n
  
        this
          .drag_e
            .style
              .transform =
                `translate3d(${this.atX_n}px, ${this.atY_n}px, 0)`
  
        return false
      }
  
      if
      (
        mouse_e
          .type
        ===
        'mouseup'
      )
      {
        this
          .drag_e
            .dataset
              .offx =
                ~~(             //: float to integer
                  this
                    .atX_n
                  +
                  +(this        //: number cast
                    .drag_e
                      .dataset
                        .offx)
                )
    
        this
          .drag_e
            .dataset
              .offy =
                ~~(
                  this
                    .atY_n
                  +
                  +(this        //: number cast
                    .drag_e
                      .dataset
                        .offy)
                )

        if
        (
          ! this
            .keep_b
        )
        {
          this
            .listen__v
            (            //: remove
              [
                'mousemove',
                'mouseup'
              ]
            )
        }
      }
    }

    return false
  }



  listen__v
  (
    listen_a,
    method_s='remove'
  )
  {
    for
    (
      let listen_s
      of
      listen_a
    )
    {
      this
        .drag_e
          [`${method_s}EventListener`]
          (
            listen_s,
            this,
            false
          )
    }
  }



  enable__v ()
  {
    this
      .skip_b = false
  }



  disable__v ()
  {
    this
      .skip_b = true
  }



}
