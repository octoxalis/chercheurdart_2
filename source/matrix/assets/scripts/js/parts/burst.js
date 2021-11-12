// === burst.js ===

const BUR_o =
{
  status_o: null,    //: STAT_W_o.status_o

  scale_n: 1,



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
    for
    (
      let button_s
      of
      [
        'scale_up',
        'scale_down',
      ]
    )
    {
      const listen_e =
        document
          .querySelector( `label[for="{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_${button_s}"]` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          (
            event_o
          ) =>
          {
            //;console.log( event_o.target.getAttribute( 'for' )?.includes( 'scale_up' ) )
            if
            (
              event_o
                .target
                  ?.getAttribute( 'for' )
                    ?.includes( 'scale_up' )
              &&
              BUR_o
                .scale_n
              <
              4 //?? ~~'{{C_o.BURST_SCALE_MAX_n}}'
            )
            {
              
              BUR_o
                .scale_n += .25
            }
            
            if
            (
              event_o
                .target
                  ?.getAttribute( 'for' )
                    ?.includes( 'scale_down' )
              &&
              BUR_o
                .scale_n
              >
              .25  //?? ~~'{{C_o.BURST_SCALE_MIN_n}}'
            )
            {
              
              BUR_o
                .scale_n -= .25
            }

            ;console.log( BUR_o.scale_n )

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
   .listener__v()

} ()
