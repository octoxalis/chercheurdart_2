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
  //XX ADOC_PARTS_DIR_s:      CONF_o.ADOC_PARTS_DIR_s,
  COM_OUTPUT_DIR_s:      CONF_o.COM_OUTPUT_DIR_s,
  TOPICS_DIR_s:          CONF_o.TOPICS_DIR_s,
  HTML_PARTS_DIR_s:      CONF_o.HTML_PARTS_DIR_s,

  SITE_PATH_s:           CONF_o.SITE_PATH_s,
  DATA_PATH_s:           CONF_o.DATA_PATH_s,
  INCLUDES_PATH_s:       CONF_o.INCLUDES_PATH_s,
  CONTENTS_PATH_s:       CONF_o.CONTENTS_PATH_s,
  CONTENT_PARTS_PATH_s:  CONF_o.CONTENT_PARTS_PATH_s,
  //XX ADOC_TEMP_PATH_s:      CONF_o.ADOC_TEMP_PATH_s,
  DB_PATH_s:             CONF_o.DB_PATH_s,
  TABLE_INPUT_PATH_s:    CONF_o.TABLE_INPUT_PATH_s,

  IMG_MAX_PATH_s:    '/full/max/0/',    //: IOR
  IMG_1024_PATH_s:    '/full/_1024/0/',    //: IOR
  


  //=== FILE NAMES
  STAT_W_FILE_s:    '/assets/scripts/js/stat_w.min.js',
  PAINT_W_FILE_s:   '/assets/scripts/js/paint_w.min.js',
  MEDIA_DIR_s:      `${U_o.url_s}assets/media/img/`,


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
    'article',    //: section[0]
    'galerie',    //: section[1]
    'panorama',   //: section[2]
    'stat',       //: section[3]
  ],
  STAT_a:         //: section[3]
  [
    'burst',
    'aster',
    'paint',
    'match',
  ],

  STAT_s: 'stat',

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
    panorama: { icon_s: `&#8226;`, legend_s: `panorama` },

    panorama_hide: { icon_s: `&nbsp;`, legend_s: `masquer`},
    panorama_remove: { icon_s: `&nbsp;`, legend_s: `supprimer`},
    panorama_group: { icon_s: `&nbsp;`, legend_s: `regrouper`},
    panorama_group: { icon_s: `&nbsp;`, legend_s: `regrouper`},
    panorama_col: { icon_s: `&nbsp;`, legend_s: `Images par rang`},
    //?? panorama_local: { icon_s: `&nbsp;`, legend_s: `ajouter`},
    panorama_local: { icon_s: `&nbsp;`, legend_s: `Image locale`},


    burst: { icon_s: `&#8718;`, legend_s: `répartition`},
    aster: { icon_s: `&#8718;`, legend_s: `aster`},
    paint: { icon_s: `&#8718;`, legend_s: `transformation`},
    match: { icon_s: `&#8718;`, legend_s: `corrélation`},

    burst_hue:  { icon_s: `&#8728;`, legend_s: `tonalité`},
    burst_sat:  { icon_s: `&#8728;`, legend_s: `intensité`},
    burst_lum:  { icon_s: `&#8728;`, legend_s: `luminosité`},
    
    burst_freq: { icon_s: `&#8728;`, legend_s: `proportion`},
    
    stat_open:      { icon_s: `&nbsp;`, legend_s: `palette`},
    stat_close:     { icon_s: `&nbsp;`, legend_s: `fermer`},
    stat_shadow_fold:     { icon_s: `&nbsp;`, legend_s: `replier`},
    stat_shadow_unfold:     { icon_s: `&nbsp;`, legend_s: `deplier`},
    //???. stat_increment: { icon_s: `&nbsp;`, legend_s: `agrandir`},
    //???. stat_decrement: { icon_s: `&nbsp;`, legend_s: `réduire`},
    burst_plots: { icon_s: `&nbsp;`, legend_s: `étalonnage`},
    burst_img: { icon_s: `&nbsp;`, legend_s: `image`},
    thresh_hi: { icon_s: `&nbsp;`, legend_s: `seuil haut`},
    thresh_lo: { icon_s: `&nbsp;`, legend_s: `seuil bas`},
    img_opacity: { icon_s: `&nbsp;`, legend_s: `opacité`},
    img_bgblack: { icon_s: `&nbsp;`, legend_s: `noir`},
    img_bgwhite: { icon_s: `&nbsp;`, legend_s: `blanc`},
    img_bgcolor: { icon_s: `&nbsp;`, legend_s: `couleur`},
    img_picker: { icon_s: `&nbsp;`, legend_s: `sélecteur`},


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

  PERCENT_s: '%',      //: Percent Sign

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


  //=== BURST TOOLS ===
  INPUT_RANGE_SCALEY_n:  .5,
  SCREEN_DIM_n:          1024,    //: default, set by burst.init()
  SCREEN_RATIO_n:        1,
  BURST_SCALE_n:         1,
  BURST_PLOTS_SCALE_n:   .2,   //: default
  BURST_RANGE_n:         60,   //!!!  TEMPORARY //: 1 range
  BURST_THRESH_HI_n:     0,
  BURST_THRESH_LO_n:     0,
  BURST_IMG_OPACITY_n:  20,
  BURST_IMG_RESET_n:     255,    //: contrast
  BURST_NAV_DIM_n:       360,
  BURST_SCALE_MIN_n:     .001,
  BURST_TRANSFORM_DIM_s: '60rem',  //: keep space for layer_view
  BURST_PICK_HUE_n:      0,
  BURST_PICK_SAT_n:      100,
  BURST_PICK_LUM_n:      50,


  PAINT_LAYER_n:        8,
  PAINT_DEVIATION_n:    10,
  PAINT_DISTANCE_X_n:    0,        /* factor */
  PAINT_PERSPECTIVE_n:   1000,
  PAINT_DISTANCE_n:     -100,
  PAINT_ROTATE_n:       0,
  PAINT_SCALE_n:        .25,
  CANVAS_RESIZE_n:      .025,

  PAINT_SLIDER_n:       2,    //: 2px line

  //=== PANORAMA TOOLS ===
  PANORAMA_COL_n:     2,


  //=== HTML-BODY ANCHORS
  //-- ANCHOR_DELIM_s : '__',
  PAGE_TOP:    'page_top',
  FULL_SCREEN: 'full_screen',
  BURST_PLOTS: 'burst_plots',
  
  //=== HTML-BODY CSS SELECTORS
  BURST_IMG_CAPTION_s: 'h1+p span[data-ins="₉"]',
  PANORAMA_IMG_PREFIX_s: 'img_local',


  //=== HTML-BODY: TAGS ===
  CANVAS_ID_s:      'CA',
  INPUT_ID_s:       'IN',
  LABEL_ID_s:       'LA',
  IFRAME_ID_s:      'IF',
  DIV_ID_s:         'DI',
  LIST_ID_s:        'UL',
  LIST_ITEM_ID_s:   'LI',
  NAV_ID_s:         'NA',
  INSERT_ID_s:      'I',
  ASIDE_GRAY_ID_s:  'AG',
  ASIDE_COLOR_ID_s: 'AC',
  GALERY_ID_s:      'G',
  PANORAMA_ID_s:    'P',
  TOPICS_ID_s:      'T',

  TABLE_TAG_s:      'span',
  LABEL_TAG_s:      'label',
  ROW_TAG_s:        'b',
  IOR_DIM_TAG_s:    'i',
  CHAPTER_TAG_s:    'h2',

  //=== HTML-BODY: CLASSES ===
  SELECTED_CLASS_s: 'selected',


  //=== LIST ===
  LIST_INDENT_n:  2,

  //=== HTML-BODY: EXTEND MARKUP ===
  INFO_s    :           '&#8505;',   //: Information Source Emoji:  ℹ
  GOTO_TOP_s:           '&#8593;',   //: Upwards Arrow:             ↑
  FULL_SCREEN_s:        '&#9974;',   //: square four corners:       ⛶
  LAYER_INDEX_s:        '&#8942;',   //: Vertical Ellipsis:        ⋮
  IMG_LEGEND_DELIM_s:   ' \u2219 ',  //: bullet                    ∙
  IMG_RETRACT_s:        '&#10530;',  //: NE and SW Arrow           ⤢
  IMG_RESET_s:          '&#8634;',   //: Anticlockwise Open Circle Arrow          
  //-- IMG_PANORAMA_s:       '&#8862;',   //: Squared Plus               ⊞
  IMG_DOWNLOAD_s:       '&#11123;',  //: Downwards Triangle-Headed Arrow To Bar   ⭳
  RANGE_GAP_s:          '&#8703;',   //: LR Open-Headed Arrow      ⇿
  BULLET_s:             '&#8857;',   //: bullet                    •
  SEE_MORE_s:           '&#8943;',          //: 


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
  CELL_DELIM_s:        '₊',          //: subscript ++

  
  TABLE_INSERT_s:    'td',


  //=== DB ===
  //-- 1586-de_coster--new_york-sothebys--1625-young_woman

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
