
//=== stat_w.js ===
const RGB_H__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const min_n =
    Math
      .min( r_n, g_n, b_n )

  const max_n =
    Math
      .max( r_n, g_n, b_n )

  if
  (
    max_n === min_n
  )
  {
    return 0 // achromatic
  }

  const max_min_n =
    max_n - min_n

  const h_n =
    max_n === r_n
    ?
      ( (g_n - b_n) / max_min_n )
      +
      ( g_n < b_n ? 6 : 0 )
    :
      max_n === g_n
      ?
        ( (b_n - r_n) / max_min_n ) + 2
      :
        ( (r_n - g_n) / max_min_n ) + 4

  return ~~(
    h_n * 60
  )
}



const RGB_S__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const min_n =
    Math.min( r_n, g_n, b_n )

  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const max_min_n =
    max_n - min_n

  if
  (
    ! max_min_n
  )
  {
    return 0 // achromatic
  }

  const min_max =
    min_n
    +
    max_n

  return (
    min_max > 255
    ?
      max_min_n / ( 510 - max_n - min_n )
    :
      max_min_n / min_max
  )
}


const RGB_L__n =
(
  r_n,
  g_n,
  b_n
) =>
  ( Math.min( r_n, g_n, b_n ) + Math.max( r_n, g_n, b_n ) )  / 510



  //=== STAT_W_o ===
const STAT_W_o =
{
  port_o: null,

  pixel_n: 1,    //: window.devicePixelRatio

  status_o:
  {
    scan_b: false,
  }
  ,

  message_o:
  [
    'GET_scan',
    'GET_status',
    'GET_frequency',
    'GET_img',

    'PUT_canvas',
    'PUT_draw',
    'PUT_scale',
  ]
  ,

  scan_a: null,
  //:[
  //:   [0]: hue_a[]
  //:   [1]: hueFrequency_a
  //:   [2]: hueRank_a
  //:   [3]: sat_a[]
  //:   [4]: satFrequency_a[],
  //:   [5]: satRank_a[],
  //:   [6]: lum_a[]
  //:   [7]: lumFrequency_a[],
  //:   [8]: lumRank_a[],
  //:],
  SCAN_HUE_n:      0,    //: scan_a hue indices
  SCAN_HUE_FREQ_n: 1,    //: scan_a hue frequencies
  SCAN_HUE_RANK_n: 2,    //: scan_a hue frequency ranks (higher frequency first)
  SCAN_SAT_n:      3,
  SCAN_SAT_FREQ_n: 4,
  SCAN_SAT_RANK_n: 5,
  SCAN_LUM_n:      6,
  SCAN_LUM_FREQ_n: 7,
  SCAN_LUM_RANK_n: 8,

  stat_o: {},     //: {{C_o.STAT_a[0]}}: stat_o{ hue_o{ canvas_e, context_o}, ... }
                  //: {{C_o.STAT_a[1]}}
                  //: {{C_o.STAT_a[2]}}

  script_o: new Set,   //: importScript loaded

  imgBitmap_a: new Map(),     //: store for multiple use (ex. {{C_o.STAT_a[2]}})

  //=== SCRIPTS ===
  script__v
  (
    list_s    //: list of scripts (without '.min.js') separated by space
  )
  {
    if
    (
      list_s
    )
    {
      let load_a = []
  
      for
      (
        let script_s
        of
        list_s
          .split( ' ' )
      )
      {
        if
        (
          ! STAT_W_o
            .script_o
              .has( script_s )
        )
        {
          STAT_W_o
            .script_o
              .add( script_s )
  
          load_a
            .push( `${script_s}.min.js` )
        }
      }

      if
      (
        load_a
          .length
      )
      {
        self
          .importScripts
          (
            ...load_a
          )
      }
    }
  }
  ,



  sleep__v
  (
    delay_n    //: milliseconds
  )
  {
    return new Promise
      (
        resolve_f =>
          setTimeout
          (
            resolve_f,
            delay_n
          )
      )
  }
  ,



  async waitScan__v
  (
    stat_s
  )
  {
    let times_n = 100    //: wait up to 100 * 50ms = 5s

    while                //: wait for scan
    (
      ! STAT_W_o
        .status_o
          .scan_b
    )
    {
      if
      (
        --times_n
        >
        0
      )
      {
        await STAT_W_o
          .sleep__v( 50 )    //: 50 ms sleep
      }
      else
      {
        STAT_W_o
          .post__v
            (
              {
                task_s: 'PUT_error',
                stat_s: stat_s,
                error_s: 'scan is not available'
              }
            )
        
        return false
      }
    }

    return true
  }
  ,


  scale__n
  (
    stat_s,
    part_s,
    ratio_n
  )
  {
    const translate_n =
      STAT_W_o
        .stat_o
          [ `${stat_s}_o` ]
            [ `${part_s}_o` ]
              .canvas_o
                .width
      *
      .5
      *
      ( 1 - ratio_n )

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ]
            .context_o
              .setTransform
              (
                ratio_n, 0, 0, ratio_n,
                translate_n,
                translate_n,
              )
},



