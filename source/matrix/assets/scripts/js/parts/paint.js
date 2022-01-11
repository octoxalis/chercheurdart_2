// === paint.js ===

const PAI_o =
{
  status_o: null,    //: STAT_W_o.status_o

  SCALE_H_n: 1,
  SCALE_V_n: 2,

  hue_o:
  {
    grade_n: 0,
    gap_n: 0,
  }
  ,
  sat_o:
  {
    grade_n: 0,
    gap_n: 0,
  }
  ,
  lum_o:
  {
    grade_n: 0,
    gap_n: 0,
  }
  ,

  layer_o:
  {
    perspective_n: 0,
    distance_n: 0,
    rotation_n: 0
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






  canvas__e:
  (
    work_s,
    callback_f    //: optional
  ) =>
  {
    const canvas_e =
      document
        .createElement( 'canvas' )

    callback_f
    &&
    callback_f( canvas_e )

    return canvas_e
  }
  ,



  layer__n:
  () =>
    Array
      .from
      (
        document
          .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_items' )
            .querySelectorAll( 'li' )
      )
      .length
  ,



  addLayer__v:
  (
    work_s
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
    let input_s = ''
  
    let id_s = ''
  
    let for_s = ''
  
    if
    (
      layer_n
    )
    {
      id_s = `input_${work_s}_${layer_n}`
  
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
            + `<label ${for_s}>{{C_o.NAV_LEGEND_o.layer_s.legend_s}} ${layer_n + 1}</label>`
            + `</li>`
          ),
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_items'
      )
  
  
  
    DOM_o
      .beforeNode__v
      (
        PAI_o
          .canvas__e
          (
            work_s,
            canvas_e =>      //: callback_f
            {
              //?? canvas_e
              //??   .id =
              //??     `canvas_${work_s}_${layer_n}`
  
              canvas_e
                .dataset
                  .layer_n =
                    layer_n
  
              canvas_e
                .dataset
                  .size_n =
                    1              //: to increase/decrease
  
              document
                .documentElement
                  .style
                    .setProperty
                    (
                      `--{{C_o.STAT_a[2]}}_canvas_ratio_${layer_n}`,
                      1
                    )
            }
          ),
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_position'
      )
  }
  ,
  
  
  
  selected__a:
  () =>
    Array
      .from
      (
        document
          .querySelectorAll( `#{{C_o.DIV_ID_s}}_{{C_o.STAT_a[2]}}_layer_items > li[data-layer_n]:not([data-layer_b="0"]) > input:checked` )
      )
  ,
  
  
  
  hideLayer__v:
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
      return void alert( `Aucun plan n'est sélectionné` )
    }
    //->
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
    }
  }
  ,
  
  
  
  imgResize__v:
  (
    delta_n
  ) =>
  {
    for
    (
      selected_e
      of
      PAI_o
        .selected__a()
    )
    {
      const layer_n =
        selected_e
          .dataset
            .layer_n
  
      for
      (
        canvas_e
        of
        Array
          .from
          (
            document
              .querySelectorAll( `canvas[data-layer_n="${layer_n}"]` )
          )
      )
      {
        let size_n =
          delta_n
          +
          +(canvas_e           //: number cast
            .dataset
              .size_n)
  
          canvas_e
            .dataset
              .size_n =
                size_n
  
        document
          .documentElement
            .style
              .setProperty
              (
                `--{{C_o.STAT_a[2]}}_canvas_ratio_${layer_n}`,
                size_n
              )
      }
    }
  }
  ,
  
  
  
  increase__v:
  (
    op_s
  ) =>
  {
    PAI_o
      .imgResize__v
      (
        +'{{C_o.CANVAS_RESIZE_n}}'
      )
  }
  ,
  
  
  
  decrease__v:
  (
    op_s
  ) =>
  {
    PAI_o
      .imgResize__v
      (
        -'{{C_o.CANVAS_RESIZE_n}}'
      )
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
          'gap'
        ]
      )
      {
        const range_e =
          document
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_${sub_s}_${range_s}` )
            
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
          range_e
          &&
          range_e
            .addEventListener
            (
              event_s,
              event_o =>
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
                      PAI_o
                        [ `${sub_s}_o` ]
                          [ `${range_s}_n` ] =
                            +value_s      //: number cast
                  )
              }
            )
        }
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


    let sub_s = 'layer'

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
      const range_e =
        document
          .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[2]}}_${sub_s}_${range_s}` )
          
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
        range_e
        &&
        range_e
          .addEventListener
          (
            event_s,
            event_o =>
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
          )
      }
    }








    const add_e =
      document
        .getElementById( `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[2]}}_layer_add` )
        
    add_e
    &&
    add_e
      .addEventListener
      (
        'click',
        click_o =>
        {
          PAI_o
            .addLayer__v    //: reference work
            (
              document
                .querySelector( 'body' )
                  .dataset
                    .work_s
            )
        }
      )

    const hide_e =
      document
        .getElementById( `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[2]}}_layer_hide` )
        
    hide_e
    &&
    hide_e
      .addEventListener
      (
        'click',
        click_o =>
        {
          PAI_o
            .hideLayer__v()
        }
      )

  }
  ,



  init__v
  ()
  {
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
      .addLayer__v    //: reference work
      (
        document
          .querySelector( 'body' )
            .dataset
              .work_s
      )

    PAI_o
      .listener__v()
  }

}





PAI_o
  .init__v()
