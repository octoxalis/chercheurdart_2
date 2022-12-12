// === panorama.js ===
const PAN_o =
{
  //++ idb_o:          //: init in init__v

  local_a:
    []

  ,
  local_n:
    0


,
  async index__n
  ()
  {
    let index_n = 0

    await
    PAN_o
      .idb_o
        .walk__v
        (
          (
            key_s
          , item_o
          ) =>
          {
            const entry_o
            =
              {
                key_s: key_s,
                value_o:
                  JSON
                    .parse( item_o )
              }
      
            const order_n
            =
              item_o
                .order_n

            if
            (
              order_n
              >
              index_n
            )
            {
              index_n =
                order_n
            }
          }
        )

    return index_n
  }



  ,
  order__n
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



  ,
  img__e:
  (
    event_e
  ) =>
    event_e
      .target
        .parentNode
          .querySelector( 'img' )



  //?? ,
  //?? img__s:
  //?? (
  //??   src_s
  //?? ) =>
  //??   src_s
  //??     .substring
  //??     (
  //??       '{{C_o.MEDIA_DIR_s}}'
  //??         .length,
  //??       src_s
  //??         .lastIndexOf( '.' )      //: extension dot
  //??     )



  ,
  async show__v
  ()
  {
    let show_s = ''

    let show_a = []    //: array to reorder keys according to their order_n

    await
    PAN_o
      .idb_o
        .walk__v
        (
          (
            key_s
          , value_o
          ) =>
          {
            show_a
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

    show_a
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

    for
    (
      let show_o
      of
      show_a
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
        `<span data-ins="₉">`
         + `<b>{{C_o.NAV_LEGEND_o.panorama_local.legend_s}}</b>`
         + `<b>`
         +  value_o
              .id_s
         + `</b>`
         + `</span>`
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
        `<figure data-id="{{C_o.PANORAMA_ID_s}}${value_o.id_s}" data-display_b=${value_o.display_b} data-key_s="${show_o.key_s}">`
        + `<img src="${src_s}" width="${value_o.width_s}" height="${value_o.height_s}" loading="lazy">`
        + `<a href="#AC${value_o.id_s}">`
        + `<figcaption>`
        + caption_s
        + `</figcaption>`
        + `</a>`
        + `</figure>\n`
    }

    document
      .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry' )
        .innerHTML
    =
      show_s

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
      figure_e
        .addEventListener
        (
          'click',
          PAN_o
            .select__v,
        )
    }
  }



  ,
  select__v
  (
  event_e
  )
  {
    const selected_e
    =
      event_e
        .target
          .closest( 'figure' )

    selected_e
    &&
    selected_e
      .classList.toggle( '{{C_o.SELECTED_CLASS_s}}' )
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
        PAN_o
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
//--          after_b
          ! item_o
              .display_b

        PAN_o
          .idb_o
            .set__v
            (
              key_s,
              JSON
                .stringify( item_o )
            )
  
        PAN_o
          .show__v()
      }
    }

  }



  ,
  async group__v
  (
  )
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
        PAN_o
          .idb_o
            .get__( key_s )


      const value_o =
        JSON
          .parse
          (
            item_o
          )

      const order_n =
        PAN_o
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

      PAN_o
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
      PAN_o
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
  (
  )
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
      PAN_o
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
  }



  ,
  async add__v    //: add from site
  (
    event_e
  )
  {
    const img_e
    =
      PAN_o
        .img__e( event_e )

    let src_s
    =
      img_e
        .src

    src_s
    =
      src_s
        .substring
        (
          '{{C_o.MEDIA_DIR_s}}'
            .length,
          src_s
            .lastIndexOf( '.' )      //: extension dot
        )

      const id_s
      =
        event_e
          .target
            .parentNode
              .id
  
      const caption_e =    //: galery node
        document
          .querySelector
          (
            `#{{C_o.GALERY_ID_s}}`
            + id_s
                .substring( 2 )    //: skip leading ASIDE_GRAY_ID_s or ASIDE_COLOR_ID_s
            + ` figcaption`
          )

      PAN_o
        .idb_o
          .set__v
        (
          src_s
        , JSON
            .stringify
            (
              {
                id_s:    //: AG1383
                  id_s
              , order_n: PAN_o
                           .order__n()
              , display_b: true
              , caption_s: caption_e
                             .innerHTML
              , width_s: img_e
                           .width
              , height_s: img_e
                            .height
              }
            )
        )

      PAN_o
        .show__v()
  }



  ,
  async local__v  //: add from local file system
  (
  )
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
      PAN_o
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
          `<figure data-id="{{C_o.PANORAMA_ID_s}}_${id_s}" data-display_b=true data-key_s="${fileName_s}">`  //: display_b = true
          + `<img id="{{C_o.PANORAMA_IMG_PREFIX_s}}_${local_n}" loading="lazy">`  //!!! no src, width, height attributes
          + `<a href="#">`
          + `<figcaption>${id_s}</figcaption>`
          + `</a>`
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
            `#{{C_o.PANORAMA_IMG_PREFIX_s}}_${local_n}`
          )

      if
      (
        img_e
      )
      {
        let dataSource_s = 'dataSource_s'

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

              PAN_o
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
                          PAN_o
                            .order__n()
                      , display_b: true
                      , caption_s:
                          caption_s
                      , width_s:  0
                      , height_s: 0
                      , src_s:
                          img_e
                            .src
                      }
                    )
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
              PAN_o
                .select__v,
            )
      }
    }
  }


  
  ,
  rangeEvent__v
  (
    event_o
  )
  {
    UI_o
      .rangeVar__v
      (
        event_o
          .target
      , '{{C_o.SECTION_a[2]}}_col_n'
      )
  }
  


  ,
  listen__v
  ()
  {
    for
    (
      let id_s
      of
      [
        'hide',
        'remove',
        'group',
        'local'
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
          PAN_o
            [ `${id_s}__v` ]
        )
    }

    for
    (
      let label_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `figure > label[data-legend="{{C_o.NAV_LEGEND_o.panorama.legend_s}}"]` )
        )
    )
    {
      label_e
        .addEventListener
        (
          'click',
          PAN_o
            .add__v,
        )
    }

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_n',
        PAN_o
          .index__n()
      )

    for
    (
      let range_s
      of
      [
        'col_n',
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
          , PAN_o
              .rangeEvent__v
          , event_s
          )
      }
    }

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_col_n',
        '{{C_o.PANORAMA_COL_n}}'
      )
  }



  ,
  init__v
  ()
  {
    PAN_o
      .idb_o
    =
      new Idb
      (
        '{{A_o.ID_s}}_idb'
      , '{{A_o.ID_s}}_store'
      )
  
    PAN_o
      .listen__v()
  
    PAN_o
      .show__v()
  }

}

PAN_o
  .init__v()
