//=== stat_w.js ===

const RGB_H__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const min_n =
    Math
      .min( r_n, g_n, b_n )

  if
  (
    max_n
    ===
    min_n
  )
  {
    return 0 // achromatic
  }

  const deltaSub_n =
    max_n
    -
    min_n

  const h_n =
    max_n === r_n
    ?
      ( (g_n - b_n) / deltaSub_n )
      +
      ( g_n < b_n ? 6 : 0 )
    :
      max_n === g_n
      ?
        ( (b_n - r_n) / deltaSub_n ) + 2
      :
        ( (r_n - g_n) / deltaSub_n ) + 4

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
  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const min_n =
    Math.min( r_n, g_n, b_n )

  const deltaSub_n =
    max_n
    -
    min_n

  if
  (
    ! deltaSub_n
  )
  {
    return 0 // achromatic
  }

  const deltaAdd_n =
    min_n
    +
    max_n

  return (
    deltaAdd_n > 255
    ?
      deltaSub_n / ( 510 - deltaSub_n )
    :
      deltaSub_n / deltaAdd_n
  )
}


const RGB_L__n =
(
  r_n,
  g_n,
  b_n
) =>
( Math
    .min( r_n, g_n, b_n )
  +
  Math
    .max( r_n, g_n, b_n )
)
/
510



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
    'PUT_hsl',
    'PUT_scale',
  ]
  ,

  scan_a: null,

  SCAN_hue_n:      0,    //: scan_a hue indices
  SCAN_hue_freq_n: 1,    //: scan_a hue frequencies
  SCAN_hue_rank_n: 2,    //: scan_a hue frequency ranks (higher frequency first)

  SCAN_sat_n:      3,
  SCAN_sat_freq_n: 4,
  SCAN_sat_rank_n: 5,

  SCAN_lum_n:      6,
  SCAN_lum_freq_n: 7,
  SCAN_lum_rank_n: 8,

  stat_o: {},     //: {{C_o.STAT_a[0]}}: stat_o{ hue_o{ canvas_e, context_o}, ... }
                  //: {{C_o.STAT_a[1]}}
                  //: {{C_o.STAT_a[2]}}

  script_o: new Set,          //: importScript loaded

  imgBitmap_a: new Map(),     //: store for multiple use (ex. {{C_o.STAT_a[2]}})

  imgLayer_a: [],             //: store image canvas




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


  /*//!!! STANDBY !!!
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
  */

  /*//!!! STANDBY !!!
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
  */


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
  
      //=== fetch image data Array
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
            .height
          
      //: initialize scan Arrays
      STAT_W_o
        .scan_a = new Array( 1 + STAT_W_o.SCAN_lum_rank_n )
  
      //=== HUE
      let capacity_n = 360
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_hue_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_hue_freq_n] =
            new Array( capacity_n )
        
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_hue_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_hue_freq_n]
              [capacity_n] = 0
      }
      
      //=== SAT
      capacity_n = 101    // renge [0...100]
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_sat_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_sat_freq_n] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_sat_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_sat_freq_n]
              [capacity_n] = 0
      }
      
      //=== LUM
      capacity_n =  101    // renge [0...100]
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_lum_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_lum_freq_n] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_lum_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_lum_freq_n]
              [capacity_n] = 0
      }
      
      //=== SCAN IMAGE DATA ===
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
              
        //:=== HUE
        let hue_n =
          RGB_H__n
            (
              r_n,
              g_n,
              b_n
            )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_hue_n]
            [hue_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_hue_freq_n]
            [hue_n] +=
              1
      
        //:=== SAT
        let sat_n =
          ~~( RGB_S__n
              (
                r_n,
                g_n,
                b_n
              )
              *
              100
          )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_sat_n]
            [sat_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_sat_freq_n]
            [sat_n] +=
              1
    
        //:=== LUM
        let lum_n =
          ~~( RGB_L__n
              (
                r_n,
                g_n,
                b_n
              )
              *
              100
          )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_lum_n]
            [lum_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_lum_freq_n]
            [lum_n] +=
              1
      }

      //=== utility function
      const rank__a =
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
          .sort  //: descending order
          (
            (
              first,
              second
            ) =>
              second
                [0]
              -
              first
                [0]
          )

        return rank_a
      }

      STAT_W_o
        .scan_a[STAT_W_o.SCAN_hue_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_hue_freq_n]
          )      //: hue rank max_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_sat_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_sat_freq_n]
          )      //: sat rank max_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_lum_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_lum_freq_n]
          )      //: lum rank max_n is at [0][0]

      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      ;console.timeEnd( 'scan' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
  }
  ,
  


  get_frequency__v
  (
    payload_o
  )
  {
    const
    {
      part_s,
      frequency_n
    } =
      payload_o

    let index_n =
      STAT_W_o
        [ `SCAN_${part_s}_freq_n` ]

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
        const canvas_e =
          payload_o
            .canvas_e

        const context_o =
          canvas_e
            .getContext( '2d' )

        context_o
          .drawImage
          (
            bitmap_o,
            0,
            0,
          )

        const img_o =
          {
            canvas_e:   payload_o
                          .canvas_e,
            context_o:  context_o,
            imgData_o:  context_o        //: store an original ImageData to avoid putImageData bug in put_hsl__v()
                          .getImageData
                          (
                            0,
                            0,
                            canvas_e
                              .width,
                            canvas_e
                              .height
                          )
          }

        if
        (
          payload_o
            .layer_n
        )
        {
          img_o
            .layer_n =
              payload_o
                .layer_n
        }

        STAT_W_o
          .imgLayer_a
            .push( img_o )    //: { canvas_e, context_o, imgData_o, layer_n }
      }
    }
    catch
    (
      error_o
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

    const
    {
      stat_s,
      part_s
    } =
      payload_o

    //;console.log( stat_s + '--' +  part_s )
    //;console.log( payload_o.canvas_e )

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
    let
    {
      stat_s,
      part_s,
      rangeY_n
    } =
      payload_o

    let painter_c

    let
        [
          hsl_s,
          face_s
        ] =
          part_s
            .split( '_' )

    switch
    (
      stat_s
    )
    {
      case '{{C_o.STAT_a[0]}}' :      //=== burst ===
        back_hue_n =
          payload_o
            .back_hue_n

        if
        (
          STAT_W_o
            .scan_a
              [STAT_W_o.SCAN_hue_freq_n]
                [ back_hue_n ]
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
        //!!!!!!!!!!!!!!!!!!!!!!!!! TEMPORARY
    
        let offset_n =
            back_hue_n
            -
            Math
              .floor
              (
                back_hue_n
                /
                rangeY_n
              )
              *
              rangeY_n
        //!!!!!!!!!!!!!!!!!!!!!!!!! END TEMPORARY

        //=== Sliders ===
        let capacity_n = 0
            
        switch
        (
          hsl_s
        )
        {
          case 'hue':
            capacity_n =
              360
      
            break
        
          default:    //: 'sat': 'lum':
            capacity_n =
              101
            break
        }

        painter_c =
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]   //: paint
                [ `${part_s}_o` ] //: hue_back, hue_front...
                  .painter_c

        if
        (
           part_s
           ===
          'hue_back'
        )
        {
            
          for
          (
            let at_n = 0;
            at_n < 360;
            ++at_n
          )
          {
            painter_c
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
                at_n * 2, //??* STAT_W_o.pixel_n
                painter_c
                  .context_o
                    .canvas
                      .width,      //??* STAT_W_o.pixel_n,
                2,        //??* STAT_W_o.pixel_n,
                'fill'
              )
          }

          return     //: no burst drawing for hue_back (only slider)
        }
        //>

        if    //=== range slider ===
        (
           part_s
           ===
          'hue_front'
        )
        {
          const median_n =
            rangeY_n
            >>
            1
  
          for
          (
            let at_n = 0;
            at_n < 360;
            ++at_n
          )
          {
            let atHue_n =
              (
                (
                  Math
                    .floor
                    (
                      (
                        at_n
                        +
                        360
                        -
                        offset_n
                      )
                      /
                      rangeY_n
                    )
                  *
                  rangeY_n
                )
                +
                median_n
              )
              %
              360

            painter_c
              .fill__c
              (
                [
                  atHue_n,
                  100,
                  50,
                  //--1
                ]
              )
              .rect__c
              (
                0,
                at_n * 2, //??* STAT_W_o.pixel_n
                painter_c
                  .context_o
                    .canvas
                      .width,      //??* STAT_W_o.pixel_n,
                2,        //??* STAT_W_o.pixel_n,
                'fill'
              )
          }
        }
        
        //=== burst ===      
        let part_a = []
        let atRange_n = 0
        let rangeAccu_n = 0
        let maxfreq_n = 0
        let at_n = 0
        
        const median_n =
          rangeY_n
          >>
          1
          
        for
        (
          let freq_n
          of
          STAT_W_o
            .scan_a
              [
                STAT_W_o
                  [`SCAN_${hsl_s}_freq_n`]
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
              hue_n =
                at_n
        
              sat_n = 100
        
              lum_n = 50    //: neutral
        
              break
          
            case 'sat':
              hue_n =
                back_hue_n
        
              sat_n = at_n
        
              lum_n = 50
              
              break
          
            case 'lum':
              hue_n =
                back_hue_n
        
              sat_n = 0    //: neutral
        
              lum_n = at_n
              
              break
              
            case 'hue_front':    //=== hue burst ===
              if
              (
                rangeY_n
                >
                1
                &&
                atRange_n
                <=
                rangeY_n
              )
              {
                rangeAccu_n +=
                  freq_n
  
                atRange_n++

                at_n++
                
                if
                (
                  at_n
                  <
                  360
                )
                {
                  continue    //: not at end otherwise don't miss last group
                }
              }

              //: else
              if
              (
                rangeAccu_n
                >
                maxfreq_n
              )
              {
                maxfreq_n =
                  rangeAccu_n
              }

              if    //!!!!!!!!!!!!! CHECK
              (
                rangeAccu_n
              )
              {
                freq_n =
                  rangeAccu_n
              }

              atRange_n++

              rangeAccu_n = 0    //: reset

              atRange_n = 0    //: reset
            
              hue_n =
                (
                  (
                    Math
                      .floor
                      (
                        (
                          at_n
                          +
                          360
                          -
                          offset_n
                        )
                        /
                        rangeY_n
                      )
                    *
                    rangeY_n
                  )
                  +
                  median_n
                )
                %
                360
                -
                rangeY_n
            
              sat_n = 100
            
              lum_n = 50    //: neutral

              break
              
            default:
              break
          }
  
          part_a
            .push
            (
              freq_n
              ?
                {
                  frequency_n: freq_n,
                  hsl_a:
                    [
                      hue_n,
                      sat_n,
                      lum_n
                    ]
                }
              :
                null
            )
        
          ++at_n
        }

//        ;console.log( part_s )
//        ;console.log( rangeY_n )
//        ;console.log( at_n )
//        ;console.log( part_a )

        const burst_o =
        {
          color_a: part_a,
          capacity_n:
            part_s
            ===
            'hue_front'
            ?
              part_a
                .length
            :
              capacity_n,

          canvas_o:
            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]
                  [ `${hsl_s}_o` ]
                    .canvas_o,
      
          median_n:
            (
              STAT_W_o
                .stat_o
                  [ `${stat_s}_o` ]
                    [ `${hsl_s}_o` ]
                      .canvas_o
                        .width
            )
            *
            .5,
        
          maxfreq_n:
            !maxfreq_n     //: not 'hue_front'
            ?
              STAT_W_o
                .scan_a
                  [ STAT_W_o[`SCAN_${ hsl_s }_rank_n`] ]
                    [0]
                      [0]
            :
              maxfreq_n
          ,
        }
        
        //; console.log(
        //; STAT_W_o
        //;   .stat_o
        //;     [ `${stat_s}_o` ]
        //;       .hue_o
        //; )

        STAT_W_o
          .stat_o
            [ `${stat_s}_o` ]
              [ `${hsl_s}_o` ]
                .burst_c =
                  new ColorBurst( burst_o )    //=== draw burst ===

        break

    

      case '{{C_o.STAT_a[2]}}' :      //=== paint ===

        painter_c =
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]   //: paint
                [ `${part_s}_o` ] //: hue_back, hue_front...
                  .painter_c

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
              painter_c
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
                  at_n * 2, //??* STAT_W_o.pixel_n
                  100,      //??* STAT_W_o.pixel_n,
                  2,        //??* STAT_W_o.pixel_n,
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
              painter_c
                .fill__c
                (
                  [
                    payload_o
                      .hue_n,
                    at_n,
                    50,
                    //--1
                  ]
                )
                .rect__c
                (
                  0,
                  at_n * 2, //??* STAT_W_o.pixel_n,
                  100,      //?? * STAT_W_o.pixel_n,
                  2,        //?? * STAT_W_o.pixel_n,
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
              painter_c
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
                  at_n * 2, //?? * STAT_W_o.pixel_n,
                  100,      //?? * STAT_W_o.pixel_n,
                  2,        //?? * STAT_W_o.pixel_n,
                  'fill'
                )
            }

            break
        
          default:
            break
        }

        break


      default:    //: '{{C_o.STAT_a[3]}}'
        break
    }
  }
  ,



  put_hsl__v
  (
    payload_o
  )
  {
    ;;;;;;;;    console.time( 'put_hsl__v' )

    let
    {
      stat_s,
      operand_a,
      operation_s,
      deviation_n,
      hsl_s,
      rangeX_n,
      atX_n,
      rangeY_n,
      atY_n
    } =
      payload_o

    //=== Sliders ===
    const ratioX_n =
      atX_n
      /
      rangeX_n

    let levelX_n =
      ~~ratioX_n       //: floor level

    if
    (
      ratioX_n
      >
      1               //: inside lower level --> 0
    )
    {
      ++levelX_n      //: outside lower level --> level above
    }

    levelX_n *=
      rangeX_n        //: [ 0...100 ]

    if
    (
      levelX_n
      >
      100
    )
    {
      levelX_n =
        100          //: clamp
    }

    let opacity_n =   //: in image data, opacity range is [0...255]
    ~~(
        levelX_n
        *
        2.559          //: force to 255 when levelX_n is 100
      )

    let opac_n =
      levelX_n
      *
      .01             //: 100 --> 1,  0 --> 0, 60 --> 0.6
      +
      .001             //: avoid opac_n === 1

    atY_n *=
      2            //: 2px line

    rangeY_n *=
      2            //: 2px line

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]             //: paint_o
          [ `${hsl_s}_front_o` ]      //: hue_front_o ...
            .painter_c

            .fill__c
            (
              [
                +'{{S_o.hue_p}}',    //: hsla( hue_p 28% 17% / 1 )
                28,
                17,
                1
              ]
            )
            .rect__c                 //::: wipe upper area with white
            (
              levelX_n,
              atY_n,                //??* STAT_W_o.pixel_n
              100 - levelX_n,       //??* STAT_W_o.pixel_n,
              rangeY_n,             //??* STAT_W_o.pixel_n,
              'fill'
            )

            .rect__c                //::: clear lower area
            (
              0,
              atY_n,                 //??* STAT_W_o.pixel_n
              levelX_n,              //??* STAT_W_o.pixel_n,
              rangeY_n,              //??* STAT_W_o.pixel_n,
              'clear'
            )

            .fill__c                 //::: mask lower area with opacity
            (
              [
                0,
                0,
                100,
                1 - opac_n           //: lower levels more transparent, upper levels more colored
              ]
            )
            .rect__c      
            (
              0,
              atY_n,                 //??* STAT_W_o.pixel_n
              levelX_n,              //??* STAT_W_o.pixel_n,
              rangeY_n,              //??* STAT_W_o.pixel_n,
              'fill'
            )

    const fromHsl_n =
      payload_o
        .atY_n                          //: back to 1px line
    
    let toHsl_n =
      fromHsl_n
      +
      payload_o
        .rangeY_n                       //: back to 1px line
      
    const max_n =
      hsl_s
      ===
      'hue'
      ?
        359
      :
        100

    if
    (
      toHsl_n
      >
      max_n
    )
    {
      toHsl_n =
        max_n
    }

    //=== Layer canvas ===
    const scan_a =
      STAT_W_o
        .scan_a
          [
            STAT_W_o
              [ `SCAN_${hsl_s}_n` ]
          ]

    const oper_a = []
  
    for
    (
      let atOp_o
      of
      operand_a
    )
    {
      oper_a
        .push
        (
          {
            layer_o:  STAT_W_o
                        .imgLayer_a
                          .find
                          (
                            item_o =>
                              item_o
                                .layer_n
                              ===
                              +atOp_o          //: number cast
                                .layer_n
                          ),
            clipRect_a: atOp_o
                          .clipRect_a
  
          }
        )
    }

    let op0imgData_o
    let op1imgData_o

    if
    (
      operation_s
      &&
      operation_s
      !==
      'none'
    )
    {
      op0imgData_o =
        oper_a
          [0]
            .layer_o
              .imgData_o

      op1imgData_o =
        oper_a
          ?.[1]
            ?.layer_o
              ?.imgData_o

      oper_a
        .splice
        (
          0,
          2
        )      //: keep only operation result (oper_a[2])
    }


    //=== data loop ===
    for
    (
      let atOp_o
      of
      oper_a
    )
    {
      const context_o =
        atOp_o
          .layer_o
            .context_o
  
      const imgData_o =
        atOp_o
          .layer_o
            .imgData_o
      
      const iData_a =
        imgData_o
          .data
  
      let atHsl_n
      let atScan_a
      let length_n
  
      for
      (
         atHsl_n = fromHsl_n;
         atHsl_n < toHsl_n;
         ++atHsl_n
      )
      {
        atScan_a =
          scan_a
            [ atHsl_n ]
          
        length_n =
          atScan_a
            .length
          
        let op0opac_n
        let op1opac_n
        let diff_n
        let apply_b = true

        for
        (
           atScan_n = 0;
           atScan_n < length_n;
           ++atScan_n
        )
        {
          //--if
          //--(
          //--  oper_a
          //--    .length
          //--  >
          //--  1
          //--)
          //--{
            if
            (
              op0imgData_o    //: operation
              &&
              op1imgData_o
            )
            {
              op0opac_n =
                op0imgData_o
                  [
                    atScan_a
                      [ atScan_n ]
                      +
                      3
                  ]
  
              op1opac_n =
                op1imgData_o
                  [
                    atScan_a
                      [ atScan_n ]
                      +
                      3
                  ]

              diff_n =
                ~~(
                  op0opac_n
                  -
                  op1opac_n
                )
            //--}

              switch
              (
                operation_s
              )
              {
                case 'union':
                  apply_b =
                    op0opac_n
                    &&
                    op1opac_n
      
                  break
              
                case 'difference':
                  apply_b =
                    diff_n
                    >
                    deviation_n
      
                  break
              
                case 'intersection':
                  apply_b =
                    diff_n
                    <=
                    deviation_n
      
                  break
              
                case 'complement':
                  apply_b =
                    op0opac_n
                    &&
                    ! op1opac_n
      
                  break
              
                default:      //: 'none'
                  break
              }
            }
          //--}
      
          if
          (
            apply_b
          )
          {
            iData_a
              [
                atScan_a
                  [ atScan_n ]
                  +
                  3
              ] =
                opacity_n
          }
        }
      }
  
      const clipRect_a =
        atOp_o
          .clipRect_a
            .length
        ?
        atOp_o
          .clipRect_a
        :
          [
            [
              0,
              0,
              atOp_o
                .layer_o
                  .canvas_e
                    .width,
              atOp_o
                .layer_o
                  .canvas_e
                    .height
            ]
          ]
      
      for
      (
        let rect_a
        of
        clipRect_a
      )
      {
        context_o
          .putImageData
          (
            imgData_o,
            0,
            0,
            ...rect_a
          )
      }
    }

    ;;;;;;;;    console.timeEnd( 'put_hsl__v' )
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
