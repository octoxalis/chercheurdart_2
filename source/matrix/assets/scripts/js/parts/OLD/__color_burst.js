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
  constructor ( burst_o )
  {
    this._burst_e = burst_o.container_e
    this._medianX_n = burst_o.width_n >> 1
    this._medianY_n = burst_o.height_n >> 1
    this._unit_n = 360 * H_o.PI2_n / burst_o.range_n     // H_o.PI2_n is full circle (360°)
    const paint_o =
    {
      container_e: this._burst_e,
      id_s:        burst_o.burst_s,
      class_s:     'ca_media_4_processor_paint',
    }
    this._paint_c = new PaintConsole( paint_o )

    this._paint_c.size__v( burst_o.width_n, burst_o.height_n )
    this._color_a = burst_o.color_a
    this._maxfreq_n = burst_o.maxfreq_n
    this._onHueChange = burst_o.onHueChange || null
    this._onHueTrace  = burst_o.onHueTrace || null

    if ( burst_o.onHueChange ) this._burst_e.addEventListener('click', this, false)
    if ( burst_o.onHueTrace ) this._burst_e.addEventListener('mousemove', this, false)
    this.draw__v()
  }

  /**
   * 
   * @param {*} at_n  (IntU32): position of the arc_n in the wheel
   * @param {*} freq_n (IntU32): frequency ratio of the occurences of a color
   */
  coord__a ( at_n, freq_n )
  {
    const angle_n = at_n * this._unit_n
    const x_n = ( freq_n * Math.cos( angle_n ) ) + this._medianX_n
    const y_n = ( freq_n * Math.sin( angle_n ) ) + this._medianY_n
    return [ ~~x_n, ~~y_n ]
  }

  /**
   * 
   * @param {*} pie_n (float): portion of the full color wheel to be used (full = 1.0, half = 0.5, etc.)
   */
  draw__v ( pie_n )
  {
    const arc_n = ( pie_n || 1.0 ) / this._color_a.length
    const scale_c = new LogScale( { minpos_n: 0, maxpos_n: 400, minval_n: 0, maxval_n: this._maxfreq_n } )
    let cumul_n = 0
    let at_n = 0
    this._color_a.forEach( color_o =>
    {
      if ( color_o )
      {
        const position_n = scale_c.position__n( color_o.frequency_n )
        const [ startX_n, startY_n ] = this.coord__a( cumul_n, position_n )
        cumul_n += arc_n   //: each color starts where the last color ended, so keep a cumulative bin
        const [ endX_n, endY_n ] = this.coord__a( cumul_n, position_n )
        this._paint_c
          .fill__c( color_o.hsl_a )
          .path__c( `M ${startX_n} ${startY_n} A 1 1 0 0 1 ${endX_n} ${endY_n} L ${this._medianX_n} ${this._medianY_n}` )
      }
      else cumul_n += arc_n    // have to increment however
      at_n++
    })
  }

  handleEvent ( mouse_e )
  {
    if ( mouse_e.type === 'mousemove' || mouse_e.type === 'click' )
    {
      let bound_o = this._burst_e.getBoundingClientRect()
      const atX_n =  mouse_e.clientX - ( bound_o.left + ( bound_o.width / 2 ) )
      const atY_n =  mouse_e.clientY - ( bound_o.top + ( bound_o.height / 2 ) )
      let angle_n = Math.atan2( atY_n, atX_n ) * H_o.RADDEG_n
      if ( angle_n < 0 ) angle_n += 360
      this.hue_n = ~~( ( angle_n + 90 ) % 360 )    // +90 rotation to have hue 0 at 12:00 not 3:00
      if ( ( mouse_e.type === 'mousemove' ) && this._onHueTrace ) this._onHueTrace( this.hue_n )
      else if ( this._onHueChange ) this._onHueChange( this.hue_n )
      return false
    }
  }

}
