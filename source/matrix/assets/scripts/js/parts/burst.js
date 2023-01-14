// === burst.js ===

const BUR_o =
{
  //++ work_s:
  //++ width_s:
  //++ height_s:
  //++ canvasWidth_n:   //: init in screen__v

  
    vScale_n: 2
  , hue_n: 0           //: selected hue
  , atAngle_n: 0
  , download_s: ''    //: download suggested file name
  , fullsize_n: 1     //: keep scale (eventSizeFull__v + eventSizeTiny__v)
  , freeze_b: false    //: freeze || unfreeze hue selection

  , status_o: null
  , equal_a: null
  , atEqual_o: null
  , trace_o: {}

  , hue_o:
    {
      rangeY_n: 1,     //: C_o.BURST_RANGE_n
      shift_n: 0,      //: from burst_hue_back
    }

  , scale_o:
    {
      hue_n: 1,     //: C_o.BURST_SCALE_n
      sat_n: 1,
      lum_n: 1,
    }

  , thresh_o:
    {
      hi_n: 100,    //: C_o.BURST_THRESH_HI_n   left to right
      lo_n: 0,      //: C_o.BURST_THRESH_LO_n
    }

  , slot_o:
    {
      hue: 360
    , sat: 101
    , lum: 101
    }

  , slideshow_o:
    {
      play_b: false
    , progress_n: 0
    }

  , eventKey_a:
    [
      'ArrowRight' //: toggle img_position checked
    , 'ArrowLeft'  //: idem
    , '+'          //: increment scale
    , '-'          //: decrement scale
    , 'p'          //: show/hide palette
    , 'e'          //: show/hide equalizer
    , 'i'          //: show/hide Image
    , ' '          //: suspend || resume slideshow
    , 's'          //: (+ ctrlKey) save image
    ]


  ,
  message__v
  (
    payload_o
  )
  {
    switch
    (
      payload_o
        .task_s
    )
    {
      case 'PUT_rate':
        BUR_o
          .put_rate__v( payload_o )

        break
    
      case 'PUT_equal':
        BUR_o
          .equal_a =
            payload_o
              .equal_a

        break

      case 'PUT_canvas_img':
        BUR_o
          .put_canvas_img__v( payload_o )

        break
    
      case 'PUT_hue':
         BUR_o
           .put_hue__v( payload_o )

        break
    
      case 'PUT_status':
        BUR_o
          .status_o =
            payload_o
              .status_o      //: { stat_s, task_s, status_o }
      
        break
    
      case 'PUT_error':
        console.log( `ERROR: ${payload_o.error_s}` ) //... TODO: load error page ...
        
        break
    
      default:
        break
    }
  }


  ,
  async saveFile__o
  (
    blob_o,
    name_s     //: file name
  )
  {
    try
    {
      const fileName_s       //!!!! TEMPORARY FILENAME
      =
        name_s
          .replaceAll
          (
            '{{C_o.ID_PART_DELIM_s}}'
          , '{{C_o.FILE_ESCAPE_s}}'
          )

      const handle_o =
        await
        window
          .showSaveFilePicker
          (
            {
              suggestedName: fileName_s
              ,
              types:
                [
                  {
                    accept:
                      {
                        'image/jpg':
                          [
                            '.jpg'
                          ]
                      }
                      ,
                  }
                ]
              ,
            }
          )

      const writable =
        await
        handle_o
          .createWritable()

      await 
      writable
        .write( blob_o )

      await
      writable
        .close()

      return handle_o
    }
    catch
    (
      error_o
    )
    {
      console
        .error
        (
          error_o
            .name
          ,
          error_o
            .message
        )
    }
  }



,
  put_rate__v
  (
    payload_o
  )
  {
    const
      {
        hsl_s
        ,
        rate_n
        ,
        slot_a
        ,
        slot_n
        ,
        capacity_n
        ,
        equal_a
      } =
        payload_o

    BUR_o
      .atEqual_o =
        equal_a

    let html_s =
      slot_a
        [0]

    if
    (
      slot_a
        .length
      >
      1
    )
    {
      html_s +=
        `<b class=range-separator>{{C_o.RANGE_GAP_s}}</b>${slot_a[1]}`
    }

    document
      .getElementById( '{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_playback_progress' )
        .innerHTML
    =
      html_s

    BUR_o
      .trace_o
        [`${hsl_s}_e`]
          .innerHTML =
            html_s

    const ratio_n =
      (
        rate_n
        /
        capacity_n
      )
      *
      100

    BUR_o
      .trace_o
        [ `${hsl_s}_ratio_e` ]
          .innerHTML =
            new Intl
              .NumberFormat
              (
                'fr-FR', 
              )
              .format
              (
                Number
                  .parseFloat( ratio_n )
                  .toFixed( 3 )
              )
    if
    (
      BUR_o
        .freeze_b
      &&
      hsl_s
      ===
      'hue'
    )
    {
      BUR_o
        .slotHue__v( slot_a )

      BUR_o
        .satLum__v()
    }
  }
  


  ,
  slotHue__v
  (
    hue_a
  )
  {
    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_img_slot_fromHue_n`
      , hue_a
          [0]
      )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_img_slot_toHue_n`
      , hue_a
          [1]
      )
  }


  ,
  put_hue__v
  (
    payload_o
  )
  {
    const hue_a
    =
      payload_o
        .hue_a

    let legend_s
      
    if    //: slideshow not completed
    (
      hue_a
    )
    {
      BUR_o
        .slotHue__v( hue_a )

      legend_s
      =
        hue_a
          [0]

      if     //: range [n - n+1], 360 slots
      (
        hue_a
          [1]
        >
        hue_a
          [0]
        +
        1
      )
      {
        legend_s
        +=
        `<b class=range-separator>{{C_o.RANGE_GAP_s}}</b>${hue_a[1]}`
      }


      if
      (
        BUR_o
          .slideshow_o
            .play_b
      )
      {
        const progress_n
        =
          100
          /
          //--slot_n
          BUR_o
            .slot__n ( 'hue' )
  
        const progress_e
        =
          document
            .getElementById( 'progress_{{C_o.STAT_a[0]}}_playback_progress' )
    
        BUR_o
          .slideshow_o
            .progress_n
        +=
        progress_n
  
        progress_e
          .value
        =
          BUR_o
            .slideshow_o
              .progress_n

        document
          .getElementById( '{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_playback_progress' )
            .innerHTML
        =
          legend_s
      }
    }

    if
    (
      payload_o
        ?.stop_b
    )
    {
      BUR_o
        .slideshow_o
          .play_b
      =
        false        //: play over
    }
  }
  


  ,
  async put_canvas_img__v
  (
    payload_o
  )
  {
    document
      .getElementById( 'dialog_{{C_o.STAT_a[0]}}_download'  )
        .close()
      
    BUR_o
      .saveFile__o
      (
        payload_o
          .blob_o
      , BUR_o
          .download_s
      )
  }
  


  ,
  get_rate__v
  (
    event_o,
    hsl_s
  )
  {
    const slot_n
    =
      BUR_o
        .slot__n ( hsl_s )

    const angle_n
    =
      BUR_o
        .angle__n
        (
          event_o,
          slot_n
        )

    BUR_o
      .atAngle_n
    =
      angle_n

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'GET_rate'
          , stat_s: '{{C_o.STAT_a[0]}}'
          , hsl_s:  hsl_s
          , angle_n: angle_n
          , slot_n: slot_n
          }
        )
  }
  


  ,
  get_img__v
  (
    source_s
  )
  {
    const canvas_e =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )

    canvas_e
      .width =
        BUR_o
          .imgWidth_n

    canvas_e
      .height =
        BUR_o
          .imgHeight_n

    const offCanvas_e =
      canvas_e
        .transferControlToOffscreen()
  
    const centerX =
      BUR_o
        .imgWidth_n
      *
      .5
    
    const centerY =
      BUR_o
        .imgHeight_n
      *
      .5

    let url_s

    if
    (
      LOC_o
        .search_s
      &&
      LOC_o
        .search_s
          .match( /\/[^\/]+\/[^\/]+\/[^\/]+\// )    //: work_s ID
    )
    {
      BUR_o
        .work_s
      =
        source_s
          .split
          (
            /\/[^\/]+\/[^\/]+\/[^\/]+\//
          )
            [0]

      url_s
      =
        `/{{C_o.IMG_DIR_s}}${LOC_o.search_s}.jpeg`  //: begining slash for site relative url    }
    }
    else
    {
      if
      (
        BUR_o
          .source_s
      )
      {
        BUR_o
          .work_s
        =
        url_s
        =
          BUR_o
            .source_s
      }
      else
      {
        url_s
        =
          LOC_o
            .search_s
      }
    }

    BUR_o
      .worker_o           //! using port postMessage directly
        .port_o           //! to avoid error:
          .postMessage    //! 'OffscreenCanvas could not be cloned because it was not transferred'
          (
            {
              task_s: 'GET_img'
            , stat_s: '{{C_o.STAT_a[0]}}'
            , rect_s: `${centerX} ${centerY} ${BUR_o.imgWidth_n} ${BUR_o.imgHeight_n}`
            , scale_n: 1
            , url_s: url_s
            , canvas_e: offCanvas_e
            , storeBitmap_b: false
            , pixel_n:  window.devicePixelRatio    //????
            }
            , [ offCanvas_e ]
          )
  }
  


  ,
  hsl__s
  ()
  {
    return (
      document
        ?.querySelector( `input[name="burst_nav"]:checked` )
          ?.id
            .slice( -3 )         //: element ID ends with: 'hue' || 'sat' || 'lum'
    )
  }
  


  ,
  locate__a
  (
    event_o,
    hsl_s
  )
  {
    const center_n =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}` )    //: all canvas (hue, sat, lum) have same size
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
      
    return (
      [
        x_n,
        y_n
      ]
    )
  }
  


  ,
  angle__n    //: in range [0...359]
  (
    event_o,
    range_n    //: 360 || 101 i.e. hue || sat or lum
  )
  {
    const center_n =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue` )    //: all canvases (hue, sat, lum) have same size
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

    angle_n =
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

    if
    (
      range_n
      ===
      360
    )
    {
      angle_n =
        (
          angle_n
          +
          BUR_o
           .hue_o
             .shift_n
        )
        %
        360
    }

    return angle_n
  }
  


  ,
  slot__n
  (
    hsl_s
  )
  {
    let slot_n =
      BUR_o
        .slot_o
          [ hsl_s ]

    if
    (
      slot_n
      ===
      360
    )
    {
      let label_e =
        document
          .querySelector( `li:has(input[name="{{C_o.STAT_a[0]}}_hue_slot"]:checked)` )

      if
      (
        label_e
      )
      {
        slot_n =        //: 360, 120...101..6, 3, 1
        360
        /
        +label_e              //: Number cast
          .dataset
            .slot_n        //: 1, 3, 6...180
      }
    }
                            //=> slot_n = 360, 120...101..6, 3, 2  (1 excluded)

    return slot_n
  }
  


  ,
  satLum__v
  (
    event_o
  )
  {
    let satlum_s      //: sat + lum ColorBurst access
    =
      'none'
    
    if
    (
      document
        .querySelector( `#{{C_o.LIST_ID_s}}_{{C_o.STAT_a[0]}}_hue_slot li[data-slot_n="1"] input:checked` )
    )
    {
      satlum_s
      =
        'flex'
    }

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_satlum_s`,
        satlum_s
      )
  }


  ,
  draw__v
  ()
  {
    for    //=== worker draw sliders initial state
    (
      let hsl_s
      of
      [
        'hue_back',
        'hue_front',
      ]
    )
    {
      BUR_o
        .worker_o
          .post__v
          (
            { 
              task_s: 'PUT_draw'
              ,
              stat_s: '{{C_o.STAT_a[0]}}'
              ,
              hsl_s: hsl_s
              ,
              back_hue_n: +DOM_o
                            .rootVar__s( '--{{C_o.STAT_a[0]}}_hue_back' )
              ,
              rangeY_n: +BUR_o
                          .hue_o
                            .rangeY_n
              ,
              shift_n: BUR_o
                        .hue_o
                          .shift_n
              ,
              thresh_o: BUR_o
                          .thresh_o
              //??? ,
              //??? maxpos_n: BUR_o
              //???            .scale_o
              //???              .hue_n
              //??? ,
            }
          )
    }
  }
  

  ,
  opacity__n
  ()
  {
    return ~~(
        (
          //-- +input_e            //: Number cast
          +document            //: Number cast
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_bg_opacity` )
             .value
          /
          100
        )
        *
        255      //: [0...255]
      )
  }



  ,
  pick__v
  (
      opacity_n       //: optional
    , angle_n         //: optional
    , hsl_s='hue'     //: optional
  )
  {
    if
    (
      opacity_n
      ===
      undefined
    )
    {
      //-- const input_e
      //-- =
      //--   document
      //--     .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_bg_opacity` )
                
      opacity_n
      =
      //--  ~~(
      //--    (
      //--      +input_e            //: Number cast
      //--        .value
      //--      /
      //--      100
      //--    )
      //--    *
      //--    255      //: [0...255]
      //--  )
      BUR_o
        .opacity__n()
    }

    if
    (
      angle_n
      ===
      undefined
    )
    {
      angle_n
      =
        BUR_o
          .atAngle_n
    }
    
    const canvas_e
    =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s:  'PUT_slot'
          , stat_s:  '{{C_o.STAT_a[0]}}'
          , hsl_s:   hsl_s
          , angle_n: angle_n
          , range_n:
              angle_n
              ===
              360      //: reset
              ?
                0
              :
                BUR_o
                  .slot__n
                  (
                    hsl_s
                  )
          , opacity_n: opacity_n
          , stack_b:
              BUR_o
                .stack_b
          , dim_a:
              [
                canvas_e
                  .width
                ,
                canvas_e
                  .height
              ]
          }
        )

    BUR_o
      .stack_b
    =
      false    //: reset
       
  }
  


  ,
  trace__v
  (
    event_o,
    hsl_s
  )
  {
    BUR_o
      .freeze_b
    =
      ! BUR_o          //: toggle freeze_b
          .freeze_b

    let color_s

    let pointer_s

    if
    (
      BUR_o
        .freeze_b
    )
    {
      color_s
      =
        '{{S_o.bg_higher}}'

      pointer_s
      =
        'cell'
    }
    else
    {
      color_s
      =
        '{{S_o.bg_lower}}'

      pointer_s
      =
        'var(--{{C_o.STAT_a[0]}}_trace_pointer_s)'
    }

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_trace_color`,
        color_s
      )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_trace_pointer`,
        pointer_s
      )

    let item_e
    =
      document
        .querySelector( `li:has(input[name="{{C_o.STAT_a[0]}}_hue_slot"]:checked)` )

    if
    (
      item_e
      &&
      +item_e              //: Number cast
        .dataset
          .slot_n 
      ===
      1                  //: not for hue ranges
    )
    {
      for
      (
        let hsl_s
        of
        [
          'sat'
        , 'lum'
        ]
      )
      {
        BUR_o
          .worker_o
            .post__v
            (
              { 
                task_s: 'PUT_draw'            //: instanciate sat + lum colorBurst
              , stat_s: '{{C_o.STAT_a[0]}}'
              , hsl_s: hsl_s
              , back_hue_n:
                  +(BUR_o            //: Number cast
                      .trace_o
                        .hue_e
                          .innerHTML
                  )
              , shift_n: BUR_o
                          .hue_o
                            .shift_n
              , thresh_o: BUR_o
                            .thresh_o
                //???,
                //??? maxpos_n: BUR_o
                //???             .scale_o
                //???               [`${hsl_s}_n`]
                //??? ,
              }
            )
      }
    }

    BUR_o
      .stack_b
    =
      event_o
        .ctrlKey

    BUR_o
      .pick__v()
  }
  


  ,
  range__v
  (
    range_e,
    callback_f
  )
  {
    const var_s
    =
      range_e
        .id
          .includes( 'scale' )
      ?
        `{{C_o.STAT_a[0]}}_scale`
      :
        ''

    UI_o
      .rangeVar__v
      (
        range_e
      , var_s
      )
  
    callback_f
    &&
    callback_f
    (
      range_e
        .id
    , range_e
        .value
    )
  }
  


  ,
  eventKey__v    //: must prevent default for space key
  (
    event_o
  )
  {
    if
    (
      ! BUR_o
        .eventKey_a
          .includes
          (
            event_o
              .key
          )
    )
    {
      return     //: let event buble
    }

    event_o
      .preventDefault()

    let input_e

    switch
    (
      event_o
        .key
    )
    {
      case
        ' '     //: SPACE key
      :
        BUR_o
          .eventImg_slideshow__v
          (
            event_o
          )

        break

      case
        'ArrowRight'     //: > keypad
      :
        if
        (
          document
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_position` )
              .checked
        )
        {
          if
          (
            ! document
                .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )
                  .classList
                    .contains( 'fullsize' )
          )
          {
            BUR_o
              .eventSizeFull__v()
          }
        }
        else
        {
          document
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_position` )
              .checked
          =
            true
        }

        break

      case
        'ArrowLeft'     //: < keypad
      :
        if
        (
          document
            .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )
              .classList
                .contains( 'fullsize' )
        )
        {
          BUR_o
            .eventSizeTiny__v()
        }
        else
        {
          if
          (
            document
              .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_position` )
                .checked
          )
          {
            document
              .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_position` )
                .checked
            =
              false
          }
        }
        
        break

      case
        '+'    //: increment scale
      :
        input_e
        =
          document
            .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_dock_scale' )

          if
          (
            +input_e    //: Number cast...
              .value
            <
            +input_e
              .max
          )
          {
            input_e
              .value
            =
              +input_e
                .value
              +
              +input_e
                .step

            BUR_o
              .eventRange__v
              (
                {
                  target:
                    input_e
                }
              )
          }

        break

      case
        '-'    //: decrement scale
      :
        input_e
        =
          document
            .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_dock_scale' )

          if
          (
            +input_e    //: Number cast...
              .value
            >
            +input_e
              .min
          )
          {
            input_e
              .value
            =
              +input_e
                .value
              -
              +input_e
                .step

            BUR_o
              .eventRange__v
              (
                {
                  target:
                    input_e
                }
              )
          }


        break

      case
        's'
      :
        if
        (
          event_o
            .ctrlKey
        )
        {
          BUR_o
            .eventImg_download__v
            (
              false      //: don't  pick
            )
        }

        break

      case
        'p'    //: show/hide palette
      :
        document
          .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_settings' )
            .checked
        =
          ! document
              .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_settings' )
                .checked
          
        break

      case
        'e'    //: show/hide equalizer
      :
        document
          .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_equal' )
            .checked
        =
          ! document
              .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_equal' )
                .checked

        break

      case
        'i'    //: show/hide Image
      :
        document
          .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img' )
            .checked
        =
          ! document
              .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img' )
                .checked

        break

      default 
      :
        break
    }
  }



  ,
  eventRange__v        //: scale, threshold sliders
  (
    event_o
  )
  {
    BUR_o
      .range__v
      (
        event_o
          .target
        , (
            range_s,    //: id
            value_s
          ) =>
            {
              const hsl_s =
                BUR_o
                  .hsl__s()
  
              switch
              (
                true
              )
              {
                case range_s
                      .includes( 'scale' )
                :
                  BUR_o
                    .scale_o
                      [ `${hsl_s}_n` ] =
                        +value_s      //: Number cast
  
                  BUR_o
                    .worker_o
                      .post__v
                      (
                        { 
                          task_s:  'PUT_scale'
                          ,
                          stat_s:  '{{C_o.STAT_a[0]}}'
                          ,
                          hsl_s:  hsl_s
                          ,
                          scale_n: BUR_o
                                     .scale_o
                                       [`${hsl_s}_n`]
                          ,
                          burst_b: true    //:  redraw
                        }
                      )
  
                  DOM_o
                    .rootVar__v
                    (
                      `--{{C_o.STAT_a[0]}}_equal`
                    , 'none'
                    )
  
                  break
  
                case range_s
                       .includes( 'thresh' )
                :
                  let range_n =
                    +event_o    //: Number cast
                      .target
                        .value
  
                  let atRange_s
  
                  if
                  (
                    range_s
                      .endsWith( 'hi' )   //: left to right slider
                  )
                  {
                    atRange_s = 'hi'
                      
                    range_n =
                      100
                      -
                      range_n
                  }
                  else
                  {
                    atRange_s = 'lo'
                  }
  
                  BUR_o
                     .thresh_o
                      [ `${atRange_s}_n` ] =
                      range_n
  
                  if
                  (
                    (
                      BUR_o
                         .thresh_o
                           .hi_n
                      <=
                      BUR_o
                         .thresh_o
                           .lo_n
                    )
                  )
                  {
                    DIA_o
                      .open__v
                      (
                        {
                          '{{C_o.LABEL_ID_s}}': `Attention`
                        , '{{C_o.PARAGRAPH_ID_s}}': `Les seuils haut et bas s'entrecroisent`
                        , option_a:
                          [
                            'accept'
                          ]
                        }        
                      )
                    
                    await
                    DIA_o
                      .confirm__b()
              
                     return
                  }
                  //-->
                  BUR_o
                    .draw__v()
  
                  break
  
                case range_s
                      .includes( 'opacity' )
                :
                  BUR_o
                    .pick__v()  //:stack_b = false
  
                  break

                default    //: reserve other cases
                :  break
              }
  
            }
        )
  }
  


  ,
  eventSlot__v        //: hue range list
  (
    event_o
  )
  {
    const slot_e =
      event_o
        .target
          .closest( `li` )

    if
    (
      slot_e
    )
    {
      BUR_o
        .hue_o
          .rangeY_n =
            +slot_e             //: Number cast
              .dataset
                .slot_n

      BUR_o
        .draw__v()

      BUR_o
        .satLum__v()
    }

  }
  


  ,
  eventShift__v       //: hue start set
  (
    click_o
  )
  {
    click_o
      .preventDefault()

    const label_e =
      click_o
        .target
          .closest( `label` )

    if
    (
      label_e
    )
    {
      const hsl_s =
        label_e
          .id
            .split( '_' )
              [2]
    
      let shift_n =
        +document             //: Number cast
          .getElementById( `output_{{C_o.STAT_a[0]}}_${hsl_s}` )
            .value

      const back_n =    //: active shift
        +DOM_o
          .rootVar__s
          (
            `--{{C_o.STAT_a[0]}}_${hsl_s}_back`
          )

      if
      (
        shift_n
        <
        back_n
      )
      {
        shift_n =
          (
            shift_n
            +
            360
          )
          %
          360
      }

      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_${hsl_s}_back`,
          shift_n
        )
  
    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
        -(       //: negative value for css position
          360
          *
          BUR_o
            .vScale_n
        )
      )

      BUR_o
        .hue_o
          .shift_n =
            shift_n

      BUR_o
        .draw__v()

      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_img_hue`
          ,
          shift_n
        )
    }
  }
  


  ,
  eventHsl__v        //: hue start trace
  (
    event_o
  )
  {
    const
    [
      ,
      ,
      hsl_s
    ] =
      event_o
        .target
          .id
            .split( '_' )

    const
    {
      offsetX,
      offsetY
    } =
      event_o
    
    const offsetY_n =
      +offsetY            //: Number cast

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
        -(       //: negative value for css position
          360
          *
          BUR_o
            .vScale_n
          -
          offsetY_n
        )
      )

    const shift_n =
      (
        ~~(
            offsetY_n
            /
            BUR_o
              .vScale_n
          )
        +
        BUR_o
          .hue_o
            .shift_n
      )
      %
      360

    document
      .getElementById( `output_{{C_o.STAT_a[0]}}_${hsl_s}` )
        .value =
          shift_n
  }
  


  ,
  eventTrace__v      //: hue, sat, lum trace
  (
      event_o
  )
  {
    const hsl_s
    =
      BUR_o
        .hsl__s()

    if
    (
      ! BUR_o
        .freeze_b
      ||
      hsl_s
      !==
      'hue'
    )
    {
      BUR_o
        .get_rate__v
        (
          event_o
        , hsl_s
        )

      if
      (
        event_o
          .type
        ===
        'click'
        &&
        event_o
          .altKey    //: equalizer
      )
      {
        BUR_o
          .eventEqual__v
          (
            event_o
          , hsl_s
          )
      }
    }
    
    if
    (
      event_o
        .type
      ===
      'click'
      &&
      hsl_s
      ===
      'hue'
    )
    {
      BUR_o
        .trace__v
        (
          event_o
        , hsl_s
        )
    }
  }
  


  ,
  eventEqual__v
  (
      event_o,
      hsl_s='hue'
  )
  {
    if     //: must check if atEqual_o is null
    (
      BUR_o
        .atEqual_o
    )
    {
      let
        {
          startX_n
          ,
          startY_n
        } =
          BUR_o
            .atEqual_o
          
      startX_n -=
        BUR_o
          .canvasWidth_n
        *
        .5
  
      startY_n -=
        BUR_o
          .canvasWidth_n
        *
        .5

      const radius_n =
        Math
          .sqrt
          (
            startX_n
            *
            startX_n
            +
            startY_n
            *
            startY_n
          )
          *
          2
          
      let display_s =
        radius_n
        <
        .1
        ?
          'none'
        :
          'block'
  
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_equal`,
          display_s
        )
  
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_equal_scale`,
          (
            radius_n
            /
            BUR_o
              .canvasWidth_n
          )
        )
    }
  }
  ,

  
  
  eventImg_reset__v
  ()
  {
    BUR_o
      .pick__v
      (
        +'{{C_o.BURST_IMG_RESET_n}}'
      , 360    //: reset all
      )
  }



  ,
  eventImg_download__v
  (
    pick_b=true         //: false for playing snapshot
  )
  {
    let background_b    //: no rgb_a if transparent background is selected
    =
      DOM_o
        .rootVar__s( '--{{C_o.STAT_a[0]}}_img_background' )
      !==
      'transparent'

    let suffix_s
    let img_b
    
    if
    (
      document
        .querySelector( `#{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_position:checked` )
    )
    {
      img_b
      =
        true

      suffix_s
      =
        'img'
    }
    else
    {
      for
      (
        let hsl_s
        of
        [
          'hue'
        , 'sat'
        , 'lum'
        ]
      )
      {
        if
        (
           document
             .querySelector( `#{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}:checked` )
        )
        {
          suffix_s
          =
            hsl_s
  
          break
        }
      }
    }

    const date_s
    = DATE_o
        .dataTimeNumeric__s()
      
    const source_s
    =
      BUR_o
        .work_s    //!!!!!!!! TODO for import image: no work_s !!!!!!!!
      + `_${date_s}`

    BUR_o
      .download_s
    =
      `${source_s}-${suffix_s}.jpg`    //:  used by file picker as suggestedName


    let rgb_a

    if
    (
      background_b
    )
    {
      const css_s
      =
        window
          .getComputedStyle
          (
            document
              .getElementById( '{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img' )
          )
            .backgroundColor
  
      rgb_a
      =
        css_s
          .substring
          (
            'rgb('            //: skip rgb(
              .length
          , css_s
              .length
            -1 
          )
            .split
            (
              ', '
            )  
    }

    if
    (
      pick_b    //: pick slot snapshot
    )
    {
      BUR_o
        .pick__v()
    }

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'GET_canvas_img'
          , stat_s: '{{C_o.STAT_a[0]}}'
          , hsl_s: suffix_s
          , img_b: img_b
          , rgb_a: rgb_a
          //... , opacity_n: opacity_n
          }
        )

      const download_e
      =
        document
          .getElementById( 'dialog_{{C_o.STAT_a[0]}}_download'  )
  
        document
          .getElementById( '{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_download'  )
            .innerHTML
        =
          BUR_o
            .download_s
  
      download_e
        .showModal()
  }



  ,
  eventImg_slideshow__v
  (
    event_o
  )
  {
    let id_s

    if
    (
      event_o
        ?.key
      ===
      ' '     //: keydown event with SPACE key
    )
    {
      id_s
      =
        'progress'
    }
    else
    {
      id_s
      =
        event_o
          .target
            .id
  
      id_s
      =
       id_s
         .substring
         (
            id_s
              .lastIndexOf( '_' )    //: start || progress || stop
            +
            1
         )
    }

    let opacity_n      //: only to start

    let interval_n     //: idem

    let shift_n        //: idem

    let limit_n        //: idem

    switch
    (
      id_s
    )
    {
      case 'start'
      :
        if
        (
          BUR_o              //: start not pause
            .slideshow_o
              .play_b
        )
        {
          return
        }
        //-->
        BUR_o
          .slideshow_o
            .play_b
        =
          true
    
        BUR_o
          .slideshow_o
            .progress_n
        =
          0               //: reset
    
        interval_n    //: default to stop slideshow (opacity_n not used)
        =
          +document
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_playback_interval` )            //: Number cast
              .value
        
        shift_n
         =
           +document
             .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_playback_shift` )            //: Number cast
               .value

        let delta_n
        =
          interval_n
          *
          shift_n
          *
          0.01    //: percent


        limit_n
        =
          document
            .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_playback_slower` )
              .checked
        ?
          interval_n
          +
          delta_n
        :
          interval_n
          -
          delta_n
        
        opacity_n
        =
          BUR_o
            .opacity__n()
    
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_playback_pause`
          , 'wait'
          )
          
        break
    
      case 'progress'
      :
        if
        (
          ! BUR_o
              .slideshow_o
                .play_b
        )
        {
          return
        }
        //-->
        interval_n
        =
         +' {{C_o.PLAY_PAUSE_n}}'
        
        break

      //?? case 'reset'
      //?? :
      //?? 
      //??   break
      //?? case 'stop'
      //?? :
      //?? 
      //??   break

      default
      :
        break
    }

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s: 'PUT_slides'
          , stat_s: '{{C_o.STAT_a[0]}}'
          , id_s: id_s
          , interval_n: interval_n
          , shift_n: shift_n
          , limit_n: limit_n
          , opacity_n: opacity_n
          }
        )
  }



  ,
  eventImg_background__v
  (
    event_o
  )
  {
    const for_s =
      event_o
        .target
          .htmlFor

    switch
    (
      true
    )
    {
      case
        for_s
          .includes( 'transparent' )
      :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_background`
          , '{{S_o.bgtransparent_s}}'
          )

        break

      case
        for_s
          .includes( 'black' )
      :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_background`
            ,
            '{{S_o.bgblack_s}}'
          )

        break

      case
        for_s
          .includes( 'white' )
      :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_background`
            ,
            '{{S_o.bgwhite_s}}'
          )

        break

      case
        for_s
          .includes( 'color' )
      :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_background`
            ,
            'hsl( var(--{{C_o.STAT_a[0]}}_img_bg_hue) calc(var(--{{C_o.STAT_a[0]}}_img_bg_sat)  *1% ) calc(var(--{{C_o.STAT_a[0]}}_img_bg_lum)  *1%) /1)'
          )

        break

      case
        for_s
          .includes( 'picker' )
      :
        DOM_o
          .rootVar__v
          (
            `--{{C_o.STAT_a[0]}}_img_picker`
            ,
            true
          )

        break

      default:
        break
    }
  }



  ,
  eventImg_range__v
  (
    event_o
  )
  {
    const range_e =
      event_o
        .target

    UI_o
      .rangeVar__v
      (
        range_e
      )

  
    let id_s =
      range_e
        .id

    const hsl_s =
      id_s
        .slice
        (
          id_s
            .lastIndexOf( '_' )
          +
          1
        )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_img_bg_${hsl_s}`
        , range_e
            .value
      )

    BUR_o
      .pick__v()

  }


  ,
  event_burstScale__v
  (
    event_o
  )
  {
    const id_s
    =
      event_o
        .target
          .id     //: IN_burst_dock_scale
      
    const hsl_s
    =
      id_s        //: IN_burst_dock_scale
        .slice
        (
          id_s
            .lastIndexOf( '_' )
          +
          1
        )
      
    const scale_n
    =
      BUR_o
        .scale_o
          [ `${hsl_s}_n` ]

    const scale_e
    =
      document
        .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_dock_scale' )  //: IN_burst_dock_scale

    scale_e
      .value
    =
      scale_n

    UI_o
      .rangeVar__v
      (
        scale_e
      )
  }



  ,
  listener__v
  ()
  {
    //=== HUE TRACE EVENTS ===
    for
    (
      let hsl_s
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
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}` )
            ?.addEventListener
            (
              event_s
              ,
              BUR_o
                .eventTrace__v
            )
      }

      BUR_o
        .trace_o
          [ `${hsl_s}_e`  ] =
              document
                .getElementById( `{{C_o.STAT_a[0]}}_${hsl_s}_n` )

      BUR_o
        .trace_o
          [ `${hsl_s}_ratio_e`  ] =
              document
                .getElementById( `{{C_o.STAT_a[0]}}_${hsl_s}_ratio_n` )
    }

    //=== CANVAS + SLIDERSEVENTS ===
    for
    (
      let hsl_s
      of
      [
        'hue',
      ]
    )
    {
      DOM_o
        .listener__v
        (
          `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_slot`
          ,
          BUR_o
            .eventSlot__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_back`
          ,
          BUR_o
            .eventHsl__v
        )

      DOM_o
        .listener__v
        (
          `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_back`
          ,
          BUR_o
            .eventHsl__v
            ,
          'mousemove'
        )

      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}_trace`,
          BUR_o
            .eventShift__v
        )
    }

    //=== IMG EVENTS ===
    for
    (
      let input_s
      of
      [
        'reset'
      , 'download'
      ]
    )
    {
      document
        .querySelector( `[for={{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_${input_s}]` )
          ?.addEventListener
          (
            'click'
            ,
            BUR_o
              [ `eventImg_${input_s}__v` ]
          )
    }

    //=== SLIDES EVENTS ===
    for
    (
      let range_s
      of
      [
        'start'
      , 'stop'
      , 'reset'
      ]
    )
    {
      DOM_o
        .listener__v
        (
          `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_playback_${range_s}`
        , BUR_o
            .eventImg_slideshow__v
        , 'click'
        , {
            passive: true
          }
        )
    }

    DOM_o
      .listener__v
      (
        `progress_{{C_o.STAT_a[0]}}_playback_progress`
      , BUR_o
          .eventImg_slideshow__v
      , 'click'
      , {
          passive: true
        }
      )

    document
      .body
        .addEventListener
        (
          'keydown'
        , BUR_o
            .eventKey__v
        , {
            passive: false
          }
        )

    document
      .getElementById( '{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[0]}}_zoom_out' )
        .addEventListener
        (
          'click'
        , BUR_o
            .eventSizeTiny__v
        )
    


    //??? document
    //???   .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_max` )
    //???     ?.addEventListener
    //???     (
    //???       'click'
    //???       , () =>
    //???         {
    //???         
    //???         }
    //???     )
    
    //?? document
    //??   .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_playback_shift` )
    //??     ?.addEventListener
    //??     (
    //??       'click'
    //??       ,
    //??       BUR_o
    //??         .eventImg_slideshowShift__v
    //??     )

    //=== RANGE EVENTS ===
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
      for
      (
        let range_s
        of
        [
          'dock_scale'
        , 'thresh_hi'
        , 'thresh_lo'
        , 'hue_img_bg_opacity'
        ]
      )
      {
        DOM_o
          .listener__v
          (
            `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${range_s}`
            ,
            BUR_o
              .eventRange__v
            ,
            event_s
            ,
            {
              passive: true
            }
          )
      }

      for
      (
        let range_s
        of
        [
          'interval'
        , 'shift'
        ]
      )
      {
        UI_o
          .rangeVar__v
          (
            document
              .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_playback_${range_s}` )
          )

      }
      for
      (
        let range_s
        of
        [
          'transparent',
          'black',
          'white',
          'color',
        ]
      )
      {
        document
          .querySelector( `[for={{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_img_bg_${range_s}]` )
            ?.addEventListener
            (
              event_s
              ,
              BUR_o
                [`eventImg_background__v`]
            )
      }

      for
      (
        let range_s
        of
        [
          'hue',
          'sat',
          'lum',
        ]
      )
      {
        DOM_o
          .listener__v
          (
            `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_hue_pick_${range_s}`
          ,  BUR_o
              .eventImg_range__v
          , event_s
          , {
              passive: true
            }
          )
      }

      onresize    //: keep aside img at bottom
      =
      () =>
        BUR_o
          .scale__v()
    }

    for
    (
      let hsl_s
      of
      [
        'hue',
        'sat',
        'lum',
      ]
    )
    {
      DOM_o
        .listener__v
        (
          `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[0]}}_${hsl_s}`
        , BUR_o
            .event_burstScale__v
        )
    }

    //=== GOTO EVENTS ===
    for
    (
      node_s
      of
      [
          '{{C_o.FULL_SCREEN}}',
          '{{C_o.PAGE_TOP}}',
          '{{C_o.BURST_EQUAL}}'
      ]
    )
    {
      DOM_o
        .beforeNode__e
        (
          document
            .getElementById( `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[0]}}_dock` )
            ,
          `goto_${node_s}`
      )
    }

    const fullscreen_e =
      document
        .getElementById( `goto_${node_s}` )
  
    if
    (
      fullscreen_e
    )
    {
      FUL_o
        .listener__v()
    }

    BUR_o
     .zoomable__v()
   
  }


  ,
  zoomable__v
  ()
  {
    //-- for
    //-- (
    //--   let zoomable__e
    //--   of
    //--   Array
    //--     .from
    //--     (
    //--       document
    //--         .querySelectorAll( `[data-fullsize_b]` )
    //--     )
    //-- )
    //-- {
    //--  zoomable__e
    document
      .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )
        .addEventListener
        (
          'click'
        , BUR_o
            .eventSizeFull__v
        )
    //-- }
  }



  ,
  eventSizeFull__v
  ()
  {
    const full_e
    =
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )

    if
    (
      full_e
        .classList
          .contains( 'fullsize' )      //: already full
    )
    {
      return    //: avoid click event when mouse up
    }
    //-->
    full_e
      .classList
        .toggle( 'fullsize' )

    BUR_o
      .fullsize_n    //: store scale
    =
      +DOM_o
        .rootVar__s( '--{{C_o.STAT_a[0]}}_hue_img_scale' )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_hue_img_scale`,
        1
      )

    DRAG_o
      .init__v
      (
        full_e
      )

    DRAG_o
      .enable__v()

    DOM_o
      .rootVar__v
      (
        '--{{C_o.STAT_a[0]}}_zoom_out_s'
      , 'flex'
      )
  }


  ,
  eventSizeTiny__v
  ()
  {
    const full_e
    = 
      document
        .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_hue_img` )

    if
    (
      full_e
        .classList
          .contains( 'fullsize' )
    )
    {
      full_e
        .classList
          .toggle( 'fullsize' )
  
      DOM_o
        .rootVar__v
        (
          `--{{C_o.STAT_a[0]}}_hue_img_scale`,    //: restore scale
          BUR_o
            .fullsize_n
        )
  
      DRAG_o
        .disable__v()
  
      DOM_o
        .rootVar__v
        (
          '--{{C_o.STAT_a[0]}}_zoom_out_s'
        , 'none'
        )
  
      //== restore initial place ===
      full_e
        .setAttribute
        (
          'style'
        , ''       //: remove drag transform
        )
    }
  }


  ,
  screen__v 
  ()
  {
    const width_n =
      +screen      // Number cast
        .availWidth
      
    const height_n =
      +screen      // Number cast
        .availHeight
      
    let screenDim_n =
        width_n
        >
        height_n
        ?               //: vmin
          height_n
        :
          width_n

    screenDim_n =
      (
        screenDim_n
        //?? *
        //?? 1       //: C_o.SCREEN_RATIO_n
      )
      -
      64      //: S_o.NAV_HEIGHT_s * 2

    BUR_o
      .canvasWidth_n =
        screenDim_n
        
    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_screen_dim`,
        screenDim_n
      )

    for
    (
      canvas_s
    of
    [
      'hue'
    , 'sat'
    , 'lum'
    ]
    )
    {
      let canvas_e =
        document
          .getElementById( `{{C_o.CANVAS_ID_s}}_{{C_o.STAT_a[0]}}_${canvas_s}` )

      if
      (
        canvas_e
      )
      {
        canvas_e
          .width =
            screenDim_n
            
        canvas_e
          .height =
            screenDim_n
      }
    }      
  }


  ,
  scale__v
  ()
  {
    let scale_n
    =
      BUR_o
        .imgHeight_n
      /
      window
        .innerHeight

    if
    (
      scale_n
      >
      +'{{C_o.BURST_TRANSFORM_MAX_SCALE_n}}'
    )
    {
      scale_n
      =
        1
        /
        scale_n
        *
        +'{{C_o.BURST_TRANSFORM_MAX_SCALE_n}}'      //: don't scale up!
    }

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_hue_img_scale`,
        scale_n
      )

    DOM_o
      .rootVar__v
      (
        `--{{C_o.STAT_a[0]}}_hue_img_height`,
        document
          .getElementById( `aside_{{C_o.STAT_a[0]}}_hue_img` )
            .offsetHeight
      )
  }



  ,
  async source__v
  ()
  {
    let src_s
    let width_s
    let height_s

    const param_o
    =
      await
      LOC_o
        .search__( '{{C_o.LOC_IMG_s}}' )

    if
    (
      param_o
    )
    {
      src_s
      =
        param_o
          .get( 's' )
  
      width_s
      =
        param_o
          .get( 'w' )
  
      height_s
      =
        param_o
          .get( 'h' )
    }
    else
    {
      const value_o =
        await
        LOC_o
          .search__( '{{C_o.LOC_JSON_s}}' )
  
      if
      (
       value_o    //: import image
      )
      {
        width_s
        =
          value_o
            .width_s
  
        height_s
        =
          value_o
            .height_s
  
        const title_e
        =
          document
            .querySelector( `h1+p` )
  
        if
        (
          title_e
        )
        {
          title_e
            .innerHTML
          =
          value_o
            .id_s
        }
      }
    }

    BUR_o
      .source_s
    =
      src_s

    BUR_o
      .imgWidth_n
    =
      +width_s    //: Number cast

    BUR_o
      .imgHeight_n
    =
      +height_s    //: Number cast
  }



  ,
  async init__v
  ()
  {
    
    await
    BUR_o
      .source__v()

    BUR_o
      .screen__v()
  
    BUR_o
      .worker_o =
        STAT_o
          .worker__o
          (
            '{{C_o.STAT_a[0]}}'
            ,
            [
              'hue',
              'sat',
              'lum',
              'hue_back',
              'hue_front',
            ]
            ,
            'LogScale Painter ColorBurst'
            ,
            BUR_o
              .message__v
          )

    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s:  'PUT_scale'
          , stat_s:  '{{C_o.STAT_a[0]}}'
          , hsl_s:  'hue'
          , scale_n: BUR_o
                       .scale_o
                         .hue_n
          , burst_b: false    //:  don't draw: will be done just after
          }
        )

    BUR_o
      .draw__v()    //: draw before getting equal_a
  
    BUR_o
      .worker_o
        .post__v
        (
          { 
            task_s:  'GET_equal'
            ,
            stat_s:  '{{C_o.STAT_a[0]}}'
            ,
            hsl_s:  'hue'
            ,
          }
        )

    BUR_o
     .listener__v()

    let source_s
    =
      await
      LOC_o
        .search__( '{{C_o.LOC_SEARCH_s}}' )

    if
    (
      ! source_s
    )
    {
      source_s
      =
        BUR_o
          .source_s     //: set by source__v
    }

    BUR_o
      .get_img__v( source_s )

    BUR_o
      .scale__v()
  }
}



BUR_o
  .init__v()
