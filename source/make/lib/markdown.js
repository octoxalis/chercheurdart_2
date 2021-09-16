const MARK_o =
{
  parse__s:
  (
    md_s
  ) =>
    md_s
      .replace(/^### (.*$)/gim,         '<h6>$1</h6>')
      .replace(/^## (.*$)/gim,          '<h5>$1</h5>')
      .replace(/^# (.*$)/gim,           '<h4>$1</h4>')
      .replace(/\*\*(.*)\*\*/gim,       '<bold>$1</bold>')
      .replace(/\*(.*)\*/gim,           '<i>$1</i>')
      .replace(/^\> (.*$)/gim,          '<blockquote>$1</blockquote>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n$/gim,                '<br />')
      .trim()
  
  
}



module.exports = MARK_o



      //.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")

