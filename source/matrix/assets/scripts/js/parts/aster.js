// === aster.js ===

const AST_o =
{
  status_o: null,    //: STAT_W_o.status_o


  angle__n    //: in range [0...359]
  (
    event_o,
    range_n=360    //: hue(360), sat and lum(101)
  )
  {
    const center_n =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[1]}}_hue` )    //: all canvases (hue, sat, lum) have same size
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



  listener__v
  ()
  {
    /*
    AST_o
      .trace_o =
        {
          hue_e:
            document
              .getElementById( `{{C_o.STAT_a[1]}}_hue_n` ),
          hueRatio_e:
            document
              .getElementById( `{{C_o.STAT_a[1]}}_hue_ratio_n` ),
          sat_e:
            document
              .getElementById( `{{C_o.STAT_a[1]}}_sat_n` ),
          satRatio_e:
            document
              .getElementById( `{{C_o.STAT_a[1]}}_sat_ratio_n` ),
          lum_e:
            document
              .getElementById( `{{C_o.STAT_a[1]}}_lum_n` ),
          lumRatio_e:
            document
              .getElementById( `{{C_o.STAT_a[1]}}_lum_ratio_n` ),
        }
    */

    //=== ANGLE SELECTION ===
    /*
    const traceHandler__v =
      event_o =>
      {
        const atpart_s =
          AST_o
            .part__s()

        if
        (
          ! AST_o
            .hueFreeze_b
          ||
          atpart_s
          !==
          'hue'
        )
        {
          let angle_n =
            AST_o
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

          AST_o
            .trace_o
              [`${atpart_s}_e`]
                .innerHTML =
                  angle_n

          AST_o
            .worker_o
              .post__v
              (
                { 
                  task_s: 'GET_frequency',
                  stat_s: '{{C_o.STAT_a[1]}}',
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
          AST_o
            .hueFreeze_b =    //: toggle hueFreeze_b
              ! AST_o
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
            AST_o
              .worker_o
                .post__v
                (
                  { 
                    task_s: 'PUT_draw',
                    stat_s: '{{C_o.STAT_a[1]}}',
                    part_s: part_s,
                    hue_n:
                      +(AST_o            //: number cast
                          .trace_o
                            .hue_e
                              .innerHTML
                      ),
                  }
                )
          }
        }
      }
    */

    //=== HUE TRACE ===
    /*
    for
    (
      let part_s
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
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[1]}}_${part_s}` )
            ?.addEventListener
            (
              event_s,
              traceHandler__v
            )
      }
    }
    */

    //=== CANVAS SCALING ===
    const RANGE_MIN_n = .25
    const RANGE_MAX_n = 16.0
    const STEP_n      = .2
      
    for
    (
      let scale_s
      of
      [
        'inc',    //: + STEP_n
        'dec',    //: - STEP_n
      ]
    )
    {
      document
        .getElementById( `{{C_o.STAT_a[1]}}_scale_${scale_s}` )
          ?.addEventListener
          (
            'click',
            (
              event_o
            ) =>
            {
              const atpart_s =
                AST_o
                  .part__s()

              let step_n = 0
                STEP_n

              if
              (
                event_o
                  .target
                    ?.id
                      ?.includes( '_inc' )
                &&
                AST_o
                  .scale_o
                    [`${atpart_s}_n`]
                <=
                RANGE_MAX_n
                -
                STEP_n
              )
              {
                step_n =
                  STEP_n
              }
              
              if
              (
                event_o
                  .target
                    ?.id
                      ?.includes( '_dec' )
                &&
                AST_o
                  .scale_o
                    [`${atpart_s}_n`]
                >=
                RANGE_MIN_n
                +
                STEP_n
              )
              {
                step_n =
                  -STEP_n
              }

              if
              (
                step_n
              )
              {
                AST_o
                  .scale_o
                    [`${atpart_s}_n`] +=
                    step_n
  
                AST_o
                  .worker_o
                    .post__v
                    (
                      { 
                        task_s:  'PUT_scale',
                        stat_s:  '{{C_o.STAT_a[1]}}',
                        part_s:  atpart_s,
                        scale_n: AST_o
                                   .scale_o
                                     [`${atpart_s}_n`]
                      }
                    )
              }
            }
          )
    }
  }
  ,

}



void function
()
{
  AST_o
    .worker_o =
      STAT_o
        .worker__o
        (
          '{{C_o.STAT_a[1]}}',
          'LogScale Painter',
          [
            'initial',
            'processed'
          ],
          AST_o.message__v,
        )

  AST_o
    .worker_o
      .post__v
      (
        { 
          task_s: 'PUT_draw',
          stat_s: '{{C_o.STAT_a[1]}}',
          part_s: 'hue',
        }
      )

  AST_o
   .listener__v()
} ()

