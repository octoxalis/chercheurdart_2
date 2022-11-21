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



  adopt__v:    //!!! ensure id_s
  (
    adopter_s,    //: adopter element ID
    iframe_s,     //: iframe element ID
    callback_f
  ) =>
  {
    try
    {
      const iframe_e =
        document
          .getElementById( iframe_s )
    
      const src_e =      //: adopted element body
        iframe_e
          .contentDocument
            .body
        ||
        iframe_e
          .contentDocument
    
      const adopted_e =
        src_e
          .children[0]
    
      document
        .getElementById( adopter_s )    //: adopter
        .appendChild( adopted_e )
    
      callback_f
      &&
      callback_f
      (
        iframe_e,
        adopted_e
      )

      iframe_e
        .remove()
    }
    catch
    (
      error_o
    )
    {
      console
        .log(`ERROR DETECTED @iframe.js: ${ error_o }`)
    }
  }
  ,



  listener__v:
  () =>
  {
    for
    (
      let id_s
      of
      [
        'comment_label',
      ]
    )
    {
      const listen_e =
        document
          .getElementById( id_s )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          IND_o
            [ `${id_s}__v` ],
          {
            once: true
          }
        )
    }

    for
    (
      let nav_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `[name="main_nav"]` )
        )
    )
    {
      nav_e
        .addEventListener
        (
          'click',
          () =>
          {
            if
            (
              location
                .hash
            )
            {
              location
                .hash = ''    //: remove hash
                
            }
          }
        )
    }
  }
  ,



  comment_label__v:
  (
    //-- event_e    //: not used
  ) =>
  {
    IND_o
      .adopt__v
      (
        'comments',
        'comment_iframe',
        (
          iframe_e,
          adopted_e
        ) =>
        {
          adopted_e
            .querySelector( '#issue' )
              .value =
                iframe_e
                  .dataset
                    .issue_n
        }
      )
  }
  ,
}



void function
()
{
  IND_o
    .service__v()

  window
    .onload
  =
  () =>
  {
    IND_o
      .listener__v()

    const
      {
        work_s,
        stat_s,
      } =
        document
          .querySelector( 'body' )
            .dataset

    stat_s
    &&
    STAT_o
      .init__v
      (
        work_s,
        stat_s,
      )
  }
} ()
