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
  CONTENT_PARTS_PATH_s: 'matter/content/parts',

  MAKE_DIR_s:           'make/11ty/',
  CONTENT_DIR_s:        'matter/content/',

  ADOC_TEMPLATES_s:     'matrix/adoc/templates',  


  //=== DIR ===     relative to site || source/ware dir
  IMG_DIR_s:           './assets/media/img/',
  CONTEXTUAL_INPUT_s:  '../assets/styles/contextual_css/html.context.html',
  CONTEXTUAL_OUTPUT_s: '../../matrix/assets/styles/css/parts/',





  //=== CSS constants to avoid calc(): can be changed! ===  
  HUE_P_n:        228,  //: theme PRIMARY color in range [0...359]
  LUM_MODE_n:     -1,   //: luminosity mode: 1 (light) || -1 (dark)
  LUM_BASE_n:     50,
  LUM_CONTRAST_n: 49,   //: luminosity contrast in range [30...49]
                        //: (30 is less contrast than 49)
                        //: see https://www.w3.org/TR/WCAG20/ §1.4.1 compliance
  LUM_FRONT_s: '72%',   //: fixed front color luminosity (code)
  LUM_BACK_s:  '17%',   //: fixed back color luminosity (code)
}
