const wasmFile_s =
  'wasm.wasm'          //: D compiles wasm

const request_o =
  new XMLHttpRequest()

request_o
  .open
  (
    'GET',
    wasmFile_s
  )

request_o
  .responseType =
    'arraybuffer'

request_o
  .onload =
    async function
    ()
    {
      const bytes =
        request_o
          .response
    
      const import_o = {}
    
      const result_o =
        await WebAssembly
          .instantiate
          (
            bytes,
            import_o
          )

      const { exports: wasm } =
        result_o
          .instance
  
      const add_n =        //: finally, call the add() function implemented in D
        wasm
          .add
          (
            42,
            -2.5
          )
      
      ;;;;    console.log( `42 * 2.5 = ${add_n}` )

    }

request_o
  .send()
