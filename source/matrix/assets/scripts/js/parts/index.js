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

, href_s:      //: kepp location.hash when dragging
    ''


, service__v
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
  
  
  
, adopt__v    //!!! ensure id_s
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



, eventKey__v    //: must prevent default for space key
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


, zoom__v
  (
    event_o    //: not used
  )
  {
    let hash_s

    let section_e

    let img_e      //:::::: reserve
    =
      document
        .getElementById( 'img_reserve_img'  )

    if
    (
      ! img_e
    )
    {
      section_e
      =
        document
          .getElementById( 'expo' )
      
      if    //::::: expo
      (
        section_e
      )
      {
        img_e
        =
          EXP_o
            .full_e
        
        if
        (
          ! img_e
        )
        {
          return    //--> TODO: alert
        }
      }
      else    //::::: aside gallery
      {
        hash_s
        =
          location
            .hash
            
        img_e
        =
          document
            .getElementById
            (
              hash_s
                .substring( 1 )       //: skip # = figure:target
            ) 
              .querySelector( 'img' )
      }
    }

    const input_e
    =
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_toolset_zoom' ) 

    if
    (
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_toolset_zoom' ) 
          .checked
    )
    {
      
      if    //::::: aside gallery  (block link behaviour)
      (
        hash_s
      )
      {
        img_e
          .parentNode
            .setAttribute
            (
              'href'
            , hash_s
            )
      }

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

      if       //::::: expo
      (
        section_e
      )
      {
        img_e
          .classList
            .toggle( 'fullsize' )

        EXP_o
          .full_e
        =
          null
      }

    //== restore initial  link behaviour + image position ===
      img_e
        .setAttribute
        (
          'style'
        , ''       //: remove drag transform
        )

      if    //::::: aside gallery
      (
        hash_s
      )
      {
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
      }
    }

  }



, async expo__v    //: add PRO_SITE_s
  (
    event_o
  )
  {
    const figure_e
    =
      document
        .getElementById
        (
          location
            .hash
              .substring( 1 )       //: skip # = figure:target
        )
        
    const id_s
    =
      figure_e
        .id
  
    const caption_e =    //: galery node
      document
        .querySelector
        (
          `#{{C_o.GALLERY_ID_s}}`
          + id_s
              .substring( 2 )    //: skip leading ASIDE_GRAY_ID_s or ASIDE_COLOR_ID_s
          + ` figcaption`
        )
  
    const img_e
    =
      figure_e
        .querySelector( 'img' )
  
    const key_s
    =
      '{{C_o.PRO_SITE_s}}'
      +
      DATE_o
        .dataTimeNumeric__s()
  
    IDB_o
      .idb_o
        .set__v
      (
        key_s
      , JSON
          .stringify
          (
            {
              id_s:    //: AC1383
                id_s
            , order_n:
                //-- EXI_o
                //--   .order__n()
                0
            , display_b:
                true
            , caption_s: 
                caption_e
                  .innerHTML
            , width_s: 
                img_e
                  .naturalWidth
            , height_s:
                img_e
                  .naturalHeight
            , src_s:
                img_e
                  .src
            }
          )
      )
  
    DIA_o
      .open__v
      (
        {
          '{{C_o.LABEL_ID_s}}': `Opération terminée`
        , '{{C_o.PARAGRAPH_ID_s}}': `L'image a été accrochée sur les cimaises`
        , option_a:
          [
            'accept'
          ]
        }        
      )
    
    await
    DIA_o
      .confirm__b()
  }



, burst__v      //: <aside> color img call
  (
    event_o
  )
  {
    const img_e
    =
      document
        .getElementById
        (
          location
            .hash
              .substring( 1 )       //: skip # = figure:target
        ) 
          .querySelector( 'img' )

    sessionStorage
      .setItem
      (
        'burst'
      ,  JSON
           .stringify
           (
              {
                origin_s: 'index'
              , src_s:
                  img_e
                    .src
                      .replace
                      (
                        '{{C_o.IMG_SCAN_DISPLAY_s}}'
                      ,  '{{C_o.IMG_SCAN_FORMAT_s}}'
                      )
              , width_s:  +img_e.naturalWidth     //: Number cast
              , height_s: +img_e.naturalHeight    //: Number cast
              }
           )
      )

    location
      .href
    =
      `burst.html`
  }



, listener__v
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
      let label_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `label[id^=goto]` )
        )
    )
    {
      label_e
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

    let input_e
    =
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_toolset_zoom' )

    input_e
    &&
    input_e
      .addEventListener
      (
        'change'
      , IND_o
          .zoom__v
      )

    const location_s
    =
      location
        .href

    const start_n
    =
      location_s
        .indexOf
        (
          '/'
        , 'https://'
            .length
          +
          1
        )
        +
        1

    for
    (
      let id_s    
      of
      [
        'burst'
      , 'expo'
      ]
    )
    {
      if
      (
        location_s
          .includes
          (
            'reserve'
          , start_n

          )
        ||
        location_s
          .includes
          (
            'expo'
          , start_n

          )
      )
      {
        continue   //: let the event be processed by the page
      }

      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_toolset_${id_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          IND_o
            [ `${id_s}__v` ]
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



, comment_label__v
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




, async init__v
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
    
      const { stat_s }
      =
        document
          .querySelector( 'body' )
            .dataset
    
    if
    (
      stat_s
    )
    {
      STAT_o
        .init__v( stat_s )

    }
    




    }
  }
}



IND_o
  .init__v()
