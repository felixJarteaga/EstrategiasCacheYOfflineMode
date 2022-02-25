
// const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME='static-v2';
const CACHE_DYNAMIC_NAME='dynamic-v1';

const CACHE_INMUTABLE_NAME='inmutable-v1';

const CACHE_DYNAMIC_LIMIT=50;



function limpiarCache( cacheName, numeroItems ) {
  caches.open( cacheName )
    .then( cache => {
      return cache.keys()
        .then( keys =>{

          if (keys.length > numeroItems) {
            cache.delete( keys[0] )
              .then( limpiarCache( cacheName, numeroItems ) )
          }

        } )
    } );
}



self.addEventListener('install', evenInstall =>{


  const cacheProm = caches.open( CACHE_STATIC_NAME ).then( cache =>{

    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/main.jpg',
      '/js/app.js',
      '/img/no-img.jpg'

    ]);

  } );

  const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => {
          return cache.add( 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' )
        } );

  evenInstall.waitUntil( Promise.all([cacheProm,cacheInmutable]) );


});

self.addEventListener('fetch', eventFetch => {


// 1- Cache Only
// Es utilizada cuando toda la aplicación sea servida desde el cache, es decir, no va haber petición que accdeda a la web
// eventFetch.respondWith( caches.match( eventFetch.request ) );



// 2- Cache with Network Fallback
// Busca primero en el cache y si no se encuentra busca en Internet
// const respuesta = caches.match( eventFetch.request )
//       .then( res =>{
//         if (res) {
//           return res;
//         }
//         // Si pasa por este punto es que no existe en el cache
//         // Entonces tenemos que ir a la web
//         console.log( 'No existe', eventFetch.request.url );

//         return fetch( eventFetch.request )
//               .then( newResp => {

//                 caches.open( CACHE_DYNAMIC_NAME )
//                   .then( cache => {
//                     cache.put( eventFetch.request, newResp );
//                     limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
//                 } )

//                 return newResp.clone();
//               } )

//       } );




// eventFetch.respondWith( respuesta );



// // 3- Network with cache fallback

// const respuesta = fetch( eventFetch.request ).then( res =>{

//   if (!res) {
//    return caches.match( eventFetch.request ); 
//   }

//   caches.open( CACHE_DYNAMIC_NAME )
//     .then( cache => {
//       cache.put( eventFetch, res );
//       limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT )
//     } );

//   return res.clone()

// } ).catch( err => {
//   return caches.match( eventFetch.request );
// } )

// eventFetch.respondWith( respuesta );


// 4- Cache with network update
// Cuando el rendimiento es crítico
// Las actualizaciones siempre estarán un paso atrás

// if (eventFetch.request.url.includes('bootstrap')) {
//   return eventFetch.respondWith( caches.match( eventFetch.request ) );
// }

// const respuesta = caches.open( CACHE_STATIC_NAME ).then( cache=> {
//   fetch(eventFetch.request).then( newResp => {
//     cache.put( eventFetch.request, newResp );
//   } );

//   return cache.match( eventFetch.request );
// } );

// eventFetch.respondWith( respuesta );



// 5- Cache & Network Race

const respuesta = new Promise( (resolve,reject) => {

  let rechazada = false;

  const falloUnaVez = () => {

    if (rechazada) {
      
      if(/\.(png | jpg)$/i.test( eventFetch.request.url )){
        resolve( caches.match('/img/no-img.jpg') );
      }else{
        reject( 'No se encontro respuesta' )
      }
      
    }else{
      rechazada = true;
    }

  }

  fetch( eventFetch.request ).then( res => {

   res.ok ? resolve(res) : falloUnaVez();

  } ).catch( falloUnaVez );

caches.match( eventFetch.request ).then( res => {

  res ? resolve(res) : falloUnaVez();

} ).catch(falloUnaVez)

} );


eventFetch.respondWith(respuesta);

});