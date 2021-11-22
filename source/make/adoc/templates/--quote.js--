module
  .exports =
  ({ node }) =>
  {
    const title = node.getTitle()

    const { attribution, citetitle } =
      node
        .getAttributes()
  
    let title_s = ''

    if
    (
      title
    )
    {
      title_s =
        `<p data-ad=title>`
        + title
        + `<p>`
    }

    let attribution_s = ''

    if
    (
      attribution
      ||
      citetitle
    )
    {
      let cite_s = ''

      if
      (
        citetitle
      )
      {
        cite_s =
          `<br>${citetitle}`
      }

      attribution_s =
        `<p data-ad=attribution>`
        + `— ${attribution}`
        + cite_s
        + `</p>`
    }
  
    return (
      `<blockquote data-ad=quote>`
      + `${title_s}`
      + `${node.getContent()}`
      + `${attribution_s}`
      + `</blockquote>`
      )
  }