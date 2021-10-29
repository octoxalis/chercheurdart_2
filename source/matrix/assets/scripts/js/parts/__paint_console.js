class PaintConsole
{
  constructor ( paint_o ) //... container_e, id_s, class_s, after_s, transform_s
  {
    let canvas_e = document.getElementById( paint_o.id_s )  //: canvas previously created?
    if ( !canvas_e )
    {
      this.canvas_b = false
      canvas_e = document.createElement( 'canvas' )
      canvas_e.setAttribute( 'id', paint_o.id_s )
      if ( paint_o.class_s ) canvas_e.setAttribute( 'class', paint_o.class_s )
      if ( !paint_o.after_s ) paint_o.container_e.appendChild( canvas_e )
      else paint_o.container_e.after( document.getElementById( after_s ) )
    }
    else this.canvas_b = true
    this.canvas_e = canvas_e
    this.context_o = this.canvas_e.getContext('2d')
    //??? this.pixelRatio = window.devicePixelRatio
    //??? this.context_o.setTransform( this.pixelRatio, 0, 0, this.pixelRatio, 0, 0 )
    this.opacity_n = 1
  }

  size__v ( width_n, height_n )
  {
    this.canvas_e.width  = width_n  //???? * this.pixelRatio
    this.canvas_e.height = height_n //???? * this.pixelRatio
    if ( this.canvas_b ) this.clear__c()
    return this
  }

  hsla__s ( hsl_a )
  {
    const [ hue_n, sat_n, lum_n, opac_n ] = hsl_a
    return `hsla( ${hue_n}, ${sat_n}%, ${lum_n}%, ${opac_n !== undefined ? opac_n : this.opacity_n} )`
  }

  opacity__c ( opacity_n )
  {
    this.opacity_n = opacity_n
  }

  thick__c ( thick_n )
  {
    this.context_o.lineWidth = thick_n
    return this
  }

  stroke__c ( hsl_a, line_n=1 )    //: hsl_a: [hue_n, sat_n, lum_n]
  {
    this.context_o.strokeStyle = this.hsla__s( hsl_a )
    this.context_o.lineWidth = line_n
    return this
  }

  clear__c  ()
  {
    this.context_o.clearRect( 0, 0, this.canvas_e.width, this.canvas_e.height )
    return this
  }
  
  fill__c ( hsl_a )
  {
    this.context_o.fillStyle = this.hsla__s( hsl_a )
    return this
  }

  line__c ( x_n, y_n, x1_n, y1_n )
  {
    this.context_o.beginPath()
    this.context_o.moveTo( x_n, y_n )
    this.context_o.lineTo( x1_n, y1_n )
    this.context_o.stroke()
    return this
  }

  path__c ( path_s )
  {
    this.context_o.fill( new Path2D( path_s ) )
    return this
  }
  
  rect__c ( x_n, y_n, width_n, height_n, method_s )  //: clear || fill || stroke
  {
    this.context_o[`${method_s}Rect`]( x_n, y_n, width_n, height_n )
    return this
  }

  arc__v ( x_n, y_n, radius_n, start_n=Math.PI*1.5, end_n=0, clock_b=false )
  {
    this.context_o.beginPath()
    this.context_o.arc( x_n, y_n, radius_n, start_n, end_n, clock_b )
  }

  arc__c ( x_n, y_n, radius_n, start_n=Math.PI*1.5, end_n=0, clock_b=false )
  {
    this.arc__v( x_n, y_n, radius_n, start_n, end_n, clock_b )
    this.context_o.stroke()
    return this
  }

  circle__c ( x_n, y_n, radius_n, start_n=0, end_n=Math.PI*2, clock_b=false )
  {
    this.arc__v( x_n, y_n, radius_n, start_n, end_n, clock_b )
    this.context_o.fill()
    return this
  }

  pieSlice__c ( x_n, y_n, radius_n, start_n, end_n, clock_b=false )
  {
    this.context_o.beginPath()
    this.context_o.moveTo( x_n, y_n )
    this.context_o.arc( x_n, y_n, radius_n, start_n, end_n )
    this.context_o.closePath()
    this.context_o.fill()
    return this
  }

  //?? data__a ( x_n, y_n, width_n, height_n )
  //?? {
  //??   //... this.context_o.getImageData( x_n, y_n, width_n, height_n )
  //?? }
  //?? 
  //?? canvas__e ()
  //?? {
  //??   return this.canvas_e
  //?? }

}
