const FS_o = require('fs-extra')

const C_o = require( '../data/C_o.js' )



const DOCS_o =
{
  DOCS_TOPICS_s:  'make/index/input/docs_topics_words.json',
  TOPICS_DOCS_s:  'make/index/input/topics_docs.json',

  AT_DOCN_n:     0,    //: doc_n in docs_a
  AT_DOCS_n:     1,    //: doc_s
  AT_TITLE_n:    2,    //: title
  AT_SUBTITLE_n: 3,    //: subtitle
  AT_TOPICS_n:   4,    //: [topic_s,...]



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

    const index_n =
      docsTopics_a
        .findIndex
        (
          at_o =>
            at_o
              [DOCS_o.AT_DOCN_n]
            ===
            doc_n
        )

    let linkList_s = ''

    let link_n = 0

    for
    (
      let topic_s
      of
      docsTopics_a
        [index_n]
          [DOCS_o.AT_TOPICS_n]
    )
    {
      const id_s =
        `T_${link_n}`      //: T for 'topic'

      const topic_a =
        topicsDocs_a
          [topic_s]

      let link_s = ''

      for
      (
        let topicDoc_n
        of
        topicsDocs_a
          [topic_s]
      )
      {
        if
        (
          topicDoc_n
          !==
          index_n       //: skip link to this page
        )
        {
          const doc_s =
            docsTopics_a
              [topicDoc_n]
                [DOCS_o.AT_DOCS_n]
            
          const title_s =
            docsTopics_a
              [topicDoc_n]
                [DOCS_o.AT_TITLE_n]
            
          link_s +=
            `<b><a href=${doc_s}.html#${C_o.SECTION_a[0]}>${title_s}</a></b>`
        }
      }

      if
      (
        link_s
      )
      {
        linkList_s +=
`<p>${topic_s}
  <span data-ins=principal data-spec=₀> </span>
  <label for=${id_s} data-doc_n=${doc_n} tabindex=-1>▾</label>
  <input id=${id_s} type=checkbox>
  <ins>
    <span data-ins=subsid data-spec=₀>
    ${link_s}
    </span>
  </ins>
</p>`
      }

      ++link_n
    }

    return (
      linkList_s
      ?
`
<hr/>
<h2>
  <label for="voir-aussi" tabindex=-1>Voir aussi</label>
</h2>
<div>
${linkList_s}
</div>
`
      :
      ''
      )
  }
  ,
}



module.exports =
{
  list__v:
  (
    doc_n
  ) =>
    DOCS_o
      .list__v( doc_n )
  ,



}
