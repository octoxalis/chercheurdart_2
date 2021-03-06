// === Painter.js ===

class Painter
{
  constructor
  (
    context_o
  )
  {
    this
      .context_o =
        context_o

    this
      .opacity_n = 1
  }


  hsla__s
  (
    hsl_a
  )
  {
    let
    [
      hue_n,
      sat_n,
      lum_n,
      opac_n
    ] =
      hsl_a

    return `hsla( ${hue_n} ${sat_n}% ${lum_n}%/${opac_n || this.opacity_n})`
  }



  opacity__c
  (
    opacity_n
  )
  {
    this
      .opacity_n =
        opacity_n
  }



  fill__c ( hsl_a )
  {
    this
      .context_o
        .fillStyle =
          this
            .hsla__s( hsl_a )

    return this
  }



  stroke__c
  (
    hsl_a,    //: hsl_a: [ hue_n, sat_n, lum_n ]
    line_n=1
  )
  {
    this
      .context_o
        .strokeStyle =
          this
            .hsla__s( hsl_a )

    this
      .context_o
        .lineWidth =
          line_n

    return this
  }



  thick__c
  (
    thick_n
  )
  {
    this
      .context_o
        .lineWidth =
          thick_n

    return this
  }



  line__c
  (
    x_n,
    y_n,
    x1_n,
    y1_n
    )
  {
    this
      .context_o
        .beginPath()

    this
      .context_o
        .moveTo
        (
          x_n,
          y_n
        )

    this
      .context_o
        .lineTo
        (
          x1_n,
          y1_n
        )

    this
      .context_o
        .stroke()

    return this
  }



  path__c
  (
    path_s
  )
  {
    this
      .context_o
        .fill
        (
          new Path2D( path_s )
        )
        
    return this
  }
  


  rect__c
  (
    x_n,
    y_n,
    width_n,
    height_n,
    method_s  //: clear || fill || stroke
  )
  {
    this
      .context_o
        [`${method_s}Rect`]
        (
          x_n,
          y_n,
          width_n,
          height_n
        )

    return this
  }



  arc__v
  (
    x_n,
    y_n,
    radius_n,
    start_n=Math.PI*1.5,
    end_n=0,
    clock_b=false
  )
  {
    this
      .context_o
        .beginPath()

    this
      .context_o
        .arc
        (
          x_n,
          y_n,
          radius_n,
          start_n,
          end_n,
          clock_b
        )

    return this
  }



  arc__c
  (
    x_n,
    y_n,
    radius_n,
    start_n=Math.PI*1.5,    //: [ 0...Math.PI*2]
    end_n=0,                //: idem
    clock_b=false
  )
  {
    this
      .arc__v
      (
        x_n,
        y_n,
        radius_n,
        start_n,
        end_n,
        clock_b
      )

    this
      .context_o
        .stroke()

    return this
  }



  circle__c
  (
    x_n,
    y_n,
    radius_n,
    start_n=Math.PI*2,    //: [ 0...Math.PI*2]
    end_n=0,              //: idem
    clock_b=false
  )
  {
    this
      .arc__v
      (
        x_n,
        y_n,
        radius_n,
        start_n,
        end_n,
        clock_b
      )


    this
      .context_o
        .fill()

    return this
  }



  pieSlice__c
  (
    x_n,
    y_n,
    radius_n,
    start_n=Math.PI*2,    //: [ 0...Math.PI*2]
    end_n=0,              //: idem
    clock_b=false
  )
  {
    this
      .context_o
        .beginPath()

    this
      .context_o
        .moveTo
        (
          x_n,
          y_n
        )

    this
      .context_o
        .arc
          (
            x_n,
            y_n,
            radius_n,
            start_n,
            end_n
          )

    this
      .context_o
        .closePath()

    this
      .context_o
        .fill()

    return this
  }



  clear__c 
  ()
  {
    this
      .context_o
        .clearRect
        (
          0,
          0,
          this
            .context_o
              .canvas
                .width,
          this
            .context_o
              .canvas
                .height
        )

    return this
  }
}
