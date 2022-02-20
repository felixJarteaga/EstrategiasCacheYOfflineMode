
const CACHE_NAME = 'cache-1';

self.addEventListener('install', evenInstall =>{


  const cacheProm = caches.open( CACHE_NAME ).then( cache =>{

    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/main.jpg',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
      '/js/app.js'

    ]);

  } );

  evenInstall.waitUntil( cacheProm );


});

self.addEventListener('fetch', eventFetch => {


// 1- Cache Only
// Es utilizada cuando toda la aplicación sea servida desde el cache, es decir, no va haber petición que accdeda a la web
// eventFetch.respondWith( caches.match( eventFetch.request ) );


// 2- Cache with Network Fallback
// Busca primero en el cache y si no se encuentra busca en Internet
const respuesta = caches.match( eventFetch.request )
      .then( res =>{
        if (res) {
          return res;
        }
        // Si pasa por este punto es que no existe en el cache
        // Entonces tenemos que ir a la web
        console.log( 'No existe', eventFetch.request.url );

        return fetch( eventFetch.request )
              .then( newResp => {

                caches.open( CACHE_NAME )
                  .then( cache => {
                    cache.put( eventFetch.request, newResp );
                } )

                return newResp.clone();
              } )

      } );




eventFetch.respondWith( respuesta );

});