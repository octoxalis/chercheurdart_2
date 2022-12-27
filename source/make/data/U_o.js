// === = U_o.js === //

require('dotenv').config({ path: '../env/chercheurdart' })


const U_o =
{
   //~ dev_b: true,   //: development/production switch
 dev_b: false,  //!!!! REMEMBER TO ADJUST SERVICE_PATH_s & SERVICE_SCOPE_s
  url_s: null,

  PRO_s: process.env.URL_s,
  DEV_s: process.env.LOCAL_s,

  SERVICE_PATH_s: 'service_worker.min.js',    //: WITHOUT Service-Worker-Allowed HTTP header 

  //-- SERVICE_PATH_s: 'assets/scripts/js/service_worker.min.js',    //: NEEDS Service-Worker-Allowed HTTP header
  //-- SERVICE_SCOPE_s: '../../../',  //: assets/scripts/js/
  SERVICE_SCOPE_s: '/',                 //: site root

  //=== EXTERNAL LINKS/REFERENCES
  //XXSOLO_GIT_R_s:  `[G]: https://github.com/octoxalis/chercheurdart`,
  //XXSOLO_SRC_R_s:  `https://github.com/octoxalis/chercheurdart/blob/main/source/`,

  

  setup__v:
  () =>
  {
    U_o.url_s =
      U_o
        [
          U_o.dev_b === true
          ?
            'DEV_s'
          :
            'PRO_s'
        ]
    
    //======================
    console
      .log( `Site URL: ${U_o.url_s}` )
  }

}

U_o
  .setup__v()

module.exports = U_o
