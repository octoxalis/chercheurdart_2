/*
 * Site globals for installation
 */


module.exports =
{
  //=== SERVICE WORKER ===
  SERVICE_b: true,      //: enable Service Worker (false to disable)
  KEY_n: 2,             //: service worker key




  //=== DIR & PATH (no slash at end) ===     relative to source dir
  SITE_PATH_s:          '../site',
  DATA_PATH_s:          'make/data',
  INCLUDES_PATH_s:      'matrix',
  CONTENT_PARTS_PATH_s: 'matter/contents/parts',
  ADOC_TEMP_PATH_s:     'make/adoc/templates',

  MAKE_DIR_s:           'make/11ty/',
  CONTENT_DIR_s:        'matter/contents/',
  TOPICS_DIR_s:         'make/lib/parts/',



  //=== DIR ===     relative to site || source/ware dir
  WARE_DIR_s:           'source/ware/',
  IMG_DIR_s:            'assets/media/img/',
  HTML_PARTS_DIR_s:     'assets/parts/',
  CSS_SITE_DIR_s:       '../site/assets/styles/css/',
  LIB_PARTS_DIR_s:      'make/lib/parts/',
  CONTENT_PARTS_DIR_s:  'matter/contents/parts/',
  ADOC_PARTS_DIR_s:     'source/matter/contents/parts/',
  CONTEXT_PARTS_DIR_s:  'source/matrix/assets/styles/css/parts/',

  CONTENTS_PATH_s:      'source/matter/contents',
  TABLE_INPUT_PATH_s:   'source/make/db/table',
  
  CONTEXT_INPUT_FILE_s: 'source/ware/assets/styles/ccss/html.context.html',

  COM_OUTPUT_DIR_s:    'make/comment/',


  //=== GENERATE ===
  ADOC_MARKUP_b:        false,


  //=== CSS constants to avoid calc(): can be changed! ===  
  HUE_P_n:        190,     //: theme PRIMARY color in range [0...359]
  LUM_MODE_n:     -1,      //: luminosity mode: 1 (light) || -1 (dark)
  LUM_BASE_n:     50,
  LUM_CONTRAST_n: 49,      //: luminosity contrast in range [30...49] - (30 is less contrast than 49) - see https://www.w3.org/TR/WCAG20/ §1.4.1 compliance
  LUM_FRONT_s:    '72%',   //: fixed front color luminosity (code)
  LUM_BACK_s:     '17%',   //: fixed back color luminosity (code)
}
