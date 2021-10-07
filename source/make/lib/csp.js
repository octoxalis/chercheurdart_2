const CRYPTO_o  = require('crypto')
const C_o = require( '../data/C_o.js' )
const U_o = require( '../data/U_o.js' )

const STYLE_OPEN_s = `<style data-id="${C_o.INLINE_s}">`
const STYLE_CLOSE_s = '<\\/style>'




const CSP_o =
{

  style_re: new RegExp( `${STYLE_OPEN_s}([\\s\\S]*?)${STYLE_CLOSE_s}`, 'ig'),

  //XXstyle_a: new Set(),



  //XX style__a:
  //XX   input_s =>
  //XX     input_s
  //XX       .matchAll( CSP_o.style_re )
  //XX ,
}



module.exports =
{
  //XXadd__s:
  //XX  input_s =>
  //XX    CSP_o
  //XX      .style_a
  //XX        .add
  //XX        (
  //XX          CSP_o
  //XX            .style__a( input_s )
  //XX        )
  //XX,



  directive__s:
  () =>
  {
    let csp_s = ''

    for
    (
      let [key_s, value_s]
      of
      Object
        .entries( C_o.csp_o.HEAD_o )
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
