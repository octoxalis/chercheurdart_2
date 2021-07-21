const DB_o = require( '../lib/db.js' )
//??const C_o = require( './C_o.js' )




module.exports =
{
  form__s:
  (
    schema_s
  ) =>
  {
    //...............
    //...DB_o
    //...  .initDB__v()
    //...............
    if
    (
      schema_s
      ===
      'artist'
    )
    {
      return (
`<h3>${schema_s}</h3>
<dl id=${schema_s}_form class=db_list>
<!--<dt>${schema_s}</dt>-->
<dt>${schema_s}_id_s</dt>
<dd><input id=${schema_s}_id_s type=text /></dd>
<dt>forename_s</dt>
<dd><input id=forename_s type=text autocomplete=off /></dd>
<dt>lastname_s</dt>
<dd><input id=lastname_s type=text autocomplete=off /></dd>
<dt>nickname_s</dt>
<dd><input id=nickname_s type=text title="empty if unknown or none" /></dd>
<dt>birth_date_n</dt>
<dd><input id=birth_date_n type=number title="delta float for range (1600.10)" /></dd>
<dt>death_date_n</dt>
<dd><input id=death_date_n type=number title="delta float for range (1600.10)" /></dd>
<dt>birth_place_s</dt>
<dd><input id=birth_place_s type=text title="empty if unknown" /></dd>
<dt>death_place_s</dt>
<dd><input id=death_place_s type=text title="empty if unknown" /></dd>
</dl>
<button id=${schema_s}_save>save</button>
`
      )
    }

    if
    (
      schema_s
      ===
      'collection'
    )
    {
      return (
`<h3>${schema_s}</h3>
<dl id=${schema_s}_form class=db_list>
<!--<dt>${schema_s}</dt>-->
<dt>${schema_s}_id_s</dt>
<dd><input id=${schema_s}_id_s type=text /></dd>
<dt>location_s</dt>
<dd><input id=location_s type=text /></dd>
<dt>place_s</dt>
<dd><input id=place_s type=text /></dd>
<dt>country_s</dt>
<dd><input id=country_s type=text /></dd>
</dl>
<button id=${schema_s}_save>save</button>
`
      )
    }
    if
    (
      schema_s
      ===
      'work'
    )
    {
      return (
`<h3>${schema_s}</h3>
<dl id=${schema_s}_form class=db_list>
<!--<dt>${schema_s}</dt>-->
<dt>${schema_s}_id_s</dt>
<dd><input id=${schema_s}_id_s type=text /></dd>
<dt>artist_s</dt>
<dd><input id=artist_s type=text /></dd>
<dt>year_n</dt>
<dd><input id=year_n type=number  title="delta float for range (1703.02)" /></dd>
<dt>subject_s</dt>
<dd><input id=subject_s type=text /></dd>
<dt>w_height_n</dt>
<dd><input id=w_height_n type=number  title="0 if unknown" /></dd>
<dt>w_width_n</dt>
<dd><input id=w_width_n type=number  title="0 if unknown" /></dd>
<dt>height_n</dt>
<dd><input id=height_n type=number /></dd>
<dt>width_n</dt>
<dd><input id=width_n type=number /></dd>
<dt>default_a</dt>
<dd><input id=default_a type=text /></dd>
</dl>
<button id=${schema_s}_save>save</button>
`
      )
    }
  }
  ,




 list__s:
  (
    schema_s
  ) =>
  {
    let db_o =
      DB_o
        .db__s()

    let list_s = ''

    if
    (
      schema_s
      ===
      'artist'
    )
    {
      for
      (
        const artist_o
        in
        db_o
          .artist
      )
      {
        const at_o =
          db_o
            .artist
              [artist_o]
        
        list_s +=
          `<dl class=db_list>
          <dt>${schema_s}_id_s</dt>
          <dd>${at_o.id_s}</dd>
          <dt>forename_s</dt>
          <dd>${at_o.forename_s}</dd>
          <dt>lastname_s</dt>
          <dd>${at_o.lastname_s}</dd>
          <dt>nickname_s</dt>
          <dd>${at_o.nickname_s}</dd>
          <dt>birth_date_n</dt>
          <dd>${at_o.birth_date_n}</dd>
          <dt>death_date_n</dt>
          <dd>${at_o.death_date_n}</dd>
          <dt>birth_place_s</dt>
          <dd>${at_o.birth_place_s}</dd>
          <dt>death_place_s</dt>
          <dd>${at_o.death_place_s}</dd>
          </dl>
          `
      }

      return list_s
    }

    if
    (
      schema_s
      ===
      'collection'
    )
    {
      for
      (
        const collection_o
        in
        db_o
          .collection
      )
      {
        const at_o =
          db_o
            .collection
              [collection_o]
        
        list_s +=
          `<dl class=db_list>
          <dt>${schema_s}_id_s</dt>
          <dd>${at_o.id_s}</dd>
          <dt>location_s</dt>
          <dd>${at_o.location_s}</dd>
          <dt>place_s</dt>
          <dd>${at_o.place_s}</dd>
          <dt>country_s</dt>
          <dd>${at_o.country_s}</dd>
          </dl>
          `
      }

      return list_s
    }

    if
    (
      schema_s
      ===
      'work'
    )
    {
      for
      (
        const work_o
        in
        db_o
          .work
      )
      {
        const at_o =
          db_o
            .work
              [work_o]
        
        list_s +=
          `<dl class=db_list>
          <dt>${schema_s}_id_s</dt>
          <dd>${at_o.id_s}</dd>
          <dt>artist_s</dt>
          <dd>${at_o.artist_s}</dd>
          <dt>year_n</dt>
          <dd>${at_o.year_n}</dd>
          <dt>subject_s</dt>
          <dd>${at_o.subject_s}</dd>
          <dt>w_height_n</dt>
          <dd>${at_o.w_height_n}</dd>
          <dt>w_width_n</dt>
          <dd>${at_o.w_width_n}</dd>
          <dt>height_n</dt>
          <dd>${at_o.height_n}</dd>
          <dt>width_n</dt>
          <dd>${at_o.width_n}</dd>
          <dt>default_a</dt>
          <dd>${at_o.default_a}</dd>
          </dl>
          `
      }

      return list_s
    }
  }
  ,


}