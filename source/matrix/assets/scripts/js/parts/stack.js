// === stack.js ===

const STACK_o =
{
  status_o: null,    //: STAT_W_o.status_o

  //?? imgDrag:    //: after layer_align
  //?? {
  //??   img_e: null,
  //?? },

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
        STACK_o
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


  appendNode__v:
  (
    fragment_e,
    parent_s      //: node ID, parent of fragment
  ) =>
  {
    document
      .getElementById( parent_s )
        ?.appendChild( fragment_e )
  }
  ,



  beforeNode__v:
  (
    fragment_e,
    anchor_s      //: node ID, sibling of fragment
  ) =>
  {
    const anchor_e =
      document
        .getElementById( anchor_s )

      anchor_e
      &&
      anchor_e
        .parentNode
          .insertBefore
          (
            fragment_e,
            anchor_e
          )
  }
  ,



  fragment__e:
  (
    fragment_s,
    anchor_s      //: node ID, sibling of fragment
  ) =>
  {
    const fragment_e =
      document
        .createRange()
        .createContextualFragment( fragment_s )

    return (
      anchor_s
      ?
        STACK_o
          .beforeNode__v
          (
            fragment_e,
            anchor_s
          )
      :
        fragment_e
    )
  }
  ,



  img__e:
  (
    work_s,
    callback_f    //: optional
  ) =>
  {
    const img_e =
      document
        .createElement( 'img' )

    img_e
      .addEventListener
      (
        'load',
        load_o =>  //: not used
          callback_f
          &&
          callback_f( img_e )
      )

    img_e
      .src =
        `{{C_o.IMG_DIR_s}}${work_s}/full/max/0/color.avif`

    return img_e
  }
  ,



  addWork__v:
  (
    work_s
  ) =>
  {
    const layer_n =
      document
        .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_layers_items' )
          .children
            .length

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

    STACK_o
      .appendNode__v
      (
        STACK_o
          .fragment__e
          (
            `<li data-layer_n=${layer_n}>`
            + input_s
            + `<label ${for_s}>${work_s}</label>`
            + `</li>`
          ),
        '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_layers_items'
      )



    STACK_o
      .beforeNode__v
      (
        STACK_o
          .img__e
          (
            work_s,
            img_e =>      //: callback_f
            {
              img_e
                .id =
                  `img_${work_s}_${layer_n}`

              img_e
                .dataset
                  .layer_n =
                    layer_n

              img_e
                .dataset
                  .size_n =
                    1              //: to increase/decrease

              document
                .documentElement
                  .style
                    .setProperty
                    (
                      `--{{C_o.STAT_a[3]}}_img_ratio_${layer_n}`,
                      1
                    )
            }
          ),
        '{{C_o.STAT_a[3]}}_scale'
      )
        
    STACK_o
      .fragment__e
      (
        `<li data-layer_n=${layer_n}>
          <input  id="{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation_play_${layer_n}" data-layer_n=${layer_n} name={{C_o.STAT_a[3]}}_animation type="radio">
          <label for="{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation_play_${layer_n}">
            <svg class="svg_icon">
              <use href="#stack_circle"></use>
              <title>${layer_n} {{C_o.LAYER_INDEX_s}} ${work_s}</title>
            </svg>
          </label>
        </li>`,
        '{{C_o.LIST_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation_play'
      )

    
  }
  ,



  add_remote__v:
  (
    op_s
  ) =>
  {
    if        //: iframe still there: not yet adopted
    (
      document
        .getElementById( `{{C_o.IFRAME_ID_s}}_{{C_o.STAT_a[3]}}_${op_s}` )
    )
    {
      IND_o
        .adopt__v
        (
          `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_settings`,
          `{{C_o.IFRAME_ID_s}}_{{C_o.STAT_a[3]}}_${op_s}`,
          (
            iframe_e,    //: not used
            adopted_e
          ) =>
          {
            const script_e =
              adopted_e
                .querySelector( `#script_stack_imgs` )
  
            if
            (
              script_e
            )
            {
              script_e
                .src =
                script_e
                  .dataset
                    .src  
            }
          }
        )
    }
  }
  ,



  selected__a:
  () =>
    Array
      .from
      (
        document
          .querySelectorAll( `#{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_layers_items > li[data-layer_n] > input:checked` )
      )
  ,


  
  add_local:
  (
    op_s
  ) =>
  {
    ;console.log( 'add_local' )
  }
  ,



  hide__v:
  (
    op_s
  ) =>
  {
    for
    (
      selected_e
      of
      STACK_o
        .selected__a()
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
          .setAttribute
          (
            'data-layer_b',
            '0'
          )
      }
    }

  }
  ,



  moveNode__v:
  (
    pivot_s
  ) =>
  {
    const list_e =
      STACK_o
        .selected__a()
        ?.[0]
          ?.parentNode

    if
    (
      ! list_e    //: no selection
    )
    {
      return void alert( `Aucune image n'est sélectionnée` )
    }
    //->
    //=== local function ==
    const move__v =
    (
      selector_s
    ) =>
    {
      const node_e =
        document
          .querySelector( selector_s )

      let pivot_e =
        node_e
          [ `${pivot_s}Sibling` ]
  
      if
      (
        pivot_e
        &&
        pivot_s
        ===
        'next'
      )
      {
        pivot_e =
          pivot_e
            .nextSibling
      }
  
      if
      (
        pivot_e
          ?.dataset
            ?.layer_n
        !==
        '0'          //: dont' move before initial node
      )
      {
        node_e
          .parentNode
            .insertBefore
            (
              node_e,
              pivot_e
            )
      }
    }

    const layer_n =
      list_e
        .dataset
          .layer_n

    move__v( `#{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_layers_items > li[data-layer_n="${layer_n}"]` )

    move__v( `#{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation > li[data-layer_n="${layer_n}"]` )

    move__v( `img[data-layer_n="${layer_n}"]` )
  }
  ,



  up__v:
  (
    op_s
  ) =>
  {
    STACK_o
      .moveNode__v( 'previous' )
  }
  ,



  down__v:
  (
    op_s
  ) =>
  {
    STACK_o
      .moveNode__v( 'next' )
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
      STACK_o
        .selected__a()
    )
    {
      const layer_n =
        selected_e
          .dataset
            .layer_n

      for
      (
        img_e
        of
        Array
          .from
          (
            document
              .querySelectorAll( `img[data-layer_n="${layer_n}"]` )
          )
      )
      {
        let size_n =
          delta_n
          +
          +(img_e           //: number cast
            .dataset
              .size_n)

          img_e
            .dataset
              .size_n =
                size_n

        document
          .documentElement
            .style
              .setProperty
              (
                `--{{C_o.STAT_a[3]}}_img_ratio_${layer_n}`,
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
    STACK_o
      .imgResize__v
      (
        +'{{C_o.IMG_RESIZE_n}}'
      )
  }
  ,



  decrease__v:
  (
    op_s
  ) =>
  {
    STACK_o
      .imgResize__v
      (
        -'{{C_o.IMG_RESIZE_n}}'
      )
  }
  ,



  align__v:
  (
    op_s
  ) =>
  {
    const list_e =
      STACK_o
        .selected__a()
        ?.[0]

    if
    (
      ! list_e    //: no selection
    )
    {
      return void alert( `Aucune image n'est sélectionnée` )
    }

    const layer_n =
      list_e
        ?.dataset
          ?.layer_n

    const img_e =
      document
        .querySelector( `img[data-layer_n="${layer_n}"]` )

    //?? STACK_o
    //??   .imgDrag
    //??     .img_e =
    //??       img_e

    const method_s =
      document
        .querySelector( `#{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_align:checked` )
      ?
        'remove'
      :
        'add'

    img_e
      .classList
        [ `${method_s}` ]( 'layer_align' )

    const at_s =
      method_s
      ===
      'add'    //: false to remove
      ?
        'set'
      :
        'remove'

      img_e
        [`${at_s}Attribute`]
        (
          'draggable',
          at_s
          ===
          'set'
        )

    for
    (
      let axis_s
      of
      [
        'offx',
        'offy'
      ]
    )
    {
      if
      (
        ! img_e
            .dataset
              [ axis_s ]    //: don't erase previous offset
      )
      {
        img_e
          .dataset
            [ axis_s ] = 0    //: reset
      }
    }

    document
      .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_settings` )
        .checked =
          false      //: close settings before dragging to align

    document
      .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_img` )
        .checked =
          true
    
    STACK_o
      .dragImg__v
      (
        img_e,
         method_s
         ===
         'remove'      //: false if add: start drag
      )
  }
  ,



  dragImg__v:
  (
    img_e,
    remove_b=false
  ) =>
  {
    //?? if
    //?? (
    //??   STACK_o
    //??     .imgDrag
    //??       .img_e
    //??   ===
    //??   null
    //?? )
    //?? {
    //??   return
    //?? }
    //?? //->

    const down__v =
    (
      event_e
    ) =>
    {
      gapX_n =
        event_e
          .clientX
        -
        offsetX_n
  
      gapY_n =
        event_e
          .clientY
        -
        offsetY_n
  
      listen__v
      (
        [
          'move',
          'up'
        ],
        'add'
      )
  
      //?? return false
    }



    const move__v =
    (
      event_e
    ) =>
    {
      event_e
        .preventDefault()

      atX_n =
        event_e
          .clientX
        -
        gapX_n
  
      atY_n =
        event_e
          .clientY
        -
        gapY_n
  
      offsetX_n =
        atX_n
  
      offsetY_n =
        atY_n
  
      img_e
        .style
          .transform =
            `translate3d(${atX_n}px, ${atY_n}px, 0)`//      ;console.log( `${atX_n}px /  ${atY_n}px` )
      
      //??return false
    }
        


    const up__v =
    (
      event_o    //: not used
    ) =>
    {
      listen__v
      (            //: remove
        [
          'move',
          'up'
        ]
      )

      img_e
        .dataset
          .offx =
            ~~(             //: float to integer
              atX_n
              +
              +(img_e        //: number cast
                .dataset
                  .offx)
            )

      img_e
        .dataset
          .offy =
            ~~(
              atY_n
              +
              +(img_e        //: number cast
                .dataset
                  .offy)
            )

      //?? return false
    }



    const listen__v =
    (
      event_a,
      method_s='remove'
    ) =>
    {
      for
      (
        let event_s
        of
        event_a
      )
      {
        img_e
          [ `${method_s}EventListener` ]
          (
            `pointer${event_s}`,
            eval( `${event_s}__v` )
          )
      }
    }
  


    if
    (
      remove_b    //: stop dragging when deslecting align input
    )
    {
      //?? STACK_o
      //??   .imgDrag
      //??     .img_e =
      //??       null        //: reset to prevent drag

      img_e
        .removeEventListener
        (
          'pointerdown',
          down__v
        )

                      //;console.log( 'stop dragImg__v!!!' )
      return
    }
    //->
                      //;console.log( 'dragImg__v!!!' )
    let gapX_n    = 0
    let gapY_n    = 0
    let offsetX_n = 0
    let offsetY_n = 0
    let atX_n     = 0
    let atY_n     = 0
  
    img_e
      .addEventListener
      (
        'pointerdown',
        down__v
      )
  }
  ,



  listener__v
  ()
  {
    //=== SCALING ===
    for
    (
      op_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `[id^="{{C_o.STAT_a[3]}}_scale_"]` )
        )
    )
    {
      op_e
        .addEventListener
        (
          'click',
          (
            event_o
          ) =>
          {
            const op_s =
              event_o
                .target
                  .id
                    .slice( -3 )    //: 'inc' || 'dec'
    
            const var_s =
              window
                .getComputedStyle
                (
                  document
                    .documentElement
                )
                  .getPropertyValue( '--{{C_o.STAT_a[3]}}_img_width' )
                  
            const delta_n =
              op_s
              ===
              'inc'
              ?
                5
              :
                -5
    
            document
              .documentElement
                .style
                  .setProperty
                  (
                    '--{{C_o.STAT_a[3]}}_img_width',
                    +var_s
                    +
                    delta_n
                  )
          }
        )
    }

    //=== ADD LAYER ===
    for
    (
      let op_s
      of
      [
        'add_remote',
        'add_local',
        'hide',
        'up',
        'down',
        'increase',
        'decrease',
        'align'
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[3]}}_${op_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          click_o =>
            STACK_o
              [ `${op_s}__v` ]( op_s )
        )

    
    }
  }
  ,


  init__v
  ()
  {
    STACK_o
      .addWork__v    //: reference work
      (
        document
          .querySelector( 'body' )
            .dataset
              .work_s
      )

    for
    (
      work_s
      of
      Array
        .from
        (
          document
            .querySelector( 'body' )
              .dataset
                .layer_s    //: compared works
                .split( ' ' )
        )
    )
    {
      STACK_o
        .addWork__v( work_s )
    }

    STACK_o
      .listener__v()


  }
}



STACK_o
.init__v()





//...??STACK_o
//...??  .worker_o =
//...??    STAT_o
//...??      .worker__o
//...??      (
//...??        '{{C_o.STAT_a[2]}}',
//...??        'LogScale Painter',
//...??        STACK_o.message__v,
//...??      )
