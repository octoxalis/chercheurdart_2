// === expo.js ===
const EXP_o
=
{
  local_a:
    []
, local_n:
    0
, full_e:
    null



, order__n
  ()
  {
    const order_n =
      +DOM_o
        .rootVar__s( '--{{C_o.SECTION_a[2]}}_order_n' )
      +
      1

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_order_n',
        order_n
      )

    return order_n
  }



, async collect__a
()
{
  let collect_a
  =
    []    //: array to reorder keys according to their order_n

  await
  LOC_o
    .idb_o
      .walk__v
      (
        (
          key_s
        , value_o
        ) =>
        {
          collect_a
            .push
            (
              {
                key_s: key_s,
                value_o:
                  JSON
                    .parse( value_o )
              }
            )
        }
      )

  collect_a
    .sort
    (
      (
        first_o,
        second_o
      ) =>
        first_o
          .value_o
            .order_n
        -
        second_o
          .value_o
            .order_n            
    )

  return collect_a
}


  , 
  selectable__v
  ()
  {
    for
    (
      let figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `#{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry > figure > figcaption` )
        )
    )
    {
      figure_e
        .addEventListener
        (
          'click',
          EXP_o
            .select__v
        )
    }
  }



  ,
  selected__
  (
    local_b=true          //??? : collect local images only
  , selected_b=true       //: collect selected image only
  , multi_b=false         //: , if false: first selected, if true:  whole selected
  )
  {
    let selector_s
    =
      'figure'

    if
    (
      selected_b    //: only selected figures
    )
    {
      selector_s
      +=
        '.{{C_o.SELECTED_CLASS_s}}'
    }

    const figure_a
    =
      Array
        .from
        (
          document
            .querySelectorAll( selector_s )
        )

    let alert_s

    switch
    (
      true
    )
    {
      case
        ! figure_a
          .length
      :
        alert_s
        =
        `Cette opération ne peut être appliquée sans sélection préalable`

      break
      
      case
        ! multi_b
        &&
        (
          figure_a
            .length
          >
          1
          ||
          ! figure_a
              [0]
                .querySelector( 'img'  )
                  .src
                    .startsWith( 'data:image/jpeg;base64' )
        )
      :
        alert_s
        =
        `Cette opération ne peut être appliquée qu'à une seule image locale`

      break
      
      default
      :
      break

    }

    if
    (
      alert_s
    )
    {
      return void window
                    .alert( alert_s )
    }

    return (
      multi_b
      ?
        figure_a
      :
        figure_a
          [0]
    )
  }


  ,
  zoomable__v
  ()
  {
    for
    (
      let zoomable__e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `[data-fullsize_b]` )
        )
    )
    {
      zoomable__e
        .addEventListener
        (
          'click'
        , EXP_o
            .sizeEventFull__v
        )
    }
  }



  ,
  async show__v
  ()
  {
    let show_s = ''

    for
    (
      let show_o
      of
      await EXP_o
              .collect__a()
    )
    {
      const value_o
      =
        show_o
          .value_o

      let src_s

      let caption_s

      if
      (
        value_o
          .src_s      //: data:image base64
      )
      {
        src_s
        =
          value_o
            .src_s

        caption_s
        =
          value_o
            .caption_b
          ?
            value_o
              .caption_s
          :
            `<{{C_o.TABLE_TAG_s}} data-ins={{C_o.INS_IMG_s}}>`
            + `<{{C_o.ROW_TAG_s}} data-local=1>{{C_o.NAV_LEGEND_o.expo_local.legend_s}}</{{C_o.ROW_TAG_s}}>`
            + `<{{C_o.ROW_TAG_s}}>`
            +  value_o
                 .id_s
            + `</{{C_o.ROW_TAG_s}}>`
            + `</{{C_o.TABLE_TAG_s}}>`
      }
      else            //: img.src
      {
        src_s
        =
          `{{C_o.MEDIA_DIR_s}}${show_o.key_s}.avif`

        caption_s
        =
        value_o
          .caption_s
      }
    
      show_s
      +=
        `<figure data-id="{{C_o.EXPO_ID_s}}${value_o.id_s}" data-display_b=${value_o.display_b} data-key_s="${show_o.key_s}">`
        + `<img src="${src_s}" width="${value_o.width_s}" height="${value_o.height_s}" loading="lazy" data-fullsize_b=true>`
        //-- + ` data-offx=0  data-offy=0>`
        //?? + `<a href="#${value_o.id_s}">`
        //?? + `</a>`
        + `<figcaption data-local>`
        + caption_s
        + `</figcaption>`
        + `</figure>\n`
    }

    document
      .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry' )
        .innerHTML
    =
      show_s

    EXP_o
      .selectable__v()

    EXP_o
      .zoomable__v()
  }



  ,
  select__v
  (
  event_o
  )
  {
    if
    (
      event_o
        .ctrlKey
    )
    {
      event_o
        .preventDefault()

      return    //: let href to image be fired
    }
    //-->
    const selected_e
    =
      event_o
        .target
          .closest( 'figure' )

    selected_e
    &&
    selected_e
      .classList.toggle( '{{C_o.SELECTED_CLASS_s}}' )
  }



  ,
  selectAll__v
  (
    event_o
  )
  {
    //-- event_o
    //--   .preventDefault()

    let method_s
    =
      event_o
        .target
          .checked
      ?
        'remove'
      :
        'add'
 
    for
    (
      let figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( 'figure' )
        )
    )
    {
      figure_e
        .classList
          [ method_s ]( '{{C_o.SELECTED_CLASS_s}}' )
    }
  }



  ,
  async hide__v
  ()
  {
    for
    (
      let figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `figure.{{C_o.SELECTED_CLASS_s}}` )
        )
    )
    {
      figure_e
        .dataset
          .display_b =
            false

      const key_s =
        figure_e
          .dataset
            .key_s

      let item_s =
        await
        LOC_o
          .idb_o
            .get__( key_s )

      if
      (
        item_s
      )
      {
        const item_o
        =
          JSON
            .parse( item_s )

        item_o
          .display_b
        =
          ! item_o
              .display_b

        LOC_o
          .idb_o
            .set__v
            (
              key_s,
              JSON
                .stringify( item_o )
            )
  
        EXP_o
          .show__v()
      }
    }

  }



  ,
  async group__v
  ()
  {
    let parent_e
    let after_e

    for
    (
      let figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `figure.{{C_o.SELECTED_CLASS_s}}` )
        )
    )
    {
      if
      (
        ! parent_e    //: initial node
      )
      {
        parent_e
        =
          figure_e
            .parentNode

        after_e =
          figure_e

        continue
      }
                    
      //... group figure_e
      const remove_e
      =
        parent_e
          .removeChild( figure_e )

      parent_e
        .insertBefore
        (
          remove_e,
          after_e
            .nextSibling
        )

      after_e
      =
        remove_e
    }

      //===. change idb item ===
    let idb_a
    =
      []    //: array to keep idb keys according to their creation order

    for
    (
      let figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `#{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry > figure` )
        )
    )
    {
      const key_s
      =
        figure_e
          .dataset
            .key_s

      //: change order_n value
      const item_o
      =
        await
        LOC_o
          .idb_o
            .get__( key_s )

      const value_o =
        JSON
          .parse
          (
            item_o
          )

      const order_n =
        EXP_o
          .order__n()

      value_o
        .order_n =
          order_n

      //: copy & empty idb
      idb_a
        .push
        (
          {
            key_s: key_s,
            value_s:
              JSON
                .stringify( value_o )
          }
        )

      LOC_o
        .idb_o
          .delete__v( key_s  )

    }

    //: recreate idb according to DOM order
    for
    (
      let idb_o
      of
      idb_a
    )
    {
      LOC_o
        .idb_o
          .set__v
          (
            idb_o
              .key_s,
            idb_o
              .value_s
          )
    }
  }



  ,
  remove__v
  ()
  {
    if
    (
      ! window
          .confirm( `Cette opération va remplacer les images de l'exposition courante qui sont sélectionnées<br>Souhaitez-vous continuer?` )
    )
    {
      return false   //: abort
    }
    //-->
    for
    (
      let figure_e
      of
      EXP_o
        .selected__
        ( 
          false      //: not only local 
        , true       //: only selected
        , true       //: multiple images
        )

    )
    {
      LOC_o
        .idb_o
          .delete__v
          (
            figure_e
              .dataset
                .key_s
          )

      figure_e
        .parentNode
          .removeChild( figure_e )  
    }

    return true  //: deleted
  }



  ,
  async local__v  //: add from local file system
  ()
  {
    //=== display file picker
    const
      handle_a
    =
      await
      window
        .showOpenFilePicker
        (
          {
            multiple:
              true
          , types:
            [
              {
                description:
                  'Image JPEG'
              , accept:
                  {
                    'image/jpeg':
                      [
                        '.jpg'
                      , '.jpeg'
                      ]
                  }
              }
            ]
          }
        )

    //=== identify selected files
    let local_a
    =
      []

    let local_n
    =
      EXP_o
        .local_n++  //: increment for next showOpenFilePicker

    let local_s    //: html string of figure nodes to create
    =
      ''

    for
    (
      let file_o
      of
      handle_a
    )
    {
      const fileName_s
      =
        file_o
          .name
            .slice
            (
              0
            , file_o
                .name
                  .lastIndexOf( '.' )    //: strip file name extension (jpg || jpeg )
            )

      const id_s
      =
        fileName_s
          .replaceAll
          (
            '{{C_o.FILE_ESCAPE_s}}'
          , '{{C_o.ID_PART_DELIM_s}}'
          )


      const caption_s
        =
          `<figure data-id="{{C_o.EXPO_ID_s}}_${id_s}" data-display_b=true data-key_s="${fileName_s}">`
          + `<img id="{{C_o.EXPO_IMG_PREFIX_s}}_${local_n}" loading="lazy">`  //!!! no src, width, height attributes
          + `<a href="#"></a>`
          + `<figcaption>${id_s}</figcaption>`
          + `</figure>\n`

      local_a
        .push
        (
          {                //: local_o
            id_s:
              fileName_s    //: without extension
          , local_n:
              local_n
          , file_o:
              file_o
          , caption_s:
              caption_s
          }
        )

      local_s
      +=
        caption_s
    }

    //=== instanciate new figure node
    const masonry_e
    =
      document
        .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry' )
      
    let masonry_s
    =
      masonry_e
        .innerHTML

    masonry_e
      .innerHTML
    =
      masonry_s
      +
      local_s

    //=== read new img file data
    for
    (
      let local_o
      of
      local_a
    )
    {
      const
        {
          id_s
        , local_n
        , caption_s
        , file_o
        }
        =
          local_o
    
      const img_e
      =
        document
          .querySelector
          (
            `#{{C_o.EXPO_IMG_PREFIX_s}}_${local_n}`
          )

      if
      (
        img_e
      )
      {
        const reader_o
        =
         new FileReader()
        
        reader_o
          .addEventListener
          (
            'load'
          , () => 
            {
              img_e
                .src
              =
                reader_o
                  .result    //: convert image file to base64 string

              img_e
                .addEventListener
                (
                  'load'
                , () => 
                  {
                    LOC_o
                      .idb_o
                        .set__v
                      (
                        DATE_o
                          .dataTimeNumeric__s()
                      , JSON
                          .stringify
                          (
                            {
                              id_s:
                                id_s
                            , order_n:
                                EXP_o
                                  .order__n()
                            , display_b: true
                            , caption_s:
                                caption_s
                            , width_s:
                                img_e
                                  .naturalWidth
                            , height_s:
                                img_e
                                  .naturalHeight
                            , src_s:
                                img_e
                                  .src
                            }
                          )
                      )
                  }
                )
                }
              , false
          )
        
        const blob_o
        =
          await
          file_o
            .getFile()
  
        await
        reader_o
          .readAsDataURL( blob_o )

        img_e
          .parentNode      //: set figure_e selectable
            .addEventListener
            (
              'click',
              EXP_o
                .select__v
            )

        img_e
          .addEventListener
          (
            'click'
          , EXP_o
              .sizeEventFull__v
          )
      }
    }

    //-- EXP_o
    //--   .selectable__v()
  }


  
  ,   
  caption__v
  ()
  {
    const figure_e
    =
      EXP_o
        .selected__()
  
    if
    (
      figure_e
    )
    {
      const caption_e
      =
        document
          .getElementById( 'dialog_{{C_o.SECTION_a[2]}}_caption'  )
  
      caption_e
        .showModal()
    }
  }



  ,
  burst__v
  ()
  {
    const figure_e
    =
      EXP_o
        .selected__()
  
    if
    (
      figure_e
    )
    {
      const key_s =
        figure_e
          .dataset
            .key_s
  
      location
        .href
      =
        `local--burst.html?{{C_o.LOC_SEARCH_s}}=${key_s}`
    }
  }



