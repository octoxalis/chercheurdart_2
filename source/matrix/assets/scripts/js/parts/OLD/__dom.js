//========================================================= dom.js
const Dom_o = {}



Dom_o.fragment__e =
( code_s ) =>
{
  const fragment_e = document.createDocumentFragment()
  const div_e = document.createElement( 'div' )
  div_e.innerHTML = code_s
  while( div_e.firstChild ) fragment_e.appendChild( div_e.firstChild )
  return fragment_e
}


Dom_o.importHtml__v =
( url_s, insert_s, callback_f ) =>
{
  const insert_e = document.getElementById( insert_s )
  if ( insert_e === null ) return  //: insertion tag not in document
  fetch( url_s )
    .then( ( response_o ) => response_o.text() )
    .then( ( code_s ) =>
    {
      insert_e.after( Dom_o.fragment__e( code_s ) )
      if ( callback_f ) callback_f()
    })
    .catch( ( err ) => console.log( 'Failed to fetch page: ', err ) )
}


Dom_o.importAsset__v =
( url_s, insert_s, callback_f ) =>
{
  const insert_e = document.getElementById( insert_s )
  if ( insert_e === null ) return  //: insertion tag not in document
  const ext_s = url_s.substring( url_s.lastIndexOf('.')+1, url_s.length )
  if ( ext_s === '' ) return //: unknown file extension
  let asset_e
  switch ( ext_s )
  {
    case 'js' :
    {
      asset_e = document.createElement( 'script' )
      asset_e.src = url_s
      asset_e.async = true
      break
    }
    case 'css' :
    {
      asset_e = document.createElement( 'link' )
      asset_e.href = url_s
      asset_e.rel = 'stylesheet'
      break
    }
    default: return
  }
  
  if ( callback_f ) asset_e.onload = callback_f
  insert_e.after( asset_e )
}


Dom_o.waitOnload__v =
( element_e ) =>
{
  return new Promise( ( resolve_f, reject_f ) =>
  {
    element_e.onload = () => resolve_f( element_e )
    element_e.onerror = reject_f
  } )
}


Dom_o.style__s =
( elementId_s, property_s ) =>
{
  let style_e = document.getElementById( elementId_s )
  return ( style_e ) ? window.getComputedStyle( style_e ).getPropertyValue( property_s ) : ''
}


Dom_o.computedDimension__n =
( element_e, dimension_s ) =>  // 'width' || 'height'
{
  const dim_s = window.getComputedStyle( element_e ).getPropertyValue( dimension_s )
  return +(dim_s.slice( 0, -2 ))    //: trim 'px'
}


Dom_o.rootVar__v =
( varName_s, value_s ) => document.documentElement.style.setProperty( varName_s, value_s )


Dom_o.rootVar__s =
( varName_s ) => window.getComputedStyle( document.documentElement ).getPropertyValue( varName_s ) || ''


Dom_o.toggle__v =
( id_s, class_s ) => document.getElementById( id_s ).classList.toggle( class_s )


Dom_o.elementToggle__v =
( id_e, class_s ) => id_e.classList.toggle( class_s )


Dom_o.resetNode__v =
( nodeId_s ) =>
{
  const node_e = document.getElementById( nodeId_s )
  while ( node_e.firstChild ) node_e.removeChild( node_e.firstChild )
  return node_e
}


Dom_o.swapNode__v =
( current_e, other_e ) =>
{
  current_e.before( other_e )
  current_e.remove()
}


Dom_o.strimHTML__s =
( string_s ) => string_s.replace( /(<([^>]+)>)/ig, '' )


Dom_o.urlToId__s =
() =>
{
  const url_s = location.href
  return url_s.slice( url_s.lastIndexOf( '/' ) + 1, url_s.indexOf( '.html' ) )
}


Dom_o.imgDim__o =
( imgId_s ) =>
{
  const img_e = document.getElementById( imgId_s )
  return { width: img_e.getAttribute( 'data-srcWidth' ), height: img_e.getAttribute( 'data-srcHeight' ) }
}