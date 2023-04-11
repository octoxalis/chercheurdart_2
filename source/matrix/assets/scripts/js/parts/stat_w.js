//=== stat_w.js ===
self
  .importScripts
  (
    '/assets/scripts/js/rgbHsl.min.js'
  )

const clamp__n
=
  (
    number_n, 
    min_n=0,
    max_n=1
  ) =>
    Math
      .max
      (
        min_n
      , Math
          .min
          (
            max_n
          , number_n
          )
      )


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

  url_o: {},  //: import img data (base64) indexedDB key_s: src_s

  message_a:
  [
    'GET_scan'
  , 'GET_status'
  , 'GET_rate'
  , 'GET_equal'
  , 'GET_img'
  , 'GET_canvas_img'
  
  , 'PUT_canvas'
  , 'PUT_draw'
  , 'PUT_slot'
  , 'PUT_hsl'
  , 'PUT_scale'
  , 'PUT_slides'
  , 'PUT_magnify'
  , 'PUT_magnify_dim'
  ]
  ,

  scan_a: null,

  SCAN_hue_n:      0,    //: scan_a hue indices
  SCAN_hue_rate_n: 1,    //: scan_a hue rates
  SCAN_hue_rank_n: 2,    //: scan_a hue rate ranks (higher rate first)

  SCAN_sat_n:      3,
  SCAN_sat_rate_n: 4,
  SCAN_sat_rank_n: 5,

  SCAN_lum_n:      6,
  SCAN_lum_rate_n: 7,
  SCAN_lum_rank_n: 8,

  stat_o: {}      //: {{C_o.STAT_a[0]}}: stat_o{ hue_o{ canvas_e, context_o}, ... }
                  //: {{C_o.STAT_a[1]}}
                  //: {{C_o.STAT_a[2]}}
  ,
  script_o: new Set          //: importScript loaded
  ,
  imgData_o: {}              //: {{C_o.STAT_a[0]}}
  ,
  imgLayer_a: []             //: {{C_o.STAT_a[2]}} store image canvas
  ,
  imgBitmap_a: new Map()     //: {{C_o.STAT_a[2]}} store for multiple use
  ,

  slideStack_o:
    {
      slide_n:    0           //: current setInterval id
    , interval_n: 0           //: store current interval for a pause
    , pause_b:    false       //: slideShow pause if true

    //++ , opacity_n
    //++ , shift_n
    //++ , gap_n
    //++ , slot_a
    //++ , atSlot_n
    //++ , shiftGap_n
    //++ , stop_b
    }
  ,



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

  async url__s     //: URL to fetch image
  (
    src_s
  )
  {
    let url_s
    =
      src_s

    if
    (
      url_s
        .startsWith( '{{C_o.PRO_LOCAL_s}}'  )
    )
    {
      const value_s
      =
        await
        STAT_W_o
          .idb_o
            .get__( src_s )
    
      const value_o
      =
        JSON
          .parse( value_s )
    
      url_s
      =
        value_o
          .src_s
    }
    else    //: http...
    {
      url_s
      =
        url_s
          .replace
          (
            '{{C_o.IMG_SCAN_DISPLAY_s}}'
          ,  '{{C_o.IMG_SCAN_FORMAT_s}}'
          )
    }

    return url_s
  }



