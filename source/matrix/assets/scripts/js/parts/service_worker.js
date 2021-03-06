// === STAT_W_o: service_worker.js ===

var STAT_W_o =
{
  cache_s: '{{A_o.ID_s}}_{{C_o.KEY_n}}'            //: name of the current cache
  ,

  url_a:     //: URLs of assets to immediately cache
    [
      'favicon.svg',
      'index.html',
      'assets/scripts/js/index.min.js',
    ]
  ,
  

  
  install__v:    //:- Iterate thru url_a and put each entry in cache
  (
    install_o
  ) =>
  {
    STAT_W_o
      .cache_a =
        new Set
        (
          STAT_W_o
            .slots_a
        )

    install_o
      .waitUntil
      (
        void async function    //: IIFE
        ()
        {
          const cache_o =
            await caches
              .open( STAT_W_o.cache_s )

          await cache_o
            .addAll( STAT_W_o.url_a  )

          self
            .skipWaiting()
        } ()
      )
  }
,


  
  activate__v:    //:- Remove inapplicable caches entries
  (
    activate_o
  ) =>
  {
    activate_o
      .waitUntil
      (
        void async function    //: IIFE
        ()
        {
          const entry_a =
            await caches
              .keys()
  
          const remove_a =
            await entry_a
              .filter
              (
                entry_s =>
                  entry_s
                  !==
                  STAT_W_o
                    .cache_s
              )
  
          await Promise
            .all
            (
              remove_a
                .map
                (
                  remove_s =>
                    caches
                      .delete( remove_s )
                )
            )
  
          self
            .clients
              .claim()
        } ()
    )
  }
,
  

  //:- https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading
  
  fetch__v:    //:- Fetch offline-1st
  (
    fetch_o
  ) =>
  {
    const mode_s =
      fetch_o
        ?.request
        ?.mode

    if
    (
      mode_s
      ===
      'navigate'
    )
    {
      try
      {

        fetch_o
          .respondWith
          (
            async function()    //: IIFE
            {
              const url_o =
                new URL
                (
                  fetch_o
                    .request
                      .url
                )

              const response_o =
                fetch( url_o )

              const clone_o =
                response_o
                  .then
                  (
                    resp_o =>
                      resp_o
                        .clone()
                  )

              fetch_o
                .waitUntil
                (
                  void async function    //: IIFE
                  ()
                  {
                    const cache_o =
                      await caches
                        .open
                        (
                          STAT_W_o
                            .cache_s
                        )

                    await cache_o
                      .put
                      (
                        url_o,
                        await clone_o
                      )
                  }()
                )

              return (
                await caches
                  .match( url_o )
                )
                ||
                response_o
            } ()
          )
      }
      catch
      (
        error_o
      )
      {
        const cache_o =
          caches
            .open
            (
              STAT_W_o
                .cache_s
            )

        return (
          cache_o
          &&
          cache_o
            .match
            (
              new Request( `{{U_o.url_s}}offline.html` )  //: We don't have a cached version, display offline page
            )
          )
      }
    }
  }
,
  


  init__v:
  () =>
  {
    for
    (
      event_s
      of
      [ 
        'install',
        'activate',
        'fetch',
      ]
    )
    {
      self
        .addEventListener
        (
          event_s,
          event_o =>
            STAT_W_o[ `${event_s}__v` ]( event_o )
        )
    }

  }
,

}

STAT_W_o
  .init__v()  // !!! no IIFE
