/*
 * Indexed words constants for templates
 */
//XX const CONF_o = require( '../../configure.js' )

const X_o =
{
  WORD_OPEN_s:  '‹',
  WORD_CLOSE_s: '›',

  ARTICLE_s:   0,      //: 0-1023
                                  //... _s: 1,      //: 1024-
  NEWS_s:      2,      //: 2048-
                                  //... _s: 3,      //: 3072-
  SITE_s:      4,      //: 4096-
  TECH_s:      5,      //: 5120-
  UI_s:        6,      //: 6144-
  HIDDEN_s:    7,      //: 7168-8191

  CAT_RANGE_n:   7,     //: 8 categories
  RANGE_SHIFT_n: 10,    //: ... of 1024 documents
}


module.exports = X_o
