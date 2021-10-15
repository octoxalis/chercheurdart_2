//========================================================= media_0.js
const M0_o = {}


M0_o.imgLoad__o =
async ( img_e, src_s ) =>
{
    let img_p = Dom_o.waitOnload__v( img_e )
    img_e.src = src_s
    await img_p
    img_e.setAttribute( 'data-srcWidth', img_e.naturalWidth )
    img_e.setAttribute( 'data-srcHeight', img_e.naturalHeight )
    return img_e
}



M0_o.initImg__o =
async id_s =>
{
  const img_e = document.getElementById( id_s )
  await M0_o.imgLoad__o( img_e, `{{U_o.url_s}}{{D_o.distDirs.images}}${Dom_o.urlToId__s()}.jpg` )
  return img_e
}



M0_o.initScan__o =
async () =>
{
  if ( !M0_o.img_e ) M0_o.img_e = await M0_o.initImg__o( 'ca_media_0_img' )
  const M0_scan_o =
  {
    hue_n:       MEDIA_o.HUE_n,
    lum_n:       MEDIA_o.LUM_n,
    canvasId_s: `ca_media_0_processor_canvas`,
    imageId_s:  `ca_media_0_img`,
  }
  M0_o.scan_c = new ColorScan( M0_scan_o )
  await M0_o.scan_c
    .display__c( 'inline' )
    .scan__c()
}



M0_o.cloneScan__o =
async () =>
{
  if ( !M0_o.scan_c ) await M0_o.initScan__o()
  const scan_o = deepCopy__c( M0_o.scan_c )
  return scan_o
}



//.................. REFACTOR in user.js
M0_o.initImg__v = ( img_e, user_o=null ) =>
{
  const src_s = img_e.getAttribute( 'src' )
  if ( user_o )    //: user image
  {
    const gallery_e = document.getElementById( 'ca_media_0_img' )
    gallery_e.setAttribute( 'src', src_s )
    gallery_e.setAttribute( 'data-srcWidth', user_o.width )
    gallery_e.setAttribute( 'data-srcHeight', user_o.height )
    const file_s = user_o.file_s.replace( /\.jpe?g/i, '' )
    document.getElementById( 'ca_post_file_user' )
      .innerHTML = file_s
    document.getElementById( 'ca_list_imgs_legend_file_user' )
      .innerHTML = file_s
    const id_s = user_o.id_s
    document.getElementById( 'ca_post_id_user' )
      .innerHTML = id_s  || 'Description indéterminée'
    document.getElementById( 'ca_list_imgs_legend_id_user' )
      .innerHTML = id_s  || 'Description indéterminée'
      const tag_s = user_o.tag_s
    document.getElementById( 'ca_post_tag_user' )
      .innerHTML = tag_s || 'Galerie indéterminée'
    document.getElementById( 'ca_list_imgs_legend_tag_user' )
      .innerHTML = tag_s || 'Galerie indéterminée'
    const edit_e = document.getElementById( 'ca_user_collection_note_edit' )
    edit_e.value = user_o.note_s
    const publish_e = document.getElementById( 'ca_user_collection_note_publish' )
    publish_e.innerHTML = marked( edit_e.value )
      
  }
}



//.................. REFACTOR in user.js
M0_o.init__v =
( img_e, user_o=false ) => M0_o.initImg__v( img_e, user_o )



//== INIT    
void async function ()
{
  try
  {
    M0_o.img_e = await M0_o.initImg__o( 'ca_media_0_img' )


//.................. REFACTOR in user.js
    if ( location.pathname.includes( 'collection_item' ) ) userImgInit( M0_o.init__v )
  }
  catch ( error ) { console.log(`ERROR DETECTED @M0_init: ${ error }`) }
} ()
