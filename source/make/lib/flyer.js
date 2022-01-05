//=== flyer.js ===
const MARK_o =
  require( '../lib/2mark.js' )

const REX_o =
  require( './regex.js' )


const FLY_o =
{
  flyer_o: {},



  flyer__v:
  (
    key_s,
    value_s
  ) =>
    FLY_o
      .flyer_o
        [ key_s ] =
        value_s
  ,



  flyer__s:
  (
    body_s,
  ) =>
  {
        //;console.log( FLY_o.flyer_o )

    for
    (
      const match_a
      of
      Array
        .from
        (
          body_s
            .matchAll
            (
              REX_o
                .new__re( 'gm' )
                `<aside
                \s+
                data-flyer_n=
                (
                \d+
                )
                >`
            )
        )
    )
    {
      const aside_s =
        `${match_a[0]}\n`
        + MARK_o
          .process__s
          (
            FLY_o
              .flyer_o
                [ match_a[1] ]
          )
        
      body_s =
        body_s
          .replace
          (
            match_a[0],
            aside_s
          )
    }

    return body_s
  }
  ,
  
}


module
  .exports =
    FLY_o