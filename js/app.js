

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}



// if (window.caches) {
  
// // Para crear el cache
//   caches.open('prueba-1');

//   caches.open('prueba-2');

//   // Para comprobar si existe el cache
//   // caches.has('prueba-2').then( existe => console.log( existe ) );

//   // Para borrar un cache
//   // caches.delete('cache-v1.1').then( borrardo => console.log( borrardo ) );

//   caches.open('cache-v1.1').then( cache =>{

//     // cache.add('/index.html');

//     cache.addAll([

//       '/index.html',
//       '/css/style.css',
//       '/img/main.jpg'

//     ]).then( () =>{
//       // cache.delete('/css/style.css');

//       // Para reemplazar el index.html
//       cache.put('/index.html', new Response('Hola Mundo'));


//     } );

//     // Para leer un archivo que se encuentra almacenada en el cache y mostrarla por consola
//   //   cache.match('/index.html')
//   //                   .then( res =>{
//   //                     res.text().then( console.log );
//   //                   } );

//   } );


// // Para devolver todos los caches existentes
// caches.keys().then( keys =>{
//   console.log( keys );
// } )


// }