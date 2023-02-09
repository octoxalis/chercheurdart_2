//=== C_.o.js ===

const CONF_o = require( '../../configure.js' )
const A_o = require( './A_o.js' )
const U_o = require( './U_o.js' )


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
  RESERVE_PARTS_DIR_s:   CONF_o.RESERVE_PARTS_DIR_s,
  COM_OUTPUT_DIR_s:      CONF_o.COM_OUTPUT_DIR_s,
  TOPICS_DIR_s:          CONF_o.TOPICS_DIR_s,
  HTML_PARTS_DIR_s:      CONF_o.HTML_PARTS_DIR_s,

  SITE_PATH_s:           CONF_o.SITE_PATH_s,
  DATA_PATH_s:           CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s:       CONF_o.INCLUDES_PATH_s,
  CONTENTS_PATH_s:       CONF_o.CONTENTS_PATH_s,
  CONTENT_PARTS_PATH_s:  CONF_o.CONTENT_PARTS_PATH_s,
  DB_PATH_s:             CONF_o.DB_PATH_s,
  TABLE_INPUT_PATH_s:    CONF_o.TABLE_INPUT_PATH_s,
  IMG_RESERVE_SRC_PATH_s: CONF_o.IMG_RESERVE_SRC_PATH_s,
  IMG_RESERVE_SITE_PATH_s: CONF_o.IMG_RESERVE_SITE_PATH_s,

  IMG_MAX_PATH_s:     '/full/max/0/',    //: IOR
  IMG_1024_PATH_s:    '/full/_1024/0/',    //: IOR

  IMG_SCAN_FORMAT_s:  'jpeg',
  IMG_SCAN_DISPLAY_s: 'avif',
  


  //=== FILE NAMES
  STAT_W_FILE_s:    '/assets/scripts/js/stat_w.min.js',
  PAINT_W_FILE_s:   '/assets/scripts/js/paint_w.min.js',
  MEDIA_DIR_s:      `${U_o.url_s}assets/media/img/`,
  RESERVE_DIR_s:    `${U_o.url_s}assets/media/img/reserve/`,
  //... RESERVE_DIR_s:    `${U_o.url_s}reserve/`,
  RESERVE_JSON_s:   `source/ware/assets/json/img_reserve.json`,


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
    STYLE_SRC:       `'unsafe-inline'`,    //: used to setAttribute
  },


  //=== HTML-BODY: SECTIONS ===
  SECTION_a:
  [
    'article',    //: section[0]
    'galerie',    //: section[1]
    'expo',       //: section[2]
    'stat',       //: section[3]
  ],
  STAT_a:         //: section[3]
  [
    'burst',
    '__reserved__',    //.....
    'paint',
    'match',
  ],

  STAT_s: 'stat',

  MASONRY_s: 'masonry',

  NAV_LEGEND_o:    //: property names === SECTION_a + STAT_a
  {
    
    empty:   `&nbsp;`,
    main:    { icon_s: `&nbsp;`},     //: SPACE
    stat:    { icon_s: `&#8901;`},    //: DOT OPERATOR ⋅
    substat: { icon_s: `&#8728;`},    //: RING OPERATOR ∘

    close:   { legend_s: `&#215;`},       //: ×

    home:    { icon_s: `&#8226;`, legend_s: `accueil` },
    article: { icon_s: `&#8226;`, legend_s: `article` },
    galerie: { icon_s: `&#8226;`, legend_s: `galerie` },
    expo:    { icon_s: `&#8226;`, legend_s: `exposition` },
    reserve: { icon_s: `&#8226;`, legend_s: `réserve` },

    expo_add: { icon_s: `&nbsp;`, legend_s: `ajouter`},
    expo_remove: { icon_s: `&nbsp;`, legend_s: `retirer`},
    expo_hide: { icon_s: `&nbsp;`, legend_s: `masquer`},
    expo_group: { icon_s: `&nbsp;`, legend_s: `regrouper`},
    expo_caption: { icon_s: `&nbsp;`, legend_s: `cartel`},
    expo_export: { icon_s: `&nbsp;`, legend_s: `exporter`},
    expo_import: { icon_s: `&nbsp;`, legend_s: `importer`},
    expo_added: { icon_s: `&nbsp;`, legend_s: `image locale`},
    expo_wrap: { icon_s: `&nbsp;`, legend_s: `affichage`},

    burst: { icon_s: `&#8718;`, legend_s: `répartition`},
    reserved: { icon_s: `&#8718;`, legend_s: `reserved`},
    paint: { icon_s: `&#8718;`, legend_s: `transformation`},
    match: { icon_s: `&#8718;`, legend_s: `corrélation`},

    burst_hue:  { icon_s: `&#8728;`, legend_s: `tonalité`},
    burst_sat:  { icon_s: `&#8728;`, legend_s: `intensité`},
    burst_lum:  { icon_s: `&#8728;`, legend_s: `luminosité`},
    burst_rate: { icon_s: `&#8728;`, legend_s: `proportion`},
    
    stat_shadow_fold:     { icon_s: `&nbsp;`, legend_s: `replier`},
    stat_shadow_unfold:     { icon_s: `&nbsp;`, legend_s: `deplier`},
    stat_close:     { icon_s: `&nbsp;`, legend_s: `fermer`},
    settings_open:      { icon_s: `&nbsp;`, legend_s: `palette`},
    anim_open:      { icon_s: `&nbsp;`, legend_s: `animation`},
    burst_equal: { icon_s: `&nbsp;`, legend_s: `égaliser`},
    burst_img: { icon_s: `&nbsp;`, legend_s: `visualiser`},
    burst_reset: { icon_s: `&nbsp;`, legend_s: `reinitialiser`},
    burst_download: { icon_s: `&nbsp;`, legend_s: `exporter`},
    burst_hi: { icon_s: `&nbsp;`, legend_s: `seuil haut`},
    burst_lo: { icon_s: `&nbsp;`, legend_s: `seuil bas`},
    burst_opacity: { icon_s: `&nbsp;`, legend_s: `opacité`},

    play_progress: { icon_s: `&nbsp;`, legend_s: `progression`},
    play_interval: { icon_s: `&nbsp;`, legend_s: `interval`},
    play_slower: { icon_s: `&nbsp;`, legend_s: `&#8600;`},           //: ralentir
    play_steady: { icon_s: `&nbsp;`, legend_s: `&#10230;`},           //: constant
    play_faster: { icon_s: `&nbsp;`, legend_s: `&#8599;`},           //: accélérer
    play_forward: { icon_s: `&nbsp;`, legend_s: `&#10230;`},   //: ⟶
    play_backward: { icon_s: `&nbsp;`, legend_s: `&#10229;`},  //: ⟵
    play_step: { icon_s: `&nbsp;`, legend_s: `&#8631;&#8631;&#8631;`},  //: ↷↷↷

    img_bgtransparent: { icon_s: `&nbsp;`, legend_s: `transparent`},
    img_bgblack: { icon_s: `&nbsp;`, legend_s: `noir`},
    img_bgwhite: { icon_s: `&nbsp;`, legend_s: `blanc`},
    img_bgcolor: { icon_s: `&nbsp;`, legend_s: `couleur`},
    img_picker: { icon_s: `&nbsp;`, legend_s: `sélecteur`},
    //?? slideshow_over: { icon_s: `&nbsp;`, legend_s: `complet`},


    paint_origin:   { icon_s: `&nbsp;`, legend_s: `original`},
    paint_cursor:   { icon_s: `&nbsp;`,  legend_s: `&nbsp;`},

    layer_s:            { icon_s: `&nbsp;`,  legend_s: `Plan`},
    layer_initial:      { icon_s: `&nbsp;`,  legend_s: `initial`},
    layers_add:         { icon_s: `&nbsp;`,  legend_s: `Ajouter`},
    layers_hide:        { icon_s: `&nbsp;`,  legend_s: `Masquer`},
    layers_perspective: { icon_s: `&nbsp;`,  legend_s: `Perspective`},
    layers_distance:    { icon_s: `&nbsp;`,  legend_s: `Distance`},
    layers_rotate:      { icon_s: `&nbsp;`,  legend_s: `Rotation`},
    layers_scale:       { icon_s: `&nbsp;`,  legend_s: `Échelle`},

    layers_none:        { icon_s: `&nbsp;`,  legend_s: `Aucune opération`},
    layers_union:       { icon_s: `&nbsp;`,  legend_s: `Union`},
    layers_difference:  { icon_s: `&nbsp;`,  legend_s: `Différence`},
    layers_intersection:{ icon_s: `&nbsp;`,  legend_s: `Intersection`},
    layers_complement:  { icon_s: `&nbsp;`,  legend_s: `Complément`},
    layers_deviation:   { icon_s: `&nbsp;`,  legend_s: `Déviation`},

    open_list_marker:     { icon_s: `&nbsp;`,  legend_s: `⊳`},
    //??? close_list_marker:     { icon_s: `&nbsp;`,  legend_s: `∇`},
    //??? left_index_marker:     { icon_s: `&nbsp;`,  legend_s: `⊲`},

  },

  //?? BURST_IMG_SLIDESHOW_1_s: 'Lent',
  //?? BURST_IMG_SLIDESHOW_2_s: 'Normal',
  //?? BURST_IMG_SLIDESHOW_3_s: 'Rapide',


  PERCENT_s: '%',      //: Percent Sign

  //=== REPLACE
  GALERY_REPLACE_s:    '<del for=section_galerie hidden ></del>',
  TOPICS_REPLACE_s:    '<del for=div_topics hidden ></del>',
  COMMENTS_REPLACE_s:  '<del for=div_comment hidden ></del>',
  STAT_REPLACE_a:
  [
                       '<del for=burst_div hidden ></del>',    //: STAT_ID_s + _ + STAT_a entry
                       '<del for=div_reserved hidden ></del>',    //: idem
                       '<del for=div_paint hidden ></del>',    //: idem
  ],


  //=== BURST TOOLS ===
  MAP_THRESHOLD_n:              2,
  MAP_WIDTH_n:                  8192,
  MAP_HEIGHT_n:                 64,

  MAP_SHIFT_n:                  12,     //: map scaling
  MAP_CLAMP_MIN_n:              4,
  MAP_CLAMP_MAX_n:              16,


  INPUT_RANGE_SCALEY_n:         .5,
  SCREEN_DIM_n:                 1024,    //: default, set by burst.init()
  SCREEN_RATIO_n:               1,
  BURST_SCALE_n:                1,
  BURST_EQUAL_SCALE_n:          .2,   //: default
  BURST_RANGE_n:                1,   //!!!  TEMPORARY //: 1 range
  BURST_THRESH_HI_n:            0,
  BURST_THRESH_LO_n:            0,
  BURST_IMG_OPACITY_n:          20,
  BURST_IMG_RESET_n:            255,    //: contrast
  BURST_NAV_DIM_n:              360,
  BURST_TRANSFORM_DIM_s:        '100vmin',  //!!! overriden
  BURST_TRANSFORM_MAX_SCALE_n: .85,  //: keep a tiny space for menu bar
  BURST_TRANSFORM_SCALE_n:     .33,
  BURST_TRANSLATE_MID_n:       '100%',
  BURST_TRANSLATE_FULL_n:      '50%',

  BURST_PICK_HUE_n:            0,
  BURST_PICK_SAT_n:            100,
  BURST_PICK_LUM_n:            50,
  PLAY_INTERVAL_n:             1000,     //: ms
  PLAY_PAUSE_n:                1000 * 60 * 10,     //: 10' pause
  SHOT_IMG_s:                  'image',
  SHOT_HSL_s:                  'burst',


  PAINT_LAYER_n:        8,
  PAINT_DEVIATION_n:    10,
  PAINT_DISTANCE_X_n:   0,        //: factor
  PAINT_PERSPECTIVE_n:  1000,
  PAINT_DISTANCE_n:     -100,
  PAINT_ROTATE_n:       0,
  PAINT_SCALE_n:        .25,
  CANVAS_RESIZE_n:      .025,

  PAINT_SLIDER_n:       2,    //: 2px line

  //=== EXPO TOOLS ===
  EXPO_WRAP_n:       5,

  //=== RESERVE TOOLS ===
  RESERVE_WRAP_n:    5,


  //=== HTML-BODY ANCHORS
  //-- ANCHOR_DELIM_s : '__',
  MAIN_DOCK:    'main_dock',
  FULL_SCREEN:  'full_screen',
  PAGE_TOP:     'page_top',
  PLACE_CENTER: 'place_center',

  BURST_EQUAL: 'burst_equal',
  
  //=== HTML-BODY CSS SELECTORS
  BURST_IMG_CAPTION_s: 'h1+p span[data-ins="₉"]',
  EXPO_IMG_PREFIX_s:   'img_import',


  //=== HTML-BODY: TAGS ===
  CANVAS_ID_s:      'CA',
  INPUT_ID_s:       'IN',
  LABEL_ID_s:       'LA',
  IFRAME_ID_s:      'IF',
  DIV_ID_s:         'DI',
  LIST_ID_s:        'UL',
  LIST_ITEM_ID_s:   'LI',
  NAV_ID_s:         'NA',
  PARAGRAPH_ID_s:   'PA',
  INSERT_ID_s:      'I',
  ASIDE_GRAY_ID_s:  'AG',
  ASIDE_COLOR_ID_s: 'AC',
  GALLERY_ID_s:     'G',
  EXPO_ID_s:        'E',
  RESERVE_ID_s:     'R',
  TOPICS_ID_s:      'T',

  CHAPTER_TAG_s:    'h2',
  //??? LABEL_TAG_s:      'label',
  TABLE_TAG_s:      'span',
  ROW_TAG_s:        'b',
  IOR_DIM_TAG_s:    'i',



  //=== HTML-BODY: CLASSES ===
  SELECTED_CLASS_s: 'selected',


  //=== LIST ===
  LIST_INDENT_n:    2,

  //=== HTML-BODY: EXTEND MARKUP ===
  INFO_s:               '&#8505;',   //: Information Source Emoji:  ℹ
  ZOOM_IN_s:            '&#8853;',   //: CIRCLED PLUS              ⊕
  ZOOM_OUT_s:           '&#8854;',   //: CIRCLED MINUS             ⊖
  CLOSE_s:              '&#10005;',  //: CIRCLED DASH             ✕
  //-- MAIN_DOCK_s:          '&#9776;',   //:  TRIGRAM FOR HEAVEN       ☰
  MAIN_DOCK_s:          '&#10097;',   //:  DOUBLE RIGHT-POINTING ANGLE QUOTATION MARK   »
  FULL_SCREEN_s:        '&#9974;',   //: square four corners       ⛶
  GOTO_TOP_s:           '&#8593;',   //: Upwards Arrow             ↑
  GOTO_CENTER_s:        '&#10530;',  //: NE and SW Arrow           ⤢
  SHIFT_KEY_s:          '&#8679;',   //: ARROW                     ⇧
  CTRL_KEY_s:           '&#8705;',   //:                      ⇧

  LAYER_INDEX_s:        '&#8942;',   //: Vertical Ellipsis         ⋮

  IMG_BAR_s:            '&#8597;',   //: NS Arrow           ↕
  IMG_RESET_s:          '&#8634;',   //: Anticlockwise Open Circle Arrow          
  IMG_DOWNLOAD_s:       '&#11123;',  //: Downwards Triangle-Headed Arrow To Bar   ⭳
  IMG_SLIDESHOW_s:      '&#9744;',          //:  ☐☐☐ ∷∷  ⊟⊟  ☰☰
  RANGE_GAP_s:          '&#8703;',   //: LR Open-Headed Arrow      ⇿
  BULLET_s:             '&#8857;',   //: bullet                    •
  SEE_MORE_s:           '&#8230;',   //: HORIZONTAL ELLIPSIS
  IMG_EXPO_s:           '&#8862;',   //: Squared Plus               ⊞
  IMG_PLAY_s:           '⊳',         //: CONTAINS AS NORMAL SUBGROUP    &#8883;
  IMG_SETTINGS_s:       '&#8285;',    //:  VERTICAL ELLIPSIS      ⁝
  IMG_MAP_s:            '&#9783;',    //: TRIGRAM FOR EARTH      ☷
  IMG_BURST_s:          '&#10035;',   //: EIGHT SPOKED ASTERISK  ✳
