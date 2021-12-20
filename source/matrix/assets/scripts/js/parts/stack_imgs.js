// === stack_imgs.js ===

const S_IMGS_o =
{
  displayImg__v:
  (
    work_s
  ) =>
  {
    const aside_e =
      document
        .getElementById( `aside_img_thumb` )

    const img_e =
      aside_e
        .firstChild

    img_e
    &&
    aside_e
      .removeChild( img_e )
    
    aside_e
      .appendChild
      (
        document
          .createRange()
          .createContextualFragment( `<img src="/assets/media/img/${work_s}/full/_128/0/gray.avif">` )
      )
  }
  ,



  listener__v
  ()
  {
    const listen_e =
      document
        .getElementById( `DI_img_list_items` )
        
    listen_e
    &&
    listen_e
      .addEventListener
      (
        'click',
        click_o =>
        {
          const work_s =
            click_o
              ?.target
              ?.closest( 'input' )     //: keep only input, skip label
              ?.id

          work_s
          &&
          S_IMGS_o
            .displayImg__v( work_s )
    }
      )
  }
  ,



}



//...??S_IMGS_o
//...??  .worker_o =
//...??    STAT_o
//...??      .worker__o
//...??      (
//...??        '{{C_o.STAT_a[2]}}',
//...??        'LogScale Painter',
//...??        S_IMGS_o.message__v,
//...??      )


S_IMGS_o
  .listener__v()
