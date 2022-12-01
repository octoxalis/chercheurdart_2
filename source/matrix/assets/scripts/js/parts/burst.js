// === burst.js ===

const BUR_o =
{
  SCALE_V_n: 2,

  status_o: null,    //: STAT_W_o.status_o

  trace_o: null,

  hueFreeze_b: false,    //: freeze || unfreeze hue selection

  hue_n: 0,          //: selected hue

  hue_o:
    {
      rangeY_n: 1,    //: C_o.BURST_RANGE_n
      shift_n: 0,     //: from burst_hue_back
    }
  ,

  scale_o:
    {
      hue_n: 1,    //: C_o.BURST_SCALE_n
      sat_n: .5,
      lum_n: .5,
    }, 
  
  thresh_o:
    {
      hi_n: 100,    //: C_o.BURST_THRESH_HI_n   left to right
      lo_n: 0,      //: C_o.BURST_THRESH_LO_n
    }, 
  



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
        part_s,
        frequency_n,
        range_a,
        capacity_n
      } =
        payload_o

    //;console.log( range_a )

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
        `...${range_a[1]}`
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
    part_s
  )
  {
    let range_n =
      part_s
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
          .querySelector(  `label:has(input[name="{{C_o.STAT_a[0]}}_hue_range"]:checked)` )

      if
      (
        label_e
      )
      {
        range_n =        //: 360, 180, 120...101..6, 3, 1
        360
        /
        +label_e              //: number cast
          .dataset
            .range_n        //: 1, 3, 6...180
      }
    }
                            //=> range_n = 360, 180, 120...101..6, 3, 2  (1 excluded)

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'GET_frequency',
            stat_s: '{{C_o.STAT_a[0]}}',
            part_s:  part_s,
            angle_n: angle_n,
            range_n: range_n
          }
        )
  }
  ,



  screen__v
  ()
  {
      let screenDim_n =
          screen
            .height

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
    part_s
  )
  {
  ;console.log( part_s )
    const center_n =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${part_s}` )    //: all canvases (hue, sat, lum) have same size
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
      const part_s =
        'hue'
        
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
              maxpos_n: BUR_o
                         .scale_o
                           [`${part_s}_n`]
              ,
              thresh_o: BUR_o
                          .thresh_o
            }
          )
    }
  }
  ,



  trace__v
  (
    part_s
  )
  {
    BUR_o
      .hueFreeze_b =    //: toggle hueFreeze_b
        ! BUR_o
            .hueFreeze_b

    let color_s
    let pointer_s

    if
    (
      BUR_o
        .hueFreeze_b
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

    let label_e =
      document
        .querySelector(  `label:has(input[name="{{C_o.STAT_a[0]}}_hue_range"]:checked)` )

    if
    (
      label_e
      &&
      +label_e              //: number cast
        .dataset
          .range_n 
      ===
      1                  //: not for hue ranges
    )
    {
      for
      (
        let part_s
        of
        [
          'sat',
          'lum',
        ]
      )
      {
        BUR_o
          .worker_o
            .post__v
            (
              { 
                task_s: 'PUT_draw',
                stat_s: '{{C_o.STAT_a[0]}}',
                part_s: part_s,
                back_hue_n:
                  +(BUR_o            //: number cast
                      .trace_o
                        .hue_e
                          .innerHTML
                  ),
                shift_n: BUR_o
                          .hue_o
                            .shift_n,
                maxpos_n: BUR_o
                            .scale_o
                              [`${part_s}_n`]
                ,
                thresh_o: BUR_o
                            .thresh_o
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



  eventRange__v
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
                      }
                    )

                DOM_o
                  .rootVar__v
                  (
                    `--{{C_o.STAT_a[0]}}_ruler`    ,
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

                ;console.log(
                BUR_o
                   .thresh_o
                )

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

                break

              default:    //: reserve other cases
                break
            }

          }
      )
  }
  ,




  eventSpot__v
  (
    event_o
  )
  {
    const label_o =
      event_o
        .target
          .closest( `label` )

    if
    (
      label_o
    )
    {
      BUR_o
        .hue_o
          .rangeY_n =
            +label_o             //: number cast
              .dataset
                .range_n

      BUR_o
        .draw__v()
    }

  }
  ,



  eventShift__v
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


  eventHsl__v
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



  eventTrace__v
  (
      event_o
  )
  {
    const part_s =
      BUR_o
        .hsl__s()

    if
    (
      ! BUR_o
        .hueFreeze_b
      ||
      part_s
      !==
      'hue'
    )
    {
      BUR_o
        .get_frequency__v
        (
          event_o,
          part_s
        )

      if
      (
        event_o
          .type
        ===
        'mousemove'
        &&
        event_o
          .ctrlKey
      )
      {
        BUR_o
          .eventtRuler__v
          (
            event_o,
            part_s
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
      part_s
      ===
      'hue'
    )
    {
      BUR_o
        .trace__v( part_s )
    }
  }
  ,



  eventtRuler__v
  (
      event_o,
      part_s
  )
  {
      let
      [
        x_n,
        y_n
      ] =
      BUR_o
        .coord__a
        (
          event_o,
          part_s
        )

      x_n =
        Math.abs( x_n )

      y_n =
        Math.abs( y_n )

      const radius_n =
        Math
          .sqrt
          (
            x_n
            *
            x_n
            +
            y_n
            *
            y_n
          )
          *
          2

      let display_s =
        radius_n
        <
        (
          +'{{C_o.BURST_NAV_DIM}}'    //: Number cast
          +
          10
        )
        ?
          'none'
        :
          'block'

      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_ruler`,
          display_s
        )

       DOM_o
         .rootVar__v
         (
           `--{{C_o.STAT_a[0]}}_ruler_dim`,
           `${radius_n}px`
         )
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

    //=== HUE TRACE ===
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

    //=== CANVAS + SLIDERS ===
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
            .eventSpot__v
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

    //=== VIEW ===
    for
    (
      node_s
      of
      [
          '{{C_o.FULL_SCREEN}}',
          '{{C_o.PAGE_TOP}}',
          '{{C_o.BURST_RULER}}'
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

    BUR_o
      .draw__v()
  
    const hsl_s = 'hue'

    BUR_o                    //!!! after draw__v()
      .worker_o
        .post__v
        (
          { 
            task_s:  'PUT_scale',
            stat_s:  '{{C_o.STAT_a[0]}}',
            part_s:  hsl_s,
            scale_n: BUR_o
                       .scale_o
                         [`${hsl_s}_n`]
          }
        )
    BUR_o
     .listener__v()
  }
  ,
}




BUR_o
  .init__v()
