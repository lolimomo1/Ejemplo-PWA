/*if ('serviceWorker' in navigator){
    console.log("se puede")
}*/
if (navigator.serviceWorker){
    navigator.serviceWorker.register("/sw.js");
}
if (window.caches){
    caches.open('practica_cache')
    .then(cache=>{
        cache.add('/img/main2.jpg');
    })
    caches.open('practica_cache')
    .then(cache=>{
        cache.addAll([
            '/index.html' , '/sw.js'
        ]).then(()=>{
            cache.delete('/img/main2.jpg');
            cache.put('/sw.js' , new Response ('Rocio Ivonne Aguirre Mora'));
        });
         cache.match('/sw.js')
            .then(respuesta =>{
            respuesta.text().then(console.log)
         });
    })
    caches.keys().then(console.log);
  /*  caches.open('espacio-1');//open sirve para crear si no hay  y abrir si existe
    caches.has("espacio-1").then(console.log);
    caches.open('cache-v1.1')
    .then(cache=>{
        //cache.add('/index.html');
        cache.addAll([
            '/index.html' , '/css/style.css' , '/img/main.jpg'
        ]).then(()=>{
             //cache.delete('/css/style.css');//el borrador debe de estar dentro de la promesa
             cache.put('index.html' , new Response('Index Modificado'));
        });
        cache.match('/index.html')
            .then(respuesta =>{
            respuesta.text().then(console.log)
         });
    });
    caches.keys().then(console.log);*/
}
