// === dateTime.js ===

const DATE_o
=
{
  dataTimeNumeric__s
  (
      name_b=true      //: for file name
    , iso_s=new Date().toISOString()
    , locale_s='fr-FR'
  )
  {
    let dateTime_s
    =
      new Intl
          .DateTimeFormat
          (
            locale_s
            , {
                year:  'numeric'
              , month: 'numeric'
              , day:   'numeric'
              , hour:  'numeric'
              , minute: 'numeric'
              , second: 'numeric'
              }
          )
            .format
            (
              new Date( iso_s )
            )
  
    if
    (
      name_b
    )
    {
      dateTime_s
      =
        dateTime_s
          .replaceAll
          (
            '/'
          , '-'
          )
          .replaceAll
          (
            ':'
          , '-'
          )
          .replaceAll
          (
            ' '
          , '_'
          )
    }
  
    return dateTime_s
  }
}