, async bitmap__o
  (
    payload_o
  )
  {
    try
    {
      let
      {
        stat_s,
        rect_s,
        scale_n,
        url_s,
        storeBitmap_b
      }
      =
        payload_o
  
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

      if        //: imported src_s
      (
        //-- url_s
        //--   .match( /\d{2}-\d{2}-\d{4}_\d{2}-\d{2}-\d{2}/ )    //: dd-mm-yyyy_hh-mm-ss
        url_s
          .startsWith( '{{C_o.PRO_LOCAL_s}}' )
      )
      {
        url_s
        =
          STAT_W_o
            .url_o
              [ url_s ]
      }
    
      const response_o =
        await
        fetch( url_s )
    
      const blob_o =
        await
        response_o
          .blob()
    
      const bitmap_o =
        await
        createImageBitmap
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



  clearData__v
  (
    context_o
  , imgData_o
  , opacity_n
  )
  {
    const iData_a =
      imgData_o
        .data

    for
    (
       let at_n = 0;
       at_n
       <
       iData_a
         .length;
       at_n += 4
    )
    {
      iData_a
        [
          at_n
          +
          3
        ] =
          opacity_n
    }

    context_o
      .putImageData
      (
        imgData_o,
        0,
        0
      )  
  }
  ,



  scale__n
  (
    stat_s,
    hsl_s,
    ratio_n
  )
  {
    const
    {
      width,
      height
    } =
      STAT_W_o
        .stat_o
          [ `${stat_s}_o` ]
            [ `${hsl_s}_o` ]
              .canvas_o

    STAT_W_o    //=== CLEAR ===
      .stat_o
        [ `${stat_s}_o` ]
          [ `${hsl_s}_o` ]
            .context_o
              .clearRect
              (
                0,
                0,
                width,
                height
              )

    const translate_n =  //: keep centering
      width
      *
      .5
      *
      ( 1 - ratio_n )

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${hsl_s}_o` ]
            .context_o
              .setTransform            //!!!!!!!!!!!!! CHECK
              (
                ratio_n, 0, 0, ratio_n,
                translate_n,
                translate_n,
              )
  }
  ,



  slot__a
  (
    angle_n,
    slot_n
  )
  {
    let slot_a    //: [ fromHsl_n, toHsl_n ]
    
    if
    (
      slot_n
      !==
      360    //: 120...2 (hue range)
      &&
      slot_n
      !==
      101    //:  sat or lum
    )
    {
      let arc_n =
        360
        /
        slot_n

      let from_n =
        angle_n
        *
        arc_n

      slot_a =
        [
          from_n,
          from_n
          +
          arc_n
          -
          1        //: upper limit excluded
        ]
    }
    else
    {
      slot_a =
        [
          angle_n
        ]
    }

    return slot_a
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
      //;console.time( 'scan' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      const url_s
      =
        await
        STAT_W_o
          .url__s
          (
            payload_o
              .src_s
          )

      if
      (
        payload_o
          .src_s
            .startsWith( '{{C_o.PRO_LOCAL_s}}' )
      )
      {
        if
        (
          ! url_s
              .startsWith( '{{C_o.BASE64_JPEG_s}}' )
        )
        {
          return void console.log( 'Only data:image/jpeg is allowed' )   //: for CSP check
        }
        //-->
        STAT_W_o
          .url_o
            [ payload_o.src_s ]
        =
          url_s
      }

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
      
      //=== fetch image data Array
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
          [STAT_W_o.SCAN_hue_rate_n] =
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
            [STAT_W_o.SCAN_hue_rate_n]
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
          [STAT_W_o.SCAN_sat_rate_n] =
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
            [STAT_W_o.SCAN_sat_rate_n]
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
          [STAT_W_o.SCAN_lum_rate_n] =
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
            [STAT_W_o.SCAN_lum_rate_n]
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
          .scan_a[STAT_W_o.SCAN_hue_rate_n]
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
          .scan_a[STAT_W_o.SCAN_sat_rate_n]
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
          .scan_a[STAT_W_o.SCAN_lum_rate_n]
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
              .scan_a[STAT_W_o.SCAN_hue_rate_n]
          )      //: hue rank max_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_sat_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_sat_rate_n]
          )      //: sat rank max_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_lum_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_lum_rate_n]
          )      //: lum rank max_n is at [0][0]

      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //;console.timeEnd( 'scan' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_scan'
        , //: CLIENT_ALL_s
          ready_b: true
        }
      )


    }
  }
  ,
  


  get_rate__v
  (
    payload_o
  )
  {
    let          //: angle_n is mutable
    {
      hsl_s,
      angle_n,
      slot_n     //: 360, 120...101..6, 3, 2  (1 excluded)
    } =
      payload_o
    
    const slot_a =
      STAT_W_o
        .slot__a
        (
          angle_n,
          slot_n
        )

    let HSL_s

    if
    (
      hsl_s
      ===
      'linear'
    )
    {
      HSL_s
      =
        'hue'   //!!! linear uses hue slot_a

      angle_n   //!!! angle_n is in rank order: change to hue as angle
      =
        STAT_W_o
          .stat_o
            .burst_o
              [ `${hsl_s}_o` ]
                .slot_a
                  ?.[ angle_n ]
                    ?.hue_n
    }
    else
    {
      HSL_s
      =
        hsl_s
    }

    if
    (
      angle_n
      ===
      null
    )
    {
      return
    }
    //--->
    const rate_o =
      STAT_W_o
        .stat_o
          .burst_o
            [ `${HSL_s}_o` ]
              .slot_a
                [ angle_n ]

    const rate_n =
      rate_o        //: can be null (see put_draw__v)
      ?
        rate_o
          .rate_n
      :
        0

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_rate'
          ,
          //: CLIENT_ALL_s
          hsl_s: hsl_s
          ,
          rate_n: rate_n
          ,
          capacity_n: STAT_W_o      //: reserved for ratio
                        .capacity_n
          ,
          slot_n: slot_n
          ,
          slot_a: slot_a
          ,
          equal_a:
            STAT_W_o
              .stat_o
                .burst_o
                  [ `${hsl_s}_o` ]
                    ?.burst_c                //!!! null if linear
                      ?.equal__a( angle_n )
        }
        ,
        [
          STAT_W_o
            .stat_o
              .burst_o
                [ `${hsl_s}_o` ]
                  ?.burst_c                  //!!! null if linear
                    ?.equal__a( angle_n )
        ]
      )
  }
  ,



  get_equal__v
  (
    payload_o
  )
  {
    const
    {
      stat_s,
      hsl_s
    } =
      payload_o

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_equal'
          ,
          stat_s: '{{C_o.STAT_a[0]}}'
          ,
          hsl_s: hsl_s
          ,
          equal_a:
            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]
                  [ `${hsl_s}_o` ]
                    .burst_c
                      .equal__a()
        }
        ,
        [
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]
                [ `${hsl_s}_o` ]
                  .burst_c
                    .equal__a()
        ]
      )
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
        await
        STAT_W_o
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

        const imgData_o =
          context_o        //: store an original ImageData
            .getImageData
            (
              0
              ,
              0
              ,
              canvas_e
                .width
              ,
              canvas_e
                .height
            )

        const stat_s =
          payload_o
            .stat_s
          
        if
        (
          stat_s
          ===
          '{{C_o.STAT_a[0]}}'
        )
        {
          STAT_W_o
            .imgData_o
              [ stat_s ] =
              {
                canvas_e: canvas_e
                ,
                context_o: context_o
                ,
                imgData_o: imgData_o
              }
                
          return
        }
        //-->
        if
        (
          payload_o
            .storeBitmap_b    //: {{C_o.STAT_a[2]}}
        )
        {
          const img_o =
            {
              canvas_e:   payload_o
                            .canvas_e
              ,
              context_o:  context_o
              ,
              imgData_o: imgData_o        //: store an original ImageData to avoid putImageData bug in put_hsl__v()
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



  async get_canvas_img__v
  (
    payload_o
  )
  {
    //=============================
    ;console.time( 'get_canvas_img__v' )
    //=============================
    const
    {
      stat_s
    , hsl_s
    , rgb_a
    , img_b
    } =
      payload_o

    let canvas_e
    let imgData_o
    let suffix_s

    if
    (
      img_b
    )
    {
      canvas_e
      =
        STAT_W_o
          .imgData_o
            [ stat_s ]
              .canvas_e

      imgData_o
      =
        STAT_W_o
          .imgData_o
            [ stat_s ]
              .imgData_o
    }
    else    //: burst canvas
    {
      canvas_e
      =
        STAT_W_o
          .stat_o
            [ `${stat_s}_o` ]
              [ `${hsl_s}_o` ]
                .canvas_o

      imgData_o
      =
        STAT_W_o
          .stat_o
            [ `${stat_s}_o` ]
              [ `${hsl_s}_o` ]
                .context_o        //: store an original ImageData
                  .getImageData
                  (
                    0
                    , 0
                    , canvas_e
                        .width
                    , canvas_e
                        .height
                  )
    }

    let blob_o

    let blobCanvas_e

    if
    (
      rgb_a
    )
    {
      const
      [
        r_n
      , g_n
      , b_n
      ]
       =
         rgb_a
         
      //=== clone image data to keep original image ===
      const data_a
      =
        imgData_o
          .data
      
      const u8Array_a
      =
        new Uint8ClampedArray( data_a )

      for
      (
        let at_n
          = 0;
        at_n
        <
        data_a
          .length;
        at_n
        +=
          4
      )
      {
        if
        (
          data_a
            [ at_n + 3 ]
            ===
            255       //: keep canvas_e pixels
        )
        {
          u8Array_a
            [ at_n ]
          =
            data_a
              [ at_n ]
          
          u8Array_a
            [ at_n + 1 ]
          =
            data_a
              [ at_n + 1 ]
          
          u8Array_a
            [ at_n + 2 ]
          =
            data_a
              [ at_n + 2 ]
          
          u8Array_a
            [ at_n + 3 ]
          =
            data_a
              [ at_n + 3 ]
        }
        else         //: put background color pixels
        {
          u8Array_a
            [ at_n ]
          =
            r_n

          u8Array_a
            [ at_n + 1 ]
          =
            g_n

          u8Array_a
            [ at_n + 2 ]
          =
            b_n

          u8Array_a
            [ at_n + 3 ]
          =
            data_a
              [ at_n + 3 ]
        }
      }

      //=== clone canvas ===
      const
      {
        width
      , height
      }
      =
        canvas_e

      blobCanvas_e
      =
        new OffscreenCanvas
        (
          width
        , height
        )

      const blobData_o
      =
        new ImageData
        (
          u8Array_a
        , width
        )

      const blobContext_o
      =
        blobCanvas_e
          .getContext( '2d' )

      blobContext_o
        .putImageData
        (
          blobData_o
        , 0
        , 0
        )
    }
    else
    {
      blobCanvas_e
      =
        canvas_e
    }

    blob_o
    =
      await
      blobCanvas_e
        .convertToBlob
        (
          {
            type: 'image/jpeg'
            ,
            quality: 0.95
          }
        )
  
    //=============================
    ;console.timeEnd( 'get_canvas_img__v' )
    //=============================

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_canvas_img'
          ,
          //: CLIENT_ALL_s
          blob_o: blob_o
        }
        ,
        [ blob_o ]
      )
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
      hsl_s
    } =
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
          [ `${hsl_s}_o` ] =
          {
            //: canvas_o,
            //: context_o
            //: burst_c
          }

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${hsl_s}_o` ]
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
          [ `${hsl_s}_o` ]
            .context_o =
                context_o

    STAT_W_o
      .stat_o
        [ `${stat_s}_o` ]
          [ `${hsl_s}_o` ]
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
      hsl_s,
      back_hue_n,
      rangeY_n,     //: {{C_o.STAT_a[0]}} : slot arc [1, 3, 6...360]
      shift_n,      //: {{C_o.STAT_a[0]}}
      thresh_o,     //: {{C_o.STAT_a[0]}} ColorBurst
      scale_n       //: linear
      //??? maxpos_n,     //??????    //: {{C_o.STAT_a[0]}} ColorBurst
    } =
      payload_o
      
    let painter_c

    let
        [
          HSL_s,
          part_s    //: not used
        ] =
          hsl_s
            .split( '_' )

    switch
    (
      stat_s
    )
    {
      case '{{C_o.STAT_a[0]}}' :      //=== burst ===
        
        const arc_n     //: use for code clarity
        =
          rangeY_n

        let capacity_n
        =
          0
            
        //=== SLIDERS ===
        switch
        (
          HSL_s
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
              [ `${stat_s}_o` ]  //: paint
                [ `${hsl_s}_o` ] //: hue_back, hue_front...
                  .painter_c

        switch
        (
          hsl_s
        )
        {
//------------------------------------------------------------------------





          //=== LINEAR ===      
          case
            'linear'
          :
            const slot_a
            =
              []
                
            painter_c
              .clear__c()


            const height_n
            =
              +'{{C_o.LINEAR_HEIGHT_n}}'

            //;console.log( STAT_W_o.capacity_n )
            
            let bit_n
            =
              4          //: 2 << 4 = 32

            while
            (
              2
              <<
              bit_n
              <
              STAT_W_o
                .capacity_n
            )
            {
              ++bit_n
            }
            //;console.log( bit_n )

            bit_n
            -=
              +'{{C_o.LINEAR_SHIFT_n}}'


            const rshift_n
            =
              clamp__n
              (
                ~~(
                    scale_n
                    *
                    bit_n
                  )
              , +'{{C_o.LINEAR_CLAMP_MIN_n}}'
              , +'{{C_o.LINEAR_CLAMP_MAX_n}}'
              )
            //;console.log( rshift_n )

            let threshold_n
            =
              STAT_W_o
                .capacity_n
              >>>
              (
                rshift_n
                -
                (+'{{LINEAR_THRESHOLD_n}}')
              )
           
            let from_n
            =
              0

            let rate_n
            =
              0

            for
            (
              let rank_a
              of
              STAT_W_o
                .scan_a
                  [
                    STAT_W_o
                      .SCAN_hue_rank_n
                  ]
            )
            {
              const
                [
                   capacity_n
                ,  hue_n
                ]
              =
                rank_a

              let width_n
              =
                (
                  capacity_n
                  >>>
                  bit_n
                )
                *
                scale_n

              if
              (
                capacity_n
                >
                threshold_n
              )
              {
                painter_c
                  .fill__c
                  (
                    [
                      hue_n
                    , 100
                    , 50
                    ]
                  )
                  .rect__c
                  (
                    from_n
                  , 0
                  , width_n
                  , height_n
                  , 'fill'
                  )
  
                rate_n
                +=
                  capacity_n

                slot_a
                  .push
                  (
                    {
                      hue_n
                      :
                        hue_n
                    , from_n
                      :
                        from_n
                    , width_n
                      :
                        width_n
                    }
                  )

                from_n
                +=
                  width_n
              }
            }

            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]
                  [ `${hsl_s}_o` ]
                    .slot_a
            =
              slot_a

            STAT_W_o
              .post__v
              (
                {
                  task_s
                  :
                    'PUT_linear'
                , stat_s
                  :
                    '{{C_o.STAT_a[0]}}'
                , slot_a
                  :
                    slot_a
                , ratio_n
                :
                  rate_n
                  /
                    STAT_W_o
                      .capacity_n
                }
              , [
                  slot_a
                ]
              )


            break





//------------------------------------------------------------------------
        //=== BACK SLIDER ===
          case
            'hue_back'
          :
            for
            (
              let at_n = 0;
              at_n < 360;
              ++at_n
            )
            {
              let atHue_n =
                at_n
                +
                shift_n
                %
                360
  
              painter_c
                .fill__c
                (
                  [
                    atHue_n,
                    100,
                    50
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

            break
        
        //=== FRONT SLIDER ===
          case 'hue_front':    
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
                        at_n
                        /
                        arc_n
                      )
                    *
                    arc_n
                  )
                  +
                  shift_n
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
      
            break
        
          default:
            break
        }

        //=== BURST ===      
        if
        (
          hsl_s
          !==
          'linear'
        )
        {
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]
                [ `${HSL_s}_o` ]
                  .slot_a  = []    //: reset if already used
  
          //: slice array from shift
          const head_a =
            STAT_W_o
              .scan_a
                [
                  STAT_W_o
                    [`SCAN_${HSL_s}_rate_n`]
                ]
                .slice
                (
                  0,
                  shift_n
                )
  
          const tail_a =
            STAT_W_o
              .scan_a
                [
                  STAT_W_o
                    [`SCAN_${HSL_s}_rate_n`]
                ]
                .slice
                (
                  shift_n
                )
  
          const rate_a =
            tail_a
              .concat( head_a )
            
          let beam_n =      0     //: rate accumulator
          let arcStart_n =  0
          let maxRate_n =   0
          let at_n =        -1    //: to start at 0
          let slot_n =      -1    //: idem
          
          for
          (
            let rate_n
            of
            rate_a
          )
          {
            ++at_n    //: start at 0
  
            ++slot_n  //: start at 0
  
            arcStart_n
            =
              at_n
  
            let hue_n,
                sat_n,
                lum_n
          
            switch
            (
              hsl_s
            )
            {
              case 'hue':
                //?? painter_c
                //??   .clear__c()
              
                hue_n =
                  (
                    at_n
                    +
                    shift_n
                  )
                  %
                  360
          
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
                  arc_n
                  >
                  1
                  &&
                  slot_n
                  <
                  arc_n
                  -
                  1
                )
                {
                  beam_n +=
                    rate_n
                  
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
  
                //: else, end of slot
                if
                (
                  beam_n
                  >
                  maxRate_n
                )
                {
                  maxRate_n =
                    beam_n
                }
  
                if
                (
                  beam_n
                )
                {
                  rate_n =
                    beam_n
                }
  
                hue_n =
                  (
                    (
                      Math
                        .floor
                        (
                          arcStart_n
                          /
                          arc_n
                        )
                      *
                      arc_n
                    )
                    +
                    shift_n
                  )
                  %
                  360
              
                sat_n = 100
              
                lum_n = 50    //: neutral
  
                beam_n = 0    //: reset
  
                slot_n = -1    //: reset
              
                //-- arcStart_n =   //: next slot
                //--   at_n
  
                break
                
              default:
                break
            }
    
            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]
                  [ `${HSL_s}_o` ]
                    .slot_a
                      .push
                      (
                        rate_n
                        ?
                          {
                            rate_n: rate_n,
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
          }
  
          if
          (
            hsl_s
            ===
            'hue_back'    //: don't draw burst twice
          )
          {
            return
          }
  
          const width_n =
            STAT_W_o
              .stat_o
                [ `${stat_s}_o` ]
                  [ `${HSL_s}_o` ]
                    .canvas_o
                      .width
  
          const burst_o =        //=== draw arguments ===
          {
            rate_a:
              STAT_W_o
                .stat_o
                  [ `${stat_s}_o` ]
                    [ `${HSL_s}_o` ]
                      .slot_a
            ,
            capacity_n:
              hsl_s
              ===
              'hue_front'
              ?
                STAT_W_o
                  .stat_o
                    [ `${stat_s}_o` ]
                      [ `${HSL_s}_o` ]
                        .slot_a              
                          .length
              :
                capacity_n
            ,
            canvas_o:
              STAT_W_o
                .stat_o
                  [ `${stat_s}_o` ]
                    [ `${HSL_s}_o` ]
                      .canvas_o
            ,
            center_n:
              width_n
              *
              .5
            ,
            maxRate_n:
              !maxRate_n     //: not 'hue_front'
              ?
                STAT_W_o
                  .scan_a
                    [ STAT_W_o[`SCAN_${ HSL_s }_rank_n`] ]
                      [0]
                        [0]
              :
                maxRate_n
            ,
            maxpos_n:
              width_n    //: maxpos_n as circle radius
            ,
            thresh_o:
              thresh_o
            ,
          }
          
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]
                [ `${HSL_s}_o` ]
                  .burst_c =
                    new ColorBurst( burst_o )  //: drawing
        }
  
        break

    

      case '{{C_o.STAT_a[2]}}' :      //=== paint ===

        painter_c =
          STAT_W_o
            .stat_o
              [ `${stat_s}_o` ]   //: paint
                [ `${hsl_s}_o` ] //: hue_back, hue_front...
                  .painter_c

        switch
        (
          HSL_s
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
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //;console.time( 'put_hsl__v' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!

    let
    {
      stat_s,
      hsl_s,
      operand_a,
      operation_s,
      deviation_n,
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

    let equalX_n =
      ~~ratioX_n       //: floor equal

    if
    (
      ratioX_n
      >
      1               //: inside lower equal --> 0
    )
    {
      ++equalX_n      //: outside lower equal --> equal above
    }

    equalX_n *=
      rangeX_n        //: [ 0...100 ]

    if
    (
      equalX_n
      >
      100
    )
    {
      equalX_n =
        100          //: clamp
    }

    let opacity_n =   //: in image data, opacity range is [0...255]
    ~~(
        equalX_n
        *
        2.559          //: force to 255 when equalX_n is 100
      )

    let opac_n =
      equalX_n
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
              equalX_n,
              atY_n,                //??* STAT_W_o.pixel_n
              100 - equalX_n,       //??* STAT_W_o.pixel_n,
              rangeY_n,             //??* STAT_W_o.pixel_n,
              'fill'
            )

            .rect__c                //::: clear lower area
            (
              0,
              atY_n,                 //??* STAT_W_o.pixel_n
              equalX_n,              //??* STAT_W_o.pixel_n,
              rangeY_n,              //??* STAT_W_o.pixel_n,
              'clear'
            )

            .fill__c                 //::: mask lower area with opacity
            (
              [
                0,
                0,
                100,
                1 - opac_n           //: lower equals more transparent, upper equals more colored
              ]
            )
            .rect__c      
            (
              0,
              atY_n,                 //??* STAT_W_o.pixel_n
              equalX_n,              //??* STAT_W_o.pixel_n,
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
                              +atOp_o          //: Number cast
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
          let atScan_n = 0;
          atScan_n < length_n;
          ++atScan_n
        )
        {
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





      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //;console.timeEnd( 'put_hsl__v' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  ,



  put_slot__v
  (
    payload_o
  )
  {
    ;console.log(STAT_W_o )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //;console.time( 'put_slot__v' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
    const
      { 
        stat_s
      ,  hsl_s
      ,  angle_n
      ,  range_n
      ,  opacity_n
      ,  stack_b
      ,  dim_a
      } =
        payload_o

    const gap_n =
      360
      /
      range_n
      
    const start_n =
      gap_n
      *
      angle_n

    const end_n =
      start_n
      +
      gap_n

    const scan_a
    =
      hsl_s
      ===
      'linear'
      ?
        STAT_W_o
          .scan_a
            [
              STAT_W_o
                [ `SCAN_hue_n` ]
            ]
      :
        STAT_W_o
          .scan_a
            [
              STAT_W_o
                [ `SCAN_${hsl_s}_n` ]
            ]

    const
    {
      context_o,
      imgData_o
    } =
      STAT_W_o
        .imgData_o
          [ `${stat_s}` ]

    const iData_a =
      imgData_o
        .data

    //?? if
    //?? (
    //??   stack_b
    //?? )
    //?? {
    //??   STAT_W_o
    //??     .clearData__v
    //??     (
    //??       context_o
    //??     , imgData_o
    //??     , opacity_n
    //??     )
    //?? }

    let atHsl_n
    let atScan_a
    let length_n
    let opac_n
  
    for
    (
       atHsl_n = 0;
       atHsl_n < 360;
       ++atHsl_n
    )
    {
      if        //: slot
      (
        atHsl_n
        >=
        start_n
        &&
        atHsl_n
        <
        end_n
      )
      {
        opac_n
        =
          255     //: bright
      }
      else        //: transparent (opacity)
      {
        if
        (
          ! stack_b
        )
        {
          opac_n
          =
            opacity_n
        }
      }

      atScan_a =
        scan_a
          [ atHsl_n ]
        
      length_n =
        atScan_a
          .length
        
      for
      (
         atScan_n = 0;
         atScan_n < length_n;
         ++atScan_n
      )
      {
        if
        (
          opac_n    //: undefined if stack_b, i.e. not modified
        )
        {
          iData_a
            [
              atScan_a
                [ atScan_n ]
                +
                3
            ] =
              opac_n
        }
      }
    }

    context_o
      .putImageData
      (
        imgData_o,
        0,
        0
      )

      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      //;console.timeEnd( 'put_slot__v' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  ,



  put_scale__v
  (
    payload_o
  )
  {
    const
      { 
        stat_s,
        hsl_s,
        scale_n,
        burst_b
      } =
        payload_o

    STAT_W_o
      .scale__n      // scale canvas
      (
        stat_s,
        hsl_s,
        scale_n
      )

    if
    (
      //--> !burst_b
      burst_b
    )
    {
      //--> return
      STAT_W_o
        .stat_o
          [ `${stat_s}_o` ]
            [ `${hsl_s}_o` ]
              .burst_c
                .draw__v()
    }
  }
  ,



  put_slides__v
  (
    payload_o
  )
  {
    const      //!!! mutable interval_n
    {
      id_s         //: start || stop || progress
    , interval_n   //: only to start
    , shift_n      //: idem
    , limit_n      //: idem
    , backward_b   //: idem, from most capacity to less capacity
    , step_b       //: idem, manual step by step
    , opacity_n    //: idem

    }
    =
      payload_o

    switch
    (
      id_s
    )
    {
      case 'stop'
      :
        return void (
          STAT_W_o
            .stopSlide__v()
        )
  
        break
  
      case 'reset'
      :
        STAT_W_o
          .clearData__v
          (
            STAT_W_o
              .imgData_o
                [ '{{C_o.STAT_a[0]}}' ]
                  .context_o
        , STAT_W_o
            .imgData_o
              [ '{{C_o.STAT_a[0]}}' ]
                .imgData_o

          , 255
          )
    
        return void (
          STAT_W_o
            .stopSlide__v()
        )
  
        break
  
      case 'start'
      :
        //=== make  stack ===
        STAT_W_o
          .slideStack_o
            .slot_a
        =
          Array
            .from
            (
             STAT_W_o
               .stat_o
                 [ `burst_o` ]
                   [ `hue_o` ]
                     .slot_a
            )
     
        STAT_W_o
          .slideStack_o
            .slot_a
              .sort        //: descending order
                (
                  (
                    first,
                    second
                  ) =>
                  {
                    if
                    (
                      backward_b
                    )
                    {
                      return (
                        first
                          .rate_n
                        >
                        second
                          .rate_n
                        ?
                          1
                        :
                          first
                            .rate_n
                          <
                          second
                            .rate_n
                          ?
                            -1
                            :
                            0
                      )
                    }
                    else
                    {
                      return (
                        first
                          .rate_n
                        >
                        second
                          .rate_n
                        ?
                          -1
                        :
                          first
                            .rate_n
                          <
                          second
                            .rate_n
                          ?
                            1
                            :
                            0
                      )
                    }
                  }
              )

        let at_n
        =
          STAT_W_o
            .slideStack_o
              .slot_a
                .length

        while
        (
          --at_n
        )
        {
          if
          (
            STAT_W_o
              .slideStack_o
                .slot_a
                  [ at_n ]
          )
          {
            break
          }
        }

        STAT_W_o
          .slideStack_o
            .slot_a
              .length
        =
          at_n
          +
          1     //: truncate slot_a to eliminate null ones

        STAT_W_o
          .slideStack_o
            .atSlot_n
        =
          STAT_W_o
            .slideStack_o
              .slot_a
                .length
    
        STAT_W_o
          .slideStack_o
            .opacity_n
        =
          opacity_n
            
        STAT_W_o
          .slideStack_o
            .step_b
        =
          step_b
            
        STAT_W_o
          .slideStack_o
            .shift_n
        =
          shift_n

        STAT_W_o
          .slideStack_o
            .gap_n
        =
          ~~
          (
            360
            /
            STAT_W_o
              .slideStack_o
                .slot_a
                  .length
          )
      
        if
        (
          shift_n
        )
        {
          STAT_W_o
            .slideStack_o
              .shiftGap_n
          =
            (
              limit_n
              -
              interval_n
            )
            /
            STAT_W_o
              .slideStack_o
                .slot_a
                  .length
        }
        else
        {
          STAT_W_o
            .slideStack_o
              .shiftGap_n
          =
            0
        }

        STAT_W_o
          .slideStack_o
            .stop_b
        =
          false
    
        STAT_W_o
          .clearData__v
          (
            STAT_W_o
              .imgData_o
                [ '{{C_o.STAT_a[0]}}' ]
                  .context_o
        , STAT_W_o
            .imgData_o
              [ '{{C_o.STAT_a[0]}}' ]
                .imgData_o

          , opacity_n
          )
    
        //=== start slideshow ===
        STAT_W_o
          .slideStack_o
            .interval_n    //: store current interval to pause
        =
          interval_n

        STAT_W_o
          .slideStack_o
            .slide_n
        =
          setInterval
          (
            STAT_W_o
                .slide__v
          , interval_n
          )
    
        break
    
      case 'progress'
      :
        let pause_n
        =
          0       //: valid for step_b

        if
        (
          ! step_b
        )
        {
          if 
          (
            ! STAT_W_o
                .slideStack_o
                  .pause_b    //: not yet pause
          )
          {
            STAT_W_o
              .slideStack_o
                .pause_b
            =
              true
      
            pause_n
            =
              +'{{C_o.PLAY_PAUSE_n}}'
          }
          else          //: resume pause
          {
            STAT_W_o
              .slideStack_o
                .pause_b
            =
              false
  
            pause_n
            =
              STAT_W_o
                .slideStack_o
                  .interval_n
          }
        }

        //=== pause || resume slideshow ===
        clearInterval
        (
          STAT_W_o
            .slideStack_o
              .slide_n
        )
    
        STAT_W_o
          .slideStack_o
            .slide_n
        =
          setInterval
          (
            STAT_W_o
              .slide__v
          , pause_n
          )

        break

      default
      :
        break
    }
  }
  ,



  put_magnify__v
  (
    payload_o
  )
  {
    const
      { 
        stat_s
      , x_n
      , y_n
      , wide_n
      , pix_n
      , magnify_b
      } =
        payload_o

    const
    {
      canvas_e
    , context_o
    , imgData_o
    }
    =
      STAT_W_o
        .imgData_o
          [ `${stat_s}` ]

    const pixel_o
    =
      context_o
        .getImageData
        (
          x_n
        , y_n
        , 1
        , 1
        )

    const data_a
    =
      pixel_o
        .data

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_magnify'
        , stat_s: '{{C_o.STAT_a[0]}}'
        , hsl_a:
            [
              RGB_H__n
              (
                ...data_a
              )
            ,  RGB_S__n
              (
                ...data_a
              )
            ,  RGB_L__n
              (
                ...data_a
              )
            ]
        }
      )

    if
    (
      ! magnify_b
    )
    {
      return
    }
    //-->
    const median_n
    =
      wide_n
      >>>
      1

    const width_n
    =
      canvas_e
        .width

    const height_n
    =
      canvas_e
        .height

    const widePix_n
    =
      +'{{C_o.BURST_MAGNIFY_WIDE_n}}'
      *
      +'{{C_o.BURST_MAGNIFY_PIX_n}}'

    let top_n
    ,   left_n
    ,   right_n
    ,   bottom_n

    if
    (
      (
        x_n
        -
        median_n
      )
      <
      0
    )
    {
      left_n
      =
       0

      right_n
      =
        wide_n
    }
    else
    {
      if
      (
        (
          x_n
          +
          median_n
        )
        >
        width_n
      )
      {
        right_n
        =
          width_n

        left_n
        =
          right_n
          -
          wide_n
      }
      else
      {
        left_n
        =
          x_n
          -
          median_n

        right_n
        =
          x_n
          +
          median_n
      }
    }

    if
    (
      (
        y_n
        -
        median_n
      )
      <
      0
    )
    {
      top_n
      =
       0

      bottom_n
      =
        wide_n
    }
    else
    {
      if
      (
        (
          y_n
          +
          median_n
        )
        >
        height_n
      )
      {
        bottom_n
        =
          height_n

        top_n
        =
          bottom_n
          -
          wide_n
      }
      else
      {
        top_n
        =
          y_n
          -
          median_n

        bottom_n
        =
          y_n
          +
          median_n
      }
    }

    const pixel_a
    =
      context_o
        .getImageData
        (
          left_n
        , top_n
        , wide_n
        , wide_n
        )
        .data
  
  
    const magnifyContext_o
    =
      STAT_W_o
        .stat_o
        [ `${stat_s}_o` ]
        .hue_magnify_img_o
          .context_o
  
    magnifyContext_o
      .clearRect
      (
        0
      , 0
      , widePix_n
      , widePix_n
      )
  
    for
    (
      let at_n
      =
        0
    , atMag_n
      =
        0
      ;
      at_n
      <
      pixel_a
        .length
      ;
      at_n
      +=
        4
    , ++atMag_n
    )
    {
      magnifyContext_o
        .fillStyle
      =
        `rgb(${pixel_a[at_n]},${pixel_a[at_n  +1]},${pixel_a[at_n + 2]})`
  
      magnifyContext_o
        .fillRect
        (
          STAT_W_o
            .magnify_a
              [atMag_n]
                [0]
        , STAT_W_o
            .magnify_a
              [atMag_n]
                [1]
          , widePix_n
          , widePix_n
        )
    }
  }
  ,



  put_magnify_dim__v
  (
    payload_o
  )
  {
    const
      {
        wide_n
      , pix_n
      } =
        payload_o

    STAT_W_o
      .magnify_a
    =
      []

    let at_n
    =
      0

    for
    (
      let atY_n
      =
      0
      ;
      atY_n
      <
      wide_n
      ;
      ++atY_n
    )
    {
      for
      (
        let atX_n
        =
        0
        ;
        atX_n
        <
        wide_n
        ;
        ++atX_n
      )
      {
        STAT_W_o
          .magnify_a
            [at_n++]
        =
          [
            atX_n
            *
            pix_n
          , atY_n
            *
            pix_n
          ]
      }
    }
  }
  ,



  slide__v
  ()
  {
    let
      {
        slot_a
      , shift_n
      , gap_n
      , step_b
      }
    =
      STAT_W_o
        .slideStack_o

    if
    (
      STAT_W_o
        .slideStack_o
          .atSlot_n--
      >
      -1
    )
    {
      const slot_o
      =
        slot_a
          [
            STAT_W_o
              .slideStack_o
                .atSlot_n
          ]
  
      if
      (
        slot_o    //!!! can't be null
      )
      {
        const firstSlot_n =
          slot_o
            .hsl_a
              [ 0 ]
    
        const lastSlot_n =
          firstSlot_n
          +
          gap_n
  
        STAT_W_o
          .post__v
          (
            {
              task_s: 'PUT_hue'
            , stat_s: '{{C_o.STAT_a[0]}}'
            , hue_a:
                [
                  firstSlot_n
                , lastSlot_n
                ]
            }
          )
  
        let context_o
        =
          STAT_W_o
            .imgData_o
              [ '{{C_o.STAT_a[0]}}' ]
                .context_o
    
        let imgData_o
        =
          STAT_W_o
            .imgData_o
              [ '{{C_o.STAT_a[0]}}' ]
                .imgData_o

        let iData_a
        =
          imgData_o
            .data

        let atHsl_n
        let atScan_a
        let length_n
      
        for
        (
           atHsl_n = firstSlot_n;
           atHsl_n < lastSlot_n;
           ++atHsl_n
        )
        {
          atScan_a =
            STAT_W_o
              .scan_a
                [
                  STAT_W_o
                    [ `SCAN_hue_n` ]
                ]
                  [ atHsl_n ]
  
          if
          (
            atScan_a
          )
          {
            length_n =
              atScan_a
                .length
              
            for
            (
               atScan_n = 0;
               atScan_n < length_n;
               ++atScan_n
            )
            {
              iData_a
                [
                  atScan_a
                    [ atScan_n ]
                    +
                    3
                ] =
                  255
            }
          }
          
        }
    
        context_o
          .putImageData
          (
            imgData_o,
            0,
            0
          )
      }
  
      if
      (
        shift_n      //: modify interval
        ||
        step_b
      )
      {
        clearInterval
        (
          STAT_W_o
            .slideStack_o
              .slide_n
        )
  
        STAT_W_o
          .slideStack_o
            .slide_n
        =
          setInterval
          (
            STAT_W_o
              .slide__v
          , step_b
            ?
              +'{{C_o.PLAY_PAUSE_n}}'
            :
              STAT_W_o
                  .slideStack_o
                    .interval_n
          )
          
        STAT_W_o
          .slideStack_o
            .interval_n
        +=
          STAT_W_o
            .slideStack_o
              .shiftGap_n
      }
    }
    else
    {
      STAT_W_o
        .stopSlide__v()
    }
  }
  ,



  stopSlide__v
  ()
  {
    clearInterval
    (
      STAT_W_o
        .slideStack_o
          .slide_n
    )

    STAT_W_o
      .slideStack_o
        .slide_n
    =
      0        //: reset

    STAT_W_o
      .slideStack_o
        .pause_b
    =
      false    //: reset

    STAT_W_o
      .slideStack_o
        .interval_n
    =
      0        //: reset

    STAT_W_o
      .post__v
      (
        {
          task_s: 'PUT_hue'
        , stat_s: '{{C_o.STAT_a[0]}}'
        , hue_a: null    //: stop slideshow
        , stop_b: true   //: slideshow
        }
      )
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
        .message_a
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

  if
  (
    ! STAT_W_o
        .idb_o
  )
  {
    STAT_W_o
      .idb_o
    =
      new Idb
      (
        '{{A_o.ID_s}}_idb'
      , '{{A_o.ID_s}}_store'
      )
  }
}
