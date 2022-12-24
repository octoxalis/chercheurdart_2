/*
 * COMPONENTS constants for templates
 */
const CONF_o = require( '../../configure.js' )
const C_o = require( './C_o.js' )

const S_o =
{
  EXT_ARROW_s:     '2303',
  INT_ARROW_s:     '2304',
  DIM_SEPARATOR_s: '00D7',
  LIST_MARKER_s:   '25AA',

  
  FULL_WIDTH_s:  '100vw',
  FULL_HEIGHT_s: '100vh',
  
  FONT_BODY_s: `'Cantarell Regular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif`,
  FONT_MONO_s: `'JetBrains Mono Light', system-ui, -apple-system, BlinkMacSystemFont, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace`,

  FIGURE_BORDER_s:   '.5rem',
  PARAGRAPH_WIDTH_s: '50ch',
  INS_WIDTH_s:       '60ch',


  FONT_BOLD_s: 600,


  LUM_BASE_n:     CONF_o.LUM_BASE_n,
  LUM_CONTRAST_n: CONF_o.LUM_CONTRAST_n,
  LUM_FRONT_s:    CONF_o.LUM_FRONT_s,
  LUM_BACK_s:     CONF_o.LUM_BACK_s,


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

  hue_cancel:   0,
  hue_accept:   120,
  hue_p:        CONF_o.HUE_P_n,     /* user definable primary */
  hue_dot:      CONF_o.HUE_P_n - 180,
  
  sat_hi_4: `94%`,           /* 11 point scale */
  //--
  sat_hi_2: `72%`,
  sat_hi_1: `61%`,
  sat_ne:   `50%`,
  sat_lo_1: `39%`,
  sat_lo_2: `28%`,
  //--
  sat_lo_4: `6%`,
  
  lum_mode:     CONF_o.LUM_MODE_n,
  lum_contrast: 45,

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
  S_o.NAV_SETTINGS_s = '288px'  //: 18em


  S_o.lum_hi_4 = `${S_o.LUM_BASE_n + ( S_o.lum_mode * S_o.LUM_CONTRAST_n * 1.0 )}%`     // = 40/40 =90%
  S_o.lum_hi_3 = `${S_o.LUM_BASE_n + ( S_o.lum_mode * S_o.LUM_CONTRAST_n * .75 )}%`     // = 30/40 =80%
  S_o.lum_hi_2 = `${S_o.LUM_BASE_n + ( S_o.lum_mode * S_o.LUM_CONTRAST_n * .50 )}%`     // = 20/40 =70%
  S_o.lum_hi_1 = `${S_o.LUM_BASE_n + ( S_o.lum_mode * S_o.LUM_CONTRAST_n * .25 )}%`     // = 10/40 =60%
  S_o.lum_ne   = `${S_o.LUM_BASE_n +  0 }%`                                             // = 50%
  S_o.lum_lo_1 = `${S_o.LUM_BASE_n - ( S_o.lum_mode * S_o.LUM_CONTRAST_n * .25 )}%`     // = 10/40 =40%
  S_o.lum_lo_2 = `${S_o.LUM_BASE_n - ( S_o.lum_mode * S_o.LUM_CONTRAST_n * .50 )}%`     // = 20/40 =30%
  S_o.lum_lo_3 = `${S_o.LUM_BASE_n - ( S_o.lum_mode * S_o.LUM_CONTRAST_n * .75 )}%`     // = 30/40 =20%
  S_o.lum_lo_4 = `${S_o.LUM_BASE_n - ( S_o.lum_mode * S_o.LUM_CONTRAST_n * 1.0 )}%`     // = 40/40 =10%
  
  S_o.inscolor =  `hsla( ${S_o.hue_p - 60} ${S_o.sat_hi_4} ${S_o.lum_lo_3} /1)`
  S_o.textcolor = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_lo_4} /1)`
  S_o.bgcolor =   `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_3} /1)`
  S_o.bg_higher = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_1} /1)`
  S_o.bg_lower =  `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_lo_1} /.6)`
  S_o.highlight = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_lo_2} /1)`
  S_o.insert =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_1} /.1)`
  S_o.table =     `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_4} /.25)`
  S_o.lighter =   `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_4} /1)`
  S_o.lighter_ne =   `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_4} /.5)`
  S_o.darker =    `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_lo_4} /1)`
  
  S_o.shadow_hi = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_2} /.75)`
  S_o.shadow_ne = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_ne} /.5)`
  S_o.shadow_lo1 = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_2} /.2)`
  S_o.shadow_lo = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_hi_2} /.1)`
  
  S_o.ins_shadow_ne = `hsla( ${S_o.hue_p - 200} ${S_o.sat_hi_4} ${S_o.lum_lo_3} /.25)`
  S_o.accept_hi =     `hsla(${S_o.hue_accept} ${S_o.sat_hi_4} ${S_o.lum_hi_2} /1)`
  S_o.cancel_hi =     `hsla(${S_o.hue_cancel} ${S_o.sat_hi_4} ${S_o.lum_hi_2} /1)`

  S_o.nav_main =       `hsla(${S_o.hue_p + 0}   ${S_o.sat_hi_1} ${S_o.lum_lo_1} /1)`
  S_o.nav_stat =       `hsla(${S_o.hue_p + 40}  ${S_o.sat_hi_1} ${S_o.lum_lo_1} /1)`
  S_o.nav_substat =    `hsla(${S_o.hue_p + 80}  ${S_o.sat_hi_1} ${S_o.lum_lo_1} /1)`
  S_o.nav_substat_op = `hsla(${S_o.hue_p + 100} ${S_o.sat_lo_2} ${S_o.lum_lo_1} /1)`


  S_o.nav_dot_home =    `hsla( ${S_o.hue_p}    ${S_o.sat_hi_1} ${S_o.lum_ne} /1)`
  S_o.nav_dot_article = `hsla( ${S_o.hue_p}    ${S_o.sat_lo_4} ${S_o.lum_hi_1} /1)`
  S_o.nav_dot_gallery = `hsla( 60              ${S_o.sat_hi_1} ${S_o.lum_hi_1} /1)`
  S_o.nav_dot_expo = `hsla( ${S_o.hue_p + 90}              ${S_o.sat_hi_1} ${S_o.lum_hi_1} /1)`
  S_o.nav_dot_stat =    `hsla( ${S_o.hue_dot} ${S_o.sat_hi_1} ${S_o.lum_ne} /1)`

  S_o.nav_dot_set_1 =   `hsla( ${S_o.hue_dot - 180} ${S_o.sat_hi_2} ${S_o.lum_lo_2} /1)`
  S_o.nav_dot_set_2 =   `hsla( ${S_o.hue_dot - 180} ${S_o.sat_hi_2} ${S_o.lum_hi_2} /1)`
  S_o.nav_dot_set_3 =   `hsla( ${S_o.hue_dot - 90} ${S_o.sat_hi_2} ${S_o.lum_lo_2} /1)`

  S_o.selected_hi =   `hsla( ${S_o.hue_p} ${S_o.sat_hi_2} ${S_o.lum_ne} / .9 )`
  S_o.selected_lo =   `hsla( ${S_o.hue_p} ${S_o.sat_hi_2} ${S_o.lum_ne} / .2 )`

  S_o.match_dot = `hsla( ${S_o.hue_p} ${S_o.sat_hi_4} ${S_o.lum_lo_3} /1)`
  S_o.bg_dot = S_o.bgcolor
  
  S_o.hue_back = 0
  S_o.back_sat = '100'
  S_o.back_lum = '50'

  S_o.paint_brush_s = `${S_o.hue_p} ${S_o.sat_hi_2} ${S_o.lum_lo_2}`

  S_o.bgblack_s = `hsl( var(--${C_o.STAT_a[0]}_img_bg_hue) 0% 0% /1)`
  S_o.bgwhite_s = `hsl( var(--${C_o.STAT_a[0]}_img_bg_hue) 100% 100% /1)`

  S_o.color_ne = `hsla( ${S_o.hue_p} ${S_o.sat_lo_2} ${S_o.lum_ne} /1 )`


