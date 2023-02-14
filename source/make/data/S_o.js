/*
 * COMPONENTS constants for templates
 */
const CONF_o = require( '../../configure.js' )
const C_o = require( './C_o.js' )

const S_o =
{
  FONT_BODY_s: `'Cantarell Regular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif`,
  FONT_MONO_s: `'JetBrains Mono Light', system-ui, -apple-system, BlinkMacSystemFont, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace`,
  
  FULL_WIDTH_s:  '100vw',
  FULL_HEIGHT_s: '100vh',
  
  FIGURE_BORDER_s:   '.5rem',
  PARAGRAPH_WIDTH_s: '60ch',
  INS_WIDTH_s:       '60ch',
  HEADER_WIDTH_s:    '30vw',

  FONT_BOLD_s: 600,

  PAD_1:  .25 * 1 + 'em',
  PAD_2:  .25 * 2 + 'em',
  PAD_3:  .25 * 3 + 'em',
  PAD_4:  .25 * 4 + 'em',
  PAD_5:  .25 * 5 + 'em',
  PAD_6:  .25 * 6 + 'em',
  PAD_8:  .25 * 8 + 'em',
  PAD_10: .25 * 10 + 'em',
  PAD_12: .25 * 12 + 'em',
  PAD_16: .25 * 16 + 'em',
  PAD_20: .25 * 20 + 'em',

  SETTINGS_WIDTH: '24ch',


  hue_p:        CONF_o.HUE_P_n,     /* user definable primary */
  hue_dot:      CONF_o.HUE_P_n - 180,
  hue_cancel:   0,
  hue_accept:   120,
  
  sat_hi_4: `94%`,           /* 11 point scale */
  //+++
  sat_hi_2: `72%`,
  sat_hi_1: `61%`,
  sat_ne:   `50%`,
  //--- sat_lo_1: `39%`,
  //--- sat_lo_2: `28%`,
  //+++
  sat_lo_4: `11%`,

  
  LUM_MODE_n:       CONF_o.LUM_MODE_n,
  LUM_BASE_n:     CONF_o.LUM_BASE_n,
  LUM_CONTRAST_n: CONF_o.LUM_CONTRAST_n,

  brightness_hi4: 4,
  brightness_hi2: 2,
  brightness_hi: 1.3,  
  brightness_ne: 1,
  brightness_lo: .7,
  brightness_lo2: .5,
  brightness_lo3: .25,

  frame_gradient_from: `hsla( 60 61% 28% /1)`,           /* 11 point scale */
  frame_gradient_to:   `hsla( 20 39% 17% /1)`,

  }



  S_o.NAV_HEIGHT_s = S_o.PAD_8
  S_o.NAV_LABEL_s  = S_o.PAD_4


  S_o.lum_hi_100 = `${S_o.LUM_BASE_n + ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * 1.0 )}%`     // = 40/40 =90%
  S_o.lum_hi_90 =  `${S_o.LUM_BASE_n + ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .9 )}%`      // = 30/40 =80%
  S_o.lum_hi_75 =  `${S_o.LUM_BASE_n + ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .75 )}%`     // = 30/40 =80%
  S_o.lum_hi_62 =  `${S_o.LUM_BASE_n + ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .55 )}%`     // = 20/40 =70%
  S_o.lum_hi_50 =  `${S_o.LUM_BASE_n + ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .50 )}%`     // = 20/40 =70%
  S_o.lum_hi_25 =  `${S_o.LUM_BASE_n + ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .25 )}%`     // = 10/40 =60%
  S_o.lum_0 =      `${S_o.LUM_BASE_n +  0 }%`                                               // = 50%
  S_o.lum_lo_25 =  `${S_o.LUM_BASE_n - ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .25 )}%`     // = 10/40 =40%
  S_o.lum_lo_50 =  `${S_o.LUM_BASE_n - ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .50 )}%`     // = 20/40 =30%
  S_o.lum_lo_75 =  `${S_o.LUM_BASE_n - ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * .75 )}%`     // = 30/40 =20%
  S_o.lum_lo_100 = `${S_o.LUM_BASE_n - ( S_o.LUM_MODE_n * S_o.LUM_CONTRAST_n * 1.0 )}%`     // = 40/40 =10%
  


  //=== COLORS ===
  S_o.light =       `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_100} /1)`
  S_o.bg =          `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_62}  /1)`
  S_o.bg_hi =       `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_25}  /1)`
  S_o.bg_lo =       `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_lo_50}  /1)`
  S_o.text =        `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_lo_75}  /1)`
  S_o.text_lo =     `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_0}      /1)`
  S_o.shadow =       `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_90} /1)`


  S_o.light_100 =   `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_50} /1)`
  S_o.light_09 =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_50} /.9)`
  S_o.light_07 =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_50} /.75)`
  S_o.light_05 =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_50} /.5)`
  S_o.light_02 =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_50} /.25)`
  S_o.light_01 =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_50} /.1)`


  //=== SELECT ALERT === needs color
  S_o.medium_100 =   `hsla( ${S_o.hue_p} ${S_o.sat_ne} ${S_o.lum_lo_50} /1)`
  S_o.medium_07 =    `hsla( ${S_o.hue_p} ${S_o.sat_ne} ${S_o.lum_lo_50} /.7 )`
  S_o.medium_02 =    `hsla( ${S_o.hue_p} ${S_o.sat_ne} ${S_o.lum_lo_50} /.2 )`

  S_o.red_100 =      `hsla( 0   ${S_o.sat_hi_4} ${S_o.lum_hi_25} /1)`
  S_o.green_100 =    `hsla( 120 ${S_o.sat_hi_4} ${S_o.lum_hi_25} /1)`


  //=== RANGE ===
  S_o.range =       `hsla( ${S_o.hue_p} ${S_o.sat_lo_4} ${S_o.lum_hi_75} /1)`


  //=== NAV ===
  S_o.dot_home =    `hsla( ${S_o.hue_p}       ${S_o.sat_hi_1} ${S_o.lum_hi_25} /1)`
  S_o.dot_article = `hsla( ${S_o.hue_p}       ${S_o.sat_lo_4} ${S_o.lum_hi_25} /1)`
  S_o.dot_gallery = `hsla( ${S_o.hue_p - 90}  ${S_o.sat_hi_1} ${S_o.lum_hi_25} /1)`
  S_o.dot_expo =    `hsla( ${S_o.hue_p + 90}  ${S_o.sat_hi_1} ${S_o.lum_hi_25} /1)`
  S_o.dot_stat =    `hsla( ${S_o.hue_p + 180} ${S_o.sat_hi_1} ${S_o.lum_hi_25} /1)`


  //====== VARs ======
  S_o.bgtransparent_s = `transparent`

  S_o.bg_hue =  0
  S_o.bg_sat = '100'
  S_o.bg_lum = '50'

  S_o.bg_0 =   `hsl( var(--${C_o.STAT_a[0]}_img_bg_hue) 0% 0% /1)`
  S_o.bg_100 = `hsl( var(--${C_o.STAT_a[0]}_img_bg_hue) 100% 100% /1)`

  S_o.brush_s = `${S_o.hue_p} ${S_o.sat_hi_2} ${S_o.lum_lo_50}`



//=================== WAIT
  S_o.dot_set_4 = `hsla( ${S_o.hue_dot - 90}  ${S_o.sat_hi_2} ${S_o.lum_lo_100} /1)`
  S_o.dot_set_1 = `hsla( ${S_o.hue_dot - 180} ${S_o.sat_hi_2} ${S_o.lum_lo_50}  /1)`
  S_o.dot_set_2 = `hsla( ${S_o.hue_dot - 180} ${S_o.sat_hi_2} ${S_o.lum_hi_50}  /1)`
  S_o.dot_set_3 = `hsla( ${S_o.hue_dot - 90}  ${S_o.sat_hi_2} ${S_o.lum_lo_50}  /1)`

  S_o.match_dot = `hsla( ${S_o.hue_p} ${S_o.sat_hi_4} ${S_o.lum_lo_75} /1)`
  





void function
()
{
  //;console.log( S_o )
}()


module.exports = S_o


/* ;console.log( S_o )
*/
