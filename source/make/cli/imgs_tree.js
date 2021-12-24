const FS_o = require('fs-extra')

const C_o = require( '../data/C_o.js' )


const I_TREE_o =
{
  WORK_DB_s: `${C_o.DB_PATH_s}work.json`,

  ARTIST_DB_s: `${C_o.DB_PATH_s}artist.json`,

  OUTPUT_s: 'source/matrix/parts/body/parts/stack_details.html',

  artist_a: null,



  identity__o:
  work_o =>
  {
    const
    {
      id_s,
      artist_s,
      subject_s
    } =
      work_o

    const artist_o =
      I_TREE_o
        .artist_a
          .find
          (
            at_o =>
              at_o
                .id_s
              ===
              artist_s
          )

    const
    {
      forename_s,
      lastname_s,
    } =
      artist_o

    const summary_s =
      id_s
        .slice
        (
          0,
          id_s
            .indexOf
            (
              C_o
                .ID_PART_DELIM_s
            )
        )

    return (
      {
        summary_s: summary_s,
        identity_s: `${forename_s} ${lastname_s}`,
        subject_s: subject_s
      }
    )
  }
  ,


  toHtml__s:
  (
    id_s,
    entry_o
  ) =>
  `
  <details>
    <summary>${entry_o.summary_s}</summary>
    <div>
      <input  id=${id_s} type=checkbox />
      <label for=${id_s}>${entry_o.identity_s} - ${entry_o.subject_s}</label>
    </div>
  </details>
`
  ,



  init__v:
  () =>
  {
    const work_a =
      JSON
        .parse
        (
          FS_o
            .readFileSync
            (
              I_TREE_o
                .WORK_DB_s,
              'utf8',
              'r'
            )
        )

    I_TREE_o
      .artist_a =
        JSON
          .parse
          (
            FS_o
              .readFileSync
              (
                I_TREE_o
                  .ARTIST_DB_s,
                'utf8',
                'r'
              )
          )

    let imgsList_s = ''

    for
    (
      let work_o
      of
      work_a
    )
    {
      const entry_o =
        I_TREE_o
          .identity__o( work_o )

      imgsList_s +=
        I_TREE_o
          .toHtml__s
          (
            work_o
              .id_s,
            entry_o
          )
    }

    FS_o.
      writeFile
      (
        I_TREE_o
          .OUTPUT_s,
        imgsList_s,
        error_o =>
          console
            .log( error_o ?? `-- Writing ${I_TREE_o.OUTPUT_s}` )
      )
  }
}



I_TREE_o
  .init__v()
