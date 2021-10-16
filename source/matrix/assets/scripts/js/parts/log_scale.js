//========================================================= log_scale.js
/**
 * Logarithmic scale_n
 * @param {*} scale_o : { minpos_n: _n, maxpos: _n, minval_n: _n, maxval_n: _n }
 */
class LogScale
{
  constructor
  (
    scale_o
  )
  {
    // ?? this.maxpos = scale_o.maxpos || 100
    
    this.minpos_n =
      scale_o
        .minpos_n
      ||
      0

    this.minval_n =
      Math
        .log
        (
          scale_o
            .minval_n
          ||
          1
        )

    this.maxval_n =
      Math
        .log
        (
          scale_o
             .maxval_n
          ||
          100000
        )

    this.scale_n =
    ( 
      this.maxval_n
      -
      this.minval_n
    )
    /
    (
      scale_o
        .maxpos_n
      -
      this.minpos_n
    )
  }

  position__i =
    value_n =>
      this.minpos_n
      +
      (
        (
          Math.log( value_n )
          -
          this.minval_n
        )
        /
        this.scale_n
      )

  //  ?? NOT USED
  //  ?? value__i ( position_n )
  //  ?? {
  //  ??   return Math.exp( (position - this.minpos_n) * this.scale_n + this.minval_n )
  //  ?? }
  
}