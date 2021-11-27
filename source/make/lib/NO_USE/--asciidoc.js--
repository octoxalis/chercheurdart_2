const ASC_o =
{
  parse__s:
  (
    ascii_s
  ) =>
    ascii_s
      .replaceAll( /link<([^>]+?)>"([^"]+?)"/gim,  `<a href="$1">$2</a>`)
      .replaceAll( /image<([^>]+?)>"([^"]+?)"/gim, `<img src="$1" alt="$2" />`)
      .replaceAll( /\*\*(.*)\*\*/gim,              `<bold>$1</bold>`)
      .replaceAll( /__(.*)__/gim,                  `<i>$1</i>`)
      .replaceAll( /`(.*)`/gim,                    `<code>$1</code>`)
      .trim()
}



module.exports = ASC_o
