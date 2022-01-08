// === paint.js ===

const PAI_o =
{
  status_o: null,    //: STAT_W_o.status_o

  SCALE_H_n: 1,
  SCALE_V_n: 2,

  hue_o:
  {
    grade_n: 0,
    precision_n: 0,
  }
  ,
  sat_o:
  {
    grade_n: 0,
    precision_n: 0,
  }
  ,
  lum_o:
  {
    grade_n: 0,
    precision_n: 0,
  }
  ,



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



  //... pointer_tracing
  range__v:
  (
    id_s,
    value_s
  ) =>
  {
    ;console.log( id_s + ': ' + value_s )
    PAI_o
  }
  ,



  canvas__v:
  (
    id_s,
    offsetX,
    offsetY
  ) =>
  {
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

    //;console.log( id_s + ': ' + atY_n + ' / ' + atX_n )

  }
  ,



  listener__v
  ()
  {
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
          'grade',
          'precision'
        ]
      )
      {
        const range_e =
          document
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_settings_${sub_s}_${range_s}` )
            
        range_e
        &&
        range_e
          .addEventListener
          (
            'click',
            click_o =>
            {
              PAI_o
                .range__v
                (
                  click_o
                    .target
                      .id,
                  click_o
                    .target
                      .value
                )
            }
          )
      }

      const canvas_e =
        document
          .getElementById( `canvas_{{C_o.STAT_a[2]}}_${sub_s}` )
          
      canvas_e
      &&
      canvas_e
        .addEventListener
        (
          'click',
          click_o =>
          {
            const
            {
              offsetX,
              offsetY
            } =
              click_o

            PAI_o
              .canvas__v
              (
                click_o
                  .target
                    .id,
                offsetX,
                offsetY
              )
          }
        )

    }
  }
  ,



}



PAI_o
  .worker_o =
    STAT_o
      .worker__o
      (
        '{{C_o.STAT_a[2]}}',
        'LogScale Painter',
        PAI_o.message__v,
      )


PAI_o
  .listener__v()
