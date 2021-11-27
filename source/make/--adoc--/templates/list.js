const C_o = require("../../data/C_o")




module
  .exports =
  (
    node_o,
    listType_s
  ) =>
  {
    const title_s =
      node_o
        .getTitle()
    
    const level_n =
      node_o
        .getLevel() + 2

    const item_a =
      node_o
        .getItems()
  
    let blockTitle_s = ''

    if
    (
      C_o.
        ADOC_MARKUP_b
      &&
      title_s
    )
    {
      blockTitle_s =
        `<h${level_n}>`
        + title_s
        + `</h${level_n}>`
    }
  
    let list_s = ''
  
    if
    (
      item_a
    )
    {
      list_s =
        item_a
          .reduce
          (
            (
              item_s,
              item_o
            ) =>
            {
              let itemId_s = ''

              if
              (
                C_o.
                  ADOC_MARKUP_b
              )
              {
                const id_s =
                  item_o
                    .getId()
                
                if
                (
                  id_s
                )
                {
                  itemId_s =
                    ` id=${id_s}`
                }
              }
  
              const content_s =
                item_o
                  .getBlocks()
                    .length
                ?
                  item_o
                    .getContent()
                :
                  ''
  
              return (
                item_s
                + `<li${itemId_s}>`
                + `${item_o.getText()}`
                + `${content_s}`
                //+ `</li>`            //: skip closing tag
                )
            },
            ''    //: accumulator
          )
    }
  
    const role_a =
      node_o
        .getRoles()
  
    let data_s = ''
  
    if
    (
      C_o.
        ADOC_MARKUP_b
      &&
      role_a
        .length
    )
    {
      data_s =
        ` data-ad="${role_a.join(' ')}"`
    }

    let listId_s = ''

    if
    (
      C_o.
        ADOC_MARKUP_b
    )
    {
      const id_s =
        node_o
          .getId()

      if
      (
        id_s
      )
      {
        listId_s =
        ` id=${listId_s}`
      }
    }

    return (
      `${blockTitle_s}`
      + `<${listType_s}${listId_s}${data_s}>`
      + list_s
      + `</${listType_s}>`
      )
  }