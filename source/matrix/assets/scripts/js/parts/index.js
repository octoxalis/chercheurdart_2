// === index.js ===
const IND_o =
{
  eventKey_a:
    [
      '0'          //: goto accueil
    , '1'          //: goto article
    , '2'          //: goto gallery
    ]

  , keySection_o:
    {
      1: '{{C_o.SECTION_a[0]}}'
    , 2: '{{C_o.SECTION_a[1]}}'
    }


  ,  
  service__v
  ()
  {
    //-- if ( '{{U_o.url_s}}' === '{{U_o.DEV_s}}' ) return  //: skip service worker in dev mode
    //-->
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
  adopt__v    //!!! ensure id_s
  (
    adopter_s,    //: adopter element ID
    iframe_s,     //: iframe element ID
    callback_f
  )
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
  eventKey__v    //: must prevent default for space key
  (
    event_o
  )
  {
    if
    (
      ! IND_o
          .eventKey_a
            .includes
            (
              event_o
                .key
            )
    )
    {
      return     //: let event buble
    }

    event_o
      .preventDefault()

    let input_e

    switch
    (
      event_o
        .key
    )
    {
      case
        '0'    //: show gallery
      :
        location
        =
          'index.html'

        break

      case
        '1'    //: show article
      :
      case
        '2'    //: show gallery
      :
        const input_e
        =
          document
            .getElementById( `{{C_o.INPUT_ID_s}}_${IND_o.keySection_o[event_o.key]}` )

        if
        (
          input_e
        )
        {
          input_e
              .checked
          =
            true
        }

        break

      default 
      :
        break
    }
  }



  ,
  listener__v
  ()
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

    for
    (
      let top_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `label[id^=goto]` )
        )
    )
    {
      top_e
        .addEventListener
        (
          'click',
          () =>
          {
            window
              .scroll
              (
                {
                  top: 0
                ,  left: 0
                ,  behavior: 'smooth'
                }
              )
          }
        )
    }

    DOM_o
      .event__v
      (
        'keydown'
      , event_o =>
          IND_o
            .eventKey__v
            (
              event_o
            )
      )          
  }



  ,
  comment_label__v
  (
    //-- event_e    //: not used
  )
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



  init__v
  ()
  {
    IND_o
      .service__v()
    
    window
      .onload
    =
    async () =>
    {
      IND_o
        .listener__v()
    
      const
        {
          stat_s
        , work_s
        } =
          document
            .querySelector( 'body' )
              .dataset
    
      if
      (
        stat_s
      )
      {
        const key_s
        =
          await
          LOC_o
            .search__()    //: '{{C_o.LOC_SEARCH_s}}'
    
        STAT_o
          .init__v
          (
            stat_s
          , key_s
            ||
            work_s
          )
      }
    }
  }
}



IND_o
  .init__v()
