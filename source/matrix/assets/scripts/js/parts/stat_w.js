
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

  status_o:
  {
    scan_b: false,
  }
  ,

  message_o:
  [
    'GET_scan',
    'GET_status',
    'PUT_canvas',
  ]
  ,

  scan_a: null,
  //:[
  //:   [0]: hue_a[]
  //:   [1]: hueCapacities_a
  //:   [2]: sat_a[]
  //:   [3]: satCapacities_a[],
  //:   [4]: lum_a[]
  //:   [5]: lumCapacities_a[],
  //:],

  client_o: {},   //: {{C_o.STAT_a[0]}}: { client_o, canvas_e, context_o }
                  //: {{C_o.STAT_a[1]}}
                  //: {{C_o.STAT_a[2]}}

  script_o: new Set,   //: importScript loaded



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
    client_s
  )
  {
    let times_n = 100    //: {{C_o.AWAIT_SCAN_n}} = 5s

    while                   //: wait for scan
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
          .sleep__v( 50 )    //: {{C_o.AWAIT_SCAN_SLEEP_n}}
      }
      else
      {
        STAT_W_o
          .post__v
            (
              {
                client_s: client_s,
                task_s: 'PUT_error',
                error_s: 'scan is not available'
              }
            )
        
        return false
      }
    }

    return true
  }
  ,



  //=== GET    
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
        .scan_a = []
  
      //=== HUE
      let capacity_n = ~~'{{C_o.HUE_CAP_n}}'
      
      STAT_W_o
        .scan_a
          [~~'{{C_o.SCAN_HUE_n}}'] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [~~'{{C_o.SCAN_HUE_CAP_n}}'] =
            new Array( capacity_n )
        
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [~~'{{C_o.SCAN_HUE_n}}']
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [~~'{{C_o.SCAN_HUE_CAP_n}}']
              [capacity_n] = 0
      }
      
      //=== SAT
      capacity_n = ~~'{{C_o.SAT_CAP_n}}'
      
      STAT_W_o
        .scan_a
          [~~'{{C_o.SCAN_SAT_n}}'] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [~~'{{C_o.SCAN_SAT_CAP_n}}'] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [~~'{{C_o.SCAN_SAT_n}}']
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [~~'{{C_o.SCAN_SAT_CAP_n}}']
              [capacity_n] = 0
      }
      
      //=== LUM
      capacity_n = ~~'{{C_o.LUM_CAP_n}}'
      
      STAT_W_o
        .scan_a
          [~~'{{C_o.SCAN_LUM_n}}'] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [~~'{{C_o.SCAN_LUM_CAP_n}}'] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [~~'{{C_o.SCAN_LUM_n}}']
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [~~'{{C_o.SCAN_LUM_CAP_n}}']
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
      
        STAT_W_o
          .scan_a[~~'{{C_o.SCAN_HUE_n}}']
            [hue_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[~~'{{C_o.SCAN_HUE_CAP_n}}']
            [hue_n] += 1
      
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
          .scan_a[~~'{{C_o.SCAN_SAT_n}}']
            [sat_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[~~'{{C_o.SCAN_SAT_CAP_n}}']
            [sat_n] += 1
    
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
          .scan_a[~~'{{C_o.SCAN_LUM_n}}']
            [lum_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[~~'{{C_o.SCAN_LUM_CAP_n}}']
            [lum_n] += 1
      }
    
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      ;console.timeEnd( 'scan' )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
  }
  ,
  


  get_status__v
  ()
  {
    STAT_W_o
      .post__v
      (
        {
          //: CLIENT_ALL_s
          task_s: 'PUT_status',
          status_o: STAT_W_o.status_o
  
        },
        [ STAT_W_o.status_o ]
      )
  }
  ,



  //=== PUT    
  put_canvas__v        //: client OffScreenCanvas
  (
    payload_o
  )
  {
    const { client_s, id_s } =
      payload_o

    if
    (
      !  STAT_W_o
        .client_o
          [ client_s ]
    )
    {
      STAT_W_o
        .client_o
          [ client_s ] = {}
    }

    STAT_W_o
      .client_o
        [ client_s ]
          [ id_s ] =
          {
            //: canvas_o,
            //: context_o
          }

    STAT_W_o
      .client_o
        [ client_s ]
          [ id_s ]
            .canvas_o =
              payload_o
                .canvas_e

    const context_o =
      payload_o
        .canvas_e
          .getContext( '2d' )    //;console.log( STAT_W_o.client_o[ client_s ] )

    const pixel_n =
      payload_o
        .pixel_n

    //XX context_o
    //XX   .setTransform
    //XX   (
    //XX     pixel_n, 0, 0,
    //XX     pixel_n, 0, 0
    //XX   )
    context_o
      .scale
      (
        pixel_n,
        pixel_n
      )
    

    STAT_W_o
      .client_o
        [ client_s ]
          [ id_s ]
            .context_o =
                context_o
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



post__v    //: post to client
(
  payload_o
)
{
  STAT_W_o
    .port_o
      .postMessage( payload_o )
}
,



handleError__v:
(
  error_o
) =>
  console
    .log`ERROR: ${error_o.message}`
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
