//=== P_o.js ===
const REX_o =
  require( '../lib/regex.js' )



const P_o =
{
  escape_re:
    REX_o
      .new__re( 'gm' )
`
^
\^{3}
(
[\s\S]*?
)
\^{3}
$
`
  ,

  comment_block_re:
    REX_o
      .new__re( 'gm' )
`
^
"{3}
\n
[\s\S]*?
\n
"{3}
$
`
,

  comment_inline_re:
    REX_o
      .new__re( 'gm' )
`
"{3}
[\s\S]*?
"{3}
`
,

  block_re:
    REX_o
      .new__re( 'gm' )
`
^
§{3}
\s*
(inc|ins|img|lis|tab)    //: type_s
\s*
~{3}
\s*
(
[\s\S]+?                 //: key_s
)
~{3}
\s*
(
[\s\S]+?                 //: value_s
)
\s*
§{3}
$
`
,

  reference_re:
    REX_o
      .new__re( 'gm' )
`
!{3}
\s*
(
[\s\S]+?                   //: key_s
)
\s*
~{3}
(
[\s\S]+?                 //: param_s
)
\s+
!{3}
`
,

  link_re:
    REX_o
      .new__re( 'gm' )
`
\[{3}
(
[\s\S]+?                 //: href_s
)
~{3}
(
[\s\S]+?                 //: link_s
)
\]{3}
`
,

  img_re:
    REX_o
      .new__re( 'gm' )
`
<{3}
(
[\w]+?                   //: src
)
~{3}
(
[\s\S]+?                 //: alt_s
)
>{3}
`
,

  call_re:
    REX_o
      .new__re( 'gm' )
`
\({3}
(
[\s\S]+?                   //: function_s
)
~{3}
(
[\s\S]+?                 //: arg_s (comma separated)
)
\){3}
`
,

  header_re:
    REX_o
      .new__re( 'gm' )
`
^
\|{3}
(
[1-6]{1}                 //: level_s
)
(
[\s\S]+?                 //: header_s
)
$
`
,

  bold_re:
    REX_o
      .new__re( 'gm' )
`
:{3}
(
[\s\S]+?                 //: bold_s
)
:{3}
`
,

  italic_re:
    REX_o
      .new__re( 'gm' )
`
/{3}
(
[\s\S]+?                 //: italic_s
)
/{3}
`
,

  emphasis_re:
    REX_o
      .new__re( 'gm' )
`
_{3}
(
[\s\S]+?                 //: underline_s
)
_{3}
`
,

  ESCAPE_s: 'ESCAPE_',     //: escaping blocks replacing prefix

  bold_a:     ['<b>', '</b>'],
  italic_a:   ['<i>', '</i>'],
  emphasis_a: ['<em>', '</em>'],
}


module.exports = P_o
