// === burst.js ===

const BUR_o =
{
  SCALE_V_n: 2,

  status_o: null,    //: STAT_W_o.status_o

  trace_o: null,

  hueFreeze_b: false,    //: freeze || unfreeze hue selection

  scale_o:
    {
      hue_n: 1,
      sat_n: 1,
      lum_n: 1,
    }, 
  
  hue_n: 0,          //: selected hue
  
  hue_o:
  {
    rangeY_n: '{{C_o.BURST_RANGE_n}}',
  }
  ,

  rangeY_a:
     [180, 120, 90, 72, 60, 45, 40, 36, 30, 24, 20, 18, 15, 12, 10, 9, 8, 6, 5, 4, 3, 2, 1],

  rotate_n: 0,



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



  angle__n    //: in range [0...359]
  (
    event_o,
    range_n=360    //: hue(360), sat and lum(101)
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
  
    return(
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
    )
  }
  ,



  message__v
  (
    payload_o
  )
  {
    const { task_s } =
      payload_o

    switch
    (
      task_s
    )
    {
      case 'PUT_frequency':      //: { stat_s, task_s, status_o }
        const { part_s, frequency_n, capacity_n } =
          payload_o                           //;console.log( ratio_n )

        BUR_o
          .trace_o
            [ `${part_s}Ratio_e` ]
              .innerHTML =
                new Intl
                  .NumberFormat
                  (
                    'de-DE', 
                  )
                    .format( frequency_n )


      
        break
    
      case 'PUT_status':      //: { stat_s, task_s, status_o }
        BUR_o
          .status_o =
            payload_o
              .status_o
      
        break
    
      case 'PUT_error':      //: { stat_s, task_s, error_s }
        console.log( `ERROR: ${payload_o.error_s}` ) //... TODO: load error page ...
        
        break
    
      default:
        break
    }
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
              task_s: 'PUT_draw',
              stat_s: '{{C_o.STAT_a[0]}}',
              part_s: canvas_s,
              back_hue_n:  +DOM_o
                            .rootVar__s( '--{{C_o.STAT_a[0]}}_back_hue' ),
              rangeY_n: +BUR_o
                          .hue_o
                            .rangeY_n
            }
          )

      if      //=== paint brush
      (
        canvas_s
          .endsWith( '_back' )
      )
      {
        const atHsl_s =    //--> hue
          canvas_s
            .slice
            (
              0,
              -'_back'
                .length
            )
        
        const maxRange_n =
            360
    
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_${atHsl_s}_trace`,
            ( 
              maxRange_n
              -
              document
                .getElementById( `output_{{C_o.STAT_a[0]}}_${atHsl_s}` )
                  .value
            )
            *
            -2      //: 2px line
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
  
    const
    [
      ,
      ,
      ,
      range_s
    ] =
      range_e
        .id
          .split( '_' )
  
    callback_f
    &&
    callback_f
    (
      range_s,
      value_s
    )
  }
  ,



  rangeEvent__v
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
          range_s,
          value_s
        ) =>
          {
            const hsl_s =
              BUR_o
                .hsl__s()

            switch
            (
              range_s
            )
            {
              case 'scale' :
                BUR_o
                  [ `${range_s}_o` ]
                    [ `${hsl_s}_n` ] =
                      +value_s      //: number cast
    
                BUR_o
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
                break

              case 'rangeY' :
                //;console.log( value_s )

                let range_n =
                   +value_s    //: number cast
                    
                let at_n = 0

                while
                (
                  BUR_o
                    .rangeY_a
                      [at_n]
                  >
                  range_n
                )
                {
                  ++at_n                  
                }

                BUR_o
                  .hue_o
                    .rangeY_n =
                      BUR_o
                       .rangeY_a
                         [at_n]

                event_o
                  .target
                    .value =
                      BUR_o
                        .hue_o
                          .rangeY_n
                event_o
                  .target
                    .dataset
                      .tip =
                        BUR_o
                          .hue_o
                            .rangeY_n

                BUR_o
                  .draw__v()

                break
            }

          }
      )
  }
  ,



  rotate__v
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
    
      const value_s =
        document
          .querySelector( `label[id$="${hsl_s}_trace"] > output` )
            .value
    
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_back_${hsl_s}`,
          BUR_o
            .rotate_n
          -
          +value_s
        )

      rotate_n =
        +value_s
    }
  }
  ,



  hslEvent__v
  (
    click_o
  )
  {
  /*
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
          .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_layer_set_deviation' )
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
            stat_s:      '{{C_o.STAT_a[0]}}',
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
*/
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
      
    const atY_n =
      ~~( +offsetY      //: number cast
      /
      BUR_o
        .SCALE_V_n
      )

    const maxRange_n =
      360

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
        ( maxRange_n
          -
          atY_n
        )
        *
        -2      //: 2px line
      )

      document
        .getElementById( `output_{{C_o.STAT_a[0]}}_${hsl_s}` )
          .value =
            atY_n
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

    //=== ANGLE SELECTION ===
    const traceHandler__v =
      event_o =>
      {
        const atpart_s =
          BUR_o
            .hsl__s()

        if
        (
          ! BUR_o
            .hueFreeze_b
          ||
          atpart_s
          !==
          'hue'
        )
        {
          let angle_n =
            BUR_o
              .angle__n
              (
                event_o,
                atpart_s
                ===
                'hue'
                ?
                  360
                :
                  101
              )

          BUR_o
            .trace_o
              [`${atpart_s}_e`]
                .innerHTML =
                  angle_n

          BUR_o
            .worker_o
              .post__v
              (
                { 
                  task_s: 'GET_frequency',
                  stat_s: '{{C_o.STAT_a[0]}}',
                  part_s:  atpart_s,
                  frequency_n: angle_n
                }
              )
        }
        
        if
        (
          event_o
            .type
          ===
          'click'
          &&
          atpart_s
          ===
          'hue'
        )
        {
          BUR_o
            .hueFreeze_b =    //: toggle hueFreeze_b
              ! BUR_o
                  .hueFreeze_b

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
                  }
                )
          }
        }
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
              traceHandler__v
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
      for
      (
        let range_s
        of
        [
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
              `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_${range_s}`,
              BUR_o
                .rangeEvent__v,
              event_s
            )
        }
      }

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_front`,
          BUR_o
            .hslEvent__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
          BUR_o
            .rotate__v
        )
  
    }

    //=== VIEW ===
    DOM_o
      .beforeNode__e
      (
        document
          .getElementById( `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_layer_view` ),
        'goto_page_top'
      )

    for
    (
      let range_s
      of
      [
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
            `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_view_${range_s}`,
            BUR_o
              .rangeEvent__v,
            event_s
          )
      }
    }
  }
  ,



  init__v
  ()
  {
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
  
    BUR_o
     .listener__v()
  }
  ,
}




BUR_o
  .init__v()


