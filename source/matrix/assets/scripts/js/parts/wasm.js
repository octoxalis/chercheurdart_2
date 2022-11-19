/**
 * : Fetch a WebAssembly module
 * ... cache it as arrayBuffer in  inexedDB or browser cache
 * ... IndexedDB key is prefixed by an optional namespace
 * @param {Object} export_o: { url_s, namespace_s:'wasm', version_n:1, import_o:{} }
 * !!! export_o.url_s is mandatory
 * @return {Object} All properties exported from the WebAssembly module
 */
import * as cache from './idb.js'

export const WAexport__o =
async export_o =>
{
  export_o =
    Object
      .assign
      (
        {    //: default
          namespace_s: 'wasm',
          version_n: 1,
          import_o: {},
        },
        export_o
      )

  export_o
    .import_o =
      Object
        .assign
        (
          {    //: default
            env:
            {
              abort:    //: a callable is mandatory
                () =>
                  console
                    .log( 'ERROR: Import fail' )
            }
          },
          export_o
            .import_o
          ||
          {}
        )


        
  const module__s =
    url_s =>
    {
      const start_n =
        url_s
          .lastIndexOf( '/' )
        +
        1  //: 0 if '/' not found
  
      let end_n =
        url_s
          .lastIndexOf( '.' )
  
      if
      (
        end_n
        ===
        -1
      )
      {
        end_n =
          url_s
            .length
      }
      
      return (
        url_s
          .substring
          (
            start_n,
            end_n
          )
      )
  
    }
  
  let cache_o

  const key_s =
    module__s
    (
      export_o
        .url_s
    )

  return (
    await cache
      .idb__o
      (
        export_o
          .namespace_s,
        export_o
          .version_n
      )
      .then
      (
        idb_o =>
          {
            cache_o =
              idb_o
              
            return (
              cache_o
                .get__s( key_s )
            )
          }
      )
      .then
      (
        buffer_a =>
        {
          return (
            buffer_a
            ?
              WebAssembly
                .instantiate
                (
                  buffer_a,
                  export_o
                    .import_o
                )
                  .exports
            :
              fetch
              (
                export_o
                  .url_s
              )
              .then
              (
                response_o =>
                  response_o
                    .arrayBuffer()
              )
              .then
              (
                buffer_a =>
                {
                  cache_o
                    .put__v
                    (
                      key_s,
                      buffer_a
                    )

                  return (
                    WebAssembly
                      .instantiate
                      (
                        buffer_a,
                        export_o
                          .import_o
                      )
                  )
                }
              )
              .then
              (
                instance_o =>
                  instance_o
                    .instance
                      .exports
              )
          )
        }
      )
  )
}



void async function
()
{
  const add_o =
  {
    url_s: './add.wasm',
  }

  const Add_M =
    await WAexport__o( add_o )  //: By convention WASM module identifiers have a capital first letter
  
  console
    .log( Add_M.add__i( 19 + 23 ) )
}()
