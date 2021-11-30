//=== M_o.js ===
const REX_o =
  require( '../lib/regex.js' )

//=== SYNTAX ===
                        //-- exclude (tween charw)
//:    \        escape      
//:    /        comment     
                        //-- format (tween charw)
//:    #        header      
//:    -        hrule       
//:    ,        break       
//:    *        strong      
//:    ^        emphasis    
                        //-- link (pair char)
//:    <>       link        
//:    []       img         
//:    ()       call        
                        //-- block (triple char)
//:    ^ : !    block       
//:    ¨ : §    reference   

                        //-- specifier (solo char)
//:    =        declare     
//:    +        include     

                        //-- reserved
//:    _        CELL_EMPTY_s       
                        //-- available
//:    "
//:    %
//:    ¤
//:    °
//:    ~


                                //-- open only
const HRULE_CHAR_s =        '\\-'  //: -
const BREAK_CHAR_s =        ','
const HEADER_CHAR_s =       '#'
                                //-- open === close
const COMMENT_CHAR_s =      '/'
const ESCAPE_CHAR_s =       '\\\\'  //: \
const STRONG_CHAR_s =       '\\*'  //: *
const EMPHASIS_CHAR_s =     '\\^'  //: ^
const LIST_CHAR_s =         '\\+'
                                 //-- open !== close
const LINK_OPEN_CHAR_s =   '<'
const LINK_CLOSE_CHAR_s =   '>'
const IMG_OPEN_CHAR_s =    '\\['     //: [
const IMG_CLOSE_CHAR_s =   '\\]'     //: ]
const CALL_OPEN_CHAR_s =   '\\('     //: (
const CALL_CLOSE_CHAR_s =  '\\)'     //: )

const BLOCK_OPEN_s =       '\\^'
const BLOCK_CLOSE_s =      '!'
const BLOCK_SEPAR_CHAR_s = ':'
const REFERENCE_OPEN_s =   '¨'
const REFERENCE_CLOSE_s =  '§'

const BLOCK_DECLARE_s =    '='      //: after BLOCK_OPEN_s
const BLOCK_INCLUDE_s =    '\\+'    //: after BLOCK_OPEN_s



const M_o =
{
  escape_re:
    REX_o
      .new__re( 'gm' )
`
${ESCAPE_CHAR_s}{2}
(
[\s\S]*?
)
${ESCAPE_CHAR_s}{2}
`
,



  comment_re:
    REX_o
      .new__re( 'gm' )
`
${COMMENT_CHAR_s}{2}
[\s\S]*?
${COMMENT_CHAR_s}{2}
`
,



  hrule_re:
    REX_o
      .new__re( 'gm' )
`
^
${HRULE_CHAR_s}{2}
$
`
,



  break_re:
    REX_o
     .new__re( 'gm' )
`
\s*?
,{2}
$
`
,


  header_re:
    REX_o
      .new__re( 'gm' )
`
^
${HEADER_CHAR_s}{2}
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
${STRONG_CHAR_s}{2}
(
[\s\S]+?                 //: strong_s
)
${STRONG_CHAR_s}{2}
`
,



  emphasis_re:
    REX_o
      .new__re( 'gm' )
`
${EMPHASIS_CHAR_s}{2}
(
[\s\S]+
)
${EMPHASIS_CHAR_s}{2}
`
,




  link_re:
      REX_o
        .new__re( 'gm' )
`
${LINK_OPEN_CHAR_s}{2}
(
[^${BLOCK_SEPAR_CHAR_s}]+?  //: legend_s
)
${BLOCK_SEPAR_CHAR_s}{2}
(
[^${LINK_CLOSE_CHAR_s}]+?  //: href_s
)
${LINK_CLOSE_CHAR_s}{2}
`
,



  img_re:
    REX_o
      .new__re( 'gm' )
`
${IMG_OPEN_CHAR_s}{2}
(
[^${BLOCK_SEPAR_CHAR_s}]+?           //: alt_s
)
${BLOCK_SEPAR_CHAR_s}{2}
(
[^${IMG_CLOSE_CHAR_s}]+?             //: src
)
${IMG_CLOSE_CHAR_s}{2}
`
,



  list_re:
    REX_o
      .new__re( 'gm' )
`
${LIST_CHAR_s}{2}
\s*?
(\d|[a-zA-Z])*?
\n
(
[\s\S]+?                   //: function_s
)
\n
${LIST_CHAR_s}{2}
`
,



  call_re:
    REX_o
      .new__re( 'gm' )
`
${CALL_OPEN_CHAR_s}{2}
(
[^${BLOCK_SEPAR_CHAR_s}]+?         //: function_s
)
${BLOCK_SEPAR_CHAR_s}{2}
(
[^${CALL_CLOSE_CHAR_s}]+?         //: arg_s (comma separated)
)
${CALL_CLOSE_CHAR_s}{2}
`
,





//=== BLOCKS ===
  block_re:
    REX_o
      .new__re( 'gm' )
`
^
${BLOCK_OPEN_s}
(${BLOCK_DECLARE_s}|${BLOCK_INCLUDE_s})   //: type_s
\s+?
(
[\w]+?      //: key_s
)
\s+?
${BLOCK_SEPAR_CHAR_s}{2}
\s+?
(
[^${BLOCK_CLOSE_s}]+?     //: value_s
)
${BLOCK_CLOSE_s}{2}        //: MUST NOT end on a new line
$
`
,



  reference_re:
    REX_o
      .new__re( 'gm' )
`
${REFERENCE_OPEN_s}
(${BLOCK_DECLARE_s}|${BLOCK_INCLUDE_s})   //: type_s
\s+?
(
[\w]+?                  //: key_s
)
\s+?                          //: space
${BLOCK_SEPAR_CHAR_s}*?
\s*?
(
[^${REFERENCE_CLOSE_s}]*?     //: value_s
)
\s*?
${REFERENCE_CLOSE_s}{2}
`
,



  ESCAPE_s: 'ESCAPE_',     //: escaping blocks replacing prefix

  hrule_a:    [ '<hr>', '' ],
  break_a:    [ '<br>', '' ],
  strong_a:   [ '<strong>', '</strong>' ],
  emphasis_a: [ '<em>', '</em>' ],
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
