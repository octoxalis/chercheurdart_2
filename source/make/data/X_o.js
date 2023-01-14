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

  ARTICLE_n:     0,      //: 0-1023    !!! -10-100 reserve for collection pages
  NEWS_n:        1,      //: 1024-
  SITE_n:        3,      //: 3072-
  TECH_n:        4,      //: 4096-
  WORKS_n:       5,      //: 5120-
  //?? WORKS_CHART_n: 7,      //: 7168-
  HIDDEN_n:      10,     //: 10240-


  CAT_RANGE_n:   10,     //: 11 categories
  RANGE_SHIFT_n: 10,     //: ... of 1024 documents

  CHART_DOCS_n:  ( 1 << 10 ) * 7,     //:  ( 1 << X_o.RANGE_SHIFT_n ) * X_o.CAT_RANGE_n
  HIDDEN_DOCS_n: ( 1 << 10 ) * 10,    //:  ( 1 << X_o.RANGE_SHIFT_n ) * X_o.CAT_RANGE_n
}


module.exports = X_o
