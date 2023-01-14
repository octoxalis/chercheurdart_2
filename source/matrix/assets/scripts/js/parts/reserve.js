//=== reserve.js ===

RES_o
=
{
  href_s:     //: selected img source
    ''

, full_e:
    null

, eventKey_a:
  [
  , '3'     //: goto exposition

  , 'b'     //: burst image
  ]




  ,
  show__v
  (
    event_o    //:  img event_o || img src
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
      .getElementById( '{{C_o.INPUT_ID_s}}_reserve_img'  )
        .checked
    =
      true
  }



  ,
  async burst__v
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


  ,
  async eventKey__v    //: must prevent default for space key
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

      default
      :
        break
    }
  }



  ,
  listener__v
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

    document
      .getElementById( '{{C_o.LABEL_ID_s}}_reserve_img'  )
        .addEventListener
        (
          'click',
          RES_o
            .burst__v
        )
  }



  ,
  init__v
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
