//=== dragndrop.js ===
var DnD_active

function DnD_start
(
  drag_o
)
{
  this
    .style
      .opacity = '0.4'

  DnD_active =
    this

  drag_o
    .dataTransfer
      .effectAllowed =
        'move'

  drag_o
    .dataTransfer
      .setData
      (
        'text/html',
        this
          .innerHTML
      )
}



function DnD_end
(
  drag_o
)
{
  this
    .style
      .opacity = '1'

  for
  (
    let item_o
    of
    item_a
  )
  {
    item_o
      .classList
        .remove( 'over' )
  }
}



function DnD_over
(
  drag_o
)
{
  drag_o
    .preventDefault()

  return false
}



function DnD_enter
(
  drag_o
)
{
  this
    .classList
      .add( 'over' )
}



function DnD_leave
(
  drag_o
)
{
  this
    .classList
      .remove( 'over' )
}



function DnD_drop
(
  drag_o
)
{
  drag_o
    .stopPropagation()

  if
  (
    DnD_active
    !==
    this
  )
  {
    DnD_active
      .innerHTML =
        this
          .innerHTML

    this
      .innerHTML =
        drag_o
          .dataTransfer
            .getData( 'text/html' )
  }

  return false
}



function DnD_init
(
  item_o
)
{
  item_o
    .addEventListener
      (
        'dragstart',
        DnD_start
      )

  item_o
    .addEventListener
      (
        'dragover',
        DnD_over
      )

  item_o
    .addEventListener
      (
        'dragenter',
        DnD_enter
      )

  item_o
    .addEventListener
      (
        'dragleave',
        DnD_leave
      )

  item_o
    .addEventListener
      (
        'dragend',
        DnD_end
      )

  item_o
    .addEventListener
      (
        'drop',
        DnD_drop
      )
}
