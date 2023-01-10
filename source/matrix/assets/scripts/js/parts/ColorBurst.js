//========================================================= color_burst.js
/**
 * Draw a color chart as a burst wheel
 * With a number of bins according to the length of the colors array given as config
 */
class ColorBurst
{
  /**
   * 
   * @param {*} burst_o configuration object:
   * { burst_s: 'ID', width_n, height_n, hsl_a: [34,100, 50], maxRate_n: 0.0 } ]
   */
  constructor
  (
    burst_o
  )
  {
    Object
      .assign
      (
        this,
        burst_o
      )

    this
      .context_o =
        burst_o
          .canvas_o
            .getContext( '2d' )

    this
      .unit_n =
        burst_o
          .capacity_n
        *
        (
           Math.PI
          *
          2    //: full circle (360°)
        )
        /
        burst_o
          .capacity_n

    this
      .paint_c =
        new Painter
        (
          this
            .context_o
        )

    this
      .equal_a = []          //: store all coordinates

    this
      .clearWidth_n =        //: to avoid canvas.width after transform
        this
          .canvas_o
            .width

    this
      .clearHeight_n =        //: to avoid canvas.height after transform
        this
          .canvas_o
            .height

    this
      .draw__v()
  }



  /**
   * 
   * @param {*} at_n  (IntU32): position of the arc_n in the wheel
   * @param {*} rate_n (IntU32): rate ratio of the occurences of a color
   */
  locate__a
  (
    beam_n,
    rate_n
  )
  {
    const angle_n =
      (
        beam_n
        *
        this
          .unit_n
      )
      -             //: substract PI/2 to start at 12:00 not 3:00
      (
        Math
          .PI
        *
        .5
      )

    const x_n =
      (
        rate_n
        *
        Math
          .cos( angle_n )
      )
      +
      this
        .center_n

    const y_n =
      (
        rate_n
        *
        Math
          .sin( angle_n )
      )
      +
      this
        .center_n

    return (
      [
        ~~x_n
        ,
        ~~y_n
      ]
    )
  }



  /**
   * 
   * @param {*} pie_n (float): portion of the full color wheel to be used (full = 1.0, half = 0.5, etc.)
   */
  draw__v
  (
    pie_n = 1.0
  )
  {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    //;console.time( 'draw__v' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    this
      .filter__v()

    const scale_c =        //>>>>>>>  TODO: put in constructor and change maxval_n only 
      new LogScale
      (
        {
          minpos_n: 0
          ,
          maxpos_n:
            //--this
            //--  .maxpos_n
            1000
          ,
          minval_n:
            //-- this.
            //--   maxRateFiltered_n
            //-- *
            //-- .001      //:BURST_SCALE_MIN_n
            0
          ,
          maxval_n:
            this
              .maxRateFiltered_n
        }
      )
    
    const arc_n =
      pie_n
      /
      this
        .rate_a
          .length

    let beam_n = 0
    
    let at_n = 0

    this
      .clear__v()

    for
    (
      let rate_o
      of
      this
        .filtered_a
    )
    {
      if
      (
        rate_o
      )
      {
        const locate_n =
          scale_c
            .locate__n
            (
              rate_o
                .rate_n
            )

        const
          [
            startX_n,
            startY_n
          ] =
            this
              .locate__a
              (
                beam_n,
                locate_n
              )

        beam_n +=
          arc_n   //: each color starts where the last color ended, so keep a cumulative bin

        const
          [
            endX_n,
            endY_n
          ] =
            this
              .locate__a
              (
                beam_n,
                locate_n
              )

        this
          .equal_a
            .push
            (
              {
                startX_n: startX_n,
                startY_n: startY_n,
                endX_n: endX_n,
                endY_n: endY_n
              }
            )

        this
          .paint_c
            .fill__c
            (
              rate_o
                .hsl_a
            )
            .path__c
            (
              `M ${startX_n} ${startY_n}
               A 0 0 0 0 0 ${endX_n} ${endY_n}
               L ${this.center_n} ${this.center_n}`
            )
      }
      else
      {
        this
          .equal_a
            .push( null )

        beam_n +=
          arc_n    // have to increment anyway
      }
      
      ++at_n
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    //;console.timeEnd( 'draw__v' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
  }


  
  filter__v
  ()
  {
    this
      .filtered_a = []

    this
      .maxRateFiltered_n =
        this
          .maxRate_n

    for
    (
      let rate_o
      of
      this
        .rate_a
    )
    {
      if
      (
        rate_o    //: can be null
      )
      {
        const rate_n =
          rate_o
            .rate_n

        if
        (
          rate_n
          >
          this
            .maxRate_n
        )
        {
          this
            .maxRateFiltered_n =
              rate_n
        }
      }
    }
      
    let hi_n
    let lo_n

    if
    (
      this
        .thresh_o
          .hi_n
      ===
      100
      &&
      this
        .thresh_o
          .lo_n
      ===
      0
    )
    {
      hi_n =
        this
          .maxRateFiltered_n

      lo_n =
        0
    }
    else
    {
      hi_n =
        this
          .maxRateFiltered_n
        -
        (
          this
            .maxRateFiltered_n
          *
          (
            (
              100
              -
              this
                .thresh_o
                  .hi_n
            )
            *
            .01    //: %
          )
        )
  
      lo_n =
        this
          .maxRateFiltered_n
        *
        this
          .thresh_o
            .lo_n
        *
        .01    //: %
    }

    for
    (
      let rate_o
      of
      this
        .rate_a
    )
    {
      const rate_n =
        rate_o
          ?.rate_n
      
      if
      (
        rate_n
        >
        0
      )
      {
        this
          .filtered_a
            .push
            (
              (
                (
                  rate_n
                  <=                //: inclusive hi range
                  hi_n
                )
                &&
                (
                  rate_n
                  >=              //: inclusive lo range
                  lo_n
                )
              )
              ?
                rate_o
              :
                null
            )
      }
      else
      {
        this
          .filtered_a
            .push( null )
      }
    }
  }
  

  
  equal__a
  (
    at_n    //: optional
  )
  {
    return (
      at_n
      !=
      undefined
      ?
        this
          .equal_a
            [ at_n ]
      :
        this
          .equal_a    //: everything
    )
  }



  clear__v
  ()
  {
    this
      .context_o
        .save()

    this
      .context_o
        .clearRect
        (
          0,
          0,
          this
            .clearWidth_n,
          this
            .clearHeight_n,
        )

    this
      .context_o
        .restore()
  }



  reset__v
  ()
  {
      this
        .context_o
          .resetTransform()

  }
}
