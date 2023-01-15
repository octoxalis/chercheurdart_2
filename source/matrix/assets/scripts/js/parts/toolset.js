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



, async expo__v
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

    let src_s
    =
      img_e
        .src

    src_s
    =
      src_s
        .substring
        (
          '{{C_o.MEDIA_DIR_s}}'
            .length,
          src_s
            .lastIndexOf( '.' )      //: extension dot
        )

    LOC_o
      .idb_o
        .set__v
      (
        '{{C_o.PROTOCOLE_SITE_s}}'
        +
        src_s
      , JSON
          .stringify
          (
            {
              id_s:    //: AC1383
                id_s
            , order_n: //-- EXI_o
                       //--   .order__n()
                       0
            , display_b: true
            , caption_s: caption_e
                           .innerHTML
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



, burst__v
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

    const src_s
    =
    img_e
      .src
        .replace
        (
          'avif'
        , 'jpeg'    //: need a JPEG to scan
        )

    location
      .href
    =
      `burst.html`
      + `?{{C_o.LOC_IMG_s}}=${src_s}`
      + `&{{C_o.LOC_IMG_WIDTH_s}}=${img_e.naturalWidth}`
      + `&{{C_o.LOC_IMG_HEIGHT_s}}=${img_e.naturalHeight}`
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
          .getElementById( `{{C_o.LABEL_ID_s}}_aside_${id_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          TOOL_o
            [ `${id_s}__v` ]
        )
    }
  }
}



TOOL_o
  .listener__v()
