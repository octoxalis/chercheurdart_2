// === fullscreen.js ===

const FUL_o =
{
  listener__v:
  () =>
  {
    const full_e =
      document
        .getElementById( 'goto_{{C_o.FULL_SCREEN}}' )

    if
    (
      full_e      
    )
    {
      full_e
        .addEventListener
        (
          "click",
          //-- () =>
          //--   (
          //--     document
          //--       .fullscreenElement
          //--     &&
          //--     document
          //--       .exitFullscreen()
          //--   )
          //--   ||
          //--   document
          //--     .querySelector( "body" )
          //--     ?.requestFullscreen()
          FUL_o
            .toggle__v
        )
    }
  }


,  toggle__v
   ()
   {
     (
       document
         .fullscreenElement
       &&
       document
         .exitFullscreen()
     )
     ||
     document
       .querySelector( "body" )
       ?.requestFullscreen()
   }
}
