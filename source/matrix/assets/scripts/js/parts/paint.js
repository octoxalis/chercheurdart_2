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
    operation_='',    //: undefined (from init__v) || event_o (from LA_paint_layer_add listener) || operation_s
    label_s='',       //: for operation only
    layer_a           //: idem
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

    const operation_s =
      typeof operation_
      ===
      String
      ?
        operation_
      :
        ''
    
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
  
      let checked_s = ''

      let layer_s = ''  //: operand layer_n

      if
      (
        label_s          //: operation label
      )
      {        
        checked_s =
        ` checked`

        layer_s =
          ` data_layer_s="${layer_a.join( ' ' )}"`
      }
        
        input_s =
        `<input id="${id_s}" data-layer_n="${layer_n}"${layer_s} type="checkbox"${checked_s}>`
  
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

    const legend_s =
      layer_n
      ?
        layer_n
      :
        '{{C_o.NAV_LEGEND_o.layer_initial.legend_s}}'

    let fragment_s =
      `<div id={{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}`
      + ` data-layer_n=${layer_n}>`
      + `<canvas`
      + ` id={{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}`
      + ` width=${width_s} height=${height_s}`
      + ` data-layer_n=${layer_n}`
      + ` data-size_n=1`
      + ` title="{{C_o.NAV_LEGEND_o.layer_s.legend_s}} ${legend_s}">`
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
        'script_{{C_o.STAT_a[2]}}'
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

    PAI_o
      .worker_o           //! using port postMessage directly
        .port_o           //! to avoid error:
          .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
          (
            {
              task_s:   'GET_img',
              rect_s:   `${centerX} ${centerY} ${width_s} ${height_s}`,
              scale_n:  1,
              url_s:    `/{{C_o.IMG_DIR_s}}${work_s}/full/max/0/color.jpeg`,  //: begining slash for site relative url
              canvas_e: offCanvas_e,
              storeBitmap_b: true,
              layer_n: layer_n,
              pixel_n:  window.devicePixelRatio,    //????
            },
            [ offCanvas_e ]
          )

    const div_e =
      document
        .getElementById( `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_${layer_n}` )

      div_e
        .lastChild        //: frontCanvas_e
          .addEventListener
          (
            'click',
            click_o =>
              PAI_o
                .canvasEvent__v
                (
                  click_o,
                  layer_n
                )
          )

      div_e
        .lastChild        //: frontCanvas_e
          .addEventListener
          (
            'wheel',
            wheel_o =>
              PAI_o
                .zoomEvent__v
                (
                  wheel_o,
                  layer_n
                )
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

    return layer_n
  }
  ,
  
  
  
  drawClip__v:
  (
    canvas_e,    //: frontCanvas_e
    layer_n
  ) =>
  {
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

    let clipContext_o =
      clipCanvas_e
        .getContext( '2d' )
  
    clipContext_o
      .strokeStyle =
        '{{S_o.selected_hi}}'
  
    clipContext_o
      .lineWidth =
        8
  
    const clip_a =
    [
      null,       //: to test not yet initialized
      0,
      0,
      0
    ]

    const clearRect_a =
    [
      0,
      0,
      clipCanvas_e
        .width,
      clipCanvas_e
        .height,
    ]

    canvas_e
      .classList
        .add( 'cursor_resize' )

    //?? const pointer_o =
    new Pointer
    (
      canvas_e,
      (
        atX_n,
        atY_n
      ) =>
      {
        if
        (
          clip_a[0]
          ===
          null
        )
        {
          clip_a[0] =
            ~~atX_n
  
          clip_a[1] =
            ~~atY_n
        }
  
        if
        (
          clip_a[2]      //:?? no width (=> no height): no need to clear?
        )
        {
          clipContext_o
            .clearRect( ...clearRect_a )
        }
  
        clip_a[2] =
          ~~atX_n
          -
          clip_a[0]
          
        clip_a[3] =
          ~~atY_n
          -
          clip_a[1]
  
        clipContext_o
          .strokeRect( ...clip_a )
      },
      () =>
      {
        let
        [
          left_n,
          top_n,
          width_n,
          height_n
        ] =
          clip_a

        if      //: drawn right-left way
        (
          width_n
          <
          0
        )
        {
          left_n +=
            width_n

          width_n =
            -width_n
        }

        if      //: drawn bottom_up way
        (
          height_n
          <
          0
        )
        {
          top_n +=
            height_n

          height_n =
            -height_n
        }

        PAI_o
          .layer_a
            [layer_n]
              .clipRect_a
                .push( clip_a )
    
        PAI_o
          .drawClipRect__v
          (
            canvas_e,
            layer_n
          )

        clipContext_o
          .clearRect( ...clearRect_a )  //: rease final rectangle stroke

        canvas_e
          .classList
            .remove( 'cursor_resize' )
      },
    )
  }
  ,



  drawClipRect__v:
  (
    canvas_e,
    layer_n
  ) =>
  {
    let context_o =
      canvas_e
        .getContext( '2d' )
  
    context_o
      .clearRect    //: wipe whole canvas
      (
        0,
        0,
        canvas_e
          .width,
        canvas_e
          .height,
      )

    const clipRect_a =
      PAI_o
        .layer_a
          [layer_n]
            .clipRect_a

    if
    (
      clipRect_a
        .length
    )
    {
      context_o
        .fillStyle =
          '{{S_o.selected_lo}}'
  
      context_o
        .fillRect
        (
          0,
          0,
          canvas_e
            .width,
          canvas_e
            .height,
        )
  
      for
      (
        clip_a
        of
        PAI_o
          .layer_a
            [layer_n]
              .clipRect_a
      )
      {
        context_o
          .clearRect( ...clip_a )
      }
    }
      
  }
  ,



  findClip__n:      //: click inside clipRect_a rectangle
  (
    click_o,
    layer_n
  ) =>
  {
    const
    {
      offsetX,
      offsetY
    } =
      click_o

    const clipRect_a =
      PAI_o
        .layer_a
          [ layer_n ]
            .clipRect_a
    
    if
    (
      ! clipRect_a
        .length
    )
    {
      return -1
    }
    //-->
    let clip_n = -1

    for    //: as Array.find + Array.findIndex
    (
      let clip_a
      of
      clipRect_a
    )
    {
      ++clip_n

      if
      (
        (             //: horizontal
          offsetX
          >
          clip_a[0]
          &&
          offsetX
          <
          (
            clip_a[0]
            +
            clip_a[2]
          )
        )
        &&
        (             //: vertical
          offsetY
          >
          clip_a[1]
          &&
          offsetY
          <
          (
            clip_a[1]
            +
            clip_a[3]
          )
        )
      )
      {
        return clip_n
      }
    }
    
    return -1
  }
  ,



  moveClip__v:
  (
    canvas_e,
    layer_n,
    clip_n
  ) =>
  {
    const clipCanvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[2]}}_layer_clip_${layer_n}` )
  
    const clearRect_a =
    [
      0,
      0,
      clipCanvas_e
        .width,
      clipCanvas_e
        .height,
    ]

    const clipContext_o =
      clipCanvas_e
        .getContext( '2d' )
  
    const clip_a =
      PAI_o
        .layer_a
          [layer_n]
            .clipRect_a
              [ clip_n ]

      clipContext_o                   //: redraw initial clip rectangle
        .strokeRect( ...clip_a )

    canvas_e
      .classList
        .add( 'cursor_move' )

    //?? const pointer_o =
    new Pointer
    (
      canvas_e,
      (            //: move_f
        atX_n,
        atY_n
      ) =>
      {
        clipContext_o
          .clearRect( ...clearRect_a )
  
        clip_a[0] =
          ~~atX_n
  
        clip_a[1] =
          ~~atY_n
          
        clipContext_o
          .strokeRect( ...clip_a )
      },
      () =>        //: stop_f
      {
        PAI_o
          .drawClipRect__v
          (
            canvas_e,
            layer_n
          )

        clipContext_o
          .clearRect( ...clearRect_a )  //: rease final rectangle stroke

        canvas_e
          .classList
            .remove( 'cursor_move' )
      },
    )
  }
  ,
  



  hideLayer__n:    //: returns unmasked layer index or -1
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

        return -1
      }
      //-->
      if
      (
        ! window
          .confirm( `Aucun plan n'est sélectionné.\nVoulez-vous démasquer le premier plan masqué?` )
      )
      {
        return -1
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

    return -1
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
        const operand_a =
          PAI_o
            .selectedOperand__a()

        if
        (
          operand_a
            .length      //: empty if no selection
          <
          2
        )
        {
          return (
            window
              .alert( `Pour effectuer cette opération, deux plans doivent être sélectionnés.` )
          )
        }
        //-->

        let layerOne_n =
          operand_a
            [ 0 ]
              .dataset
                .layer_n

        let layerOne_s =
          PAI_o
            .layerIndex__s( layerOne_n )

        let layerTwo_n =
          operand_a
            [ 1 ]
              .dataset
                .layer_n

        let layerTwo_s =
          PAI_o
            .layerIndex__s( layerTwo_n )


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

        //--const layer_n =
          PAI_o
            .addLayer__n
            (
              op_s,
              `${label_s} [ ${layerOne_s} &#8728; ${layerTwo_s} ]`,
              [
                layerOne_n,
                layerTwo_n
              ]
            )
      }
    }
  }
  ,



  selectedCanvas__a:  //: excluded: layer_0 + masked layers
  () =>
    Array
      .from
      (
        document
          .querySelectorAll( `div:not([data-layer_n="0"]):not([data-layer_b="0"]).raised` )
      )
  ,
  
  
  
  /*//!!! STANDBY !!!
  selectedLayerIndex__a:
  () =>
  {
    const layer_a = []

    for
    (
      let selected_o
      of
      PAI_o
        .selectedCanvas__a()
    )
    {
      layer_a
        .push
        (
          selected_o
            .dataset
              .layer_n
        )
    }

    ;;;;;;;;    console.log( layer_a )

    return layer_a
  }
  ,
  */
  
  
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
  


  selectedOperand__a:    //: select only the last layers to operate on: 2 operands ( + 1 result )
  (
    level_n=2
  ) =>
    PAI_o
      .selectedItem__a()
        .slice( -level_n )
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



  hslEvent__v:
  (
    click_o
  ) =>
  {
    let selected_a =
      PAI_o
        .selectedCanvas__a()

    if
    (
      ! selected_a
        .length    //: no selection
    )
    {
      selected_a =
        PAI_o
          .selectedOperand__a( 3 )    //: 2 operands + result
      if
      (
        ! selected_a
          .length    //: no selection
      )
      {
        return void (
          window
            .alert( `Aucun plan n'est sélectionné.` )
        )
      }
    }
    //-->
    //??const layer_n =
    //??  selected_a
    //??    [ selected_a.length -1 ]
    //??      .dataset
    //??        .layer_n

    const operation_s =
      document
        .querySelector( 'input[name="layer_set"]:checked' )
          ?.id
            ?.split( '_' )
              ?.[4]
  
    let operand_a = []

    for
    (
      let selected_o
      of
      selected_a
    )
    {
      const atLay_n =
        selected_o
          .dataset
            .layer_n

      operand_a
        .push
        (
          {
            layer_n: atLay_n,
            clipRect_a: PAI_o
                          .layer_a
                            [atLay_n]
                              .clipRect_a
          }
        )
    }

    let deviation_n = 0

    if
    (
      operation_s
      !==
      'none'
    )
    {
      deviation_n =
        document
          .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_layer_set_deviation' )
            .value
    
      if
      (
        operand_a
          .length
        >
        3
      )
      {
        operand_a =
          operand_a
            .slice( -3 )    //:!!! keep only 3 upper layers for operations: 2 compared + 1 result
  
        window
          .alert( `Plus de trois plans ont été sélectionés.\nSeuls les deux plans supérieurs sont pris en compte.` )
      }

    }
    
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
            task_s:      'PUT_hsl',
            stat_s:      '{{C_o.STAT_a[2]}}',
            operand_a:   operand_a,
            operation_s: operation_s,
            deviation_n: deviation_n,
            hsl_s:        hsl_s,
            rangeX_n:     PAI_o
                           [ `${hsl_s}_o` ]
                             .rangeX_n,
            atX_n:        atX_n,
            rangeY_n:     PAI_o
                            [ `${hsl_s}_o` ]
                              .rangeY_n,
            atY_n:        atY_n,
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




  canvasEvent__v:
  (
    click_o,
    layer_n
  ) =>
  {
    const canvas_e =
      click_o
        .target
        
    const clip_n =
      PAI_o
        .findClip__n
        (
          click_o,
          layer_n
        )

    if
    (
      layer_n        //: no clip for layer 0
    )
    {
      if
      (
        click_o
          .ctrlKey
      )
      {
        if
        (
          clip_n
          >
          -1
        )
        {      //: inside a clipping rectangle: remove it
          PAI_o
            .layer_a
              [ layer_n ]
                .clipRect_a
                  .splice
                  (
                    clip_n,
                    1
                  )
    
          PAI_o
            .drawClipRect__v
            (
              canvas_e,
              layer_n
            )
    
          return
        }
        //-->
        PAI_o      //: outside a clipping rectangle: add new clip
          .drawClip__v
          (
            canvas_e,
            layer_n
          )
    
        return
      }
      //-->
      if
      (
        clip_n
        >
        -1
        )
      {      //: inside a clipping rectangle: move it
        PAI_o
          .moveClip__v
          (
            canvas_e,
            layer_n,
            clip_n
          )
    
        return
      }
    }
    //-->    select canvas
    canvas_e
      .closest( 'div' )
        .classList
          .toggle( 'raised' )
  }
  ,



  zoomEvent__v:
  (
    wheel_o,
    layer_n
  ) =>
  {
    wheel_o
      .preventDefault()
     
    let scale_n =
      PAI_o
        .view_o
          .scale_n
          
    scale_n +=
      wheel_o
        .deltaY
      *
      -0.001
    

    scale_n =
      Math
        .min
        (
          Math
            .max
            (
              .125,
              scale_n
            ),
          2            //: restrict scale
        )

    PAI_o
      .view_o
        .scale_n =
          scale_n
    
    DOM_o
      .rootVar__v
      (
        wheel_o
          .altKey
        ?
          `--{{C_o.STAT_a[2]}}_scale`                       //: apply to all layers
        :
          `--{{C_o.STAT_a[2]}}_scale_layer_${layer_n}`,     //: apply to one layer
        scale_n
      )
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
            .hslEvent__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[2]}}_${hsl_s}_trace`,
          PAI_o
            .backColor__v
        )
  
    }

    //=== VIEW ===
    for      //: move nodes in fixed position
    (
      let id_s
      of
      [
        '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_settings',
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_settings',
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_view',
      ]
    )
    {
      DOM_o
        .beforeNode__e
        (
          document
            .getElementById( id_s ),
          'goto_page_top'
        )
    }

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
          'keydown',
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
    
    for    //=== worker draw sliders initial state
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
              hue_n:  +DOM_o.rootVar__s( '--{{C_o.STAT_a[2]}}_back_hue' )
            }
          )

      if      //=== paint brush
      (
        canvas_s
          .endsWith( '_back' )
      )
      {
        const atHsl_s =    //--> hue, sat, lum
          canvas_s
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
