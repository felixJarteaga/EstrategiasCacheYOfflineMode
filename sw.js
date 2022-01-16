

self.addEventListener('fetch',event =>{

  const offlineResp = new Response(`
      Bienvenido a mi pagina web
      Disculpa, pero para usarla, necesitas Internet
  
  `);

  const resp = fetch( event.request )
                            .catch( ()=>{

                              return offlineResp;
                            } );

  event.respondWith( resp );

});


