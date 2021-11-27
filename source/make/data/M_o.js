//=== M_o.js ===
const REX_o =
  require( '../lib/regex.js' )

//=== CHARS ===
                    //-- standalone
//: break:      |
//: hrule:      _
                    //-- open === close
//: bold:       *
//: strong:     °
//: emphasis:   +
//: italic:     /
//: cite:       "
//: delete:     -
//: code:       `
//: raw:        =
//
//: header:     ^
//: list        :
//: listo       ;
//
//: escape:     \
//: comment  :  #
//
//: block:      §
//: reference:  !
                    //-- open !== close
//: link:       <>
//: img:        []
//: call:       ()

                    //-- reserved
//: reserved:   ~   //: URLs separator
//: reserved:   ?   //: empty table cells
//: reserved:   @   //: ...
//: reserved:   &   //: ...


const M_o =
{
  escape_re:
    REX_o
      .new__re( 'gm' )
`
\\{3}
(
[\s\S]*?
)
\\{3}
`
  ,



  comment_re:
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
§{3}
\s*
(
[a-z]{0,3}   //: type_s
)
\s+?
(
[^\.]+?      //: key_s
)
\.{3}
\s*
(
[\s\S]+?     //: value_s
)
\s*
§{3}        //!!! MUST NOT end on a new line
$
`
,



  reference_re:
    REX_o
      .new__re( 'gm' )
`
!{3}
\s*
(inc){0,1}          //: type_s
\s*
(
[\s\S]+?                //: key_s
)
\s*
\.{3}
(
[\s\S]*?                //: value_s
)
\s*
!{3}
`
,



  link_re:
    REX_o
      .new__re( 'gm' )
`
<{3}
(
[\s\S]+?                 //: href_s
)
\.{3}
(
[\s\S]+?                 //: link_s
)
>{3}
`
,



  img_re:
    REX_o
      .new__re( 'gm' )
`
\[{3}
(
[\s\S]+?                 //: alt_s
)
\.{3}
(
[\s\S]+?                 //: src
)
\]{3}
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
\.{3}
(
[\s\S]+?                 //: arg_s (comma separated)
)
\){3}
`
,



  header_re:
    REX_o
      .new__re( 'gm' )    //: ^\^{3}[1-6][\s\S]+?$
`
^
\^{3}
(
[1-6]                 //: level_s
)
(
[\s\S]+?              //: header_s
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
°{3}
(
[\s\S]+?                 //: bold_s
)
°{3}
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
\+{3}
(
[\s\S]+
)
\+{3}
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



  raw_re:
    REX_o
      .new__re( 'gm' )
`
={3}
(
[\s\S]+?                 //: cite_s
)
={3}
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
\|{3}
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


  
  extend__v:
    (
      {
        regex_s,
        regex_f
      }
    ) =>
    {
      M_o
        [ `${regex_s}_re` ] =
          regex_f
    }
,
}


module.exports = M_o