//: &#8853;     CIRCLED PLUS    ⊕
//: &#8854;     CIRCLED MINUS   ⊖

  IMG_LEGEND_DELIM_s:   ' \u2219 ',   //: bullet                    ∙

  DIM_SEPARATOR:   '00D7',
  LIST_MARKER:     '25AA',



  ID_PART_DELIM_s:     '~',   //: between parts
  FILE_ESCAPE_s:       '--',  //: replace ID_PART_DELIM_s in save/retrieve files name

  WORDS_DELIM_s:       ' ',
  WORDS_CONCAT_s:      '_',    //: underline

  //=== COMMENT
  //-- 2021-09-14T12:44:07Z₊₊Daniel₊₊Markdown subset markup test₀

  COMMENT_INTRO_s:     '₀',
  COMMENT_DELIM_s:     '₊₊',   //: subscript ++ between stamp_s, name_s, intro_s

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


  //=== DIALOGS ===
  //++ CSS selector: data-wait={{F_o.slug__s( C_o.WAIT_EXPO_HEAD_s )}}
  WAIT_SCAN_HEAD_s: `Analyse de l'image`,
  WAIT_SCAN_TAIL_s: `Cette opération ne prend que quelques secondes`,
  WAIT_EXPO_HEAD_s: `Chargement des images`,
  WAIT_EXPO_TAIL_s: `La durée de cette opération dépend de la taille et du nombre des images`,



  //=== HTML-BODY: TABLE
  CELL_ALIGN_a:
  [
    'left',
    'center',
    'right'
  ],

  CELL_RATIO_n: .1,
  CELL_EMPTY_s: '__',                //: 2mark: double underline
  CELL_EMPTY_ENTITY_s: '&#8280;',    //: ⁘
  CELL_DELIM_s:        '₊',          //: subscript ++

  
  TABLE_INSERT_s:    'td',


  //=== DB ===
  PRO_SITE_s:     'IND:',    //: site page (not reserve)
  PRO_RESERVE_s:  'RES:',    //: site reserve
  PRO_FILE_s:     'LOC:',    //: local file system

  DB_a:    //: db tables names
  [
    'artist',
    'work',
    'collection',
    'biblio',
  ],


  //=== SERVICE WORKER ===
  KEY_n:     CONF_o.KEY_n,

  //=== SHARED WORKER ===
  CLIENT_ALL_s: undefined,
}

module.exports = C_o
