const COM_o =
{
  form__s:
  (
    permalink_s
  ) =>
  {
    return (
`
<hr/>
<h2>
  <label for="commentaires" tabindex="-1">Commentaires</label>
</h2>
<div>
  <form name="comment" netlify-honeypot="full-name" action="/thanks" netlify>
    <p data--=netlify-honeypot>
      <input name="path" type="hidden" value="${permalink_s}">
      <label>Votre nom<input name="full-name"></label>
    </p>
    <label for="name">Votre nom<br/><small>Comment voulez-vous être appelé?</small></label>
    <input type="text" name="name" id="name">
    <label for="email">Votre email<br/><small>Ce site ne vous tracera pas et ne vous adressera jamais de mail indésirable!</small></label>
    <input type="email" name="email" id="email">
    <label for="comment">Votre commentaire<br/><small>Vous pouvez utiliser des balises Markdown pour la mise en forme.</small></label>
    <textarea name="comment" id="comment"></textarea>
    <button type="submit">Postez votre commentaire</button>
  </form>
</div>
`
    )
  }
  ,

}



module.exports = COM_o



/*
    <label for="I1_0" tabindex="-1">▾</label>
    <input id="I1_0" type="checkbox">
    <ins>
      <span data-ins="subsid" data-spec="₀">
        <b>Comment voulez-vous être appelé?</b>
      </span>
    </ins>
*/