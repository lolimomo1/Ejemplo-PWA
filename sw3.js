self.addEventListener('fetch' , evento =>{
    const respuestaOffline= new Response ("este sitio requiere internet");
    const respuesta= fetch(evento.request)
    .catch(()=> respuestaOffline);
    evento.respondWith(respuesta);
})