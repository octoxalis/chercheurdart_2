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
      SCRIPT_SRC:      ``,
      STYLE_SRC:       ``,
    },
  },


  //=== SERVICE WORKER ===
  SERVICE_b: CONF_o.SERVICE_b,
  KEY_n:     CONF_o.KEY_n,


  //=== DIR ===     relative to source dir
  SITE_PATH_s:          CONF_o.SITE_PATH_s,
  DATA_PATH_s:          CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s:      CONF_o.INCLUDES_PATH_s,
  CONTENTS_PATH_s:       CONF_o.CONTENTS_PATH_s,
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

  LIB_PARTS_DIR_s:     CONF_o.LIB_PARTS_DIR_s,
  CONTENT_PARTS_DIR_s: CONF_o.CONTENT_PARTS_DIR_s,

  COM_OUTPUT_DIR_s:    CONF_o.COM_OUTPUT_DIR_s,

  TOPICS_DIR_s:        CONF_o.TOPICS_DIR_s,

  

  //=== SECTIONS ===
  URL_INDEX_s:    'index.html',

  SECTION_a:
  [
    'article',
    'galerie',
    'stat',
  ],

  SECTION_1_INSERT_s:  '<del for=section_a[1] hidden ></del>',

  STAT_a:
  [
    'burst',
    'aster',
    'paint',
  ],

  STAT_INSERT_a:
  [
    '<del for=div_burst hidden ></del>',    //: STAT_ID_s + _ + STAT_a entry
    '<del for=div_aster hidden ></del>',    //: idem
    '<del for=div_paint hidden ></del>',    //: idem
  ],


  INSERT_ICON_o:
  {
    html: '&#x22F1;',    //: ⋱ (diag elipsis)  
    css:  '\\22F1',      //!!!  escape slash
    js:   '\u22F1',
  },

  NAV_LEGEND_o:
  {
    home:    `accueil`,
    article: `article`,
    galerie: `galerie`,
    stat:    `diagrammes`,

    burst:   `burst`,
    aster:   `aster`,
    paint:   `paint`,
  },

  NAV_LEGEND_ICON_o:
  {
    home:    `&#x2302;`,    //: ⌂
    article: `&#x2263;`,    //: ≣
    galerie: `&#x22A1;`,    //: ⊡
    stat:    `&#x2237;`,    //: ∷

    burst:   `&#x22C7;`,    //: ⋇
    aster:   `&#x229A;`,    //: ⊚
    paint:   `&#x229C;`,    //: ⊜
  },


  ANCHOR_SEPARATOR_s : '__',


  //=== HTML ===
  INPUT_ID_s:       'IN',
  INSERT_ID_s:      'I',
  ASIDE_GRAY_ID_s:  'AG',
  ASIDE_COLOR_ID_s: 'AC',
  GALERY_ID_s:      'G',
  TOPICS_ID_s:      'T',

  TABLE_TAG_s:      'span',
  ROW_TAG_s:        'b',
  IOR_DIM_TAG_s:    'i',
  CHAPTER_TAG_s:    'h2',

  //?? CLOSE_CHAR_s:    '\u00D7',


  //=== JS ===
  //?? KEYVAL_DELIM_s:  '==',  //: _ior_spot shortcode
  LINE_DELIM_s:    '\n',
  PART_DELIM_s:    '_',    //: between subparts
  ID_DELIM_s:      '-',    //: between parts
  ID_WORD_DELIM_s: '¯',    //: between multi word subpart
  SPECIF_DELIM_s:  ' ',    //: between specifier and content (insert)
  BREAK_DELIM_s:   ' ~ ',  //: line break (insert)
  

  //=== INSERT
  //XX INS_TRIGGER_s:   '\u25BE',    //: unicode ▾
  INS_OPEN_s:      '₍',         //: document preprocessor delimiter
  INS_CLOSE_s:     '₎',         //: document preprocessor delimiter

  INS_TXT_s:      '₀',        //: text insert
  INS_DEF_s:      '₁',        //: definition list
  INS_REF_s:      '₂',        //: reference insert
  INS_QUO_s:      '₃',        //: quotation insert
  INS_TAB_s:      '₄',        //: table insert
  //...
  INS_IMG_s:      '₉',        //: image insert
  INS_METHOD_o:
  {
    '₀': 'txt',
    '₁': 'def',
    '₂': 'ref',
    '₃': 'quo',
    '₄': 'tab',
    //...
    '₉': 'img',
  },
  INS_PRINCIP_s: 'principal',
  INS_SUBSID_s:  'subsid',

  //=== TABLE
  CELL_DELIM_s: '₊',
  CELL_ALIGN_a:
  [
    'left',
    'center',
    'right'
  ],
  CELL_RATIO_n: .1,

  //XX RANGE_DELIM_s:   ' \u2014 ',  //: long tiret

  //=== DOCS
  DOC_INDEX_n:   0,    //: index doc_n is 0 (> NO_TOPIC_n)

  //=== TOPICS
  AT_DOCN_n:     0,    //: doc_n in docs_a
  AT_DOCS_n:     1,    //: doc_s
  AT_TITLE_n:    2,    //: title
  AT_SUBTITLE_n: 3,    //: subtitle
  AT_TOPICS_n:   4,    //: [topic_s,...]

  WORDS_DELIM_s:  ' ',
  WORDS_CONCAT_s: '_',
  TOPICS_LIST_s:    '<del for=div_topics hidden ></del>',

  //=== COMMENT
  COMMENT_DELIM_s: '₊',
  COMMENT_INTRO_s: '₀',
  COMMENT_ELIPSIS_s: '...',
  COMMENT_PART_s:   '<del for=div_comment hidden ></del>',

  //=== DB ===
  DB_a:    //: db tables names
  [
    'artist',
    'work',
    'collection',
    'biblio',
  ],

  //=== IMG LEGEND
  LEGEND_DELIM_s:  ' \u2219 ',   //: bullet

  //=== ADOC ===
  ADOC_DATA_s:       'ad',
  MACRO_INSERT_s:    'ins',
  MACRO_SUB_s:       'sub_s',       //: macro insert subsidiary
  
  BLOCK_PREAMBLE_s:  'preamble',
  BLOCK_SECTION_s:   'section_level',
  BLOCK_PARAGRAPH_s: 'paragraph',

}


module.exports = C_o
