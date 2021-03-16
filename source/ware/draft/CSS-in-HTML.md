`CSS comment`
### CSS rule comment
  + `/* a comment */`
    ```
    /* a comment */
    ```
----



`HTML comment WITHOUT indentation`
### current HTML tag CSS declaration
```
<body>
<!--
background: var(--bgcolor);
-->
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
    


`<tag|>`
### standalone selector
  + `<a|>`
    ```
    a
    {...}
    ```
----



`<tag>`
### parent child selector
  + `<body>    <header>`
    ```
    body > header
      {...}
    ```
----



`<tag[*]>`
### universal descendant selector
  + `<body *>`
    ```
    body > header
      {...}
    ```
----



`<tag[ ]>`
### descendant selector
  + `<p>    <em [ ]>`
  ```
  p em
    {...}
  ```
----



`<tag[+]>`
### adjacent sibling selector
----



`<tag[~]>`
### general sibling selector
  + `<ins [~]`
----



`<tag[.class]>`
### class selector
_mutiple classes are separated by space_
  + `<p [.wide .dark]`
    ```
    p.wide.dark
      {...}
----



`[attribute=value]`
### attribute selector
_mutiple attributes are separated by space_
  + `<use [href="#icon_close"]>`
    ```
    [href="#icon_close"]
      {...}
    ```
----



`<tag[attribute=value]>`
### attribute selector
_mutiple attributes are separated by space_
  + `aside[id="gray]"`
    ```
    <aside id="gray">
      {...}
    ```
----



`<tag:pseudo>`
### pseudo selector
_mutiple pseudo are separated by space_
  + `<p:hover>`
    ```
    p:hover
      {...}
    ```
----



