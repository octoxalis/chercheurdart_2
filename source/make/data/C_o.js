//=== C_.o.js ===

const CONF_o = require( '../../configure.js' )
const A_o = require( './A_o.js' )

const C_o =
{
  //=== DIR ===     relative to source dir
  MAKE_DIR_s:            CONF_o.MAKE_DIR_s,
  CONTENT_DIR_s:         CONF_o.CONTENT_DIR_s,
  WARE_DIR_s:            CONF_o.WARE_DIR_s,
  IMG_DIR_s:             CONF_o.IMG_DIR_s,
  JS_DIR_s:              CONF_o.JS_DIR_s,
  CONTEXT_INPUT_FILE_s:  CONF_o.CONTEXT_INPUT_FILE_s,
  CONTEXT_PARTS_DIR_s:   CONF_o.CONTEXT_PARTS_DIR_s,
  CSS_SITE_DIR_s:        CONF_o.CSS_SITE_DIR_s,
  LIB_PARTS_DIR_s:       CONF_o.LIB_PARTS_DIR_s,
  CONTENT_PARTS_DIR_s:   CONF_o.CONTENT_PARTS_DIR_s,
  //XXADOC_PARTS_DIR_s:      CONF_o.ADOC_PARTS_DIR_s,
  COM_OUTPUT_DIR_s:      CONF_o.COM_OUTPUT_DIR_s,
  TOPICS_DIR_s:          CONF_o.TOPICS_DIR_s,
  HTML_PARTS_DIR_s:      CONF_o.HTML_PARTS_DIR_s,

  SITE_PATH_s:           CONF_o.SITE_PATH_s,
  DATA_PATH_s:           CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s:       CONF_o.INCLUDES_PATH_s,
  CONTENTS_PATH_s:       CONF_o.CONTENTS_PATH_s,
  CONTENT_PARTS_PATH_s:  CONF_o.CONTENT_PARTS_PATH_s,
  ADOC_TEMP_PATH_s:      CONF_o.ADOC_TEMP_PATH_s,
  DB_PATH_s:             CONF_o.DB_PATH_s,
  TABLE_INPUT_PATH_s:    CONF_o.TABLE_INPUT_PATH_s,

  IMG_MAX_PATH_s:    '/full/max/0/',    //: IOR

  //=== FILE NAMES
  WORKER_FILE_s:     '/assets/scripts/js/stat_w.min.js',


  //=== CONFIGURE FLAG
  ADOC_MARKUP_b:        CONF_o.ADOC_MARKUP_b,


  //=== HTML-HEAD: HEADERS ===
  HEAD_CSP_o:  //!!! KEEP order
  {
    DEFAULT_SRC:     'none',
    BASE_URI:        '',
    FONT_SRC:        '',
    CONNECT_SRC:     '',
    PREFETCH_SRC:    '',  //: requires 'enable-experimental-web-platform-features' flag
    IMG_SRC:         '',
    FRAME_SRC:       '',
    FRAME_ANCESTORS: '',
    FORM_ACTION:     '',
    MANIFEST_SRC:    '',
    SCRIPT_SRC_ELEM: '',
    OBJECT_SRC:      '',
    SCRIPT_SRC:      `'unsafe-eval'`,
    WORKER_SRC:      `'unsafe-eval'`,
    STYLE_SRC:       ``,
  },


  //=== HTML-BODY: SECTIONS ===
  SECTION_a:
  [
    'article',
    'galerie',
  ],

  STAT_s: 'stat',

  STAT_a:
  [
    'burst',
    'aster',
    'paint',
    'stack',
  ],

  HTML_CHAR_o:
  {
    bullet_s:  '&#8857;',    //: BULLET •
  },

  NAV_LEGEND_o:    //: property names === SECTION_a + STAT_a
  {

    //XX placeholder: { icon_s: `&#8226;`},    //: BULLET •
    main:        { icon_s: `&#8226;`},    //: BULLET •
    stat:        { icon_s: `&#8901;`},    //: DOT OPERATOR ⋅
    substat:     { icon_s: `&#8728;`},    //: RING OPERATOR ∘



    home:    { icon_s: `&#8226;`, legend_s: `accueil` },    //: ⌂
    article: { icon_s: `&#8226;`, legend_s: `article` },    //: ≣
    galerie: { icon_s: `&#8226;`, legend_s: `galerie` },    //: ⊡
    //XX stat:    { icon_s: `&#x2237;`, legend_s: `analyse`},     //: ∷

    burst: { icon_s: `&#8718;`, legend_s: `burst`},       //: ⋇
    aster: { icon_s: `&#8718;`, legend_s: `aster`},       //: ⊚
    paint: { icon_s: `&#8718;`, legend_s: `paint`},       //: ⊜
    stack: { icon_s: `&#8718;`, legend_s: `stack`},       //: ⊜

    burst_hue:  { icon_s: `&#8728;`, legend_s: `chromaticité`},       //: ⊜
    burst_sat:  { icon_s: `&#8728;`, legend_s: `intensité`},    //: ⊜
    burst_lum:  { icon_s: `&#8728;`, legend_s: `luminosité`},     //: ⊜
    
    burst_freq: { icon_s: `&#8728;`, legend_s: `fréquence`},       //: ⊜
    
    stat_open:      { icon_s: `&#10059;`, legend_s: `palette`},     //: ⊜
    stat_close:     { icon_s: `&#215;`, legend_s: `fermer`},     //: ⊜
    stat_increment: { icon_s: `&#43;`, legend_s: `agrandir`},     //: ⊜
    stat_decrement: { icon_s: `&#8722;`, legend_s: `réduire`},      //: ⊜

    paint_origin:   { icon_s: `&#8722;`, legend_s: `original`},
    paint_cursor:   { icon_s: `&nbsp;`,  legend_s: `&nbsp;`},

    stack_shape:     { icon_s: `&nbsp;`,  legend_s: `découpe`},
    //XX stack_circle:     { icon_s: `&nbsp;`,  legend_s: `cercle`},
    //XX stack_hellipse:     { icon_s: `&nbsp;`,  legend_s: `ellipse horiz`},
    //XX stack_vellipse:     { icon_s: `&nbsp;`,  legend_s: `ellipse verti`},
    //XX stack_square:     { icon_s: `&nbsp;`,  legend_s: `carré`},
    //XX stack_hrect:     { icon_s: `&nbsp;`,  legend_s: `rect horiz`},
    //XX stack_vrect:     { icon_s: `&nbsp;`,  legend_s: `rect verti`},
    stack_dimension:  { icon_s: `&nbsp;`,  legend_s: `dimension`},
    stack_layers:     { icon_s: `&nbsp;`,  legend_s: `empilement`},
    stack_layers_align:     { icon_s: `&nbsp;`,  legend_s: `&#8917;`},        //: 
    stack_layers_hide:     { icon_s: `&nbsp;`,  legend_s: `&#8861;`},         //: minus
    stack_layers_add:     { icon_s: `&nbsp;`,  legend_s: `&#8853;`},          //: plus
    stack_layers_download:     { icon_s: `&nbsp;`,  legend_s: `&#8675; ${A_o.NAME_s}`},      //: downdash
    stack_layers_upload:     { icon_s: `&nbsp;`,  legend_s: `&#8673; Fichier local`},      //: updash
    //XX stack_rotation:  { icon_s: `&nbsp;`,  legend_s: `perspective`},
    open_list_marker:     { icon_s: `&nbsp;`,  legend_s: `⊳`},
    close_list_marker:     { icon_s: `&nbsp;`,  legend_s: `∇`},
  },

  //=== REPLACE
  GALERY_REPLACE_s:    '<del for=section_galery hidden ></del>',
  TOPICS_REPLACE_s:    '<del for=div_topics hidden ></del>',
  COMMENTS_REPLACE_s:  '<del for=div_comment hidden ></del>',
  STAT_REPLACE_a:
  [
                       '<del for=burst_div hidden ></del>',    //: STAT_ID_s + _ + STAT_a entry
                       '<del for=div_aster hidden ></del>',    //: idem
                       '<del for=div_paint hidden ></del>',    //: idem
  ],


  //=== HTML-BODY ANCHORS
  //-- ANCHOR_DELIM_s : '__',
  PAGE_TOP: 'page_top',
  

  //=== HTML-BODY: TAGS ===
  INPUT_ID_s:       'IN',
  LABEL_ID_s:       'LA',
  IFRAME_ID_s:      'IF',
  DIV_ID_s:         'DI',
  LIST_ID_s:        'LI',
  INSERT_ID_s:      'I',
  ASIDE_GRAY_ID_s:  'AG',
  ASIDE_COLOR_ID_s: 'AC',
  GALERY_ID_s:      'G',
  TOPICS_ID_s:      'T',

  TABLE_TAG_s:      'span',
  LABEL_TAG_s:      'label',
  ROW_TAG_s:        'b',
  IOR_DIM_TAG_s:    'i',
  CHAPTER_TAG_s:    'h2',

  //=== LIST ===
  LIST_INDENT_n:  2,

  //=== HTML-BODY: EXTEND MARKUP ===
  INFO_s    :           '&#x2139;',
  UP_ARROW_s:           '&#8593;',
  IMG_LEGEND_DELIM_s:   ' \u2219 ',   //: bullet
  
  //=== DB ID
  //-- 1586-de_coster--new_york-sothebys--1625-young_woman

  ID_PART_DELIM_s:     '~',   //: between parts

  WORDS_DELIM_s:       ' ',
  WORDS_CONCAT_s:      '_',    //: underline

  //=== COMMENT
  //-- 2021-09-14T12:44:07Z₊₊Daniel₊₊Markdown subset markup test₀

  COMMENT_INTRO_s:     '₀',
  COMMENT_DELIM_s:     '₊₊',   //: subscript ++ between stamp_s, name_s, intro_s

  //=== TABLE
  CELL_DELIM_s:        '₊',    //: subscript ++

  //=== INSERT
  INS_TXT_s:  '₀',        //: text insert
  INS_DEF_s:  '₁',        //: definition list
  INS_REF_s:  '₂',        //: reference insert
  INS_QUO_s:  '₃',        //: quotation insert
  INS_TAB_s:  '₄',        //: table insert
  //...
  INS_IMG_s:  '₉',        //: image insert

  INS_METHOD_o:
  {
    '₀':  'txt',
    '₁':  'def',
    '₂':  'ref',
    '₃':  'quo',
    '₄':  'tab',
    //...
    '₉':  'img',
  },

  INS_DISPLAY_s: 'HIDDEN',

  INS_OPEN_s:       'INS_OPEN:::', 
  INS_CLOSE_s:      ':::INS_CLOSE',
  INS_DELIM_s:      '⁝',           //: &#8285;
  INS_VAL_DELIM_s:  '⁞',           //: &#8286;



  //=== HTML-BODY: TABLE
  CELL_ALIGN_a:
  [
    'left',
    'center',
    'right'
  ],

  CELL_RATIO_n: .1,
  CELL_EMPTY_s: '__',                //: double underline
  CELL_EMPTY_ENTITY_s: '&#8280;',    //: ⁘
  
  TABLE_INSERT_s:    'td',


  //=== DB ===
  DB_a:    //: db tables names
  [
    'artist',
    'work',
    'collection',
    'biblio',
  ],


  //=== SERVICE WORKER ===
  SERVICE_b: CONF_o.SERVICE_b,
  KEY_n:     CONF_o.KEY_n,

  //=== SHARED WORKER ===
  CLIENT_ALL_s: undefined,
}

module.exports = C_o
