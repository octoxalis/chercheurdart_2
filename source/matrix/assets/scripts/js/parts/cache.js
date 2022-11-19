//=== cache.mjs ===
export const CACH_o =
{
  cache_a: {},



  async create__v:
  (
    id_s
  ) =>
  {
    CACH_o
      .cache_a
        [ id_s ] =
          await
          caches
            .open(  id_s )
  }
  ,



  async add__v:
  (
    id_s,
    url_a
  ) =>
  {
    await
    CACH_o
      .cache_a
        [ id_s ]
          .addAll( url_a )
  }
  ,



  async get__o:
  (
    id_s,
    request_s
  ) =>
    await CACH_o
            .cache_a
              [ id_s ]
                .match( request_s )    //: converted to request object
  ,



  delete__v:
  (
    id_s,
    src_s
  ) =>
  {
    CACH_o
      .cache_a
        [ id_s ]
          delete
          (
            src_s
            //...,{
            //...  ignoreVary: true,
            //...  ignoreSearch: true
            //...}
          )
  }
  ,



  async remove__b:
  (
    id_s
  ) =>
    await caches
            .delete( id_s )
  ,
}
