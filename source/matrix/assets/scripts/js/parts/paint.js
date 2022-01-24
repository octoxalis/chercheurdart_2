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
    scale_n:      .25
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

    let fragment_s =
      `<div id={{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}`
      + ` data-layer_n=${layer_n}>`
      + `<canvas`
      + ` id={{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}`
      + ` width=${width_s} height=${height_s}`
      + ` data-layer_n=${layer_n}`
      + ` data-size_n=1`
      + ` title="{{C_o.NAV_LEGEND_o.layer_s.legend_s}} ${layer_n}">`
      + `</canvas>`

    if
    (
      layer_n
      >
      0
    )
    {
      fragment_s +=
        `<canvas`
        + ` id={{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_front_${layer_n}`
        + ` width=${width_s} height=${height_s}`
        + ` data-layer_n=${layer_n}`
        + ` data-size_n=1`
        + ` title="{{C_o.NAV_LEGEND_o.layer_s.legend_s}} ${layer_n}">`
        + `</canvas>`
    }

    fragment_s +=
      `</div>`

    DOM_o
      .fragment__e
      (
        fragment_s,
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_view'
      )

    const canvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}` )

    const offCanvas_e =
      canvas_e
        .transferControlToOffscreen()
  
    const centerX =
      +width_s      //: number cast
      *
      .5

    const centerY =
      +height_s      //: number cast
      *
      .5

    const workerMsg_o =
      {
        task_s:   'GET_img',
        rect_s:   `${centerX} ${centerY} ${width_s} ${height_s}`,
        scale_n:  1,
        url_s:    `/{{C_o.IMG_DIR_s}}${work_s}/full/max/0/color.jpeg`,  //: begining slash for site relative url
        canvas_e: offCanvas_e,
        storeBitmap_b: true,
        layer_n: layer_n,
        pixel_n:  window.devicePixelRatio,    //????
      }

    const workerMsg_a =
      [ offCanvas_e ]

    if
    (
      layer_n
      >
      0
    )
    {
      const canvasFront_e =
          document
            .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_front_${layer_n}` )
    
      const offCanvasFront_e =
          canvasFront_e
            .transferControlToOffscreen()

      workerMsg_o
        .canvasFront_e =
          offCanvasFront_e

      workerMsg_a
        .push( offCanvasFront_e )
    }

    PAI_o
      .worker_o           //! using port postMessage directly
        .port_o           //! to avoid error:
          .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
          (
            workerMsg_o,
            workerMsg_a
          )

    PAI_o
      .layer_a
        .push
        (
          {
            hue_o:          //: sliders state
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
            ,
            clipRect_a: []  //: clipping areas
          }
        )

    //const canvasFront_e =
    //  document
    //    .getElementById( `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}` )

    canvasFront_e
      .addEventListener
      (
        'click',
        event_o =>
        {
          event_o
            .target
              .closest( 'div' )
                .classList
                  .toggle( 'raised' )

          if
          (
            event_o
              .ctrlKey
          )
          {
            PAI_o
              .addClip__v
              (
                canvasFront_e,
                event_o
              )
          }
        }
      )

    return layer_n
  }
  ,
  
  

  addClip__v:
  (
    canvas_e
  ) =>
  {
  ;;;;;;;;    console.log( canvas_e )

    const layer_n =
       canvas_e
         .dataset
           .layer_n

  ;;;;;;;;    console.log( layer_n )
  
    const width_n =
      canvas_e
        .width
  
    const height_n =
      canvas_e
        .height
  
    
    let clipCanvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_clip_${layer_n}` )
  
    if
    (
      ! clipCanvas_e
    )
    {
      let fragment_s =
        `<canvas`
        + ` id={{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_clip_${layer_n}`
        + ` width=${width_n} height=${height_n}`
        + ` data-layer_n=${layer_n}>`
        + `</canvas>`
        
      DOM_o
        .fragment__e
        (
          fragment_s,
          canvas_e
            .id
        )
  
      clipCanvas_e =
        document
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_clip_${layer_n}` )
    }
  
    let context_o =
      clipCanvas_e
        .getContext( '2d' )
  
    contextFront_o
      .strokeStyle =
        'hsla( 190 80% 50% / .5 )'
  
    contextFront_o
      .lineWidth =
        4
  
    const clipRect_a = []
  
    const pointer_o =
      new PointerDrag
      (
        canvas_e,
        (
          atX_n,
          atY_n
        ) =>
        {
          if
          (
            ! clipRect_a[0]
          )
          {
            clipRect_a[0] =
              ~~atX_n
  
            clipRect_a[1] =
              ~~atY_n
  
            clipRect_a[2] =
              0
  
            clipRect_a[3] =
              0
          }
  
          context_o
            .clearRect( ...clipRect_a )
  
          clipRect_a[2] =
            ~~atX_n
            -
            clipRect_a[0]
            
          clipRect_a[3] =
            ~~atY_n
            -
            clipRect_a[1]
  
  
          context_o
            .strokeRect( ...clipRect_a )
        },
        () =>
        {
          ;;;;;;;;    console.log( 'STOP' )
        },
  
                
      )
  
  }
  ,



  clipMove__v:
  (
    move_o
  ) =>
  {
    console.log(
      move_o
        .offsetX
      + ' / '
      +
      move_o
        .offsetY
    )
  }
  ,



  hideLayer__n:
  () =>
  {
    const selected_a =
      PAI_o
        .selectedItem__a()

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

      return layer_n
      }
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
        if
        (
          op_s
          ===
          'deviation'
        )
        {
          click_o
            .target
              .dataset
                .tip =
                  click_o
                    .target
                      .value

            return
        }
        //-->
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
          return (
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



  selectedLayer__a:  //: excluded: layer_0 + masked layers
  () =>
    Array
      .from
      (
        document
          .querySelectorAll( `div:not([data-layer_n="0"]):not([data-layer_b="0"]).raised` )
      )
  ,
  
  
  
  selectedItem__a:
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
      .selectedItem__a()
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
      hsl_s,
      range_s
    ] =
      range_e
        .id
          .split( '_' )
  
    callback_f
    &&
    callback_f
    (
      hsl_s,
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
          hsl_s,
          range_s,
          value_s
        ) =>
          {
            PAI_o
              [ `${hsl_s}_o` ]
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
        .selectedLayer__a()

    if
    (
      ! selected_a
        .length    //: no selection
    )
    {
      window
        .alert( `Aucune image n'est sélectionnée.` )
      return
    }
    //-->

    const layer_n =
      selected_a
        [ selected_a.length -1 ]
          .dataset
            .layer_n

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




  backColor__v:
  (
    click_o
  ) =>
  {
    click_o
      .preventDefault()

    const label_e =
      click_o
        .target
          .closest( `label` )

    if
    (
      label_e
    )
    {
      const hsl_s =
        label_e
          .id
            .split( '_' )
              [2]
    
      const value_s =
        document
          .querySelector( `label[id$="${hsl_s}_trace"] > output` )
            .value
    
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[2]}}_back_${hsl_s}`,
          +value_s
        )

      if
      (
        hsl_s
        ===
        'hue'
      )
      {
        PAI_o
          .worker_o
            .post__v
            (
              { 
                task_s: 'PUT_draw',
                stat_s: '{{C_o.STAT_a[2]}}',
                part_s: 'sat_front',
                hue_n:  +DOM_o.rootVar__s( '--{{C_o.STAT_a[2]}}_back_hue' )
              }
            )
      }
    }
  }
  ,



  listener__v
  ()
  {
    //=== CANVAS + SLIDERS ===
    for
    (
      let hsl_s
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
              `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_${hsl_s}_${range_s}`,
              PAI_o
                .rangeEvent__v,
              event_s
            )
        }
      }

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_${hsl_s}_front`,
          PAI_o
            .hslPoint__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[2]}}_${hsl_s}_trace`,
          PAI_o
            .backColor__v
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
    const hsl_a =
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
              hsl_a,
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
      let hsl_s
      of
      hsl_a
    )
    {
      PAI_o
        .worker_o
          .post__v
          (
            { 
              task_s: 'PUT_draw',
              stat_s: '{{C_o.STAT_a[2]}}',
              part_s: hsl_s,
              hue_n:  +DOM_o.rootVar__s( '--{{C_o.STAT_a[2]}}_back_hue' )
            }
          )

      //=== paint brush
      if
      (
        hsl_s
          .endsWith( '_back' )
      )
      {
        const atHsl_s =    //--> hue, sat, lum
          hsl_s
            .slice
            (
              0,
              -'_back'
                .length
            )
        
        const maxRange_n =
          atHsl_s
          ===
          'hue'
          ?
            360
          :
            100
    
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[2]}}_${atHsl_s}_trace`,
            ( 
              maxRange_n
              -
              document
                .getElementById( `output_{{C_o.STAT_a[2]}}_${atHsl_s}` )
                  .value
            )
            *
            -2      //: 2px line
          )
      }
    }

    PAI_o
      .listener__v()
  }

}



PAI_o
  .init__v()
