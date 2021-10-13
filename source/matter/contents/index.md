---js
{
  layout:    'frame.njk',
  permalink: 'index.html',
  tags:      [ 'index' ],
  eleventyExcludeFromCollections: false,
  //--expires_n: 10,


  doc_n:      0,
  title_s:    `Chercheurd.art`,
  subtitle_s: `L'œil technologique de la peinture`,
  abstract_s: `Un autre regard sur la peinture des maîtres anciens`,

  section_a:
  [
    `article`,
  ],

  script_a:
  [
  ],

  css_a:
  [
  ],

  version_a:
  [
    '2021-10-14T12:00:00Z'
  ],

}
---
{% _doc section_a[0] %}
//LINKS
:site_tech: pass:[<a href=site_tech.html#article>Technologie du site</a>]
:Brave: pass:[<a href=https://brave.com>Brave</a>]
:11ty: https://www.11ty.dev[Eleventy]

= {{title_s}}

{{subtitle_s}}
₍₀ 
  Versions
  {{F_o.versionList__s(version_a)}}₎

//---------------------------------------
== Articles mis en ligne

.toc
pass:[<p data-ins=contents>
    <a href=renaissance.html#article>Renaissance</a>
    <span data-ins=principal data-spec=₀> </span>
    <label for=L_renaissance tabindex=-1>▾</label>
    <input id=L_renaissance type=checkbox>
    <ins>
      <span data-ins=subsid data-spec=₀>
        <b>Un nouveau modèle pour Chercheur d'Art</b>
        <b><bold>14 octobre 2021</bold> à 12:00:00</b>
      </span>
    </ins>
  </p><p data-ins=contents>
    <a href=site_tech.html#article>Technologie du site</a>
    <span data-ins=principal data-spec=₀> </span>
    <label for=L_site_tech tabindex=-1>▾</label>
    <input id=L_site_tech type=checkbox>
    <ins>
      <span data-ins=subsid data-spec=₀>
        <b>Infrastructure technologique du site</b>
        <b><bold>14 octobre 2021</bold> à 12:00:00</b>
      </span>
    </ins>
  </p><p data-ins=contents>
    <a href=style_guide.html#article>Style guide</a>
    <span data-ins=principal data-spec=₀> </span>
    <label for=L_style_guide tabindex=-1>▾</label>
    <input id=L_style_guide type=checkbox>
    <ins>
      <span data-ins=subsid data-spec=₀>
        <b>AsciiDoc subset used in chercheurd.art</b>
        <b><bold>16 septembre 2021</bold> à 08:12:00</b>
      </span>
    </ins>
  </p>]

.toc

== Avertissement

Ce site étant délibéremment 
₍₀ expérimental
  la page {site_tech} donne un aperçu de son infrastructure₎
, tant par sa forme que par son contenu, certains de ses éléments, et en tout premier lieu les images, ne sont accessibles qu'en utilisant un navigateur Internet compatible avec 
₍₀ Google Chrome
  je recommande tout particulièrement {Brave} pour des raisons de confidentialité₎
ou Mozilla Firefox dans sa version la plus récente.

== Colophon

{{A_o.NAME_s}} est généré avec la complicité de {11ty}

//----------------------------------------
// TopicsPart
////
‹François Boucher›
////
{% end_doc %}
