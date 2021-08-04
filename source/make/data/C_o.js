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
  SITE_PATH_s:     CONF_o.SITE_PATH_s,
  DATA_PATH_s:     CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s: CONF_o.INCLUDES_PATH_s,
  CONTENT_PARTS_PATH_s: CONF_o.CONTENT_PARTS_PATH_s,

  MAKE_DIR_s:    CONF_o.MAKE_DIR_s,
  CONTENT_DIR_s: CONF_o.CONTENT_DIR_s,

  IMG_DIR_s: CONF_o.IMG_DIR_s,
  CONTEXTUAL_INPUT_s: CONF_o.CONTEXTUAL_INPUT_s,
  CONTEXTUAL_OUTPUT_s: CONF_o.CONTEXTUAL_OUTPUT_s,

  ADOC_TEMPLATES_s: CONF_o.ADOC_TEMPLATES_s,


  
  //=== SECTIONS ===
  URL_INDEX_s:    'index.html',
  SEC_TEXT_s:     'Article',
  SEC_MEDIA_s:    'Galerie',


  //=== HTML ===
  INSERT_ID_s:      'I',
  ASIDE_GRAY_ID_s:  'G',
  ASIDE_COLOR_ID_s: 'C',
  SLIDE_ID_s:       'S',

  TABLE_TAG_s:      'b',
  IOR_DIM_TAG_s:    'i',
  CHAPTER_TAG_s:    'h2',

  GALLERY_TITLE_s: 'Galerie',
  CLOSE_CHAR_s:    '\u00D7',


  //=== JS ===
  //?? KEYVAL_DELIM_s:  '==',  //: _ior_spot shortcode
  LINE_DELIM_s:    '\n',
  ID_DELIM_s:      '-',    //: between parts
  ID_PART_DELIM_s: '_',    //: between subparts
  ID_WORD_DELIM_s: '₊',    //: between multi word subpart

  PRE_OPEN_s:      '₍',    //: document preprocessor delimiter
  PRE_CLOSE_s:     '₎',    //: document preprocessor delimiter
  PRE_DELIM_s:     '\n',   //: document preprocessor separator

  INS_SPECIF_DELIM_s: ' ',
  INS_BREAK_DELIM_s:  ' + ',  //: line break inside insert
  INS_TXT_s:      '₀',     //: text insert
  INS_IMG_s:      '₁',     //: img insert
  INS_REF_s:      '₂',     //: reference insert

  INS_METHOD_o:
  {
    '₀': 'txt',
    '₁': 'img',
    '₂': 'ref',
  },


  LEGEND_DELIM_s:  ' \u2219 ',  //: bullet
  //XXRANGE_DELIM_s:   ' \u2014 ',  //: long tiret
  U_IMAGE_OF_s:    '\u22B7',    //: unicode 'image of'

  //???SUB_SPACE_s:     '₊',    //: unicode ₊

  //=== ADOC ===
  ADOC_DATA_s:       'ad',
  MACRO_INSERT_s:    'ins',
  
  BLOCK_PREAMBLE_s:  'preamble',
  BLOCK_SECTION_s:   'section_level',
  BLOCK_PARAGRAPH_s: 'paragraph',



  //=== CSS ===
  EXT_ARROW_s:     '2303',
  INT_ARROW_s:     '2304',
  DIM_SEPARATOR_s: '00D7',
  
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
