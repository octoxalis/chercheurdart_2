//=== read_file.js
const READ_o =
{
  read__s:
  (
    path_s,
    callback_f
  ) =>
  {
    fetch
    (
      path_s
    )
      .then
      (
        response_o =>
        {
          if
          (
            response_o
              .ok
          )
          {
            return (
              response_o
                .arrayBuffer()
            )
          }
          
          throw new Error ( `${response_o.status}: ${response_o.statusText}` )
          
          return ''
        }
      )
      .then
      (
        buffer_a =>
        {
          callback_f( buffer_a )
        }
      )
      .catch
      (
        error_o =>
          console
            .error( error_o )
      )
  }
  ,
}
