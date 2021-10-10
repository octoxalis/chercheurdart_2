const FS_o = require('fs-extra')

//XX const F_o = require( '../data/F_o.js' )
const GRA_o = require('./Graph')    //: GRA_o redeclared in: matrix/assets/scripts/js/parts/graph.js



const DOCS_o =
{
  DOCS_TOPICS_s:  'make/index/input/docs_topics_words.json',
  TOPICS_DOCS_s:  'make/index/input/topics_docs.json',

  AT_DOCN_n:     0,    //: doc_n in docs_a
  AT_DOCS_n:     1,    //: doc_s
  AT_TITLE_n:    2,    //: [topic_s]
  AT_SUBTITLE_n: 3,    //: [word_s]



  list__v:
  (
    doc_n
  ) =>
  {
    const docsTopics_a =
      JSON
        .parse
        (
          FS_o
            .readFileSync
            (
              DOCS_o
                .DOCS_TOPICS_s,
              'utf8',
              'r'
            )
        )

    const topicsDocs_a =
      JSON
        .parse
        (
          FS_o
            .readFileSync
            (
              DOCS_o
                .TOPICS_DOCS_s,
              'utf8',
              'r'
            )
        )
  }
  ,
}



module.exports =
{
  toLink__v:
  (
    doc_n
  ) =>
  {
    return (
      `
      <hr/>
      <h2>
        <label for="voir-aussi" tabindex="-1">Voir aussi</label>
      </h2>
      <div>
        <p>first_topic
          <span data-ins="principal" data-spec="₀"> </span>
          <label for="I8320" tabindex="-1">▾</label>
          <input id="I8320" type="checkbox">
          <ins>
            <span data-ins="subsid" data-spec="₀">
              <b>
                <a href="renaissance.html#article">Renaissance</a>
              </b>
            </span>
          </ins>
        </p>
    </div>
    `
    )
  }
  ,



}


/*
                FS_o
                  .readFileSync
                  (
                    docs_s,
                    'utf8',
                    'r'
                  )
*/