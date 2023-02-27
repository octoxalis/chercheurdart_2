let timeout_n

window
  .addEventListener
  (
    'scroll'    //....
  , event_o =>
    {
  
	    //;console.log('no debounce')
  
	    if
      (
        timeout_n
      )
      {
	    	window
          .cancelAnimationFrame( timeout_n )
	    }
    
	    timeout_n
      =
        window
          .requestAnimationFrame
          (
            event_o =>
            {
	    	      //;console.log('debounced')
              //...
	          }
          )    
    }
  , false
  )



const DEB_o
=
{
  timeout_n:
    null


, debounce__v
  (
    event_s
  , id_s
  , callback_f
  )
  {
    document
      .getElementById( id_s  )
        .addEventListener
        (
          event_s
        , event_o =>
          {
	          //;console.log('no debounce')
        
	          if
            (
              DEB_o
                .timeout_n
            )
            {
	          	window
                .cancelAnimationFrame( timeout_n )
	          }
          
            DEB_o
              .timeout_n
            =
              window
                .requestAnimationFrame
                (
                  event_o =>
                  {
	          	      //;console.log('debounced')
                    //...
	                }
                )    
          }
        , false
        )
      

  }
}