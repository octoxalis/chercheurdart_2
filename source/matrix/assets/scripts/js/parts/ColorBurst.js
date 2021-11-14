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
      )                    ;console.log( this )

    this
      .context_o =
        burst_o
          .canvas_o
            .getContext( '2d' )

    this
    .unit_n =
      360
      *
      Math.PI * 2    // H_o.PI2_n is full circle (360°)
      /
      burst_o
        .range_n

    this
      .paint_c =
        new Painter
        (
          this
            .context_o
        )

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
    pie_n=1.0
  )
  {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    ;console.time( 'draw__v' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    const arc_n =
      pie_n
      /
      this
        .color_a
          .length

    const scale_c =
      new LogScale
      (
        {
          minpos_n: 0,
          maxpos_n: 400,
          minval_n: 0,
          maxval_n: this.maxfreq_n
        }
      )
    
    let cumul_n = 0
    
    let at_n = 0
    
    for
    (
      let color_o
      of
      this
        .color_a
    )
    {
      if
      (
        color_o
      )
      {
        const position_n =
          scale_c
            .position__i
            (
              color_o
                .frequency_n
            )

        const [ startX_n, startY_n ] =
          this
            .coord__a
            (
              cumul_n,
              position_n
            )

        cumul_n +=
          arc_n   //: each color starts where the last color ended, so keep a cumulative bin

        const [ endX_n, endY_n ] =
          this
            .coord__a
            (
              cumul_n,
              position_n
            )

        this.paint_c
          .fill__c
          (
            color_o
              .hsl_a
          )
          .path__c
          (
            `M ${startX_n} ${startY_n} A 1 1 0 0 1 ${endX_n} ${endY_n} L ${this.median_n} ${this.median_n}`
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
    ;console.timeEnd( 'draw__v' )
    //!!!!!!!!!!!!!!!!!!!!!!!!!!
    
  }



  clear__v
  ()
  {
    this
      .context_o
        .clearRect
        (
          0,
          0,
          this
            .canvas_o
              .width,
          this
            .canvas_o
              .height
        )
  }
}
