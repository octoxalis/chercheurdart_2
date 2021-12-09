//========================================================= media_4
const M4_o = {}


M4_o.trace__v =
( hue_n ) =>
{
  document.getElementById( 'ca_media_4_processor_trace_H_v' )
    .innerHTML = hue_n
  document.getElementById( 'ca_media_4_processor_trace_P_v' )
    .innerHTML = Number.parseFloat( ( M4_o.hueCapacity_a[hue_n] / M4_o.capacity_n ) * 100 ).toFixed(2)
}


M4_o.resize_o = new ResizeObserver( observe_a =>
  {
    for ( let observe_e of observe_a )
    {
      if ( observe_e.contentBoxSize )
      {
        const body_e = document.querySelector( 'body' )
        const width_n  = +(window.getComputedStyle( body_e ).width.slice( 0, -2 ))    //: trim end 'px'
        const height_n = +(window.getComputedStyle( body_e ).height.slice( 0, -2 ))
        Dom_o.rootVar__v( '--M4_PROCESSOR_LAYOUT', ( width_n < height_n ) ? 'column' : 'row' )
        //... redraw color_burst + color_aster
      }
    }
  } )



M4_o.selectorOnOff__b =
( select_s ) =>
{
  let toggle_b = false
  pad_e = document.getElementById( `ca_media_4_control_pad` )
  selector_a = pad_e.querySelectorAll( '.ca_selector_o' )
  selector_a.forEach( select_e =>
    {
      let on_s
      const id_s = select_e.id.slice( 'ca_media_4_control_'.length )
      if ( id_s === select_s )
      {
        if ( select_e.dataset.on === "1" ) return  //> already on
        on_s = 1
      }
      else on_s = 0
      select_e.dataset.on = ''+ on_s
      toggle_b = true
    } )
  
  return toggle_b
}



M4_o.chartOnOff__v =
( select_s ) =>
{
  pad_e = document.getElementById( `ca_media_4_processor_chart` )
  chart_a = pad_e.querySelectorAll( '.ca_media_4_processor_chart' )
  chart_a.forEach( chart_e =>
    {
      let method_s = chart_e.id.includes( select_s ) ? 'remove' : 'add'
      chart_e.classList[method_s]( 'ca_unseen' )
    } )
}



//== INIT        
void async function ()
{
  try
  {
    M4_o.scan_c = await M0_o.cloneScan__o()
    M4_o.hue_a = M4_o.scan_c.hue__a()
    M4_o.hueCapacity_a = M4_o.scan_c.hueCapacity__a()
    M4_o.capacity_n = M4_o.scan_c.capacity__n()
    const hue_a = []
    M4_o.hueCapacity_a.forEach( ( freq_n, at_n ) => hue_a[at_n] =
      freq_n ? { frequency_n: freq_n, hsl_a: [ at_n, 100, 50 ] }
      : null )

    const selectorChart_e = document.getElementById( 'ca_media_4_processor_chart' )
    const selectorBurstHue_e = document.getElementById( 'ca_media_4_processor_burst_hue' )
    const boxWidth_n =  Dom_o.computedDimension__n( selectorChart_e, 'width' )
    const boxHeight_n = Dom_o.computedDimension__n( selectorChart_e, 'height' )
    //??? let M4_rank_a = M4_o.scan_c.hue__a()

    M4_o.burst_o =
    {
      container_e: selectorBurstHue_e,  //XX
      burst_s: 'ca_media_4_selector_burst_hue_paint',  //XX
      width_n:  boxWidth_n,  //XX
      height_n: boxHeight_n,  //XX
      range_n: 360,
      color_a : hue_a,
      maxfreq_n: M4_o.scan_c.hueRankMax__n(),
      onHueChange: hue_n =>    //: event handle
      {
        if ( !M4_o.hue_a[hue_n] ||  M4_o.hue_a[hue_n].length === 0 ) return
        const [ satur_a, lumen_a ] = M4_o.scan_c.satLum__a( hue_n )
        const sat_a = []
        const lum_a = []
        let satFreq_n = 0  // max frequency
        let lumFreq_n = 0  // idem
        satur_a.forEach( ( freq_n, at_n ) =>
        {
          if ( freq_n > satFreq_n ) satFreq_n = freq_n
          sat_a[at_n] = freq_n ? { frequency_n: freq_n, hsl_a: [ hue_n, at_n, 50 ] } : null
          freq_n = lumen_a[at_n]
          if ( freq_n > lumFreq_n ) lumFreq_n = freq_n
          lum_a[at_n] = freq_n ? { frequency_n: freq_n, hsl_a: [ hue_n, 100, at_n ] } : null
        } )
        const processorSat_e = document.getElementById( 'ca_media_4_processor_burst_satur' )
        const processorSatRect_o = processorSat_e.getBoundingClientRect()
        const saturationBurst = new ColorBurst(
        {
          container_e: processorSat_e,
          burst_s: 'ca_media_4_processor_burst_sat_paint',
          width_n:  boxWidth_n,
          height_n: boxHeight_n,
          range_n: 101,
          color_a: sat_a,
          maxfreq_n: satFreq_n
        } )

        const processorLum_e = document.getElementById( 'ca_media_4_processor_burst_lumen' )
        const processorLumRect_o = processorSat_e.getBoundingClientRect()
        const lumenBurst = new ColorBurst(
          {
            container_e: processorLum_e,
            burst_s : 'ca_media_4_processor_burst_lum_paint',
            width_n:  boxWidth_n,
            height_n: boxHeight_n,
            range_n: 101,
            color_a : lum_a,
            maxfreq_n: lumFreq_n
          } )
      },
      onHueTrace: M4_o.trace__v
    }

    M4_o.burst_c = new ColorBurst( M4_o.burst_o )

    
    const selectorAsterHue_e = document.getElementById( 'ca_media_4_processor_aster_hue' )
    const expand_a = document.querySelectorAll( '.ca_media_4_processor_subchart' )
    expand_a.forEach( expand_e =>
      expand_e.addEventListener( 'click', event_o =>
      {
        subchart_e = event_o.target.closest('div')
        if ( subchart_e ) subchart_e.classList.toggle( 'ca_media_4_processor_subchart_expand' )
      } ) )  
    
    M4_o.aster_o =
    {
      container_e: selectorAsterHue_e,
      arch_s: 'ca_media_4_selector_aster_hue_paint',
      color_a : M4_o.scan_c.hueRank__a(),
      width_n:  ~~boxWidth_n,
      scale_n: .15,
      range_n: 360,
  
      //... onHueChange: hue_n =>    //: event handle
      //... {
      //... },
      //... 
      //... onHueTrace: M4_o.trace__v
    }
    M4_o.aster_c = new ColorAster( M4_o.aster_o )

    M4_o.resize_o.observe( document.querySelector( 'body' ) )



//== EVENTS    
    const pad_e = document.getElementById( 'ca_media_4_control_pad' )
    pad_e.addEventListener( 'click', event_o =>
      {
        const select_s = Selector_o.data__o( event_o )
        if (!select_s ) return //>

        if ( select_s === '-1' ) return void pad_e.classList.toggle( 'ca_selector_expand' )    //>

        if ( M4_o.selectorOnOff__b( select_s ) ) M4_o.chartOnOff__v( select_s )
      } )
  
}
  catch ( error ) { console.log(`ERROR DETECTED @M4_process: ${ error }`) }
} ()
