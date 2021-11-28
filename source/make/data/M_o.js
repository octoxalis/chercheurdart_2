//=== M_o.js ===
const REX_o =
  require( '../lib/regex.js' )

//=== CHARS ===
                    //-- reserved
                    //:   ?   //: empty table cells
                    //:   :   //: block separator
                    //-- availabnle
                    //:   $   //: ...
                    //:   +   //: ...
                    //:   %   //: ...
                    //:   _   //: ...

                                //-- standalone
const BREAK_CHAR_s =      ','
const HRULE_CHAR_s =      '\\-'  //: -
                                 //-- open === close
const STRONG_CHAR_s =     '\\*'  //: *
const EMPHASIS_CHAR_s =   '\\^'  //: ^
const ITALIC_CHAR_s =     '/'
const CITE_CHAR_s =       '"'
const DELETE_CHAR_s =     '~'
const CODE_CHAR_s =       '\\`'  //: `
const RAW_CHAR_s =        '%'

const HEADER_CHAR_s =     '#'
const LIST_CHAR_s =       '°'
//??const LISTO_CHAR_s       

const ESCAPE_CHAR_s =     '\\\\'  //: \
const COMMENT_CHAR_s =    '@'

const BLOCK_CHAR_s =      '\\|'  //: |
const NESTED_BLOCK_CHAR_s = '!' 
const REFERENCE_CHAR_s =  '='
                                 //-- open !== close
const LINK_OPEN_CHAR_s =  '<'
const LINK_CLOSE_CHAR_s =  '>'
const IMG_OPEN_CHAR_s =   '\\['  //: [
const IMG_CLOSE_CHAR_s =  '\\]'  //: ]
const CALL_OPEN_CHAR_s =  '\\('  //: (
const CALL_CLOSE_CHAR_s = '\\)'  //: )

const BLOC_SEPAR_CHAR_s = ':'


const M_o =
{
  escape_re:
    REX_o
      .new__re( 'gm' )
`
${ESCAPE_CHAR_s}{3}
(
[\s\S]*?
)
${ESCAPE_CHAR_s}{3}
`
  ,



  comment_re:
    REX_o
      .new__re( 'gm' )
`
${COMMENT_CHAR_s}{3}
[\s\S]*?
${COMMENT_CHAR_s}{3}
`
,



  block_re:
    REX_o
      .new__re( 'gm' )
`
^
${BLOCK_CHAR_s}{3}
\s*
(inc|dec){0,1}   //: type_s
\s+?
(
[\w]+?      //: key_s
)
${BLOC_SEPAR_CHAR_s}{3}
\s*
(
[\s\S]+?     //: value_s
)
\s*
${BLOCK_CHAR_s}{3}        //!!! MUST NOT end on a new line
$
`
,



  reference_re:
    REX_o
      .new__re( 'gm' )
`
${REFERENCE_CHAR_s}{3}
\s*
(inc|dec){0,1}          //: type_s
\s+
(
[\w]+?                  //: key_s
)
\s+
(?:::)?                 //!!! BLOC_SEPAR_CHAR_s
\s*
(
[\s\S]*?                //: value_s
)
\s*
${REFERENCE_CHAR_s}{3}
`
,



  link_re:
    REX_o
      .new__re( 'gm' )
`
${LINK_OPEN_CHAR_s}{3}
(
[\s\S]+?                 //: href_s
)
${BLOC_SEPAR_CHAR_s}{3}
(
[\s\S]+?                 //: link_s
)
${LINK_CLOSE_CHAR_s}{3}
`
,



  img_re:
    REX_o
      .new__re( 'gm' )
`
${IMG_OPEN_CHAR_s}{3}
(
[\s\S]+?                 //: alt_s
)
${BLOC_SEPAR_CHAR_s}{3}
(
[\s\S]+?                 //: src
)
${IMG_CLOSE_CHAR_s}{3}
`
,



  call_re:
    REX_o
      .new__re( 'gm' )
`
${CALL_OPEN_CHAR_s}{3}
(
[\s\S]+?                   //: function_s
)
${BLOC_SEPAR_CHAR_s}{3}
(
[\s\S]+?                 //: arg_s (comma separated)
)
${CALL_CLOSE_CHAR_s}{3}
`
,



  header_re:
    REX_o
      .new__re( 'gm' )    //: ^\^{3}[1-6][\s\S]+?$
`
^
${HEADER_CHAR_s}{3}
(
[1-6]                 //: level_s
)
(
[\s\S]+?              //: header_s
)
$
`
,



  strong_re:
    REX_o
      .new__re( 'gm' )
`
${STRONG_CHAR_s}{3}
(
[\s\S]+?                 //: strong_s
)
${STRONG_CHAR_s}{3}
`
,



  italic_re:
    REX_o
      .new__re( 'gm' )
`
${ITALIC_CHAR_s}{3}
(
[\s\S]+?                 //: italic_s
)
${ITALIC_CHAR_s}{3}
`
,



  emphasis_re:
    REX_o
      .new__re( 'gm' )
`
${EMPHASIS_CHAR_s}{3}
(
[\s\S]+
)
${EMPHASIS_CHAR_s}{3}
`
,



  code_re:
    REX_o
      .new__re( 'gm' )
`
${CODE_CHAR_s}{3}
(
[\s\S]+?                 //: code_s
)
${CODE_CHAR_s}{3}
`
,



  cite_re:
    REX_o
      .new__re( 'gm' )
`
${CITE_CHAR_s}{3}
(
[\s\S]+?                 //: cite_s
)
${CITE_CHAR_s}{3}
`
,



  delete_re:
    REX_o
      .new__re( 'gm' )
`
${DELETE_CHAR_s}{3}
(
[\s\S]+?                 //: cite_s
)
${DELETE_CHAR_s}{3}
`
,



  raw_re:
    REX_o
      .new__re( 'gm' )
`
${RAW_CHAR_s}{3}
(
[\s\S]+?                 //: cite_s
)
${RAW_CHAR_s}{3}
`
,



   hrule_re:
     REX_o
       .new__re( 'gm' )
 `
 ^
 ${HRULE_CHAR_s}{3}
 $
 `
 ,



  break_re:
    REX_o
      .new__re( 'gm' )
`
\s*
,{3}
$
`
,



  list_re:
    REX_o
      .new__re( 'gm' )
`
${LIST_CHAR_s}{3}
\s*?
(\d|[a-zA-Z])*?
\n
(
[\s\S]+?                   //: function_s
)
\n
${LIST_CHAR_s}{3}
`
,




  ESCAPE_s: 'ESCAPE_',     //: escaping blocks replacing prefix

  hrule_a:    [ '<hr>', '' ],
  break_a:    [ '<br>', '' ],

  strong_a:   [ '<strong>', '</strong>' ],
  emphasis_a: [ '<em>', '</em>' ],
  italic_a:   [ '<i>', '</i>' ],
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
