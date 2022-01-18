// === paint.js ===

const PAI_o =
{
  status_o: null,    //: STAT_W_o.status_o

  SCALE_H_n: 1,
  SCALE_V_n: 2,

  hue_o:
  {
    rangeX_n: 50,    //: {{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_hue_rangeX_n
    rangeY_n: 60,    //: _hue_rangeY_n
  }
  ,
  sat_o:
  {
    rangeX_n: 50,    //: {{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_sat_rangeX_n
    rangeY_n: 10,    //: _sat_rangeY_n
  }
  ,
  lum_o:
  {
    rangeX_n: 50,    //: {{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_lum_rangeX_n
    rangeY_n: 10,    //: _lum_rangeY_n
  }
  ,

  view_o:
  {
    perspective_n: 1000,
    distance_n:    -100,
    rotation_n:    0,
    scale_n:      .5
  }
  ,

  layer_a: [],



  message__v:
  (
    payload_o
  ) =>
  {
    switch
    (
      payload_o
        .task_s
    )
    {
      case 'PUT_status':      //: { client_s, task_s, status_o }
        PAI_o
          .status_o =
            payload_o
              .status_o
      
        break
    
      case 'PUT_error':      //: { client_s, task_s, error_s }
        console.log( `ERROR: ${payload_o.error_s}` ) //... TODO: load error page ...
        
        break
    
      default:
        break
    }
  }
  ,



  layer__n:
  () =>
    Array
      .from
      (
        document
          .getElementById( '{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_items' )
            .querySelectorAll( 'li' )
      )
      .length
  ,



  layerIndex__s:
  (
    layer_s
  )  =>
    layer_s
      .slice
      (
        layer_s
          .lastIndexOf( '_' )
        +
        1
      )
  ,



  addLayer__n:
  (
    operation_s='',
    label_s=''
  ) =>
  {
    const layer_n =
      PAI_o
        .layer__n()

    if
    (
      layer_n
      >=
      +'{{C_o.PAINT_LAYER_n}}'
    )
    {
      return void alert( 'Le nombre de plans maximum est atteint ' )
    }
    //-->
    if
    (
      layer_n
      >
      1      //: layer_0 doesn't count
    )
    {
      PAI_o
        .displayOp__v( true )
    }

    let work_s =
      document
        .querySelector( 'body' )
          .dataset
            .work_s

    let imgId_s =
      operation_s
      ?
        operation_s
      :
        work_s

    let fullLabel_s =
      '{{C_o.NAV_LEGEND_o.layer_s.legend_s}} '
      +
      (
        layer_n
        ||
        '{{C_o.NAV_LEGEND_o.layer_initial.legend_s}}'
      )

    if
    (
      label_s
    )
    {
      fullLabel_s +=
        ` &#8285; ${label_s}`
    }

    let input_s = ''
  
    let id_s = ''
  
    let for_s = ''
  
    if
    (
      layer_n
    )
    {
      id_s = `input_${imgId_s}_${layer_n}`
  
      input_s =
        `<input id="${id_s}" data-layer_n=${layer_n} type="checkbox">`
  
      for_s =
        `for="${id_s}"`
    }
  
    DOM_o
      .appendNode__v
      (
        DOM_o
          .fragment__e
          (
            `<li data-layer_n=${layer_n}>`
            + input_s
            + `<label ${for_s}>${fullLabel_s}</label>`
            + `</li>`
          ),
        '{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_items'
      )
  
  
    const
    [
      width_s,
      height_s
    ] =
      document
        .querySelector( 'body' )
          .dataset
            .wh_s
              .split( '_' )

    DOM_o
      .fragment__e
      (
        `<canvas`
        + ` id={{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}`
        + ` width=${width_s} height=${height_s}`
        + ` data-layer_n=${layer_n}`
        + ` data-size_n=1`
        + ` title="{{C_o.NAV_LEGEND_o.layer_s.legend_s}} ${layer_n}"`
        + `><canvas>`
        ,
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_view'
      )

    const canvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}` )

    canvas_e
      .addEventListener
      (
        'click',
        event_o =>
        {
          event_o
            .target
              .classList
                .toggle( 'raised' )
        }
      )
      
    const offCanvas_e =
      canvas_e
        .transferControlToOffscreen()
  
    PAI_o
      .layer_a
        .push
        (
          {          //: sliders state
            hue_o:
            {
              rangeX_n: 0,
              rangeY_n: 0,
            }
            ,
            sat_o:
            {
              rangeX_n: 0,
              rangeY_n: 0,
            }
            ,
            lum_o:
            {
              rangeX_n: 0,
              rangeY_n: 0,
            }
          }
        )

    const centerX =
      +width_s      //: number cast
      *
      .5

    const centerY =
      +height_s      //: number cast
      *
      .5

    PAI_o
      .worker_o           //! using port postMessage directly
        .port_o           //! to avoid error:
          .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
          (
            {
              task_s:   'GET_img',
              pixel_n:  window.devicePixelRatio,
              rect_s:   `${centerX} ${centerY} ${width_s} ${height_s}`,
              scale_n:  1,
              url_s:    `/{{C_o.IMG_DIR_s}}${work_s}/full/max/0/color.jpeg`,  //: begining slash for site relative url
              canvas_e: offCanvas_e,
              storeBitmap_b: true
            },
            [ offCanvas_e ]
          )

    return layer_n
  }
  ,
  
  

  hideLayer__n:
  () =>
  {
    const selected_a =
      PAI_o
        .selected__a()

    if
    (
      ! selected_a
        .length    //: no selection
    )
    {
      if
      (
        ! PAI_o
          .masked__n()
      )
      {
        window
          .alert( `Aucun plan n'est sélectionné.` )
        return
      }
      //-->
      if
      (
        ! window
          .confirm( `Aucun plan n'est sélectionné.\nVoulez-vous démasquer le premier plan masqué?` )
      )
      {
        return
      }
      //->
      let unmasked_e =
        document
          .querySelector( `#{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_items > li[data-layer_b="0"]` )

      if
      (
        unmasked_e
      )
      {
        const layer_n =
          unmasked_e
            .dataset
              .layer_n
    
        for
        (
          node_e
          of
          Array
            .from
            (
              document
                .querySelectorAll( `[data-layer_n="${layer_n}"]` )
            )
        )
        {
          PAI_o
            .unmask__v( node_e )
        }
  
        if
        (
          PAI_o
            .layer__n()
          >
          2      //: layer_0 doesn't count
        )
        {
          PAI_o
            .displayOp__v( true )
        }
      }

      return layer_n
    }
    //-->
    if
    (
      PAI_o
        .operable__a()
          .length
      -
      selected_a
        .length
      <
      3      //: 2 operable + layer_0 (not operable)
    )
    {
      PAI_o
        .displayOp__v( false )
    }

    for
    (
      selected_e
      of
      selected_a
    )
    {
      const layer_n =
        selected_e
          .dataset
            .layer_n
  
      for
      (
        node_e
        of
        Array
          .from
          (
            document
              .querySelectorAll( `[data-layer_n="${layer_n}"]` )
          )
      )
      {
        PAI_o
          .mask__v( node_e )
      }
    }
  }
  ,
  

  
  setop__v:
  (
    click_o
  ) =>
  {
    const id_s =
      click_o
        .target
          .closest( `input` )
            ?.id

    if
    (
      id_s
    )
    {
      const op_s =
        id_s
          .slice
          (
            id_s
              .lastIndexOf( '_' )
            +
            1      //: skip '_'
          )

      if
      (
        op_s
        &&
        op_s
        !==
        'none'    //: do nothing for non operation (only deselect selected operation)
      )
      {
        const operateOn_a =
          PAI_o
            .operateOn__a()

        if
        (
          operateOn_a
            .length      //: empty if no selection
          <
          2
        )
        {
          return(
            window
              .alert( `Deux plans doivent être sélectionnés pour effectuer cette opération.` )
          )
        }
        //-->

        let layerOne_s =
          PAI_o
            .layerIndex__s
            (
              operateOn_a
                [ 0 ]
                  .dataset
                    .layer_n
            )


        let layerTwo_s =
          PAI_o
            .layerIndex__s
            (
              operateOn_a
                [ 1 ]
                  .dataset
                    .layer_n
            )

        let label_s =
          op_s
          ===
          'union'
          ?
            '{{C_o.NAV_LEGEND_o.layers_union.legend_s}}'
          :
            op_s
            ===
            'difference'
            ?
              '{{C_o.NAV_LEGEND_o.layers_difference.legend_s}}'
            :
              op_s
              ===
               'intersection'
              ?
                '{{C_o.NAV_LEGEND_o.layers_intersection.legend_s}}'
              :
                '{{C_o.NAV_LEGEND_o.layers_complement.legend_s}}'

        const layer_n =
          PAI_o
            .addLayer__n
            (
              op_s,
              `${label_s} [ ${layerOne_s} &#8728; ${layerTwo_s} ]`
            )

        if
        (
          layer_n
        )
        {
          PAI_o
            [ `${op_s}__v` ]
            (
              layer_n,
              operateOn_a
            )
        }

      }
    }
  }
  ,



  selected__a:
  () =>
    Array
      .from
      (
        document
          .querySelectorAll( `#{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_items > li[data-layer_n]:not([data-layer_b="0"]) > input:checked` )
      )
  ,
  
  
  
  operable__a:
  () =>
    Array
      .from
      (
        document
          .querySelectorAll( `#{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_items > li[data-layer_n]:not([data-layer_b="0"])` )
      )
  ,
  


  operateOn__a:
  () =>
    PAI_o
      .selected__a()
        .slice( -2 )
  ,

  
  
  masked__n:
  () =>
    Array
      .from
      (
        document
          .getElementById( '{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_items' )
            .querySelectorAll( 'li[data-layer_b="0"]' )
      )
      ?.length
  ,



  mask__v:
  (
    node_e
  ) =>
  {
    node_e
      .dataset
        .layer_b =
          0

    if
    (
      node_e
        .checked
    )
    {
      node_e
        .checked =
          false
    }
  }
  ,

  
  
  unmask__v:
  (
    node_e
  ) =>
  {
    node_e
      .removeAttribute( 'data-layer_b' )
  }
  ,

  
  
  displayOp__v:
  (
    display_b
  ) =>
    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[2]}}_setop_display`,
        display_b
        ?
          'block'
        :
          'none'
      )
  ,



  none__v:
  (
    layer_n,
    operated_a
  ) =>
  {
      ;console.log( 'none__v' )
  }
  ,



  union__v:
  (
    layer_n,
    operated_a
  ) =>
  {
      ;console.log( 'union__v' )
  }
  ,



  difference__v:
  (
    layer_n,
    operated_a
  ) =>
  {
    ;console.log( 'difference__v' )

  }
  ,



  intersection__v:
  (
    layer_n,
    operated_a
  ) =>
  {
    ;console.log( 'intersection__v' )

  }
  ,



  complement__v:
  (
    layer_n,
    operated_a
  ) =>
  {
    ;console.log( 'complement__v' )

  }
  ,



  range__v:
  (
    range_e,
    callback_f
  ) =>
  {
    const value_s =
      range_e
        .value
  
    range_e
      .dataset
        .tip =
          value_s
  
    const
    [
      ,
      ,
      sub_s,
      range_s
    ] =
      range_e
        .id
          .split( '_' )
  
    callback_f
    &&
    callback_f
    (
      sub_s,
      range_s,
      value_s
    )
  }
  ,



  rangeEvent__v:
  (
    event_o
  ) =>
  {
    PAI_o
      .range__v
      (
        event_o
          .target,
        (
          sub_s,
          range_s,
          value_s
        ) =>
          {
            PAI_o
              [ `${sub_s}_o` ]
                [ `${range_s}_n` ] =
                  +value_s      //: number cast

            DOM_o
              .rootVar__v
              (
                `--{{C_o.STAT_a[2]}}_${range_s}`,
                +value_s
              )
          }
      )
  }
  ,



  hslPoint__v:
  (
    click_o
  ) =>
  {
    const selected_a =
      PAI_o
        .selected__a()

    if
    (
      ! selected_a
        .length    //: no selection
    )
    {
      window
        .alert( `Aucun plan n'est sélectionné.` )
      return
    }
    //-->

    const layer_n =
      selected_a
        [ selected_a.length -1 ]
          .dataset
            .layer_n         //;console.log( layer_n )

    //?? const canvas_e =
    //??   document
    //??     .querySelector( `canvas[data-layer_n="${layer_n}"]` )        // ;console.log( canvas_e )

    const
    {
      offsetX,
      offsetY
    } =
      click_o

    const
    [
      ,
      ,
      hsl_s
    ] =
      click_o
        .target
          .id
            .split( '_' )
      
    const atX_n =
      ~~( +offsetX      //: number cast
      /
      PAI_o
        .SCALE_H_n
      )
      
    const atY_n =
      ~~( +offsetY      //: number cast
      /
      PAI_o
        .SCALE_V_n
      )

    PAI_o
      .worker_o
        .post__v
        (
          { 
            task_s:   'PUT_hsl',
            stat_s:   '{{C_o.STAT_a[2]}}',
            layer_n:  layer_n,
            hsl_s:    hsl_s,
            rangeX_n: PAI_o
                       [ `${hsl_s}_o` ]
                         .rangeX_n,
            atX_n:    atX_n,
            rangeY_n: PAI_o
                        [ `${hsl_s}_o` ]
                          .rangeY_n,
            atY_n:    atY_n,
          }
        )

    const maxRange_n =
      hsl_s
      ===
      'hue'
      ?
        360
      :
        100

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[2]}}_${hsl_s}_trace`,
        ( maxRange_n
          -
          atY_n
        )
        *
        -2      //: 2px line
      )

      document
        .getElementById( `output_{{C_o.STAT_a[2]}}_${hsl_s}` )
          .value =
            atY_n
  }
  ,



  listener__v
  ()
  {
    //=== CANVAS + SLIDERS ===
    for
    (
      let sub_s
      of
      [
        'hue',
        'sat',
        'lum',
      ]
    )
    {
      for
      (
        let range_s
        of
        [
          'rangeX_n',
          'rangeY_n'
        ]
      )
      {
        for
        (
          let event_s
          of
          [
            'click',
            'keydown'
          ]
        )
        {
          DOM_o
            .listener__v
            (
              `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_${sub_s}_${range_s}`,
              PAI_o
                .rangeEvent__v,
              event_s
            )
        }
      }

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_${sub_s}_front`,
          PAI_o
            .hslPoint__v
        )
    }

    //=== GEOMETRY ===
    for
    (
      let range_s
      of
      [
        'perspective',
        'distance',
        'rotate',
        'scale',
      ]
    )
    {
      for
      (
        let event_s
        of
        [
          'click',
          'keydown'
        ]
      )
      {
        DOM_o
          .listener__v
          (
            `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_view_${range_s}`,
            PAI_o
              .rangeEvent__v,
            event_s
          )
      }
    }

    //=== ADD + HIDE ===
    for
    (
      let action_s
      of
      [
        'add',
        'hide'
      ]
    )
    {
      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[2]}}_layer_${action_s}`,
          PAI_o
            [ `${action_s}Layer__n` ]
        )
    }
    
    //=== SET OPERATIONS ===
    DOM_o
      .listener__v
      (
        '{{C_o.UL_ID_s}}_{{C_o.STAT_a[2]}}_layer_setop',
        PAI_o
          .setop__v
      )

  }
  ,



  init__v
  ()
  {
    const canvas_a =
      [
        'hue_back',
        'hue_front',
        'sat_back',
        'sat_front',
        'lum_back',
        'lum_front'
      ]

    PAI_o
      .worker_o =
        STAT_o
          .worker__o
            (
              '{{C_o.STAT_a[2]}}',
              canvas_a,
              'Painter',
              PAI_o
                .message__v,
            )

    PAI_o
      .addLayer__n()    //: reference work
      
    PAI_o
      .addLayer__n()    //: playground
    
    for    //: worker draw sliders initial state
    (
      let canvas_s
      of
      canvas_a
    )
    {
      PAI_o
        .worker_o
          .post__v
          (
            { 
              task_s: 'PUT_draw',
              stat_s: '{{C_o.STAT_a[2]}}',
              part_s: canvas_s,
              hue_n:  +DOM_o.rootVar__s( '--{{C_o.STAT_a[2]}}_sat_hue' )
            }
          )
    }

    //;console.log( DOM_o.rootVar__s( '--{{C_o.STAT_a[2]}}_sat_hue' ) )

    PAI_o
      .listener__v()
  }

}



PAI_o
  .init__v()
