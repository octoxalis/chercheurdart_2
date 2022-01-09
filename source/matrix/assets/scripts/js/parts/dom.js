// === dom.js ===
const DOM_o =
{
  rootVar__v:
  (
    varName_s,
    value_s
    ) =>
      document
        .documentElement
          .style
            .setProperty
            (
              varName_s,
              value_s
            )
  ,
  
  
  rootVar__s:
  ( 
    varName_s
  ) => 
    window
      .getComputedStyle
      (
        document
          .documentElement
      )
        .getPropertyValue( varName_s )
        ||
        ''
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
        DOM_o
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



}
