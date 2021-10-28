/*
 * COMPONENTS constants for templates
 */
const CONF_o = require( '../../configure.js' )

const C_o =
{
  //=== DIR ===     relative to source dir
  MAKE_DIR_s:            CONF_o.MAKE_DIR_s,
  CONTENT_DIR_s:         CONF_o.CONTENT_DIR_s,
  WARE_DIR_s:            CONF_o.WARE_DIR_s,
  IMG_DIR_s:             CONF_o.IMG_DIR_s,
  CONTEXT_INPUT_FILE_s:  CONF_o.CONTEXT_INPUT_FILE_s,
  CONTEXT_PARTS_DIR_s:   CONF_o.CONTEXT_PARTS_DIR_s,
  CSS_SITE_DIR_s:        CONF_o.CSS_SITE_DIR_s,
  ADOC_PARTS_DIR_s:      CONF_o.ADOC_PARTS_DIR_s,
  LIB_PARTS_DIR_s:       CONF_o.LIB_PARTS_DIR_s,
  CONTENT_PARTS_DIR_s:   CONF_o.CONTENT_PARTS_DIR_s,
  COM_OUTPUT_DIR_s:      CONF_o.COM_OUTPUT_DIR_s,
  TOPICS_DIR_s:          CONF_o.TOPICS_DIR_s,
  HTML_PARTS_DIR_s:      CONF_o.HTML_PARTS_DIR_s,

  SITE_PATH_s:           CONF_o.SITE_PATH_s,
  DATA_PATH_s:           CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s:       CONF_o.INCLUDES_PATH_s,
  CONTENTS_PATH_s:       CONF_o.CONTENTS_PATH_s,
  CONTENT_PARTS_PATH_s:  CONF_o.CONTENT_PARTS_PATH_s,
  ADOC_TEMP_PATH_s:      CONF_o.ADOC_TEMP_PATH_s,
  TABLE_INPUT_PATH_s:    CONF_o.TABLE_INPUT_PATH_s,

  //=== FILE NAMES
  SCAN_FILE_s:       'scan.json',
  SCAN_IFRAME_s:     'scan_iframe',


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
    SCRIPT_SRC:      ``,
    STYLE_SRC:       ``,
  },


  //=== HTML-BODY: SECTIONS ===
  SECTION_a:
  [
    'article',
    'galerie',
    'stat',
  ],

  STAT_a:
  [
    'burst',
    'aster',
    'paint',
  ],

  NAV_LEGEND_o:    //: property names === SECTION_a + STAT_a
  {
    home:    { icon_s: `&#x2302;`, legend_s: `accueil` },    //: ⌂
    article: { icon_s: `&#x2263;`, legend_s: `article` },    //: ≣
    galerie: { icon_s: `&#x22A1;`, legend_s: `galerie` },    //: ⊡
    stat:    { icon_s: `&#x2237;`, legend_s: `analyse`},     //: ∷

    burst:   { icon_s: `&#x22C7;`, legend_s: `burst`},       //: ⋇
    aster:   { icon_s: `&#x229A;`, legend_s: `aster`},       //: ⊚
    paint:   { icon_s: `&#x229C;`, legend_s: `paint`},       //: ⊜
  },


  //=== HTML-BODY: TAGS ===
  INPUT_ID_s:       'IN',
  LABEL_ID_s:       'LA',
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


  //=== HTML-BODY: EXTEND MARKUP ===
  INS_OPEN_s:   '₍',       //: document preprocessor delimiter
  INS_CLOSE_s:  '₎',       //: document preprocessor delimiter

  INS_TXT_s:  '₀',        //: text insert
  INS_DEF_s:  '₁',        //: definition list
  INS_REF_s:  '₂',        //: reference insert
  INS_QUO_s:  '₃',        //: quotation insert
  INS_TAB_s:  '₄',        //: table insert
  //..............
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

  INFO_s    :           '&#x2139;',
  UP_ARROW_s:           '&#8593;',
  IMG_LEGEND_DELIM_s:   ' \u2219 ',   //: bullet

  SPECIF_DELIM_s:      ' ',    //: between specifier and content (insert)
  
  //=== DB ID
  //-- 1586-de_coster--new_york-sothebys--1625-young_woman

  ID_PART_DELIM_s:     '--',   //: between parts
  //-- ID_SUBPART_DELIM_s:        '-',    //: between subparts
  ID_WORD_DELIM_s:     '₊₊',   //: between multi word subpart

  WORDS_DELIM_s:       ' ',
  WORDS_CONCAT_s:      '_',

  //=== COMMENT
  //-- 2021-09-14T12:44:07Z₊₊Daniel₊₊Markdown subset markup test₀

  COMMENT_INTRO_s:     '₀',
  COMMENT_DELIM_s:     '₊₊',   //: subscript ++ between stamp_s, name_s, intro_s

  //=== TABLE
  CELL_DELIM_s:        '₊',    //: subscript ++

  //=== INSERT
  INS_PRINCIPAL_s:     '₌',    //: subscript =
  INS_DELIM_s:         '₊₊',   //: subscript ++
  INS_PASS_s:          '<>',   //: use adoc pass:[...]

  //=== REPLACE
  GALERY_REPLACE_s:    '<del for=section_galery hidden ></del>',
  TOPICS_REPLACE_s:    '<del for=div_topics hidden ></del>',
  COMMENTS_REPLACE_s:  '<del for=div_comment hidden ></del>',
  STAT_REPLACE_a:
  [
                       '<del for=div_burst hidden ></del>',    //: STAT_ID_s + _ + STAT_a entry
                       '<del for=div_aster hidden ></del>',    //: idem
                       '<del for=div_paint hidden ></del>',    //: idem
  ],


  //=== HTML-BODY: TABLE
  CELL_ALIGN_a:
  [
    'left',
    'center',
    'right'
  ],

  CELL_RATIO_n: .1,

  //=== HTML-BODY ANCHORS
  //-- ANCHOR_DELIM_s : '__',
  PAGE_TOP: 'page_top',


  //=== ADOC ===
  ADOC_DATA_s:       'ad',
  MACRO_INSERT_s:    'ins',
  
  BLOCK_PREAMBLE_s:  'preamble',
  BLOCK_SECTION_s:   'section_level',
  BLOCK_PARAGRAPH_s: 'paragraph',


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
}

module.exports = C_o
