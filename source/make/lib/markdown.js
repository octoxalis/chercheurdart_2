//... const REX_o = require( '../../make/lib/regex.js' )
//... 
//... 
//... const gim_re =
//...   REX_o
//...     .new__re( 'gim' )
//... 
//... const substit_a =
//... [
//...   
//... ]

const MARK_o =
{
  parse__s:
  (
    md_s
  ) =>
    md_s
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<bold>$1</bold>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')w
      //.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, '<br />')
      .trim()
  
  
}



module.exports = MARK_o
