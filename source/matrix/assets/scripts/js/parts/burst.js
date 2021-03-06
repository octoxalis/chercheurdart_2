// === burst.js ===

const BUR_o =
{
  status_o: null,    //: STAT_W_o.status_o

  //XX hueTrace_e: null,
  trace_o: null,

  hueFreeze_b: false,    //: freeze || unfreeze hue selection

  scale_o:
    {
      hue_n: 1,
      sat_n: 1,
      lum_n: 1,
    }, 
  
  hue_n: 0,          //: selected hue
  


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
                frequency_n
                  .toLocaleString()
      
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



  rangeEvent__v:
  (
    event_o
  ) =>
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
          }
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
                    hue_n:
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
}



void function
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
            'lum'
          ],
          'LogScale Painter ColorBurst',
          BUR_o.message__v,
        )

  BUR_o
    .worker_o
      .post__v
      (
        { 
          task_s: 'PUT_draw',
          stat_s: '{{C_o.STAT_a[0]}}',
          part_s: 'hue',
        }
      )

  BUR_o
   .listener__v()
} ()
