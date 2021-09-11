const FS_o  = require( 'fs-extra' )

const C_o    = require( '../data/C_o.js' )





const COM_o =
{
  form__s:
  (
    issue_n,
    //??? permalink_s
  ) =>
  {
    return (
      FS_o
      .readFileSync
      (
        `${C_o.LIB_TEMPLATES_DIR_s}comment_dialog.html`,
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
      //???.replace
      //???(
      //???  '${permalink_s}',
      //???  permalink_s
      //???)
      .replaceAll
      (
        '${C_o.ROW_TAG_s}',
        C_o.ROW_TAG_s
      )
    )
  }
  ,

}



module.exports = COM_o
