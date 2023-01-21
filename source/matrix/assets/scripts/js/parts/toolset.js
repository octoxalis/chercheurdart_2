// === toolset.js ===
const TOOL_o
=
{
  zoom__v
  (
    event_o    //: not used
  )
  {
    const hash_s
    =
      location
        .hash
        
    const img_e
    =
      document
        .getElementById
        (
          hash_s
              .substring( 1 )       //: skip # = figure:target
        ) 
          .querySelector( 'img' )

    const input_e
    =
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_aside_zoom' ) 

    if
    (
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_aside_zoom' ) 
          .checked
    )
    {
      //== block link behaviour ===
      img_e
        .parentNode
          .setAttribute
          (
            'href'
          , hash_s
          )

      DRAG_o
        .init__v
        (
          img_e
        )
  
      DRAG_o
        .enable__v()

    }
    else
    {
      DRAG_o
        .disable__v()

    //== restore initial  link behaviour + image position ===
      img_e
        .parentNode
          .setAttribute
          (
            'href'
          , hash_s
              .replace
              (
                '{{C_o.ASIDE_COLOR_ID_s}}'
              , '{{C_o.ASIDE_GRAY_ID_s}}'
              )
          )

      img_e
        .setAttribute
        (
          'style'
        , ''       //: remove drag transform
        )

    }

  }


, listener__v
  ()
  {
    let input_e
    =
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_aside_zoom' )

    input_e
    &&
    input_e
      .addEventListener
      (
        'change'
      , TOOL_o
          .zoom__v
      )
  }
}



TOOL_o
  .listener__v()