, async store__v
  ()
  {
    const selected_b
    =
      window
        .confirm( 'Voulez-vous sauvegarder uniquement les images sélectionnées?' )

    let collect_a
    =
      await
      EXP_o
        .selected__
        ( 
          false              //???? : not only local 
        , selected_b         //: only selected
        , true               //: multiple images
        )

    if
    (
      ! collect_a
    )
    {
      return
    }
    //-->
    try
    {
      const store_a
      =
        []
  
      for
      (
        let figure_e
        of
        collect_a
      )
      {
        const key_s
        =
          figure_e
            .dataset
              .key_s

        store_a
          .push
          (
            {
              key_s:
                key_s
            , value_s:
                await
                LOC_o
                  .idb_o
                    .get__( key_s )
            }
          )
      }

      const json_s
      =
        JSON
          .stringify( store_a )
  
      const handle_o
      =
        await
        window
          .showSaveFilePicker
          (
            {
              suggestedName:
                DATE_o
                  .dataTimeNumeric__s()
                +
                '-expo.json'
            , types:
                [
                  {
                    accept:
                      {
                        'application/json':
                          [
                            '.json'
                          ]
                      }
                      ,
                  }
                ]
            }
          )    //: options ?
  
      const stream_o
      =
        await
        handle_o
          .createWritable()
  
      await
      stream_o
        .write( json_s )
  
      await
      stream_o
        .close()
    }
    catch
    (
      error_o
    )
    {
      console
        .log(`ERROR DETECTED @expo.js: ${ error_o }`)
    }
  }




