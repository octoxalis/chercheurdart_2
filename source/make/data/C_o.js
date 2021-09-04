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
  INS_DEF_s:      '₁',        //: definition list
  INS_REF_s:      '₂',        //: reference insert
  INS_QUO_s:      '₃',        //: quotation insert
  INS_TAB_s:      '₄',        //: table insert

  INS_IMG_s:      '₉',        //: image insert
  INS_METHOD_o:
  {
    '₀': 'txt',
    '₁': 'def',
    '₂': 'ref',
    '₃': 'quo',
    '₄': 'tab',

    '₉': 'img',
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
  //XX RANGE_DELIM_s:   ' \u2014 ',  //: long tiret


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

}


module.exports = C_o
