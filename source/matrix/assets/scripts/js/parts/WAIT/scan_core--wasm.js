const RGB_H__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const min_n =
    Math
      .min( r_n, g_n, b_n )

  const max_n =
    Math
      .max( r_n, g_n, b_n )

  if
  (
    max_n
    ===
    min_n
  )
  {
    return 0 //: achromatic
  }

  const max_min_n =
    max_n
    -
    min_n

  const h_n =
    max_n
    ===
    r_n
    ?
      ( (g_n - b_n) / max_min_n )
      +
      ( g_n < b_n ? 6 : 0 )
    :
      max_n === g_n
      ?
        ( (b_n - r_n) / max_min_n ) + 2
      :
        ( (r_n - g_n) / max_min_n ) + 4

  return ~~(
    h_n
    *
    60
  )
}



const RGB_S__n =
(
  r_n,
  g_n,
  b_n
) =>
{
  const min_n =
    Math
      .min( r_n, g_n, b_n )

  const max_n =
    Math
      .max( r_n, g_n, b_n )

  const max_min_n =
    max_n
    -
    min_n

  if
  (
    ! max_min_n
  )
  {
    return 0 // achromatic
  }

  const min_max =
    min_n
    +
    max_n

  return (
    min_max
    >
    255
    ?
      max_min_n
      /
      (
        510
        -
        max_n
        -
        min_n
      )
    :
      max_min_n
      /
      min_max
  )
}


const RGB_L__n =
(
  r_n,
  g_n,
  b_n
) =>
  ( Math
      .min( r_n, g_n, b_n )
    +
    Math
      .max( r_n, g_n, b_n )
  )
  /
  510











//: initialize scan Arrays
      STAT_W_o
        .scan_a =
          new Array( 1 + STAT_W_o.SCAN_lum_rank_n )
  
      //=== HUE
      let capacity_n = 360
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_hue_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_hue_rate_n] =
            new Array( capacity_n )
        
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_hue_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_hue_rate_n]
              [capacity_n] = 0
      }
      
      //=== SAT
      capacity_n = 101    // renge [0...100]
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_sat_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_sat_rate_n] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_sat_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_sat_rate_n]
              [capacity_n] = 0
      }
      
      //=== LUM
      capacity_n =  101    // renge [0...100]
      
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_lum_n] =
            new Array( capacity_n )
        
      STAT_W_o
        .scan_a
          [STAT_W_o.SCAN_lum_rate_n] =
            new Array( capacity_n )
      
      while
      (
        --capacity_n >= 0
      )
      {
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_lum_n]
              [capacity_n] = []
  
        STAT_W_o
          .scan_a
            [STAT_W_o.SCAN_lum_rate_n]
              [capacity_n] = 0
      }
      
      //=== SCAN IMAGE DATA ===
      let r_n,
          g_n,
          b_n
      
      for
      (
        let at_n = 0;              // : imageData pointer
        at_n
        <
        imgData_o
          .data
            .length;
        at_n += 4                  //: r,g,b, skip opacity
      )
      {
        r_n =
          imgData_o
            .data
              [at_n]
        
        g_n =
          imgData_o
            .data
              [at_n + 1]
        
        b_n =
          imgData_o
            .data
              [at_n + 2]
              
        //:=== HUE
        let hue_n =
          RGB_H__n
          (
            r_n,
            g_n,
            b_n
          )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_hue_n]
            [hue_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_hue_rate_n]
            [hue_n] +=
              1
      
        //:=== SAT
        let sat_n =
          ~~( RGB_S__n
              (
                r_n,
                g_n,
                b_n
              )
              *
              100
          )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_sat_n]
            [sat_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_sat_rate_n]
            [sat_n] +=
              1
    
        //:=== LUM
        let lum_n =
          ~~( RGB_L__n
              (
                r_n,
                g_n,
                b_n
              )
              *
              100
          )
      
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_lum_n]
            [lum_n]
              .push( at_n )
        
        STAT_W_o
          .scan_a[STAT_W_o.SCAN_lum_rate_n]
            [lum_n] +=
              1
      }

      //=== utility function
      const rank__a =
      (
        capacity_a
      ) =>
      {
        const capacity_n =
          capacity_a
            .length

        let rank_a =
          new Array( capacity_n )

        for
        (
          let at_n=0;
          at_n < capacity_n;
          ++at_n
        )
        {
          rank_a
            [at_n] =
              [
                capacity_a
                  [at_n],
                at_n
              ]
        }



        rank_a
          .sort  //: descending order
          (
            (
              first,
              second
            ) =>
              second
                [0]
              -
              first
                [0]
          )

        return rank_a
      }

      STAT_W_o
        .scan_a[STAT_W_o.SCAN_hue_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_hue_rate_n]
          )      //: hue rank max_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_sat_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_sat_rate_n]
          )      //: sat rank max_n is at [0][0]
  
      STAT_W_o
        .scan_a[STAT_W_o.SCAN_lum_rank_n] =
          rank__a
          (
            STAT_W_o
              .scan_a[STAT_W_o.SCAN_lum_rate_n]
          )      //: lum rank max_n is at [0][0]
