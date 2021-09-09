const FS_o  = require( 'fs-extra' )




const COM_o =
{
  form__s:
  (
    permalink_s
  ) =>
  {
    return (
      FS_o
      .readFileSync
      (
        'make/lib/comment_dialog.html',
        {
          encoding:'utf-8',
          flag:'r'
        }
      )
      .replace
      (
        '${permalink_s}',
        permalink_s
      )
    )
  }
  ,

}



module.exports = COM_o



/*
    <label for="I1_0" tabindex="-1">▾</label>
    <input id="I1_0" type="checkbox">
    <ins>
      <span data-ins="subsid" data-spec="₀">
        <b>Comment voulez-vous être appelé?</b>
      </span>
    </ins>
*/