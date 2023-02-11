//=== wheel_zoom.js ===
const WHE_o
=
{
zoom__v
(
  event_o
)
{
  if
  (
    event_o
      .shiftKey    //!!! using shift key to zoom without preventDefault
  )
  {
    requestAnimationFrame    //: as a debounce function
    (
      () =>
      {
        let scale_n
        =
          Math
            .min
            (
              Math
                .max
                (
                  +'{{C_o.WHEEL_ZOOM_MIN_n}}'
                , +DOM_o           //: Number cast
                    .rootVar__s
                    (
                      '--wheel_zoom_n'
                    )
                  +
                  event_o
                    .deltaY
                  *
                  -'{{C_o.WHEEL_ZOOM_DELTA_n}}'
                )
            , 4         //: no more than 1 for images
            )
      
          DOM_o           //: Number cast
            .rootVar__v
            (
              '--wheel_zoom_n'
            , scale_n
            )
      }
    )
  }
}

}
