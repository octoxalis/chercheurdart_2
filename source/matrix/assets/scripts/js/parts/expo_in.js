//=== expo_input.js ===

const EXI_o
=
{
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
  async index__n
  ()
  {
    let index_n = 0

    await
    IDB_o
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
  async add__v    //: add from site
  (
    event_o
  )
  {
    const figure_e
    =
      event_o
        .target
          .closest( 'figure' )

    const img_e
    =
      figure_e
        .querySelector( 'img' )

    let src_s
    =
      img_e
        .src

    const key_s
    =
      '{{C_o.PRO_SITE_s}}'
      +
      DATE_o
        .dataTimeNumeric__s()

    const id_s
    =
      figure_e
        .id
  
    const caption_e =    //: galery node
      document
        .querySelector
        (
          `#{{C_o.GALLERY_ID_s}}`
          + id_s
              .substring( 2 )    //: skip leading ASIDE_GRAY_ID_s or ASIDE_COLOR_ID_s
          + ` figcaption`
        )

    IDB_o
      .idb_o
        .set__v
      (
        key_s
      , JSON
          .stringify
          (
            {
              id_s:    //: AC1383
                id_s
            , order_n:
                EXI_o
                  .order__n()
            , display_b:
                true
            , caption_s: 
                caption_e
                  .innerHTML
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


  
  ,
  async listener__v
  ()
  {

    for
    (
      let label_e
      of
      Array
        .from
        (
          document
            .querySelectorAll( `figure > label[data-legend="{{C_o.NAV_LEGEND_o.expo.legend_s}}"]` )
        )
    )
    {
      label_e
        .addEventListener
        (
          'click',
          EXI_o
            .add__v,
        )
    }

    const index_n
    =
      await
      EXI_o
        .index__n()

    DOM_o
      .rootVar__v
      (
        '--{{C_o.SECTION_a[2]}}_n'
      , index_n
      )

  }



  ,
  init__v
  ()
  {
    EXI_o
      .listener__v()

  }
}



EXI_o
  .init__v()