self.addEventListener('install' , evento =>{
    const promesa =caches.open('cache-1')
    .then(cache=>{
        return cache.addAll([
            '/' ,
            '/index.html' ,
            '/css/style.css' ,
            '/img/main.jpg' ,
            '/js/app.js' ,
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ])
    });
    evento.waitUntil(promesa);
});
self.addEventListener('fetch' , evento =>{
   // evento.respondWith(caches.match(evento.request));
   const respuesta=caches.match(evento.request)
   .then(res=>{
    if(res)return res;
    console.log('no exixte' , evento.request.url);
    return fetch(evento.request)
    .then(resWeb=>{
        return resWeb;
    })
   });
   evento.respondWith(respuesta)
});