, async restore__v    //: without erasing selected images
()
{
  if
  (
    ! EXP_o
        .remove__v()
  )
  {
    return
  }
  //-->
  //=== display file picker
  const
    handle_a
  =
    await
    window
      .showOpenFilePicker
      (
        {
          multiple:
            false
        , types:
          [
            {
              description:
                'fichier JSON'
            , accept:
                {
                  'application/json':
                    [
                      '.json'
                    ]
                }
            }
          ]
        }
      )

  if
  (
    ! handle_a
  )
  {
    return
  }
  //-->
  let file_o
  =
    handle_a
    [0]

  //=== put items in IndexedDB
  let reader_o
  =
    new FileReader()

  reader_o
    .onload
  =
    async () =>
    {
      const json_a
      =
        JSON
          .parse
          (
            reader_o
              .result
          )

      for
      (
        let item_o
        of
        json_a
      )
      {
        //?? await
        LOC_o
          .idb_o
            .set__v
            (
              item_o
                .key_s
            , item_o
                .value_s
            )
      }
  
      EXP_o
        .show__v()
    }

  reader_o
    .onerror
  =
    () =>
    {
      console
        .log
        (
          reader_o
            .error
        )
    }

  reader_o
    .readAsText
    (
      await
      file_o
        .getFile()
    )
}



