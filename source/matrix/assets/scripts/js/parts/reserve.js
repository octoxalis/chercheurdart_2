//=== reserve.js ===

var RES_o
=
{
  href_s:     //: selected img source
    ''

, full_e:
    null

, eventKey_a:
  [
  , '3'     //: goto reserve
  , 'b'     //: burst
  , 'e'     //: expo
  ]



, show__v
  (
    event_o
  )
  {
    document
      .getElementById( 'img_reserve_img'  )
        .src
    =
      event_o
        .currentTarget
          .dataset
            .href_s

    document
      .getElementById( '{{C_o.INPUT_ID_s}}_toolset'  )
        .checked
    =
      true
  }


//-- , zoom__v      //: eventListener declared in index.js



, async expo__v    //: add PROTOCOLE_RESERVE_s
  (
    event_o
  )
  {
  /*
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
    */
    const img_e
    =
      document
        .getElementById( 'img_reserve_img' )

    let src_s
    =
      img_e
        .src

    let html_s
    =
      document
        .querySelector( `dl[data-href_s="${src_s}"]`  )
          .innerHTML
            .replaceAll
            (
              /\s{2}/g    //: strip blank spaces
            , ''
            )

    let caption_s
    =
      `<dl>`
      + `${html_s}`
      + `</dl>`

    let id_s
    =
      src_s
        .substring
        (
          '{{C_o.MEDIA_DIR_s}}reserve/'
            .length
        )

    LOC_o
      .idb_o
        .set__v
      (
        '{{C_o.PROTOCOLE_RESERVE_s}}'
        +
        id_s
      , JSON
          .stringify
          (
            {
              id_s: id_s
            , order_n: //-- EXI_o
                       //--   .order__n()
                       0
            , display_b: true
            , caption_s: caption_s
            , width_s: img_e
                         .naturalWidth
            , height_s: img_e
                          .naturalHeight
            }
          )
      )

    DIA_o
      .open__v
      (
        {
          '{{C_o.LABEL_ID_s}}': `Opération terminée`
        , '{{C_o.PARAGRAPH_ID_s}}': `${caption_s} a été accrochée sur les cimaises`
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



, async burst__v
  ()
  {
    const img_e
    =
      document
        .getElementById( 'img_reserve_img' )

    location
      .href
    =
      `burst.html`
      + `?{{C_o.LOC_IMG_s}}=${img_e.src}`
      + `&{{C_o.LOC_IMG_WIDTH_s}}=${img_e.naturalWidth}`
      + `&{{C_o.LOC_IMG_HEIGHT_s}}=${img_e.naturalHeight}`
  }



, async eventKey__v    //: must prevent default for space key
  (
    event_o
  )
  {
    if
    (
      document
        .querySelector( '#dialog_work_caption[open]')
      ||
      ! RES_o
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
        '3'
      :
        document
           .getElementById( `{{C_o.INPUT_ID_s}}_reserve` )
             .checked
         =
           true

        break

      case
        'b'
      :
        const img_e
        =
          document
            .getElementById( 'img_reserve_img' )

        img_e
          .src      //: image have to be already loaded
        &&
        RES_o
          .burst__v()

        break

      case
        'e'
      :

        break

      default
      :
        break
    }
  }



, listener__v
  ()
  {
    document
      .body
        .addEventListener
        (
          'keydown'
        , RES_o
            .eventKey__v
        , {
            passive: false
          }
        )

    for
    (
      let item_e    //: <dl>
      of
      Array
        .from
        (
          document
            .querySelectorAll( `[data-href_s]` )
        )
    )
    {
      item_e
        .addEventListener
        (
          'click',
          RES_o
            .show__v
        )
    }

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
      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_toolset_${id_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          RES_o
            [ `${id_s}__v` ]
        )
    }

    DOM_o
      .event__v
      (
        'keydown'
      , event_o =>
          RES_o
            .eventKey__v
            (
              event_o
            )
      )
  }



, init__v
  ()
  {
    RES_o
      .listener__v()
  
    document
      .getElementById( `{{C_o.INPUT_ID_s}}_reserve` )
        .checked
    =
      true
  }
}



RES_o
  .init__v()
