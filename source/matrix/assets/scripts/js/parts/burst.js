// === burst.js ===

const BUR_o =
{
  work_s:
    document
      .querySelector( 'body' )
        .dataset
          .work_s
  ,
  SCALE_V_n: 2
  ,
  canvasWidth_n: 0   //: init in screen__v
  ,
  freeze_b: false    //: freeze || unfreeze hue selection
  ,
  hue_n: 0           //: selected hue
  ,
  status_o: null
  ,
  trace_o: {}
  ,
  hue_o:
    {
      rangeY_n: 60,    //: C_o.BURST_RANGE_n
      shift_n: 0,      //: from burst_hue_back
    }
  ,
  scale_o:
    {
      hue_n: 1,     //: C_o.BURST_SCALE_n
      sat_n: .5,
      lum_n: .5,
    }
  ,
  thresh_o:
    {
      hi_n: 100,    //: C_o.BURST_THRESH_HI_n   left to right
      lo_n: 0,      //: C_o.BURST_THRESH_LO_n
    }
  ,
  plots_a: null
  ,
  atPlot_o: null
  ,
  atAngle_n: 0
  ,


  message__v
  (
    payload_o
  )
  {
    switch
    (
      payload_o
        .task_s
    )
    {
      case 'PUT_frequency':
        BUR_o
          .put_frequency__v( payload_o )

        break
    
      case 'PUT_plots':
        BUR_o
          .plots_a =
            payload_o
              .plots_a

        break

      case 'PUT_canvas_img':
        BUR_o
          .put_canvas_img__v( payload_o )

        break
    
      case 'PUT_status':
        BUR_o
          .status_o =
            payload_o
              .status_o      //: { stat_s, task_s, status_o }
      
        break
    
      case 'PUT_error':
        console.log( `ERROR: ${payload_o.error_s}` ) //... TODO: load error page ...
        
        break
    
      default:
        break
    }
  }
  ,


  async saveFile__o
  (
    blob_o,
    name_s     //: file name
  )
  {
    try
    {
      const handle_o =
        await window
          .showSaveFilePicker
          (
            {
              suggestedName: name_s
              ,
              types:
                [
                  {
                    accept:
                      {
                        'image/jpg':
                          [
                            '.jpg'
                          ]
                      }
                      ,
                  }
                ]
              ,
            }
          )

      const writable =
        await handle_o
                .createWritable()

      await writable
              .write( blob_o )

      await writable
              .close()

      return handle_o
    }
    catch
    (
      error_o
    )
    {
      console
        .error_o
        (
          error_o
            .name
          ,
          error_o
            .message
        )
    }
  }
  ,



  put_frequency__v
  (
    payload_o
  )
  {
    const
      {
        hsl_s
        ,
        frequency_n
        ,
        range_a
        ,
        capacity_n
        ,
        plots_a
      } =
        payload_o

    BUR_o
      .atPlot_o =
        plots_a

    let html_s =
      range_a[0]

    if
    (
      range_a
        .length
      >
      1
    )
    {
      html_s +=
        `<b class=range-separator>{{C_o.RANGE_GAP_s}}</b>${range_a[1]}`
    }

    BUR_o
      .trace_o
        [`${hsl_s}_e`]
          .innerHTML =
            html_s

    const ratio_n =
      (
        frequency_n
        /
        capacity_n
      )
      *
      100

    BUR_o
      .trace_o
        [ `${hsl_s}_ratio_e` ]
          .innerHTML =
            new Intl
              .NumberFormat
              (
                'fr-FR', 
              )
              .format
              (
                Number
                  .parseFloat( ratio_n )
                  .toFixed( 3 )
              )
  }
  ,



  async put_canvas_img__v
  (
    payload_o
  )
  {
    const
      {
        blob_o
      } =
        payload_o

    const work_s =
      BUR_o
        .work_s

    BUR_o
      .saveFile__o
      (
        blob_o
        ,
        `${work_s}.jpg`
      )
  }
  ,



  get_frequency__v
  (
    event_o,
    hsl_s
  )
  {
    const range_n =
      BUR_o
        .range__n
        (
          hsl_s
        )

    const angle_n =
      BUR_o
        .angle__n
        (
          event_o,
          range_n
        )

    BUR_o
      .atAngle_n =
        angle_n

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'GET_frequency'
            ,
            stat_s: '{{C_o.STAT_a[0]}}'
            ,
            hsl_s:  hsl_s
            ,
            angle_n: angle_n
            ,
            range_n: range_n
          }
        )
  }
  ,



  get_img
  ()
  {
    let work_s =
      BUR_o
        .work_s

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

    const canvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )

    canvas_e
      .width =
        +width_s

    canvas_e
      .height =
        +height_s

    const offCanvas_e =
      canvas_e
        .transferControlToOffscreen()
  
    const centerX =
      +width_s      //: Number cast
      *
      .5
    
    const centerY =
      +height_s      //: Number cast
      *
      .5

    BUR_o
      .worker_o           //! using port postMessage directly
        .port_o           //! to avoid error:
          .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
          (
            {
              task_s:   'GET_img'
              ,
              stat_s: '{{C_o.STAT_a[0]}}'
              ,
              rect_s:   `${centerX} ${centerY} ${width_s} ${height_s}`
              ,
              scale_n:  1
              ,
              url_s:    `/{{C_o.IMG_DIR_s}}${work_s}/full/max/0/color.jpeg`  //: begining slash for site relative url
              ,
              canvas_e: offCanvas_e
              ,
              storeBitmap_b: false
              ,
              //XX layer_n: layer_n,
              pixel_n:  window.devicePixelRatio    //????
              ,
            },
            [ offCanvas_e ]
          )

  }
  ,


  screen__v 
  ()
  {
    const width_n =
      +screen      // Number cast
        .availWidth
      
    const height_n =
      +screen      // Number cast
        .availHeight
      
    let screenDim_n =
        width_n
        >
        height_n
        ?               //: vmin
          height_n
        :
          width_n

    screenDim_n =
      (
        screenDim_n
        //?? *
        //?? 1       //: C_o.SCREEN_RATIO_n
      )
      -
      64      //: S_o.NAV_HEIGHT_s * 2

    BUR_o
      .canvasWidth_n =
        screenDim_n
        
    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_screen_dim`,
        screenDim_n
      )

    for
    (
    canvas_s
    of
    [
      'hue',
      'sat',
      'lum',
    ]
    )
    {
      let canvas_e =
        document
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${canvas_s}` )

      if
      (
        canvas_e
      )
      {
        canvas_e
          .width =
            screenDim_n
            
        canvas_e
          .height =
            screenDim_n
      }
    }
  }
  ,



  bgHsl__s
  ()
  {
    const hue_s =
      DOM_o
        .rootVar__s( `--{{C_o.STAT_a[0]}}_img_bg_hue` )

    const sat_s =
      DOM_o
        .rootVar__s( `--{{C_o.STAT_a[0]}}_img_bg_sat` )

    const lum_s =
      DOM_o
        .rootVar__s( `--{{C_o.STAT_a[0]}}_img_bg_lum` )

    return `hsl( ${hue_s} ${sat_s}% ${lum_s}% /1)`
  }
  ,



  hsl__s
  ()
  {
    return (
      document
        ?.querySelector( `input[name="burst_nav"]:checked` )
          ?.id
            .slice( -3 )         //: element ID ends with: 'hue' || 'sat' || 'lum'
    )
  }
  ,



  coord__a
  (
    event_o,
    hsl_s
  )
  {
    const center_n =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}` )    //: all canvases (hue, sat, lum) have same size
          .width
      *
      .5      //: width / 2
      //??*
      //??window
      //??  .devicePixelRatio

    const x_n =
      event_o
        .offsetX
      //??*
      //??window
      //??  .devicePixelRatio
      -
      center_n
  
     const y_n =
      event_o
        .offsetY
      //??*
      //??window
      //??  .devicePixelRatio
      -
      center_n
      
    return (
      [
        x_n,
        y_n
      ]
    )
  }
  ,




  angle__n    //: in range [0...359]
  (
    event_o,
    range_n    //: 360 || 101 i.e. hue || sat or lum
  )
  {
    const center_n =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue` )    //: all canvases (hue, sat, lum) have same size
          .width
      *
      .5      //: width / 2
      //??*
      //??window
      //??  .devicePixelRatio

    const x_n =
      event_o
        .offsetX
      //??*
      //??window
      //??  .devicePixelRatio
      -
      center_n
  
     const y_n =
      event_o
        .offsetY
      //??*
      //??window
      //??  .devicePixelRatio
      -
      center_n      

    let angle_n =
      ~~(
        Math
          .atan2
          (
            y_n,
            x_n
          )
        *
        180
        /
        Math
          .PI
      )

    angle_n =
      ~~(
        (
          (
            angle_n
            +
            450      //: 90 (rotation to have hue 0 at 12:00 not 3:00) + 360 (angle_n < 0)
          )
          %
          360    //: range [0...359]
        )
        /
        360
        *
        range_n
      )

    if
    (
      range_n
      ===
      360
    )
    {
      angle_n =
        (
          angle_n
          +
          BUR_o
           .hue_o
             .shift_n
        )
        %
        360
    }

    return angle_n
  }
  ,


  range__n
  (
    hsl_s
  )
  {
    let range_n =
      hsl_s
      ===
      'hue'
      ?
        360
      :
        101

    if
    (
      range_n
      ===
      360
    )
    {
      let label_e =
        document
          .querySelector( `li:has(input[name="{{C_o.STAT_a[0]}}_hue_range"]:checked)` )

      if
      (
        label_e
      )
      {
        range_n =        //: 360, 120...101..6, 3, 1
        360
        /
        +label_e              //: Number cast
          .dataset
            .range_n        //: 1, 3, 6...180
      }
    }
                            //=> range_n = 360, 120...101..6, 3, 2  (1 excluded)
    return range_n
  }
  ,



  draw__v
  ()
  {
    for    //=== worker draw sliders initial state
    (
      let hsl_s
      of
      [
        'hue_back',
        'hue_front',
      ]
    )
    {
      BUR_o
        .worker_o
          .post__v
          (
            { 
              task_s: 'PUT_draw'
              ,
              stat_s: '{{C_o.STAT_a[0]}}'
              ,
              hsl_s: hsl_s
              ,
              back_hue_n: +DOM_o
                            .rootVar__s( '--{{C_o.STAT_a[0]}}_hue_back' )
              ,
              rangeY_n: +BUR_o
                          .hue_o
                            .rangeY_n
              ,
              shift_n: BUR_o
                        .hue_o
                          .shift_n
              ,
              thresh_o: BUR_o
                          .thresh_o
              //??? ,
              //??? maxpos_n: BUR_o
              //???            .scale_o
              //???              .hue_n
              //??? ,
            }
          )
    }
  }
  ,



  pick__v
  (
    opacity_n,     //: optional
    angle_n,       //: optional
    hsl_s='hue',   //: optional
  )
  {
    if
    (
      opacity_n
      ===
      undefined
    )
    {
      const input_e =
        document
          .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_bg_opacity` )
                
      opacity_n =
              ~~(
                (
                  +input_e            //: Number cast
                    .value
                  /
                  100
                )
                *
                255      //: [0...255]
              )
    }

    if
    (
      angle_n
      ===
      undefined
    )
    {
      angle_n =
        BUR_o
          .atAngle_n
    }
    
    const canvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'PUT_pick'
            ,
            stat_s: '{{C_o.STAT_a[0]}}'
            ,
            hsl_s: hsl_s
            ,
            angle_n: angle_n
            ,
            range_n:
              angle_n
              ===
              360      //: reset
              ?
                0
              :
                BUR_o
                  .range__n
                  (
                    hsl_s
                  )
            ,
            opacity_n: opacity_n
            ,
            dim_a:
            [
              canvas_e
                .width
              ,
              canvas_e
                .height
            ]
            ,

         }
        )

  }
  ,



  trace__v
  (
    event_o,
    hsl_s
  )
  {
    BUR_o
      .freeze_b =    //: toggle freeze_b
        ! BUR_o
            .freeze_b

    let color_s
    let pointer_s

    if
    (
      BUR_o
        .freeze_b
    )
    {
      color_s =
        '{{S_o.bg_higher}}'

      pointer_s =
        'cell'
    }
    else
    {
      color_s =
        '{{S_o.bg_lower}}'

      pointer_s =
        'crosshair'
    }

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_trace_color`,
        color_s
      )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_trace_pointer`,
        pointer_s
      )

    let item_e =
      document
        .querySelector( `li:has(input[name="{{C_o.STAT_a[0]}}_hue_range"]:checked)` )

    if
    (
      item_e
      &&
      +item_e              //: Number cast
        .dataset
          .range_n 
      ===
      1                  //: not for hue ranges
    )
    {
      for
      (
        let hsl_s
        of
        [
          'sat',
          'lum'
        ]
      )
      {
        BUR_o
          .worker_o
            .post__v
            (
              { 
                task_s: 'PUT_draw'
                ,
                stat_s: '{{C_o.STAT_a[0]}}'
                ,
                hsl_s: hsl_s
                ,
                back_hue_n:
                  +(BUR_o            //: Number cast
                      .trace_o
                        .hue_e
                          .innerHTML
                  )
                ,
                shift_n: BUR_o
                          .hue_o
                            .shift_n
                ,
                thresh_o: BUR_o
                            .thresh_o
                //???,
                //??? maxpos_n: BUR_o
                //???             .scale_o
                //???               [`${hsl_s}_n`]
                //??? ,
              }
            )
      }
    }

    BUR_o
      .pick__v()
  }
  ,



  range__v
  (
    range_e,
    callback_f
  )
  {
    const value_s =
      range_e
        .value
  
    range_e
      .dataset
        .tip =
          value_s
  
    callback_f
    &&
    callback_f
    (
      range_e
        .id,
      value_s
    )
  }
  ,



  eventRange__v        //: scale, threshold sliders
  (
    event_o
  )
  {
    BUR_o
      .range__v
      (
        event_o
          .target,
        (
          range_s,    //: id
          value_s
        ) =>
          {
            const hsl_s =
              BUR_o
                .hsl__s()

            switch
            (
              true
            )
            {
              case range_s
                    .includes( 'scale' ) :

                BUR_o
                  .scale_o
                    [ `${hsl_s}_n` ] =
                      +value_s      //: Number cast

                DOM_o
                  .rootVar__v
                  (
                    `--{{C_o.STAT_a[0]}}_scale`
                    ,
                    value_s
                  )

    
                BUR_o
                  .worker_o
                    .post__v
                    (
                      { 
                        task_s:  'PUT_scale'
                        ,
                        stat_s:  '{{C_o.STAT_a[0]}}'
                        ,
                        hsl_s:  hsl_s
                        ,
                        scale_n: BUR_o
                                   .scale_o
                                     [`${hsl_s}_n`]
                        ,
                        burst_b: true    //:  redraw
                      }
                    )

                DOM_o
                  .rootVar__v
                  (
                    `--{{C_o.STAT_a[0]}}_plots`
                    ,
                    'none'
                  )

                break

              case range_s
                     .includes( 'thresh' ) :

                let range_n =
                  +event_o    //: Number cast
                    .target
                      .value

                let atRange_s

                if
                (
                  range_s
                    .endsWith( 'hi' )   //: left to right slider
                )
                {
                  atRange_s = 'hi'
                    
                  range_n =
                    100
                    -
                    range_n
                }
                else
                {
                  atRange_s = 'lo'
                }

                BUR_o
                   .thresh_o
                    [ `${atRange_s}_n` ] =
                    range_n

                if
                (
                  (
                    BUR_o
                       .thresh_o
                         .hi_n
                    <=
                    BUR_o
                       .thresh_o
                         .lo_n
                  )
                )
                {
                  return void alert( 'Les seuils haut et bas se croisent' )
                }

                BUR_o
                  .draw__v()

                break

              default:    //: hue_img_bg_opacity + reserve other cases
                break
            }

          }
      )
  }
  ,



  eventItem__v        //: hue range list
  (
    event_o
  )
  {
    const item_e =
      event_o
        .target
          .closest( `li` )

    if
    (
      item_e
    )
    {
      BUR_o
        .hue_o
          .rangeY_n =
            +item_e             //: Number cast
              .dataset
                .range_n

      BUR_o
        .draw__v()
    }

  }
  ,



  eventShift__v       //: hue start set
  (
    click_o
  )
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
    
      let shift_n =
        +document             //: Number cast
          .getElementById( `output_{{C_o.STAT_a[0]}}_${hsl_s}` )
            .value

      const back_n =    //: active shift
        +DOM_o
          .rootVar__s
          (
            `--{{C_o.STAT_a[0]}}_${hsl_s}_back`
          )

      if
      (
        shift_n
        <
        back_n
      )
      {
        shift_n =
          (
            shift_n
            +
            360
          )
          %
          360
      }

      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_${hsl_s}_back`,
          shift_n
        )
  
    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
        -(       //: negative value for css position
          360
          *
          BUR_o
            .SCALE_V_n
        )
      )

      BUR_o
        .hue_o
          .shift_n =
            shift_n

      BUR_o
        .draw__v()

      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_img_hue`
          ,
          shift_n
        )
    }
  }
  ,


  eventHsl__v        //: hue start trace
  (
    event_o
  )
  {
    const
    [
      ,
      ,
      hsl_s
    ] =
      event_o
        .target
          .id
            .split( '_' )

    const
    {
      offsetX,
      offsetY
    } =
      event_o
    
    const offsetY_n =
      +offsetY            //: Number cast

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
        -(       //: negative value for css position
          360
          *
          BUR_o
            .SCALE_V_n
          -
          offsetY_n
        )
      )

    const shift_n =
      (
        ~~(
            offsetY_n
            /
            BUR_o
              .SCALE_V_n
          )
        +
        BUR_o
          .hue_o
            .shift_n
      )
      %
      360

    document
      .getElementById( `output_{{C_o.STAT_a[0]}}_${hsl_s}` )
        .value =
          shift_n
  }
  ,



  eventTrace__v      //: hue, sat, lum trace
  (
      event_o
  )
  {
    const hsl_s =
      BUR_o
        .hsl__s()

    if
    (
      ! BUR_o
        .freeze_b
      ||
      hsl_s
      !==
      'hue'
    )
    {
      BUR_o
        .get_frequency__v
        (
          event_o,
          hsl_s
        )

      if
      (
        event_o
          .type
        ===
        'click'
        &&
        event_o
          .ctrlKey
      )
      {
        BUR_o
          .eventtPlots__v
          (
            event_o,
            hsl_s
          )
      }
    }
    
    if
    (
      event_o
        .type
      ===
      'click'
      &&
      hsl_s
      ===
      'hue'
    )
    {
      BUR_o
        .trace__v
        (
          event_o
          ,
          hsl_s
        )
    }
  }
  ,



  eventtPlots__v
  (
      event_o,
      hsl_s
  )
  {
    if     //: must check if atPlot_o is null
    (
      BUR_o
        .atPlot_o
    )
    {
      let
        {
          startX_n
          ,
          startY_n
        } =
          BUR_o
            .atPlot_o
          
      startX_n -=
        BUR_o
          .canvasWidth_n
        *
        .5
  
      startY_n -=
        BUR_o
          .canvasWidth_n
        *
        .5

      const radius_n =
        Math
          .sqrt
          (
            startX_n
            *
            startX_n
            +
            startY_n
            *
            startY_n
          )
          *
          2
          
      let display_s =
        radius_n
        <
        .1
        ?
          'none'
        :
          'block'
  
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_plots`,
          display_s
        )
  
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_plots_scale`,
          radius_n
          /
          BUR_o
            .canvasWidth_n
        )
    }
  }
  ,

  
  eventImg_reset__v
  ()
  {
    BUR_o
      .pick__v
      (
       +'{{C_o.BURST_IMG_RESET_n}}'
       ,
       360    //: reset all
      )
  }
  ,



  async eventImg_panorama__v
  ()
  {
    ;console.log( 'eventImg_panorama__v'  )

    //...................
    BUR_o
      .eventImg_download__v()
  }
  ,



  eventImg_download__v
  ()
  {
    BUR_o
      .pick__v()
      
    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'GET_canvas_img'
            ,
            stat_s: '{{C_o.STAT_a[0]}}'
            ,
          }
        )
  }
  ,



  eventImg_background__v
  (
    event_o
  )
  {
    const for_s =
      event_o
        .target
          .htmlFor

    switch
    (
      true
    )
    {
      case for_s
             .includes( 'black' ) :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_backgroud`
            ,
            '{{S_o.bgblack_s}}'
          )

        break

      case for_s
             .includes( 'white' ) :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_backgroud`
            ,
            '{{S_o.bgwhite_s}}'
          )

        break

      case for_s
             .includes( 'color' ) :

        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_backgroud`
            ,
            'hsl( var(--{{C_o.STAT_a[0]}}_img_bg_hue) calc(var(--{{C_o.STAT_a[0]}}_img_bg_sat)  *1% ) calc(var(--{{C_o.STAT_a[0]}}_img_bg_lum)  *1%) /1)'
          )

        break

      case for_s
             .includes( 'picker' ) :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_picker`
            ,
            true
          )

        break

      default:
        break
    }
  }
  ,


  eventImg_range__v
  (
    event_o
  )
  {
    const range_e =
      event_o
        .target

    const value_s =
      range_e
        .value
      
    range_e
      .dataset
        .tip =
          value_s
  
    let id_s =
      range_e
        .id

    const hsl_s =
      id_s
        .slice
        (
          id_s
            .lastIndexOf( '_' )
          +
          1
        )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_img_bg_${hsl_s}`
        ,
        value_s
      )
  }
  ,



  listener__v
  ()
  {
    //=== HUE TRACE EVENTS ===
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
        let event_s
        of
        [
          'click',
          'mousemove'
        ]
      )
      {
        document
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}` )
            ?.addEventListener
            (
              event_s
              ,
              BUR_o
                .eventTrace__v
            )
      }

      BUR_o
        .trace_o
          [ `${hsl_s}_e`  ] =
              document
                .getElementById( `{{C_o.STAT_a[0]}}_${hsl_s}_n` )

      BUR_o
        .trace_o
          [ `${hsl_s}_ratio_e`  ] =
              document
                .getElementById( `{{C_o.STAT_a[0]}}_${hsl_s}_ratio_n` )
    }

    //=== CANVAS + SLIDERSEVENTS ===
    for
    (
      let hsl_s
      of
      [
        'hue',
      ]
    )
    {
      DOM_o
        .listener__v
        (
          `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_range`
          ,
          BUR_o
            .eventItem__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_back`
          ,
          BUR_o
            .eventHsl__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_back`
          ,
          BUR_o
            .eventHsl__v
            ,
          'mousemove'
        )

      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
          BUR_o
            .eventShift__v
        )
    }

    //=== IMG EVENTS ===
    for
    (
      let input_s
      of
      [
        'reset',
        'panorama',
        'download',
      ]
    )
    {
      document
        .querySelector( `[for={{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_${input_s}]` )
          ?.addEventListener
          (
            'click'
            ,
            BUR_o
              [ `eventImg_${input_s}__v` ]  //:eventImg_panorama__v
          )
    }
    
    //=== RANGE EVENTS ===
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
      for
      (
        let range_s
        of
        [
          'view_scale',
          'thresh_hi',
          'thresh_lo',
          'hue_img_bg_opacity',
        ]
      )
      {
        DOM_o
          .listener__v
          (
            `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${range_s}`
            ,
            BUR_o
              .eventRange__v
            ,
            event_s
            ,
            {
              passive: true
            }
          )
      }

      for
      (
        let range_s
        of
        [
          'black',
          'white',
          'color',
        ]
      )
      {
        document
          .querySelector( `[for={{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_bg_${range_s}]` )
            ?.addEventListener
            (
              event_s
              ,
              BUR_o
                [`eventImg_background__v`]
            )
      }

      for
      (
        let range_s
        of
        [
          'hue',
          'sat',
          'lum',
        ]
      )
      {
        DOM_o
          .listener__v
          (
            `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_pick_${range_s}`
            ,
            BUR_o
              .eventImg_range__v
            ,
            event_s
            ,
            {
              passive: true
            }
          )
      }
    }

    //=== GOTO EVENTS ===
    for
    (
      node_s
      of
      [
          '{{C_o.FULL_SCREEN}}',
          '{{C_o.PAGE_TOP}}',
          '{{C_o.BURST_PLOTS}}'
      ]
    )
    {
      DOM_o
        .beforeNode__e
        (
          document
            .getElementById( `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_layer_view` )
            ,
          `goto_${node_s}`
      )
    }

    const fullscreen_e =
      document
        .getElementById( `goto_${node_s}` )
  
    if
    (
      fullscreen_e
    )
    {
      FUL_o
        .listener__v()
    }
  }
  ,



  init__v
  ()
  {
    BUR_o
      .screen__v()
  
    BUR_o
      .worker_o =
        STAT_o
          .worker__o
          (
            '{{C_o.STAT_a[0]}}'
            ,
            [
              'hue',
              'sat',
              'lum',
              'hue_back',
              'hue_front',
            ]
            ,
            'LogScale Painter ColorBurst'
            ,
            BUR_o
              .message__v
          )

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s:  'PUT_scale'
            ,
            stat_s:  '{{C_o.STAT_a[0]}}'
            ,
            hsl_s:  'hue'
            ,
            scale_n: BUR_o
                       .scale_o
                         .hue_n
            ,
            burst_b: false    //:  don't draw: will do just after
          }
        )

    BUR_o
      .draw__v()    //: draw before getting plots_a
  
    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s:  'GET_plots'
            ,
            stat_s:  '{{C_o.STAT_a[0]}}'
            ,
            hsl_s:  'hue'
            ,
          }
        )

    BUR_o
     .listener__v()

    BUR_o
      .get_img()
  }
  ,
}

BUR_o
  .init__v()
