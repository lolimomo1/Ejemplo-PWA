/*self.addEventListener('fetch', evento=>{
    if(evento.request.url.includes('.jpg')){
        let img=fetch ('img/main2.jpg')
        evento.respondWith(img);
    }else if (evento.request.url.includes('style.css')){
        let estilos=fetch ('css/style2.css')
        evento.respondWith(estilos);
          
    }else{
        evento.respondWith(fetch(evento.request));
    }
});*/
self.addEventListener('fetch',evento =>{
    evento.respondWith(
        fetch(evento.request)
        .then(respuesta=>{
            if (respuesta.ok){
                return respuesta;
            }
            else{
                return fetch ('img/main.jpg')
            }
            //console.log(respuesta)
            //return respuesta;
        })
    )
});