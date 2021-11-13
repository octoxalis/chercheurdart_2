// === burst.js ===

const BUR_o =
{
  status_o: null,    //: STAT_W_o.status_o

  center_n: 0,
  
  scale_n: 1,

  hue_n: 0,    //: selected hue



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
        BUR_o
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



  listener__v
  ()
  {
    document
      .getElementById( `canvas_{{C_o.STAT_a[0]}}_hue` )
        ?.addEventListener
        (
          'click',
          (
            click_o
          ) =>
          {
            const atX_n =
              click_o
                .offsetX
              *
              window
                .devicePixelRatio
              -
              BUR_o
                .center_n
  
             const atY_n =
              click_o
                .offsetY
              *
              window
                .devicePixelRatio
              -
              BUR_o
                .center_n
  
            let angle_n =
              Math
                .atan2
                (
                  atY_n,
                  atX_n
                )
              *
              180
              /
              Math
                .PI
  
            if
            (
              angle_n
              <
              0
            )
            {
              angle_n += 360
            }
  
            BUR_o
              .hue_n =
                ~~(
                    (
                      angle_n
                      +
                      90    //: rotation to have hue 0 at 12:00 not 3:00
                    )
                    %
                    360
                  )
  
            document
              .getElementById( `{{C_o.STAT_a[0]}}_hue_n` )
              .innerHTML =
                BUR_o
                  .hue_n
          }
        )


    for
    (
      let trigger_s
      of
      [
        'scale_up',
        'scale_down',
      ]
    )
    {
      document
        .getElementById( `{{C_o.STAT_a[0]}}_${trigger_s}` )
          ?.addEventListener
          (
            'click',
            (
              event_o
            ) =>
            {
              if
              (
                event_o
                  .target
                    ?.id
                      ?.includes( 'scale_up' )
                &&
                BUR_o
                  .scale_n
                <
                16.0 //?? ~~'{{C_o.BURST_SCALE_MAX_n}}'
              )
              {
                
                BUR_o
                  .scale_n += .2
              }
              
              if
              (
                event_o
                  .target
                    ?.id
                      ?.includes( 'scale_down' )
                &&
                BUR_o
                  .scale_n
                >
                .25  //?? ~~'{{C_o.BURST_SCALE_MIN_n}}'
              )
              {
                
                BUR_o
                  .scale_n -= .2
              }
  
              BUR_o
                .worker_o
                  .post__v
                  (
                    { 
                      client_s: '{{C_o.STAT_a[0]}}',
                      id_s: 'hue',
                      task_s: 'PUT_scale',
                      scale_n: BUR_o.scale_n
                    }
                  )
            }
          )
    }

    for
    (
      let trigger_s
      of
      [
        'sat',
        'lum',
      ]
    )
    {
      document
        .querySelector( `label[for="{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${trigger_s}"]` )
          ?.addEventListener
          (
            'click',
            (
              event_o
            ) =>
            {
              //;console.log( event_o.target?.getAttribute( 'for' ) )
  
              const id_s =
                event_o
                  .target
                    ?.getAttribute( 'for' )
                      ?.slice
                      (
                        -3
                      )    //;console.log( id_s )
  
              id_s
              &&
              BUR_o
                .worker_o
                  .post__v
                  (
                    { 
                      client_s: '{{C_o.STAT_a[0]}}',
                      id_s: id_s,
                      hue_n: BUR_o.hue_n,
                      task_s: 'PUT_draw',
                    }
                  )
                
            }
          )
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
          'LogScale Painter ColorBurst',
          BUR_o.message__v,
        )

  BUR_o
    .worker_o
      .post__v
      (
        { 
          client_s: '{{C_o.STAT_a[0]}}',
          id_s: 'hue',
          task_s: 'PUT_draw',
        }
      )

  BUR_o
    .center_n =
      document
        .getElementById( `canvas_{{C_o.STAT_a[0]}}_hue` )
          .width
      *
      .5
      *
      window
        .devicePixelRatio

  BUR_o
   .listener__v()
} ()
