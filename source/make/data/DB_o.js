module.exports =
{
  form__s:
  (
    schema_s
  ) =>
  {
    if
    (
      schema_s
      ===
      'artist'
    )
    {
      return (
`<form id=${schema_s}_form>
<label>${schema_s}_id_s</label>
<input id=${schema_s}_id_s type=text />
<label>forename_s</label>
<input id=forename_s type=text />
<label>lastname_s</label>
<input id=lastname_s type=text />
<label>nickname_s</label>
<input id=nickname_s type=text title="empty if unknown or none"/>
<label>birth_date_n</label>
<input id=birth_date_n type=number title="float for range (1600.1610)"/>
<label>death_date_n</label>
<input id=death_date_n type=number title="float for range (1600.1610)"/>
<label>birth_place_s</label>
<input id=birth_place_s type=text title="empty if unknown"/>
<label>death_place_s</label>
<input id=death_place_s type=text title="empty if unknown"/>
<button id=${schema_s}_save>save</button>
</form>
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
`<form id=${schema_s}_form>
<label>${schema_s}_id_s</label>
<input id=${schema_s}_id_s type=text />
<label>location_s</label>
<input id=location_s type=text />
<label>place_s</label>
<input id=place_s type=text />
<label>country_s</label>
<input id=country_s type=text />
<button id=${schema_s}_save>save</button>
</form>
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
`<form id=${schema_s}_form>
<label>${schema_s}_id_s</label>
<input id=${schema_s}_id_s type=text />
<label>artist_s</label>
<input id=artist_s type=text />
<label>year_n</label>
<input id=year_n type=number  title="float for range (1703.1705)"/>
<label>subject_s</label>
<input id=subject_s type=text />
<label>w_height_n</label>
<input id=w_height_n type=number  title="0 if unknown"/>
<label>w_width_n</label>
<input id=w_width_n type=number  title="0 if unknown"/>
<label>height_n</label>
<input id=height_n type=number />
<label>width_n</label>
<input id=width_n type=number />
<label>default_a</label>
<input id=default_a type=text />
<button id=${schema_s}_save>save</button>
</form>
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
    return `${schema_s} list`
  }
  ,
}