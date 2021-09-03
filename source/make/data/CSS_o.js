/*
 * COMPONENTS constants for templates
 */
const CONF_o = require( '../../configure.js' )

const CSS_o =
{
  EXT_ARROW_s:     '2303',
  INT_ARROW_s:     '2304',
  DIM_SEPARATOR_s: '00D7',
  LIST_MARKER_s:   '25AA',

  
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


module.exports = CSS_o
