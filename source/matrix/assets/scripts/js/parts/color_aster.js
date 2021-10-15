//========================================================= color_aster.js
/**
 * Draw a color chart as an aster wheel
 * Cumulative hues are partitioned in RGB pies
 * Individual hues are ploted as circles
 * ( from the largest to the smallest )
 * whose area and distance from the wheel center is
 * proportional to the number of pixels in the image
 */
class ColorAster
{
  /**
   * 
   * @param {*} aster_o configuration object:
   * { arch_s: 'ID', width_n, height_n, hsl_a: [34,100, 50], maxfreq_n: 0.0 } ]
   */
  constructor ( aster_o )
  {
    this._aster_e = aster_o.container_e
    this._color_a = aster_o.color_a
    this._scale_n = aster_o.scale_n
    this._center_n = aster_o.width_n >> 1
    this._unit_n = 360 * H_o.PI2_n / aster_o.range_n     // H_o.PI2_n is full circle (360°)
    this._ratio_n = 0    //: init in pie__v

    const paint_o =
    {
      container_e: aster_o.container_e,
      id_s:        aster_o.arch_s,
      class_s:     'ca_media_4_processor_paint',
    }
    this._paint_c = new PaintConsole( paint_o )
    this._paint_c.size__v( aster_o.width_n, aster_o.width_n )  // square canvas

    this._onHueChange = aster_o.onHueChange || null
    this._onHueTrace  = aster_o.onHueTrace || null
    if ( aster_o.onHueChange ) this._aster_e.addEventListener('click', this, false)
    if ( aster_o.onHueTrace )  this._aster_e.addEventListener('mousemove', this, false)
    this.pie__v()
    this.plot__v()  
  }

  pie__v ()
  {
    const part_a = this.rgb__a()
    let ARC_n = Math.PI * .6666
    let START_n = Math.PI * -.8333
    part_a.forEach( ( part_o, at_n ) =>
      {
        let radius_n = Math.sqrt( part_o.cumul_n / Math.PI )
        if ( !at_n ) this._ratio_n = this._center_n / radius_n
        radius_n *= this._ratio_n
        let start_n = START_n + ( part_o.atHue_n * ARC_n )
        this._paint_c
          .fill__c( [ part_o.atHue_n * 120, 100, 60, .25 ] )
          .pieSlice__c( this._center_n, this._center_n, radius_n, start_n, start_n + ARC_n )
      } )
  }

  plot__v ()
  {
    this._color_a.forEach( slot_a =>
    {
      if ( !slot_a[1] ) return  // empty hue
      const [ x_n, y_n ] = this.coord__a ( slot_a )
      const radius_n = Math.sqrt( slot_a[0] ) * this._ratio_n * this._scale_n
      this._paint_c
        .fill__c( [slot_a[1], 100, 50 ] )  //: [1] is hue number
        .circle__c ( x_n, y_n, radius_n )
    } )

  }

  rgb__a ()
  {
    const R_n = 60    //: red hue
    const G_n = 180   //: green
    const B_n = 300   //: blue
    const part_a = [ 0, 0, 0 ]    //: RGB cumul
    this._color_a.forEach( slot_a =>
      {
        switch ( true )
        {
          case ( slot_a[1] >= B_n ) || ( slot_a[1] < R_n ): part_a[0] += slot_a[0]
            return
          case ( slot_a[1] >= R_n ) && ( slot_a[1] < G_n ): part_a[1] += slot_a[0]
            return
          default: part_a[2] += slot_a[0]
        }
      } )
    const RGB_a =
    [
      { cumul_n: part_a[0], atHue_n: 0 },
      { cumul_n: part_a[1], atHue_n: 1 },
      { cumul_n: part_a[2], atHue_n: 2 }
    ]
    return RGB_a.sort( ( current_o, compare_o ) => compare_o.cumul_n - current_o.cumul_n )  //: descending order
  }

  coord__a ( slot_a )
  {
    const angle_n = ( ( slot_a[1] - 90 ) / 360 ) * this._unit_n   //: -90 rotation to have hue 0 at 12:00 not 3:00
    const radius_n = Math.sqrt( slot_a[0] ) * this._ratio_n
    const x_n = ( radius_n * Math.cos( angle_n ) ) + this._center_n
    const y_n = ( radius_n * Math.sin( angle_n ) ) + this._center_n
    return [ ~~x_n, ~~y_n ]
  }

  handleEvent ( mouse_e )
  {
    //...
  }

}
