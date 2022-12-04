// === burst.js ===

const BUR_o =
{
  SCALE_V_n: 2,

  status_o: null,    //: STAT_W_o.status_o

  trace_o: null,

  freeze_b: false,    //: freeze || unfreeze hue selection

  hue_n: 0,          //: selected hue

  hue_o:
    {
      rangeY_n: 1,    //!!!! TEMPORARY//: C_o.BURST_RANGE_n
      shift_n: 0,     //: from burst_hue_back
    }
  ,

  scale_o:
    {
      hue_n: 1,    //: C_o.BURST_SCALE_n
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
  
  plots_a:
    null
  ,

  lastPlot_o:
    null
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


  put_frequency__v
  (
    payload_o
  )
  {
    const
      {
        part_s
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
      .lastPlot_o =
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
        [`${part_s}_e`]
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
        [ `${part_s}Ratio_e` ]
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
                  .toFixed( 2 )
              )
  }
  ,



  get_frequency__v
  (
    event_o,
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

    let angle_n =
      BUR_o
        .angle__n
        (
          event_o,
          range_n
        )
    
    if
    (
      range_n
      ===
      360
    )
    {
      let label_e =
        document
          .querySelector(  `li:has(input[name="{{C_o.STAT_a[0]}}_hue_range"]:checked)` )

      if
      (
        label_e
      )
      {
        range_n =        //: 360, 120...101..6, 3, 1
        360
        /
        +label_e              //: number cast
          .dataset
            .range_n        //: 1, 3, 6...180
      }
    }
                            //=> range_n = 360, 120...101..6, 3, 2  (1 excluded)

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'GET_frequency'
            ,
            stat_s: '{{C_o.STAT_a[0]}}'
            ,
            part_s:  hsl_s
            ,
            angle_n: angle_n
            ,
            range_n: range_n
          }
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

/*
    let div_e =
      document
        .getElementById( `goto_{{C_o.STAT_a[0]}}_plots` )

    ;console.log( div_e )

    if
    (
      div_e
    )
    {
      div_e
        .width =
          screenDim_n
          
      div_e
        .height =
          screenDim_n
    }
    */
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



  draw__v
  ()
  {
    for    //=== worker draw sliders initial state
    (
      let canvas_s
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
              part_s: canvas_s
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



  trace__v
  (
    //??? hsl_s
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
        .querySelector(  `li:has(input[name="{{C_o.STAT_a[0]}}_hue_range"]:checked)` )

    if
    (
      item_e
      &&
      +item_e              //: number cast
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
          'sat'
          ,
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
                part_s: hsl_s
                ,
                back_hue_n:
                  +(BUR_o            //: number cast
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
                      +value_s      //: number cast
    
                BUR_o
                  .worker_o
                    .post__v
                    (
                      { 
                        task_s:  'PUT_scale'
                        ,
                        stat_s:  '{{C_o.STAT_a[0]}}'
                        ,
                        part_s:  hsl_s
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
                    `--{{C_o.STAT_a[0]}}_plots`    ,
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

              default:    //: reserve other cases
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
            +item_e             //: number cast
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
        +document             //: number cast
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
      +offsetY            //: number cast

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
        .trace__v( hsl_s )
    }
  }
  ,



  eventtPlots__v
  (
      event_o,
      hsl_s
  )
  {
    if     //: must check if lastPlot_o is null
    (
      BUR_o
        .lastPlot_o
    )
    {
      let
        {
          startX_n
          ,
          startY_n
        } =
          BUR_o
            .lastPlot_o
          
      const width_n =
        +document
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}` )    //: all canvases (hue, sat, lum) have same size
            .width
      
      const center_n =          //>>>>>> TODO: put outside event handler
        width_n
        *
        .5      //: width / 2
        
      startX_n -=
        center_n
  
      startY_n -=
        center_n

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
          `--{{C_o.STAT_a[0]}}_plot_scale`,
          radius_n
          /
          width_n
        )
    }
  }
  ,

  

  listener__v
  ()
  {
    BUR_o
      .trace_o =
        {
          hue_e:
            document
              .getElementById( `{{C_o.STAT_a[0]}}_hue_n` ),
          hueRatio_e:
            document
              .getElementById( `{{C_o.STAT_a[0]}}_hue_ratio_n` ),
          sat_e:
            document
              .getElementById( `{{C_o.STAT_a[0]}}_sat_n` ),
          satRatio_e:
            document
              .getElementById( `{{C_o.STAT_a[0]}}_sat_ratio_n` ),
          lum_e:
            document
              .getElementById( `{{C_o.STAT_a[0]}}_lum_n` ),
          lumRatio_e:
            document
              .getElementById( `{{C_o.STAT_a[0]}}_lum_ratio_n` ),
        }

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
              event_s,
              BUR_o
                .eventTrace__v
            )
      }
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
          `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_range`,
          BUR_o
            .eventItem__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_back`,
          BUR_o
            .eventHsl__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_back`,
          BUR_o
            .eventHsl__v,
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
            .getElementById( `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_layer_view` ),
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

    //=== RANGE EVENTS ===
    for
    (
      let range_s
      of
      [
        'view_scale',
        'thresh_hi',
        'thresh_lo',
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
            '{{C_o.STAT_a[0]}}',
            [
              'hue',
              'sat',
              'lum',
              'hue_back',
              'hue_front',
            ],
            'LogScale Painter ColorBurst',
            BUR_o
              .message__v,
          )

    BUR_o                    //XXXXXXXX after draw__v()
      .worker_o
        .post__v
        (
          { 
            task_s:  'PUT_scale',
            stat_s:  '{{C_o.STAT_a[0]}}',
            part_s:  'hue',
            scale_n: BUR_o
                       .scale_o
                         .hue_n
            ,
            burst_b: false    //:  don't draw: will do just after
          }
        )

    BUR_o
      .draw__v()
  
    BUR_o                    //XXXXXXXX after draw__v()
      .worker_o
        .post__v
        (
          { 
            task_s:  'GET_plots',
            stat_s:  '{{C_o.STAT_a[0]}}',
            part_s:  'hue',
          }
        )
    BUR_o
     .listener__v()
  }
  ,
}




BUR_o
  .init__v()
