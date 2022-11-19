// === panorama.js ===
const PAN_o =
{
  index__n:
  () =>
  {
    let index_n = 0

    for
    (
      let at_n = 0;
      at_n < localStorage.length;
      ++at_n
    )
    {
      const key_s =
        localStorage.key( at_n )

      const created_n =
        JSON
          .parse
          (
            localStorage
              .getItem( key_s )
         )
           .created_n

      if
      (
        created_n
        >
        index_n
      )
      {
        index_n =
          created_n
      }
    }

    return index_n
  }
  ,



  nextIndex__n:
  () =>
  {
    const next_n =
      +DOM_o
        .rootVar__s( '--{{C_o.SECTION_a[2]}}_n' )
      +
      1

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_n',
        next_n
      )

    return next_n
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
  ,



  img__s:
  (
    src_s
  ) =>
    src_s
      .substring
      (
        '{{C_o.MEDIA_DIR_s}}'
          .length,
        src_s
          .lastIndexOf( '.' )      //: extension dot
      )
  ,



  add__v:
  (
    event_e
  ) =>
  {
    const img_e =
      PAN_o
        .img__e( event_e )

    const src_s =
      PAN_o
        .img__s( img_e.src )

    if
    (
      !localStorage
        .getItem( src_s )
    )
    {
      let id_s =
        event_e
          .target
            .parentNode
              .id
                .substring( 2 )    //: skip leading ASIDE_GRAY_ID_s or ASIDE_COLOR_ID_s
    
      const caption_e =
        document
          .querySelector( `#{{C_o.GALERY_ID_s}}${id_s} figcaption` )

        id_s +=
          '_'
          + src_s
              .substring
              (
                src_s
                  .lastIndexOf( '/' )
                +
                1    //: gray | color
              )
  
      localStorage
        .setItem
        (
          src_s,
          JSON
            .stringify
            (
              {
                id_s: id_s,
                created_n: PAN_o.nextIndex__n(),
                width_s: img_e.width,
                height_s: img_e.height,
                caption_s: caption_e.innerHTML,
                display_b: true,
              }
            )
        )

      PAN_o
        .show__v()
    }
  }
  ,



  show__v:
  () =>
  {
    let figure_s = ''
    let storage_a = []    //: array to reorder localStorage keys according to their creation order

    for
    (
      let at_n = 0;
      at_n < localStorage.length;
      ++at_n
    )
    {
      const key_s =
        localStorage.key( at_n )

      storage_a
        .push
        (
          {
            key_s: key_s,
            value_o:
              JSON
                .parse
                (
                  localStorage
                    .getItem( key_s )
               )
          }
        )
    }

    storage_a
      .sort
      (
        (
          first_o,
          second_o
        ) =>
          first_o
            .value_o
              .created_n
          -
          second_o
            .value_o
              .created_n            
      )

    for
    (
      at_o
      of
      storage_a
    )
    {
      const item_o =
        at_o
          .value_o

      figure_s +=
        `<figure data-id="{{C_o.PANORAMA_ID_s}}${item_o.id_s}" data-display_b="${item_o.display_b}">`
        + `<img src="{{C_o.MEDIA_DIR_s}}${at_o.key_s}.avif" width="${item_o.width_s}" height="${item_o.height_s}" loading="lazy">`
        + `<a href="#AC${item_o.id_s}">`
        + `<figcaption>`
        + item_o.caption_s
        + `</figcaption>`
        + `</a>`
        + `</figure>\n`
    }

    document
      .getElementById( '{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry' )
        .innerHTML =
          figure_s

    for
    (
      figure_e
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



  select__v:
  (
  event_e
  ) =>
  {
    const selected_e =
      event_e
        .target
          .closest( 'figure' )

    selected_e
    &&
    selected_e
      .classList.toggle( '{{C_o.SELECTED_CLASS_s}}' )

  }
  ,



  hide__v:
  (
  ) =>
  {
    for
    (
      figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `figure.{{C_o.SELECTED_CLASS_s}}` )
        )
    )
    {
      //... display_b = false
      figure_e
        .dataset
          .display_b =
            false

      //... change localStorage display_b
      const src_s =
        PAN_o
          .img__s
          (
            figure_e
              .querySelector( 'img' )
                .src
          )

      let item_s =
        localStorage
          .getItem( src_s )

      if
      (
        item_s
      )
      {
        let match_a =
          item_s
            .match
            (
              /"display_b":(?<display_b>true|false)/i
            )

        const before_s =
          match_a
            .groups
              .display_b

        const after_s =
          before_s
          ===
          'false'
          ?
            'true'
          :
            'false'

        localStorage
          .setItem
          (
            src_s,
            item_s
              .replace
              (
                `"display_b":${before_s}`,    //: JSON
                `"display_b":${after_s}`      //: idem
              )
          )
  
        PAN_o
          .show__v()
      }
    }

  }
  ,



  remove__v:
  (
  ) =>
  {
    for
    (
      figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `figure.{{C_o.SELECTED_CLASS_s}}` )
        )
    )
    {
      localStorage
        .removeItem        //: before deleting figure_e
        (
          PAN_o
            .img__s
            (
              figure_e
                .querySelector( 'img' )
                  .src
            )
        )

      figure_e
        .parentNode
          .removeChild( figure_e )  
    }
  }
  ,



  group__v:
  (
  ) =>
  {
    let parent_e
    let after_e
    let sibling_e

    for
    (
      figure_e
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
        parent_e =
          figure_e
            .parentNode

        after_e =
          figure_e

        continue
      }
                    
      //... group figure_e
      const remove_e =
        parent_e
          .removeChild( figure_e )

      parent_e
        .insertBefore
        (
          remove_e,
          after_e
            .nextSibling
        )

      after_e =
        remove_e
      

    }

      //... change localStorage item
    let storage_a = []    //: array to keep localStorage keys according to their creation order

    for
    (
      figure_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `#{{C_o.DIV_ID_s}}_{{C_o.SECTION_a[2]}}_masonry > figure` )
        )
    )
    {
      const src_s =
        PAN_o
          .img__s
          (
            figure_e
              .querySelector( 'img' )
                .src
         )

      //: change created_n value
      const value_o =
        JSON
          .parse
          (
            localStorage
              .getItem( src_s )
          )

      const next_n =
        PAN_o
        .  nextIndex__n()

      value_o
        .created_n =
          next_n

      //: copy & empty localStorage
      storage_a
        .push
        (
          {
            key_s: src_s,
            value_s:
              JSON
                .stringify( value_o )
          }
        )

      localStorage
        .removeItem( src_s )
    }

    //: recreate localStorage according to DOM order
    for
    (
      at_a
      of
      storage_a
    )
    {
      localStorage
        .setItem
        (
          at_a
            .key_s,
          at_a
            .value_s
        )
    }
  }
  ,



  rangeEvent__v:
  (
    event_o
  ) =>
  {
    const range_e =
      event_o
        .target

    const value_s =
      range_e
        .value
  
    range_e
      .dataset
        .tip =
          value_s

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_col_n',
        value_s
      )
  }
  ,



  listen__v:
  () =>
  {
    for
    (
      let id_s
      of
      [
        'hide',
        'remove',
        'group',
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
      label_e
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
            `{{C_o.INPUT_ID_s}}_{{C_o.SECTION_a[2]}}_${range_s}`,
            PAN_o
              .rangeEvent__v,
            event_s
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

}
