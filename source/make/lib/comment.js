const FS_o  = require( 'fs-extra' )

const C_o    = require( '../data/C_o.js' )



const COM_o =
{
  comment__s:
  (
    issue_n
  ) =>
  {
    const output_s =
      `<hr/><h2><label>Commentaires</label></h2><div id=comments>`
      +
      FS_o
      .readFileSync
      (
        `${C_o.LIB_PARTS_DIR_s}issue_${issue_n}.html`,
        {
          encoding:'utf-8',
          flag:'r'
        }
      )
      +
      `</ul></div><hr/>`    //: between list and form
      +
      FS_o
        .readFileSync
        (
          `${C_o.LIB_PARTS_DIR_s}comment_form.html`,
          {
            encoding:'utf-8',
            flag:'r'
          }
        )
        .replace
        (
          '${issue_n}',
          issue_n
        )
        .replaceAll
        (
          '${C_o.ROW_TAG_s}',
          C_o.ROW_TAG_s
        )
      +
      `</div>`    //: id=comments
      
    return output_s
  }
  ,

}



module.exports = COM_o