async bitmap__o
(
  payload_o
)
{
  try
  {
    let
    {
      rect_s,
      scale_n,
      url_s,
      storeBitmap_b
    } = payload_o

    if
    (
      STAT_W_o
        .imgBitmap_a
          .has( url_s )
    )
    {
      return (
        STAT_W_o
          .imgBitmap_a
            .get( url_s )
      )
    }
    //-->
    let
    [
      x_n,
      y_n,
      width_n,
      height_n
    ] =
      rect_s
        .split( ' ' )

    const response_o =
      await fetch( url_s )

    const blob_o =
      await response_o
        .blob()

    const bitmap_o =
      await createImageBitmap
      (
        blob_o,
        x_n - ( width_n / scale_n * .5 ),    //: center point
        y_n - ( height_n / scale_n * .5 ),   //: idem
        width_n / scale_n,
        height_n / scale_n,
        {
          resizeWidth:  width_n,
          resizeHeight: height_n,
          resizeQuality: 'high'
        }
      )

    if
    (
      storeBitmap_b
    )
    {
      STAT_W_o
        .imgBitmap_a
          .set
          (
            url_s,
            bitmap_o
          )
    }

    return bitmap_o
  }
  catch
  (
    error_o    //: not used
  )
  {
    console
      .log( `ERROR DETECTED @bitmap__o(): ${ error_o }` )

    return null
  }
}
,




