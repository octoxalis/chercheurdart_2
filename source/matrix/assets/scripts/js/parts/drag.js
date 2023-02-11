//=== drag.js ===

const DRAG_o
=
{
  init__v
  (
    drag_e
  //-- , ondrop_f
  )
  {
    DRAG_o
      .drag_e
    =
      drag_e
  
    DRAG_o
      .atX_n  = 0
    DRAG_o
      .atY_n  = 0
      
    DRAG_o
      .toX_n  = 0
    DRAG_o
      .toY_n  = 0

    DRAG_o
      .gapX_n = 0
    DRAG_o
      .gapY_n = 0
  }



, listener__v
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
      DRAG_o
        .drag_e
          [`${method_s}EventListener`]
          (
            `mouse${listen_s}`
          , DRAG_o
              [ `${listen_s}__v` ]
          , false
          )
    }
  }



, enable__v
  ()
  {
    DRAG_o
      .disable_b
    =
      false

    DRAG_o
     .listener__v
     (            //: remove
       [
         'down'
       ]
       , 'add'
     )
  }



, disable__v
  ()
  {
    DRAG_o
      .disable_b
    =
      true

    DRAG_o
     .listener__v
     (            //: remove
       [
         'down'
       ]
       , 'remove'
     )
  }



, down__v
  (
    pointer_e
  )
  {
    pointer_e
      .preventDefault()

    if
    (
      DRAG_o
        .disable_b
    )
    {
      return
    }
    //-->
    DRAG_o
      .gapX_n =
        pointer_e
          .clientX
        -
        DRAG_o
          .atX_n
  
    DRAG_o
      .gapY_n =
        pointer_e
          .clientY
        -
        DRAG_o
          .atY_n
  
    DRAG_o
      .listener__v
      (
        [
          'move',
          'up'
        ],
        'add'
      )
  }



, move__v
  (
    pointer_e
  )
  {
    if
    (
      DRAG_o
        .disable_b
    )
    {
      return
    }
    //-->
    DRAG_o
      .toX_n =
        pointer_e
          .clientX
    -
    DRAG_o
      .gapX_n
  
    DRAG_o
      .toY_n =
        pointer_e
          .clientY
        -
        DRAG_o
          .gapY_n
  
    DRAG_o
      .atX_n =
        DRAG_o
          .toX_n
  
    DRAG_o
      .atY_n =
        DRAG_o
          .toY_n
  
    requestAnimationFrame
    (
      DRAG_o
        .frame__v
    )
  }



, up__v
  (
    pointer_e
  )
  {
    if
    (
      DRAG_o
        .disable_b
    )
    {
      return
    }
    //-->
    DRAG_o
      .listener__v
      (            //: remove
        [
          'move'
        , 'up'
        ]
      )
  }



, frame__v    //: translating + scaling
  ()
  {
    DRAG_o
      .drag_e
        .style
          .transform
    =
      `translate3d(${DRAG_o.toX_n}px, ${DRAG_o.toY_n}px, 0)`
      + ` scale( var(--wheel_zoom_n) )`
  }
}