// === index.js ===
const IND_o =
{
  service__v:
  () =>
  {
    //-- if ( '{{U_o.url_s}}' === '{{U_o.DEV_s}}' ) return  //: skip service worker in dev mode
    //>
    navigator  //--  navigator.serviceWorker.register( url_s } )  //: WITHOUT Service-Worker-Allowed HTTP header 
      .serviceWorker
      .register
        (
          '{{U_o.url_s}}{{U_o.SERVICE_PATH_s}}',
          {
            scope: '{{ U_o.SERVICE_SCOPE_s }}'
          }
        )
      .then
        (
          () => {},   //: resolve
          error_o =>  //: reject
            console
              .log( `ServiceWorker registration failed [error: ${error_o}]` )
        )
    
  }
  ,


  listener__v:
  () =>
  {
    ;[...document
          .querySelectorAll( 'a[href^="#G"]' ),
      ...document
          .querySelectorAll( 'a[href^="#C"]' )
    ]
      .forEach
      (
        link_e =>
          link_e
            .addEventListener
            (
              "click",
              () => document.fullscreenElement && document.exitFullscreen()
                    ||
                    document.querySelector( "body" )?.requestFullscreen()
            )
          )

    ;[...document
          .querySelectorAll( 'body > aside > a[href="#{{F_o.slug__s( C_o.SEC_TEXT_s )}}"]' )
    ]
      .forEach
      (
        link_e =>
          link_e
            .addEventListener
            (
              "click",
              () => document.fullscreenElement && document.exitFullscreen()
            )
          )
  }
  ,

}



void function
()
{
  IND_o
    .service__v()

  IND_o
    .listener__v()

  ;console.log( 'index.js' )
} ()
