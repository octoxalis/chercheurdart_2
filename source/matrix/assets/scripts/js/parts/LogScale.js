//========================================================= log_scale.js
/**
 * Logarithmic scale_n
 * @param {*} scale_o : { minpos_n, maxpos_n, minval_n, maxval_n }
 */

class LogScale
{
  constructor
  (
    scale_o
  )
  {
    // ?? this.maxpos = scale_o.maxpos || 100
    
    this
      .minpos_n =
        scale_o
          .minpos_n
        ||
        0

    this
      .minval_n =
        Math
          .log
          (
            scale_o
              .minval_n
            ||
            1.0
          )

    this
      .maxval_n =
        Math
          .log
          (
            scale_o
               .maxval_n
            ||
            1000000.0    //: maximum log value
          )

    this
      .scale_n =
      ( 
        this
          .maxval_n
        -
        this
          .minval_n
      )
      /
      (
        scale_o
          .maxpos_n
        -
        this
          .minpos_n
      )
  }

  position__i =
    value_n =>
      this
        .minpos_n
        +
        (
          (
            Math
              .log( value_n )
            -
            this
              .minval_n
          )
          /
          this
            .scale_n
        )

  //  ?? NOT USED
  //  ?? value__i ( position_n )
  //  ?? {
  //  ??   return Math.exp( (position - this.minpos_n) * this.scale_n + this.minval_n )
  //  ?? }
  
}
