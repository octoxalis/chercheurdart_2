// === location.js ===

const LOC_o =
{
  //++ search_s      //: used by burst for local image, from location.search
  //++ idb_o 



  async search__    //: return search string|| IDb object || IDb object property
  (
    query_s='{{C_o.LOC_SEARCH_s}}'
  )
  {
    const loc_s
    =
      location
        .search

    if
    (
      ! loc_s
    )
    {
      return null    //: no search
    }
    //-->
    const param_o
    = 
      (
        new URL
        (
          document
            .location
        )
      )
        .searchParams
  
    const search_s
    =
      param_o
        .get( '{{C_o.LOC_SEARCH_s}}' )

    if
    (
      query_s
      ===
     '{{C_o.LOC_SEARCH_s}}'
    )
    {
      LOC_o
         .search_s
       =
         search_s
  
      return search_s    //: search string
    }
    //-->
    const key_s    //: for readibility
    =
      search_s

    const value_s    //; JSON entry
    =
      await
      LOC_o
        .idb_o
          .get__( key_s )
  
    let value_o =
      JSON
        .parse
        (
          value_s
        )

    return (
      query_s
      ===
      '{{C_o.LOC_JSON_s}}'
      ?
        value_o         //: Idb JSON object
      :
       value_o
         [ key_s ]     //: Idb JSON object property
    )    
  }



  ,
  init__v
  ()
  {
    LOC_o
      .idb_o
    =
      new Idb
      (
        '{{A_o.ID_s}}_idb'
      , '{{A_o.ID_s}}_store'
      )
  }
}



LOC_o
  .init__v()

