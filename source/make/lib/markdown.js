const MARK_o =
{
  parse__s:
  (
    md_s
  ) =>
    md_s
      .replaceAll(/^### (.*$)/gim,         `<h6>$1</h6>`)
      .replaceAll(/^## (.*$)/gim,          `<h5>$1</h5>`)
      .replaceAll(/^# (.*$)/gim,           `<h4>$1</h4>`)
      .replaceAll(/\*\*(.*)\*\*/gim,       `<bold>$1</bold>`)
      .replaceAll(/\*(.*)\*/gim,           `<i>$1</i>`)
      .replaceAll(/__(.*)__/gim,           `<em>$1</em>`)
      .replaceAll(/```([\w\s]+?)```/gim,   `<pre><code>$1</code></pre>`)
      .replaceAll(/^\> (.*$)/gim,          `<blockquote>$1</blockquote>`)
      .replaceAll(/!\[(.*?)\]\((.*?)\)/gim,`<img alt="$1" src="$2" />`)
      .replaceAll(/\[(.*?)\]\((.*?)\)/gim, `<a href="$2">$1</a>`)
      .replaceAll(/\n$/gim,                `<br />`)
      .trim()
  
  
}



module.exports = MARK_o




