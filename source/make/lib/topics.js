const FS_o = require('fs-extra')

const C_o = require( '../data/C_o.js' )
const X_o = require( '../data/X_o.js' )



const DOCS_o =
{
  DOCS_TOPICS_s:  'make/lib/parts/docs_topics.json',
  TOPICS_DOCS_s:  'make/lib/parts/topics_docs.json',



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
              [X_o.AT_DOCN_n]
            ===
            doc_n
        )

    let linkList_s = ''

    let link_n = 0

    let count_n = 0

    for
    (
      let topic_s
      of
      docsTopics_a
        [index_n]
          [X_o.AT_TOPICS_n]
    )
    {
      const id_s =
        `${C_o.TOPICS_ID_s}_${doc_n}_${link_n}`

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
          index_n             //: skip link to this page
          &&
          docsTopics_a
            [topicDoc_n]
              [X_o.AT_DOCN_n]
          <                    //: skip hidden docs
          X_o
            .HIDDEN_DOCS_n
        )
        {
          const [ , doc_s, title_s, subtitle_s ] =
            docsTopics_a
              [topicDoc_n]
          
          link_s +=
            `<${C_o.ROW_TAG_s}><a href=${doc_s}.html>${title_s}</a></${C_o.ROW_TAG_s}>`
            + `<${C_o.ROW_TAG_s} data--=abstract>${subtitle_s}</${C_o.ROW_TAG_s}>`

          ++count_n
        }
      }

      if
      (
        link_s
      )
      {
        const atopic_s =
          topic_s
            .replaceAll
            (
              C_o.WORDS_CONCAT_s,
              C_o.WORDS_DELIM_s
            )


//--  <a href="1586-de_coster--new_york-sothebys--1625-young_woman.html">Jeune femme (1625 c.) par Adam de Coster</a>
//--  <label for="L_1586-de_coster--new_york-sothebys--1625-young_woman" tabindex="-1" data-ins="???">${C_o.INFO_s}</label>
//--  <input id="L_1586-de_coster--new_york-sothebys--1625-young_woman" type="checkbox">
          



        linkList_s +=
`<li>
  <label for=${id_s} tabindex=-1 data-ins="???">${atopic_s}</label>
  <label for=${id_s} tabindex="-1" data-ins="???">${C_o.INFO_s}</label>
  <input id=${id_s} type=checkbox>
  <ins>
    <span data-ins=???>
    ${link_s}
    </span>
  </ins>
</li>`
      }

      ++link_n
    }

    return (
      linkList_s
      ?
`
<hr/>
<h2>Correspondances</h2>
<div><p></p>
<label for=topics_link_a data-list=link_n>${count_n}</label>
<input id=topics_link_a type=checkbox />
<ul data-list=link_a>
${linkList_s}
</ul></div>`
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
