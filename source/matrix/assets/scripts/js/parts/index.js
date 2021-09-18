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
          .querySelectorAll( 'body > aside > a[href="#{{C_o.SECTION_a[0]}}"]' )
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




  anchor__v:
  () =>
  {
    const hash_s =       //: schema: section__anchor_id
      location
        .hash
          .slice( 1 )    //: skip '#'

    const section_n =
      hash_s
        .indexOf( '{{C_o.ANCHOR_SEPARATOR_s}}' )

    if
    (
      section_n
      >
      -1
    )
    {
      location
        .hash =
          hash_s
            .slice
            (
              0,
              section_n
            )
      
      const anchor_e =
        document
          .getElementById( hash_s )
      anchor_e
      &&
      anchor_e
        .scrollIntoView( {behavior: "smooth", block: "start", inline: "nearest"} )
    }
  }
  ,


  comment__v:    //: extract form and issue number from iframe and remove iframe
  () =>
  {
    const label_e =
      document
        .getElementById( 'comment_label' )

    if
    (
      label_e    //: skip if no page is not comment enabled
    )
    {
      label_e
        .addEventListener
        (
          'click',
          () =>
          {
            const iframe_e =
              document
                .getElementById( 'comment_iframe' )
  
            const content_e =      //: adopted
              iframe_e
                .contentDocument
                  .body
              ||
              iframe_e
                .contentDocument
  
            const form_e =
              content_e
                .children[0]
  
            document
              .getElementById( 'comments' )    //: adopter
              .appendChild( form_e )
  
            form_e
              .querySelector( '#issue' )
                .value =
                  iframe_e
                    .dataset
                      .issue_n
  
            iframe_e
              .remove()
          },
          {
            once: true
          }
      )
    }
  }
  ,
}



void function
()
{
  //;console.log( 'index.js' )

  IND_o
    .service__v()

  //... IND_o
  //...   .listener__v()

  if
  (
    ! location
      .hash
  )
  {
    location +=
      `#{{C_o.SECTION_a[0]}}`    //: display article section by default
  }

  window
    .onload
  =
  window
    .onhashchange
  =
    () =>
    {
      IND_o
        .anchor__v()

      IND_o
        .comment__v()
    }
} ()
