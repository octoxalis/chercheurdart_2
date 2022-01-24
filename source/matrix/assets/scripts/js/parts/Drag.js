
//=== Pointer.js ===

//=== drag.js ===

class PointerDrag
{
  drag_b    = true    //: is drag enabled

  add_b     = false    //: are listeners already registered



  constructor
  (
    drag_e,
    move_f,
    stop_f
  )
  {
    this
      .drag_e =
        drag_e

    this
      .move_f =
        move_f

    this
      .stop_f =
        stop_f

    this
      .start__v()
  }



  start__v
  ()
  {
    this
      .drag_e
        .addEventListener
        (
          'pointerdown',
          pointer_o =>
          {
            pointer_o
              .preventDefault()

            if
            (
              this
                .drag_b
            )
            {
              if
              (
                ! this
                  .add_b
              )
              {
                this
                  .add_b =
                    true

                this
                  .listen__v
                  (
                    [
                      'pointermove',
                      'pointerup'
                    ]
                  )
              }

            }
          }
        )
  }



  handleEvent
  (
    pointer_o
  )
  {
    pointer_o
      .preventDefault()

    if
    (
      this
        .drag_b
    )
    {
      if
      (
        pointer_o
          .type
        ===
        'pointermove'
      )
      {
        this
          .move_f
          (
            pointer_o
              .offsetX,
            pointer_o
              .offsetY
          )
  
        return
      }
      //-->
      if
      (
        pointer_o
          .type
        ===
        'pointerup'
      )
      {
        this
          .drag_b = false

        this
          .stop_f()
      }
    }
  }



  listen__v
  (
    listen_a,
    method_s='add'
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
}
