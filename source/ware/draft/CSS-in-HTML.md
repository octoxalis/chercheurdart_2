`HTML comment`
### HTML comment
  + `<!-- a comment -->`
    ```
    <!--
      a multiline
      comment
    -->
    ```
----



`CSS comment`
### CSS rule comment
  + `<body /* a comment */>`
    ```
    <body /* a comment */>
    ```
----



`def identifier`
### global definition
  _def keyword ... empty line_
  + ```
    def font_style:
      font-style: normal;
      font-weight: 200;

    ...
    <p>
    <!--
    ==font_style
    -->
    ...
    <ul>
    <!--
    ==font_style
    -->
    ```
      ```
      p, ul
         {...}
      ```
----
    


`HTML comment open followed by =`
### CSS declaration for current HTML tag
  + `<!--=  background: var(--bgcolor);  -->`
    ```
    {
      background: var(--bgcolor);
    }
    ```
----


`< tag >`
### standalone selector
  + `< a >`
    ```
    a
    {...}
    ```
----



`<|tag>`
### parent child selector
  + `<body>    <|header>`
    ```
    body > header
      {...}
    ```
----



`<| tag>`
### descendant selector
  + `<p>    <| em>`
  ```
  p em
    {...}
  ```
----



`<|+tag>`
### adjacent sibling selector
----



`<|~tag>`
### general sibling selector
----



`<tag[attribute=value]>`
### attribute selector
_mutiple_
  + `<aside[data--="gray]">`
    ```
    aside[data--="gray"]
      {...}
    ```
----



`<tag:pseudo>`
### pseudo selector
_mutiple_
  + `<p:hover>`
    ```
    p:hover
      {...}
    ```
----



