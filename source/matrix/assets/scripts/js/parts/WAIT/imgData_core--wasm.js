//... operation_s
//... fromHsl_n
//... toHsl_n

//... const iData_a =
//...   imgData_o
//...     .data

let atHsl_n
let atScan_a
let length_n

for
(
  let atHsl_n = fromHsl_n;
  atHsl_n < toHsl_n;
  ++atHsl_n
)
{
  atScan_a =
    scan_a
      [ atHsl_n ]
    
  length_n =
    atScan_a
      .length
    
  let op0opac_n
  let op1opac_n
  let diff_n
  let apply_b = true

  for
  (
     let atScan_n = 0;
     atScan_n < length_n;
     ++atScan_n
  )
  {
    //--if
    //--(
    //--  oper_a
    //--    .length
    //--  >
    //--  1
    //--)
    //--{
      if
      (
        op0imgData_o    //: operation
        &&
        op1imgData_o
      )
      {
        op0opac_n =
          op0imgData_o
            [
              atScan_a
                [ atScan_n ]
                +
                3
            ]

        op1opac_n =
          op1imgData_o
            [
              atScan_a
                [ atScan_n ]
                +
                3
            ]
            
        diff_n =
          ~~(
            op0opac_n
            -
            op1opac_n
          )
      
        switch
        (
          operation_s
        )
        {
          case 'union':
            apply_b =
              op0opac_n
              &&
              op1opac_n

            break
        
          case 'difference':
            apply_b =
              diff_n
              >
              deviation_n

            break
        
          case 'intersection':
            apply_b =
              diff_n
              <=
              deviation_n

            break
        
          case 'complement':
            apply_b =
              op0opac_n
              &&
              ! op1opac_n

            break
        
          default:      //: 'none'
            break
        }
      }
    //--}

    if
    (
      apply_b
    )
    {
      iData_a
        [
          atScan_a
            [ atScan_n ]
            +
            3
        ] =
          opacity_n
    }
  }
}