void function
()
{
  //;console.log( S_o )
}()


module.exports = S_o



/* ;console.log( S_o )
{
  EXT_ARROW_s: '2303',
  INT_ARROW_s: '2304',
  DIM_SEPARATOR_s: '00D7',
  LIST_MARKER_s: '25AA',
  FULL_WIDTH_s: '100vw',
  FULL_HEIGHT_s: '100vh',
  FONT_BODY_s: "'Cantarell Regular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif",
  FONT_MONO_s: "'JetBrains Mono Light', system-ui, -apple-system, BlinkMacSystemFont, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace",
  FIGURE_BORDER_s: '2vmin',
  PARAGRAPH_WIDTH_s: '50ch',
  FONT_BOLD_s: 600,
  LUM_BASE_n: 50,
  LUM_CONTRAST_n: 49,
  LUM_FRONT_s: '72%',
  LUM_BACK_s: '17%',
  PAD_1: '0.25em',
  PAD_2: '0.5em',
  PAD_3: '0.75em',
  PAD_4: '1em',
  PAD_5: '1.25em',
  PAD_6: '1.5em',
  PAD_8: '2em',
  PAD_10: '2.5em',
  PAD_12: '3em',
  PAD_16: '4em',
  PAD_20: '5em',
  hue_cancel: 0,
  hue_accept: 120,
  hue_p: 190,
  hue_dot: 10,
  sat_hi_4: '94%',
  sat_hi_2: '72%',
  sat_hi_1: '61%',
  sat_ne: '50%',
  sat_lo_1: '39%',
  sat_lo_2: '28%',
  sat_lo_4: '6%',
  lum_mode: -1,
  lum_contrast: 45,
  brightness_hi4: 4,
  brightness_hi2: 2,
  brightness_hi: 1.3,
  brightness_ne: 1,
  brightness_lo: 0.7,
  brightness_lo2: 0.5,
  brightness_lo3: 0.25,
  frame_gradient_from: 'hsla( 60 61% 28% /1)',
  frame_gradient_to: 'hsla( 20 39% 17% /1)',
  NAV_HEIGHT_s: '2em',
  NAV_LABEL_s: '1em',
  NAV_SETTINGS_s: '288px',
  lum_hi_4: '1%',
  lum_hi_3: '13.25%',
  lum_hi_2: '25.5%',
  lum_hi_1: '37.75%',
  lum_ne: '50%',
  lum_lo_1: '62.25%',
  lum_lo_2: '74.5%',
  lum_lo_3: '86.75%',
  lum_lo_4: '99%',
  inscolor: 'hsla( 130 94% 86.75% /1)',
  textcolor: 'hsla( 190 28% 99% /1)',
  bgcolor: 'hsla( 190 28% 13.25% /1)',
  bg_higher: 'hsla( 190 28% 37.75% /1)',
  bg_lower: 'hsla( 190 28% 62.25% /.6)',
  highlight: 'hsla( 190 28% 74.5% /1)',
  insert: 'hsla( 190 28% 37.75% /.1)',
  table: 'hsla( 190 28% 1% /.25)',
  lighter: 'hsla( 190 28% 1% /1)',
  lighter_ne: 'hsla( 190 28% 1% /.5)',
  darker: 'hsla( 190 28% 99% /1)',
  shadow_hi: 'hsla( 190 28% 25.5% /.75)',
  shadow_ne: 'hsla( 190 28% 50% /.5)',
  shadow_lo: 'hsla( 190 28% 25.5% /.1)',
  ins_shadow_ne: 'hsla( -10 94% 86.75% /.25)',
  accept_hi: 'hsla(120 94% 25.5% /1)',
  cancel_hi: 'hsla(0 94% 25.5% /1)',
  nav_main: 'hsla(190   61% 62.25% /1)',
  nav_stat: 'hsla(230  61% 62.25% /1)',
  nav_substat: 'hsla(270  61% 62.25% /1)',
  nav_substat_op: 'hsla(290 28% 62.25% /1)',
  nav_dot_home: 'hsla( 190    61% 50% /1)',
  nav_dot_article: 'hsla( 190    6% 37.75% /1)',
  nav_dot_gallery: 'hsla( 60              61% 37.75% /1)',
  nav_dot_expo: 'hsla( 280              61% 37.75% /1)',
  nav_dot_stat: 'hsla( 10 61% 50% /1)',
  nav_dot_set_1: 'hsla( -170 72% 74.5% /1)',
  nav_dot_set_2: 'hsla( -170 72% 25.5% /1)',
  nav_dot_set_3: 'hsla( -80 72% 74.5% /1)',
  selected_hi: 'hsla( 190 72% 50% / .9 )',
  selected_lo: 'hsla( 190 72% 50% / .2 )',
  match_dot: 'hsla( 190 94% 50% /1)',
  bg_dot: 'hsla( 190 28% 13.25% /1)',
  hue_back: 0,
  back_sat: '100',
  back_lum: '50',
  paint_brush_s: '190 72% 74.5%',
  bgblack_s: 'hsl( var(--burst_img_bg_hue) 0% 0% /1)',
  bgwhite_s: 'hsl( var(--burst_img_bg_hue) 100% 100% /1)'
}
*/
