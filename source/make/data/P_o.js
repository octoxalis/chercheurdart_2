//=== P_o.js ===
const REX_o =
  require( '../lib/regex.js' )

/* CHARS
  //-- open solo
  hrule:      _
  break:      +
  //-- open === close
  escape:     ^
  comment  :  #
  block:      |
  reference:  =
  header:     §
  bold:       *
  strong:     !
  italic:     /
  emphasis:   &
  code:       `
  cite:       "
  delete:     -

  list        :
  //-- open !== close
  link:       <>
  img:        []
  call:       ()
*/

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
#{3}
\n
[\s\S]*?
\n
#{3}
$
`
,

  comment_inline_re:
    REX_o
      .new__re( 'gm' )
`
#{3}
[\s\S]*?
#{3}
`
,

  block_re:
    REX_o
      .new__re( 'gm' )
`
^
\|{3}
\s*
(inc|ins)                //: type_s
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
\|{3}
$
`
,

  reference_re:
    REX_o
      .new__re( 'gm' )
`
={3}
\s*
(inc|ins)                //: type_s
\s*
~{3}
\s*
(
[\s\S]+?                //: key_s
)
\s*
~{3}
(
[\s\S]*?                //: value_s
)
\s*
={3}
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
§{3}
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
\*{3}
(
[\s\S]+?                 //: bold_s
)
\*{3}
`
,

  strong_re:
    REX_o
      .new__re( 'gm' )
`
!{3}
(
[\s\S]+?                 //: bold_s
)
!{3}
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
&{3}
(
[\s\S]+?                 //: underline_s
)
&{3}
`
,



  code_re:
    REX_o
      .new__re( 'gm' )
`
\`{3}
(
[\s\S]+?                 //: code_s
)
\`{3}
`
,



  cite_re:
    REX_o
      .new__re( 'gm' )
`
"{3}
(
[\s\S]+?                 //: cite_s
)
"{3}
`
,



  delete_re:
    REX_o
      .new__re( 'gm' )
`
-{3}
(
[\s\S]+?                 //: cite_s
)
-{3}
`
,



  hrule_re:
    REX_o
      .new__re( 'gm' )
`
^
_{3}
$
`
,



  break_re:
    REX_o
      .new__re( 'gm' )
`
\s+?
\+{3}
$
`
,



  list_re:
    REX_o
      .new__re( 'gm' )
`
:{3}
\s*?
(\d|[a-zA-Z])*?
\n
(
[\s\S]+?                   //: function_s
)
\n
:{3}
`
,




  ESCAPE_s: 'ESCAPE_',     //: escaping blocks replacing prefix

  hrule_a:    [ '<hr>', '' ],
  break_a:    [ '<br>', '' ],

  bold_a:     [ '<b>', '</b>' ],
  strong_a:   [ '<strong>', '</strong>' ],
  italic_a:   [ '<i>', '</i>' ],
  emphasis_a: [ '<em>', '</em>' ],
  code_a:     [ '<code>', '</code>' ],
  cite_a:     [ '<cite>', '</cite>' ],
  delete_a:   [ '<del>', '</del>' ],


  link_a:     [ '<a href="', '">', '</a>' ],        //:`<a href="${href_s}">${link_s}</a>`
  img_a:      [ '<img src="', '" alt="', '">' ],    //: `<img src="${src}" alt="${alt_s}">`
}


module.exports = P_o
