// === burst.js ===

const BUR_o =
{
  status_o: null,    //: STAT_W_o.status_o

  hueTrace_e: null,

  hueFreeze_b: false,    //: freeze || unfreeze hue selection

  scale_n: 1,
  
  hue_n: 0,          //: selected hue
  


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
    const center_n =
      document
        .getElementById( `canvas_{{C_o.STAT_a[0]}}_hue` )
          .width
      *
      .5      //: width / 2
      *
      window
        .devicePixelRatio

    BUR_o
      .hueTrace_e =
        document
          .getElementById( `{{C_o.STAT_a[0]}}_hue_n` )


    //=== HUE SELECTION ===
    const traceHandler__v =
    event_o =>
    {
      if
      (
        ! BUR_o
          .hueFreeze_b
      )
      {
        const x_n =
          event_o
            .offsetX
          *
          window
            .devicePixelRatio
          -
          center_n
  
         const y_n =
          event_o
            .offsetY
          *
          window
            .devicePixelRatio
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
          +
          90    //: rotation to have hue 0 at 12:00 not 3:00
  
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
          .hueTrace_e
            .innerHTML =
              angle_n
              %
              360
      }
      
      if
      (
        event_o
          .type
        ===
        'click'
      )
      {
        BUR_o
          .hueFreeze_b =    //: toggle hueFreeze_b
            ! BUR_o
                .hueFreeze_b
      }
    }

    //=== HUE TRACE ===
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
        .getElementById( `canvas_{{C_o.STAT_a[0]}}_hue` )
          ?.addEventListener
          (
            event_s,
            traceHandler__v
          )
    }



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
        .getElementById( `{{C_o.STAT_a[0]}}_scale_${scale_s}` )
          ?.addEventListener
          (
            'click',
            (
              event_o
            ) =>
            {
              let step_n = 0
                STEP_n

              if
              (
                event_o
                  .target
                    ?.id
                      ?.includes( '_inc' )
                &&
                BUR_o
                  .scale_n
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
                BUR_o
                  .scale_n
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
                BUR_o
                  .scale_n +=
                    step_n
  
                BUR_o
                  .worker_o
                    .post__v
                    (
                      { 
                        task_s: 'PUT_scale',
                        client_s: '{{C_o.STAT_a[0]}}',
                        id_s: 'hue',
                        scale_n: BUR_o.scale_n
                      }
                    )
              }
            }
          )
    }

    //=== STAT PERMUTATION ===
    for
    (
      let stat_s
      of
      [
        'sat',
        'lum',
      ]
    )
    {
      document
        .querySelector( `label[for="{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${stat_s}"]` )
          ?.addEventListener
          (
            'click',
            (
              event_o
            ) =>
            {
              const id_s =
                event_o
                  .target
                    ?.getAttribute( 'for' )
                      ?.slice( -3 )         //: element ID ends with: 'hue' || 'sat' || 'lum'
  
              id_s
              &&
              BUR_o
                .worker_o
                  .post__v
                  (
                    { 
                      task_s: 'PUT_draw',
                      client_s: '{{C_o.STAT_a[0]}}',
                      id_s: id_s,
                      hue_n:
                        +(BUR_o            //: number cast
                          .hueTrace_e
                            .innerHTML)
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
          task_s: 'PUT_draw',
          client_s: '{{C_o.STAT_a[0]}}',
          id_s: 'hue',
        }
      )

  BUR_o
   .listener__v()
} ()
