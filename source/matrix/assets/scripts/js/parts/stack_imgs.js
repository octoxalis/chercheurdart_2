// === stack_imgs.js ===
//--STACK_o

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
          .createContextualFragment( `<img src="{{C_o.IMG_DIR_s}}${work_s}/full/_128/0/gray.avif">` )
      )
  }
  ,



  listener__v
  ()
  {
    const list_e =
      document
        .getElementById( `main_img_list` )
        
    list_e
    &&
    list_e
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

    const select_e =
      document
        .getElementById( `button_{{C_o.STAT_a[3]}}_imgs_select` )
        
    select_e
    &&
    select_e
      .addEventListener
      (
        'click',
        click_o =>
        {
          for
          (
            let input_e
            of
            Array
            .from
            (
              list_e
                .querySelectorAll( 'input:checked' )
            )
          )
          {
            STACK_o
              .addWork__v
              (
                input_e
                  .id
              )
          }
        }
      )
  }
  ,


}




S_IMGS_o
  .listener__v()




//...??S_IMGS_o
//...??  .worker_o =
//...??    STAT_o
//...??      .worker__o
//...??      (
//...??        '{{C_o.STAT_a[2]}}',
//...??        'LogScale Painter',
//...??        S_IMGS_o.message__v,
//...??      )