//=== GET    
  get_status__v
  ()
  {
    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_status',
          //: CLIENT_ALL_s
          status_o: STAT_W_o.status_o
  
        },
        [ STAT_W_o.status_o ]
      )
  }
  ,



  async get_scan__v
  (
    payload_o
  )
  {
    if
    (

      ! STAT_W_o
        .scan_a    //: already loaded?
    )
    {
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      ;console.time( 'scan' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
  
      const url_s =
        `/{{C_o.IMG_DIR_s}}${payload_o.work_s}{{C_o.IMG_MAX_PATH_s}}color.jpeg`
      
      const response_o =
        await fetch( url_s )
      
      const blob_o =
        await response_o
          .blob()
      
      const bitmap_o =
        await createImageBitmap( blob_o )
      
      const context_o =
        new OffscreenCanvas
        (
          bitmap_o
            .width,
          bitmap_o
            .height
        )
          .getContext( '2d' )
      
      context_o
        .drawImage
        (
          bitmap_o,
          0,
          0
        )
      
      const imgData_o =
        context_o
          .getImageData
          (
            0,
            0,
            bitmap_o
              .width,
            bitmap_o
              .height
          )

      STAT_W_o
        .capacity_n =
          bitmap_o
            .width
          *
          bitmap_o
            .height      //;console.log( STAT_W_o.capacity_n )
          
      STAT_W_o
        .scan_a = new Array( 1 + STAT_W_o.SCAN_LUM_RANK_n )
  
      //=== HUE
      let capacity_n = 360
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_HUE_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_HUE_FREQ_n] =
            new Array( capacity_n )
        
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_HUE_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_HUE_FREQ_n]
              [capacity_n] = 0
      }
      
      //=== SAT
      capacity_n = 101    // renge [0...100]
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_SAT_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_SAT_FREQ_n] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_SAT_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_SAT_FREQ_n]
              [capacity_n] = 0
      }
      
      //=== LUM
      capacity_n =  101    // renge [0...100]
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_LUM_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_LUM_FREQ_n] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_LUM_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_LUM_FREQ_n]
              [capacity_n] = 0
      }
      
      //: scanning
      let r_n,
          g_n,
          b_n
      
      for
      (
        let at_n = 0;              // : imageData pointer
        at_n
        <
        imgData_o
          .data
            .length;
        at_n += 4                  //: r,g,b, skip opacity
      )
      {
        r_n =
          imgData_o
            .data
              [at_n]
      
        g_n =
          imgData_o
            .data
              [at_n + 1]
      
        b_n =
          imgData_o
            .data
              [at_n + 2]
      
        let hue_n =
          RGB_H__n
          (
            r_n,
            g_n,
            b_n
          )
      
        //: HUE
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_HUE_n]
            [hue_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_HUE_FREQ_n]
            [hue_n] += 1
      
        //: SAT
        let sat_n =
          ~~( RGB_S__n
          (
            r_n,
            g_n,
            b_n
          )
          *
          100 )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_SAT_n]
            [sat_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_SAT_FREQ_n]
            [sat_n] += 1
    
        //: LUM
        let lum_n =
          ~~( RGB_L__n
          (
            r_n,
            g_n,
            b_n
          )
          *
          100 )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_LUM_n]
            [lum_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_LUM_FREQ_n]
            [lum_n] += 1
      }
    
      const rank__a =    //: utility function
      (
        capacity_a
      ) =>
      {
        const capacity_n =
          capacity_a
            .length

        let rank_a =
          new Array( capacity_n )

        for
        (
          let at_n=0;
          at_n < capacity_n;
          ++at_n
        )
        {
          rank_a
            [at_n] =
              [
                capacity_a
                  [at_n],
                at_n
              ]
        }

        rank_a
          .sort
          (
            (
              a,
              b
            ) =>  //: descending order
              b[0]
              -
              a[0]
          )

        return rank_a
      }

      STAT_W_o
        .scan_a[STAT_W_o.SCAN_HUE_RANK_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_HUE_FREQ_n]
          )      //: hue rankMax_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_SAT_RANK_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_SAT_FREQ_n]
          )      //: sat rankMax_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_LUM_RANK_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_LUM_FREQ_n]
          )      //: lum rankMax_n is at [0][0]

      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      ;console.timeEnd( 'scan' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //;console.log( STAT_W_o.scan_a )
    }
  }
  ,
  


  get_frequency__v
  (
    payload_o
  )
  {
    const { part_s, frequency_n } =
      payload_o

    const atpart_s =
      part_s
        .toUpperCase()

    let index_n =
      STAT_W_o
        [ `SCAN_${atpart_s}_FREQ_n` ]

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_frequency',
          //: CLIENT_ALL_s
          part_s: part_s,
          frequency_n: STAT_W_o
                         .scan_a
                         [ index_n ]
                           [ frequency_n ],
          capacity_n: STAT_W_o
                        .capacity_n
        }
      )           //;console.log( STAT_W_o.scan_a[ index_n ][ frequency_n ] )
  }
  ,



  async get_img__v
  (
    payload_o
  )
  {
    try
    {
      const bitmap_o =
        await STAT_W_o
          .bitmap__o( payload_o )

      if
      (
        bitmap_o
      )
      {
        await payload_o
          .canvas_e
            .getContext( '2d' )
              .drawImage
              (
                bitmap_o,
                0,
                0,
              )
      }

    }
    catch
    (
      error_o    //: not used
    )
    {
      console
        .log( `ERROR DETECTED @get_img__v(): ${ error_o }` )
    }
  }
  ,




  //=== PUT    
  put_canvas__v        //: offScreenCanvas
  (
    payload_o
  )
  {
    STAT_W_o
      .pixel_n =
        payload_o
          .pixel_n

    const { stat_s, part_s } =
      payload_o

    if
    (
      !  STAT_W_o
        .stat_o
          [ `${stat_s}_o` ]
    )
    {
      STAT_W_o
        .stat_o
          [ `${stat_s}_o` ] = {}
    }

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ] =
          {
            //: canvas_o,
            //: context_o
            //: burst_c
          }

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ]
            .canvas_o =
              payload_o
                .canvas_e

    const context_o =
      payload_o
        .canvas_e
          .getContext( '2d' )

    STAT_W_o
      .pixel_n =
        payload_o
          .pixel_n

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ]
            .context_o =
                context_o

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ]
            .painter_c =
                new Painter( context_o )
  }
  ,



  put_draw__v
  (
    payload_o
  )
  {
    const
    {
      stat_s,
      part_s
    } =
      payload_o

    switch
    (
      stat_s
    )
    {
      case '{{C_o.STAT_a[0]}}':
        if
        (
          STAT_W_o
            .scan_a
              [STAT_W_o.SCAN_HUE_FREQ_n]
                [ payload_o.hue_n ]
          ===
          0
        )
        {
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]
                .sat_o
                  .burst_c
                    .clear__v()
    
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]
                .lum_o
                  .burst_c
                    .clear__v()
    
          return
        }
        //-->
        let range_n
            
        switch
        (
          part_s
        )
        {
          case 'hue':
            range_n =
              360
      
            break
        
          case 'sat':
          case 'lum':
            range_n =
              101
            
            break
        
          default:
            break
        }
      
        const upart_s =
          part_s
            .toUpperCase()
      
        const freq_s =
          `SCAN_${upart_s}_FREQ_n`
      
        const rank_s =
          `SCAN_${upart_s}_RANK_n`
      
        const part_a = []
      
        let at_n = 0
      
        for
        (
          let freq_n
          of
          STAT_W_o
            .scan_a
              [
                STAT_W_o
                  [freq_s]
              ]
        )
        {
          let hue_n,
              sat_n,
              lum_n
      
          switch
          (
            part_s
          )
          {
            case 'hue':
              hue_n = at_n
      
              sat_n = 100
      
              lum_n = 50    //: neutral
      
              break
          
            case 'sat':
              hue_n = payload_o.hue_n
      
              sat_n = at_n
      
              lum_n = 50
              
              break
          
            case 'lum':
              hue_n = payload_o.hue_n
      
              sat_n = 0    //: neutral
      
              lum_n = at_n
              
              break
          
            default:
              break
          }
      
          part_a
            [ at_n ] =
              freq_n
              ?
                {
                  frequency_n: freq_n,
                  hsl_a: [ hue_n, sat_n, lum_n ]
                }
              :
                null
      
          ++at_n
        }
      
        const burst_o =
        {
          color_a: part_a,
          range_n: range_n,
          canvas_o:
            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]
                  [ `${part_s}_o` ]
                    .canvas_o,
          median_n:
            (
              STAT_W_o
                .stat_o
                  [ `${stat_s}_o` ]
                    [ `${part_s}_o` ]
                      .canvas_o
                        .width
            )
            *
            .5,
      
          maxfreq_n:
            STAT_W_o
              .scan_a[ STAT_W_o[rank_s] ]
                [0]
                  [0]
          ,
          //... onHueChange:
          //... ,
          //... onHueTrace:
          //... ,
        }
      
        STAT_W_o
          .stat_o
            [ `${stat_s}_o` ]
              [ `${part_s}_o` ]
                .burst_c =
                  new ColorBurst( burst_o )
        break;


    
      case '{{C_o.STAT_a[1]}}':
        break



      case '{{C_o.STAT_a[2]}}':
        //...............................
        ;console.log( STAT_W_o.stat_o )

          const paint_o =
            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]   //: paint
                  [ `${part_s}_o` ] //: hue_back, hue_front...

        const
        [
          hsl_s,
          face_s
        ] =
          part_s
            .split( '_' )

        switch
        (
          hsl_s
        )
        {
          case 'hue':
            for
            (
              let at_n = 0;
              at_n < 360;
              ++at_n
            )
            {
              paint_o
                .painter_c
                  .fill__c
                  (
                    [
                      at_n,
                      100,
                      50,
                      //--1
                    ]
                  )
                  .rect__c
                  (
                    0,
                    at_n * 2 * STAT_W_o.pixel_n
          ,
                    100 * STAT_W_o.pixel_n,
                    2 * STAT_W_o.pixel_n,
                    'fill'
                  )
            }
            
            break
        
          case 'sat':
            for
            (
              let at_n = 0;
              at_n < 101;
              ++at_n
            )
            {
              paint_o
                .painter_c
                  .fill__c
                  (
                    [
                      0,
                      at_n,
                      50,
                      //--1
                    ]
                  )
                  .rect__c
                  (
                    0,
                    at_n * 2 * STAT_W_o.pixel_n,
                    100 * STAT_W_o.pixel_n,
                    2 * STAT_W_o.pixel_n,
                    'fill'
                  )
            }

            break

          case 'lum':
            for
            (
              let at_n = 0;
              at_n < 101;
              ++at_n
            )
            {
              paint_o
                .painter_c
                  .fill__c
                  (
                    [
                      0,
                      0,
                      at_n,
                      //--1
                    ]
                  )
                  .rect__c
                  (
                    0,
                    at_n * 2 * STAT_W_o.pixel_n,
                    100 * STAT_W_o.pixel_n,
                    2 * STAT_W_o.pixel_n,
                    'fill'
                  )
            }

            break
        
          default:
            break
        }

        //...............................
        break


      default:    //: '{{C_o.STAT_a[3]}}'
        break;
    }
  }
  ,



  put_scale__v
  (
    payload_o
  )
  {
    const { stat_s, part_s, scale_n } =
      payload_o


    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ]
            .burst_c
              .clear__v()    //!!! before scaling

    STAT_W_o
      .scale__n      // scale canvas
      (
        stat_s,
        part_s,
        scale_n
      )

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${part_s}_o` ]
            .burst_c
              .draw__v()
  }
  ,



  //=== MESSAGES
  message__v
  (
    msg_o
  )
  {
    const payload_o =
      msg_o
        .data

    STAT_W_o
      .script__v
      (
        payload_o
          .script_s
      )

    const task_s =
      payload_o
        .task_s

    if
    (
      STAT_W_o
        .message_o
          .includes( task_s )
    )
    {
      const method_s =
        task_s
          .toLowerCase()
          +
          '__v'

      STAT_W_o
        [ method_s ]
        (
          payload_o
        )
    }
  }
  ,



post__v    //: post to stat
(
  payload_o
)
{
  STAT_W_o
    .port_o
      .postMessage( payload_o )
}
,



handleError__v
(
  error_o
)
{
  console
    .log`ERROR: ${error_o.message}`
}
,

}



//=== CONNECT
// self.
onconnect =
(
  connect_o
) =>
{
  STAT_W_o
    .port_o =
      connect_o
        .ports[0]

  STAT_W_o
    .port_o
      .onmessage =
        STAT_W_o
          .message__v

  STAT_W_o
    .port_o
      .onmessageerror =
        STAT_W_o
          .handleError__v
}
