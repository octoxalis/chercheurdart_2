const DOCS_o = require( './docs.js' )

const C_o    = require( '../data/C_o.js' )



const TOP_o =
{
  script_s: `./PLDA_model.py`,   //: Partially topic LDA

  docs_topics_json_s: `${C_o.TOPICS_DIR_s}docs_topics.json`,
}



module.exports =
{
  write__v
  ()
  {
    const  { spawn } =
      require( 'child_process' )

    const topic_o =
      spawn
      (
        'python3',
        [
          TOP_o
            .script_s
        ]
      )

    topic_o
      .stdout.on('data', data => console.log(`STDOUT:\n${data}`) )    //: child process exit code

    topic_o
      .stderr.on('data', data => console.error(`STDERR:\n${data}`) )

    topic_o
      .on('close', code_n => console.log(`-- Python child process exited with code ${code_n}`) )

    //----
    setTimeout
    (
      () =>
      void DOCS_o
        .parse__v
        (
          TOP_o
            .docs_topics_json_s
        ),
      2000
    )
  }
,



}