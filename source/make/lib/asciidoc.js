const ASC_o =
{
  parse__s:
  (
    ascii_s
  ) =>
    ascii_s
      .replace( /link<([^>]+?)>"([^"]+?)"/gim,  `<a href="$1">$2</a>`)
      .replace( /image<([^>]+?)>"([^"]+?)"/gim, `<img src="$1" alt="$2" />`)
      .replace( /\*\*(.*)\*\*/gim,              `<bold>$1</bold>`)
      .replace( /__(.*)__/gim,                  `<i>$1</i>`)
      .replace( /`(.*)`/gim,                    `<code>$1</code>`)
      .trim()
}



module.exports = ASC_o
