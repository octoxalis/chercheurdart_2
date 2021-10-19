/*
 * Indexed words constants for templates
 */
//XX const CONF_o = require( '../../configure.js' )

const X_o =
{
  WORD_OPEN_s:  '‹',
  WORD_CLOSE_s: '›',

  NO_TOPIC_n:  -1,     //: document is excluded (ex. 404.html)
  DOC_INDEX_n: 0,      //: index doc_n is 0 (> NO_TOPIC_n)
  AT_DOCN_n:   0,      //: doc_n in docs_a
  AT_TOPICS_n: 4,      //: [topic_s,...]

  ARTICLE_n:   0,      //: 0-1023
  WORKS_n:     1,      //: 1024-
  NEWS_n:      2,      //: 2048-
                                  //... _n: 3,      //: 3072-
  SITE_n:      4,      //: 4096-
  TECH_n:      5,      //: 5120-
  UI_n:        6,      //: 6144-
  HIDDEN_n:    7,      //: 7168-8191

  CAT_RANGE_n:   7,     //: 8 categories
  RANGE_SHIFT_n: 10,    //: ... of 1024 documents

  HIDDEN_DOCS_n: ( 1 << 10 ) * 7,    //:  ( 1 << X_o.RANGE_SHIFT_n ) * X_o.CAT_RANGE_n
}


module.exports = X_o