, async captionEvent__v
(
    event_o
)
{
  const id_s
  =
    event_o
      .target
        .id

  const caption_e
  =
    document
      .getElementById( 'dialog_{{C_o.SECTION_a[2]}}_caption'  )

  switch
  (
    true
  )
  {
    case
      id_s
        .endsWith( 'cancel' )
    :
        caption_e
          .close()

    break

    case
      id_s
        .endsWith( 'reset' )
    :
      for
      (
        let input_e
        of
        document
          .querySelectorAll
          (
            `input[id^={{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_caption_][type=text]`
          )
      )
      {
        input_e
          .value
        =
          ''
      }

    break

    case
      id_s
        .endsWith( 'accept' )
    :
      const figure_e
      =
        EXP_o
          .selected__()
    
      if
      (
        figure_e
      )
      {
        const dialog_o
        =
          {}
    
        for
        (
          let input_e
          of
          Array
            .from
            (
              document
                .querySelectorAll
                (
                  `input[id^={{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_caption_][type=text]`
                )
            )
        )
        {
          const at_n
          =
            '{{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_caption_'
              .length
    
          const property_s
          =
            input_e
              .id
                .substring( at_n )
    
          dialog_o
            [ `${property_s}` ]
          =
            input_e
              .value
            ||
            ''
        }
    
        //=== see F_o.legend__s ==
        let legend_s
        =
          `<{{C_o.TABLE_TAG_s}} data-ins={{C_o.INS_IMG_s}}>`
          + `<{{C_o.ROW_TAG_s}}>${dialog_o.artist_s}</{{C_o.ROW_TAG_s}}>`
    
        const link_s
        =
          dialog_o
            .link_s
          
        if
        (
          link_s
        )
        {
          legend_s
          +=
            `<{{C_o.ROW_TAG_s}}><a href="${link_s}">${dialog_o.subject_s}</a></{{C_o.ROW_TAG_s}}>`
        }
        else
        {
          legend_s
          +=
            `<{{C_o.ROW_TAG_s}}>${dialog_o.subject_s}</{{C_o.ROW_TAG_s}}>`
        }
    
        legend_s
        +=
          `<{{C_o.ROW_TAG_s}}>${dialog_o.year_n}</{{C_o.ROW_TAG_s}}>`
          + `<{{C_o.ROW_TAG_s}}><i>${dialog_o.w_height_n}</i><i>${dialog_o.w_width_n}</i></{{C_o.ROW_TAG_s}}>`
          + `<{{C_o.ROW_TAG_s}}>${dialog_o.location_s}</{{C_o.ROW_TAG_s}}>`
          + `<{{C_o.ROW_TAG_s}}>${dialog_o.place_s}`

        legend_s
        +=
          dialog_o
              .place_s
            ?
              `{{C_o.IMG_LEGEND_DELIM_s}}`
            :
              ''

        legend_s +=
          `${dialog_o.country_s}</{{C_o.ROW_TAG_s}}>`
          + `</{{C_o.TABLE_TAG_s}}>`
    
        const key_s =
          figure_e
            .dataset
              .key_s
    
        let value_s =
          await
          LOC_o
            .idb_o
              .get__( key_s )
    
        if
        (
          value_s
        )
        {
          const value_o
          =
            JSON
              .parse( value_s )
    
          value_o
            .caption_s
          =
            legend_s
    
          value_o
            .caption_b
          =
            true      //: caption edited to display
    
          LOC_o
            .idb_o
              .set__v
              (
                key_s,
                JSON
                  .stringify( value_o )
              )
    
          EXP_o
            .show__v()

          caption_e
            .close()
        }
      }
      
    break

    default:
    break
  }

  }



