// === dialog_alert.js ===

const DIA_o =
{
  open__v
  (
    dialog_o    //: { '{{C_o.LABEL_ID_s}}': '' , '{{C_o.PARAGRAPH_ID_s}}': ''}
  )
  {
    DIA_o
      .option_a
    =
      dialog_o
        .option_a

    const dialog_s
    =
      dialog_o
        .option_a
          .includes( 'cancel' )
      ?
        'confirm'
      :
        'alert'
      
    for
    (
      let html_s
      of
      [
        '{{C_o.LABEL_ID_s}}'
      , '{{C_o.PARAGRAPH_ID_s}}'
      ]
    )
    {
      document
        .getElementById( `${html_s}_main_${dialog_s}_accept`  )
          .innerHTML
      =
        dialog_o
          [ html_s ]
    }
  }



  ,
  async confirm__b
  (
    close_b=false
  , id_s='alert'
  )
  {
    if
    (
      close_b
    )
    {
      document
        .getElementById( `dialog_main_${id_s}`  )
          .close()

      return
    }
    //-->
    return new Promise
      (
        resolve =>
        {
          for
          (
            let option_s
            of
            DIA_o
              .option_a
          )
          {
            document
              .getElementById( `{{C_o.INPUT_ID_s}}_main_${id_s}_${option_s}`  )
                .addEventListener
                (
                  'change'
                  , () =>
                    {
                      document
                        .getElementById( `dialog_main_${id_s}`  )
                          .close()

                      resolve
                      (
                        option_s
                        ===
                        'accept'
                      )
                    }
                )
          }

          document
            .getElementById( `dialog_main_${id_s}`  )
              .showModal()
        }
      )
  }
}



/*=========================
DIA_o
  .open__v
  (
    {
      '{{C_o.LABEL_ID_s}}': `Attention`
    , '{{C_o.PARAGRAPH_ID_s}}': alert_s
    , option_a:
      [
        'accept'
      ]
    }        
  )

//-- const accept_b
//-- 
  await DIA_o
          .confirm__b()

//-- ;console.log( 'accept_b: ' + accept_b )

DIA_o
  .open__v
  (
    {
      '{{C_o.LABEL_ID_s}}': `Attention`
    , '{{C_o.PARAGRAPH_ID_s}}':
        `Cette opération va remplacer les images de l'exposition courante qui sont sélectionnées.<br>Souhaitez-vous continuer?`
    , option_a:
      [
        'cancel'
      , 'accept'
      ]
    }        
  )

const accept_b
=
  await DIA_o
          .confirm__b( 'confirm' )

;console.log( 'accept_b: ' + accept_b )
*/