// === stack.js ===

const STACK_o =
{
  status_o: null,    //: STAT_W_o.status_o

  ui:
  {
    //... pointerX_n
    //... pointerY_n
    //... radius_n
    //... stacking_n
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


  beforeNode__v:
  (
    fragment_e,
    anchor_s      //: node ID, sibling of fragment
  ) =>
  {
    const anchor_e =
      document
        .getElementById( anchor_s )

    return (
      anchor_e
      ?
        anchor_e
          .parentNode
            .insertBefore
            (
                fragment_e,
                anchor_e
            )
      :
        null
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
      STACK_o
        .beforeNode__v
        (
          fragment_e,
          anchor_s
        )
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
    const atLayers_n =
      document
        .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_layers_items' )
          .children
            .length
      -
      2        //: _add + _hide

    let draggable_s = ''
    let input_s = ''

    if
      (
        atLayers_n
      )
      {
        draggable_s =
          ' draggable=true'

        input_s =
          `<input id="input_${work_s}_${atLayers_n}" data-layer_n=${atLayers_n} type="checkbox">`
          + `<label for="input_${work_s}_${atLayers_n}">`
          + `{{C_o.NAV_LEGEND_o.stack_layers_align.legend_s}}`
          + `</label>`
      }

    STACK_o
      .fragment__e
      (
        `<li data-layer_n=${atLayers_n}${draggable_s}>
        <label>${atLayers_n} {{C_o.LAYER_INDEX_s}} ${work_s}</label>
        ${input_s}
        </li>`,
        '{{C_o.LIST_ID_s}}_{{C_o.STAT_a[3]}}_add'
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
                  `img_${work_s}_${atLayers_n}`

              img_e
                .dataset
                  [ 'layer_n' ] =
                    atLayers_n

              if
              (
                atLayers_n
              )
              {
                img_e
                  .setAttribute
                  (
                    'draggable',
                    true
                  )
              }
            }
          ),
        '{{C_o.STAT_a[3]}}_scale'
      )
        
    STACK_o
      .fragment__e
      (
        `<input  id="{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation_play_${atLayers_n}" data-layer_n=${atLayers_n} name={{C_o.STAT_a[3]}}_animation type="radio">
        <label for="{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation_play_${atLayers_n}" data-layer_n=${atLayers_n}>
          <svg class="svg_icon">
            <use href="#stack_circle"></use>
            <title>${atLayers_n} {{C_o.LAYER_INDEX_s}} ${work_s}</title>
          </svg>
        </label>`,
        '{{C_o.INPUT_ID_s}}_{{C_o.STAT_a[3]}}_layer_animation_play'
      )

    
    //...if
    //...  (
    //...    atLayers_n
    //...  )
    //...  {
    //...    const drag_c =
    //...      new DragElement( canvas_e )
    //...
    //...    drag_c
    //...      .start__v()
    //...  }

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
                10
              :
                -10
    
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
      let sub_s
      of
      [
        'add_remote'
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_{{C_o.STAT_a[3]}}_${sub_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          click_o =>
          {
            if        //: iframe still there: not yet adopted
            (
              document
                .getElementById( `{{C_o.IFRAME_ID_s}}_{{C_o.STAT_a[3]}}_${sub_s}` )
            )
            {
              IND_o
                .adopt__v
                (
                  `{{C_o.DIV_ID_s}}_{{C_o.STAT_a[3]}}_settings`,
                  `{{C_o.IFRAME_ID_s}}_{{C_o.STAT_a[3]}}_${sub_s}`,
                  (
                    iframe_e,    //: not used
                    adopted_e
                  ) =>
                  {
                    const script_e =
                      adopted_e
                        .querySelector( `#script_stack_imgs` ) 
                    
                    //;console.log(`#script_stack_imgs`)
          
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
        )

    
     }
  }
  ,


  init__v
  ()
  {
    STACK_o
      .addWork__v
      (
        document
          .querySelector( 'body' )
          .dataset
          .work_s
      )

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