, rangeEvent__v
  (
    event_o
  )
  {
    UI_o
      .rangeVar__v
      (
        event_o
          .target
      , '{{C_o.SECTION_a[2]}}_wrap_n'
      )
  }
  


  ,
  sizeEventFull__v
  (
    event_o
  )
  {
    if
    (
      EXP_o
        .full_e
    )
    {
      return    //: avoid click event when mouse up
    }
    //-->
    EXP_o
      .full_e
    =
      event_o
        .target
   
    if
    (
      EXP_o
        .full_e
          .parentNode
            .dataset
              .display_b
      ===
      'false'
    )
    {
      return
    }
    //-->
    EXP_o
      .full_e
        .classList
          .toggle( 'fullsize' )

    DRAG_o
      .init__v
      (
        EXP_o
          .full_e
      )

    DRAG_o
      .enable__v()

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_zoom_out_s'
      , 'flex'
      )
  }


  ,
  sizeEventTiny__v
  (
    //?? event_o
  )
  {
    EXP_o
      .full_e
        .classList
          .toggle( 'fullsize' )

    DRAG_o
      .disable__v()

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_zoom_out_s'
      , 'none'
      )

    //== reinsert img_e to restore initial place
    //-- EXP_o
    //--   .show__v()
    EXP_o
      .full_e
        .setAttribute
        (
          'style'
        , ''       //: remove drag transform
        )
        
    EXP_o
      .full_e
    =
      null
  }


  ,
  listen__v
  ()
  {
    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_wrap_n',
        '{{C_o.EXPO_WRAP_n}}'
      )

    document
      .getElementById( '{{C_o.LABEL_ID_s}}_{{C_o.SECTION_a[2]}}_zoom_out' )
        .addEventListener
        (
          'click'
        , EXP_o
            .sizeEventTiny__v
        )
    
    document
      .getElementById( '{{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_selectAll' )
        .addEventListener
        (
          'change'
        , EXP_o
            .selectAll__v
        )
  
    for
    (
      let id_s
      of
      [
        'hide'
      , 'remove'
      , 'group'
      , 'local'
      , 'caption'
      , 'store'
      , 'restore'
      , 'burst'
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `{{C_o.LABEL_ID_s}}_{{C_o.SECTION_a[2]}}_${id_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'click',
          EXP_o
            [ `${id_s}__v` ]
        )
    }

    for
    (
      let id_s
      of
      [
        'cancel'
      , 'reset'
      , 'accept'
      ]
    )
    {
      const listen_e =
        document
          .getElementById( `{{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_caption_${id_s}` )
          
      listen_e
      &&
      listen_e
        .addEventListener
        (
          'change',
          EXP_o
            .captionEvent__v
        )
    }

    for
    (
      let range_s
      of
      [
        'wrap_n',
        //?? other ranges
      ]
    )
    {
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
        DOM_o
          .listener__v
          (
            `{{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_${range_s}`
          , EXP_o
              .rangeEvent__v
          , event_s
          )
      }
    }

  }



  ,
  init__v
  ()
  {
    EXP_o
      .listen__v()
  
    EXP_o
      .show__v()
  }
}

EXP_o
  .init__v()
