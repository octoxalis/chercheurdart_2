//=== iframe.js ===

const IFR_o =
{
  adopt__v:    //!!! ensure id_s
  (
    iframe_s,     //: iframe element ID
    adopter_s,    //: adopter element ID
    callback_f
  ) =>
  {
    try
    {
      const iframe_e =
        document
          .getElementById( iframe_s )
    
      const src_e =      //: adopted element body
        iframe_e
          .contentDocument
            .body
        ||
        iframe_e
          .contentDocument
    
      const adopted_e =
        src_e
          .children[0]
    
      document
        .getElementById( adopter_s )    //: adopter
        .appendChild( adopted_e )
    
      callback_f
      &&
      callback_f
      (
        iframe_e,
        adopted_e
      )

      iframe_e
        .remove()
    }
    catch
    (
      error_o
    )
    {
      console
        .log(`ERROR DETECTED @iframe.js: ${ error_o }`)
    }
  }
  ,
}