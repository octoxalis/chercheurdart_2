//=== Build global data access

const DATA_a =    // default exported data: front matter properties list
[
  'layout',
  'permalink',
  'nomap_b',

  'doc_n',
  'expires_n',

  'title_s',
  'subtitle_s',
  'abstract_s',

  'A_o',
  'C_o',
]

module.exports =
{
  data__o
  (
    permalink_s,
    collection_a
  )
  {
    let export_o = {}

    for
    (
      const collection_o
       of
       collection_a
    )
    {
      //;console.log( collection_o.data )
      const data_o =
        collection_o
          .data
      if
      (
        data_o
          .permalink
        ===
        permalink_s
      )
      {
        if
        (
          data_o
            .export_a
          ===
          null
        )
        {
          export_o =
            data_o    //: get all data!
        }
        else
        {
          for
          (
            prop_s
            of
            data_o
              .export_a
            ||
            DATA_a
          )
          {
            export_o[prop_s] =
              data_o
                [prop_s]
          }



        }
      }
    }
      
    return export_o
  }
,



}
