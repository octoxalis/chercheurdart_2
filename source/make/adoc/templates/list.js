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
  
    let blockTitle_s = ''
  
    const level_n =
      node_o
        .getLevel() + 2
  
    if
    (
      title_s
    )
    {
      blockTitle_s =
        `<h${level_n}>`
        + title_s
        + `</h${level_n}>`
    }
  
    let list_s = ''
  
    const item_a =
      node_o
        .getItems()
  
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
              items_s,
              item_o
            ) =>
            {
              const id_s =
                item_o
                  .getId()
  
              const atId_s =
                id_s
                ?
                  ` id=${id_s}`
                :
                  ''
  
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
                items_s
                + `<li${atId_s}>`
                + `${item_o.getText()}`
                + `${content_s}`
                + `</li>`
                )
            },
            ''
          )
    }
  
    let data_s = ''
  
    const role_a =
      node_o
        .getRoles()
  
    if
    (
      role_a
        .length
    )
    {
      data_s =
        ` data-ad="${role_a.join(' ')}"`
    }
  
    const id_s =
      node_o
        .getId()
  
    const listId_s =
      id_s
      ?
        ` id=${id_s}`
      :
        ''
  
    return (
      `${blockTitle_s}`
      + `<${listType_s}${listId_s}${data_s}>`
      + list_s
      + `</${listType_s}>`
      )
  }