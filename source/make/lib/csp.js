const C_o = require( '../data/C_o.js' )
const U_o = require( '../data/U_o.js' )



//-- const CSP_o = {}



module.exports =
{
  directive__s:
  () =>
  {
    let csp_s = ''

    for
    (
      let [key_s, value_s]
      of
      Object
        .entries( C_o.HEAD_CSP_o )
    )
    {
      csp_s +=
        ` ${key_s.toLowerCase().replace( /_/g, '-' )} ${U_o.url_s} ${value_s};`
    }

    csp_s =
      csp_s
        .slice
        (
          0,
          -1      //: trim last ';' (it's not over)
        )

    return `Content-Security-Policy:${csp_s};`
  }
  ,
}
