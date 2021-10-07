const C_o =
  require( '../data/C_o.js' )



const ADOC_o =
{
  ad_o:
    require( 'asciidoctor' )()
  ,

  registry_o: null
  ,

  options_o:
  {
    safe: 'safe',
    backend: 'html5',
    template_dirs: [ C_o.ADOC_TEMPLATES_s ],
    extension_registry: null
  }
  ,



  convert__s:
    input_s =>
      ADOC_o
        .ad_o
          .convert
          (
            input_s,
            ADOC_o
              .options_o
          )
  ,
}




ADOC_o
  .registry_o =
    ADOC_o
      .ad_o
        .Extensions
          .create()

ADOC_o
  .options_o
    .extension_registry =
    ADOC_o
      .registry_o

require( '../adoc/ins-inline-macro-processor.js' )
( ADOC_o.registry_o )



module.exports =
{
  convert__s:
    input_s =>
      ADOC_o
        .convert__s( input_s )
,
}
