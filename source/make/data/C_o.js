/*
 * COMPONENTS constants for templates
 */
const CONF_o = require( '../../configure.js' )

const C_o =
{
  //=== HEAD ===
  INLINE_s: 'inline_style',


  //=== HEADERS ===
  csp_o:
  {
    HEAD_o:  //!!! DON'T change order
    {
      DEFAULT_SRC:     '',
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
      SCRIPT_SRC:      '',
      OBJECT_SRC:      '',
      STYLE_SRC:       `'unsafe-inline'`,  //: for browser not accepting sha-256 (Firefox-78!)
    },
  },


  //=== SERVICE WORKER ===
  SERVICE_b: CONF_o.SERVICE_b,
  KEY_n:     CONF_o.KEY_n,


  //=== DIR ===     relative to source dir
  SITE_PATH_s:          CONF_o.SITE_PATH_s,
  DATA_PATH_s:          CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s:      CONF_o.INCLUDES_PATH_s,
  CONTENT_PARTS_PATH_s: CONF_o.CONTENT_PARTS_PATH_s,

  MAKE_DIR_s:          CONF_o.MAKE_DIR_s,
  CONTENT_DIR_s:       CONF_o.CONTENT_DIR_s,

  WARE_DIR_s:          CONF_o.WARE_DIR_s,
  IMG_DIR_s:           CONF_o.IMG_DIR_s,
  CONTEXTUAL_INPUT_s:  CONF_o.CONTEXTUAL_INPUT_s,
  CONTEXTUAL_OUTPUT_s: CONF_o.CONTEXTUAL_OUTPUT_s,

  ADOC_TEMPLATES_s:    CONF_o.ADOC_TEMPLATES_s,
  ADOC_MARKUP_b:       CONF_o.ADOC_MARKUP_b,

  INS_CSS_s:           CONF_o.INS_CSS_s,

  JSON_INPUT_DIR_s:    CONF_o.JSON_INPUT_DIR_s,
  ADOC_OUTPUT_DIR_s:   CONF_o.ADOC_OUTPUT_DIR_s,
  
  //=== SECTIONS ===
  URL_INDEX_s:    'index.html',

  SECTION_a:
  [
    'article',
    'galerie',
  ],

  ANCHOR_SEPARATOR_s : '__',


  //=== HTML ===
  INSERT_ID_s:      'I',
  ASIDE_GRAY_ID_s:  'G',
  ASIDE_COLOR_ID_s: 'C',
  SLIDE_ID_s:       'S',

  TABLE_TAG_s:      'span',
  ROW_TAG_s:        'b',
  IOR_DIM_TAG_s:    'i',
  CHAPTER_TAG_s:    'h2',

  CLOSE_CHAR_s:    '\u00D7',


  //=== JS ===
  //?? KEYVAL_DELIM_s:  '==',  //: _ior_spot shortcode
  LINE_DELIM_s:    '\n',
  PART_DELIM_s:    '_',    //: between subparts
  ID_DELIM_s:      '-',    //: between parts
  ID_WORD_DELIM_s: '¯',    //: between multi word subpart

  PRE_OPEN_s:      '₍',    //: document preprocessor delimiter
  PRE_CLOSE_s:     '₎',    //: document preprocessor delimiter

  INS_SPECIF_DELIM_s: ' ',
  INS_BREAK_DELIM_s:  ' ~ ',  //: line break inside insert
  
  INS_TXT_s:      '₀',        //: text insert
  INS_IMG_s:      '₁',        //: image insert
  INS_REF_s:      '₂',        //: reference insert
  INS_QUO_s:      '₃',        //: quotation insert
  INS_TAB_s:      '₄',        //: table insert
  INS_METHOD_o:
  {
    '₀': 'txt',
    '₁': 'img',
    '₂': 'ref',
    '₃': 'quo',
    '₄': 'tab',
  },
  INS_PRINCIP_s: 'principal',
  INS_SUBSID_s:  'subsid',

  CELL_DELIM_s: '₊',
  CELL_ALIGN_a:
  [
    'left',
    'center',
    'right'
  ],
  CELL_RATIO_n: .1,

  LEGEND_DELIM_s:  ' \u2219 ',   //: bullet
  INS_TRIGGER_s:    '\u25BE',    //: unicode ▾
  //XXRANGE_DELIM_s:   ' \u2014 ',  //: long tiret


  //=== DB ===
  DB_a:    //: db tables names
  [
    'artist',
    'work',
    'collection',
    'biblio',
  ],


  //=== ADOC ===
  ADOC_DATA_s:       'ad',
  MACRO_INSERT_s:    'ins',
  MACRO_SUB_s:       'sub_s',       //: macro insert subsidiary
  
  BLOCK_PREAMBLE_s:  'preamble',
  BLOCK_SECTION_s:   'section_level',
  BLOCK_PARAGRAPH_s: 'paragraph',

//XX  JSON_TAB_o:
//XX  {
//XX    artist_o:
//XX    {
//XX      width_s: '30_20_20_10_20',
//XX      //align_s: ''    //: default (left)
//XX    },
//XX  },



  //=== CSS ===
  EXT_ARROW_s:     '2303',
  INT_ARROW_s:     '2304',
  DIM_SEPARATOR_s: '00D7',
  LIST_MARKER_s:   '25AA',

  
  FULL_WIDTH_s:  '100vw',
  FULL_HEIGHT_s: '100vh',
  
  FONT_BODY_s: `'Cantarell Regular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif`,
  FONT_MONO_s: `'JetBrains Mono Light', system-ui, -apple-system, BlinkMacSystemFont, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace`,


  //=== CSS constants to avoid calc(): can be changed in configure.js ===  
  HUE_P_n:        CONF_o.HUE_P_n,
  LUM_MODE_n:     CONF_o.LUM_MODE_n,
  LUM_BASE_n:     CONF_o.LUM_BASE_n,
  LUM_CONTRAST_n: CONF_o.LUM_CONTRAST_n,
  LUM_FRONT_s:    CONF_o.LUM_FRONT_s,
  LUM_BACK_s:     CONF_o.LUM_BACK_s,


  PAD_1:  .25 * 1 + 'em',
  PAD_2:  .25 * 2 + 'em',
  PAD_3:  .25 * 3 + 'em',
  PAD_4:  .25 * 4 + 'em',
  PAD_6:  .25 * 6 + 'em',
  PAD_8:  .25 * 8 + 'em',
  PAD_12: .25 * 12 + 'em',
  PAD_16: .25 * 16 + 'em',

}


module.exports = C_o
