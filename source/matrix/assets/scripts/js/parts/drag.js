//========================================================= drag.js

class DragElement
{
  gapX_n    = 0
  gapY_n    = 0
  offsetX_n = 0
  offsetY_n = 0
  atX_n     = 0
  atY_n     = 0



  constructor
  (
    drag_e,
    keep_b
  )
  {      
    this
      .drag_e =
        drag_e

    this
      .keep_b =
        keep_b || false

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
            this_o
              .loose_b = false

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

            return false
          }
        )
  }



  disable__v ()
  {
    this
      .loose_b = true
  }



  listen__v
  (
    type_a,
    method_s='remove'
  )
  {
    for
    (
      let type_s
      of
      type_a
    )
    {
      this
        .drag_e
          [`${method_s}EventListener`]
          (
            type_s,
            this,
            false
          )
    }
  }



  handleEvent
  (
    mouse_e
  )
  {
    if
    (
      this
        .loose_b
    )
    {
      return false
    }
      

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

      ;console.log( `${this.atX_n}px /  ${this.atY_n}px` )
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

      this
        .loose_b = true
    }

    return false
  }
}
