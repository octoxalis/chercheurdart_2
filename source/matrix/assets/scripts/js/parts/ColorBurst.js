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
   * { burst_s: 'ID', width_n, height_n, hsl_a: [34,100, 50], maxfreq_n: 0.0 } ]
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
        2 * Math.PI    //: full circle (360°)
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
      .clearWidth_n =        //: to avoid canvas.width after transform
        this
          .canvas_o
            .width,

    this
      .clearHeight_n =        //: to avoid canvas.height after transform
        this
          .canvas_o
            .height,

    this
      .draw__v()
  }



  /**
   * 
   * @param {*} at_n  (IntU32): position of the arc_n in the wheel
   * @param {*} freq_n (IntU32): frequency ratio of the occurences of a color
   */
  coord__a
  (
    at_n,
    freq_n
  )
  {
    const angle_n =
      at_n
      *
      this
        .unit_n
      -             //: substract PI/2 to start at 12:00 not 3:00
      (
        Math
          .PI
        *
        .5
      )

    const x_n =
      (
        freq_n
        *
        Math
          .cos( angle_n )
      )
      +
      this
        .median_n

    const y_n =
      (
        freq_n
        *
        Math
          .sin( angle_n )
      )
      +
      this
        .median_n

    return [ ~~x_n, ~~y_n ]
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
    const arc_n =
      pie_n
      /
      this
        .frequency_a
          .length

    let freq_a = []

    let maxfreq_n =
      this
        .maxfreq_n

    for
    (
      let freq_o
      of
      this
        .frequency_a
    )
    {
      if
      (
        freq_o    //: can be null
      )
      {
        const freq_n =
          freq_o
            .frequency_n

        if
        (
          freq_n
          >
          this
            .maxfreq_n
        )
        {
          maxfreq_n =
            freq_n
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
      100               //!!!!! TEMPORARY 100
      &&
      this
        .thresh_o
          .lo_n
      ===
      0
    )
    {
      hi_n =
        maxfreq_n

      lo_n =
        0
    }
    else
    {
      hi_n =
        maxfreq_n
        -
        (
          maxfreq_n
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
        maxfreq_n
        *
        this
          .thresh_o
            .lo_n
        *
        .01    //: %
    }

    for
    (
      let freq_o
      of
      this
        .frequency_a
    )
    {
      const freq_n =
        freq_o
          ?.frequency_n
      
      if
      (
        freq_n
        >
        0
      )
      {
        freq_a
          .push
          (
            (
              (
                freq_n
                <=                //: inclusive hi range
                hi_n
              )
              &&
              (
                freq_n
                >=              //: inclusive lo range
                lo_n
              )
            )
            ?
              freq_o
            :
              null
          )
      }
      else
      {
        freq_a
          .push( null )
      }
    }

    const scale_c =
      new LogScale
      (
        {
          minpos_n: 0,
          maxpos_n: this.maxpos_n,
          minval_n: 0,
          maxval_n: maxfreq_n
        }
      )
    
    let cumul_n = 0
    
    let at_n = 0

    this
      .clear__v()
      
    for
    (
      let freq_o
      of
      freq_a
    )
    {
      if
      (
        freq_o
      )
      {
        const position_n =
          scale_c
            .position__n
            (
              freq_o
                .frequency_n
            )

        const
          [
            startX_n,
            startY_n
          ] =
            this
              .coord__a
              (
                cumul_n,
                position_n
              )

        cumul_n +=
          arc_n   //: each color starts where the last color ended, so keep a cumulative bin

        const
          [
            endX_n,
            endY_n
          ] =
            this
              .coord__a
              (
                cumul_n,
                position_n
              )

        this
          .paint_c
            .fill__c
            (
              freq_o
                .hsl_a
            )
              .path__c
              (
                `M ${startX_n} ${startY_n}
                 A 0 0 0 0 0 ${endX_n} ${endY_n}
                 L ${this.median_n} ${this.median_n}`
              )
      }
      else
      {
        cumul_n +=
          arc_n    // have to increment however
      }
      
      ++at_n
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    //;console.timeEnd( 'draw__v' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
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
